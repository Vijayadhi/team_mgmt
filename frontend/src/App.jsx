import { useEffect, useState } from "react";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileSpreadsheet,
  Filter,
  FolderClock,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Menu,
  ShieldAlert,
  UserPlus,
  Users,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./App.css";

const ADMIN_NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "members", label: "Members", icon: Users },
  { key: "approvals", label: "Approvals", icon: CheckCircle2 },
  { key: "compliance", label: "Missing Days", icon: ShieldAlert },
  { key: "reports", label: "Reports", icon: FileSpreadsheet },
  { key: "settings", label: "Settings", icon: LockKeyhole },
];

const MEMBER_NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "workspace", label: "Workspace", icon: FolderClock },
  { key: "history", label: "History", icon: CalendarDays },
  { key: "requests", label: "Requests", icon: Bell },
  { key: "settings", label: "Settings", icon: LockKeyhole },
];

async function apiFetch(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });
  const type = response.headers.get("content-type") || "";
  const data = type.includes("application/json") ? await response.json() : null;
  if (!response.ok) {
    throw new Error(
      data?.detail || data?.message || `Request failed: ${response.status}`,
    );
  }
  return data;
}

function getNav(role) {
  return role === "lead" ? ADMIN_NAV : MEMBER_NAV;
}

function getView(role) {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const items = getNav(role);
  return items.find((item) => item.key === hash)?.key || items[0].key;
}

function useHashView(role) {
  const [view, setState] = useState(getView(role));
  useEffect(() => {
    const sync = () => setState(getView(role));
    window.addEventListener("hashchange", sync);
    sync();
    return () => window.removeEventListener("hashchange", sync);
  }, [role]);
  const setView = (next) => {
    window.location.hash = next;
    setState(next);
  };
  return [view, setView];
}

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return now;
}

function useToasts() {
  const [toasts, setToasts] = useState([]);
  const pushToast = (type, title, message) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((items) => [...items, { id, type, title, message }]);
    window.setTimeout(() => {
      setToasts((items) => items.filter((item) => item.id !== id));
    }, 4200);
  };
  return {
    toasts,
    pushToast,
    removeToast: (id) =>
      setToasts((items) => items.filter((item) => item.id !== id)),
  };
}

function formatLongDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(value);
}

function formatClock(value) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(value);
}

function formatShortDateLabel(value) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value) {
  return new Date(value).toLocaleString();
}

function currentPeriod() {
  return new Date().getHours() < 12 ? "AM" : "PM";
}

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-card">
        <div className="loading-spinner" />
        <h2>Loading workspace</h2>
        <p>Preparing the latest team data and dashboard state.</p>
      </div>
    </div>
  );
}

function ToastStack({ toasts, removeToast }) {
  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className="toast-copy-wrap">
            <strong>{toast.title}</strong>
            <span>{toast.message}</span>
          </div>
          <button
            className="ghost-button"
            onClick={() => removeToast(toast.id)}
          >
            Close
          </button>
        </div>
      ))}
    </div>
  );
}

function Sidebar({ session, view, setView, onLogout, open, setOpen }) {
  const nav = getNav(session.role);
  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="sidebar-brand">
        <div className="brand-pill">IN</div>
        <div>
          <div className="brand-title">{session.app_title}</div>
          <div className="brand-subtitle">Daily tracker workspace</div>
        </div>
      </div>
      <div className="sidebar-user">
        <div className="sidebar-user-role">
          {session.role === "lead" ? "Team Lead" : "Team Member"}
        </div>
        <div className="sidebar-user-name">
          {session.user.first_name} {session.user.last_name || ""}
        </div>
        <div className="sidebar-user-email">{session.user.email}</div>
      </div>
      <nav className="sidebar-nav">
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              className={`sidebar-link ${view === item.key ? "sidebar-link-active" : ""}`}
              onClick={() => {
                setView(item.key);
                if (window.innerWidth < 1100) setOpen(false);
              }}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <button className="sidebar-logout" onClick={onLogout}>
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

function Header({ title, copy, onMenuToggle }) {
  return (
    <header className="topbar">
      <div className="topbar-main">
        <button
          className="menu-button"
          onClick={onMenuToggle}
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>
        <div>
          <h1>{title}</h1>
          <p>{copy}</p>
        </div>
      </div>
    </header>
  );
}

function Hero({ title, copy, meta }) {
  return (
    <section className="hero-card">
      <div>
        <div className="hero-kicker">Operational workspace</div>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className="hero-meta-grid">
        {meta.map((item) => (
          <div key={item.label} className="hero-meta-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionCard({ icon: Icon, title, copy, children, tag }) {
  return (
    <section className="section-card">
      <div className="section-head">
        <div className="section-head-main">
          <div className="section-icon">
            <Icon size={18} />
          </div>
          <div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        </div>
        {tag ? <span className="tag-pill">{tag}</span> : null}
      </div>
      {children}
    </section>
  );
}

function StatGrid({ items }) {
  return (
    <div className="stat-grid">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="stat-card">
            <div className="stat-icon">
              <Icon size={18} />
            </div>
            <div>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function CalendarWidget({ now }) {
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let index = 0; index < firstDay; index += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);
  return (
    <div className="calendar-card">
      <div className="calendar-head">
        <strong>
          {new Intl.DateTimeFormat(undefined, {
            month: "long",
            year: "numeric",
          }).format(now)}
        </strong>
        <span>{formatLongDate(now)}</span>
      </div>
      <div className="calendar-grid calendar-grid-labels">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label) => (
          <div key={label} className="calendar-label">
            {label}
          </div>
        ))}
      </div>
      <div className="calendar-grid">
        {cells.map((day, index) => (
          <div
            key={`${day ?? "blank"}-${index}`}
            className={`calendar-cell ${day === today ? "calendar-today" : ""} ${day ? "calendar-filled" : "calendar-empty"}`}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
}

function EntryTrendChart({ trend }) {
  return (
    <div className="chart-shell">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={trend}>
          <CartesianGrid
            stroke="#dbe4ef"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatShortDateLabel}
            stroke="#778399"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            allowDecimals={false}
            stroke="#778399"
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            formatter={(value) => [`${value} entries`, "Entries"]}
            labelFormatter={(label) => formatLongDate(new Date(label))}
            contentStyle={{
              borderRadius: "16px",
              border: "1px solid #dbe4ef",
              boxShadow: "0 18px 40px rgba(15, 23, 42, 0.12)",
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4, fill: "#2563eb" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function DashboardPage({ title, copy, now, stats, trend, insights }) {
  return (
    <div className="page-stack">
      <SectionCard icon={LayoutDashboard} title={title} copy={copy}>
        <div className="dashboard-grid">
          <div className="clock-card">
            <div className="clock-row">
              <Clock3 size={18} />
              <span>Current time</span>
            </div>
            <strong>{formatClock(now)}</strong>
            <p>{formatLongDate(now)}</p>
          </div>
          <CalendarWidget now={now} />
        </div>
      </SectionCard>
      <StatGrid items={stats} />
      <SectionCard
        icon={FileSpreadsheet}
        title="Entry trend"
        copy="A simple line chart showing tracked entries over the last seven days."
      >
        <EntryTrendChart
          trend={trend.map((item) => ({ ...item, count: item.count || 0 }))}
        />
      </SectionCard>
      <div className="insight-grid">
        {insights.map((item) => (
          <div key={item.title} className="insight-card">
            <strong>{item.title}</strong>
            <p>{item.copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataTable({ columns, rows, emptyMessage }) {
  if (!rows.length) return <div className="empty-box">{emptyMessage}</div>;
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((column) => (
                <td key={column.key}>{column.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <label className="form-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function WorkspaceForm({
  data,
  formState,
  setFormState,
  working,
  onSubmit,
  onReset,
}) {
  return (
    <SectionCard
      icon={FolderClock}
      title={
        data.is_requesting_missing_day
          ? "Missed day request"
          : data.is_editing
            ? "End-of-day update"
            : "Morning entry"
      }
      copy="The form only shows the fields needed for the current workflow step."
      tag={formState.date}
    >
      {data.is_editing ? (
        <div className="summary-box">
          <strong>Morning entry summary</strong>
          <p>Plan: {formState.plan || "-"}</p>
          <p>ETA: {formState.eta || "-"}</p>
          <p>Client: {formState.client_name || "-"}</p>
        </div>
      ) : null}
      <div className="form-grid">
        {!data.is_editing ? (
          <>
            <FormField label="Date">
              <input
                className="field-input"
                type="date"
                value={formState.date}
                onChange={(event) =>
                  setFormState({ ...formState, date: event.target.value })
                }
              />
            </FormField>
            <FormField label="ETA">
              <input
                className="field-input"
                value={formState.eta}
                onChange={(event) =>
                  setFormState({ ...formState, eta: event.target.value })
                }
              />
            </FormField>
            <FormField label="Client">
              <input
                className="field-input"
                value={formState.client_name}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    client_name: event.target.value,
                  })
                }
              />
            </FormField>
            <FormField label="Morning plan">
              <textarea
                className="field-input field-textarea"
                value={formState.plan}
                onChange={(event) =>
                  setFormState({ ...formState, plan: event.target.value })
                }
              />
            </FormField>
            <FormField label="Category">
              <div className="checkbox-row">
                <label className="checkbox-pill">
                  <input
                    type="checkbox"
                    checked={!!formState.is_corporate}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        is_corporate: event.target.checked,
                      })
                    }
                  />
                  <span>Corporate</span>
                </label>
                <label className="checkbox-pill">
                  <input
                    type="checkbox"
                    checked={!!formState.is_university}
                    onChange={(event) =>
                      setFormState({
                        ...formState,
                        is_university: event.target.checked,
                      })
                    }
                  />
                  <span>University</span>
                </label>
              </div>
            </FormField>
          </>
        ) : null}
        {data.is_editing || data.is_requesting_missing_day ? (
          <>
            <FormField label="Extra work">
              <textarea
                className="field-input field-textarea"
                value={formState.extra_work}
                onChange={(event) =>
                  setFormState({ ...formState, extra_work: event.target.value })
                }
              />
            </FormField>
            <FormField label="Challenges">
              <textarea
                className="field-input field-textarea"
                value={formState.challenges}
                onChange={(event) =>
                  setFormState({ ...formState, challenges: event.target.value })
                }
              />
            </FormField>
            <FormField label="Proof of work">
              <textarea
                className="field-input field-textarea"
                value={formState.proof_of_work}
                onChange={(event) =>
                  setFormState({
                    ...formState,
                    proof_of_work: event.target.value,
                  })
                }
              />
            </FormField>
          </>
        ) : null}
        {data.is_requesting_missing_day ||
        (data.is_editing && formState.date < data.today) ? (
          <FormField label="Reason for late submission">
            <textarea
              className="field-input field-textarea"
              value={formState.request_reason}
              onChange={(event) =>
                setFormState({
                  ...formState,
                  request_reason: event.target.value,
                })
              }
            />
          </FormField>
        ) : null}
      </div>
      <div className="action-row">
        <button
          className="primary-button"
          disabled={working}
          onClick={onSubmit}
        >
          {data.is_requesting_missing_day
            ? "Submit request"
            : data.is_editing
              ? "Save end-of-day update"
              : "Save morning entry"}
        </button>
        {data.is_editing || data.is_requesting_missing_day ? (
          <button className="secondary-button" onClick={onReset}>
            Back to new entry
          </button>
        ) : null}
      </div>
    </SectionCard>
  );
}

function AdminApp({ session, pushToast, view, setView, onMenuToggle }) {
  const now = useClock();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [filters, setFilters] = useState({ member_name: "", update_date: "" });
  const [teamForm, setTeamForm] = useState({
    team_name: session.user.team_name || "",
  });
  const [memberForm, setMemberForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [reportForm, setReportForm] = useState(null);
  const [reportBusy, setReportBusy] = useState(false);

  const load = async (nextFilters = filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (nextFilters.member_name)
        params.set("member_name", nextFilters.member_name);
      if (nextFilters.update_date)
        params.set("update_date", nextFilters.update_date);
      const payload = await apiFetch(
        `/api/admin/dashboard?${params.toString()}`,
      );
      setData(payload);
      setFilters(payload.filters || nextFilters);
      setTeamForm({ team_name: payload.user.team_name || "" });
    } catch (error) {
      pushToast("error", "Dashboard error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const run = async (requester, title, after) => {
    setWorking(true);
    try {
      const result = await requester();
      pushToast("success", title, result.message || "Done.");
      if (after) await after(result);
      await load();
    } catch (error) {
      pushToast("error", "Action failed", error.message);
    } finally {
      setWorking(false);
    }
  };

  const openReport = async (reportId) => {
    setView("reports");
    try {
      setReportForm(await apiFetch(`/api/admin/reports/${reportId}`));
    } catch (error) {
      pushToast("error", "Unable to open report", error.message);
    }
  };

  if (loading && !data) return <LoadingScreen />;

  const stats = [
    {
      icon: Bell,
      label: "Pending requests",
      value: data.pending_requests.length,
      note: "Awaiting lead action",
    },
    {
      icon: FileSpreadsheet,
      label: "Total entries",
      value: data.total_entries,
      note: "All team updates recorded so far",
    },
    {
      icon: Users,
      label: "Team members",
      value: data.team_members.length,
      note: "Accounts managed by this lead",
    },
  ];

  let content = null;
  if (view === "dashboard") {
    content = (
      <DashboardPage
        title="Team insights"
        copy="A calm dashboard view focused on pending requests, total entries, current time, calendar, and entry movement."
        now={now}
        stats={stats}
        trend={data.entry_trend}
        insights={[
          {
            title: "Pending approvals",
            copy: data.pending_requests.length
              ? `${data.pending_requests.length} requests are ready for review.`
              : "There are no approval requests waiting now.",
          },
          {
            title: "Reporting status",
            copy: data.reports.length
              ? `${data.reports.length} finalized reports are available to reopen.`
              : "No finalized weekly reports yet.",
          },
          {
            title: "Missing day watch",
            copy: data.missing_days.length
              ? `${data.missing_days.length} missing-day issues need attention.`
              : "No recent missing-day alerts.",
          },
        ]}
      />
    );
  } else if (view === "members") {
    content = (
      <SectionCard
        icon={Users}
        title="Team members"
        copy="Member accounts, status, and quick password controls."
        tag={`${data.team_members.length} members`}
      >
        <div className="tile-grid">
          {data.team_members.map((member) => (
            <div key={member.id} className="member-tile">
              <div className="tile-head">
                <div>
                  <strong>
                    {member.first_name} {member.last_name || ""}
                  </strong>
                  <span>{member.email}</span>
                </div>
                <span
                  className={`status-chip ${member.is_active ? "status-success" : "status-danger"}`}
                >
                  {member.is_active ? "Active" : "Disabled"}
                </span>
              </div>
              <div className="action-row">
                <button
                  className="secondary-button"
                  onClick={() =>
                    run(
                      () =>
                        apiFetch(
                          `/api/admin/users/${member.id}/reset-password`,
                          { method: "POST" },
                        ),
                      "Password reset",
                    )
                  }
                >
                  Reset password
                </button>
                <button
                  className={
                    member.is_active ? "danger-button" : "primary-button"
                  }
                  onClick={() =>
                    run(
                      () =>
                        apiFetch(`/api/admin/users/${member.id}/toggle`, {
                          method: "POST",
                        }),
                      "Member updated",
                    )
                  }
                >
                  {member.is_active ? "Disable" : "Enable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    );
  } else if (view === "approvals") {
    content = (
      <SectionCard
        icon={CheckCircle2}
        title="Pending approvals"
        copy="Late submissions and missed-day requests waiting for review."
        tag={`${data.pending_requests.length} pending`}
      >
        <DataTable
          emptyMessage="No approval requests are waiting right now."
          rows={data.pending_requests}
          columns={[
            { key: "date", label: "Date", render: (item) => item.date },
            {
              key: "member",
              label: "Member",
              render: (item) => (
                <div className="table-cell-stack">
                  <strong>{item.member_name}</strong>
                  <span>{item.email}</span>
                </div>
              ),
            },
            {
              key: "type",
              label: "Type",
              render: (item) => (
                <span className="status-chip status-info">
                  {item.request_type.replaceAll("_", " ")}
                </span>
              ),
            },
            { key: "reason", label: "Reason", render: (item) => item.reason },
            {
              key: "actions",
              label: "Actions",
              render: (item) => (
                <div className="action-row">
                  <button
                    className="primary-button"
                    onClick={() =>
                      run(
                        () =>
                          apiFetch(`/api/admin/requests/${item.id}/approve`, {
                            method: "POST",
                          }),
                        "Request approved",
                      )
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="secondary-button"
                    onClick={() =>
                      run(
                        () =>
                          apiFetch(`/api/admin/requests/${item.id}/reject`, {
                            method: "POST",
                          }),
                        "Request rejected",
                      )
                    }
                  >
                    Reject
                  </button>
                </div>
              ),
            },
          ]}
        />
      </SectionCard>
    );
  } else if (view === "compliance") {
    content = (
      <SectionCard
        icon={ShieldAlert}
        title="Missing days"
        copy="Recent workday-level compliance issues across the team."
        tag={`${data.missing_days.length} flagged`}
      >
        <DataTable
          emptyMessage="No missing-day issues found."
          rows={data.missing_days}
          columns={[
            { key: "date", label: "Date", render: (item) => item.date },
            {
              key: "member",
              label: "Member",
              render: (item) => item.member_name,
            },
            { key: "email", label: "Email", render: (item) => item.email },
            {
              key: "actions",
              label: "Actions",
              render: (item) => (
                <div className="action-row">
                  <button
                    className="secondary-button"
                    onClick={() =>
                      run(
                        () =>
                          apiFetch("/api/admin/missing-days/leave", {
                            method: "POST",
                            body: JSON.stringify({
                              user_id: item.member_id,
                              missing_date: item.date,
                            }),
                          }),
                        "Leave marked",
                      )
                    }
                  >
                    Mark leave
                  </button>
                  <button
                    className="primary-button"
                    onClick={() =>
                      run(
                        () =>
                          apiFetch("/api/admin/missing-days/warning", {
                            method: "POST",
                            body: JSON.stringify({
                              user_id: item.member_id,
                              missing_date: item.date,
                            }),
                          }),
                        "Warning sent",
                      )
                    }
                  >
                    Raise warning
                  </button>
                </div>
              ),
            },
          ]}
        />
      </SectionCard>
    );
  } else if (view === "reports") {
    content = (
      <div className="page-stack">
        <SectionCard
          icon={FileSpreadsheet}
          title="Generate weekly report"
          copy="Create a new draft report from the selected weekly range."
        >
          <div className="inline-form-row">
            <FormField label="Week start">
              <input
                className="field-input"
                type="date"
                value={reportForm?.week_start || data.week_start}
                onChange={(event) =>
                  setReportForm((current) => ({
                    ...(current || {}),
                    week_start: event.target.value,
                    week_end: current?.week_end || data.week_end,
                  }))
                }
              />
            </FormField>
            <FormField label="Week end">
              <input
                className="field-input"
                type="date"
                value={reportForm?.week_end || data.week_end}
                onChange={(event) =>
                  setReportForm((current) => ({
                    ...(current || {}),
                    week_start: current?.week_start || data.week_start,
                    week_end: event.target.value,
                  }))
                }
              />
            </FormField>
          </div>
          <div className="action-row">
            <button
              className="primary-button"
              disabled={reportBusy}
              onClick={async () => {
                setReportBusy(true);
                try {
                  const result = await apiFetch("/api/admin/reports/generate", {
                    method: "POST",
                    body: JSON.stringify({
                      week_start: reportForm?.week_start || data.week_start,
                      week_end: reportForm?.week_end || data.week_end,
                    }),
                  });
                  pushToast("success", "Report generated", result.message);
                  await load();
                  await openReport(result.report_id);
                } catch (error) {
                  pushToast("error", "Report generation failed", error.message);
                } finally {
                  setReportBusy(false);
                }
              }}
            >
              {reportBusy ? "Generating..." : "Generate report"}
            </button>
          </div>
        </SectionCard>
        <SectionCard
          icon={Filter}
          title="Daily updates"
          copy="Filter the submitted updates before reporting."
        >
          <div className="inline-form-row">
            <FormField label="Member or email">
              <input
                className="field-input"
                value={filters.member_name}
                onChange={(event) =>
                  setFilters({ ...filters, member_name: event.target.value })
                }
              />
            </FormField>
            <FormField label="Date">
              <input
                className="field-input"
                type="date"
                value={filters.update_date}
                onChange={(event) =>
                  setFilters({ ...filters, update_date: event.target.value })
                }
              />
            </FormField>
          </div>
          <div className="action-row">
            <button className="secondary-button" onClick={() => load(filters)}>
              Apply filter
            </button>
          </div>
          <DataTable
            emptyMessage="No updates matched the current filter."
            rows={data.updates}
            columns={[
              { key: "date", label: "Date", render: (item) => item.date },
              {
                key: "member",
                label: "Member",
                render: (item) => (
                  <div className="table-cell-stack">
                    <strong>{item.member_name}</strong>
                    <span>{item.email}</span>
                  </div>
                ),
              },
              {
                key: "plan",
                label: "Plan",
                render: (item) => item.plan || "-",
              },
              { key: "eta", label: "ETA", render: (item) => item.eta || "-" },
              {
                key: "client",
                label: "Client",
                render: (item) => item.client_name || "-",
              },
              {
                key: "proof",
                label: "Proof",
                render: (item) => item.proof_of_work || "-",
              },
            ]}
          />
        </SectionCard>
        <SectionCard
          icon={FolderClock}
          title="Saved reports"
          copy="Open an existing report or download the finalized PDF."
        >
          <div className="tile-grid">
            {data.reports.map((report) => (
              <div key={report.id} className="member-tile">
                <div className="tile-head">
                  <div>
                    <strong>
                      {report.week_start} to {report.week_end}
                    </strong>
                    <span>{formatDateTime(report.generated_at)}</span>
                  </div>
                </div>
                <div className="action-row">
                  <button
                    className="primary-button"
                    onClick={() => openReport(report.id)}
                  >
                    Open
                  </button>
                  <a
                    className="secondary-link"
                    href={`/admin/reports/${report.id}/download`}
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
        {reportForm?.id ? (
          <SectionCard
            icon={FileSpreadsheet}
            title="Report editor"
            copy="Refine the AI draft before finalizing it."
            tag={`${reportForm.week_start} to ${reportForm.week_end}`}
          >
            <div className="form-grid">
              <FormField label="Team summary">
                <textarea
                  className="field-input field-textarea"
                  value={reportForm.team_summary || ""}
                  onChange={(event) =>
                    setReportForm({
                      ...reportForm,
                      team_summary: event.target.value,
                    })
                  }
                />
              </FormField>
              {reportForm.rows?.map((row, index) => (
                <div
                  key={`${row.member_name}-${index}`}
                  className="report-row-card"
                >
                  <FormField label="Member">
                    <input
                      className="field-input"
                      value={row.member_name || ""}
                      onChange={(event) => {
                        const rows = reportForm.rows.slice();
                        rows[index] = {
                          ...row,
                          member_name: event.target.value,
                        };
                        setReportForm({ ...reportForm, rows });
                      }}
                    />
                  </FormField>
                  <FormField label="Activity">
                    <textarea
                      className="field-input field-textarea"
                      value={row.activity_summary || ""}
                      onChange={(event) => {
                        const rows = reportForm.rows.slice();
                        rows[index] = {
                          ...row,
                          activity_summary: event.target.value,
                        };
                        setReportForm({ ...reportForm, rows });
                      }}
                    />
                  </FormField>
                  <FormField label="Extra work">
                    <textarea
                      className="field-input field-textarea"
                      value={row.extra_work_summary || ""}
                      onChange={(event) => {
                        const rows = reportForm.rows.slice();
                        rows[index] = {
                          ...row,
                          extra_work_summary: event.target.value,
                        };
                        setReportForm({ ...reportForm, rows });
                      }}
                    />
                  </FormField>
                  <FormField label="Challenges">
                    <textarea
                      className="field-input field-textarea"
                      value={row.challenges_summary || ""}
                      onChange={(event) => {
                        const rows = reportForm.rows.slice();
                        rows[index] = {
                          ...row,
                          challenges_summary: event.target.value,
                        };
                        setReportForm({ ...reportForm, rows });
                      }}
                    />
                  </FormField>
                  <FormField label="Manager notes">
                    <textarea
                      className="field-input field-textarea"
                      value={row.manager_notes || ""}
                      onChange={(event) => {
                        const rows = reportForm.rows.slice();
                        rows[index] = {
                          ...row,
                          manager_notes: event.target.value,
                        };
                        setReportForm({ ...reportForm, rows });
                      }}
                    />
                  </FormField>
                  <FormField label="Next week action plan">
                    <textarea
                      className="field-input field-textarea"
                      value={row.next_week_action_plan || ""}
                      onChange={(event) => {
                        const rows = reportForm.rows.slice();
                        rows[index] = {
                          ...row,
                          next_week_action_plan: event.target.value,
                        };
                        setReportForm({ ...reportForm, rows });
                      }}
                    />
                  </FormField>
                </div>
              ))}
              <FormField label="Overall challenges">
                <textarea
                  className="field-input field-textarea"
                  value={reportForm.overall_challenges || ""}
                  onChange={(event) =>
                    setReportForm({
                      ...reportForm,
                      overall_challenges: event.target.value,
                    })
                  }
                />
              </FormField>
              <FormField label="Bottleneck risk">
                <textarea
                  className="field-input field-textarea"
                  value={reportForm.bottleneck_risk || ""}
                  onChange={(event) =>
                    setReportForm({
                      ...reportForm,
                      bottleneck_risk: event.target.value,
                    })
                  }
                />
              </FormField>
            </div>
            <div className="action-row">
              <button
                className="primary-button"
                disabled={reportBusy}
                onClick={async () => {
                  setReportBusy(true);
                  try {
                    const result = await apiFetch(
                      `/api/admin/reports/${reportForm.id}/save`,
                      { method: "POST", body: JSON.stringify(reportForm) },
                    );
                    pushToast("success", "Report finalized", result.message);
                    await load();
                    window.open(
                      result.download_url,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  } catch (error) {
                    pushToast("error", "Save failed", error.message);
                  } finally {
                    setReportBusy(false);
                  }
                }}
              >
                {reportBusy ? "Saving..." : "Save and finalize"}
              </button>
              {reportForm.download_url ? (
                <a className="secondary-link" href={reportForm.download_url}>
                  Download PDF
                </a>
              ) : null}
            </div>
          </SectionCard>
        ) : null}
      </div>
    );
  } else {
    content = (
      <div className="page-stack">
        <SectionCard
          icon={LayoutDashboard}
          title="Team identity"
          copy="Update the team name used across the workspace."
        >
          <FormField label="Team name">
            <input
              className="field-input"
              value={teamForm.team_name}
              onChange={(event) =>
                setTeamForm({ team_name: event.target.value })
              }
            />
          </FormField>
          <div className="action-row">
            <button
              className="primary-button"
              disabled={working}
              onClick={() =>
                run(
                  () =>
                    apiFetch("/api/admin/team-name", {
                      method: "POST",
                      body: JSON.stringify(teamForm),
                    }),
                  "Team updated",
                )
              }
            >
              Update team name
            </button>
          </div>
        </SectionCard>
        <SectionCard
          icon={UserPlus}
          title="Add team member"
          copy="New users get their first name as the default password."
        >
          <div className="inline-form-row">
            <FormField label="First name">
              <input
                className="field-input"
                value={memberForm.first_name}
                onChange={(event) =>
                  setMemberForm({
                    ...memberForm,
                    first_name: event.target.value,
                  })
                }
              />
            </FormField>
            <FormField label="Last name">
              <input
                className="field-input"
                value={memberForm.last_name}
                onChange={(event) =>
                  setMemberForm({
                    ...memberForm,
                    last_name: event.target.value,
                  })
                }
              />
            </FormField>
            <FormField label="Email">
              <input
                className="field-input"
                type="email"
                value={memberForm.email}
                onChange={(event) =>
                  setMemberForm({ ...memberForm, email: event.target.value })
                }
              />
            </FormField>
          </div>
          <div className="action-row">
            <button
              className="primary-button"
              disabled={working}
              onClick={() =>
                run(
                  () =>
                    apiFetch("/api/admin/users", {
                      method: "POST",
                      body: JSON.stringify(memberForm),
                    }),
                  "Member added",
                  async () =>
                    setMemberForm({ first_name: "", last_name: "", email: "" }),
                )
              }
            >
              Create member
            </button>
          </div>
        </SectionCard>
        <SectionCard
          icon={LockKeyhole}
          title="Lead password"
          copy="Keep the team lead account secure."
        >
          <div className="inline-form-row">
            <FormField label="Current password">
              <input
                className="field-input"
                type="password"
                value={passwordForm.current_password}
                onChange={(event) =>
                  setPasswordForm({
                    ...passwordForm,
                    current_password: event.target.value,
                  })
                }
              />
            </FormField>
            <FormField label="New password">
              <input
                className="field-input"
                type="password"
                value={passwordForm.new_password}
                onChange={(event) =>
                  setPasswordForm({
                    ...passwordForm,
                    new_password: event.target.value,
                  })
                }
              />
            </FormField>
            <FormField label="Confirm password">
              <input
                className="field-input"
                type="password"
                value={passwordForm.confirm_password}
                onChange={(event) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirm_password: event.target.value,
                  })
                }
              />
            </FormField>
          </div>
          <div className="action-row">
            <button
              className="primary-button"
              disabled={working}
              onClick={() =>
                run(
                  () =>
                    apiFetch("/api/admin/change-password", {
                      method: "POST",
                      body: JSON.stringify(passwordForm),
                    }),
                  "Password updated",
                  async () =>
                    setPasswordForm({
                      current_password: "",
                      new_password: "",
                      confirm_password: "",
                    }),
                )
              }
            >
              Update password
            </button>
          </div>
        </SectionCard>
      </div>
    );
  }

  return (
    <main className="workspace-main">
      <Header
        title="Admin dashboard"
        copy="Professional, minimal, and dashboard-first with clean operational sections."
        onMenuToggle={onMenuToggle}
      />
      <Hero
        title={`${session.user.first_name} ${session.user.last_name || ""}`}
        copy="Manage members, exceptions, reporting, and compliance from one organized workspace."
        meta={[
          {
            label: "Team",
            value: session.user.team_name || "Team Daily Tracker",
          },
          { label: "Email", value: session.user.email },
        ]}
      />
      {content}
    </main>
  );
}

function MemberApp({ session, pushToast, view, setView, onMenuToggle }) {
  const now = useClock();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [requestDate, setRequestDate] = useState("");
  const [formState, setFormState] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const load = async (params = {}) => {
    setLoading(true);
    try {
      const search = new URLSearchParams();
      if (params.edit_date) search.set("edit_date", params.edit_date);
      if (params.request_date) search.set("request_date", params.request_date);
      const payload = await apiFetch(
        `/api/member/dashboard?${search.toString()}`,
      );
      setData(payload);
      setFormState({
        ...(payload.form_data || {}),
        date: payload.form_data?.date || payload.today,
      });
    } catch (error) {
      pushToast("error", "Dashboard error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    load({
      edit_date: search.get("edit_date") || "",
      request_date: search.get("request_date") || "",
    });
  }, []);

  if (loading && !data) return <LoadingScreen />;

  const stats = [
    {
      icon: Bell,
      label: "Pending requests",
      value: data.pending_requests.length,
      note: "Awaiting TL review",
    },
    {
      icon: FileSpreadsheet,
      label: "Total entries",
      value: data.total_entries,
      note: "Your submitted daily updates",
    },
    {
      icon: Clock3,
      label: "Current period",
      value: currentPeriod(),
      note: "Local time based AM/PM context",
    },
  ];

  let content = null;
  if (view === "dashboard") {
    content = (
      <DashboardPage
        title="Today at a glance"
        copy="A clean dashboard focused on requests, entry volume, current time, calendar context, and entry trend."
        now={now}
        stats={stats}
        trend={data.entry_trend}
        insights={[
          {
            title: "Current day period",
            copy:
              currentPeriod() === "AM"
                ? "Morning planning time is currently active."
                : "Post-noon and end-of-day work is currently active.",
          },
          {
            title: "Request status",
            copy: data.pending_requests.length
              ? `${data.pending_requests.length} requests are pending review.`
              : "No pending requests at the moment.",
          },
          {
            title: "Entry history",
            copy: data.total_entries
              ? `${data.total_entries} entries have been logged so far.`
              : "No entries logged yet for this account.",
          },
        ]}
      />
    );
  } else if (view === "workspace") {
    content = (
      <WorkspaceForm
        data={data}
        formState={formState}
        setFormState={setFormState}
        working={working}
        onReset={async () => {
          setView("workspace");
          await load();
        }}
        onSubmit={async () => {
          setWorking(true);
          try {
            const result = await apiFetch("/api/member/daily-update", {
              method: "POST",
              body: JSON.stringify({
                entry_date: formState.date,
                plan: formState.plan,
                extra_work: formState.extra_work,
                challenges: formState.challenges,
                eta: formState.eta,
                proof_of_work: formState.proof_of_work,
                client_name: formState.client_name,
                request_reason: formState.request_reason,
                is_corporate: !!formState.is_corporate,
                is_university: !!formState.is_university,
              }),
            });
            pushToast("success", "Saved", result.message);
            if (result.next?.edit_date) {
              setView("workspace");
              await load({ edit_date: result.next.edit_date });
            } else if (result.next?.view === "requests") {
              setView("requests");
              await load();
            } else {
              setView("history");
              await load();
            }
          } catch (error) {
            pushToast("error", "Save failed", error.message);
          } finally {
            setWorking(false);
          }
        }}
      />
    );
  } else if (view === "history") {
    content = (
      <SectionCard
        icon={CalendarDays}
        title="History"
        copy="A clear table of recent entries with direct edit access."
        tag={`${data.recent_updates.length} recent`}
      >
        <DataTable
          emptyMessage="No entries yet. Start by adding a morning entry."
          rows={data.recent_updates}
          columns={[
            { key: "date", label: "Date", render: (item) => item.date },
            { key: "plan", label: "Plan", render: (item) => item.plan || "-" },
            { key: "eta", label: "ETA", render: (item) => item.eta || "-" },
            {
              key: "extra",
              label: "Extra work",
              render: (item) => item.extra_work || "-",
            },
            {
              key: "proof",
              label: "Proof",
              render: (item) => item.proof_of_work || "-",
            },
            {
              key: "actions",
              label: "Actions",
              render: (item) => (
                <button
                  className="secondary-button"
                  onClick={async () => {
                    setView("workspace");
                    await load({ edit_date: item.date });
                  }}
                >
                  Open edit mode
                </button>
              ),
            },
          ]}
        />
      </SectionCard>
    );
  } else if (view === "requests") {
    content = (
      <div className="page-stack">
        <SectionCard
          icon={Bell}
          title="Missed previous day"
          copy="Open a previous-day request when a full day was missed."
        >
          <FormField label="Date">
            <input
              className="field-input"
              type="date"
              max={data.today}
              value={requestDate}
              onChange={(event) => setRequestDate(event.target.value)}
            />
          </FormField>
          <div className="action-row">
            <button
              className="primary-button"
              onClick={async () => {
                if (!requestDate) {
                  pushToast(
                    "error",
                    "Missing date",
                    "Select the missed date first.",
                  );
                  return;
                }
                setView("workspace");
                await load({ request_date: requestDate });
              }}
            >
              Open request
            </button>
          </div>
        </SectionCard>
        <SectionCard
          icon={FolderClock}
          title="Pending requests"
          copy="Requests that are still awaiting team-lead review."
        >
          <DataTable
            emptyMessage="No pending requests right now."
            rows={data.pending_requests}
            columns={[
              { key: "date", label: "Date", render: (item) => item.date },
              {
                key: "type",
                label: "Request type",
                render: (item) => item.request_type.replaceAll("_", " "),
              },
              {
                key: "status",
                label: "Status",
                render: () => "Awaiting TL approval",
              },
            ]}
          />
        </SectionCard>
      </div>
    );
  } else {
    content = (
      <SectionCard
        icon={LockKeyhole}
        title="Password settings"
        copy="Update your member password."
      >
        <div className="inline-form-row">
          <FormField label="Current password">
            <input
              className="field-input"
              type="password"
              value={passwordForm.current_password}
              onChange={(event) =>
                setPasswordForm({
                  ...passwordForm,
                  current_password: event.target.value,
                })
              }
            />
          </FormField>
          <FormField label="New password">
            <input
              className="field-input"
              type="password"
              value={passwordForm.new_password}
              onChange={(event) =>
                setPasswordForm({
                  ...passwordForm,
                  new_password: event.target.value,
                })
              }
            />
          </FormField>
          <FormField label="Confirm password">
            <input
              className="field-input"
              type="password"
              value={passwordForm.confirm_password}
              onChange={(event) =>
                setPasswordForm({
                  ...passwordForm,
                  confirm_password: event.target.value,
                })
              }
            />
          </FormField>
        </div>
        <div className="action-row">
          <button
            className="primary-button"
            disabled={working}
            onClick={async () => {
              setWorking(true);
              try {
                const result = await apiFetch("/api/member/change-password", {
                  method: "POST",
                  body: JSON.stringify(passwordForm),
                });
                pushToast("success", "Password updated", result.message);
                setPasswordForm({
                  current_password: "",
                  new_password: "",
                  confirm_password: "",
                });
              } catch (error) {
                pushToast("error", "Password update failed", error.message);
              } finally {
                setWorking(false);
              }
            }}
          >
            Update password
          </button>
        </div>
      </SectionCard>
    );
  }

  return (
    <main className="workspace-main">
      <Header
        title="Member workspace"
        copy="Professional and simple, with a dashboard-first flow and focused content pages."
        onMenuToggle={onMenuToggle}
      />
      <Hero
        title={`${session.user.first_name} ${session.user.last_name || ""}`}
        meta={[
          { label: "Current period", value: currentPeriod() },
          {
            label: "Pending requests",
            value: String(data.pending_requests.length),
          },
        ]}
      />
      {content}
    </main>
  );
}

function App() {
  const [session, setSession] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toasts, pushToast, removeToast } = useToasts();
  const [view, setView] = useHashView(session?.role || "member");

  useEffect(() => {
    let active = true;
    apiFetch("/api/session")
      .then((payload) => {
        if (!active) return;
        setSession(payload);
        document.title = payload.app_title;
      })
      .catch(() => {
        window.location.href = "/login";
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1100px)");
    const sync = () => setSidebarOpen(!media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const logout = async () => {
    try {
      await apiFetch("/api/logout", { method: "POST" });
    } finally {
      window.location.href = "/login";
    }
  };

  if (!session) return <LoadingScreen />;

  return (
    <div className="app-shell">
      <Sidebar
        session={session}
        view={view}
        setView={setView}
        onLogout={logout}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
      <div className="app-content">
        {session.role === "lead" ? (
          <AdminApp
            session={session}
            pushToast={pushToast}
            view={view}
            setView={setView}
            onMenuToggle={() => setSidebarOpen((open) => !open)}
          />
        ) : (
          <MemberApp
            session={session}
            pushToast={pushToast}
            view={view}
            setView={setView}
            onMenuToggle={() => setSidebarOpen((open) => !open)}
          />
        )}
      </div>
      <ToastStack toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;
