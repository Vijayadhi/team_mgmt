from datetime import date, datetime, timedelta, timezone
from typing import Any

from bson import ObjectId

from app.database import get_database
from app.services.email_service import send_email


COVERING_REQUEST_STATUSES = {"pending", "approved", "resolved", "leave_marked"}


def workdays_between(date_from: str, date_to: str) -> list[str]:
    try:
        start = date.fromisoformat(date_from)
        end = date.fromisoformat(date_to)
    except ValueError:
        return []
    if start > end:
        start, end = end, start
    days: list[str] = []
    cursor = start
    while cursor <= end:
        if cursor.weekday() < 5:
            days.append(cursor.isoformat())
        cursor += timedelta(days=1)
    return days


async def collect_covered_dates(user_ids: list[ObjectId], date_from: str, date_to: str) -> dict[str, set[str]]:
    db = get_database()
    coverage: dict[str, set[str]] = {str(user_id): set() for user_id in user_ids}
    if not user_ids:
        return coverage

    async for item in db.leave_days.find(
        {"user_id": {"$in": user_ids}, "date": {"$gte": date_from, "$lte": date_to}},
        {"user_id": 1, "date": 1},
    ):
        coverage.setdefault(str(item["user_id"]), set()).add(item["date"])

    async for item in db.daily_updates.find(
        {"user_id": {"$in": user_ids}, "date": {"$gte": date_from, "$lte": date_to}},
        {"user_id": 1, "date": 1},
    ):
        coverage.setdefault(str(item["user_id"]), set()).add(item["date"])

    async for item in db.update_requests.find(
        {
            "user_id": {"$in": user_ids},
            "date": {"$gte": date_from, "$lte": date_to},
            "status": {"$in": sorted(COVERING_REQUEST_STATUSES)},
        },
        {"user_id": 1, "date": 1},
    ):
        coverage.setdefault(str(item["user_id"]), set()).add(item["date"])

    return coverage


async def get_missing_dates_by_user(user_ids: list[ObjectId], date_from: str, date_to: str) -> dict[str, list[str]]:
    target_dates = workdays_between(date_from, date_to)
    coverage = await collect_covered_dates(user_ids, date_from, date_to)
    return {
        str(user_id): [target_date for target_date in target_dates if target_date not in coverage.get(str(user_id), set())]
        for user_id in user_ids
    }


async def build_missing_day_rows(lead_id, date_from: str, date_to: str, active_only: bool = True) -> list[dict[str, Any]]:
    db = get_database()
    member_query: dict[str, Any] = {"lead_id": lead_id, "role": "member"}
    if active_only:
        member_query["is_active"] = True
    members = await db.users.find(member_query).sort("first_name", 1).to_list(length=2000)
    missing_map = await get_missing_dates_by_user([member["_id"] for member in members], date_from, date_to)

    rows: list[dict[str, Any]] = []
    for member in members:
        missing_dates = missing_map.get(str(member["_id"]), [])
        if not missing_dates:
            continue
        rows.append(
            {
                "member_id": str(member["_id"]),
                "member_name": f"{member.get('first_name', '')} {member.get('last_name', '')}".strip() or member.get("email", "Unknown"),
                "email": member.get("email", ""),
                "missing_count": len(missing_dates),
                "missing_dates": missing_dates,
                "from_date": date_from,
                "to_date": date_to,
            }
        )
    return rows


async def send_missing_day_audit_notifications(audit_rows: list[dict[str, Any]]) -> list[dict[str, Any]]:
    db = get_database()
    sent_rows: list[dict[str, Any]] = []
    now = datetime.now(timezone.utc)
    for row in audit_rows:
        member_email = row.get("email", "")
        member_name = row.get("member_name", "Member")
        missing_dates = row.get("missing_dates", [])
        if not member_email or not missing_dates:
            continue

        recipients = [member_email]
        subject = f"Missing daily update alert ({len(missing_dates)} day{'s' if len(missing_dates) != 1 else ''})"
        body = (
            f"Hello {member_name},\n\n"
            f"The following dates are still missing daily updates: {', '.join(missing_dates)}.\n"
            "Please submit the required missed-day request or contact your team lead."
        )

        if len(missing_dates) > 1 and row.get("lead_email"):
            recipients.append(row["lead_email"])
            body += (
                f"\n\nTeam Lead notified: {row.get('lead_name', 'Lead')} "
                f"({row.get('lead_email', '')})."
            )

        sent = await send_email(subject=subject, recipients=recipients, body=body)
        if sent:
            await db.notification_logs.update_one(
                {
                    "type": "external_missing_day_audit",
                    "user_id": ObjectId(row["member_id"]),
                    "target_date": f"{row['from_date']}:{row['to_date']}",
                },
                {
                    "$set": {
                        "lead_id": ObjectId(row["lead_id"]),
                        "payload": {"missing_dates": missing_dates, "count": len(missing_dates)},
                        "sent_at": now,
                    }
                },
                upsert=True,
            )
            sent_rows.append({"member_id": row["member_id"], "missing_count": len(missing_dates), "recipients": recipients})
    return sent_rows


async def audit_missing_days(date_from: str, date_to: str, lead_id=None, send_notifications: bool = False) -> dict[str, Any]:
    db = get_database()
    lead_query: dict[str, Any] = {"role": "lead", "is_active": True}
    if lead_id is not None:
        lead_query["_id"] = lead_id
    leads = await db.users.find(lead_query).to_list(length=500)

    results: list[dict[str, Any]] = []
    for lead in leads:
        rows = await build_missing_day_rows(lead["_id"], date_from, date_to, active_only=True)
        enriched_rows = []
        for row in rows:
            enriched_row = {
                **row,
                "lead_id": str(lead["_id"]),
                "lead_name": f"{lead.get('first_name', '')} {lead.get('last_name', '')}".strip() or lead.get("email", "Lead"),
                "lead_email": lead.get("email", ""),
            }
            enriched_rows.append(enriched_row)
        results.extend(enriched_rows)

    sent: list[dict[str, Any]] = []
    if send_notifications:
        sent = await send_missing_day_audit_notifications(results)

    return {
        "from_date": date_from,
        "to_date": date_to,
        "items": results,
        "emails_sent": sent,
    }
