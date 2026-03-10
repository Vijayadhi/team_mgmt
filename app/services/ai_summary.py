import json
from collections import defaultdict
from typing import Any

import google.generativeai as genai

from app.config import get_settings


def _fallback_summary(members: list[dict[str, Any]]) -> dict[str, Any]:
    rows = []
    overall_notes = []
    for member in members:
        entries = member["entries"]
        plan_text = " | ".join(item["plan"] for item in entries if item.get("plan"))
        extra_text = " | ".join(item["extra_work"] for item in entries if item.get("extra_work"))
        challenges = " | ".join(item["challenges"] for item in entries if item.get("challenges"))
        completed = " | ".join(item["completed_work"] for item in entries if item.get("completed_work"))
        rows.append(
            {
                "member_name": member["member_name"],
                "activity_summary": completed or plan_text or "No work logged",
                "extra_work_summary": extra_text or "No extra work logged",
                "challenges_summary": challenges or "No challenges logged",
                "manager_notes": "",
            }
        )
        if challenges:
            overall_notes.append(f"{member['member_name']}: {challenges}")
    return {
        "team_summary": "Fallback summary generated locally because Gemini was unavailable.",
        "rows": rows,
        "overall_challenges": "; ".join(overall_notes) or "No major blockers reported.",
    }


async def summarize_weekly_updates(members: list[dict[str, Any]]) -> dict[str, Any]:
    settings = get_settings()
    if not settings.gemini_api_key:
        return _fallback_summary(members)

    prompt = {
        "task": (
            "Summarize a team's weekly update data. "
            "Return strict JSON with keys: team_summary, overall_challenges, rows. "
            "rows must be an array of objects with member_name, activity_summary, "
            "extra_work_summary, challenges_summary, manager_notes. "
            "Keep each cell concise and professional."
        ),
        "members": members,
    }

    try:
        genai.configure(api_key=settings.gemini_api_key)
        model = genai.GenerativeModel(settings.gemini_model)
        response = await model.generate_content_async(
            json.dumps(prompt, ensure_ascii=True),
            generation_config={"response_mime_type": "application/json"},
        )
        parsed = json.loads(response.text)
        if "rows" not in parsed:
            raise ValueError("Missing rows in Gemini response")
        return parsed
    except Exception:
        return _fallback_summary(members)


def group_updates_for_summary(updates: list[dict[str, Any]], users: list[dict[str, Any]]) -> list[dict[str, Any]]:
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    name_map = {str(user["_id"]): f"{user['first_name']} {user['last_name']}".strip() for user in users}
    for update in updates:
        grouped[str(update["user_id"])].append(
            {
                "date": update["date"],
                "plan": update.get("plan", ""),
                "completed_work": update.get("completed_work", ""),
                "extra_work": update.get("extra_work", ""),
                "challenges": update.get("challenges", ""),
            }
        )

    members = []
    for user in users:
        entries = sorted(grouped.get(str(user["_id"]), []), key=lambda item: item["date"])
        members.append(
            {
                "member_id": str(user["_id"]),
                "member_name": name_map[str(user["_id"])],
                "entries": entries,
            }
        )
    return members
