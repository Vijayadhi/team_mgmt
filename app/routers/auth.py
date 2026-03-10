from datetime import datetime, timezone

from fastapi import APIRouter, Form, Request
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates

from app.database import get_database
from app.security import verify_password


router = APIRouter()
templates = Jinja2Templates(directory="app/templates")


@router.get("/login")
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request, "error": None})


@router.post("/login")
async def login(request: Request, email: str = Form(...), password: str = Form(...)):
    db = get_database()
    user = await db.users.find_one({"email": email.strip().lower()})
    if not user or not user.get("is_active", True) or not verify_password(password, user["password_hash"]):
        return templates.TemplateResponse(
            "login.html",
            {"request": request, "error": "Invalid credentials or disabled account."},
            status_code=400,
        )

    await db.users.update_one({"_id": user["_id"]}, {"$set": {"last_login_at": datetime.now(timezone.utc)}})
    request.session["user_id"] = str(user["_id"])
    destination = "/admin/dashboard" if user["role"] == "lead" else "/member/dashboard"
    return RedirectResponse(destination, status_code=303)


@router.post("/logout")
async def logout(request: Request):
    request.session.clear()
    return RedirectResponse("/login", status_code=303)
