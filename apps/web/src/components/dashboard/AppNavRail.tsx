"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bot,
  Phone,
  PhoneIncoming,
  Settings,
  LogOut,
  ChevronUp,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  PhoneOutgoing,
  BarChart3,
  ShieldCheck,
  Bell,
  CreditCard,
  Building2,
  Plus,
  Zap,
  Moon,
  Sun,
} from "lucide-react";
import { signOutAction } from "@/app/_actions/auth";
import { createWorkspaceAction, listWorkspacesAction } from "@/app/_actions/workspaces";

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Build",
    items: [
      { title: "Agents", url: "/agents", icon: Bot },
      { title: "Knowledge Base", url: "/knowledge-base", icon: BookOpen },
    ],
  },
  {
    label: "Deploy",
    items: [
      { title: "Numbers", url: "/numbers", icon: Phone },
      { title: "Batch Calls", url: "/batch-calls", icon: PhoneOutgoing },
    ],
  },
  {
    label: "Monitor",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Calls", url: "/calls", icon: PhoneIncoming },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
      { title: "QA", url: "/qa", icon: ShieldCheck },
      { title: "Alerts", url: "/alerts", icon: Bell },
    ],
  },
  {
    label: "System",
    items: [
      { title: "Billing", url: "/billing", icon: CreditCard },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
];

function NavLinkItem({ item, onClick, pathname }: { item: NavItem; onClick?: () => void; pathname: string }) {
  const active = pathname === item.url || pathname.startsWith(item.url + "/");
  return (
    <Link
      href={item.url}
      onClick={onClick}
      className={`relative flex items-center gap-2.5 px-3 py-[0.38rem] rounded-lg font-body text-[0.84rem] transition-all duration-150 focus-ring ${
        active
          ? "bg-canvas text-text-strong font-medium shadow-xs"
          : "text-text-subtle hover:text-text-body hover:bg-canvas/50 hover:translate-x-0.5"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3.5 rounded-full bg-foreground/70" />
      )}
      <item.icon className={`w-[0.85rem] h-[0.85rem] shrink-0 ${active ? "text-text-strong" : ""}`} />
      <span>{item.title}</span>
    </Link>
  );
}

function GroupedNav({ onClick, pathname }: { onClick?: () => void; pathname: string }) {
  return (
    <div className="space-y-4">
      {navGroups.map((group) => (
        <div key={group.label}>
          <div className="px-3 mb-1">
            <span className="font-body text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-text-subtle/50">
              {group.label}
            </span>
          </div>
          <div className="space-y-0.5">
            {group.items.map((item) => (
              <NavLinkItem key={item.url} item={item} onClick={onClick} pathname={pathname} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const AppNavRail = ({ user }: { user?: { name?: string | null; email?: string | null; plan?: string | null } }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [wsOpen, setWsOpen] = useState(false);
  const [planHover, setPlanHover] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const [creatingWs, setCreatingWs] = useState(false);
  const [wsName, setWsName] = useState("");
  const [wsError, setWsError] = useState<string | null>(null);
  const [workspaces, setWorkspaces] = useState<{ id: string; name: string; slug: string }[]>([]);
  const [theme, setThemeState] = useState<string>(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "dark";
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const planTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "?";

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = theme === "dark" ? "light" : "dark";
    root.classList.remove("dark", "light");
    root.classList.add(next);
    setThemeState(next);
    try { localStorage.setItem("theme", next); } catch { /* ignore */ }
  }, [theme]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (wsRef.current && !wsRef.current.contains(e.target as Node)) {
        setWsOpen(false);
        setCreatingWs(false);
        setWsName("");
        setWsError(null);
      }
    };
    if (menuOpen || wsOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen, wsOpen]);

  useEffect(() => {
    listWorkspacesAction().then(setWorkspaces);
  }, []);

  const handlePlanEnter = () => {
    if (planTimerRef.current) clearTimeout(planTimerRef.current);
    setPlanHover(true);
  };
  const handlePlanLeave = () => {
    planTimerRef.current = setTimeout(() => setPlanHover(false), 200);
  };

  const handleSignOut = () => {
    setMenuOpen(false);
    setMobileOpen(false);
    signOutAction();
  };

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = wsName.trim();
    if (!name) { setWsError("Name is required"); return; }
    setWsError(null);
    const formData = new FormData();
    formData.set("name", name);
    const result = await createWorkspaceAction(formData);
    if (result?.error) { setWsError(result.error); return; }
    setCreatingWs(false);
    setWsName("");
    setWsOpen(false);
    listWorkspacesAction().then(setWorkspaces);
    router.refresh();
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[220px] shrink-0 h-screen sticky top-0 bg-surface-panel border-r border-border-soft/50 flex-col">
        {/* Logo */}
        <div className="px-3 pt-3 pb-1">
          <Link href="/dashboard" className="flex items-center gap-2 px-2.5">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center shrink-0">
              <span className="font-display text-[0.72rem] font-bold text-primary-foreground leading-none">Y</span>
            </div>
            <span className="font-display text-[0.92rem] font-semibold tracking-[-0.02em] text-text-strong">Yapsolutely</span>
          </Link>
        </div>

        {/* Workspace selector */}
        <div className="relative px-3 pt-1 pb-2" ref={wsRef}>
          <button
            onClick={() => setWsOpen(!wsOpen)}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-canvas/60 transition-colors group"
          >
            <div className="w-7 h-7 rounded-lg bg-foreground/[0.08] flex items-center justify-center shrink-0">
              <Building2 className="w-3.5 h-3.5 text-text-strong" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <span className="font-display text-[0.84rem] font-semibold text-text-strong block truncate">
                {workspaces.length > 0 ? workspaces[0].name : (user?.name ? `${user.name.split(" ")[0]}'s Workspace` : "My Workspace")}
              </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-text-subtle shrink-0 transition-transform duration-200 ${wsOpen ? "rotate-180" : ""}`} />
          </button>

          {wsOpen && (
            <div className="absolute top-full left-3 right-3 mt-1 bg-surface-panel rounded-xl border border-border-soft shadow-popover overflow-hidden z-50">
              <div className="px-3 py-2 border-b border-border-soft/40">
                <span className="font-body text-[0.67rem] text-text-subtle/50 uppercase tracking-[0.12em]">Workspaces</span>
              </div>
              <div className="py-1 max-h-40 overflow-y-auto">
                {workspaces.length > 0 ? workspaces.map((ws) => (
                  <button key={ws.id} className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-canvas/50 transition-colors">
                    <div className="w-6 h-6 rounded-md bg-foreground/[0.08] flex items-center justify-center">
                      <Building2 className="w-3 h-3 text-text-strong" />
                    </div>
                    <span className="font-body text-[0.84rem] text-text-strong truncate">{ws.name}</span>
                  </button>
                )) : (
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 bg-canvas/50">
                    <div className="w-6 h-6 rounded-md bg-foreground/[0.08] flex items-center justify-center">
                      <Building2 className="w-3 h-3 text-text-strong" />
                    </div>
                    <span className="font-body text-[0.84rem] text-text-strong truncate">
                      {user?.name ? `${user.name.split(" ")[0]}'s Workspace` : "My Workspace"}
                    </span>
                  </button>
                )}
              </div>
              <div className="border-t border-border-soft/40 py-1">
                {creatingWs ? (
                  <form onSubmit={handleCreateWorkspace} className="px-3 py-2 space-y-2">
                    <input
                      type="text"
                      value={wsName}
                      onChange={(e) => setWsName(e.target.value)}
                      placeholder="Workspace name"
                      autoFocus
                      className="w-full h-7 px-2.5 rounded-md border border-border-soft bg-canvas font-body text-[0.84rem] text-text-strong placeholder:text-text-subtle/40 focus:outline-none focus:ring-1 focus:ring-text-strong/10"
                    />
                    {wsError && <p className="font-body text-[0.72rem] text-red-500">{wsError}</p>}
                    <div className="flex gap-1.5">
                      <button type="submit" className="flex-1 h-6 rounded-md bg-foreground text-primary-foreground font-body text-[0.79rem] font-medium hover:opacity-90 transition-opacity">Create</button>
                      <button type="button" onClick={() => { setCreatingWs(false); setWsName(""); setWsError(null); }} className="h-6 px-2 rounded-md font-body text-[0.79rem] text-text-subtle hover:bg-canvas transition-colors">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setCreatingWs(true)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-canvas/50 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-text-subtle" />
                    <span className="font-body text-[0.84rem] text-text-subtle">Create workspace</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 py-1 overflow-y-auto">
          <GroupedNav pathname={pathname} />
        </nav>

        {/* Plan indicator with hover details */}
        <div
          className="px-3 pb-2 relative"
          ref={planRef}
          onMouseEnter={handlePlanEnter}
          onMouseLeave={handlePlanLeave}
        >
          <Link
            href="/billing"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-canvas/80 border border-border-soft/40 hover:border-border-soft transition-colors group"
          >
            <div className={`w-2 h-2 rounded-full shrink-0 ${
              user?.plan === "PRO" || user?.plan === "ENTERPRISE" ? "bg-emerald-400" :
              user?.plan === "STARTER" ? "bg-blue-400" : "bg-amber-400 animate-pulse"
            }`} />
            <div className="flex-1 min-w-0">
              <span className="font-body text-[0.72rem] font-medium text-text-strong block truncate">
                {user?.plan === "PRO" ? "Pro plan" :
                 user?.plan === "ENTERPRISE" ? "Enterprise" :
                 user?.plan === "STARTER" ? "Starter plan" : "Free trial"}
              </span>
              <span className="font-body text-[0.62rem] text-text-subtle/60 block">
                {user?.plan === "PRO" || user?.plan === "ENTERPRISE" ? "Active subscription" :
                 user?.plan === "STARTER" ? "Basic features" : "Upgrade for more"}
              </span>
            </div>
          </Link>

          {/* Hover popover */}
          {planHover && (
            <div className="absolute bottom-full left-3 right-3 mb-1.5 bg-surface-panel rounded-xl border border-border-soft shadow-popover overflow-hidden z-50 animate-fade-in">
              <div className="px-4 py-3 border-b border-border-soft/40">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className={`w-3.5 h-3.5 ${
                    user?.plan === "PRO" || user?.plan === "ENTERPRISE" ? "text-emerald-400" :
                    user?.plan === "STARTER" ? "text-blue-400" : "text-amber-400"
                  }`} />
                  <span className="font-display text-[0.84rem] font-semibold text-text-strong">
                    {user?.plan === "PRO" ? "Pro Plan" :
                     user?.plan === "ENTERPRISE" ? "Enterprise" :
                     user?.plan === "STARTER" ? "Starter Plan" : "Free Trial"}
                  </span>
                </div>
              </div>
              <div className="px-4 py-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-body text-[0.77rem] text-text-subtle">Remaining Balance</span>
                  <span className="font-mono text-[0.84rem] font-semibold text-text-strong">
                    {user?.plan === "FREE_TRIAL" ? "$10.00" :
                     user?.plan === "STARTER" ? "$25.00" :
                     user?.plan === "PRO" ? "$100.00" : "$500.00"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-[0.77rem] text-text-subtle">Concurrency</span>
                  <span className="font-mono text-[0.84rem] text-text-strong">
                    0 / {user?.plan === "FREE_TRIAL" ? "5" :
                         user?.plan === "STARTER" ? "10" :
                         user?.plan === "PRO" ? "20" : "100"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-[0.77rem] text-text-subtle">Agents</span>
                  <span className="font-mono text-[0.84rem] text-text-strong">
                    {user?.plan === "FREE_TRIAL" ? "3 max" :
                     user?.plan === "STARTER" ? "10 max" :
                     user?.plan === "PRO" ? "50 max" : "Unlimited"}
                  </span>
                </div>
              </div>
              {(!user?.plan || user.plan === "FREE_TRIAL" || user.plan === "STARTER") && (
                <div className="px-4 pb-3">
                  <Link
                    href="/billing"
                    className="block w-full text-center font-display text-[0.79rem] font-medium px-3 py-1.5 rounded-lg bg-foreground text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    {user?.plan === "STARTER" ? "Upgrade to Pro" : "Add Payment Method"}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Account footer */}
        <div className="relative px-3 pb-3 pt-2 border-t border-border-soft/40" ref={menuRef}>
          {menuOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-1.5 bg-surface-panel rounded-xl border border-border-soft shadow-popover overflow-hidden z-50">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 font-body text-[0.87rem] text-text-body hover:bg-surface-subtle transition-colors"
              >
                {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-text-subtle" /> : <Moon className="w-3.5 h-3.5 text-text-subtle" />}
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
              <div className="border-t border-border-soft/50" />
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 font-body text-[0.87rem] text-text-body hover:bg-surface-subtle transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-text-subtle" />
                Sign out
              </button>
            </div>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Account menu"
            aria-expanded={menuOpen}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors focus-ring ${
              menuOpen ? "bg-canvas" : "hover:bg-canvas/60"
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-foreground/[0.06] flex items-center justify-center shrink-0">
              <span className="font-display text-[0.77rem] font-semibold text-text-strong">{initials}</span>
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="font-body text-[0.89rem] font-medium text-text-strong truncate">{user?.name ?? "User"}</div>
              <div className="font-body text-[0.67rem] text-text-subtle truncate">{user?.email ?? ""}</div>
            </div>
            <ChevronUp className={`w-3.5 h-3.5 text-text-subtle shrink-0 transition-transform duration-200 ${menuOpen ? "" : "rotate-180"}`} />
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-surface-panel/95 backdrop-blur-lg border-b border-border-soft">
        <div className="flex items-center justify-between h-14 px-4">
          <Link href="/dashboard" className="flex items-center">
            <span className="font-display text-[1.1rem] font-semibold tracking-[-0.02em] text-text-strong">
              Yapsolutely
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-subtle transition-colors text-text-subtle hover:text-text-strong"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              className="p-2 rounded-lg hover:bg-canvas transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5 text-text-strong" /> : <Menu className="w-5 h-5 text-text-strong" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-out nav */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} role="presentation" />
          <div className="absolute top-14 left-0 right-0 bg-surface-panel border-b border-border-soft shadow-xl max-h-[calc(100vh-3.5rem)] overflow-y-auto animate-slide-down">
            <nav className="px-4 py-3">
              <GroupedNav onClick={() => setMobileOpen(false)} pathname={pathname} />
            </nav>
            <div className="border-t border-border-soft/40 px-4 py-3">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-full bg-foreground/[0.07] flex items-center justify-center shrink-0">
                  <span className="font-display text-[0.77rem] font-semibold text-text-strong">{initials}</span>
                </div>
                <div className="min-w-0">
                  <div className="font-body text-[0.84rem] font-medium text-text-strong truncate">{user?.name ?? "User"}</div>
                  <div className="font-body text-[0.77rem] text-text-subtle truncate">{user?.email ?? ""}</div>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 font-body text-[0.87rem] text-text-subtle hover:text-text-body transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppNavRail;
