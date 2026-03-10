from datetime import date, datetime, timezone

from fastapi import APIRouter, Depends, Form, Request
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates

from app.database import get_database
from app.dependencies import get_current_member, object_id_str


router = APIRouter(prefix="/member", tags=["member"])
templates = Jinja2Templates(directory="app/templates")


@router.get("/dashboard")
async def member_dashboard(request: Request, current_user: dict = Depends(get_current_member)):
    db = get_database()
    today = date.today().isoformat()
    today_update = await db.daily_updates.find_one({"user_id": current_user["_id"], "date": today})
    cursor = db.daily_updates.find({"user_id": current_user["_id"]}).sort("date", -1).limit(10)
    recent_updates = [object_id_str(item) async for item in cursor]
    return templates.TemplateResponse(
        "member/dashboard.html",
        {
            "request": request,
            "user": object_id_str(current_user),
            "today": today,
            "today_update": object_id_str(today_update),
            "recent_updates": recent_updates,
        },
    )


@router.post("/daily-update")
async def save_daily_update(
    request: Request,
    current_user: dict = Depends(get_current_member),
    entry_date: str = Form(...),
    plan: str = Form(""),
    completed_work: str = Form(""),
    extra_work: str = Form(""),
    challenges: str = Form(""),
):
    db = get_database()
    await db.daily_updates.update_one(
        {"user_id": current_user["_id"], "date": entry_date},
        {
            "$set": {
                "lead_id": current_user["lead_id"],
                "date": entry_date,
                "plan": plan.strip(),
                "completed_work": completed_work.strip(),
                "extra_work": extra_work.strip(),
                "challenges": challenges.strip(),
                "updated_at": datetime.now(timezone.utc),
            },
            "$setOnInsert": {
                "user_id": current_user["_id"],
                "created_at": datetime.now(timezone.utc),
            },
        },
        upsert=True,
    )
    return RedirectResponse("/member/dashboard", status_code=303)
