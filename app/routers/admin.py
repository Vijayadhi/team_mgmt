from datetime import date, datetime, timedelta, timezone

from fastapi import APIRouter, Depends, Form, HTTPException, Request
from fastapi.responses import RedirectResponse, Response
from fastapi.templating import Jinja2Templates

from app.database import get_database
from app.dependencies import format_date, get_current_lead, object_id_str, parse_object_id
from app.security import hash_password, verify_password
from app.services.ai_summary import group_updates_for_summary, summarize_weekly_updates
from app.services.report_pdf import build_weekly_report_pdf


router = APIRouter(prefix="/admin", tags=["admin"])
templates = Jinja2Templates(directory="app/templates")
templates.env.filters["dateformat"] = format_date


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
            "filters": {"member_name": member_name, "update_date": update_date},
            "week_start": (date.today() - timedelta(days=date.today().weekday())).isoformat(),
            "week_end": (date.today() - timedelta(days=date.today().weekday()) + timedelta(days=4)).isoformat(),
        },
    )


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
        {"$set": {"password_hash": hash_password(member["first_name"])}} ,
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
    report = {
        "lead_id": current_user["_id"],
        "week_start": week_start,
        "week_end": week_end,
        "team_summary": summary.get("team_summary", ""),
        "overall_challenges": summary.get("overall_challenges", ""),
        "rows": summary.get("rows", []),
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
            }
        )

    await db.weekly_reports.update_one(
        {"_id": report["_id"]},
        {
            "$set": {
                "team_summary": str(form.get("team_summary", "")).strip(),
                "overall_challenges": str(form.get("overall_challenges", "")).strip(),
                "rows": rows,
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
    lead_name = f"{current_user['first_name']} {current_user['last_name']}".strip()
    pdf_bytes = build_weekly_report_pdf(object_id_str(report), lead_name)
    filename = f"weekly-report-{report['week_start']}-to-{report['week_end']}.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
