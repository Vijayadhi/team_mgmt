import { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle2,
  ClipboardList,
  FileSpreadsheet,
  LockKeyhole,
  ShieldAlert,
  UserPlus,
  Users,
} from "lucide-react";
import {
  apiFetch,
  BusyOverlay,
  DashboardPage,
  DataTable,
  FormField,
  Header,
  Hero,
  OverdueCard,
  SectionCard,
  TASK_STATUS,
  formatDateTime,
  prettifyStatus,
  useClock,
} from "./common";

const emptyTaskForm = {
  assignee_id: "",
  title: "",
  description: "",
  eta: "",
  remarks: "",
  status: "todo",
  message: "",
  proof: "",
};

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

function TaskActivity({ activities }) {
  if (!activities?.length) return <div className="empty-box compact-empty">No updates yet.</div>;
  return <div className="activity-list">{activities.map((item, index) => <div key={`${item.created_at}-${index}`} className="activity-item"><div className="activity-meta"><strong>{item.sender_name}</strong><span>{prettifyStatus(item.status)}</span><small>{formatDateTime(item.created_at)}</small></div><p>{item.message || "Status updated."}</p>{item.proof ? <div className="proof-box">{item.proof}</div> : null}</div>)}</div>;
}

function TaskPanel({ task, members, form, setForm, onSave, working }) {
  return (
    <SectionCard icon={ClipboardList} title={task ? task.title : "Assign a task"} copy={task ? "Review the task thread or update task fields." : "Create a new assigned task."} tag={task ? prettifyStatus(task.status) : null}>
      <div className="form-grid">
        <FormField label="Member"><select className="field-input" value={form.assignee_id} onChange={(event) => setForm({ ...form, assignee_id: event.target.value })}><option value="">Select member</option>{members.map((item) => <option key={item.id} value={item.id}>{item.first_name} {item.last_name || ""} ({item.email})</option>)}</select></FormField>
        <FormField label="Title"><input className="field-input" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></FormField>
        <FormField label="ETA"><input className="field-input" type="date" value={form.eta} onChange={(event) => setForm({ ...form, eta: event.target.value })} /></FormField>
        <FormField label="Status"><select className="field-input" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>{TASK_STATUS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></FormField>
        <FormField label="Description"><textarea className="field-input field-textarea" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></FormField>
        <FormField label="Remarks"><textarea className="field-input field-textarea" value={form.remarks} onChange={(event) => setForm({ ...form, remarks: event.target.value })} /></FormField>
        {task ? <>
          <FormField label="Lead note"><textarea className="field-input field-textarea" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /></FormField>
          <FormField label="Reference / proof"><textarea className="field-input field-textarea" value={form.proof} onChange={(event) => setForm({ ...form, proof: event.target.value })} /></FormField>
        </> : null}
      </div>
      <div className="action-row"><button className="primary-button" disabled={working} onClick={onSave}>{working ? "Saving..." : task ? "Save task update" : "Assign task"}</button></div>
      {task ? <div className="task-thread-shell"><TaskActivity activities={task.activities} /></div> : null}
    </SectionCard>
  );
}

function ReportModal({ reportForm, setReportForm, onClose, onSave, reportBusy }) {
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

function ReportsEditor({ reports, onOpen }) {
  return (
    <SectionCard icon={FileSpreadsheet} title="Saved reports" copy="Open an existing report or download the finalized PDF.">
      <div className="list-panel">{reports.length ? reports.map((report) => <div key={report.id} className="list-row-card"><div><strong>{report.week_start} to {report.week_end}</strong><span>{formatDateTime(report.generated_at)}</span></div><div className="action-row"><button className="secondary-button" onClick={() => onOpen(report.id)}>Open</button><a className="secondary-link" href={`/admin/reports/${report.id}/download`}>Download PDF</a></div></div>) : <div className="empty-box">No finalized reports yet.</div>}</div>
    </SectionCard>
  );
}

export function AdminApp({ session, pushToast, view, setView, onMenuToggle, taskFocusId, clearTaskFocus }) {
  const now = useClock();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [filters, setFilters] = useState({ member_name: "", update_date: "" });
  const [teamForm, setTeamForm] = useState({ team_name: session.user.team_name || "" });
  const [memberForm, setMemberForm] = useState({ first_name: "", last_name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [reportForm, setReportForm] = useState(null);
  const [reportBusy, setReportBusy] = useState(false);
  const [taskForm, setTaskForm] = useState(emptyTaskForm);
  const [selectedTaskId, setSelectedTaskId] = useState("");

  const load = async (nextFilters = filters, options = {}) => {
    if (!options.silent || !data) setLoading(true);
    try {
      const params = new URLSearchParams();
      if (nextFilters.member_name) params.set("member_name", nextFilters.member_name);
      if (nextFilters.update_date) params.set("update_date", nextFilters.update_date);
      const payload = await apiFetch(`/api/admin/dashboard?${params.toString()}`);
      setData(payload);
      setFilters(payload.filters || nextFilters);
      setTeamForm({ team_name: payload.user.team_name || "" });
      if (taskFocusId) {
        setSelectedTaskId(taskFocusId);
        clearTaskFocus();
      }
    } catch (error) { pushToast("error", "Dashboard error", error.message); } finally { if (!options.silent || !data) setLoading(false); }
  };

  useEffect(() => { load(); }, []);
  useEffect(() => { if (taskFocusId) setSelectedTaskId(taskFocusId); }, [taskFocusId]);

  const selectedTask = data?.assigned_tasks?.find((item) => item.id === selectedTaskId) || null;
  useEffect(() => {
    if (selectedTask) setTaskForm({ assignee_id: selectedTask.assignee_id, title: selectedTask.title || "", description: selectedTask.description || "", eta: selectedTask.eta || "", remarks: selectedTask.remarks || "", status: selectedTask.status || "todo", message: "", proof: "" });
    else setTaskForm(emptyTaskForm);
  }, [selectedTaskId, selectedTask?.updated_at]);

  const refreshNotifications = async () => {
    const payload = await apiFetch("/api/notifications");
    setData((current) => current ? { ...current, notifications: payload.items, unread_notifications: payload.unread_count } : current);
  };

  const run = async (requester, title, after) => {
    setWorking(true);
    try {
      const result = await requester();
      pushToast("success", title, result.message || "Done.");
      if (after) await after(result);
      await load(filters, { silent: true });
    } catch (error) { pushToast("error", "Action failed", error.message); } finally { setWorking(false); }
  };

  const openReport = async (reportId) => {
    setView("reports");
    try { setReportForm(await apiFetch(`/api/admin/reports/${reportId}`)); } catch (error) { pushToast("error", "Unable to open report", error.message); }
  };

  const handleNotificationOpen = async (item) => {
    try { await apiFetch(`/api/notifications/${item.id}/read`, { method: "POST" }); } catch {}
    if (item.meta?.task_id) setSelectedTaskId(item.meta.task_id);
    setView(item.link?.includes("tasks") ? "tasks" : item.link?.includes("requests") ? "approvals" : "dashboard");
    await refreshNotifications();
  };

  if (loading && !data) return <div className="loading-inline">Loading...</div>;

  const stats = [
    { icon: Bell, label: "Pending requests", value: data.pending_requests.length, note: "Awaiting approval" },
    { icon: FileSpreadsheet, label: "Total entries", value: data.total_entries, note: "Tracked across the team" },
    { icon: ClipboardList, label: "Open tasks", value: data.open_task_count, note: "Assigned and still active" },
  ];

  let content = null;
  if (view === "dashboard") {
    content = <DashboardPage title="Team dashboard" copy="Daily visibility for approvals, task flow, and entry activity without clutter." now={now} stats={stats} trend={data.entry_trend} overdueCards={[
      <OverdueCard key="requests" title="Pending requests" items={data.pending_requests.slice(0, 5).map((item) => ({ ...item, title: item.member_name, date: item.date }))} emptyCopy="No pending requests right now." onOpen={() => setView("approvals")} dateKey="date" />,
      <OverdueCard key="missing" title="Missing days" items={data.missing_days.slice(0, 5).map((item) => ({ id: `${item.member_id}-${item.date}`, title: item.member_name, date: item.date }))} emptyCopy="No missing day flags in the current window." onOpen={() => setView("compliance")} dateKey="date" />,
    ]} infoCards={[
      { title: "Unread notifications", copy: data.unread_notifications ? `${data.unread_notifications} new updates need attention.` : "No unread notifications at the moment." },
      { title: "Reports", copy: data.reports.length ? `${data.reports.length} finalized weekly reports are available.` : "No finalized weekly reports yet." },
      { title: "Team coverage", copy: data.team_members.length ? `${data.team_members.length} members are mapped under this lead.` : "No team members have been added yet." },
    ]} />;
  } else if (view === "members") {
    content = <SectionCard icon={Users} title="Team members" copy="Account management with visibility into missed updates and active tasks." tag={`${data.team_members.length} members`}>
      <div className="split-panel">
        <div className="panel-scroll"><DataTable emptyMessage="No team members found." rows={data.team_members} columns={[
          { key: "member", label: "Member", render: (item) => <div className="table-cell-stack"><strong>{item.first_name} {item.last_name || ""}</strong><span>{item.email}</span></div> },
          { key: "missed", label: "Missed Days", render: (item) => item.missing_day_count || 0 },
          { key: "tasks", label: "Open Tasks", render: (item) => item.open_task_count || 0 },
          { key: "status", label: "Status", render: (item) => <span className={`status-chip ${item.is_active ? "status-success" : "status-danger"}`}>{item.is_active ? "Active" : "Disabled"}</span> },
          { key: "actions", label: "Actions", render: (item) => <div className="action-row"><button className="secondary-button" onClick={() => run(() => apiFetch(`/api/admin/users/${item.id}/toggle`, { method: "POST" }), "Member updated")}>{item.is_active ? "Disable" : "Enable"}</button><button className="secondary-button" onClick={() => run(() => apiFetch(`/api/admin/users/${item.id}/reset-password`, { method: "POST" }), "Password reset")}>Reset password</button></div> },
        ]} /></div>
        <div className="panel-aside"><SectionCard icon={UserPlus} title="Add team member" copy="New users receive their first name as the initial password."><div className="form-grid"><FormField label="First name"><input className="field-input" value={memberForm.first_name} onChange={(event) => setMemberForm({ ...memberForm, first_name: event.target.value })} /></FormField><FormField label="Last name"><input className="field-input" value={memberForm.last_name} onChange={(event) => setMemberForm({ ...memberForm, last_name: event.target.value })} /></FormField><FormField label="Email"><input className="field-input" type="email" value={memberForm.email} onChange={(event) => setMemberForm({ ...memberForm, email: event.target.value })} /></FormField></div><div className="action-row"><button className="primary-button" disabled={working} onClick={() => run(() => apiFetch("/api/admin/users", { method: "POST", body: JSON.stringify(memberForm) }), "Member added", async () => setMemberForm({ first_name: "", last_name: "", email: "" }))}>Create member</button></div></SectionCard></div>
      </div>
    </SectionCard>;
  } else if (view === "tasks") {
    content = <div className="split-panel page-stack-mobile">
      <SectionCard icon={ClipboardList} title="Assigned tasks" copy="Assign work to a member and manage follow-up from a single task table." tag={`${data.assigned_tasks.length} tasks`}><div className="panel-scroll"><DataTable emptyMessage="No tasks assigned yet." rows={data.assigned_tasks} columns={[
        { key: "title", label: "Title", render: (item) => <strong>{item.title}</strong> },
        { key: "member", label: "Assignee", render: (item) => item.assignee_name },
        { key: "eta", label: "ETA", render: (item) => item.eta || "-" },
        { key: "status", label: "Status", render: (item) => <span className="status-chip status-info">{prettifyStatus(item.status)}</span> },
        { key: "remarks", label: "Remarks", render: (item) => item.remarks || "-" },
        { key: "open", label: "Actions", render: (item) => <div className="action-row"><button className="secondary-button" onClick={() => setSelectedTaskId(item.id)}>Open</button><button className="secondary-button" onClick={() => setSelectedTaskId(item.id)}>Edit</button></div> },
      ]} /></div></SectionCard>
      <div className="panel-aside">
        <div className="action-row">
          <button className="secondary-button" onClick={() => { setSelectedTaskId(""); setTaskForm(emptyTaskForm); }}>New task</button>
          {(selectedTask || taskForm.title || taskForm.assignee_id || taskForm.eta) ? <button className="secondary-button" onClick={() => setTaskForm(selectedTask ? { assignee_id: selectedTask.assignee_id, title: selectedTask.title || "", description: selectedTask.description || "", eta: selectedTask.eta || "", remarks: selectedTask.remarks || "", status: selectedTask.status || "todo", message: "", proof: "" } : emptyTaskForm)}>Reset form</button> : null}
        </div>
        <TaskPanel task={selectedTask} members={data.team_members} form={taskForm} setForm={setTaskForm} working={working} onSave={() => run(() => selectedTask ? apiFetch(`/api/tasks/${selectedTask.id}`, { method: "POST", body: JSON.stringify(taskForm) }) : apiFetch("/api/admin/tasks", { method: "POST", body: JSON.stringify(taskForm) }), selectedTask ? "Task updated" : "Task assigned", async () => {
          if (!selectedTask) {
            setSelectedTaskId("");
            setTaskForm(emptyTaskForm);
          } else {
            setTaskForm((current) => ({ ...current, message: "", proof: "" }));
          }
        })} />
      </div>
    </div>;
  } else if (view === "updates") {
    content = <SectionCard icon={FileSpreadsheet} title="Daily updates" copy="All submitted member updates with filter support by member and date.">
      <div className="inline-form-row">
        <FormField label="Member or email"><input className="field-input" value={filters.member_name} onChange={(event) => setFilters({ ...filters, member_name: event.target.value })} /></FormField>
        <FormField label="Date"><input className="field-input" type="date" value={filters.update_date} onChange={(event) => setFilters({ ...filters, update_date: event.target.value })} /></FormField>
      </div>
      <div className="action-row"><button className="secondary-button" onClick={() => load(filters)}>Apply filter</button></div>
      <div className="panel-scroll"><DataTable emptyMessage="No daily updates matched the current filter." rows={data.updates} columns={[
        { key: "date", label: "Date", render: (item) => item.date },
        { key: "member", label: "Member", render: (item) => <div className="table-cell-stack"><strong>{item.member_name}</strong><span>{item.email}</span></div> },
        { key: "plan", label: "Morning Plan", render: (item) => item.plan || "-" },
        { key: "eta", label: "ETA", render: (item) => item.eta || "-" },
        { key: "client", label: "Client", render: (item) => item.client_name || "-" },
        { key: "proof", label: "Proof", render: (item) => item.proof_of_work || "-" },
      ]} /></div>
    </SectionCard>;
  } else if (view === "approvals") {
    content = <SectionCard icon={CheckCircle2} title="Pending requests" copy="Review late EOD and missed-day requests before approving them."><div className="panel-scroll"><DataTable emptyMessage="No pending approval requests." rows={data.pending_requests} columns={[
      { key: "date", label: "Date", render: (item) => item.date },
      { key: "member", label: "Member", render: (item) => <div className="table-cell-stack"><strong>{item.member_name}</strong><span>{item.email}</span></div> },
      { key: "type", label: "Request Type", render: (item) => prettifyStatus(item.request_type) },
      { key: "plan", label: "Plan", render: (item) => item.plan || "-" },
      { key: "eta", label: "ETA", render: (item) => item.eta || "-" },
      { key: "client", label: "Client", render: (item) => item.client_name || "-" },
      { key: "proof", label: "Proof", render: (item) => item.proof_of_work || "-" },
      { key: "reason", label: "Reason", render: (item) => item.reason || "-" },
      { key: "actions", label: "Actions", render: (item) => <div className="action-row"><button className="primary-button" onClick={() => run(() => apiFetch(`/api/admin/requests/${item.id}/approve`, { method: "POST" }), "Request approved")}>Approve</button><button className="danger-button" onClick={() => run(() => apiFetch(`/api/admin/requests/${item.id}/reject`, { method: "POST" }), "Request rejected")}>Reject</button><button className="secondary-button" onClick={() => run(() => apiFetch(`/api/admin/requests/${item.id}/reset`, { method: "POST" }), "Request reset")}>Reset</button></div> },
    ]} /></div></SectionCard>;
  } else if (view === "compliance") {
    content = <SectionCard icon={ShieldAlert} title="Missing day tracker" copy="Track unresolved gaps and act on them quickly." tag={`${data.missing_days.length} records`}><div className="panel-scroll"><DataTable emptyMessage="No missing-day records in the active window." rows={data.missing_days} columns={[
      { key: "date", label: "Date", render: (item) => item.date },
      { key: "member", label: "Member", render: (item) => <div className="table-cell-stack"><strong>{item.member_name}</strong><span>{item.email}</span></div> },
      { key: "actions", label: "Actions", render: (item) => <div className="action-row"><button className="secondary-button" onClick={() => run(() => apiFetch("/api/admin/missing-days/leave", { method: "POST", body: JSON.stringify({ user_id: item.member_id, missing_date: item.date, reason: "Marked as leave by TL" }) }), "Leave marked")}>Mark leave</button><button className="danger-button" onClick={() => run(() => apiFetch("/api/admin/missing-days/warning", { method: "POST", body: JSON.stringify({ user_id: item.member_id, missing_date: item.date }) }), "Warning sent")}>Raise warning</button></div> },
    ]} /></div></SectionCard>;
  } else if (view === "reports") {
    content = <div className="page-stack">
      <SectionCard icon={FileSpreadsheet} title="Generate weekly report" copy="Create a fresh weekly summary before editing and finalizing it."><div className="inline-form-row"><FormField label="Week start"><input className="field-input" type="date" value={data.week_start} onChange={(event) => setData({ ...data, week_start: event.target.value })} /></FormField><FormField label="Week end"><input className="field-input" type="date" value={data.week_end} onChange={(event) => setData({ ...data, week_end: event.target.value })} /></FormField></div><div className="action-row"><button className="primary-button" disabled={working} onClick={() => run(() => apiFetch("/api/admin/reports/generate", { method: "POST", body: JSON.stringify({ week_start: data.week_start, week_end: data.week_end }) }), "Weekly report generated", async (result) => openReport(result.report_id))}>{working ? "Generating..." : "Generate report"}</button></div></SectionCard>
      <ReportsEditor reports={data.reports} onOpen={openReport} />
      <ReportModal reportForm={reportForm} setReportForm={setReportForm} onClose={() => setReportForm(null)} reportBusy={reportBusy} onSave={async () => {
        setReportBusy(true);
        try { const result = await apiFetch(`/api/admin/reports/${reportForm.id}/save`, { method: "POST", body: JSON.stringify(reportForm) }); pushToast("success", "Report finalized", result.message); await load(filters, { silent: true }); window.open(result.download_url, "_blank", "noopener,noreferrer"); } catch (error) { pushToast("error", "Save failed", error.message); } finally { setReportBusy(false); }
      }} />
    </div>;
  } else {
    content = <div className="page-stack">
      <SectionCard icon={Users} title="Team identity" copy="Control the team name displayed throughout the workspace."><FormField label="Team name"><input className="field-input" value={teamForm.team_name} onChange={(event) => setTeamForm({ team_name: event.target.value })} /></FormField><div className="action-row"><button className="primary-button" disabled={working} onClick={() => run(() => apiFetch("/api/admin/team-name", { method: "POST", body: JSON.stringify(teamForm) }), "Team updated")}>Update team name</button></div></SectionCard>
      <SectionCard icon={LockKeyhole} title="Lead password" copy="Keep the lead account secure."><div className="inline-form-row"><FormField label="Current password"><input className="field-input" type="password" value={passwordForm.current_password} onChange={(event) => setPasswordForm({ ...passwordForm, current_password: event.target.value })} /></FormField><FormField label="New password"><input className="field-input" type="password" value={passwordForm.new_password} onChange={(event) => setPasswordForm({ ...passwordForm, new_password: event.target.value })} /></FormField><FormField label="Confirm password"><input className="field-input" type="password" value={passwordForm.confirm_password} onChange={(event) => setPasswordForm({ ...passwordForm, confirm_password: event.target.value })} /></FormField></div><div className="action-row"><button className="primary-button" disabled={working} onClick={() => run(() => apiFetch("/api/admin/change-password", { method: "POST", body: JSON.stringify(passwordForm) }), "Password updated", async () => setPasswordForm({ current_password: "", new_password: "", confirm_password: "" }))}>Update password</button></div></SectionCard>
    </div>;
  }

  return (
    <main className="workspace-main">
      <BusyOverlay show={working} label="Processing..." />
      <BusyOverlay show={reportBusy} label="Finalizing report..." />
      <Header title="Admin workspace" copy="A focused lead console for people, compliance, tasks, and reporting." onMenuToggle={onMenuToggle} notifications={data.notifications || []} unreadCount={data.unread_notifications || 0} onNotificationOpen={handleNotificationOpen} onNotificationRefresh={refreshNotifications} />
      <Hero title={`${session.user.first_name} ${session.user.last_name || ""}`} copy="Run the team from a single dashboard with clean, operational views." meta={[{ label: "Team", value: session.user.team_name || "Team Daily Tracker" }, { label: "Email", value: session.user.email }]} />
      {content}
    </main>
  );
}
