import json
from collections import defaultdict
from typing import Any

from app.config import get_settings


def _fallback_summary(members: list[dict[str, Any]]) -> dict[str, Any]:
    rows = []
    overall_notes = []
    for member in members:
        entries = member["entries"]
        plan_text = " | ".join(item["plan"] for item in entries if item.get("plan"))
        completed = " | ".join(item["completed_work"] for item in entries if item.get("completed_work"))
        extra_text = " | ".join(item["extra_work"] for item in entries if item.get("extra_work"))
        challenges = " | ".join(item["challenges"] for item in entries if item.get("challenges"))
        client_text = ", ".join(sorted({item["client_name"] for item in entries if item.get("client_name")}))
        eta_text = ", ".join(item["eta"] for item in entries if item.get("eta"))
        proof_text = " | ".join(item["proof_of_work"] for item in entries if item.get("proof_of_work"))
        activity_parts = [part for part in [completed or plan_text, f"Client: {client_text}" if client_text else "", f"ETA: {eta_text}" if eta_text else "", f"Proof: {proof_text}" if proof_text else ""] if part]
        rows.append(
            {
                "member_name": member["member_name"],
                "activity_summary": "; ".join(activity_parts) or "No work logged",
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

    try:
        import google.generativeai as genai
    except ModuleNotFoundError:
        return _fallback_summary(members)

    prompt = {
        "task": (
            "Summarize a team's weekly update data. "
            "Return strict JSON with keys: team_summary, overall_challenges, rows. "
            "rows must be an array of objects with member_name, activity_summary, "
            "extra_work_summary, challenges_summary, manager_notes. "
            "Include ETA, proof of work, client context, and whether work was corporate or university where relevant. "
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
                "eta": update.get("eta", ""),
                "proof_of_work": update.get("proof_of_work", ""),
                "client_name": update.get("client_name", ""),
                "is_corporate": update.get("is_corporate", False),
                "is_university": update.get("is_university", False),
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
