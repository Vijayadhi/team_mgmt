from datetime import date, datetime, timezone

from fastapi import APIRouter, Depends, Form, HTTPException, Request
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates

from app.database import get_database
from app.dependencies import get_current_member, object_id_str
from app.security import hash_password, verify_password


router = APIRouter(prefix="/member", tags=["member"])
templates = Jinja2Templates(directory="app/templates")


def _blank_form(today: str) -> dict:
    return {
        "date": today,
        "plan": "",
        "completed_work": "",
        "extra_work": "",
        "challenges": "",
        "eta": "",
        "proof_of_work": "",
        "client_name": "",
        "is_corporate": False,
        "is_university": False,
    }


@router.get("/dashboard")
async def member_dashboard(
    request: Request,
    edit_date: str = "",
    current_user: dict = Depends(get_current_member),
):
    db = get_database()
    today = date.today().isoformat()
    edit_update = None
    if edit_date:
        edit_update = await db.daily_updates.find_one({"user_id": current_user["_id"], "date": edit_date})

    cursor = db.daily_updates.find({"user_id": current_user["_id"]}).sort("date", -1).limit(10)
    recent_updates = [object_id_str(item) async for item in cursor]

    return templates.TemplateResponse(
        "member/dashboard.html",
        {
            "request": request,
            "user": object_id_str(current_user),
            "today": today,
            "form_data": object_id_str(edit_update) or _blank_form(today),
            "is_editing": bool(edit_update),
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
    eta: str = Form(""),
    proof_of_work: str = Form(""),
    client_name: str = Form(""),
    is_corporate: str | None = Form(None),
    is_university: str | None = Form(None),
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
                "eta": eta.strip(),
                "proof_of_work": proof_of_work.strip(),
                "client_name": client_name.strip(),
                "is_corporate": is_corporate is not None,
                "is_university": is_university is not None,
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


@router.post("/change-password")
async def change_password(
    request: Request,
    current_user: dict = Depends(get_current_member),
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
    return RedirectResponse("/member/dashboard", status_code=303)
