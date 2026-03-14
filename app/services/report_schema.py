from __future__ import annotations

from datetime import date, timedelta
from typing import Any


def _text(value: Any) -> str:
    return str(value or "").strip()


def _bool(value: Any, default: bool = False) -> bool:
    return bool(value) if value is not None else default


def _join_parts(parts: list[str], fallback: str = "") -> str:
    cleaned = [part.strip() for part in parts if part and part.strip()]
    return " | ".join(cleaned) if cleaned else fallback


def _derive_status(challenges: str, activity: str) -> str:
    content = f"{challenges} {activity}".lower()
    if any(word in content for word in ["delay", "blocked", "critical", "escalation"]):
        return "Delayed"
    if any(word in content for word in ["issue", "risk", "dependency", "waiting", "clarification"]):
        return "At Risk"
    return "On Track"


def _delivery_quality(challenges: str) -> str:
    lowered = challenges.lower()
    if any(word in lowered for word in ["delay", "blocked", "critical"]):
        return "Needs Improvement"
    if any(word in lowered for word in ["issue", "risk", "dependency"]):
        return "Moderate"
    return "Good"


def _engagement_level(challenges: str) -> str:
    lowered = challenges.lower()
    if any(word in lowered for word in ["engagement", "attendance", "drop", "inactive"]):
        return "Needs Attention"
    return "Good"


def _client_summary(members_payload: list[dict[str, Any]]) -> str:
    clients = sorted(
        {
            _text(entry.get("client_name"))
            for member in members_payload
            for entry in member.get("entries", [])
            if _text(entry.get("client_name"))
        }
    )
    if not clients:
        return "Internal / Not specified"
    if len(clients) <= 3:
        return " / ".join(clients)
    return f"{clients[0]} / {clients[1]} / +{len(clients) - 2} more"


def _category_label(entries: list[dict[str, Any]]) -> str:
    has_corporate = any(entry.get("is_corporate") for entry in entries)
    has_university = any(entry.get("is_university") for entry in entries)
    if has_corporate and has_university:
        return "Corporate / University"
    if has_corporate:
        return "Corporate"
    if has_university:
        return "University"
    return "General"


def _next_week_window(week_end: str) -> str:
    try:
        next_start = date.fromisoformat(week_end) + timedelta(days=1)
    except ValueError:
        return ""
    next_end = next_start + timedelta(days=6)
    return f"{next_start.isoformat()} to {next_end.isoformat()}"


def _normalize_row_list(rows: list[Any], defaults: dict[str, Any]) -> list[dict[str, Any]]:
    normalized: list[dict[str, Any]] = []
    for item in rows or []:
        row = {key: defaults[key] for key in defaults}
        if isinstance(item, dict):
            for key, default_value in defaults.items():
                if isinstance(default_value, bool):
                    row[key] = _bool(item.get(key), default_value)
                else:
                    row[key] = _text(item.get(key, default_value))
        normalized.append(row)
    return normalized


def normalize_report_template(report: dict[str, Any]) -> dict[str, Any]:
    defaults = {
        "client_label": "",
        "prepared_by": "",
        "executive_summary": "",
        "lead_activities": "",
        "client_feedback": "",
        "client_action_taken": "",
        "client_feedback_status": "Open",
        "delivery_assessment_plan": "",
        "new_batch_kickoffs": "",
        "assessments_scheduled": "",
        "remarks_escalations": "",
        "report_prepared_by": "",
        "report_date": "",
        "overall_challenges": "",
        "bottleneck_risk": "",
        "overall_next_week_plan": "",
    }
    data = {key: _text(report.get(key, fallback)) for key, fallback in defaults.items()}
    legacy_rows = report.get("rows", []) or []
    data["last_week_rows"] = _normalize_row_list(
        report.get("last_week_rows", []),
        {
            "team_member": "",
            "client_location": "",
            "batch_tech_stack": "",
            "role": "Contributor",
            "sessions_completed": "",
            "status": "On Track",
            "remarks": "",
        },
    )
    data["upcoming_week_rows"] = _normalize_row_list(
        report.get("upcoming_week_rows", []),
        {
            "team_member": "",
            "client_location": "",
            "batch_tech_stack": "",
            "planned_topics": "",
            "planned_dates": "",
            "delivery_mode": "",
            "preparation_activities": "",
            "availability_wfh": "",
            "risks_dependencies": "",
        },
    )
    data["detailed_observations"] = _normalize_row_list(
        report.get("detailed_observations", []),
        {
            "batch_name": "",
            "topics_covered": "",
            "delivery_quality": "Good",
            "learner_engagement": "Good",
            "pending_topics": "",
        },
    )
    data["bottleneck_rows"] = _normalize_row_list(
        report.get("bottleneck_rows", []),
        {
            "risk": "",
            "impact": "",
            "affected_batch_client": "",
            "owner": "",
            "mitigation_plan": "",
            "eta": "",
        },
    )
    data["action_items"] = _normalize_row_list(
        report.get("action_items", []),
        {
            "action_item": "",
            "owner": "",
            "priority": "Medium",
            "target_date": "",
            "status": "Open",
        },
    )
    readiness = report.get("readiness_checklist") or {}
    data["readiness_checklist"] = {
        "trainers_aligned": _bool(readiness.get("trainers_aligned"), True),
        "tas_assigned": _bool(readiness.get("tas_assigned"), True),
        "environments_validated": _bool(readiness.get("environments_validated"), True),
        "question_banks_reviewed": _bool(readiness.get("question_banks_reviewed"), True),
    }
    if not data["last_week_rows"] and legacy_rows:
        data["last_week_rows"] = [
            {
                "team_member": _text(item.get("member_name")),
                "client_location": "Not specified",
                "batch_tech_stack": "General",
                "role": "Contributor",
                "sessions_completed": _text(item.get("activity_summary")),
                "status": _derive_status(_text(item.get("challenges_summary")), _text(item.get("activity_summary"))),
                "remarks": _text(item.get("manager_notes")),
            }
            for item in legacy_rows
        ]
    if not data["upcoming_week_rows"] and legacy_rows:
        data["upcoming_week_rows"] = [
            {
                "team_member": _text(item.get("member_name")),
                "client_location": "Not specified",
                "batch_tech_stack": "General",
                "planned_topics": _text(item.get("next_week_action_plan")),
                "planned_dates": "",
                "delivery_mode": "",
                "preparation_activities": _text(item.get("manager_notes")),
                "availability_wfh": "",
                "risks_dependencies": _text(item.get("challenges_summary")),
            }
            for item in legacy_rows
        ]
    if not data["action_items"] and legacy_rows:
        data["action_items"] = [
            {
                "action_item": _text(item.get("next_week_action_plan")),
                "owner": _text(item.get("member_name")),
                "priority": "Medium",
                "target_date": "",
                "status": "Open",
            }
            for item in legacy_rows
            if _text(item.get("next_week_action_plan"))
        ]
    return data


def build_template_report(
    *,
    week_start: str,
    week_end: str,
    lead_name: str,
    summary: dict[str, Any],
    members_payload: list[dict[str, Any]],
) -> dict[str, Any]:
    row_map = {str(row.get("member_name", "")).strip(): row for row in summary.get("rows", [])}
    last_week_rows: list[dict[str, Any]] = []
    upcoming_week_rows: list[dict[str, Any]] = []
    detailed_observations: list[dict[str, Any]] = []
    action_items: list[dict[str, Any]] = []

    next_week_window = _next_week_window(week_end)
    for member in members_payload:
        member_name = _text(member.get("member_name")) or "Team Member"
        entries = member.get("entries", [])
        summary_row = row_map.get(member_name, {})
        client_location = ", ".join(
            sorted({_text(entry.get("client_name")) for entry in entries if _text(entry.get("client_name"))})
        ) or "Not specified"
        batch_tech_stack = _category_label(entries)
        sessions_completed = _join_parts(
            [
                _text(summary_row.get("activity_summary")),
                _text(summary_row.get("extra_work_summary")),
            ],
            fallback="No completed milestones captured.",
        )
        challenges = _text(summary_row.get("challenges_summary"))
        status = _derive_status(challenges, sessions_completed)
        remarks = _text(summary_row.get("manager_notes"))
        next_plan = _text(summary_row.get("next_week_action_plan"))

        last_week_rows.append(
            {
                "team_member": member_name,
                "client_location": client_location,
                "batch_tech_stack": batch_tech_stack,
                "role": "Contributor",
                "sessions_completed": sessions_completed,
                "status": status,
                "remarks": remarks,
            }
        )
        upcoming_week_rows.append(
            {
                "team_member": member_name,
                "client_location": client_location,
                "batch_tech_stack": batch_tech_stack,
                "planned_topics": next_plan or "Continue current delivery milestones.",
                "planned_dates": next_week_window,
                "delivery_mode": batch_tech_stack,
                "preparation_activities": remarks or "Review materials and dependencies ahead of sessions.",
                "availability_wfh": "Available",
                "risks_dependencies": challenges or "No explicit risks logged.",
            }
        )
        detailed_observations.append(
            {
                "batch_name": f"{member_name} - {batch_tech_stack}",
                "topics_covered": _text(summary_row.get("activity_summary")) or "No detailed topics logged.",
                "delivery_quality": _delivery_quality(challenges),
                "learner_engagement": _engagement_level(challenges),
                "pending_topics": challenges or "No pending topic gaps recorded.",
            }
        )
        action_items.append(
            {
                "action_item": next_plan or f"Continue current delivery plan for {member_name}.",
                "owner": member_name,
                "priority": "High" if status != "On Track" else "Medium",
                "target_date": next_week_window.split(" to ")[-1] if next_week_window else "",
                "status": "Open",
            }
        )

    overall_challenges = _text(summary.get("overall_challenges")) or "No major blockers reported."
    bottleneck_risk = _text(summary.get("bottleneck_risk"))
    overall_next_week_plan = _text(summary.get("overall_next_week_plan"))
    return normalize_report_template(
        {
            "client_label": _client_summary(members_payload),
            "prepared_by": lead_name,
            "executive_summary": _text(summary.get("team_summary")),
            "lead_activities": "Reviewed weekly delivery updates, monitored blockers, and aligned next-week priorities with the team.",
            "client_feedback": "",
            "client_action_taken": "",
            "client_feedback_status": "Open",
            "delivery_assessment_plan": overall_next_week_plan,
            "new_batch_kickoffs": "",
            "assessments_scheduled": "",
            "remarks_escalations": bottleneck_risk or overall_challenges,
            "report_prepared_by": lead_name,
            "report_date": date.today().isoformat(),
            "overall_challenges": overall_challenges,
            "bottleneck_risk": bottleneck_risk,
            "overall_next_week_plan": overall_next_week_plan,
            "last_week_rows": last_week_rows,
            "upcoming_week_rows": upcoming_week_rows,
            "detailed_observations": detailed_observations,
            "bottleneck_rows": [
                {
                    "risk": overall_challenges,
                    "impact": "May affect delivery continuity and planned milestones if unresolved.",
                    "affected_batch_client": _client_summary(members_payload),
                    "owner": lead_name,
                    "mitigation_plan": overall_next_week_plan or "Track risks early and escalate unresolved blockers.",
                    "eta": next_week_window.split(" to ")[-1] if next_week_window else "",
                }
            ],
            "readiness_checklist": {
                "trainers_aligned": True,
                "tas_assigned": True,
                "environments_validated": True,
                "question_banks_reviewed": True,
            },
            "action_items": action_items,
        }
    )
