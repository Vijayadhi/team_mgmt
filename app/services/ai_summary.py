import json
from collections import defaultdict
from typing import Any

from app.config import get_settings


def derive_bottleneck_risk(overall_challenges: str) -> str:
    challenge_text = (overall_challenges or "").strip()
    if not challenge_text or challenge_text.lower() == "no major blockers reported.":
        return "Low risk. No major bottlenecks were reported for the selected week."

    lowered = challenge_text.lower()
    if any(keyword in lowered for keyword in ["blocked", "dependency", "waiting", "delay", "pending", "approval"]):
        return "High risk. External dependencies or pending approvals may delay delivery next week."
    if any(keyword in lowered for keyword in ["bug", "issue", "error", "failure", "rework"]):
        return "Medium risk. Technical issues and rework may reduce execution speed if they continue."
    if any(keyword in lowered for keyword in ["client", "clarification", "requirement", "scope"]):
        return "Medium risk. Requirement ambiguity may affect prioritization and delivery confidence."
    return "Medium risk. Reported challenges should be monitored to avoid spillover into the next sprint."


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
        activity_parts = [
            part for part in [
                completed or plan_text,
                f"Client: {client_text}" if client_text else "",
                f"ETA: {eta_text}" if eta_text else "",
                f"Proof: {proof_text}" if proof_text else "",
            ] if part
        ]
        rows.append(
            {
                "member_name": member["member_name"],
                "activity_summary": "; ".join(activity_parts) or "No work logged",
                "extra_work_summary": extra_text or "No extra work logged",
                "challenges_summary": challenges or "No challenges logged",
                "manager_notes": "",
                "next_week_action_plan": "",
            }
        )
        if challenges:
            overall_notes.append(f"{member['member_name']}: {challenges}")

    overall_challenges = "; ".join(overall_notes) or "No major blockers reported."
    return {
        "team_summary": "Fallback summary generated locally because Gemini was unavailable.",
        "rows": rows,
        "overall_challenges": overall_challenges,
        "bottleneck_risk": derive_bottleneck_risk(overall_challenges),
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
            "Return strict JSON with keys: team_summary, overall_challenges, bottleneck_risk, rows. "
            "rows must be an array of objects with member_name, activity_summary, "
            "extra_work_summary, challenges_summary, manager_notes, next_week_action_plan. "
            "Set next_week_action_plan to an empty string because the lead will fill it manually. "
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
        parsed["bottleneck_risk"] = parsed.get("bottleneck_risk") or derive_bottleneck_risk(parsed.get("overall_challenges", ""))
        for row in parsed.get("rows", []):
            row.setdefault("next_week_action_plan", "")
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
