import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  ClipboardList,
  FileSpreadsheet,
  FolderClock,
  ListTodo,
  LockKeyhole,
  Plus,
  ShieldAlert,
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
  TODO_STATUS,
  formatDateTime,
  prettifyStatus,
  useClock,
} from "./common";

const MEMBER_CACHE_KEY = "member_dashboard_cache_v1";

function normalizeMemberData(payload = {}) {
  const safePayload = payload && typeof payload === "object" ? payload : {};
  return {
    user: safePayload.user || {},
    today: safePayload.today || "",
    form_data: safePayload.form_data || {},
    is_editing: Boolean(safePayload.is_editing),
    is_requesting_missing_day: Boolean(safePayload.is_requesting_missing_day),
    recent_updates: Array.isArray(safePayload.recent_updates) ? safePayload.recent_updates : [],
    pending_requests: Array.isArray(safePayload.pending_requests) ? safePayload.pending_requests : [],
    request_history: Array.isArray(safePayload.request_history) ? safePayload.request_history : [],
    total_entries: Number(safePayload.total_entries || 0),
    entry_trend: Array.isArray(safePayload.entry_trend) ? safePayload.entry_trend : [],
    missing_dates: Array.isArray(safePayload.missing_dates) ? safePayload.missing_dates : [],
    missing_day_count: Number(safePayload.missing_day_count || 0),
    missed_days_from: safePayload.missed_days_from || "",
    missed_days_to: safePayload.missed_days_to || "",
    todos: Array.isArray(safePayload.todos) ? safePayload.todos : [],
    overdue_todos: Array.isArray(safePayload.overdue_todos) ? safePayload.overdue_todos : [],
    assigned_tasks: Array.isArray(safePayload.assigned_tasks) ? safePayload.assigned_tasks : [],
    overdue_tasks: Array.isArray(safePayload.overdue_tasks) ? safePayload.overdue_tasks : [],
    notifications: Array.isArray(safePayload.notifications) ? safePayload.notifications : [],
    unread_notifications: Number(safePayload.unread_notifications || 0),
  };
}

function readMemberCache() {
  try {
    const raw = window.sessionStorage.getItem(MEMBER_CACHE_KEY);
    return raw ? normalizeMemberData(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function writeMemberCache(payload) {
  try {
    window.sessionStorage.setItem(MEMBER_CACHE_KEY, JSON.stringify(payload));
  } catch {}
}

function blankWorkspaceForm(targetDate) {
  return {
    date: targetDate || "",
    plan: "",
    eta: "",
    delivery_mode: "",
    batch_name: "",
    track_name: "",
    client_name: "",
    extra_work: "",
    challenges: "",
    proof_of_work: "",
    request_reason: "",
    is_corporate: false,
    is_university: false,
  };
}

function WorkspaceForm({ data, formState, setFormState, working, onSubmit, onReset, onDateChange }) {
  const safeFormState = formState || {
    date: data.today || "",
    plan: "",
    eta: "",
    delivery_mode: "",
    batch_name: "",
    track_name: "",
    client_name: "",
    extra_work: "",
    challenges: "",
    proof_of_work: "",
    request_reason: "",
    is_corporate: false,
    is_university: false,
  };
  return (
    <SectionCard
      icon={FolderClock}
      title={data.is_requesting_missing_day ? "Missed day request" : data.is_editing ? "End-of-day update" : "Morning entry"}
      copy="A lightweight daily update form that switches to approval mode only when the date changes."
      tag={safeFormState.date}
    >
      {data.is_editing ? <div className="summary-box simple-summary"><strong>Morning entry summary</strong><p>Plan: {safeFormState.plan || "-"}</p><p>ETA: {safeFormState.eta || "-"}</p><p>Delivery mode: {prettifyStatus(safeFormState.delivery_mode || "-")}</p><p>Batch: {safeFormState.batch_name || "-"}</p><p>Track: {safeFormState.track_name || "-"}</p><p>Client: {safeFormState.client_name || "-"}</p></div> : null}
      <div className="form-grid compact-form-grid">
        {!data.is_editing ? (
          <>
            <FormField label="Date"><input className="field-input" type="date" value={safeFormState.date} onChange={(event) => onDateChange ? onDateChange(event.target.value) : setFormState({ ...safeFormState, date: event.target.value })} /></FormField>
            <FormField label="Morning plan"><textarea className="field-input field-textarea compact-textarea" value={safeFormState.plan} onChange={(event) => setFormState({ ...safeFormState, plan: event.target.value })} /></FormField>
            <FormField label="ETA"><input className="field-input" value={safeFormState.eta} onChange={(event) => setFormState({ ...safeFormState, eta: event.target.value })} /></FormField>
            <FormField label="Delivery mode">
              <select className="field-input" value={safeFormState.delivery_mode || ""} onChange={(event) => setFormState({ ...safeFormState, delivery_mode: event.target.value })}>
                <option value="">Select mode</option>
                <option value="wfh">WFH</option>
                <option value="client_place">Client place</option>
                <option value="in_office">In office</option>
              </select>
            </FormField>
            <FormField label="Batch name"><input className="field-input" value={safeFormState.batch_name || ""} onChange={(event) => setFormState({ ...safeFormState, batch_name: event.target.value })} /></FormField>
            <FormField label="Track name"><input className="field-input" value={safeFormState.track_name || ""} onChange={(event) => setFormState({ ...safeFormState, track_name: event.target.value })} /></FormField>
            <FormField label="Client"><input className="field-input" value={safeFormState.client_name} onChange={(event) => setFormState({ ...safeFormState, client_name: event.target.value })} /></FormField>
            <FormField label="Category">
              <div className="checkbox-row">
                <label className="checkbox-pill"><input type="checkbox" checked={!!safeFormState.is_corporate} onChange={(event) => setFormState({ ...safeFormState, is_corporate: event.target.checked })} /><span>Corporate</span></label>
                <label className="checkbox-pill"><input type="checkbox" checked={!!safeFormState.is_university} onChange={(event) => setFormState({ ...safeFormState, is_university: event.target.checked })} /><span>University</span></label>
              </div>
            </FormField>
          </>
        ) : null}
        {(data.is_editing || data.is_requesting_missing_day) ? (
          <>
            <FormField label="Extra work"><textarea className="field-input field-textarea compact-textarea" value={safeFormState.extra_work} onChange={(event) => setFormState({ ...safeFormState, extra_work: event.target.value })} /></FormField>
            <FormField label="Challenges"><textarea className="field-input field-textarea compact-textarea" value={safeFormState.challenges} onChange={(event) => setFormState({ ...safeFormState, challenges: event.target.value })} /></FormField>
            <FormField label="Proof of work"><textarea className="field-input field-textarea compact-textarea" value={safeFormState.proof_of_work} onChange={(event) => setFormState({ ...safeFormState, proof_of_work: event.target.value })} /></FormField>
          </>
        ) : null}
        {(data.is_requesting_missing_day || (data.is_editing && safeFormState.date < data.today)) ? (
          <FormField label="Reason for late submission"><textarea className="field-input field-textarea compact-textarea" value={safeFormState.request_reason} onChange={(event) => setFormState({ ...safeFormState, request_reason: event.target.value })} /></FormField>
        ) : null}
      </div>
      <div className="action-row">
        <button className="primary-button" disabled={working} onClick={onSubmit}>{working ? "Saving..." : data.is_requesting_missing_day ? "Submit request" : data.is_editing ? "Save end-of-day update" : "Save morning entry"}</button>
        {(data.is_editing || data.is_requesting_missing_day) ? <button className="secondary-button" onClick={onReset}>Back to new entry</button> : null}
      </div>
    </SectionCard>
  );
}

function TodoPage({ items, filters, setFilters, form, setForm, onApplyFilter, onSave, working }) {
  return (
    <div className="page-stack">
      <SectionCard icon={ListTodo} title="Personal todo" copy="Track your own checklist with deadline and completion filters." tag={`${items.length} items`}>
        <div className="inline-form-row">
          <FormField label="Deadline from"><input className="field-input" type="date" value={filters.deadline_from} onChange={(event) => setFilters({ ...filters, deadline_from: event.target.value })} /></FormField>
          <FormField label="Deadline to"><input className="field-input" type="date" value={filters.deadline_to} onChange={(event) => setFilters({ ...filters, deadline_to: event.target.value })} /></FormField>
          <FormField label="Completion">
            <select className="field-input" value={filters.completion} onChange={(event) => setFilters({ ...filters, completion: event.target.value })}>
              <option value="">All</option><option value="open">Open</option><option value="completed">Completed</option><option value="in_progress">In Progress</option><option value="pending">Pending</option>
            </select>
          </FormField>
        </div>
        <div className="action-row"><button className="secondary-button" onClick={onApplyFilter}>Apply filter</button></div>
        <DataTable
          emptyMessage="No todo items matched the current filter."
          rows={items}
          columns={[
            { key: "title", label: "Title", render: (item) => <strong>{item.title}</strong> },
            { key: "details", label: "Details", render: (item) => item.details || "-" },
            { key: "deadline", label: "Deadline", render: (item) => item.deadline || "-" },
            { key: "status", label: "Status", render: (item) => <span className="status-chip status-info">{prettifyStatus(item.status)}</span> },
            { key: "updated", label: "Updated", render: (item) => formatDateTime(item.updated_at) },
            { key: "actions", label: "Actions", render: (item) => <button className="secondary-button" onClick={() => setForm({ id: item.id, title: item.title || "", details: item.details || "", deadline: item.deadline || "", status: item.status || "pending" })}>Edit</button> },
          ]}
        />
      </SectionCard>
      <SectionCard icon={Plus} title={form.id ? "Edit todo" : "Add todo"} copy="Simple member-specific checklist tracking.">
        <div className="form-grid">
          <FormField label="Title"><input className="field-input" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></FormField>
          <FormField label="Deadline"><input className="field-input" type="date" value={form.deadline} onChange={(event) => setForm({ ...form, deadline: event.target.value })} /></FormField>
          <FormField label="Status"><select className="field-input" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>{TODO_STATUS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></FormField>
          <FormField label="Details"><textarea className="field-input field-textarea" value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} /></FormField>
        </div>
        <div className="action-row">
          <button className="primary-button" disabled={working} onClick={onSave}>{working ? "Saving..." : form.id ? "Update todo" : "Add todo"}</button>
          {form.id ? <button className="secondary-button" onClick={() => setForm({ id: "", title: "", details: "", deadline: "", status: "pending" })}>Clear selection</button> : null}
        </div>
      </SectionCard>
    </div>
  );
}

function TaskPanel({ task, form, setForm, onSave, working }) {
  return (
    <SectionCard icon={ClipboardList} title={task ? task.title : "Task details"} copy="Only tasks assigned to you are visible here.">
      {task ? (
        <>
          <div className="form-grid">
            <FormField label="Status"><select className="field-input" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>{TASK_STATUS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></FormField>
            <FormField label="ETA"><input className="field-input" type="date" value={form.eta} disabled /></FormField>
            <FormField label="Task description"><textarea className="field-input field-textarea" value={form.description} disabled /></FormField>
            <FormField label="Remarks"><textarea className="field-input field-textarea" value={form.remarks} disabled /></FormField>
            <FormField label="Acknowledgement / update"><textarea className="field-input field-textarea" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} /></FormField>
            <FormField label="Proof"><textarea className="field-input field-textarea" value={form.proof} onChange={(event) => setForm({ ...form, proof: event.target.value })} /></FormField>
          </div>
          <div className="action-row"><button className="primary-button" disabled={working} onClick={onSave}>{working ? "Saving..." : "Save task update"}</button></div>
          <div className="task-thread-shell"><TaskActivity activities={task.activities} /></div>
        </>
      ) : <div className="empty-box">Select a task from the table to see the details and discussion.</div>}
    </SectionCard>
  );
}

function TaskActivity({ activities }) {
  if (!activities?.length) return <div className="empty-box compact-empty">No updates yet.</div>;
  return <div className="activity-list">{activities.map((item, index) => <div key={`${item.created_at}-${index}`} className="activity-item"><div className="activity-meta"><strong>{item.sender_name}</strong><span>{prettifyStatus(item.status)}</span><small>{formatDateTime(item.created_at)}</small></div><p>{item.message || "Status updated."}</p>{item.proof ? <div className="proof-box">{item.proof}</div> : null}</div>)}</div>;
}

function HistoryEditModal({ item, formState, setFormState, onClose, onSave, working, today }) {
  if (!item) return null;
  const isPastDate = item.date < today;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <div>
            <strong>Edit daily update</strong>
            <span>{item.date}</span>
          </div>
          <button className="secondary-button" onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
          <div className="form-grid compact-form-grid">
            <FormField label="Morning plan"><textarea className="field-input field-textarea compact-textarea" value={formState.plan || ""} onChange={(event) => setFormState({ ...formState, plan: event.target.value })} /></FormField>
            <FormField label="ETA"><input className="field-input" value={formState.eta || ""} onChange={(event) => setFormState({ ...formState, eta: event.target.value })} /></FormField>
            <FormField label="Delivery mode">
              <select className="field-input" value={formState.delivery_mode || ""} onChange={(event) => setFormState({ ...formState, delivery_mode: event.target.value })}>
                <option value="">Select mode</option>
                <option value="wfh">WFH</option>
                <option value="client_place">Client place</option>
                <option value="in_office">In office</option>
              </select>
            </FormField>
            <FormField label="Batch name"><input className="field-input" value={formState.batch_name || ""} onChange={(event) => setFormState({ ...formState, batch_name: event.target.value })} /></FormField>
            <FormField label="Track name"><input className="field-input" value={formState.track_name || ""} onChange={(event) => setFormState({ ...formState, track_name: event.target.value })} /></FormField>
            <FormField label="Client"><input className="field-input" value={formState.client_name || ""} onChange={(event) => setFormState({ ...formState, client_name: event.target.value })} /></FormField>
            <FormField label="Extra work"><textarea className="field-input field-textarea compact-textarea" value={formState.extra_work || ""} onChange={(event) => setFormState({ ...formState, extra_work: event.target.value })} /></FormField>
            <FormField label="Challenges"><textarea className="field-input field-textarea compact-textarea" value={formState.challenges || ""} onChange={(event) => setFormState({ ...formState, challenges: event.target.value })} /></FormField>
            <FormField label="Proof of work"><textarea className="field-input field-textarea compact-textarea" value={formState.proof_of_work || ""} onChange={(event) => setFormState({ ...formState, proof_of_work: event.target.value })} /></FormField>
            {isPastDate ? <FormField label="Reason"><textarea className="field-input field-textarea compact-textarea" value={formState.request_reason || ""} onChange={(event) => setFormState({ ...formState, request_reason: event.target.value })} /></FormField> : null}
          </div>
        </div>
        <div className="modal-actions">
          <button className="primary-button" disabled={working} onClick={onSave}>{working ? "Saving..." : isPastDate ? "Submit for approval" : "Save changes"}</button>
        </div>
      </div>
    </div>
  );
}

function ReportPreviewModal({ report, onClose }) {
  if (!report) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-xl" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <div>
            <strong>Weekly report</strong>
            <span>{report.week_start} to {report.week_end}</span>
          </div>
          <div className="action-row">
            {report.download_url ? <a className="secondary-link" href={report.download_url}>Download PDF</a> : null}
            <button className="secondary-button" onClick={onClose}>Close</button>
          </div>
        </div>
        <div className="modal-body">
          <div className="report-editor-stack">
            <div className="report-template-block">
              <div className="report-template-title"><strong>Executive summary</strong></div>
              <div>{report.executive_summary || report.team_summary || "-"}</div>
            </div>
            <div className="report-template-block">
              <div className="report-template-title"><strong>Overall challenges</strong></div>
              <div>{report.overall_challenges || "-"}</div>
            </div>
            <div className="report-template-block">
              <div className="report-template-title"><strong>Bottleneck risk</strong></div>
              <div>{report.bottleneck_risk || "-"}</div>
            </div>
            <div className="report-template-block">
              <div className="report-template-title"><strong>Next week plan</strong></div>
              <div>{report.overall_next_week_plan || report.delivery_assessment_plan || "-"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MemberApp({ session, pushToast, view, setView, onMenuToggle, taskFocusId, clearTaskFocus }) {
  const safeUser = session?.user || {};
  const now = useClock();
  const [data, setData] = useState(() => readMemberCache());
  const [loading, setLoading] = useState(() => !readMemberCache());
  const [working, setWorking] = useState(false);
  const [formState, setFormState] = useState(null);
  const [passwordForm, setPasswordForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [todoFilters, setTodoFilters] = useState({ deadline_from: "", deadline_to: "", completion: "" });
  const [todoForm, setTodoForm] = useState({ id: "", title: "", details: "", deadline: "", status: "pending" });
  const [historyFilters, setHistoryFilters] = useState({ type: "all", from_date: "", to_date: "" });
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [taskForm, setTaskForm] = useState({ title: "", description: "", eta: "", remarks: "", status: "todo", message: "", proof: "" });
  const [historyEditItem, setHistoryEditItem] = useState(null);
  const [historyEditForm, setHistoryEditForm] = useState(blankWorkspaceForm(""));

  const persistWorkspaceDefaults = (nextForm) => {
    const cookieValue = encodeURIComponent(JSON.stringify({
      client_name: nextForm.client_name || "",
      delivery_mode: nextForm.delivery_mode || "",
      batch_name: nextForm.batch_name || "",
      track_name: nextForm.track_name || "",
    }));
    document.cookie = `member_workspace_defaults=${cookieValue}; path=/; max-age=${60 * 60 * 24 * 90}; samesite=lax`;
  };

  const readWorkspaceDefaults = () => {
    const match = document.cookie.split("; ").find((item) => item.startsWith("member_workspace_defaults="));
    if (!match) return {};
    try {
      return JSON.parse(decodeURIComponent(match.split("=")[1] || ""));
    } catch {
      return {};
    }
  };

  const load = async (params = {}, options = {}) => {
    if (!options.silent || !data) setLoading(true);
    try {
      const search = new URLSearchParams();
      if (params.edit_date) search.set("edit_date", params.edit_date);
      if (params.request_date) search.set("request_date", params.request_date);
      search.set("section", params.section || view || "dashboard");
      const payload = normalizeMemberData(await apiFetch(`/api/member/dashboard?${search.toString()}`));
      setData(payload);
      writeMemberCache(payload);
      const cookieDefaults = readWorkspaceDefaults();
      setFormState({ ...cookieDefaults, ...(payload.form_data || {}), date: payload.form_data?.date || payload.today });
      if (taskFocusId) {
        setSelectedTaskId(taskFocusId);
        clearTaskFocus();
      }
    } catch (error) {
      pushToast("error", "Dashboard error", error.message);
    } finally {
      if (!options.silent || !data) setLoading(false);
    }
  };

  useEffect(() => { load({ section: view || "dashboard" }); }, []);
  useEffect(() => {
    if (data) load({ section: view || "dashboard" }, { silent: true });
  }, [view]);
  useEffect(() => { if (taskFocusId) setSelectedTaskId(taskFocusId); }, [taskFocusId]);

  const selectedTask = data?.assigned_tasks?.find((item) => item.id === selectedTaskId) || null;
  useEffect(() => {
    if (selectedTask) setTaskForm({ title: selectedTask.title || "", description: selectedTask.description || "", eta: selectedTask.eta || "", remarks: selectedTask.remarks || "", status: selectedTask.status || "todo", message: "", proof: "" });
  }, [selectedTaskId, selectedTask?.updated_at]);

  const refreshNotifications = async () => {
    const payload = await apiFetch("/api/notifications");
    setData((current) => current ? { ...current, notifications: payload.items, unread_notifications: payload.unread_count } : current);
  };

  const loadTodos = async () => {
    const params = new URLSearchParams();
    if (todoFilters.deadline_from) params.set("deadline_from", todoFilters.deadline_from);
    if (todoFilters.deadline_to) params.set("deadline_to", todoFilters.deadline_to);
    if (todoFilters.completion) params.set("completion", todoFilters.completion);
    const payload = await apiFetch(`/api/member/todos?${params.toString()}`);
    setData((current) => current ? { ...current, todos: payload.items } : current);
  };

  const handleNotificationOpen = async (item) => {
    try { await apiFetch(`/api/notifications/${item.id}/read`, { method: "POST" }); } catch {}
    if (item.meta?.task_id) setSelectedTaskId(item.meta.task_id);
    setView(item.link?.includes("tasks") ? "tasks" : item.link?.includes("requests") ? "workspace" : "dashboard");
    await refreshNotifications();
  };

  const handleWorkspaceDateChange = async (nextDate) => {
    if (!nextDate) {
      setFormState((current) => ({ ...(current || blankWorkspaceForm(dashboardData.today)), date: nextDate }));
      return;
    }
    setWorking(true);
    try {
      const result = await apiFetch(`/api/member/daily-update-status?target_date=${encodeURIComponent(nextDate)}`);
      if (result.status === "future_invalid") {
        window.alert(result.message);
        return;
      }
      if (result.status === "pending_request") {
        window.alert("Request already pending for this date.");
        return;
      }
      if (result.status === "existing_update_today" || result.status === "existing_update_past") {
        const confirmed = window.confirm("This day already has updates. Do you want to edit them?");
        if (!confirmed) {
          return;
        }
        setData((current) => current ? {
          ...current,
          is_editing: true,
          is_requesting_missing_day: false,
          form_data: result.form_data,
        } : current);
        setFormState({ ...(result.form_data || blankWorkspaceForm(nextDate)), date: nextDate, request_reason: "" });
        return;
      }
      if (result.status === "request_required") {
        window.alert("For changing the date you need to raise a request to the admin.");
        setData((current) => current ? {
          ...current,
          is_editing: false,
          is_requesting_missing_day: true,
          form_data: result.form_data,
        } : current);
        setFormState({ ...(result.form_data || blankWorkspaceForm(nextDate)), date: nextDate });
        return;
      }
      setData((current) => current ? {
        ...current,
        is_editing: false,
        is_requesting_missing_day: false,
        form_data: result.form_data,
      } : current);
      setFormState({ ...(result.form_data || blankWorkspaceForm(nextDate)), date: nextDate });
    } catch (error) {
      pushToast("error", "Date check failed", error.message);
    } finally {
      setWorking(false);
    }
  };

  if (loading && !data) return <div className="loading-inline">Loading...</div>;
  const dashboardData = normalizeMemberData(data);
  const filteredHistoryUpdates = useMemo(() => dashboardData.recent_updates.filter((item) => {
    if (historyFilters.type !== "all" && historyFilters.type !== "updates") return false;
    if (historyFilters.from_date && item.date < historyFilters.from_date) return false;
    if (historyFilters.to_date && item.date > historyFilters.to_date) return false;
    return true;
  }), [dashboardData.recent_updates, historyFilters]);
  const filteredHistoryRequests = useMemo(() => dashboardData.request_history.filter((item) => {
    if (historyFilters.type !== "all" && historyFilters.type !== "requests") return false;
    if (historyFilters.from_date && item.date < historyFilters.from_date) return false;
    if (historyFilters.to_date && item.date > historyFilters.to_date) return false;
    return true;
  }), [dashboardData.request_history, historyFilters]);

  const stats = [
    { icon: Bell, label: "Pending requests", value: dashboardData.pending_requests.length, note: "Awaiting TL review" },
    { icon: FileSpreadsheet, label: "Total entries", value: dashboardData.total_entries, note: "Submitted updates" },
    { icon: ShieldAlert, label: "Missed days", value: dashboardData.missing_day_count, note: `${dashboardData.missed_days_from || "-"} to ${dashboardData.missed_days_to || "-"}` },
  ];

  let content = null;
  if (view === "dashboard") {
    content = <DashboardPage title="Dashboard" copy="Current time, calendar, entry trend, and overdue work in one simple view." now={now} stats={stats} trend={dashboardData.entry_trend} overdueCards={[
      <OverdueCard key="todo" title="Overdue todo" items={dashboardData.overdue_todos} emptyCopy="No overdue personal todo items." onOpen={() => setView("todo")} dateKey="deadline" />,
      <OverdueCard key="tasks" title="Overdue assigned tasks" items={dashboardData.overdue_tasks} emptyCopy="No overdue assigned tasks." onOpen={(item) => { setSelectedTaskId(item.id); setView("tasks"); }} dateKey="eta" />,
    ]} infoCards={[
      { title: "Request status", copy: dashboardData.pending_requests.length ? `${dashboardData.pending_requests.length} request(s) are still pending.` : "No pending requests right now." },
      { title: "Missed day tracking", copy: dashboardData.missing_day_count ? `${dashboardData.missing_day_count} day(s) still need backfill or leave handling.` : "No unresolved missed-day gaps." },
      { title: "Assigned tasks", copy: dashboardData.assigned_tasks.length ? `${dashboardData.assigned_tasks.length} assigned task(s) are visible in your task board.` : "No assigned tasks at the moment." },
    ]} />;
  } else if (view === "workspace") {
    content = <div className="page-stack">
      <WorkspaceForm data={dashboardData} formState={formState} setFormState={setFormState} working={working} onDateChange={handleWorkspaceDateChange} onReset={async () => {
        setData((current) => current ? { ...current, is_editing: false, is_requesting_missing_day: false } : current);
        setFormState(blankWorkspaceForm(dashboardData.today));
        await load({ section: "workspace" }, { silent: true });
      }} onSubmit={async () => {
      setWorking(true);
      try {
        persistWorkspaceDefaults(formState);
        const result = await apiFetch("/api/member/daily-update", { method: "POST", body: JSON.stringify({ entry_date: formState.date, plan: formState.plan, extra_work: formState.extra_work, challenges: formState.challenges, eta: formState.eta, delivery_mode: formState.delivery_mode, batch_name: formState.batch_name, track_name: formState.track_name, proof_of_work: formState.proof_of_work, client_name: formState.client_name, request_reason: formState.request_reason, is_corporate: !!formState.is_corporate, is_university: !!formState.is_university }) });
        pushToast("success", "Saved", result.message);
        if (result.next?.edit_date) await load({ edit_date: result.next.edit_date, section: "workspace" }, { silent: true });
        else if (result.next?.view === "workspace") { await load({ section: "workspace" }, { silent: true }); }
        else { setView("history"); await load({ section: "history" }, { silent: true }); }
      } catch (error) { pushToast("error", "Save failed", error.message); } finally { setWorking(false); }
      }} />
      <SectionCard icon={ShieldAlert} title="Date-aware request status" copy="Changing the date from today automatically switches this form into approval-request mode when needed.">
        {dashboardData.pending_requests.length ? <div className="subtle-list">{dashboardData.pending_requests.slice(0, 6).map((item) => <span key={item.id} className="subtle-pill">{item.date} - {prettifyStatus(item.request_type)} pending</span>)}</div> : <div className="empty-box compact-empty">No pending date-change requests.</div>}
      </SectionCard>
      <SectionCard icon={FileSpreadsheet} title="Recent daily updates" copy="Your latest daily updates are shown here with pagination." tag={`${dashboardData.recent_updates.length} records`}>
        <DataTable emptyMessage="No daily updates yet." rows={dashboardData.recent_updates} pageSize={7} columns={[
          { key: "date", label: "Date", render: (item) => item.date },
          { key: "plan", label: "Morning plan", render: (item) => item.plan || "-" },
          { key: "eta", label: "ETA", render: (item) => item.eta || "-" },
          { key: "delivery_mode", label: "Delivery", render: (item) => prettifyStatus(item.delivery_mode || "-") },
          { key: "batch_name", label: "Batch", render: (item) => item.batch_name || "-" },
          { key: "track_name", label: "Track", render: (item) => item.track_name || "-" },
          { key: "client", label: "Client", render: (item) => item.client_name || "-" },
          { key: "proof", label: "Proof", render: (item) => item.proof_of_work || "-" },
        ]} />
      </SectionCard>
    </div>;
  } else if (view === "todo") {
    content = <TodoPage items={dashboardData.todos} filters={todoFilters} setFilters={setTodoFilters} form={todoForm} setForm={setTodoForm} onApplyFilter={loadTodos} onSave={async () => {
      setWorking(true);
      try {
        await apiFetch(todoForm.id ? `/api/member/todos/${todoForm.id}` : "/api/member/todos", { method: "POST", body: JSON.stringify(todoForm) });
        pushToast("success", "Todo saved", todoForm.id ? "Todo updated successfully." : "Todo added successfully.");
        setTodoForm({ id: "", title: "", details: "", deadline: "", status: "pending" });
        await load({}, { silent: true });
      } catch (error) { pushToast("error", "Todo save failed", error.message); } finally { setWorking(false); }
    }} working={working} />;
  } else if (view === "tasks") {
    content = <div className="split-panel page-stack-mobile">
      <SectionCard icon={ClipboardList} title="Assigned tasks" copy="Only tasks assigned to you are visible here."><div className="panel-scroll"><DataTable emptyMessage="No tasks assigned right now." rows={dashboardData.assigned_tasks} columns={[
        { key: "title", label: "Title", render: (item) => <strong>{item.title}</strong> },
        { key: "eta", label: "ETA", render: (item) => item.eta || "-" },
        { key: "status", label: "Status", render: (item) => <span className="status-chip status-info">{prettifyStatus(item.status)}</span> },
        { key: "remarks", label: "Remarks", render: (item) => item.remarks || "-" },
        { key: "open", label: "Open", render: (item) => <button className="secondary-button" onClick={() => setSelectedTaskId(item.id)}>Open</button> },
      ]} /></div></SectionCard>
      <TaskPanel task={selectedTask} form={taskForm} setForm={setTaskForm} working={working} onSave={async () => {
        if (!selectedTask) return;
        setWorking(true);
        try { await apiFetch(`/api/tasks/${selectedTask.id}`, { method: "POST", body: JSON.stringify(taskForm) }); pushToast("success", "Task updated", "Your task update has been submitted."); await load({}, { silent: true }); } catch (error) { pushToast("error", "Task update failed", error.message); } finally { setWorking(false); }
      }} />
    </div>;
  } else if (view === "history") {
    content = <div className="page-stack">
      <SectionCard icon={CalendarDays} title="History" copy="Filter across your submitted updates, raised requests, and generated weekly reports.">
        <div className="inline-form-row">
          <FormField label="Record type">
            <select className="field-input" value={historyFilters.type} onChange={(event) => setHistoryFilters({ ...historyFilters, type: event.target.value })}>
              <option value="all">All</option>
              <option value="updates">Daily updates</option>
              <option value="requests">Requests</option>
            </select>
          </FormField>
          <FormField label="From date"><input className="field-input" type="date" value={historyFilters.from_date} onChange={(event) => setHistoryFilters({ ...historyFilters, from_date: event.target.value })} /></FormField>
          <FormField label="To date"><input className="field-input" type="date" value={historyFilters.to_date} onChange={(event) => setHistoryFilters({ ...historyFilters, to_date: event.target.value })} /></FormField>
        </div>
      </SectionCard>
      {(historyFilters.type === "all" || historyFilters.type === "updates") ? <SectionCard icon={FileSpreadsheet} title="Daily updates" copy="Edit submitted daily updates in a modal without leaving this page." tag={`${filteredHistoryUpdates.length} updates`}>
        <DataTable emptyMessage="No daily updates matched the current filter." rows={filteredHistoryUpdates} pageSize={7} columns={[
          { key: "date", label: "Date", render: (item) => item.date },
          { key: "plan", label: "Morning plan", render: (item) => item.plan || "-" },
          { key: "eta", label: "ETA", render: (item) => item.eta || "-" },
          { key: "client", label: "Client", render: (item) => item.client_name || "-" },
          { key: "proof", label: "Proof", render: (item) => item.proof_of_work || "-" },
          { key: "actions", label: "Actions", render: (item) => <button className="secondary-button" onClick={() => { setHistoryEditItem(item); setHistoryEditForm({ ...blankWorkspaceForm(item.date), ...item, request_reason: "" }); }}>Edit</button> },
        ]} />
      </SectionCard> : null}
      {(historyFilters.type === "all" || historyFilters.type === "requests") ? <SectionCard icon={ShieldAlert} title="Requests raised" copy="Track request outcomes and their review status." tag={`${filteredHistoryRequests.length} requests`}>
        <DataTable emptyMessage="No requests matched the current filter." rows={filteredHistoryRequests} pageSize={7} columns={[
          { key: "date", label: "Date", render: (item) => item.date },
          { key: "type", label: "Type", render: (item) => prettifyStatus(item.request_type) },
          { key: "reason", label: "Reason", render: (item) => item.reason || "-" },
          { key: "status", label: "Status", render: (item) => <span className={`status-chip ${item.status === "approved" ? "status-success" : item.status === "rejected" ? "status-danger" : "status-info"}`}>{prettifyStatus(item.status)}</span> },
          { key: "reviewed", label: "Reviewed", render: (item) => item.reviewed_at ? formatDateTime(item.reviewed_at) : "-" },
        ]} />
      </SectionCard> : null}
    </div>;
  } else {
    content = <SectionCard icon={LockKeyhole} title="Password settings" copy="Update your login password from here.">
      <div className="inline-form-row">
        <FormField label="Current password"><input className="field-input" type="password" value={passwordForm.current_password} onChange={(event) => setPasswordForm({ ...passwordForm, current_password: event.target.value })} /></FormField>
        <FormField label="New password"><input className="field-input" type="password" value={passwordForm.new_password} onChange={(event) => setPasswordForm({ ...passwordForm, new_password: event.target.value })} /></FormField>
        <FormField label="Confirm password"><input className="field-input" type="password" value={passwordForm.confirm_password} onChange={(event) => setPasswordForm({ ...passwordForm, confirm_password: event.target.value })} /></FormField>
      </div>
      <div className="action-row"><button className="primary-button" disabled={working} onClick={async () => {
        setWorking(true);
        try { const result = await apiFetch("/api/member/change-password", { method: "POST", body: JSON.stringify(passwordForm) }); pushToast("success", "Password updated", result.message); setPasswordForm({ current_password: "", new_password: "", confirm_password: "" }); } catch (error) { pushToast("error", "Password update failed", error.message); } finally { setWorking(false); }
      }}>Update password</button></div>
    </SectionCard>;
  }

  return (
    <main className="workspace-main">
      <BusyOverlay show={working} label="Saving your update..." />
      <Header title="Member workspace" copy="A clean, single-sidebar workspace for daily updates, todo tracking, requests, and assigned tasks." onMenuToggle={onMenuToggle} notifications={dashboardData.notifications} unreadCount={dashboardData.unread_notifications} onNotificationOpen={handleNotificationOpen} onNotificationRefresh={refreshNotifications} />
      <Hero title={`${safeUser.first_name || "Member"} ${safeUser.last_name || ""}`} copy="Simple views, clear tracking, and fast access to everything that needs action." meta={[{ label: "Pending requests", value: String(dashboardData.pending_requests.length) }, { label: "Missed days", value: String(dashboardData.missing_day_count) }]} />
      {content}
      <HistoryEditModal
        item={historyEditItem}
        formState={historyEditForm}
        setFormState={setHistoryEditForm}
        onClose={() => setHistoryEditItem(null)}
        today={dashboardData.today}
        working={working}
        onSave={async () => {
          if (!historyEditItem) return;
          setWorking(true);
          try {
            const result = await apiFetch("/api/member/daily-update", {
              method: "POST",
              body: JSON.stringify({
                entry_date: historyEditItem.date,
                plan: historyEditForm.plan,
                extra_work: historyEditForm.extra_work,
                challenges: historyEditForm.challenges,
                eta: historyEditForm.eta,
                delivery_mode: historyEditForm.delivery_mode,
                batch_name: historyEditForm.batch_name,
                track_name: historyEditForm.track_name,
                proof_of_work: historyEditForm.proof_of_work,
                client_name: historyEditForm.client_name,
                request_reason: historyEditForm.request_reason,
                is_corporate: !!historyEditForm.is_corporate,
                is_university: !!historyEditForm.is_university,
              }),
            });
            pushToast("success", "Update saved", result.message);
            setHistoryEditItem(null);
            await load({ section: "history" }, { silent: true });
          } catch (error) {
            pushToast("error", "Update failed", error.message);
          } finally {
            setWorking(false);
          }
        }}
      />
    </main>
  );
}
