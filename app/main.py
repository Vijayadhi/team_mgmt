import asyncio
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from time import monotonic
from collections import defaultdict, deque

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.gzip import GZipMiddleware
from starlette.middleware.sessions import SessionMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware

from app.config import get_settings
from app.database import close_mongo_connection, connect_to_mongo, get_database
from app.dependencies import format_date, parse_object_id
from app.routers import admin, api, auth, member
from app.security import hash_password
from app.services.automation import automation_loop


def build_brand_name(team_name: str | None) -> str:
    cleaned = (team_name or "Team Daily Tracker").strip() or "Team Daily Tracker"
    return f"iamneo | {cleaned}"


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    await ensure_default_admin()
    stop_event = asyncio.Event()
    automation_task = asyncio.create_task(automation_loop(stop_event))
    try:
        yield
    finally:
        stop_event.set()
        automation_task.cancel()
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
rate_buckets: dict[str, deque[float]] = defaultdict(deque)

allowed_hosts = [host.strip() for host in settings.allowed_hosts.split(",") if host.strip()]
if allowed_hosts:
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=allowed_hosts)
app.add_middleware(SessionMiddleware, secret_key=settings.session_secret, same_site="lax", https_only=False)
app.add_middleware(GZipMiddleware, minimum_size=1024)
app.mount("/static", StaticFiles(directory="app/static"), name="static")

templates = Jinja2Templates(directory="app/templates")
templates.env.filters["dateformat"] = format_date

app.include_router(auth.router)
app.include_router(member.router)
app.include_router(admin.router)
app.include_router(api.router)


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
    path = request.url.path
    if path.startswith("/static/spa-build/"):
        if path.endswith(".js") or path.endswith(".css"):
            response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
        else:
            response.headers["Cache-Control"] = "public, max-age=86400"
    return response


@app.middleware("http")
async def protect_application(request: Request, call_next):
    path = request.url.path
    if path.startswith("/static/"):
        return await call_next(request)

    content_length = request.headers.get("content-length")
    if content_length:
        try:
            if int(content_length) > settings.max_request_bytes:
                return JSONResponse({"detail": "Payload too large."}, status_code=413)
        except ValueError:
            pass

    client_ip = request.client.host if request.client else "unknown"
    bucket_key = f"{client_ip}:{'auth' if path in {'/login', '/api/session'} else 'app'}"
    limit = settings.auth_rate_limit_per_minute if bucket_key.endswith(":auth") else settings.rate_limit_per_minute
    now = monotonic()
    bucket = rate_buckets[bucket_key]
    while bucket and now - bucket[0] > 60:
        bucket.popleft()
    if len(bucket) >= limit:
        return JSONResponse({"detail": "Too many requests. Please retry shortly."}, status_code=429)
    bucket.append(now)

    response = await call_next(request)
    response.headers.setdefault("X-Frame-Options", "DENY")
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
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
