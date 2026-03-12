from datetime import date, datetime, timezone

from fastapi import APIRouter, Depends, Form, HTTPException, Request
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates

from app.database import get_database
from app.dependencies import get_current_member, object_id_str
from app.security import hash_password, verify_password


router = APIRouter(prefix="/member", tags=["member"])
templates = Jinja2Templates(directory="app/templates")


def _blank_form(target_date: str) -> dict:
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


@router.get("/dashboard")
async def member_dashboard(
    request: Request,
    edit_date: str = "",
    request_date: str = "",
    current_user: dict = Depends(get_current_member),
):
    return templates.TemplateResponse("spa.html", {"request": request})


@router.post("/daily-update")
async def save_daily_update(
    request: Request,
    current_user: dict = Depends(get_current_member),
    entry_date: str = Form(...),
    plan: str = Form(""),
    extra_work: str = Form(""),
    challenges: str = Form(""),
    eta: str = Form(""),
    proof_of_work: str = Form(""),
    client_name: str = Form(""),
    request_reason: str = Form(""),
    is_corporate: str | None = Form(None),
    is_university: str | None = Form(None),
):
    cleaned_date = entry_date.strip()
    cleaned_plan = plan.strip()
    cleaned_eta = eta.strip()
    cleaned_client = client_name.strip()
    cleaned_extra = extra_work.strip()
    cleaned_challenges = challenges.strip()
    cleaned_proof = proof_of_work.strip()
    cleaned_reason = request_reason.strip()
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
                        "payload": {
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
            return RedirectResponse("/member/dashboard", status_code=303)

        if not cleaned_proof:
            raise HTTPException(status_code=400, detail="Proof of work is mandatory while editing an existing task.")
        await db.daily_updates.update_one(
            {"_id": existing["_id"]},
            {
                "$set": {
                    "extra_work": cleaned_extra,
                    "challenges": cleaned_challenges,
                    "proof_of_work": cleaned_proof,
                    "updated_at": datetime.now(timezone.utc),
                }
            },
        )
        return RedirectResponse("/member/dashboard", status_code=303)

    if not cleaned_date:
        raise HTTPException(status_code=400, detail="Date is required.")
    if not cleaned_plan:
        raise HTTPException(status_code=400, detail="Morning plan is required.")
    if not cleaned_eta:
        raise HTTPException(status_code=400, detail="ETA is required.")
    if not cleaned_client:
        raise HTTPException(status_code=400, detail="Client is required.")
    if is_corporate is None and is_university is None:
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
                        "is_corporate": is_corporate is not None,
                        "is_university": is_university is not None,
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
        return RedirectResponse("/member/dashboard", status_code=303)

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
            "is_corporate": is_corporate is not None,
            "is_university": is_university is not None,
            "created_at": datetime.now(timezone.utc),
            "updated_at": datetime.now(timezone.utc),
        }
    )
    return RedirectResponse(f"/member/dashboard?edit_date={cleaned_date}", status_code=303)


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
