from datetime import date, datetime, timedelta, timezone
from typing import Any

from bson import ObjectId
from fastapi import APIRouter, HTTPException, Request, status

from app.database import get_database
from app.dependencies import (
    is_valid_iso_date,
    object_id_str,
    parse_object_id,
    validate_new_password,
)
from app.security import hash_password, verify_password
from app.services.ai_summary import derive_bottleneck_risk, group_updates_for_summary, summarize_weekly_updates
from app.services.email_service import send_email
from app.services.report_schema import build_template_report, normalize_report_template


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


def report_tail_fields(report: dict[str, Any]) -> dict[str, str]:
    return {
        "overall_challenges": str(report.get("overall_challenges", "")).strip(),
        "bottleneck_risk": str(report.get("bottleneck_risk", "")).strip(),
        "overall_next_week_plan": str(report.get("overall_next_week_plan", "")).strip(),
    }


def normalize_report_payload(report: dict[str, Any]) -> dict[str, Any]:
    template = normalize_report_template(report)
    return {
        "client_label": template["client_label"],
        "prepared_by": template["prepared_by"],
        "executive_summary": template["executive_summary"],
        "lead_activities": template["lead_activities"],
        "client_feedback": template["client_feedback"],
        "client_action_taken": template["client_action_taken"],
        "client_feedback_status": template["client_feedback_status"],
        "delivery_assessment_plan": template["delivery_assessment_plan"],
        "new_batch_kickoffs": template["new_batch_kickoffs"],
        "assessments_scheduled": template["assessments_scheduled"],
        "remarks_escalations": template["remarks_escalations"],
        "report_prepared_by": template["report_prepared_by"],
        "report_date": template["report_date"],
        "overall_challenges": template["overall_challenges"],
        "bottleneck_risk": template["bottleneck_risk"],
        "overall_next_week_plan": template["overall_next_week_plan"],
        "last_week_rows": template["last_week_rows"],
        "upcoming_week_rows": template["upcoming_week_rows"],
        "detailed_observations": template["detailed_observations"],
        "bottleneck_rows": template["bottleneck_rows"],
        "action_items": template["action_items"],
        "readiness_checklist": template["readiness_checklist"],
    }


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


def full_name(user: dict[str, Any] | None) -> str:
    if not user:
        return "Unknown"
    return f"{user.get('first_name', '')} {user.get('last_name', '')}".strip() or user.get("email", "Unknown")


def normalize_status(value: str, allowed: set[str], fallback: str) -> str:
    cleaned = str(value or "").strip().lower().replace(" ", "_")
    return cleaned if cleaned in allowed else fallback


def iso_now() -> datetime:
    return datetime.now(timezone.utc)


async def create_notification(
    user_id,
    title: str,
    body: str,
    kind: str,
    link: str,
    meta: dict[str, Any] | None = None,
) -> None:
    db = get_database()
    await db.notifications.insert_one(
        {
            "user_id": user_id,
            "title": title.strip(),
            "body": body.strip(),
            "kind": kind.strip(),
            "link": link.strip(),
            "meta": meta or {},
            "is_read": False,
            "created_at": iso_now(),
        }
    )


def serialize_notification(item: dict[str, Any]) -> dict[str, Any]:
    data = object_id_str(item) or {}
    created_at = data.get("created_at")
    if isinstance(created_at, datetime):
        data["created_at"] = created_at.isoformat()
    return data


async def build_notifications(user_id, limit: int = 8) -> list[dict[str, Any]]:
    db = get_database()
    items = await db.notifications.find({"user_id": user_id}).sort("created_at", -1).limit(limit).to_list(length=limit)
    return [serialize_notification(item) for item in items]


async def get_member_missing_dates(user_id, days: int = 30) -> list[str]:
    db = get_database()
    rows: list[str] = []
    target_dates = workdays_back(days)
    for target_date in target_dates:
        leave = await db.leave_days.find_one({"user_id": user_id, "date": target_date})
        update = await db.daily_updates.find_one({"user_id": user_id, "date": target_date})
        pending_request = await db.update_requests.find_one(
            {"user_id": user_id, "date": target_date, "status": "pending"}
        )
        if not leave and not update and not pending_request:
            rows.append(target_date)
    return rows


async def get_member_request_history(user_id) -> list[dict[str, Any]]:
    db = get_database()
    history: list[dict[str, Any]] = []
    async for item in db.update_requests.find({"user_id": user_id}).sort("created_at", -1):
        row = object_id_str(item) or {}
        created_at = row.get("created_at")
        reviewed_at = row.get("reviewed_at")
        if isinstance(created_at, datetime):
            row["created_at"] = created_at.isoformat()
        if isinstance(reviewed_at, datetime):
            row["reviewed_at"] = reviewed_at.isoformat()
        history.append(row)
    return history


def serialize_todo(item: dict[str, Any]) -> dict[str, Any]:
    data = object_id_str(item) or {}
    for key in ("created_at", "updated_at", "completed_at"):
        if isinstance(data.get(key), datetime):
            data[key] = data[key].isoformat()
    return data


async def build_member_todos(
    user_id,
    deadline_from: str = "",
    deadline_to: str = "",
    status_value: str = "",
) -> list[dict[str, Any]]:
    db = get_database()
    query: dict[str, Any] = {"user_id": user_id}
    date_filter: dict[str, Any] = {}
    if deadline_from:
        date_filter["$gte"] = deadline_from
    if deadline_to:
        date_filter["$lte"] = deadline_to
    if date_filter:
        query["deadline"] = date_filter
    if status_value:
        query["status"] = normalize_status(status_value, {"pending", "in_progress", "completed"}, "pending")
    rows = await db.member_todos.find(query).sort([("deadline", 1), ("created_at", -1)]).to_list(length=500)
    return [serialize_todo(item) for item in rows]


def serialize_task(item: dict[str, Any]) -> dict[str, Any]:
    data = object_id_str(item) or {}
    if isinstance(data.get("assignee_id"), ObjectId):
        data["assignee_id"] = str(data["assignee_id"])
    for key in ("created_at", "updated_at"):
        if isinstance(data.get(key), datetime):
            data[key] = data[key].isoformat()
    activities = []
    for activity in data.get("activities", []):
        entry = dict(activity)
        if isinstance(entry.get("created_at"), datetime):
            entry["created_at"] = entry["created_at"].isoformat()
        if isinstance(entry.get("sender_id"), ObjectId):
            entry["sender_id"] = str(entry["sender_id"])
        activities.append(entry)
    data["activities"] = activities
    return data


async def build_assigned_tasks_for_user(user: dict[str, Any]) -> list[dict[str, Any]]:
    db = get_database()
    query = {"lead_id": user["_id"]} if user.get("role") == "lead" else {"assignee_id": user["_id"]}
    rows = await db.assigned_tasks.find(query).sort([("status", 1), ("eta", 1), ("created_at", -1)]).to_list(length=500)
    tasks: list[dict[str, Any]] = []
    for task in rows:
        assignee = await db.users.find_one({"_id": task["assignee_id"]})
        lead = await db.users.find_one({"_id": task["lead_id"]})
        item = serialize_task(task)
        item["assignee_name"] = full_name(assignee)
        item["assignee_email"] = assignee.get("email", "") if assignee else ""
        item["lead_name"] = full_name(lead)
        tasks.append(item)
    return tasks


async def build_overdue_todos(user_id) -> list[dict[str, Any]]:
    db = get_database()
    today = date.today().isoformat()
    rows = await db.member_todos.find(
        {"user_id": user_id, "deadline": {"$lt": today}, "status": {"$ne": "completed"}}
    ).sort("deadline", 1).limit(5).to_list(length=5)
    return [serialize_todo(item) for item in rows]


async def build_overdue_tasks(user_id) -> list[dict[str, Any]]:
    db = get_database()
    today = date.today().isoformat()
    rows = await db.assigned_tasks.find(
        {"assignee_id": user_id, "eta": {"$lt": today}, "status": {"$nin": ["done", "completed"]}}
    ).sort("eta", 1).limit(5).to_list(length=5)
    return [serialize_task(item) for item in rows]


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
            pending_request = await db.update_requests.find_one(
                {"user_id": member["_id"], "date": target_date, "status": "pending"}
            )
            if not leave and not update and not pending_request:
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
        leave = await db.leave_days.find_one({"user_id": item["user_id"], "date": item["date"]})
        update = await db.daily_updates.find_one({"user_id": item["user_id"], "date": item["date"]})
        if leave or (update and item.get("request_type") == "missed_day") or (update and item.get("request_type") == "late_eod" and update.get("proof_of_work")):
            await db.update_requests.update_one(
                {"_id": item["_id"]},
                {"$set": {"status": "resolved", "reviewed_at": iso_now()}},
            )
            continue
        user = await db.users.find_one({"_id": item["user_id"]})
        row = object_id_str(item)
        row["member_name"] = f"{user['first_name']} {user.get('last_name', '')}".strip() if user else "Unknown"
        row["email"] = user["email"] if user else ""
        payload = row.get("payload", {}) or {}
        row["plan"] = payload.get("plan", "")
        row["eta"] = payload.get("eta", "")
        row["client_name"] = payload.get("client_name", "")
        row["extra_work"] = payload.get("extra_work", "")
        row["challenges"] = payload.get("challenges", "")
        row["proof_of_work"] = payload.get("proof_of_work", "")
        requests.append(row)
    return requests


async def build_admin_dashboard_payload(current_user: dict[str, Any], member_name: str = "", update_date: str = "") -> dict[str, Any]:
    db = get_database()
    users_cursor = db.users.find({"lead_id": current_user["_id"], "role": "member"}).sort("first_name", 1)
    users = []
    async for user in users_cursor:
        item = object_id_str(user) or {}
        missing_dates = await get_member_missing_dates(user["_id"])
        item["missing_day_count"] = len(missing_dates)
        item["open_task_count"] = await db.assigned_tasks.count_documents(
            {"assignee_id": user["_id"], "status": {"$nin": ["done", "completed"]}}
        )
        users.append(item)

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

    notifications = await build_notifications(current_user["_id"])
    assigned_tasks = await build_assigned_tasks_for_user(current_user)
    open_tasks = [task for task in assigned_tasks if task.get("status") not in {"done", "completed"}]

    return {
        "user": object_id_str(current_user),
        "team_members": users,
        "updates": updates,
        "reports": reports,
        "total_entries": total_entries,
        "entry_trend": entry_trend,
        "assigned_tasks": assigned_tasks,
        "open_task_count": len(open_tasks),
        "pending_requests": await build_pending_requests(current_user["_id"]),
        "missing_days": await build_missing_day_rows(current_user["_id"]),
        "notifications": notifications,
        "unread_notifications": len([item for item in notifications if not item.get("is_read")]),
        "filters": {"member_name": member_name, "update_date": update_date},
        "week_start": (date.today() - timedelta(days=date.today().weekday())).isoformat(),
        "week_end": date.today().isoformat(),
    }


async def build_member_dashboard_payload(
    current_user: dict[str, Any],
    edit_date: str = "",
    request_date: str = "",
    section: str = "dashboard",
) -> dict[str, Any]:
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

    recent_updates = []
    if section in {"dashboard", "history", "workspace"}:
        cursor = db.daily_updates.find({"user_id": current_user["_id"]}).sort("date", -1).limit(10)
        recent_updates = [object_id_str(item) async for item in cursor]
    pending_requests: list[dict] = []
    if section in {"dashboard", "requests", "workspace"}:
        async for item in db.update_requests.find({"user_id": current_user["_id"], "status": "pending"}).sort("created_at", -1):
            leave = await db.leave_days.find_one({"user_id": current_user["_id"], "date": item["date"]})
            update = await db.daily_updates.find_one({"user_id": current_user["_id"], "date": item["date"]})
            if leave or (update and item.get("request_type") == "missed_day") or (update and item.get("request_type") == "late_eod" and update.get("proof_of_work")):
                await db.update_requests.update_one(
                    {"_id": item["_id"]},
                    {"$set": {"status": "resolved", "reviewed_at": iso_now()}},
                )
                continue
            pending_requests.append(object_id_str(item))
    total_entries = await db.daily_updates.count_documents({"user_id": current_user["_id"]})
    trend_dates = recent_dates(7)
    entry_trend = []
    for target_date in trend_dates:
        count = await db.daily_updates.count_documents({"user_id": current_user["_id"], "date": target_date})
        entry_trend.append({"date": target_date, "count": count})

    missing_dates = await get_member_missing_dates(current_user["_id"]) if section in {"dashboard", "requests", "workspace"} else []
    todos = await build_member_todos(current_user["_id"]) if section in {"dashboard", "todo"} else []
    overdue_todos = [item for item in todos if item.get("deadline") and item["deadline"] < today and item.get("status") != "completed"][:5]
    assigned_tasks = await build_assigned_tasks_for_user(current_user) if section in {"dashboard", "tasks"} else []
    overdue_tasks = [item for item in assigned_tasks if item.get("eta") and item["eta"] < today and item.get("status") not in {"done", "completed"}][:5]
    notifications = await build_notifications(current_user["_id"]) if section in {"dashboard", "tasks", "requests", "workspace", "history", "todo"} else []

    return {
        "user": object_id_str(current_user),
        "today": today,
        "form_data": form_data,
        "is_editing": is_editing,
        "is_requesting_missing_day": is_requesting_missing_day,
        "recent_updates": recent_updates,
        "pending_requests": pending_requests,
        "request_history": await get_member_request_history(current_user["_id"]) if section in {"dashboard", "requests", "workspace", "history"} else [],
        "total_entries": total_entries,
        "entry_trend": entry_trend,
        "missing_dates": missing_dates,
        "missing_day_count": len(missing_dates),
        "todos": todos,
        "overdue_todos": overdue_todos,
        "assigned_tasks": assigned_tasks,
        "overdue_tasks": overdue_tasks,
        "notifications": notifications,
        "unread_notifications": len([item for item in notifications if not item.get("is_read")]),
}


@router.get("/member/daily-update-status")
async def api_member_daily_update_status(request: Request, target_date: str):
    current_user = await get_api_current_user(request, "member")
    if not target_date or not is_valid_iso_date(target_date):
        raise HTTPException(status_code=400, detail="A valid date is required.")

    today = date.today().isoformat()
    if target_date > today:
        return {
            "status": "future_invalid",
            "message": "Future dates are not allowed.",
            "target_date": target_date,
        }

    db = get_database()
    existing_update = await db.daily_updates.find_one({"user_id": current_user["_id"], "date": target_date})
    pending_request = await db.update_requests.find_one(
        {"user_id": current_user["_id"], "date": target_date, "status": "pending"}
    )
    if pending_request:
        return {
            "status": "pending_request",
            "message": "A request is already pending for this date.",
            "target_date": target_date,
            "request": object_id_str(pending_request),
        }

    if existing_update:
        form_data = object_id_str(existing_update) or blank_member_form(target_date)
        form_data["request_reason"] = ""
        return {
            "status": "existing_update_today" if target_date == today else "existing_update_past",
            "message": "An update already exists for this date.",
            "target_date": target_date,
            "form_data": form_data,
            "is_editing": True,
            "is_requesting_missing_day": False,
        }

    if target_date == today:
        return {
            "status": "today_new",
            "message": "You can create a new update for today.",
            "target_date": target_date,
            "form_data": blank_member_form(target_date),
            "is_editing": False,
            "is_requesting_missing_day": False,
        }

    return {
        "status": "request_required",
        "message": "Changing the date requires an approval request to the admin.",
        "target_date": target_date,
        "form_data": blank_member_form(target_date),
        "is_editing": False,
        "is_requesting_missing_day": True,
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


@router.get("/notifications")
async def api_notifications(request: Request):
    current_user = await get_api_current_user(request)
    items = await build_notifications(current_user["_id"], limit=12)
    return {
        "items": items,
        "unread_count": len([item for item in items if not item.get("is_read")]),
    }


@router.post("/notifications/{notification_id}/read")
async def api_mark_notification_read(request: Request, notification_id: str):
    current_user = await get_api_current_user(request)
    db = get_database()
    result = await db.notifications.update_one(
        {"_id": parse_object_id(notification_id), "user_id": current_user["_id"]},
        {"$set": {"is_read": True, "read_at": iso_now()}},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Notification not found.")
    return {"ok": True, "message": "Notification marked as read."}


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


@router.post("/admin/requests/{request_id}/reset")
async def api_reset_request(request: Request, request_id: str):
    current_user = await get_api_current_user(request, "lead")
    db = get_database()
    result = await db.update_requests.update_one(
        {"_id": parse_object_id(request_id), "lead_id": current_user["_id"], "status": "pending"},
        {"$set": {"status": "reset", "reviewed_at": iso_now(), "reviewed_by": current_user["_id"]}},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Request not found.")
    return {"ok": True, "message": "Pending request reset."}


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
    await db.update_requests.update_many(
        {"user_id": member["_id"], "date": missing_date, "status": "pending"},
        {"$set": {"status": "leave_marked", "reviewed_at": iso_now(), "reviewed_by": current_user["_id"]}},
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
    lead_name = full_name(current_user)
    template_payload = build_template_report(
        week_start=week_start,
        week_end=week_end,
        lead_name=lead_name,
        summary=summary,
        members_payload=members_payload,
    )
    report = {
        "lead_id": current_user["_id"],
        "week_start": week_start,
        "week_end": week_end,
        "team_summary": summary.get("team_summary", ""),
        "overall_challenges": summary.get("overall_challenges", ""),
        "bottleneck_risk": bottleneck_risk,
        "overall_next_week_plan": summary.get("overall_next_week_plan", ""),
        "rows": normalized_rows,
        **template_payload,
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
    report["overall_next_week_plan"] = report.get("overall_next_week_plan", "")
    report.update(normalize_report_payload(report))
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
    overall_next_week_plan = str(payload.get("overall_next_week_plan", "")).strip()
    rows = normalize_report_rows(payload.get("rows", []))
    template_payload = normalize_report_payload(payload)
    template_payload["overall_challenges"] = overall_challenges
    template_payload["bottleneck_risk"] = bottleneck_risk
    template_payload["overall_next_week_plan"] = overall_next_week_plan
    await db.weekly_reports.update_one(
        {"_id": report["_id"]},
        {
            "$set": {
                "team_summary": str(payload.get("team_summary", "")).strip(),
                "overall_challenges": overall_challenges,
                "bottleneck_risk": bottleneck_risk,
                "overall_next_week_plan": overall_next_week_plan,
                "rows": rows,
                **template_payload,
                "status": "final",
                "updated_at": datetime.now(timezone.utc),
            }
        },
    )
    return {"ok": True, "message": "Report saved.", "download_url": f"/admin/reports/{report_id}/download"}


@router.get("/member/dashboard")
async def member_dashboard_data(request: Request, edit_date: str = "", request_date: str = "", section: str = "dashboard"):
    current_user = await get_api_current_user(request, "member")
    return await build_member_dashboard_payload(current_user, edit_date, request_date, section)


@router.get("/member/todos")
async def api_member_todos(
    request: Request,
    deadline_from: str = "",
    deadline_to: str = "",
    completion: str = "",
):
    current_user = await get_api_current_user(request, "member")
    status_value = ""
    if completion == "completed":
        status_value = "completed"
    elif completion == "open":
        status_value = ""
    elif completion:
        status_value = completion
    rows = await build_member_todos(current_user["_id"], deadline_from, deadline_to, status_value)
    if completion == "open":
        rows = [item for item in rows if item.get("status") != "completed"]
    return {"items": rows}


@router.post("/member/todos")
async def api_create_member_todo(request: Request):
    current_user = await get_api_current_user(request, "member")
    payload = await request.json()
    title = str(payload.get("title", "")).strip()
    details = str(payload.get("details", "")).strip()
    deadline = str(payload.get("deadline", "")).strip()
    status_value = normalize_status(payload.get("status", "pending"), {"pending", "in_progress", "completed"}, "pending")
    if not title:
        raise HTTPException(status_code=400, detail="Todo title is required.")
    if not deadline or not is_valid_iso_date(deadline):
        raise HTTPException(status_code=400, detail="A valid deadline is required.")
    db = get_database()
    document = {
        "user_id": current_user["_id"],
        "title": title,
        "details": details,
        "deadline": deadline,
        "status": status_value,
        "created_at": iso_now(),
        "updated_at": iso_now(),
    }
    if status_value == "completed":
        document["completed_at"] = iso_now()
    inserted = await db.member_todos.insert_one(document)
    return {"ok": True, "message": "Todo added.", "item_id": str(inserted.inserted_id)}


@router.post("/member/todos/{todo_id}")
async def api_update_member_todo(request: Request, todo_id: str):
    current_user = await get_api_current_user(request, "member")
    payload = await request.json()
    db = get_database()
    todo = await db.member_todos.find_one({"_id": parse_object_id(todo_id), "user_id": current_user["_id"]})
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found.")

    title = str(payload.get("title", todo.get("title", ""))).strip()
    details = str(payload.get("details", todo.get("details", ""))).strip()
    deadline = str(payload.get("deadline", todo.get("deadline", ""))).strip()
    status_value = normalize_status(payload.get("status", todo.get("status", "pending")), {"pending", "in_progress", "completed"}, "pending")
    if not title:
        raise HTTPException(status_code=400, detail="Todo title is required.")
    if not deadline or not is_valid_iso_date(deadline):
        raise HTTPException(status_code=400, detail="A valid deadline is required.")

    update_doc: dict[str, Any] = {
        "title": title,
        "details": details,
        "deadline": deadline,
        "status": status_value,
        "updated_at": iso_now(),
    }
    if status_value == "completed":
        update_doc["completed_at"] = iso_now()
    else:
        update_doc["completed_at"] = None
    await db.member_todos.update_one({"_id": todo["_id"]}, {"$set": update_doc})
    return {"ok": True, "message": "Todo updated."}


@router.get("/tasks")
async def api_tasks(request: Request):
    current_user = await get_api_current_user(request)
    return {"items": await build_assigned_tasks_for_user(current_user)}


@router.post("/admin/tasks")
async def api_create_assigned_task(request: Request):
    current_user = await get_api_current_user(request, "lead")
    payload = await request.json()
    assignee_id = str(payload.get("assignee_id", "")).strip()
    title = str(payload.get("title", "")).strip()
    description = str(payload.get("description", "")).strip()
    eta = str(payload.get("eta", "")).strip()
    remarks = str(payload.get("remarks", "")).strip()
    status_value = normalize_status(payload.get("status", "todo"), {"todo", "in_progress", "blocked", "done"}, "todo")
    if not assignee_id:
        raise HTTPException(status_code=400, detail="Assignee is required.")
    if not title:
        raise HTTPException(status_code=400, detail="Task title is required.")
    if not eta or not is_valid_iso_date(eta):
        raise HTTPException(status_code=400, detail="A valid ETA is required.")

    db = get_database()
    assignee = await db.users.find_one({"_id": parse_object_id(assignee_id), "lead_id": current_user["_id"], "role": "member"})
    if not assignee:
        raise HTTPException(status_code=404, detail="Member not found.")

    document = {
        "lead_id": current_user["_id"],
        "assignee_id": assignee["_id"],
        "title": title,
        "description": description,
        "eta": eta,
        "remarks": remarks,
        "status": status_value,
        "activities": [
            {
                "sender_id": current_user["_id"],
                "sender_name": full_name(current_user),
                "message": "Task assigned.",
                "proof": "",
                "status": status_value,
                "created_at": iso_now(),
            }
        ],
        "created_at": iso_now(),
        "updated_at": iso_now(),
    }
    inserted = await db.assigned_tasks.insert_one(document)
    await create_notification(
        assignee["_id"],
        "New task assigned",
        f"{title} has been assigned to you.",
        "task_assigned",
        "#tasks",
        {"task_id": str(inserted.inserted_id)},
    )
    return {"ok": True, "message": "Task assigned."}


@router.post("/tasks/{task_id}")
async def api_update_task(request: Request, task_id: str):
    current_user = await get_api_current_user(request)
    payload = await request.json()
    db = get_database()
    query = {"_id": parse_object_id(task_id)}
    if current_user.get("role") == "lead":
        query["lead_id"] = current_user["_id"]
    else:
        query["assignee_id"] = current_user["_id"]
    task = await db.assigned_tasks.find_one(query)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found.")

    status_allowed = {"todo", "in_progress", "blocked", "done"}
    status_value = normalize_status(payload.get("status", task.get("status", "todo")), status_allowed, task.get("status", "todo"))
    update_fields: dict[str, Any] = {"status": status_value, "updated_at": iso_now()}
    message = str(payload.get("message", "")).strip()
    proof = str(payload.get("proof", "")).strip()
    if current_user.get("role") == "lead":
        remarks = str(payload.get("remarks", task.get("remarks", ""))).strip()
        eta = str(payload.get("eta", task.get("eta", ""))).strip()
        title = str(payload.get("title", task.get("title", ""))).strip()
        description = str(payload.get("description", task.get("description", ""))).strip()
        if not title:
            raise HTTPException(status_code=400, detail="Task title is required.")
        if not eta or not is_valid_iso_date(eta):
            raise HTTPException(status_code=400, detail="A valid ETA is required.")
        update_fields.update({"remarks": remarks, "eta": eta, "title": title, "description": description})
    else:
        if not message and not proof and status_value == task.get("status"):
            raise HTTPException(status_code=400, detail="Add a status change, proof, or acknowledgement update.")

    activity = None
    if message or proof or status_value != task.get("status"):
        activity = {
            "sender_id": current_user["_id"],
            "sender_name": full_name(current_user),
            "message": message,
            "proof": proof,
            "status": status_value,
            "created_at": iso_now(),
        }

    update_operation: dict[str, Any] = {"$set": update_fields}
    if activity:
        update_operation["$push"] = {"activities": activity}
    await db.assigned_tasks.update_one({"_id": task["_id"]}, update_operation)

    if current_user.get("role") == "member":
        await create_notification(
            task["lead_id"],
            "Task updated by member",
            f"{full_name(current_user)} updated task: {task.get('title', '')}",
            "task_updated",
            "#tasks",
            {"task_id": str(task["_id"])},
        )
    return {"ok": True, "message": "Task updated."}


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

    if not cleaned_date or not is_valid_iso_date(cleaned_date):
        raise HTTPException(status_code=400, detail="A valid date is required.")
    if cleaned_date > today:
        raise HTTPException(status_code=400, detail="Future dates are not allowed.")

    db = get_database()
    existing = await db.daily_updates.find_one({"user_id": current_user["_id"], "date": cleaned_date})

    if cleaned_date < today:
        if existing:
            if not cleaned_proof:
                raise HTTPException(status_code=400, detail="Proof of work is mandatory for late EOD requests.")
            if not cleaned_reason:
                raise HTTPException(status_code=400, detail="Reason is mandatory for previous day updates.")
            await db.update_requests.update_one(
                {"user_id": current_user["_id"], "date": cleaned_date, "request_type": "late_eod", "status": "pending"},
                {
                    "$set": {
                        "lead_id": current_user["lead_id"],
                        "payload": {
                            "plan": existing.get("plan", ""),
                            "eta": existing.get("eta", ""),
                            "client_name": existing.get("client_name", ""),
                            "is_corporate": existing.get("is_corporate", False),
                            "is_university": existing.get("is_university", False),
                            "extra_work": cleaned_extra,
                            "challenges": cleaned_challenges,
                            "proof_of_work": cleaned_proof,
                        },
                        "reason": cleaned_reason,
                        "updated_at": datetime.now(timezone.utc),
                    },
                    "$setOnInsert": {
                        "user_id": current_user["_id"],
                        "request_type": "late_eod",
                        "date": cleaned_date,
                        "status": "pending",
                        "created_at": datetime.now(timezone.utc),
                    },
                },
                upsert=True,
            )
            return {"ok": True, "message": "Late EOD request submitted for approval.", "next": {"view": "workspace"}}

        if not cleaned_plan:
            raise HTTPException(status_code=400, detail="Morning plan is required.")
        if not cleaned_eta:
            raise HTTPException(status_code=400, detail="ETA is required.")
        if not cleaned_client:
            raise HTTPException(status_code=400, detail="Client is required.")
        if not is_corporate and not is_university:
            raise HTTPException(status_code=400, detail="Select at least one category: corporate or university.")
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
                "$setOnInsert": {
                    "user_id": current_user["_id"],
                    "request_type": "missed_day",
                    "date": cleaned_date,
                    "status": "pending",
                    "created_at": datetime.now(timezone.utc),
                },
            },
            upsert=True,
        )
        return {"ok": True, "message": "Missed-day request submitted for approval.", "next": {"view": "workspace"}}

    if existing:
        if cleaned_date != today:
            raise HTTPException(status_code=400, detail="Past-date entries must go through approval requests.")

        if not cleaned_proof:
            raise HTTPException(status_code=400, detail="Proof of work is mandatory while editing an existing task.")
        await db.daily_updates.update_one(
            {"_id": existing["_id"]},
            {"$set": {"extra_work": cleaned_extra, "challenges": cleaned_challenges, "proof_of_work": cleaned_proof, "updated_at": datetime.now(timezone.utc)}},
        )
        return {"ok": True, "message": "End-of-day update saved.", "next": {"view": "history"}}

    if not cleaned_plan:
        raise HTTPException(status_code=400, detail="Morning plan is required.")
    if not cleaned_eta:
        raise HTTPException(status_code=400, detail="ETA is required.")
    if not cleaned_client:
        raise HTTPException(status_code=400, detail="Client is required.")
    if not is_corporate and not is_university:
        raise HTTPException(status_code=400, detail="Select at least one category: corporate or university.")

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
