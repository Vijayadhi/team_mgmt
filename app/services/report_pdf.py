from __future__ import annotations

from io import BytesIO
from typing import Any

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

from app.services.report_schema import normalize_report_template


def _make_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="SectionTitle",
            parent=styles["Heading2"],
            fontSize=11,
            leading=13,
            spaceAfter=8,
            textColor=colors.HexColor("#0f172a"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="SmallBody",
            parent=styles["BodyText"],
            fontSize=8.2,
            leading=10.2,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TinyBody",
            parent=styles["BodyText"],
            fontSize=7.4,
            leading=9.2,
            alignment=TA_LEFT,
        )
    )
    return styles


def _p(value: Any, style) -> Paragraph:
    text = str(value or "").strip() or "-"
    return Paragraph(text.replace("\n", "<br/>"), style)


def _section_heading(title: str, styles) -> Paragraph:
    return Paragraph(title, styles["SectionTitle"])


def _kv_table(rows: list[list[Any]], widths: list[float], styles) -> Table:
    table = Table([[_p(left, styles["SmallBody"]), _p(right, styles["SmallBody"])] for left, right in rows], colWidths=widths)
    table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.7, colors.HexColor("#334155")),
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#eff6ff")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table


def _table(headers: list[str], rows: list[list[Any]], widths: list[float], styles) -> Table:
    data = [[_p(header, styles["TinyBody"]) for header in headers]]
    for row in rows or [["-"] * len(headers)]:
        data.append([_p(cell, styles["TinyBody"]) for cell in row])
    table = Table(data, colWidths=widths, repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0f172a")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.6, colors.HexColor("#94a3b8")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f8fafc")]),
            ]
        )
    )
    return table


def build_weekly_report_pdf(report: dict[str, Any], lead_name: str) -> bytes:
    template = normalize_report_template(report)
    buffer = BytesIO()
    document = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=0.42 * inch,
        rightMargin=0.42 * inch,
        topMargin=0.42 * inch,
        bottomMargin=0.42 * inch,
        title="Weekly Lead Status Report",
    )
    styles = _make_styles()
    story = [
        Paragraph("Weekly Lead Status Report", styles["Title"]),
        Spacer(1, 8),
        _kv_table(
            [
                ["Client", template["client_label"]],
                ["Reporting Week", f"{report.get('week_start', '')} to {report.get('week_end', '')}"],
                ["Prepared By", template["prepared_by"] or lead_name],
            ],
            [135, 380],
            styles,
        ),
        Spacer(1, 12),
        _section_heading("1. Executive Summary", styles),
        _p(template["executive_summary"], styles["SmallBody"]),
        Spacer(1, 12),
        _section_heading("2. Team Members - Weekly Delivery Status", styles),
        _p("Last Week Summary (Actuals)", styles["SmallBody"]),
        Spacer(1, 6),
        _table(
            ["Team Member", "Client / Location", "Batch / Tech Stack", "Role", "Sessions / Milestones Completed", "Status", "Remarks"],
            [
                [
                    row["team_member"],
                    row["client_location"],
                    row["batch_tech_stack"],
                    row["role"],
                    row["sessions_completed"],
                    row["status"],
                    row["remarks"],
                ]
                for row in template["last_week_rows"]
            ],
            [63, 76, 74, 50, 140, 55, 67],
            styles,
        ),
        Spacer(1, 10),
        _p("Upcoming Week Plan (Commitments)", styles["SmallBody"]),
        Spacer(1, 6),
        _table(
            ["Team Member", "Client / Location", "Batch / Tech Stack", "Planned Topics / Milestones", "Planned Dates", "Delivery Mode", "Preparation Activities", "Availability / WFH", "Risks / Dependencies"],
            [
                [
                    row["team_member"],
                    row["client_location"],
                    row["batch_tech_stack"],
                    row["planned_topics"],
                    row["planned_dates"],
                    row["delivery_mode"],
                    row["preparation_activities"],
                    row["availability_wfh"],
                    row["risks_dependencies"],
                ]
                for row in template["upcoming_week_rows"]
            ],
            [46, 58, 55, 88, 54, 44, 62, 54, 58],
            styles,
        ),
        Spacer(1, 10),
        _section_heading("3. Detailed Session Observations", styles),
        _table(
            ["Batch / Track", "Topics Covered", "Delivery Quality", "Learner Engagement", "Pending Topics / Gaps"],
            [
                [
                    row["batch_name"],
                    row["topics_covered"],
                    row["delivery_quality"],
                    row["learner_engagement"],
                    row["pending_topics"],
                ]
                for row in template["detailed_observations"]
            ],
            [88, 170, 74, 82, 116],
            styles,
        ),
        Spacer(1, 10),
        _section_heading("4. Lead Activities (Current Week)", styles),
        _p(template["lead_activities"], styles["SmallBody"]),
        Spacer(1, 10),
        _section_heading("5. Bottlenecks / Risks Identified", styles),
        _table(
            ["Risk / Bottleneck", "Impact", "Affected Batch / Client", "Owner", "Mitigation Plan", "ETA"],
            [
                [
                    row["risk"],
                    row["impact"],
                    row["affected_batch_client"],
                    row["owner"],
                    row["mitigation_plan"],
                    row["eta"],
                ]
                for row in template["bottleneck_rows"]
            ],
            [98, 110, 90, 60, 126, 40],
            styles,
        ),
        Spacer(1, 10),
        _section_heading("6. Client Feedback (If Any)", styles),
        _kv_table(
            [
                ["Feedback Received", template["client_feedback"]],
                ["Action Taken / Planned", template["client_action_taken"]],
                ["Status", template["client_feedback_status"]],
            ],
            [135, 380],
            styles,
        ),
        Spacer(1, 10),
        _section_heading("7. Consolidated Next Week Plan (Leadership View)", styles),
        _kv_table(
            [
                ["Delivery & Assessment Plan", template["delivery_assessment_plan"]],
                ["New Batch Kick-offs", template["new_batch_kickoffs"]],
                ["Re-attempts / Assessments Scheduled", template["assessments_scheduled"]],
            ],
            [180, 335],
            styles,
        ),
        Spacer(1, 8),
        Paragraph("Readiness Checklist", styles["SmallBody"]),
        Spacer(1, 4),
        _kv_table(
            [
                ["Trainers aligned on pace and coverage", "Yes" if template["readiness_checklist"]["trainers_aligned"] else "No"],
                ["TAs assigned and availability confirmed", "Yes" if template["readiness_checklist"]["tas_assigned"] else "No"],
                ["Environments and platforms validated", "Yes" if template["readiness_checklist"]["environments_validated"] else "No"],
                ["Question banks and demos reviewed", "Yes" if template["readiness_checklist"]["question_banks_reviewed"] else "No"],
            ],
            [270, 245],
            styles,
        ),
        Spacer(1, 10),
        _section_heading("8. Action Items & Ownership", styles),
        _table(
            ["Action Item", "Owner", "Priority", "Target Date", "Status"],
            [
                [
                    row["action_item"],
                    row["owner"],
                    row["priority"],
                    row["target_date"],
                    row["status"],
                ]
                for row in template["action_items"]
            ],
            [245, 90, 60, 70, 50],
            styles,
        ),
        Spacer(1, 10),
        _section_heading("9. Remarks / Escalations (If Required)", styles),
        _p(template["remarks_escalations"], styles["SmallBody"]),
        Spacer(1, 12),
        _kv_table(
            [
                ["Report Prepared By", template["report_prepared_by"] or lead_name],
                ["Date", template["report_date"] or report.get("week_end", "")],
            ],
            [135, 380],
            styles,
        ),
    ]
    document.build(story)
    return buffer.getvalue()
