import { FormField, SectionCard, formatDateTime } from "./common";

function updateReportList(reportForm, setReportForm, key, index, field, value) {
  const rows = [...(reportForm[key] || [])];
  rows[index] = { ...rows[index], [field]: value };
  setReportForm({ ...reportForm, [key]: rows });
}

function ReportTableEditor({ title, columns, rows, reportForm, setReportForm, dataKey, emptyLabel = "No rows available." }) {
  return (
    <div className="report-template-block">
      <div className="report-template-title"><strong>{title}</strong></div>
      {rows?.length ? <div className="table-wrap report-table-wrap"><table className="data-table report-edit-table"><thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${dataKey}-${index}`}>{columns.map((column) => <td key={column.key}>{column.type === "checkbox" ? <label className="checkbox-pill"><input type="checkbox" checked={Boolean(row[column.key])} onChange={(event) => updateReportList(reportForm, setReportForm, dataKey, index, column.key, event.target.checked)} /><span>{row[column.key] ? "Yes" : "No"}</span></label> : column.multiline ? <textarea className="field-input field-textarea report-cell-textarea" value={row[column.key] || ""} onChange={(event) => updateReportList(reportForm, setReportForm, dataKey, index, column.key, event.target.value)} /> : <input className="field-input" value={row[column.key] || ""} onChange={(event) => updateReportList(reportForm, setReportForm, dataKey, index, column.key, event.target.value)} />}</td>)}</tr>)}</tbody></table></div> : <div className="empty-box compact-empty">{emptyLabel}</div>}
    </div>
  );
}

export function ReportsEditor({ reports, onOpen, onDelete, icon: Icon, reportTitle = "Weekly report" }) {
  return (
    <SectionCard icon={Icon} title="Saved reports" copy="Open an existing report or download the finalized PDF.">
      <div className="list-panel">{reports.length ? reports.map((report) => <div key={report.id} className="list-row-card"><div><strong>{reportTitle}</strong><span>{report.week_start} to {report.week_end} · {formatDateTime(report.generated_at)}</span></div><div className="action-row"><button className="secondary-button" onClick={() => onOpen(report.id)}>Open</button><a className="secondary-link" href={`/admin/reports/${report.id}/download?v=${encodeURIComponent(report.updated_at || report.generated_at || "")}`}>Download PDF</a>{onDelete ? <button className="danger-button" onClick={() => onDelete(report.id)}>Delete</button> : null}</div></div>) : <div className="empty-box">No finalized reports yet.</div>}</div>
    </SectionCard>
  );
}

export function ReportModal({ reportForm, setReportForm, onClose, onSave, reportBusy }) {
  if (!reportForm?.id) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-xl" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <div>
            <strong>Report editor</strong>
            <span>{reportForm.week_start} to {reportForm.week_end}</span>
          </div>
          <button className="secondary-button" onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
          <div className="report-editor-stack template-editor">
            <div className="report-template-block">
              <div className="report-template-header-grid">
                <FormField label="Client"><input className="field-input" value={reportForm.client_label || ""} onChange={(event) => setReportForm({ ...reportForm, client_label: event.target.value })} /></FormField>
                <FormField label="Reporting week"><input className="field-input" value={`${reportForm.week_start} to ${reportForm.week_end}`} readOnly /></FormField>
                <FormField label="Prepared by"><input className="field-input" value={reportForm.prepared_by || ""} onChange={(event) => setReportForm({ ...reportForm, prepared_by: event.target.value })} /></FormField>
              </div>
            </div>
            <div className="report-summary-row">
              <FormField label="1. Executive Summary"><textarea className="field-input field-textarea report-summary-textarea" value={reportForm.executive_summary || reportForm.team_summary || ""} onChange={(event) => setReportForm({ ...reportForm, executive_summary: event.target.value, team_summary: event.target.value })} /></FormField>
            </div>
            <ReportTableEditor title="2. Team Members - Last Week Summary (Actuals)" dataKey="last_week_rows" reportForm={reportForm} setReportForm={setReportForm} rows={reportForm.last_week_rows} columns={[
              { key: "team_member", label: "Team Member" },
              { key: "client_location", label: "Client / Location" },
              { key: "batch_tech_stack", label: "Batch / Tech Stack" },
              { key: "role", label: "Role" },
              { key: "sessions_completed", label: "Sessions / Milestones Completed", multiline: true },
              { key: "status", label: "Status" },
              { key: "remarks", label: "Remarks", multiline: true },
            ]} />
            <ReportTableEditor title="2. Upcoming Week Plan (Commitments)" dataKey="upcoming_week_rows" reportForm={reportForm} setReportForm={setReportForm} rows={reportForm.upcoming_week_rows} columns={[
              { key: "team_member", label: "Team Member" },
              { key: "client_location", label: "Client / Location" },
              { key: "batch_tech_stack", label: "Batch / Tech Stack" },
              { key: "planned_topics", label: "Planned Topics / Milestones", multiline: true },
              { key: "planned_dates", label: "Planned Dates" },
              { key: "delivery_mode", label: "Delivery Mode" },
              { key: "preparation_activities", label: "Preparation Activities", multiline: true },
              { key: "availability_wfh", label: "Availability / WFH" },
              { key: "risks_dependencies", label: "Risks / Dependencies", multiline: true },
            ]} />
            <ReportTableEditor title="3. Detailed Session Observations" dataKey="detailed_observations" reportForm={reportForm} setReportForm={setReportForm} rows={reportForm.detailed_observations} columns={[
              { key: "batch_name", label: "Batch / Track" },
              { key: "topics_covered", label: "Topics Covered", multiline: true },
              { key: "delivery_quality", label: "Delivery Quality" },
              { key: "learner_engagement", label: "Learner Engagement" },
              { key: "pending_topics", label: "Pending Topics / Gaps", multiline: true },
            ]} />
            <div className="report-tail-row"><FormField label="4. Lead Activities (Current Week)"><textarea className="field-input field-textarea" value={reportForm.lead_activities || ""} onChange={(event) => setReportForm({ ...reportForm, lead_activities: event.target.value })} /></FormField></div>
            <ReportTableEditor title="5. Bottlenecks / Risks Identified" dataKey="bottleneck_rows" reportForm={reportForm} setReportForm={setReportForm} rows={reportForm.bottleneck_rows} columns={[
              { key: "risk", label: "Risk / Bottleneck", multiline: true },
              { key: "impact", label: "Impact", multiline: true },
              { key: "affected_batch_client", label: "Affected Batch / Client" },
              { key: "owner", label: "Owner" },
              { key: "mitigation_plan", label: "Mitigation Plan", multiline: true },
              { key: "eta", label: "ETA" },
            ]} />
            <div className="report-template-grid">
              <FormField label="6. Client Feedback"><textarea className="field-input field-textarea" value={reportForm.client_feedback || ""} onChange={(event) => setReportForm({ ...reportForm, client_feedback: event.target.value })} /></FormField>
              <FormField label="Action Taken / Planned"><textarea className="field-input field-textarea" value={reportForm.client_action_taken || ""} onChange={(event) => setReportForm({ ...reportForm, client_action_taken: event.target.value })} /></FormField>
              <FormField label="Feedback Status"><input className="field-input" value={reportForm.client_feedback_status || ""} onChange={(event) => setReportForm({ ...reportForm, client_feedback_status: event.target.value })} /></FormField>
            </div>
            <div className="report-template-grid">
              <FormField label="7. Delivery & Assessment Plan"><textarea className="field-input field-textarea" value={reportForm.delivery_assessment_plan || reportForm.overall_next_week_plan || ""} onChange={(event) => setReportForm({ ...reportForm, delivery_assessment_plan: event.target.value, overall_next_week_plan: event.target.value })} /></FormField>
              <FormField label="New Batch Kick-offs"><textarea className="field-input field-textarea" value={reportForm.new_batch_kickoffs || ""} onChange={(event) => setReportForm({ ...reportForm, new_batch_kickoffs: event.target.value })} /></FormField>
              <FormField label="Re-attempts / Assessments"><textarea className="field-input field-textarea" value={reportForm.assessments_scheduled || ""} onChange={(event) => setReportForm({ ...reportForm, assessments_scheduled: event.target.value })} /></FormField>
            </div>
            <ReportTableEditor title="Readiness Checklist" dataKey="readiness_checklist_rows" reportForm={{ ...reportForm, readiness_checklist_rows: [
              { id: "trainers_aligned", label: "Trainers aligned on pace and coverage", value: reportForm.readiness_checklist?.trainers_aligned },
              { id: "tas_assigned", label: "TAs assigned and availability confirmed", value: reportForm.readiness_checklist?.tas_assigned },
              { id: "environments_validated", label: "Environments and platforms validated", value: reportForm.readiness_checklist?.environments_validated },
              { id: "question_banks_reviewed", label: "Question banks and demos reviewed", value: reportForm.readiness_checklist?.question_banks_reviewed },
            ] }} setReportForm={(nextValue) => {
              const checklistRows = nextValue.readiness_checklist_rows || [];
              setReportForm({
                ...reportForm,
                readiness_checklist: {
                  trainers_aligned: Boolean(checklistRows[0]?.value),
                  tas_assigned: Boolean(checklistRows[1]?.value),
                  environments_validated: Boolean(checklistRows[2]?.value),
                  question_banks_reviewed: Boolean(checklistRows[3]?.value),
                },
              });
            }} rows={[
              { label: "Trainers aligned on pace and coverage", value: reportForm.readiness_checklist?.trainers_aligned },
              { label: "TAs assigned and availability confirmed", value: reportForm.readiness_checklist?.tas_assigned },
              { label: "Environments and platforms validated", value: reportForm.readiness_checklist?.environments_validated },
              { label: "Question banks and demos reviewed", value: reportForm.readiness_checklist?.question_banks_reviewed },
            ]} columns={[
              { key: "label", label: "Checklist Item" },
              { key: "value", label: "Ready", type: "checkbox" },
            ]} />
            <ReportTableEditor title="8. Action Items & Ownership" dataKey="action_items" reportForm={reportForm} setReportForm={setReportForm} rows={reportForm.action_items} columns={[
              { key: "action_item", label: "Action Item", multiline: true },
              { key: "owner", label: "Owner" },
              { key: "priority", label: "Priority" },
              { key: "target_date", label: "Target Date" },
              { key: "status", label: "Status" },
            ]} />
            <div className="report-template-grid">
              <FormField label="9. Remarks / Escalations"><textarea className="field-input field-textarea" value={reportForm.remarks_escalations || reportForm.bottleneck_risk || ""} onChange={(event) => setReportForm({ ...reportForm, remarks_escalations: event.target.value, bottleneck_risk: event.target.value })} /></FormField>
              <FormField label="Overall Challenges"><textarea className="field-input field-textarea" value={reportForm.overall_challenges || ""} onChange={(event) => setReportForm({ ...reportForm, overall_challenges: event.target.value })} /></FormField>
              <FormField label="Report Date"><input className="field-input" type="date" value={reportForm.report_date || ""} onChange={(event) => setReportForm({ ...reportForm, report_date: event.target.value })} /></FormField>
              <FormField label="Report Prepared By"><input className="field-input" value={reportForm.report_prepared_by || ""} onChange={(event) => setReportForm({ ...reportForm, report_prepared_by: event.target.value })} /></FormField>
            </div>
          </div>
        </div>
        <div className="modal-actions">
          <button className="primary-button" disabled={reportBusy} onClick={onSave}>{reportBusy ? "Saving..." : "Save and finalize"}</button>
          {reportForm.download_url ? <a className="secondary-link" href={reportForm.download_url}>Download PDF</a> : null}
        </div>
      </div>
    </div>
  );
}
