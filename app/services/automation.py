import asyncio
from datetime import datetime, time, timedelta
from zoneinfo import ZoneInfo

from app.config import get_settings
from app.database import get_database
from app.services.email_service import send_email


REMINDER_RUN_TIME = time(hour=0, minute=5)


def local_timezone() -> ZoneInfo:
    return ZoneInfo(get_settings().app_timezone)


def local_now() -> datetime:
    return datetime.now(local_timezone())


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
    existing = await db.notification_logs.find_one({"type": notification_type, "user_id": user_id, "target_date": target_date})
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


async def has_processed_today(process_date: str) -> bool:
    db = get_database()
    run = await db.notification_logs.find_one({"type": "daily_automation_run", "target_date": process_date})
    return run is not None


async def mark_processed_today(process_date: str) -> None:
    db = get_database()
    await db.notification_logs.update_one(
        {"type": "daily_automation_run", "target_date": process_date},
        {"$setOnInsert": {"sent_at": local_now()}},
        upsert=True,
    )


def member_display_name(member: dict) -> str:
    return f"{member['first_name']} {member.get('last_name', '')}".strip()


def seconds_until_next_run(now: datetime) -> float:
    next_run = datetime.combine(now.date(), REMINDER_RUN_TIME, tzinfo=now.tzinfo)
    if now >= next_run:
        next_run = next_run + timedelta(days=1)
    return max((next_run - now).total_seconds(), 60.0)


async def process_automation_cycle() -> None:
    db = get_database()
    now = local_now()
    process_date = now.date().isoformat()
    if await has_processed_today(process_date):
        return

    previous_workdays = workdays_before(now, 2)
    yesterday = previous_workdays[0]
    day_before = previous_workdays[1]

    leads = await db.users.find({"role": "lead", "is_active": True}).to_list(length=500)
    for lead in leads:
        members = await db.users.find({"lead_id": lead["_id"], "role": "member", "is_active": True}).to_list(length=2000)
        for member in members:
            member_name = member_display_name(member)
            leave_yesterday = await db.leave_days.find_one({"user_id": member["_id"], "date": yesterday})
            entry_yesterday = await db.daily_updates.find_one({"user_id": member["_id"], "date": yesterday})

            if not leave_yesterday:
                if not entry_yesterday:
                    if not await has_notification("missed_full_day_reminder", member["_id"], yesterday):
                        sent = await send_email(
                            subject=f"Action required: no daily entry submitted for {yesterday}",
                            recipients=[member["email"]],
                            body=(
                                f"Hello {member['first_name']},\n\n"
                                f"You did not submit any daily entry for {yesterday}.\n\n"
                                "Please log in and submit the missed-day request with the full entry details and the reason for the delay."
                            ),
                        )
                        if sent:
                            await mark_notification("missed_full_day_reminder", member["_id"], lead["_id"], yesterday)
                elif not entry_yesterday.get("proof_of_work"):
                    if not await has_notification("missed_eod_reminder", member["_id"], yesterday):
                        sent = await send_email(
                            subject=f"Missed end-of-day update for {yesterday}",
                            recipients=[member["email"]],
                            body=(
                                f"Hello {member['first_name']},\n\n"
                                f"Your morning entry exists for {yesterday}, but the end-of-day update is incomplete because proof of work was not submitted.\n\n"
                                "Please log in and complete the pending EOD details. If you are updating a previous day, include the reason and submit it for team lead approval."
                            ),
                        )
                        if sent:
                            await mark_notification("missed_eod_reminder", member["_id"], lead["_id"], yesterday)

            leave_recent = await db.leave_days.find({"user_id": member["_id"], "date": {"$in": [yesterday, day_before]}}).to_list(length=10)
            leave_dates = {item["date"] for item in leave_recent}
            missing_dates = []
            for target_date in [day_before, yesterday]:
                if target_date in leave_dates:
                    continue
                update = await db.daily_updates.find_one({"user_id": member["_id"], "date": target_date})
                if not update:
                    missing_dates.append(target_date)

            if len(missing_dates) == 2:
                if not await has_notification("two_day_member_warning", member["_id"], yesterday):
                    sent_member = await send_email(
                        subject=f"Strict warning: two consecutive missing daily entries ({day_before}, {yesterday})",
                        recipients=[member["email"]],
                        body=(
                            f"Hello {member['first_name']},\n\n"
                            f"You missed daily entries for two consecutive workdays: {day_before} and {yesterday}.\n\n"
                            "This is a compliance issue. Submit both missed entries with the required reason immediately. Your team lead has also been notified."
                        ),
                    )
                    if sent_member:
                        await mark_notification(
                            "two_day_member_warning",
                            member["_id"],
                            lead["_id"],
                            yesterday,
                            {"missing_dates": missing_dates},
                        )

                if not await has_notification("two_day_missing_alert", member["_id"], yesterday):
                    sent_lead = await send_email(
                        subject=f"Strict alert: {member_name} missed two consecutive daily entries",
                        recipients=[lead["email"]],
                        body=(
                            f"Hello {lead['first_name']},\n\n"
                            f"{member_name} ({member['email']}) missed daily entries for {day_before} and {yesterday}.\n\n"
                            "A strict warning mail has been sent to the member automatically. Please review the case and take the required action from the dashboard."
                        ),
                    )
                    if sent_lead:
                        await mark_notification(
                            "two_day_missing_alert",
                            member["_id"],
                            lead["_id"],
                            yesterday,
                            {"missing_dates": missing_dates},
                        )

    await mark_processed_today(process_date)


async def automation_loop(stop_event: asyncio.Event) -> None:
    while not stop_event.is_set():
        try:
            await process_automation_cycle()
        except Exception:
            pass

        delay = seconds_until_next_run(local_now())
        try:
            await asyncio.wait_for(stop_event.wait(), timeout=delay)
        except asyncio.TimeoutError:
            continue
