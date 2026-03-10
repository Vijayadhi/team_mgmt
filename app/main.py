from contextlib import asynccontextmanager
from datetime import datetime, timezone

from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware

from app.config import get_settings
from app.database import close_mongo_connection, connect_to_mongo, get_database
from app.dependencies import format_date, parse_object_id
from app.routers import admin, auth, member
from app.security import hash_password


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    await ensure_default_admin()
    yield
    await close_mongo_connection()


async def ensure_default_admin() -> None:
    settings = get_settings()
    db = get_database()
    existing = await db.users.find_one({"email": settings.default_admin_email.lower()})
    if existing:
        return
    await db.users.insert_one(
        {
            "first_name": settings.default_admin_firstname,
            "last_name": settings.default_admin_lastname,
            "email": settings.default_admin_email.lower(),
            "password_hash": hash_password(settings.default_admin_password),
            "role": "lead",
            "is_active": True,
            "created_at": datetime.now(timezone.utc),
        }
    )


app = FastAPI(title="Team Daily Tracker", lifespan=lifespan)
settings = get_settings()
app.add_middleware(SessionMiddleware, secret_key=settings.session_secret, same_site="lax", https_only=False)
app.mount("/static", StaticFiles(directory="app/static"), name="static")

templates = Jinja2Templates(directory="app/templates")
templates.env.filters["dateformat"] = format_date

app.include_router(auth.router)
app.include_router(member.router)
app.include_router(admin.router)


@app.get("/")
async def root(request: Request):
    user_id = request.session.get("user_id")
    if not user_id:
        return RedirectResponse("/login", status_code=303)
    db = get_database()
    user = await db.users.find_one({"_id": parse_object_id(user_id)})
    if not user:
        request.session.clear()
        return RedirectResponse("/login", status_code=303)
    return RedirectResponse("/admin/dashboard" if user["role"] == "lead" else "/member/dashboard", status_code=303)
