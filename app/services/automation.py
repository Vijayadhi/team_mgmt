import asyncio
import traceback
from datetime import datetime, time, timedelta
from zoneinfo import ZoneInfo

from app.config import get_settings
from app.database import get_database
from app.services.email_service import send_email


AUTOMATION_RUN_HOUR = 0
AUTOMATION_RUN_MINUTE = 5
SYSTEM_USER_ID = "system"


def local_now() -> datetime:
    return datetime.now(ZoneInfo(get_settings().app_timezone))


def workdays_before(reference: datetime, count: int) -> list[str]:
    days: list[str] = []
    cursor = reference.date() - timedelta(days=1)
    while len(days) < count:
        if cursor.weekday() < 5:
            days.append(cursor.isoformat())
        cursor -= timedelta(days=1)
    return days


async def has_notification(notification_type: str, user_id, target_date: str) -> bool:
    db = get_database()
    existing = await db.notification_logs.find_one(
        {"type": notification_type, "user_id": user_id, "target_date": target_date}
    )
    return existing is not None


async def mark_notification(notification_type: str, user_id, lead_id, target_date: str, payload: dict | None = None) -> None:
    db = get_database()
    await db.notification_logs.update_one(
        {"type": notification_type, "user_id": user_id, "target_date": target_date},
        {
            "$setOnInsert": {
                "lead_id": lead_id,
                "payload": payload or {},
                "sent_at": local_now(),
            }
        },
        upsert=True,
    )


async def has_open_request(user_id, target_date: str) -> bool:
    db = get_database()
    item = await db.update_requests.find_one(
        {"user_id": user_id, "date": target_date, "status": "pending"}
    )
    return item is not None


async def process_automation_cycle() -> None:
    db = get_database()
    now = local_now()
    previous_workdays = workdays_before(now, 2)
    yesterday = previous_workdays[0]
    day_before = previous_workdays[1]

    leads = await db.users.find({"role": "lead", "is_active": True}).to_list(length=500)
    for lead in leads:
        members = await db.users.find(
            {"lead_id": lead["_id"], "role": "member", "is_active": True}
        ).to_list(length=2000)

        for member in members:
            leave_yesterday = await db.leave_days.find_one({"user_id": member["_id"], "date": yesterday})
            entry_yesterday = await db.daily_updates.find_one({"user_id": member["_id"], "date": yesterday})
            open_request_yesterday = await has_open_request(member["_id"], yesterday)

            if not leave_yesterday and not entry_yesterday and not open_request_yesterday:
                if not await has_notification("missed_entry_reminder", member["_id"], yesterday):
                    sent = await send_email(
                        subject=f"Missed daily entry for {yesterday}",
                        recipients=[member["email"]],
                        body=(
                            f"Hello {member['first_name']},\n\n"
                            f"You did not submit any daily entry for {yesterday}. "
                            "Please log in and submit the missed-day request with the required reason and proof."
                        ),
                    )
                    if sent:
                        await mark_notification("missed_entry_reminder", member["_id"], lead["_id"], yesterday)

            if entry_yesterday and not leave_yesterday and not entry_yesterday.get("proof_of_work") and not open_request_yesterday:
                if not await has_notification("missed_eod_reminder", member["_id"], yesterday):
                    sent = await send_email(
                        subject=f"Missed end-of-day update for {yesterday}",
                        recipients=[member["email"]],
                        body=(
                            f"Hello {member['first_name']},\n\n"
                            f"You missed the end-of-day update for {yesterday}. "
                            "Please log in and submit the pending details. If you are updating a previous day, "
                            "include the reason and submit it for team lead approval."
                        ),
                    )
                    if sent:
                        await mark_notification("missed_eod_reminder", member["_id"], lead["_id"], yesterday)

            leave_recent = await db.leave_days.find(
                {"user_id": member["_id"], "date": {"$in": [yesterday, day_before]}}
            ).to_list(length=10)
            leave_dates = {item["date"] for item in leave_recent}
            missing_dates = []
            for target_date in [day_before, yesterday]:
                if target_date in leave_dates:
                    continue
                if await has_open_request(member["_id"], target_date):
                    continue
                update = await db.daily_updates.find_one({"user_id": member["_id"], "date": target_date})
                if not update:
                    missing_dates.append(target_date)

            if len(missing_dates) == 2 and not await has_notification("two_day_missing_alert", member["_id"], yesterday):
                member_sent = await send_email(
                    subject=f"Strict warning: two consecutive missing updates ({day_before}, {yesterday})",
                    recipients=[member["email"]],
                    body=(
                        f"Hello {member['first_name']},\n\n"
                        f"You have missed daily updates for both {day_before} and {yesterday}. "
                        "This is a strict warning. Submit the required requests immediately with valid reasons."
                    ),
                )
                lead_sent = await send_email(
                    subject=f"Two consecutive missing updates: {member['first_name']} {member.get('last_name', '')}".strip(),
                    recipients=[lead["email"]],
                    body=(
                        f"Hello {lead['first_name']},\n\n"
                        f"{member['first_name']} {member.get('last_name', '')} ({member['email']}) has no daily entry for {day_before} and {yesterday}.\n"
                        "Please review the member status, mark leave if applicable, or send a warning mail from the dashboard."
                    ),
                )
                if member_sent or lead_sent:
                    await mark_notification(
                        "two_day_missing_alert",
                        member["_id"],
                        lead["_id"],
                        yesterday,
                        {"missing_dates": missing_dates},
                    )


async def should_run_today() -> bool:
    now = local_now()
    if now.time() < time(hour=AUTOMATION_RUN_HOUR, minute=AUTOMATION_RUN_MINUTE):
        return False
    return not await has_notification("daily_automation_run", SYSTEM_USER_ID, now.date().isoformat())


async def mark_run_today() -> None:
    today = local_now().date().isoformat()
    await mark_notification("daily_automation_run", SYSTEM_USER_ID, SYSTEM_USER_ID, today)


async def automation_loop(stop_event: asyncio.Event) -> None:
    while not stop_event.is_set():
        try:
            if await should_run_today():
                await process_automation_cycle()
                await mark_run_today()
        except Exception:
            traceback.print_exc()
        try:
            await asyncio.wait_for(stop_event.wait(), timeout=300)
        except asyncio.TimeoutError:
            continue
