import { useEffect, useState } from "react";
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

function WorkspaceForm({ data, formState, setFormState, working, onSubmit, onReset }) {
  return (
    <SectionCard
      icon={FolderClock}
      title={data.is_requesting_missing_day ? "Missed day request" : data.is_editing ? "End-of-day update" : "Morning entry"}
      copy="The form only shows the fields required for the current stage."
      tag={formState.date}
    >
      {data.is_editing ? <div className="summary-box"><strong>Morning entry summary</strong><p>Plan: {formState.plan || "-"}</p><p>ETA: {formState.eta || "-"}</p><p>Client: {formState.client_name || "-"}</p></div> : null}
      <div className="form-grid">
        {!data.is_editing ? (
          <>
            <FormField label="Date"><input className="field-input" type="date" value={formState.date} onChange={(event) => setFormState({ ...formState, date: event.target.value })} /></FormField>
            <FormField label="Morning plan"><textarea className="field-input field-textarea" value={formState.plan} onChange={(event) => setFormState({ ...formState, plan: event.target.value })} /></FormField>
            <FormField label="ETA"><input className="field-input" value={formState.eta} onChange={(event) => setFormState({ ...formState, eta: event.target.value })} /></FormField>
            <FormField label="Client"><input className="field-input" value={formState.client_name} onChange={(event) => setFormState({ ...formState, client_name: event.target.value })} /></FormField>
            <FormField label="Category">
              <div className="checkbox-row">
                <label className="checkbox-pill"><input type="checkbox" checked={!!formState.is_corporate} onChange={(event) => setFormState({ ...formState, is_corporate: event.target.checked })} /><span>Corporate</span></label>
                <label className="checkbox-pill"><input type="checkbox" checked={!!formState.is_university} onChange={(event) => setFormState({ ...formState, is_university: event.target.checked })} /><span>University</span></label>
              </div>
            </FormField>
          </>
        ) : null}
        {(data.is_editing || data.is_requesting_missing_day) ? (
          <>
            <FormField label="Extra work"><textarea className="field-input field-textarea" value={formState.extra_work} onChange={(event) => setFormState({ ...formState, extra_work: event.target.value })} /></FormField>
            <FormField label="Challenges"><textarea className="field-input field-textarea" value={formState.challenges} onChange={(event) => setFormState({ ...formState, challenges: event.target.value })} /></FormField>
            <FormField label="Proof of work"><textarea className="field-input field-textarea" value={formState.proof_of_work} onChange={(event) => setFormState({ ...formState, proof_of_work: event.target.value })} /></FormField>
          </>
        ) : null}
        {(data.is_requesting_missing_day || (data.is_editing && formState.date < data.today)) ? (
          <FormField label="Reason for late submission"><textarea className="field-input field-textarea" value={formState.request_reason} onChange={(event) => setFormState({ ...formState, request_reason: event.target.value })} /></FormField>
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

export function MemberApp({ session, pushToast, view, setView, onMenuToggle, taskFocusId, clearTaskFocus }) {
  const now = useClock();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [requestDate, setRequestDate] = useState("");
  const [formState, setFormState] = useState(null);
  const [passwordForm, setPasswordForm] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [todoFilters, setTodoFilters] = useState({ deadline_from: "", deadline_to: "", completion: "" });
  const [todoForm, setTodoForm] = useState({ id: "", title: "", details: "", deadline: "", status: "pending" });
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [taskForm, setTaskForm] = useState({ title: "", description: "", eta: "", remarks: "", status: "todo", message: "", proof: "" });

  const load = async (params = {}) => {
    setLoading(true);
    try {
      const search = new URLSearchParams();
      if (params.edit_date) search.set("edit_date", params.edit_date);
      if (params.request_date) search.set("request_date", params.request_date);
      const payload = await apiFetch(`/api/member/dashboard?${search.toString()}`);
      setData(payload);
      setFormState({ ...(payload.form_data || {}), date: payload.form_data?.date || payload.today });
      if (taskFocusId) {
        setSelectedTaskId(taskFocusId);
        clearTaskFocus();
      }
    } catch (error) {
      pushToast("error", "Dashboard error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);
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
    setView(item.link?.includes("tasks") ? "tasks" : item.link?.includes("requests") ? "requests" : "dashboard");
    await refreshNotifications();
  };

  if (loading && !data) return <div className="loading-inline">Loading...</div>;

  const stats = [
    { icon: Bell, label: "Pending requests", value: data.pending_requests.length, note: "Awaiting TL review" },
    { icon: FileSpreadsheet, label: "Total entries", value: data.total_entries, note: "Submitted updates" },
    { icon: ShieldAlert, label: "Missed days", value: data.missing_day_count, note: "Last 30 workdays" },
  ];

  let content = null;
  if (view === "dashboard") {
    content = <DashboardPage title="Dashboard" copy="Current time, calendar, entry trend, and overdue work in one simple view." now={now} stats={stats} trend={data.entry_trend} overdueCards={[
      <OverdueCard key="todo" title="Overdue todo" items={data.overdue_todos || []} emptyCopy="No overdue personal todo items." onOpen={() => setView("todo")} dateKey="deadline" />,
      <OverdueCard key="tasks" title="Overdue assigned tasks" items={data.overdue_tasks || []} emptyCopy="No overdue assigned tasks." onOpen={(item) => { setSelectedTaskId(item.id); setView("tasks"); }} dateKey="eta" />,
    ]} infoCards={[
      { title: "Request status", copy: data.pending_requests.length ? `${data.pending_requests.length} request(s) are still pending.` : "No pending requests right now." },
      { title: "Missed day tracking", copy: data.missing_day_count ? `${data.missing_day_count} day(s) still need backfill or leave handling.` : "No unresolved missed-day gaps." },
      { title: "Assigned tasks", copy: data.assigned_tasks.length ? `${data.assigned_tasks.length} assigned task(s) are visible in your task board.` : "No assigned tasks at the moment." },
    ]} />;
  } else if (view === "workspace") {
    content = <WorkspaceForm data={data} formState={formState} setFormState={setFormState} working={working} onReset={async () => { setView("workspace"); await load(); }} onSubmit={async () => {
      setWorking(true);
      try {
        const result = await apiFetch("/api/member/daily-update", { method: "POST", body: JSON.stringify({ entry_date: formState.date, plan: formState.plan, extra_work: formState.extra_work, challenges: formState.challenges, eta: formState.eta, proof_of_work: formState.proof_of_work, client_name: formState.client_name, request_reason: formState.request_reason, is_corporate: !!formState.is_corporate, is_university: !!formState.is_university }) });
        pushToast("success", "Saved", result.message);
        if (result.next?.edit_date) await load({ edit_date: result.next.edit_date });
        else if (result.next?.view === "requests") { setView("requests"); await load(); }
        else { setView("history"); await load(); }
      } catch (error) { pushToast("error", "Save failed", error.message); } finally { setWorking(false); }
    }} />;
  } else if (view === "todo") {
    content = <TodoPage items={data.todos || []} filters={todoFilters} setFilters={setTodoFilters} form={todoForm} setForm={setTodoForm} onApplyFilter={loadTodos} onSave={async () => {
      setWorking(true);
      try {
        await apiFetch(todoForm.id ? `/api/member/todos/${todoForm.id}` : "/api/member/todos", { method: "POST", body: JSON.stringify(todoForm) });
        pushToast("success", "Todo saved", todoForm.id ? "Todo updated successfully." : "Todo added successfully.");
        setTodoForm({ id: "", title: "", details: "", deadline: "", status: "pending" });
        await load();
      } catch (error) { pushToast("error", "Todo save failed", error.message); } finally { setWorking(false); }
    }} working={working} />;
  } else if (view === "tasks") {
    content = <div className="split-panel page-stack-mobile">
      <SectionCard icon={ClipboardList} title="Assigned tasks" copy="Only tasks assigned to you are visible here."><div className="panel-scroll"><DataTable emptyMessage="No tasks assigned right now." rows={data.assigned_tasks} columns={[
        { key: "title", label: "Title", render: (item) => <strong>{item.title}</strong> },
        { key: "eta", label: "ETA", render: (item) => item.eta || "-" },
        { key: "status", label: "Status", render: (item) => <span className="status-chip status-info">{prettifyStatus(item.status)}</span> },
        { key: "remarks", label: "Remarks", render: (item) => item.remarks || "-" },
        { key: "open", label: "Open", render: (item) => <button className="secondary-button" onClick={() => setSelectedTaskId(item.id)}>Open</button> },
      ]} /></div></SectionCard>
      <TaskPanel task={selectedTask} form={taskForm} setForm={setTaskForm} working={working} onSave={async () => {
        if (!selectedTask) return;
        setWorking(true);
        try { await apiFetch(`/api/tasks/${selectedTask.id}`, { method: "POST", body: JSON.stringify(taskForm) }); pushToast("success", "Task updated", "Your task update has been submitted."); await load(); } catch (error) { pushToast("error", "Task update failed", error.message); } finally { setWorking(false); }
      }} />
    </div>;
  } else if (view === "history") {
    content = <SectionCard icon={CalendarDays} title="History" copy="Recent entries with direct access to edit mode." tag={`${data.recent_updates.length} recent`}><DataTable emptyMessage="No entries yet. Start with a morning update." rows={data.recent_updates} columns={[
      { key: "date", label: "Date", render: (item) => item.date },
      { key: "plan", label: "Morning plan", render: (item) => item.plan || "-" },
      { key: "eta", label: "ETA", render: (item) => item.eta || "-" },
      { key: "client", label: "Client", render: (item) => item.client_name || "-" },
      { key: "proof", label: "Proof", render: (item) => item.proof_of_work || "-" },
      { key: "actions", label: "Actions", render: (item) => <button className="secondary-button" onClick={async () => { setView("workspace"); await load({ edit_date: item.date }); }}>Edit</button> },
    ]} /></SectionCard>;
  } else if (view === "requests") {
    content = <div className="page-stack">
      <SectionCard icon={ShieldAlert} title="Raise missed-day request" copy="Use this only when a full earlier workday was not entered at all." tag={`${data.missing_day_count} missed days`}>
        <div className="inline-form-row"><FormField label="Missing date"><input className="field-input" type="date" value={requestDate} onChange={(event) => setRequestDate(event.target.value)} /></FormField></div>
        <div className="action-row"><button className="primary-button" onClick={async () => {
          if (!requestDate) { pushToast("error", "Date required", "Choose the missed date first."); return; }
          setView("workspace");
          await load({ request_date: requestDate });
        }}>Open request form</button></div>
        {data.missing_dates?.length ? <div className="subtle-list">{data.missing_dates.slice(0, 12).map((item) => <span key={item} className="subtle-pill">{item}</span>)}</div> : null}
      </SectionCard>
      <SectionCard icon={Bell} title="Request history" copy="Past approvals and rejections remain visible here."><div className="panel-scroll"><DataTable emptyMessage="No requests have been submitted yet." rows={data.request_history} columns={[
        { key: "date", label: "Date", render: (item) => item.date },
        { key: "type", label: "Type", render: (item) => prettifyStatus(item.request_type) },
        { key: "reason", label: "Reason", render: (item) => item.reason || "-" },
        { key: "status", label: "Status", render: (item) => <span className={`status-chip ${item.status === "approved" ? "status-success" : item.status === "rejected" ? "status-danger" : "status-info"}`}>{prettifyStatus(item.status)}</span> },
        { key: "reviewed", label: "Reviewed", render: (item) => item.reviewed_at ? formatDateTime(item.reviewed_at) : "-" },
      ]} /></div></SectionCard>
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
      <Header title="Member workspace" copy="A clean, single-sidebar workspace for daily updates, todo tracking, requests, and assigned tasks." onMenuToggle={onMenuToggle} notifications={data.notifications || []} unreadCount={data.unread_notifications || 0} onNotificationOpen={handleNotificationOpen} onNotificationRefresh={refreshNotifications} />
      <Hero title={`${session.user.first_name} ${session.user.last_name || ""}`} copy="Simple views, clear tracking, and fast access to everything that needs action." meta={[{ label: "Pending requests", value: String(data.pending_requests.length) }, { label: "Missed days", value: String(data.missing_day_count) }]} />
      {content}
    </main>
  );
}
