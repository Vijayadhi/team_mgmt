import { Suspense, lazy, useEffect, useMemo, useState } from "react";
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

const ReportsEditor = lazy(() => import("./admin-reports").then((module) => ({ default: module.ReportsEditor })));
const ReportModal = lazy(() => import("./admin-reports").then((module) => ({ default: module.ReportModal })));
const ADMIN_CACHE_KEY = "admin_dashboard_cache_v1";

function normalizeAdminData(payload = {}) {
  const safePayload = payload && typeof payload === "object" ? payload : {};
  return {
    user: safePayload.user || {},
    team_members: Array.isArray(safePayload.team_members) ? safePayload.team_members : [],
    updates: Array.isArray(safePayload.updates) ? safePayload.updates : [],
    reports: Array.isArray(safePayload.reports) ? safePayload.reports : [],
    total_entries: Number(safePayload.total_entries || 0),
    entry_trend: Array.isArray(safePayload.entry_trend) ? safePayload.entry_trend : [],
    assigned_tasks: Array.isArray(safePayload.assigned_tasks) ? safePayload.assigned_tasks : [],
    open_task_count: Number(safePayload.open_task_count || 0),
    pending_requests: Array.isArray(safePayload.pending_requests) ? safePayload.pending_requests : [],
    missing_days: Array.isArray(safePayload.missing_days) ? safePayload.missing_days : [],
    important_links: Array.isArray(safePayload.important_links) ? safePayload.important_links : [],
    notifications: Array.isArray(safePayload.notifications) ? safePayload.notifications : [],
    unread_notifications: Number(safePayload.unread_notifications || 0),
    missed_days_from: safePayload.missed_days_from || "",
    missed_days_to: safePayload.missed_days_to || "",
    filters: safePayload.filters || { member_name: "", update_date: "", update_types: [] },
    week_start: safePayload.week_start || "",
    week_end: safePayload.week_end || "",
  };
}

function readAdminCache() {
  try {
    const raw = window.sessionStorage.getItem(ADMIN_CACHE_KEY);
    return raw ? normalizeAdminData(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function writeAdminCache(payload) {
  try {
    window.sessionStorage.setItem(ADMIN_CACHE_KEY, JSON.stringify(payload));
  } catch {}
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


export function AdminApp({ session, pushToast, view, setView, onMenuToggle, taskFocusId, clearTaskFocus }) {
  const safeUser = session?.user || {};
  const now = useClock();
  const [data, setData] = useState(() => readAdminCache());
  const [loading, setLoading] = useState(() => !readAdminCache());
  const [working, setWorking] = useState(false);
  const [filters, setFilters] = useState({ member_name: "", update_date: "", update_types: [] });
  const [teamForm, setTeamForm] = useState({ team_name: safeUser.team_name || "" });
  const [missedDaysForm, setMissedDaysForm] = useState({ missed_days_from: "", missed_days_to: "" });
  const [memberForm, setMemberForm] = useState({ first_name: "", last_name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [reportForm, setReportForm] = useState(null);
  const [reportBusy, setReportBusy] = useState(false);
  const [linkForm, setLinkForm] = useState({ title: "", visibility: "all", link_type: "one_drive", link: "", tag: "" });
  const [linkFilters, setLinkFilters] = useState({ added_date: "", title: "", tag: "" });
  const [taskForm, setTaskForm] = useState(emptyTaskForm);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedRequestIds, setSelectedRequestIds] = useState([]);

  const load = async (options = {}) => {
    if (!options.silent || !data) setLoading(true);
    try {
      const payload = normalizeAdminData(await apiFetch("/api/admin/dashboard"));
      setData(payload);
      writeAdminCache(payload);
      setTeamForm({ team_name: payload.user.team_name || "" });
      setMissedDaysForm({ missed_days_from: payload.missed_days_from || "", missed_days_to: payload.missed_days_to || "" });
      if (taskFocusId) {
        setSelectedTaskId(taskFocusId);
        clearTaskFocus();
      }
    } catch (error) { pushToast("error", "Dashboard error", error.message); } finally { if (!options.silent || !data) setLoading(false); }
  };

  useEffect(() => { load(); }, []);
  useEffect(() => { if (taskFocusId) setSelectedTaskId(taskFocusId); }, [taskFocusId]);
  useEffect(() => {
    let timeoutId = 0;
    let idleId = 0;
    const preload = () => import("./admin-reports");
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(preload, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(preload, 300);
    }
    return () => {
      if (idleId && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

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
      setWorking(false);
      load({ silent: true });
      return;
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
  useEffect(() => {
    setSelectedRequestIds((current) => current.filter((id) => dashboardData.pending_requests.some((item) => item.id === id)));
  }, [data]);

  const dashboardData = normalizeAdminData(data);
  const filteredUpdates = useMemo(() => {
    const memberQuery = filters.member_name.trim().toLowerCase();
    return dashboardData.updates.filter((item) => {
      const matchesMember = !memberQuery
        || item.member_name?.toLowerCase().includes(memberQuery)
        || item.email?.toLowerCase().includes(memberQuery);
      const matchesDate = !filters.update_date || item.date === filters.update_date;
      const matchesType = !filters.update_types.length || filters.update_types.includes(item.update_type);
      return matchesMember && matchesDate && matchesType;
    });
  }, [dashboardData.updates, filters]);
  const filteredLinks = useMemo(() => dashboardData.important_links.filter((item) => {
    const matchesDate = !linkFilters.added_date || (item.created_at || "").slice(0, 10) === linkFilters.added_date;
    const titleQuery = linkFilters.title.trim().toLowerCase();
    const tagQuery = linkFilters.tag.trim().toLowerCase();
    const matchesTitle = !titleQuery || item.title?.toLowerCase().includes(titleQuery);
    const matchesTag = !tagQuery || item.tag?.toLowerCase().includes(tagQuery);
    return matchesDate && matchesTitle && matchesTag;
  }), [dashboardData.important_links, linkFilters]);

  const removeMissingDatesFromState = (userId, dates) => {
    if (!userId || !dates?.length) return;
    const dateSet = new Set(dates);
    setData((current) => {
      if (!current) return current;
      const nextPendingRequests = (current.pending_requests || []).filter(
        (item) => !(String(item.user_id || item.member_id) === String(userId) && dateSet.has(item.date) && item.request_type === "missed_day")
      );
      const nextMissingDays = (current.missing_days || [])
        .map((item) => {
          if (String(item.member_id) !== String(userId)) return item;
          const remainingDates = (item.missing_dates || []).filter((value) => !dateSet.has(value));
          return { ...item, missing_dates: remainingDates, missing_count: remainingDates.length };
        })
        .filter((item) => (item.missing_count || 0) > 0);
      const nextTeamMembers = (current.team_members || []).map((item) => {
        if (String(item.id) !== String(userId)) return item;
        const removedCount = (current.missing_days || []).find((row) => String(row.member_id) === String(userId))
          ? Math.min(dates.length, Number(item.missing_day_count || 0))
          : 0;
        return { ...item, missing_day_count: Math.max(0, Number(item.missing_day_count || 0) - removedCount) };
      });
      return { ...current, pending_requests: nextPendingRequests, missing_days: nextMissingDays, team_members: nextTeamMembers };
    });
  };
  const selectedPendingRequests = dashboardData.pending_requests.filter((item) => selectedRequestIds.includes(item.id));
  const allPendingSelected = Boolean(dashboardData.pending_requests.length) && selectedRequestIds.length === dashboardData.pending_requests.length;

  const runBulkRequestAction = async (action) => {
    if (!selectedPendingRequests.length) {
      pushToast("error", "No requests selected", "Select at least one request first.");
      return;
    }
    setWorking(true);
    try {
      for (const item of selectedPendingRequests) {
        await apiFetch(`/api/admin/requests/${item.id}/${action}`, { method: "POST" });
        if (action === "approve" && item.request_type === "missed_day") {
          removeMissingDatesFromState(item.user_id || item.member_id, [item.date]);
        }
      }
      pushToast("success", "Bulk action completed", `${selectedPendingRequests.length} request(s) updated.`);
      setSelectedRequestIds([]);
      setWorking(false);
      load({ silent: true });
      return;
    } catch (error) {
      pushToast("error", "Bulk action failed", error.message);
    } finally {
      setWorking(false);
    }
  };

  if (loading && !data) return <div className="loading-inline">Loading...</div>;

  const stats = [
    { icon: Bell, label: "Pending requests", value: dashboardData.pending_requests.length, note: "Awaiting approval" },
    { icon: FileSpreadsheet, label: "Total entries", value: dashboardData.total_entries, note: "Tracked across the team" },
    { icon: ClipboardList, label: "Open tasks", value: dashboardData.open_task_count, note: "Assigned and still active" },
  ];

  let content = null;
  if (view === "dashboard") {
    content = <DashboardPage title="Team dashboard" copy="Daily visibility for approvals, task flow, and entry activity without clutter." now={now} stats={stats} trend={dashboardData.entry_trend} overdueCards={[
      <OverdueCard key="requests" title="Pending requests" items={dashboardData.pending_requests.slice(0, 5).map((item) => ({ ...item, title: item.member_name, date: item.date }))} emptyCopy="No pending requests right now." onOpen={() => setView("approvals")} dateKey="date" />,
      <OverdueCard key="missing" title="Missing days" items={dashboardData.missing_days.slice(0, 5).map((item) => ({ id: item.member_id, title: item.member_name, date: `${item.missing_count} missed` }))} emptyCopy="No missing day flags in the current window." onOpen={() => setView("compliance")} dateKey="date" />,
    ]} infoCards={[
      { title: "Unread notifications", copy: dashboardData.unread_notifications ? `${dashboardData.unread_notifications} new updates need attention.` : "No unread notifications at the moment." },
      { title: "Reports", copy: dashboardData.reports.length ? `${dashboardData.reports.length} finalized weekly reports are available.` : "No finalized weekly reports yet." },
      { title: "Team coverage", copy: dashboardData.team_members.length ? `${dashboardData.team_members.length} members are mapped under this lead.` : "No team members have been added yet." },
    ]} />;
  } else if (view === "members") {
    content = <SectionCard icon={Users} title="Team members" copy="Account management with visibility into missed updates and active tasks." tag={`${dashboardData.team_members.length} members`}>
      <div className="split-panel">
        <div className="panel-scroll"><DataTable emptyMessage="No team members found." rows={dashboardData.team_members} columns={[
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
      <SectionCard icon={ClipboardList} title="Assigned tasks" copy="Assign work to a member and manage follow-up from a single task table." tag={`${dashboardData.assigned_tasks.length} tasks`}><div className="panel-scroll"><DataTable emptyMessage="No tasks assigned yet." rows={dashboardData.assigned_tasks} columns={[
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
        <TaskPanel task={selectedTask} members={dashboardData.team_members} form={taskForm} setForm={setTaskForm} working={working} onSave={() => run(() => selectedTask ? apiFetch(`/api/tasks/${selectedTask.id}`, { method: "POST", body: JSON.stringify(taskForm) }) : apiFetch("/api/admin/tasks", { method: "POST", body: JSON.stringify(taskForm) }), selectedTask ? "Task updated" : "Task assigned", async () => {
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
      <FormField label="Update type">
        <div className="checkbox-row">
          {[["regular", "Regular"], ["missed_eod", "Missed EOD"], ["missed_day", "Missed day"]].map(([value, label]) => (
            <label key={value} className="checkbox-pill">
              <input
                type="checkbox"
                checked={filters.update_types.includes(value)}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    update_types: event.target.checked
                      ? [...current.update_types, value]
                      : current.update_types.filter((item) => item !== value),
                  }))
                }
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </FormField>
      <div className="action-row"><button className="secondary-button" onClick={() => setFilters({ member_name: "", update_date: "", update_types: [] })}>Clear filter</button></div>
      <div className="panel-scroll"><DataTable emptyMessage="No daily updates matched the current filter." rows={filteredUpdates} columns={[
        { key: "date", label: "Date", render: (item) => item.date },
        { key: "member", label: "Member", render: (item) => <div className="table-cell-stack"><strong>{item.member_name}</strong><span>{item.email}</span></div> },
        { key: "type", label: "Update Type", render: (item) => <span className="status-chip status-info">{prettifyStatus(item.update_type)}</span> },
        { key: "plan", label: "Morning Plan", render: (item) => item.plan || "-" },
        { key: "eta", label: "ETA", render: (item) => item.eta || "-" },
        { key: "delivery_mode", label: "Delivery", render: (item) => prettifyStatus(item.delivery_mode || "-") },
        { key: "batch_name", label: "Batch", render: (item) => item.batch_name || "-" },
        { key: "track_name", label: "Track", render: (item) => item.track_name || "-" },
        { key: "client", label: "Client", render: (item) => item.client_name || "-" },
        { key: "proof", label: "Proof", render: (item) => item.proof_of_work || "-" },
      ]} /></div>
    </SectionCard>;
  } else if (view === "approvals") {
    content = <SectionCard icon={CheckCircle2} title="Pending requests" copy="Review late EOD and missed-day requests before approving them.">
      <div className="action-row">
        <button className="secondary-button" onClick={() => setSelectedRequestIds(allPendingSelected ? [] : dashboardData.pending_requests.map((item) => item.id))}>{allPendingSelected ? "Clear selection" : "Select all"}</button>
        <button className="primary-button" disabled={!selectedRequestIds.length || working} onClick={() => runBulkRequestAction("approve")}>Approve selected</button>
        <button className="danger-button" disabled={!selectedRequestIds.length || working} onClick={() => runBulkRequestAction("reject")}>Reject selected</button>
        <button className="secondary-button" disabled={!selectedRequestIds.length || working} onClick={() => runBulkRequestAction("reset")}>Reset selected</button>
      </div>
      <div className="panel-scroll"><DataTable emptyMessage="No pending approval requests." rows={dashboardData.pending_requests} columns={[
      { key: "select", label: <input type="checkbox" checked={allPendingSelected} onChange={(event) => setSelectedRequestIds(event.target.checked ? dashboardData.pending_requests.map((item) => item.id) : [])} />, render: (item) => <input type="checkbox" checked={selectedRequestIds.includes(item.id)} onChange={(event) => setSelectedRequestIds((current) => event.target.checked ? [...current, item.id] : current.filter((value) => value !== item.id))} /> },
      { key: "date", label: "Date", render: (item) => item.date },
      { key: "member", label: "Member", render: (item) => <div className="table-cell-stack"><strong>{item.member_name}</strong><span>{item.email}</span></div> },
      { key: "type", label: "Request Type", render: (item) => prettifyStatus(item.request_type) },
      { key: "plan", label: "Plan", render: (item) => item.plan || "-" },
      { key: "eta", label: "ETA", render: (item) => item.eta || "-" },
      { key: "delivery_mode", label: "Delivery", render: (item) => prettifyStatus(item.delivery_mode || "-") },
      { key: "batch_name", label: "Batch", render: (item) => item.batch_name || "-" },
      { key: "track_name", label: "Track", render: (item) => item.track_name || "-" },
      { key: "client", label: "Client", render: (item) => item.client_name || "-" },
      { key: "proof", label: "Proof", render: (item) => item.proof_of_work || "-" },
      { key: "reason", label: "Reason", render: (item) => item.reason || "-" },
      { key: "actions", label: "Actions", render: (item) => <div className="action-row"><button className="primary-button" onClick={() => run(() => apiFetch(`/api/admin/requests/${item.id}/approve`, { method: "POST" }), "Request approved", async () => {
        if (item.request_type === "missed_day") removeMissingDatesFromState(item.user_id || item.member_id, [item.date]);
      })}>Approve</button><button className="danger-button" onClick={() => run(() => apiFetch(`/api/admin/requests/${item.id}/reject`, { method: "POST" }), "Request rejected")}>Reject</button><button className="secondary-button" onClick={() => run(() => apiFetch(`/api/admin/requests/${item.id}/reset`, { method: "POST" }), "Request reset")}>Reset</button></div> },
    ]} /></div></SectionCard>;
  } else if (view === "compliance") {
    content = <SectionCard icon={ShieldAlert} title="Missing day tracker" copy={`Track unresolved gaps from ${dashboardData.missed_days_from || "-"} to ${dashboardData.missed_days_to || "-"}.`} tag={`${dashboardData.missing_days.length} members`}><div className="panel-scroll"><DataTable emptyMessage="No missing-day records in the active window." rows={dashboardData.missing_days} columns={[
      { key: "member", label: "Member", render: (item) => <div className="table-cell-stack"><strong>{item.member_name}</strong><span>{item.email}</span></div> },
      { key: "missed_count", label: "Missed Count", render: (item) => item.missing_count || 0 },
      { key: "missing_dates", label: "Missing Dates", render: (item) => item.missing_dates?.length ? item.missing_dates.join(", ") : "-" },
      { key: "actions", label: "Actions", render: (item) => <div className="action-row"><button className="secondary-button" onClick={() => run(() => apiFetch("/api/admin/missing-days/leave", { method: "POST", body: JSON.stringify({ user_id: item.member_id, missing_dates: item.missing_dates, reason: "Marked as leave by TL" }) }), "Leave marked", async () => removeMissingDatesFromState(item.member_id, item.missing_dates || []))}>Mark leave</button><button className="danger-button" onClick={() => run(() => apiFetch("/api/admin/missing-days/warning", { method: "POST", body: JSON.stringify({ user_id: item.member_id, missing_dates: item.missing_dates }) }), "Warning sent")}>Raise warning</button></div> },
    ]} /></div></SectionCard>;
  } else if (view === "reports") {
    content = <div className="page-stack">
      <SectionCard icon={FileSpreadsheet} title="Generate weekly report" copy="Create a fresh weekly summary before editing and finalizing it."><div className="inline-form-row"><FormField label="Week start"><input className="field-input" type="date" value={dashboardData.week_start} onChange={(event) => setData({ ...dashboardData, week_start: event.target.value })} /></FormField><FormField label="Week end"><input className="field-input" type="date" value={dashboardData.week_end} onChange={(event) => setData({ ...dashboardData, week_end: event.target.value })} /></FormField></div><div className="action-row"><button className="primary-button" disabled={working} onClick={() => run(() => apiFetch("/api/admin/reports/generate", { method: "POST", body: JSON.stringify({ week_start: dashboardData.week_start, week_end: dashboardData.week_end }) }), "Weekly report generated", async (result) => openReport(result.report_id))}>{working ? "Generating..." : "Generate report"}</button></div></SectionCard>
      <Suspense fallback={<div className="loading-inline">Loading reports...</div>}>
        <ReportsEditor reportTitle={`${dashboardData.user?.team_name || "Team"} Weekly report`} reports={dashboardData.reports} onOpen={openReport} onDelete={(reportId) => run(() => apiFetch(`/api/admin/reports/${reportId}/delete`, { method: "POST" }), "Report deleted", async () => {
          if (reportForm?.id === reportId) setReportForm(null);
        })} icon={FileSpreadsheet} />
        <ReportModal reportForm={reportForm} setReportForm={setReportForm} onClose={() => setReportForm(null)} reportBusy={reportBusy} onSave={async () => {
          setReportBusy(true);
          try { const result = await apiFetch(`/api/admin/reports/${reportForm.id}/save`, { method: "POST", body: JSON.stringify(reportForm) }); pushToast("success", "Report finalized", result.message); await load({ silent: true }); window.open(result.download_url, "_blank", "noopener,noreferrer"); } catch (error) { pushToast("error", "Save failed", error.message); } finally { setReportBusy(false); }
        }} />
      </Suspense>
    </div>;
  } else if (view === "links") {
    content = <div className="page-stack">
      <SectionCard icon={FileSpreadsheet} title="Add important link" copy="Store team-useful links with a clear title, type, and tag.">
        <div className="form-grid">
          <FormField label="Title"><input className="field-input" value={linkForm.title} onChange={(event) => setLinkForm({ ...linkForm, title: event.target.value })} /></FormField>
          <FormField label="Visibility">
            <select className="field-input" value={linkForm.visibility} onChange={(event) => setLinkForm({ ...linkForm, visibility: event.target.value })}>
              <option value="all">All</option>
              <option value="private">Private</option>
            </select>
          </FormField>
          <FormField label="Link type">
            <select className="field-input" value={linkForm.link_type} onChange={(event) => setLinkForm({ ...linkForm, link_type: event.target.value })}>
              <option value="one_drive">One Drive</option>
              <option value="other">Other</option>
            </select>
          </FormField>
          <FormField label="Link"><input className="field-input" value={linkForm.link} onChange={(event) => setLinkForm({ ...linkForm, link: event.target.value })} /></FormField>
          <FormField label="Tag"><input className="field-input" value={linkForm.tag} onChange={(event) => setLinkForm({ ...linkForm, tag: event.target.value })} /></FormField>
        </div>
        <div className="action-row">
          <button className="primary-button" disabled={working} onClick={() => run(() => apiFetch("/api/important-links", { method: "POST", body: JSON.stringify(linkForm) }), "Link saved", async () => setLinkForm({ title: "", visibility: "all", link_type: "one_drive", link: "", tag: "" }))}>Save link</button>
        </div>
      </SectionCard>
      <SectionCard icon={FileSpreadsheet} title="Important links" copy="Filter the stored links by date, title, or tag." tag={`${dashboardData.important_links.length} links`}>
        <div className="inline-form-row">
          <FormField label="Date added"><input className="field-input" type="date" value={linkFilters.added_date} onChange={(event) => setLinkFilters({ ...linkFilters, added_date: event.target.value })} /></FormField>
          <FormField label="Title"><input className="field-input" value={linkFilters.title} onChange={(event) => setLinkFilters({ ...linkFilters, title: event.target.value })} /></FormField>
          <FormField label="Tag"><input className="field-input" value={linkFilters.tag} onChange={(event) => setLinkFilters({ ...linkFilters, tag: event.target.value })} /></FormField>
        </div>
        <div className="action-row"><button className="secondary-button" onClick={() => setLinkFilters({ added_date: "", title: "", tag: "" })}>Clear filter</button></div>
        <DataTable emptyMessage="No important links matched the current filter." rows={filteredLinks} pageSize={7} columns={[
          { key: "created_at", label: "Date Added", render: (item) => formatDateTime(item.created_at) },
          { key: "title", label: "Title", render: (item) => item.title || "-" },
          { key: "visibility", label: "Visibility", render: (item) => prettifyStatus(item.visibility || "all") },
          { key: "link_type", label: "Type", render: (item) => prettifyStatus(item.link_type || "-") },
          { key: "tag", label: "Tag", render: (item) => item.tag || "-" },
          { key: "link", label: "Link", render: (item) => <a className="secondary-link" href={item.link} target="_blank" rel="noreferrer">Open</a> },
          { key: "actions", label: "Actions", render: (item) => <button className="danger-button" onClick={() => run(() => apiFetch(`/api/important-links/${item.id}/delete`, { method: "POST" }), "Link deleted")}>Delete</button> },
        ]} />
      </SectionCard>
    </div>;
  } else {
    content = <div className="page-stack">
      <SectionCard icon={Users} title="Team identity" copy="Control the team name displayed throughout the workspace."><FormField label="Team name"><input className="field-input" value={teamForm.team_name} onChange={(event) => setTeamForm({ team_name: event.target.value })} /></FormField><div className="action-row"><button className="primary-button" disabled={working} onClick={() => run(() => apiFetch("/api/admin/team-name", { method: "POST", body: JSON.stringify(teamForm) }), "Team updated")}>Update team name</button></div></SectionCard>
      <SectionCard icon={ShieldAlert} title="Missed days date range" copy="Set the exact date window used for member missed-day counts and admin compliance tracking."><div className="inline-form-row"><FormField label="From date"><input className="field-input" type="date" value={missedDaysForm.missed_days_from} onChange={(event) => setMissedDaysForm({ ...missedDaysForm, missed_days_from: event.target.value })} /></FormField><FormField label="To date"><input className="field-input" type="date" value={missedDaysForm.missed_days_to} onChange={(event) => setMissedDaysForm({ ...missedDaysForm, missed_days_to: event.target.value })} /></FormField></div><div className="action-row"><button className="primary-button" disabled={working} onClick={() => run(() => apiFetch("/api/admin/missed-days-range", { method: "POST", body: JSON.stringify(missedDaysForm) }), "Missed days window updated", async (result) => setMissedDaysForm({ missed_days_from: result.missed_days_from || "", missed_days_to: result.missed_days_to || "" }))}>Update range</button></div></SectionCard>
      <SectionCard icon={LockKeyhole} title="Lead password" copy="Keep the lead account secure."><div className="inline-form-row"><FormField label="Current password"><input className="field-input" type="password" value={passwordForm.current_password} onChange={(event) => setPasswordForm({ ...passwordForm, current_password: event.target.value })} /></FormField><FormField label="New password"><input className="field-input" type="password" value={passwordForm.new_password} onChange={(event) => setPasswordForm({ ...passwordForm, new_password: event.target.value })} /></FormField><FormField label="Confirm password"><input className="field-input" type="password" value={passwordForm.confirm_password} onChange={(event) => setPasswordForm({ ...passwordForm, confirm_password: event.target.value })} /></FormField></div><div className="action-row"><button className="primary-button" disabled={working} onClick={() => run(() => apiFetch("/api/admin/change-password", { method: "POST", body: JSON.stringify(passwordForm) }), "Password updated", async () => setPasswordForm({ current_password: "", new_password: "", confirm_password: "" }))}>Update password</button></div></SectionCard>
    </div>;
  }

  return (
    <main className="workspace-main">
      <BusyOverlay show={working} label="Processing..." />
      <BusyOverlay show={reportBusy} label="Finalizing report..." />
      <Header title="Admin workspace" copy="A focused lead console for people, compliance, tasks, and reporting." onMenuToggle={onMenuToggle} notifications={dashboardData.notifications} unreadCount={dashboardData.unread_notifications} onNotificationOpen={handleNotificationOpen} onNotificationRefresh={refreshNotifications} />
      <Hero title={`${safeUser.first_name || "Lead"} ${safeUser.last_name || ""}`} copy="Run the team from a single dashboard with clean, operational views." meta={[{ label: "Team", value: safeUser.team_name || "Team Daily Tracker" }, { label: "Email", value: safeUser.email || "-" }]} />
      {content}
    </main>
  );
}
