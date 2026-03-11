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


def build_brand_name(team_name: str | None) -> str:
    cleaned = (team_name or "Team Daily Tracker").strip() or "Team Daily Tracker"
    return f"iamneo | {cleaned}"


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
        if "team_name" not in existing:
            await db.users.update_one(
                {"_id": existing["_id"]},
                {"$set": {"team_name": "Team Daily Tracker", "updated_at": datetime.now(timezone.utc)}},
            )
        return
    await db.users.insert_one(
        {
            "first_name": settings.default_admin_firstname,
            "last_name": settings.default_admin_lastname,
            "email": settings.default_admin_email.lower(),
            "password_hash": hash_password(settings.default_admin_password),
            "role": "lead",
            "team_name": "Team Daily Tracker",
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


@app.middleware("http")
async def attach_brand_name(request: Request, call_next):
    request.state.app_title = build_brand_name(None)
    session = request.scope.get("session") or {}
    user_id = session.get("user_id")

    if user_id:
        db = get_database()
        user = await db.users.find_one({"_id": parse_object_id(user_id)})
        if user:
            if user.get("role") == "lead":
                request.state.app_title = build_brand_name(user.get("team_name"))
            elif user.get("lead_id"):
                lead = await db.users.find_one({"_id": user["lead_id"]})
                request.state.app_title = build_brand_name(lead.get("team_name") if lead else None)

    response = await call_next(request)
    return response


@app.get("/")
async def root(request: Request):
    session = request.scope.get("session") or {}
    user_id = session.get("user_id")
    if not user_id:
        return RedirectResponse("/login", status_code=303)
    db = get_database()
    user = await db.users.find_one({"_id": parse_object_id(user_id)})
    if not user:
        request.session.clear()
        return RedirectResponse("/login", status_code=303)
    return RedirectResponse("/admin/dashboard" if user["role"] == "lead" else "/member/dashboard", status_code=303)
