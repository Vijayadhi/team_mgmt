import { Suspense, lazy, useEffect, useState } from "react";
import "./App.css";
import { LoadingScreen, Sidebar, ToastStack, apiFetch, useHashView, useToasts } from "./ui/common";

const AdminApp = lazy(() => import("./ui/admin").then((module) => ({ default: module.AdminApp })));
const MemberApp = lazy(() => import("./ui/member").then((module) => ({ default: module.MemberApp })));

function normalizeSession(payload = {}) {
  return {
    role: payload.role || "member",
    app_title: payload.app_title || "iamneo | Team Daily Tracker",
    user: payload.user || {
      first_name: "",
      last_name: "",
      email: "",
      team_name: "",
    },
  };
}

function App() {
  const [session, setSession] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1180);
  const [taskFocusId, setTaskFocusId] = useState("");
  const { toasts, pushToast, removeToast } = useToasts();
  const [view, setView] = useHashView(session?.role || "member");

  useEffect(() => {
    let active = true;
    apiFetch("/api/session")
      .then((payload) => {
        if (!active) return;
        const nextSession = normalizeSession(payload);
        setSession(nextSession);
        document.title = nextSession.app_title;
      })
      .catch(() => {
        window.location.href = "/login";
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1180px)");
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
  const safeSession = normalizeSession(session);

  return (
    <div className={`app-shell ${sidebarOpen ? "" : "app-shell-collapsed"}`}>
      <Sidebar
        session={safeSession}
        view={view}
        setView={setView}
        onLogout={logout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="app-content">
        <Suspense fallback={<LoadingScreen />}>
          {session.role === "lead" ? (
            <AdminApp
              session={safeSession}
              pushToast={pushToast}
              view={view}
              setView={setView}
              onMenuToggle={() => setSidebarOpen((open) => !open)}
              taskFocusId={taskFocusId}
              clearTaskFocus={() => setTaskFocusId("")}
            />
          ) : (
            <MemberApp
              session={safeSession}
              pushToast={pushToast}
              view={view}
              setView={setView}
              onMenuToggle={() => setSidebarOpen((open) => !open)}
              taskFocusId={taskFocusId}
              clearTaskFocus={() => setTaskFocusId("")}
            />
          )}
        </Suspense>
      </div>
      <ToastStack toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;
