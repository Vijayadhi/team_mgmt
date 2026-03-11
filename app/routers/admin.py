from datetime import date, datetime, timedelta, timezone

from fastapi import APIRouter, Depends, Form, HTTPException, Request
from fastapi.responses import RedirectResponse, Response
from fastapi.templating import Jinja2Templates

from app.database import get_database
from app.dependencies import format_date, get_current_lead, object_id_str, parse_object_id
from app.security import hash_password, verify_password
from app.services.ai_summary import derive_bottleneck_risk, group_updates_for_summary, summarize_weekly_updates
from app.services.email_service import send_email
from app.services.report_pdf import build_weekly_report_pdf


router = APIRouter(prefix="/admin", tags=["admin"])
templates = Jinja2Templates(directory="app/templates")
templates.env.filters["dateformat"] = format_date


def normalize_report_rows(rows: list[dict]) -> list[dict]:
    normalized = []
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
                        "member_name": f"{member['first_name']} {member['last_name']}".strip(),
                        "email": member["email"],
                        "date": target_date,
                    }
                )
    return rows


async def build_pending_requests(lead_id) -> list[dict]:
    db = get_database()
    requests = []
    async for item in db.update_requests.find({"lead_id": lead_id, "status": "pending"}).sort("created_at", -1):
        user = await db.users.find_one({"_id": item["user_id"]})
        row = object_id_str(item)
        row["member_name"] = f"{user['first_name']} {user['last_name']}".strip() if user else "Unknown"
        row["email"] = user["email"] if user else ""
        requests.append(row)
    return requests


@router.get("/dashboard")
async def admin_dashboard(
    request: Request,
    current_user: dict = Depends(get_current_lead),
    member_name: str = "",
    update_date: str = "",
):
    db = get_database()
    users_cursor = db.users.find({"lead_id": current_user["_id"], "role": "member"}).sort("first_name", 1)
    users = [object_id_str(user) async for user in users_cursor]

    update_query = {"lead_id": current_user["_id"]}
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
        item["member_name"] = f"{user['first_name']} {user['last_name']}".strip() if user else "Unknown"
        item["email"] = user["email"] if user else ""
        updates.append(item)

    reports_cursor = db.weekly_reports.find({"lead_id": current_user["_id"], "status": "final"}).sort("generated_at", -1)
    reports = [object_id_str(report) async for report in reports_cursor]

    return templates.TemplateResponse(
        "admin/dashboard.html",
        {
            "request": request,
            "user": object_id_str(current_user),
            "team_members": users,
            "updates": updates,
            "reports": reports,
            "pending_requests": await build_pending_requests(current_user["_id"]),
            "missing_days": await build_missing_day_rows(current_user["_id"]),
            "filters": {"member_name": member_name, "update_date": update_date},
            "week_start": (date.today() - timedelta(days=date.today().weekday())).isoformat(),
            "week_end": (date.today() - timedelta(days=date.today().weekday()) + timedelta(days=4)).isoformat(),
        },
    )


@router.post("/requests/{request_id}/approve")
async def approve_request(request: Request, request_id: str, current_user: dict = Depends(get_current_lead)):
    db = get_database()
    item = await db.update_requests.find_one({"_id": parse_object_id(request_id), "lead_id": current_user["_id"], "status": "pending"})
    if not item:
        raise HTTPException(status_code=404, detail="Request not found")

    payload = item.get("payload", {})
    if item["request_type"] == "late_eod":
        await db.daily_updates.update_one(
            {"user_id": item["user_id"], "date": item["date"]},
            {"$set": {**payload, "updated_at": datetime.now(timezone.utc)}},
        )
    elif item["request_type"] == "missed_day":
        await db.daily_updates.update_one(
            {"user_id": item["user_id"], "date": item["date"]},
            {
                "$set": {
                    "lead_id": current_user["_id"],
                    "date": item["date"],
                    **payload,
                    "updated_at": datetime.now(timezone.utc),
                },
                "$setOnInsert": {"user_id": item["user_id"], "created_at": datetime.now(timezone.utc)},
            },
            upsert=True,
        )
    await db.update_requests.update_one(
        {"_id": item["_id"]},
        {"$set": {"status": "approved", "reviewed_at": datetime.now(timezone.utc), "reviewed_by": current_user["_id"]}},
    )
    return RedirectResponse("/admin/dashboard", status_code=303)


@router.post("/requests/{request_id}/reject")
async def reject_request(request: Request, request_id: str, current_user: dict = Depends(get_current_lead)):
    db = get_database()
    result = await db.update_requests.update_one(
        {"_id": parse_object_id(request_id), "lead_id": current_user["_id"], "status": "pending"},
        {"$set": {"status": "rejected", "reviewed_at": datetime.now(timezone.utc), "reviewed_by": current_user["_id"]}},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Request not found")
    return RedirectResponse("/admin/dashboard", status_code=303)


@router.post("/missing-days/leave")
async def mark_leave(
    request: Request,
    current_user: dict = Depends(get_current_lead),
    user_id: str = Form(...),
    missing_date: str = Form(...),
    reason: str = Form("Marked by TL"),
):
    db = get_database()
    member = await db.users.find_one({"_id": parse_object_id(user_id), "lead_id": current_user["_id"], "role": "member"})
    if not member:
        raise HTTPException(status_code=404, detail="User not found")
    await db.leave_days.update_one(
        {"user_id": member["_id"], "date": missing_date},
        {
            "$set": {
                "lead_id": current_user["_id"],
                "reason": reason.strip() or "Marked by TL",
                "marked_by": current_user["_id"],
                "updated_at": datetime.now(timezone.utc),
            },
            "$setOnInsert": {"created_at": datetime.now(timezone.utc)},
        },
        upsert=True,
    )
    return RedirectResponse("/admin/dashboard", status_code=303)


@router.post("/missing-days/warning")
async def send_warning(
    request: Request,
    current_user: dict = Depends(get_current_lead),
    user_id: str = Form(...),
    missing_date: str = Form(...),
):
    db = get_database()
    member = await db.users.find_one({"_id": parse_object_id(user_id), "lead_id": current_user["_id"], "role": "member"})
    if not member:
        raise HTTPException(status_code=404, detail="User not found")
    await send_email(
        subject=f"Warning: missing daily update for {missing_date}",
        recipients=[member["email"]],
        body=(
            f"Hello {member['first_name']},\n\n"
            f"Your daily entry for {missing_date} is missing. Please submit the required request with a valid reason.\n\n"
            f"Team Lead: {current_user['first_name']} {current_user['last_name']}"
        ),
    )
    await db.notification_logs.update_one(
        {"type": "warning_mail", "user_id": member["_id"], "target_date": missing_date},
        {"$setOnInsert": {"lead_id": current_user["_id"], "sent_at": datetime.now(timezone.utc)}},
        upsert=True,
    )
    return RedirectResponse("/admin/dashboard", status_code=303)


@router.post("/team-name")
async def update_team_name(
    request: Request,
    current_user: dict = Depends(get_current_lead),
    team_name: str = Form(...),
):
    cleaned_team_name = team_name.strip()
    if not cleaned_team_name:
        raise HTTPException(status_code=400, detail="Team name cannot be empty.")

    db = get_database()
    await db.users.update_one(
        {"_id": current_user["_id"]},
        {"$set": {"team_name": cleaned_team_name, "updated_at": datetime.now(timezone.utc)}},
    )
    return RedirectResponse("/admin/dashboard", status_code=303)


@router.post("/change-password")
async def change_lead_password(
    request: Request,
    current_user: dict = Depends(get_current_lead),
    current_password: str = Form(...),
    new_password: str = Form(...),
    confirm_password: str = Form(...),
):
    if not verify_password(current_password, current_user["password_hash"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect.")
    if new_password != confirm_password:
        raise HTTPException(status_code=400, detail="New password and confirmation do not match.")
    if len(new_password.strip()) < 4:
        raise HTTPException(status_code=400, detail="New password must be at least 4 characters.")

    db = get_database()
    await db.users.update_one(
        {"_id": current_user["_id"]},
        {"$set": {"password_hash": hash_password(new_password.strip())}},
    )
    return RedirectResponse("/admin/dashboard", status_code=303)


@router.post("/users")
async def create_user(
    request: Request,
    current_user: dict = Depends(get_current_lead),
    first_name: str = Form(...),
    last_name: str = Form(""),
    email: str = Form(...),
):
    db = get_database()
    cleaned_first_name = first_name.strip()
    cleaned_last_name = last_name.strip()
    cleaned_email = email.strip().lower()
    default_password = cleaned_first_name
    try:
        await db.users.insert_one(
            {
                "first_name": cleaned_first_name,
                "last_name": cleaned_last_name,
                "email": cleaned_email,
                "password_hash": hash_password(default_password),
                "role": "member",
                "lead_id": current_user["_id"],
                "is_active": True,
                "created_at": datetime.now(timezone.utc),
            }
        )
    except Exception:
        raise HTTPException(status_code=400, detail="User with this email already exists.")
    return RedirectResponse("/admin/dashboard", status_code=303)


@router.post("/users/{user_id}/toggle")
async def toggle_user_status(request: Request, user_id: str, current_user: dict = Depends(get_current_lead)):
    db = get_database()
    member = await db.users.find_one({"_id": parse_object_id(user_id), "lead_id": current_user["_id"], "role": "member"})
    if not member:
        raise HTTPException(status_code=404, detail="User not found")
    await db.users.update_one({"_id": member["_id"]}, {"$set": {"is_active": not member.get("is_active", True)}})
    return RedirectResponse("/admin/dashboard", status_code=303)


@router.post("/users/{user_id}/reset-password")
async def reset_user_password(request: Request, user_id: str, current_user: dict = Depends(get_current_lead)):
    db = get_database()
    member = await db.users.find_one({"_id": parse_object_id(user_id), "lead_id": current_user["_id"], "role": "member"})
    if not member:
        raise HTTPException(status_code=404, detail="User not found")
    await db.users.update_one(
        {"_id": member["_id"]},
        {"$set": {"password_hash": hash_password(member["first_name"])}},
    )
    return RedirectResponse("/admin/dashboard", status_code=303)


@router.post("/reports/generate")
async def generate_report(
    request: Request,
    current_user: dict = Depends(get_current_lead),
    week_start: str = Form(...),
    week_end: str = Form(...),
):
    db = get_database()
    users = await db.users.find({"lead_id": current_user["_id"], "role": "member"}).to_list(length=500)
    updates = await db.daily_updates.find(
        {"lead_id": current_user["_id"], "date": {"$gte": week_start, "$lte": week_end}}
    ).to_list(length=5000)
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
    return RedirectResponse(f"/admin/reports/{inserted.inserted_id}/preview", status_code=303)


@router.get("/reports/{report_id}/preview")
async def preview_report(request: Request, report_id: str, current_user: dict = Depends(get_current_lead)):
    db = get_database()
    report = await db.weekly_reports.find_one({"_id": parse_object_id(report_id), "lead_id": current_user["_id"]})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    report["rows"] = normalize_report_rows(report.get("rows", []))
    report["bottleneck_risk"] = report.get("bottleneck_risk") or derive_bottleneck_risk(report.get("overall_challenges", ""))
    return templates.TemplateResponse(
        "admin/report_preview.html",
        {"request": request, "user": object_id_str(current_user), "report": object_id_str(report)},
    )


@router.post("/reports/{report_id}/save")
async def save_report(
    request: Request,
    report_id: str,
    current_user: dict = Depends(get_current_lead),
):
    form = await request.form()
    db = get_database()
    report = await db.weekly_reports.find_one({"_id": parse_object_id(report_id), "lead_id": current_user["_id"]})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")

    rows = []
    row_count = int(form.get("row_count", 0))
    for index in range(row_count):
        rows.append(
            {
                "member_name": str(form.get(f"member_name_{index}", "")).strip(),
                "activity_summary": str(form.get(f"activity_summary_{index}", "")).strip(),
                "extra_work_summary": str(form.get(f"extra_work_summary_{index}", "")).strip(),
                "challenges_summary": str(form.get(f"challenges_summary_{index}", "")).strip(),
                "manager_notes": str(form.get(f"manager_notes_{index}", "")).strip(),
                "next_week_action_plan": str(form.get(f"next_week_action_plan_{index}", "")).strip(),
            }
        )

    overall_challenges = str(form.get("overall_challenges", "")).strip()
    bottleneck_risk = str(form.get("bottleneck_risk", "")).strip() or derive_bottleneck_risk(overall_challenges)

    await db.weekly_reports.update_one(
        {"_id": report["_id"]},
        {
            "$set": {
                "team_summary": str(form.get("team_summary", "")).strip(),
                "overall_challenges": overall_challenges,
                "bottleneck_risk": bottleneck_risk,
                "rows": normalize_report_rows(rows),
                "status": "final",
                "updated_at": datetime.now(timezone.utc),
            }
        },
    )
    return RedirectResponse(f"/admin/reports/{report_id}/download", status_code=303)


@router.get("/reports/{report_id}/download")
async def download_report(report_id: str, current_user: dict = Depends(get_current_lead)):
    db = get_database()
    report = await db.weekly_reports.find_one({"_id": parse_object_id(report_id), "lead_id": current_user["_id"]})
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    report["rows"] = normalize_report_rows(report.get("rows", []))
    report["bottleneck_risk"] = report.get("bottleneck_risk") or derive_bottleneck_risk(report.get("overall_challenges", ""))
    lead_name = f"{current_user['first_name']} {current_user['last_name']}".strip()
    pdf_bytes = build_weekly_report_pdf(object_id_str(report), lead_name)
    filename = f"weekly-report-{report['week_start']}-to-{report['week_end']}.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
