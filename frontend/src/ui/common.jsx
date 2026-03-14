import { useEffect, useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  FileSpreadsheet,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Menu,
  ClipboardList,
  FolderClock,
  ListTodo,
  ShieldAlert,
  CheckCircle2,
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

export const ADMIN_NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "members", label: "Members", icon: Users },
  { key: "updates", label: "Updates", icon: CalendarDays },
  { key: "tasks", label: "Tasks", icon: ClipboardList },
  { key: "approvals", label: "Approvals", icon: CheckCircle2 },
  { key: "compliance", label: "Missing Days", icon: ShieldAlert },
  { key: "reports", label: "Reports", icon: FileSpreadsheet },
  { key: "settings", label: "Settings", icon: LockKeyhole },
];

export const MEMBER_NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "workspace", label: "Daily Update", icon: FolderClock },
  { key: "todo", label: "Todo", icon: ListTodo },
  { key: "tasks", label: "Tasks", icon: ClipboardList },
  { key: "history", label: "History", icon: CalendarDays },
  { key: "requests", label: "Requests", icon: ShieldAlert },
  { key: "settings", label: "Settings", icon: LockKeyhole },
];

export const TODO_STATUS = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export const TASK_STATUS = [
  { value: "todo", label: "Todo" },
  { value: "in_progress", label: "In Progress" },
  { value: "blocked", label: "Blocked" },
  { value: "done", label: "Done" },
];

export async function apiFetch(url, options = {}) {
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
    throw new Error(data?.detail || data?.message || `Request failed: ${response.status}`);
  }
  return data;
}

const getNav = (role) => (role === "lead" ? ADMIN_NAV : MEMBER_NAV);
const getView = (role) => {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const nav = getNav(role);
  return nav.find((item) => item.key === hash)?.key || nav[0].key;
};

export function useHashView(role) {
  const [view, setState] = useState(getView(role));
  useEffect(() => {
    const sync = () => setState(getView(role));
    window.addEventListener("hashchange", sync);
    sync();
    return () => window.removeEventListener("hashchange", sync);
  }, [role]);
  return [
    view,
    (next) => {
      window.location.hash = next;
      setState(next);
    },
  ];
}

export function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  return now;
}

export function useToasts() {
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
    removeToast: (id) => setToasts((items) => items.filter((item) => item.id !== id)),
  };
}

export const formatLongDate = (value) =>
  new Intl.DateTimeFormat(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(value);
export const formatClock = (value) =>
  new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit", second: "2-digit" }).format(value);
export const formatShortDateLabel = (value) =>
  new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(value));
export const formatDateTime = (value) => (value ? new Date(value).toLocaleString() : "-");
export const prettifyStatus = (value) =>
  String(value || "-").replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());

export function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-card">
        <div className="loading-spinner" />
        <h2>Loading workspace</h2>
        <p>Preparing the current dashboard state and member activity.</p>
      </div>
    </div>
  );
}

export function BusyOverlay({ show, label = "Working..." }) {
  if (!show) return null;
  return (
    <div className="busy-overlay" role="status" aria-live="polite">
      <div className="busy-card">
        <div className="loading-spinner" />
        <strong>{label}</strong>
      </div>
    </div>
  );
}

export function ToastStack({ toasts, removeToast }) {
  return (
    <div className="toast-stack">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <div className="toast-copy-wrap">
            <strong>{toast.title}</strong>
            <span>{toast.message}</span>
          </div>
          <button className="ghost-button" onClick={() => removeToast(toast.id)}>
            Close
          </button>
        </div>
      ))}
    </div>
  );
}

export function Sidebar({ session, view, setView, onLogout, open, onClose }) {
  const nav = getNav(session.role);
  return (
    <>
      <div className={`sidebar-backdrop ${open ? "sidebar-backdrop-open" : ""}`} onClick={onClose} />
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-pill">IN</div>
          <div>
            <div className="brand-title">{session.app_title}</div>
            <div className="brand-subtitle">{session.role === "lead" ? "Lead console" : "Member workspace"}</div>
          </div>
        </div>
        <div className="sidebar-user">
          <div className="sidebar-user-role">{session.role === "lead" ? "Team Lead" : "Team Member"}</div>
          <div className="sidebar-user-name">{session.user.first_name} {session.user.last_name || ""}</div>
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
                  if (window.innerWidth < 1180) onClose();
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
    </>
  );
}

function NotificationBell({ items, unreadCount, onOpen, onRefresh }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return undefined;
    onRefresh?.();
    return undefined;
  }, [open, onRefresh]);
  return (
    <div className="notification-shell" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="icon-button notification-button" onClick={() => setOpen((value) => !value)}>
        <Bell size={18} />
        {unreadCount ? <span className="notification-badge">{unreadCount}</span> : null}
      </button>
      {open ? (
        <div className="notification-popover">
          <div className="popover-head">
            <strong>Notifications</strong>
            <span>{unreadCount ? `${unreadCount} unread` : "All caught up"}</span>
          </div>
          <div className="notification-list">
            {items.length ? items.slice(0, 6).map((item) => (
              <button key={item.id} className={`notification-card ${item.is_read ? "" : "notification-card-unread"}`} onClick={() => {
                setOpen(false);
                onOpen(item);
              }}>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
                <small>{formatDateTime(item.created_at)}</small>
              </button>
            )) : <div className="empty-box compact-empty">No notifications yet.</div>}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function Header({ title, copy, onMenuToggle, notifications, unreadCount, onNotificationOpen, onNotificationRefresh }) {
  return (
    <header className="topbar">
      <div className="topbar-main">
        <div className="topbar-title">
          <button className="menu-button" onClick={onMenuToggle} aria-label="Toggle sidebar">
            <Menu size={18} />
          </button>
          <div>
            <h1>{title}</h1>
            <p>{copy}</p>
          </div>
        </div>
        <NotificationBell
          items={notifications}
          unreadCount={unreadCount}
          onOpen={onNotificationOpen}
          onRefresh={onNotificationRefresh}
        />
      </div>
    </header>
  );
}

export function Hero({ title, copy, meta }) {
  return (
    <section className="hero-card">
      <div className="hero-copy">
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

export function SectionCard({ icon: Icon, title, copy, tag, children }) {
  return (
    <section className="section-card">
      <div className="section-head">
        <div className="section-head-main">
          <div className="section-icon"><Icon size={18} /></div>
          <div><h3>{title}</h3>{copy ? <p>{copy}</p> : null}</div>
        </div>
        {tag ? <span className="tag-pill">{tag}</span> : null}
      </div>
      {children}
    </section>
  );
}

export function StatGrid({ items }) {
  return (
    <div className="stat-grid">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="stat-card">
            <div className="stat-icon"><Icon size={18} /></div>
            <div><span>{item.label}</span><strong>{item.value}</strong><p>{item.note}</p></div>
          </div>
        );
      })}
    </div>
  );
}

export function CalendarWidget({ now }) {
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
        <strong>{new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(now)}</strong>
        <span>{formatLongDate(now)}</span>
      </div>
      <div className="calendar-grid calendar-grid-labels">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label) => <div key={label} className="calendar-label">{label}</div>)}
      </div>
      <div className="calendar-grid">
        {cells.map((day, index) => <div key={`${day ?? "blank"}-${index}`} className={`calendar-cell ${day === today ? "calendar-today" : ""} ${day ? "calendar-filled" : "calendar-empty"}`}>{day || ""}</div>)}
      </div>
    </div>
  );
}

export function EntryTrendChart({ trend }) {
  return (
    <div className="chart-shell">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={trend}>
          <CartesianGrid stroke="#d8e1ec" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tickFormatter={formatShortDateLabel} stroke="#708198" tickLine={false} axisLine={false} />
          <YAxis allowDecimals={false} stroke="#708198" tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(value) => [`${value} entries`, "Entries"]}
            labelFormatter={(label) => formatLongDate(new Date(label))}
            contentStyle={{ borderRadius: "16px", border: "1px solid #d8e1ec", boxShadow: "0 18px 36px rgba(15, 23, 42, 0.12)" }}
          />
          <Line type="monotone" dataKey="count" stroke="#0f62fe" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function OverdueCard({ title, items, emptyCopy, onOpen, dateKey }) {
  return (
    <div className="mini-list-card">
      <div className="mini-list-head"><strong>{title}</strong><span>{items.length} items</span></div>
      {items.length ? (
        <div className="mini-list-scroll">
          {items.map((item) => (
            <button key={item.id} className="mini-list-item" onClick={() => onOpen?.(item)}>
              <div><strong>{item.title}</strong><span>{item[dateKey]}</span></div>
              <ChevronRight size={16} />
            </button>
          ))}
        </div>
      ) : <div className="empty-box compact-empty">{emptyCopy}</div>}
    </div>
  );
}

export function DataTable({ columns, rows, emptyMessage }) {
  if (!rows.length) return <div className="empty-box">{emptyMessage}</div>;
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index}>{columns.map((column) => <td key={column.key}>{column.render(row)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FormField({ label, children }) {
  return <label className="form-field"><span>{label}</span>{children}</label>;
}

export function DashboardPage({ title, copy, now, stats, trend, overdueCards, infoCards }) {
  return (
    <div className="page-stack">
      <SectionCard icon={LayoutDashboard} title={title} copy={copy}>
        <div className="dashboard-grid">
          <div className="clock-card">
            <div className="clock-row"><Clock3 size={18} /><span>Current time</span></div>
            <strong>{formatClock(now)}</strong>
            <p>{formatLongDate(now)}</p>
          </div>
          <CalendarWidget now={now} />
        </div>
      </SectionCard>
      <StatGrid items={stats} />
      <div className="content-grid">
        <SectionCard icon={FileSpreadsheet} title="Entry trend" copy="Seven-day activity movement for quick operational visibility.">
          <EntryTrendChart trend={trend.map((item) => ({ ...item, count: item.count || 0 }))} />
        </SectionCard>
        <div className="mini-list-grid">{overdueCards}</div>
      </div>
      <div className="insight-grid">
        {infoCards.map((item) => <div key={item.title} className="insight-card"><strong>{item.title}</strong><p>{item.copy}</p></div>)}
      </div>
    </div>
  );
}
