"use client";

import Link from "next/link";
import { Bot, Phone, PhoneIncoming, Settings, ArrowRight, Zap } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

type RecentCall = {
  id: string;
  callerNumber: string | null;
  status: string;
  createdAt: string;
  durationSeconds: number | null;
  agentName: string | null;
  toolEvents: number;
};

type DashboardProps = {
  metrics: {
    activeAgents: number;
    assignedNumbers: number;
    callsToday: number;
    completedCalls: number;
    failedCalls: number;
    toolActionsToday: number;
    runtimeStatus: string;
    recentCalls: RecentCall[];
  };
};

function formatDuration(seconds: number | null): string {
  if (seconds == null) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const statusStyle = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "text-emerald-600 bg-emerald-400/10";
    case "FAILED":
    case "NO_ANSWER":
    case "BUSY":
      return "text-text-subtle bg-surface-subtle";
    case "IN_PROGRESS":
    case "RINGING":
      return "text-emerald-600 bg-emerald-400/10";
    default:
      return "text-text-subtle/70 bg-surface-subtle";
  }
};

const statusLabel = (s: string): string => {
  const map: Record<string, string> = {
    COMPLETED: "Completed",
    IN_PROGRESS: "In progress",
    FAILED: "Failed",
    NO_ANSWER: "No answer",
    RINGING: "Ringing",
    QUEUED: "Queued",
    BUSY: "Busy",
    CANCELED: "Canceled",
  };
  return map[s] ?? s;
};

export default function DashboardHome({ metrics }: DashboardProps) {
  const cards = [
    { label: "Active agents", value: metrics.activeAgents, icon: Bot, href: "/agents" },
    { label: "Assigned numbers", value: metrics.assignedNumbers, icon: Phone, href: "/numbers" },
    { label: "Calls today", value: metrics.callsToday, icon: PhoneIncoming, href: "/calls" },
    { label: "Tool actions today", value: metrics.toolActionsToday, icon: Zap, href: "/calls" },
  ];

  return (
    <DashboardLayout>
      <div className="p-5 sm:p-8 max-w-[1200px]">
        <div className="mb-8">
          <h1 className="font-display text-[1.5rem] font-semibold tracking-[-0.025em] text-text-strong mb-1">Dashboard</h1>
          <p className="font-body text-[0.82rem] text-text-subtle">Overview of your workspace activity.</p>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <Link key={card.label} href={card.href} className="bg-surface-panel rounded-card border border-border-soft p-5 hover:bg-surface-subtle/40 transition-colors group">
              <div className="flex items-center justify-between mb-3">
                <card.icon className="w-4 h-4 text-text-subtle" />
                <ArrowRight className="w-3 h-3 text-text-subtle/0 group-hover:text-text-subtle/60 transition-colors" />
              </div>
              <div className="font-mono text-[1.3rem] font-semibold text-text-strong mb-0.5">{card.value}</div>
              <div className="font-body text-[0.7rem] text-text-subtle uppercase tracking-[0.1em]">{card.label}</div>
            </Link>
          ))}
        </div>

        {/* Split: recent calls + quick actions */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2">
            <div className="bg-surface-panel rounded-card border border-border-soft">
              <div className="px-5 py-4 border-b border-border-soft flex items-center justify-between">
                <h3 className="font-display text-sm font-medium text-text-strong">Recent calls</h3>
                <Link href="/calls" className="font-body text-[0.72rem] text-text-subtle hover:text-text-body transition-colors">
                  View all &rarr;
                </Link>
              </div>
              {metrics.recentCalls.length === 0 ? (
                <div className="p-8 text-center">
                  <PhoneIncoming className="w-8 h-8 text-text-subtle/20 mx-auto mb-3" />
                  <p className="font-body text-[0.82rem] text-text-subtle mb-1">No calls yet</p>
                  <p className="font-body text-[0.72rem] text-text-subtle/70">Calls will appear here once your agents start handling conversations.</p>
                </div>
              ) : (
                <div className="divide-y divide-border-soft">
                  {metrics.recentCalls.map((call) => (
                    <Link key={call.id} href={`/calls/${call.id}`} className="px-5 py-3 hover:bg-surface-subtle/40 transition-colors flex items-center justify-between block">
                      <div className="flex items-center gap-3">
                        <Phone className="w-3.5 h-3.5 text-text-subtle/30" />
                        <div>
                          <div className="font-body text-[0.8rem] text-text-body">{call.callerNumber ?? "Unknown"}</div>
                          <div className="font-body text-[0.68rem] text-text-subtle">{call.agentName ?? "—"} · {formatTime(call.createdAt)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[0.72rem] text-text-subtle">{formatDuration(call.durationSeconds)}</span>
                        <span className={`inline-flex px-2 py-0.5 rounded-md text-[0.65rem] font-body font-medium ${statusStyle(call.status)}`}>{statusLabel(call.status)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-5">
            {/* Summary */}
            <div className="bg-surface-panel rounded-card border border-border-soft">
              <div className="px-5 py-4 border-b border-border-soft">
                <h3 className="font-display text-sm font-medium text-text-strong">Call summary</h3>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { label: "Completed", value: metrics.completedCalls },
                  { label: "Failed", value: metrics.failedCalls },
                  { label: "Today", value: metrics.callsToday },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1.5 px-1">
                    <span className="font-body text-[0.78rem] text-text-body">{item.label}</span>
                    <span className="font-mono text-xs text-text-subtle">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-surface-panel rounded-card border border-border-soft">
              <div className="px-5 py-4 border-b border-border-soft">
                <h3 className="font-display text-sm font-medium text-text-strong">Quick actions</h3>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { label: "Create new agent", href: "/agents/new", icon: Bot },
                  { label: "View phone numbers", href: "/numbers", icon: Phone },
                  { label: "Check settings", href: "/settings", icon: Settings },
                ].map((action) => (
                  <Link key={action.label} href={action.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-subtle/60 transition-colors">
                    <action.icon className="w-3.5 h-3.5 text-text-subtle" />
                    <span className="font-body text-[0.78rem] text-text-body">{action.label}</span>
                    <ArrowRight className="w-3 h-3 text-text-subtle/40 ml-auto" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Runtime status */}
            <div className="bg-surface-panel rounded-card border border-border-soft p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${metrics.runtimeStatus === "Online" ? "bg-emerald-400" : "bg-text-subtle/30"}`} />
                <span className="font-body text-[0.78rem] font-medium text-text-strong">Runtime</span>
              </div>
              <p className="font-body text-[0.72rem] text-text-subtle">{metrics.runtimeStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
