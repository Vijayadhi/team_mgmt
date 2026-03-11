from io import BytesIO
from typing import Any

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


def build_weekly_report_pdf(report: dict[str, Any], lead_name: str) -> bytes:
    buffer = BytesIO()
    document = SimpleDocTemplate(buffer, pagesize=landscape(A4), leftMargin=24, rightMargin=24, topMargin=24, bottomMargin=24)
    styles = getSampleStyleSheet()
    story = [
        Paragraph(f"Weekly Team Report: {report['week_start']} to {report['week_end']}", styles["Title"]),
        Paragraph(f"Team Lead: {lead_name}", styles["Normal"]),
        Spacer(1, 12),
        Paragraph(report.get("team_summary", ""), styles["BodyText"]),
        Spacer(1, 12),
        Paragraph(f"Overall challenges: {report.get('overall_challenges', '')}", styles["BodyText"]),
        Spacer(1, 8),
        Paragraph(f"Bottleneck risk: {report.get('bottleneck_risk', '')}", styles["BodyText"]),
        Spacer(1, 12),
    ]

    table_data = [[
        "Member",
        "Weekly Activity",
        "Extra Work",
        "Challenges",
        "Manager Notes",
        "Next Week Action Plan",
    ]]
    for row in report.get("rows", []):
        table_data.append(
            [
                Paragraph(row.get("member_name", ""), styles["BodyText"]),
                Paragraph(row.get("activity_summary", ""), styles["BodyText"]),
                Paragraph(row.get("extra_work_summary", ""), styles["BodyText"]),
                Paragraph(row.get("challenges_summary", ""), styles["BodyText"]),
                Paragraph(row.get("manager_notes", ""), styles["BodyText"]),
                Paragraph(row.get("next_week_action_plan", ""), styles["BodyText"]),
            ]
        )

    table = Table(table_data, repeatRows=1, colWidths=[90, 170, 120, 120, 110, 150])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0f172a")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#94a3b8")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.whitesmoke, colors.HexColor("#e2e8f0")]),
                ("PADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(table)
    document.build(story)
    return buffer.getvalue()
