from datetime import date, datetime
from typing import Any

from bson import ObjectId
from fastapi import HTTPException, Request, status

from app.database import get_database


FLASH_KEY = "flash_message"


def parse_object_id(value: str) -> ObjectId:
    try:
        return ObjectId(value)
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Invalid identifier") from exc


async def get_current_user(request: Request) -> dict[str, Any]:
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_303_SEE_OTHER, headers={"Location": "/login"})

    db = get_database()
    user = await db.users.find_one({"_id": parse_object_id(user_id)})
    if not user or not user.get("is_active", True):
        request.session.clear()
        raise HTTPException(status_code=status.HTTP_303_SEE_OTHER, headers={"Location": "/login"})
    return user


async def require_role(request: Request, role: str) -> dict[str, Any]:
    user = await get_current_user(request)
    if user["role"] != role:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")
    return user


async def get_current_member(request: Request) -> dict[str, Any]:
    return await require_role(request, "member")


async def get_current_lead(request: Request) -> dict[str, Any]:
    return await require_role(request, "lead")


def format_date(value: date | datetime | str | None) -> str:
    if value is None:
        return ""
    if isinstance(value, datetime):
        return value.strftime("%Y-%m-%d %H:%M")
    if isinstance(value, date):
        return value.strftime("%Y-%m-%d")
    return str(value)


def object_id_str(document: dict[str, Any] | None) -> dict[str, Any] | None:
    if not document:
        return document
    converted = dict(document)
    converted["id"] = str(converted.pop("_id"))
    for key in ("user_id", "lead_id", "report_id"):
        if key in converted and isinstance(converted[key], ObjectId):
            converted[key] = str(converted[key])
    return converted


def add_flash(request: Request, level: str, message: str) -> None:
    request.session[FLASH_KEY] = {"level": level, "message": message}


def pop_flash(request: Request) -> dict[str, str] | None:
    return request.session.pop(FLASH_KEY, None)


def is_valid_iso_date(value: str) -> bool:
    try:
        datetime.strptime(value, "%Y-%m-%d")
        return True
    except ValueError:
        return False


def validate_new_password(current_password: str, new_password: str, confirm_password: str) -> str | None:
    cleaned_new = new_password.strip()
    if new_password != confirm_password:
        return "New password and confirmation do not match."
    if len(cleaned_new) < 4:
        return "New password must be at least 4 characters."
    if cleaned_new == current_password.strip():
        return "New password must be different from the current password."
    return None
