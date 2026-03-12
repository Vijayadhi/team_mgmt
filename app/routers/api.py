from datetime import date, datetime, timedelta, timezone
from typing import Any

from fastapi import APIRouter, HTTPException, Request, status

from app.database import get_database
from app.dependencies import object_id_str, parse_object_id, validate_new_password
from app.security import hash_password, verify_password
from app.services.ai_summary import derive_bottleneck_risk, group_updates_for_summary, summarize_weekly_updates
from app.services.email_service import send_email


router = APIRouter(prefix="/api", tags=["api"])


def build_brand_name(team_name: str | None) -> str:
    cleaned = (team_name or "Team Daily Tracker").strip() or "Team Daily Tracker"
    return f"iamneo | {cleaned}"


def blank_member_form(target_date: str) -> dict[str, Any]:
    return {
        "date": target_date,
        "plan": "",
        "extra_work": "",
        "challenges": "",
        "eta": "",
        "proof_of_work": "",
        "client_name": "",
        "is_corporate": False,
        "is_university": False,
        "request_reason": "",
    }


def normalize_report_rows(rows: list[dict]) -> list[dict]:
    normalized: list[dict[str, str]] = []
    for row in rows:
        normalized.append(
            {
                "member_name": str(row.get("member_name", "")).strip(),
                "activity_summary": str(row.get("activity_summary", "")).strip(),
                "extra_work_summary": str(row.get("extra_work_summary", "")).strip(),
                "challenges_summary": str(row.get("challenges_summary", "")).strip(),
                "manager_notes": str(row.get("manager_notes", "")).strip(),
                "next_week_action_plan": str(row.get("next_week_action_plan", "")).strip(),
            }
        )
    return normalized


def workdays_back(count: int) -> list[str]:
    days: list[str] = []
    cursor = date.today() - timedelta(days=1)
    while len(days) < count:
        if cursor.weekday() < 5:
            days.append(cursor.isoformat())
        cursor -= timedelta(days=1)
    return days


def recent_dates(count: int) -> list[str]:
    start = date.today() - timedelta(days=count - 1)
    return [(start + timedelta(days=index)).isoformat() for index in range(count)]


async def get_api_current_user(request: Request, role: str | None = None) -> dict[str, Any]:
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")

    db = get_database()
    user = await db.users.find_one({"_id": parse_object_id(user_id)})
    if not user or not user.get("is_active", True):
        request.session.clear()
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required.")
    if role and user.get("role") != role:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied.")
    return user


async def get_app_title_for_user(user: dict[str, Any]) -> str:
    db = get_database()
    if user.get("role") == "lead":
        return build_brand_name(user.get("team_name"))
    lead = await db.users.find_one({"_id": user.get("lead_id")}) if user.get("lead_id") else None
    return build_brand_name(lead.get("team_name") if lead else None)


async def build_missing_day_rows(lead_id) -> list[dict]:
    db = get_database()
    members = await db.users.find({"lead_id": lead_id, "role": "member", "is_active": True}).to_list(length=2000)
    target_dates = workdays_back(7)
    rows: list[dict] = []
    for member in members:
        for target_date in target_dates:
            leave = await db.leave_days.find_one({"user_id": member["_id"], "date": target_date})
            update = await db.daily_updates.find_one({"user_id": member["_id"], "date": target_date})
            if not leave and not update:
                rows.append(
                    {
                        "member_id": str(member["_id"]),
                        "member_name": f"{member['first_name']} {member.get('last_name', '')}".strip(),
                        "email": member["email"],
                        "date": target_date,
                    }
                )
    return rows


async def build_pending_requests(lead_id) -> list[dict]:
    db = get_database()
    requests: list[dict] = []
    async for item in db.update_requests.find({"lead_id": lead_id, "status": "pending"}).sort("created_at", -1):
        user = await db.users.find_one({"_id": item["user_id"]})
        row = object_id_str(item)
        row["member_name"] = f"{user['first_name']} {user.get('last_name', '')}".strip() if user else "Unknown"
        row["email"] = user["email"] if user else ""
        requests.append(row)
    return requests


async def build_admin_dashboard_payload(current_user: dict[str, Any], member_name: str = "", update_date: str = "") -> dict[str, Any]:
    db = get_database()
    users_cursor = db.users.find({"lead_id": current_user["_id"], "role": "member"}).sort("first_name", 1)
    users = [object_id_str(user) async for user in users_cursor]

    update_query: dict[str, Any] = {"lead_id": current_user["_id"]}
    if update_date:
        update_query["date"] = update_date
    if member_name:
        matched_users = await db.users.find(
            {
                "lead_id": current_user["_id"],
                "role": "member",
                "$or": [
                    {"first_name": {"$regex": member_name, "$options": "i"}},
                    {"last_name": {"$regex": member_name, "$options": "i"}},
                    {"email": {"$regex": member_name, "$options": "i"}},
                ],
            }
        ).to_list(length=100)
        update_query["user_id"] = {"$in": [user["_id"] for user in matched_users] or []}

    updates = []
    async for update in db.daily_updates.find(update_query).sort("date", -1):
        user = await db.users.find_one({"_id": update["user_id"]})
        item = object_id_str(update)
        item["member_name"] = f"{user['first_name']} {user.get('last_name', '')}".strip() if user else "Unknown"
        item["email"] = user["email"] if user else ""
        updates.append(item)

    reports_cursor = db.weekly_reports.find({"lead_id": current_user["_id"], "status": "final"}).sort("generated_at", -1)
    reports = [object_id_str(report) async for report in reports_cursor]
    total_entries = await db.daily_updates.count_documents({"lead_id": current_user["_id"]})
    trend_dates = recent_dates(7)
    entry_trend = []
    for target_date in trend_dates:
        count = await db.daily_updates.count_documents({"lead_id": current_user["_id"], "date": target_date})
        entry_trend.append({"date": target_date, "count": count})

    return {
        "user": object_id_str(current_user),
        "team_members": users,
        "updates": updates,
        "reports": reports,
        "total_entries": total_entries,
        "entry_trend": entry_trend,
        "pending_requests": await build_pending_requests(current_user["_id"]),
        "missing_days": await build_missing_day_rows(current_user["_id"]),
        "filters": {"member_name": member_name, "update_date": update_date},
        "week_start": (date.today() - timedelta(days=date.today().weekday())).isoformat(),
        "week_end": (date.today() - timedelta(days=date.today().weekday()) + timedelta(days=4)).isoformat(),
    }


async def build_member_dashboard_payload(current_user: dict[str, Any], edit_date: str = "", request_date: str = "") -> dict[str, Any]:
    db = get_database()
    today = date.today().isoformat()
    form_data = blank_member_form(today)
    is_editing = False
    is_requesting_missing_day = False

    if edit_date:
        edit_update = await db.daily_updates.find_one({"user_id": current_user["_id"], "date": edit_date})
        if edit_update:
            form_data = object_id_str(edit_update)
            form_data["request_reason"] = ""
            is_editing = True
    elif request_date and request_date < today:
        existing = await db.daily_updates.find_one({"user_id": current_user["_id"], "date": request_date})
        if not existing:
            form_data = blank_member_form(request_date)
            is_requesting_missing_day = True

    cursor = db.daily_updates.find({"user_id": current_user["_id"]}).sort("date", -1).limit(10)
    recent_updates = [object_id_str(item) async for item in cursor]
    pending_requests: list[dict] = []
    async for item in db.update_requests.find({"user_id": current_user["_id"], "status": "pending"}).sort("created_at", -1):
        pending_requests.append(object_id_str(item))
    total_entries = await db.daily_updates.count_documents({"user_id": current_user["_id"]})
    trend_dates = recent_dates(7)
    entry_trend = []
    for target_date in trend_dates:
        count = await db.daily_updates.count_documents({"user_id": current_user["_id"], "date": target_date})
        entry_trend.append({"date": target_date, "count": count})

    return {
        "user": object_id_str(current_user),
        "today": today,
        "form_data": form_data,
        "is_editing": is_editing,
        "is_requesting_missing_day": is_requesting_missing_day,
        "recent_updates": recent_updates,
        "pending_requests": pending_requests,
        "total_entries": total_entries,
        "entry_trend": entry_trend,
    }


@router.get("/session")
async def session_payload(request: Request):
    user = await get_api_current_user(request)
    return {
        "user": object_id_str(user),
        "app_title": await get_app_title_for_user(user),
        "role": user["role"],
    }


@router.post("/logout")
async def api_logout(request: Request):
    request.session.clear()
    return {"ok": True, "message": "Logged out."}


@router.get("/admin/dashboard")
async def admin_dashboard_data(request: Request, member_name: str = "", update_date: str = ""):
    current_user = await get_api_current_user(request, "lead")
    return await build_admin_dashboard_payload(current_user, member_name, update_date)


@router.post("/admin/team-name")
async def api_update_team_name(request: Request):
    current_user = await get_api_current_user(request, "lead")
    payload = await request.json()
    cleaned_team_name = str(payload.get("team_name", "")).strip()
    if not cleaned_team_name:
        raise HTTPException(status_code=400, detail="Team name cannot be empty.")
    db = get_database()
    await db.users.update_one({"_id": current_user["_id"]}, {"$set": {"team_name": cleaned_team_name, "updated_at": datetime.now(timezone.utc)}})
    return {"ok": True, "message": "Team name updated."}


@router.post("/admin/users")
async def api_create_user(request: Request):
    current_user = await get_api_current_user(request, "lead")
    payload = await request.json()
    cleaned_first_name = str(payload.get("first_name", "")).strip()
    cleaned_last_name = str(payload.get("last_name", "")).strip()
    cleaned_email = str(payload.get("email", "")).strip().lower()
    if not cleaned_first_name or not cleaned_email:
        raise HTTPException(status_code=400, detail="First name and email are required.")

    db = get_database()
    try:
        await db.users.insert_one(
            {
                "first_name": cleaned_first_name,
                "last_name": cleaned_last_name,
                "email": cleaned_email,
                "password_hash": hash_password(cleaned_first_name),
                "role": "member",
                "lead_id": current_user["_id"],
                "is_active": True,
                "created_at": datetime.now(timezone.utc),
            }
        )
    except Exception as exc:
        raise HTTPException(status_code=400, detail="User with this email already exists.") from exc
    return {"ok": True, "message": "Member created successfully."}


@router.post("/admin/users/{user_id}/toggle")
async def api_toggle_user(request: Request, user_id: str):
    current_user = await get_api_current_user(request, "lead")
    db = get_database()
    member = await db.users.find_one({"_id": parse_object_id(user_id), "lead_id": current_user["_id"], "role": "member"})
    if not member:
        raise HTTPException(status_code=404, detail="User not found.")
    await db.users.update_one({"_id": member["_id"]}, {"$set": {"is_active": not member.get("is_active", True)}})
    return {"ok": True, "message": "Member status updated."}


@router.post("/admin/users/{user_id}/reset-password")
async def api_reset_user_password(request: Request, user_id: str):
    current_user = await get_api_current_user(request, "lead")
    db = get_database()
    member = await db.users.find_one({"_id": parse_object_id(user_id), "lead_id": current_user["_id"], "role": "member"})
    if not member:
        raise HTTPException(status_code=404, detail="User not found.")
    await db.users.update_one({"_id": member["_id"]}, {"$set": {"password_hash": hash_password(member["first_name"])}})
    return {"ok": True, "message": "Password reset to first name."}


@router.post("/admin/change-password")
async def api_change_lead_password(request: Request):
    current_user = await get_api_current_user(request, "lead")
    payload = await request.json()
    current_password = str(payload.get("current_password", ""))
    new_password = str(payload.get("new_password", ""))
    confirm_password = str(payload.get("confirm_password", ""))
    if not verify_password(current_password, current_user["password_hash"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect.")
    validation_error = validate_new_password(current_password, new_password, confirm_password)
    if validation_error:
        raise HTTPException(status_code=400, detail=validation_error)

    db = get_database()
    await db.users.update_one({"_id": current_user["_id"]}, {"$set": {"password_hash": hash_password(new_password.strip())}})
    return {"ok": True, "message": "Password updated successfully."}


@router.post("/admin/requests/{request_id}/approve")
async def api_approve_request(request: Request, request_id: str):
    current_user = await get_api_current_user(request, "lead")
    db = get_database()
    item = await db.update_requests.find_one({"_id": parse_object_id(request_id), "lead_id": current_user["_id"], "status": "pending"})
    if not item:
        raise HTTPException(status_code=404, detail="Request not found.")

    payload = item.get("payload", {})
    if item["request_type"] == "late_eod":
        await db.daily_updates.update_one({"user_id": item["user_id"], "date": item["date"]}, {"$set": {**payload, "updated_at": datetime.now(timezone.utc)}})
    elif item["request_type"] == "missed_day":
        await db.daily_updates.update_one(
            {"user_id": item["user_id"], "date": item["date"]},
            {
                "$set": {"lead_id": current_user["_id"], "date": item["date"], **payload, "updated_at": datetime.now(timezone.utc)},
                "$setOnInsert": {"user_id": item["user_id"], "created_at": datetime.now(timezone.utc)},
            },
            upsert=True,
        )
    await db.update_requests.update_one({"_id": item["_id"]}, {"$set": {"status": "approved", "reviewed_at": datetime.now(timezone.utc), "reviewed_by": current_user["_id"]}})
    return {"ok": True, "message": "Request approved."}


@router.post("/admin/requests/{request_id}/reject")
async def api_reject_request(request: Request, request_id: str):
    current_user = await get_api_current_user(request, "lead")
    db = get_database()
    result = await db.update_requests.update_one(
        {"_id": parse_object_id(request_id), "lead_id": current_user["_id"], "status": "pending"},
        {"$set": {"status": "rejected", "reviewed_at": datetime.now(timezone.utc), "reviewed_by": current_user["_id"]}},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Request not found.")
    return {"ok": True, "message": "Request rejected."}


@router.post("/admin/missing-days/leave")
async def api_mark_leave(request: Request):
    current_user = await get_api_current_user(request, "lead")
    payload = await request.json()
    user_id = str(payload.get("user_id", ""))
    missing_date = str(payload.get("missing_date", ""))
    reason = str(payload.get("reason", "Marked by TL")).strip() or "Marked by TL"

    db = get_database()
    member = await db.users.find_one({"_id": parse_object_id(user_id), "lead_id": current_user["_id"], "role": "member"})
    if not member:
        raise HTTPException(status_code=404, detail="User not found.")
    await db.leave_days.update_one(
        {"user_id": member["_id"], "date": missing_date},
        {
            "$set": {"lead_id": current_user["_id"], "reason": reason, "marked_by": current_user["_id"], "updated_at": datetime.now(timezone.utc)},
            "$setOnInsert": {"created_at": datetime.now(timezone.utc)},
        },
        upsert=True,
    )
    return {"ok": True, "message": "Leave marked successfully."}


@router.post("/admin/missing-days/warning")
async def api_send_warning(request: Request):
    current_user = await get_api_current_user(request, "lead")
    payload = await request.json()
    user_id = str(payload.get("user_id", ""))
    missing_date = str(payload.get("missing_date", ""))

    db = get_database()
    member = await db.users.find_one({"_id": parse_object_id(user_id), "lead_id": current_user["_id"], "role": "member"})
    if not member:
        raise HTTPException(status_code=404, detail="User not found.")

    await send_email(
        subject=f"Warning: missing daily update for {missing_date}",
        recipients=[member["email"]],
        body=(
            f"Hello {member['first_name']},\n\n"
            f"Your daily entry for {missing_date} is missing. Please submit the required request with a valid reason.\n\n"
            f"Team Lead: {current_user['first_name']} {current_user.get('last_name', '')}".strip()
        ),
    )
    await db.notification_logs.update_one(
        {"type": "warning_mail", "user_id": member["_id"], "target_date": missing_date},
        {"$setOnInsert": {"lead_id": current_user["_id"], "sent_at": datetime.now(timezone.utc)}},
        upsert=True,
    )
    return {"ok": True, "message": "Warning email sent."}


@router.post("/admin/reports/generate")
async def api_generate_report(request: Request):
    current_user = await get_api_current_user(request, "lead")
    payload = await request.json()
    week_start = str(payload.get("week_start", "")).strip()
    week_end = str(payload.get("week_end", "")).strip()
    if not week_start or not week_end:
        raise HTTPException(status_code=400, detail="Week start and week end are required.")

    db = get_database()
    users = await db.users.find({"lead_id": current_user["_id"], "role": "member"}).to_list(length=500)
    updates = await db.daily_updates.find({"lead_id": current_user["_id"], "date": {"$gte": week_start, "$lte": week_end}}).to_list(length=5000)
    members_payload = group_updates_for_summary(updates, users)
    summary = await summarize_weekly_updates(members_payload)
    normalized_rows = normalize_report_rows(summary.get("rows", []))
    bottleneck_risk = summary.get("bottleneck_risk") or derive_bottleneck_risk(summary.get("overall_challenges", ""))
    report = {
        "lead_id": current_user["_id"],
        "week_start": week_start,
        "week_end": week_end,
        "team_summary": summary.get("team_summary", ""),
        "overall_challenges": summary.get("overall_challenges", ""),
        "bottleneck_risk": bottleneck_risk,
        "rows": normalized_rows,
        "status": "draft",
        "generated_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
    }
    inserted = await db.weekly_reports.insert_one(report)
    return {"ok": True, "message": "Weekly report generated.", "report_id": str(inserted.inserted_id)}


@router.get("/admin/reports/{report_id}")
async def api_report_detail(request: Request, report_id: str):
    current_user = await get_api_current_user(request, "lead")
    db = get_database()
    report = await db.weekly_reports.find_one({"_id": parse_object_id(report_id), "lead_id": current_user["_id"]})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found.")
    report["rows"] = normalize_report_rows(report.get("rows", []))
    report["bottleneck_risk"] = report.get("bottleneck_risk") or derive_bottleneck_risk(report.get("overall_challenges", ""))
    data = object_id_str(report)
    data["download_url"] = f"/admin/reports/{data['id']}/download"
    return data


@router.post("/admin/reports/{report_id}/save")
async def api_save_report(request: Request, report_id: str):
    current_user = await get_api_current_user(request, "lead")
    payload = await request.json()
    db = get_database()
    report = await db.weekly_reports.find_one({"_id": parse_object_id(report_id), "lead_id": current_user["_id"]})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found.")

    overall_challenges = str(payload.get("overall_challenges", "")).strip()
    bottleneck_risk = str(payload.get("bottleneck_risk", "")).strip() or derive_bottleneck_risk(overall_challenges)
    rows = normalize_report_rows(payload.get("rows", []))
    await db.weekly_reports.update_one(
        {"_id": report["_id"]},
        {
            "$set": {
                "team_summary": str(payload.get("team_summary", "")).strip(),
                "overall_challenges": overall_challenges,
                "bottleneck_risk": bottleneck_risk,
                "rows": rows,
                "status": "final",
                "updated_at": datetime.now(timezone.utc),
            }
        },
    )
    return {"ok": True, "message": "Report saved.", "download_url": f"/admin/reports/{report_id}/download"}


@router.get("/member/dashboard")
async def member_dashboard_data(request: Request, edit_date: str = "", request_date: str = ""):
    current_user = await get_api_current_user(request, "member")
    return await build_member_dashboard_payload(current_user, edit_date, request_date)


@router.post("/member/daily-update")
async def api_save_daily_update(request: Request):
    current_user = await get_api_current_user(request, "member")
    payload = await request.json()
    cleaned_date = str(payload.get("entry_date", "")).strip()
    cleaned_plan = str(payload.get("plan", "")).strip()
    cleaned_eta = str(payload.get("eta", "")).strip()
    cleaned_client = str(payload.get("client_name", "")).strip()
    cleaned_extra = str(payload.get("extra_work", "")).strip()
    cleaned_challenges = str(payload.get("challenges", "")).strip()
    cleaned_proof = str(payload.get("proof_of_work", "")).strip()
    cleaned_reason = str(payload.get("request_reason", "")).strip()
    is_corporate = bool(payload.get("is_corporate"))
    is_university = bool(payload.get("is_university"))
    today = date.today().isoformat()

    db = get_database()
    existing = await db.daily_updates.find_one({"user_id": current_user["_id"], "date": cleaned_date})

    if existing:
        if cleaned_date < today:
            if not cleaned_proof:
                raise HTTPException(status_code=400, detail="Proof of work is mandatory for late EOD requests.")
            if not cleaned_reason:
                raise HTTPException(status_code=400, detail="Reason is mandatory for previous day updates.")
            await db.update_requests.update_one(
                {"user_id": current_user["_id"], "date": cleaned_date, "request_type": "late_eod", "status": "pending"},
                {
                    "$set": {
                        "lead_id": current_user["lead_id"],
                        "payload": {"extra_work": cleaned_extra, "challenges": cleaned_challenges, "proof_of_work": cleaned_proof},
                        "reason": cleaned_reason,
                        "updated_at": datetime.now(timezone.utc),
                    },
                    "$setOnInsert": {"user_id": current_user["_id"], "request_type": "late_eod", "date": cleaned_date, "status": "pending", "created_at": datetime.now(timezone.utc)},
                },
                upsert=True,
            )
            return {"ok": True, "message": "Late EOD request submitted.", "next": {"view": "requests"}}

        if not cleaned_proof:
            raise HTTPException(status_code=400, detail="Proof of work is mandatory while editing an existing task.")
        await db.daily_updates.update_one(
            {"_id": existing["_id"]},
            {"$set": {"extra_work": cleaned_extra, "challenges": cleaned_challenges, "proof_of_work": cleaned_proof, "updated_at": datetime.now(timezone.utc)}},
        )
        return {"ok": True, "message": "End-of-day update saved.", "next": {"view": "history"}}

    if not cleaned_date:
        raise HTTPException(status_code=400, detail="Date is required.")
    if not cleaned_plan:
        raise HTTPException(status_code=400, detail="Morning plan is required.")
    if not cleaned_eta:
        raise HTTPException(status_code=400, detail="ETA is required.")
    if not cleaned_client:
        raise HTTPException(status_code=400, detail="Client is required.")
    if not is_corporate and not is_university:
        raise HTTPException(status_code=400, detail="Select at least one category: corporate or university.")

    if cleaned_date < today:
        if not cleaned_proof:
            raise HTTPException(status_code=400, detail="Proof of work is mandatory for missed-day requests.")
        if not cleaned_reason:
            raise HTTPException(status_code=400, detail="Reason is mandatory for missed-day requests.")
        await db.update_requests.update_one(
            {"user_id": current_user["_id"], "date": cleaned_date, "request_type": "missed_day", "status": "pending"},
            {
                "$set": {
                    "lead_id": current_user["lead_id"],
                    "payload": {
                        "plan": cleaned_plan,
                        "eta": cleaned_eta,
                        "client_name": cleaned_client,
                        "is_corporate": is_corporate,
                        "is_university": is_university,
                        "extra_work": cleaned_extra,
                        "challenges": cleaned_challenges,
                        "proof_of_work": cleaned_proof,
                    },
                    "reason": cleaned_reason,
                    "updated_at": datetime.now(timezone.utc),
                },
                "$setOnInsert": {"user_id": current_user["_id"], "request_type": "missed_day", "date": cleaned_date, "status": "pending", "created_at": datetime.now(timezone.utc)},
            },
            upsert=True,
        )
        return {"ok": True, "message": "Missed-day request submitted.", "next": {"view": "requests"}}

    await db.daily_updates.insert_one(
        {
            "user_id": current_user["_id"],
            "lead_id": current_user["lead_id"],
            "date": cleaned_date,
            "plan": cleaned_plan,
            "extra_work": "",
            "challenges": "",
            "eta": cleaned_eta,
            "proof_of_work": "",
            "client_name": cleaned_client,
            "is_corporate": is_corporate,
            "is_university": is_university,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc),
        }
    )
    return {"ok": True, "message": "Morning entry saved.", "next": {"view": "workspace", "edit_date": cleaned_date}}


@router.post("/member/change-password")
async def api_change_member_password(request: Request):
    current_user = await get_api_current_user(request, "member")
    payload = await request.json()
    current_password = str(payload.get("current_password", ""))
    new_password = str(payload.get("new_password", ""))
    confirm_password = str(payload.get("confirm_password", ""))
    if not verify_password(current_password, current_user["password_hash"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect.")
    validation_error = validate_new_password(current_password, new_password, confirm_password)
    if validation_error:
        raise HTTPException(status_code=400, detail=validation_error)

    db = get_database()
    await db.users.update_one({"_id": current_user["_id"]}, {"$set": {"password_hash": hash_password(new_password.strip())}})
    return {"ok": True, "message": "Password updated successfully."}
