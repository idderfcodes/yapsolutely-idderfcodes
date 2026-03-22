"use client";

import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

type CallEvent = {
  id: string;
  role: string;
  sequence: number;
  text: string | null;
  createdAt: string;
};

type CallDetail = {
  id: string;
  callerNumber: string | null;
  toNumber: string | null;
  status: string;
  durationSeconds: number | null;
  summary: string | null;
  transcriptText: string | null;
  createdAt: string;
  startedAt: string | null;
  endedAt: string | null;
  agentName: string | null;
  phoneNumber: string | null;
  events: CallEvent[];
};

function formatDuration(seconds: number | null): string {
  if (seconds == null) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatTime(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    QUEUED: "Queued",
    RINGING: "Ringing",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
    FAILED: "Failed",
    BUSY: "Busy",
    NO_ANSWER: "No answer",
    CANCELED: "Canceled",
  };
  return map[status] ?? status;
}

const statusStyle = (status: string) => {
  switch (status) {
    case "FAILED":
    case "NO_ANSWER":
    case "BUSY":
    case "CANCELED":
      return "text-text-subtle bg-surface-subtle";
    case "IN_PROGRESS":
    case "RINGING":
      return "text-emerald-600 bg-emerald-400/10";
    default:
      return "text-text-subtle/70 bg-surface-subtle";
  }
};

const speakerStyle = (role: string) => {
  switch (role) {
    case "AGENT":
      return { label: "Agent", labelClass: "text-text-strong", bgClass: "" };
    case "USER":
      return { label: "Caller", labelClass: "text-text-body", bgClass: "" };
    case "TOOL":
      return { label: "System", labelClass: "text-accent-warm-dim", bgClass: "bg-accent-warm/[0.04] border border-accent-warm/10 rounded-lg px-3 sm:px-4 py-3" };
    case "SYSTEM":
      return { label: "System", labelClass: "text-text-subtle/60", bgClass: "bg-surface-subtle/60 rounded-lg px-3 sm:px-4 py-3" };
    default:
      return { label: role, labelClass: "text-text-subtle", bgClass: "" };
  }
};

export default function CallDetailClient({ call }: { call: CallDetail }) {
  const toolEvents = call.events.filter((e) => e.role === "TOOL");

  return (
    <DashboardLayout>
      <div className="p-5 sm:p-8 max-w-[1100px]">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <Link href="/calls" className="inline-flex items-center gap-1.5 font-body text-[0.75rem] text-text-subtle hover:text-text-body transition-colors mb-3">
              <ArrowLeft className="w-3.5 h-3.5" />Back to calls
            </Link>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-display text-[1.3rem] sm:text-[1.5rem] font-semibold tracking-[-0.025em] text-text-strong">{call.id.slice(0, 8)}</h1>
              <span className={`inline-flex px-2.5 py-0.5 rounded-md text-[0.7rem] font-body font-medium ${statusStyle(call.status)}`}>{statusLabel(call.status)}</span>
            </div>
            <p className="font-body text-[0.82rem] text-text-subtle">
              {call.agentName ? `Handled by ${call.agentName}` : "Call detail"}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" className="font-body text-text-subtle text-[0.78rem] gap-1.5">
              <Download className="w-3.5 h-3.5" /><span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>

        <div className="bg-surface-panel rounded-card border border-border-soft p-4 sm:p-5 mb-6 overflow-x-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-y-4 gap-x-4 sm:gap-x-6 min-w-0">
            {[
              { label: "Caller", value: call.callerNumber ?? "Unknown", mono: true },
              { label: "Destination", value: call.toNumber ?? "—", mono: true },
              { label: "Agent", value: call.agentName ?? "—", mono: false },
              { label: "Duration", value: formatDuration(call.durationSeconds), mono: true },
              { label: "Started", value: formatTime(call.startedAt ?? call.createdAt), mono: false },
              { label: "Ended", value: formatTime(call.endedAt), mono: false },
              { label: "Date", value: formatDate(call.createdAt), mono: false },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-body text-[0.6rem] text-text-subtle uppercase tracking-[0.12em] mb-1">{item.label}</div>
                <div className={`text-[0.78rem] sm:text-[0.8rem] text-text-strong ${item.mono ? "font-mono text-[0.72rem] sm:text-[0.75rem]" : "font-body"}`}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2">
            <div className="bg-surface-panel rounded-card border border-border-soft overflow-hidden">
              <div className="px-4 sm:px-5 py-4 border-b border-border-soft">
                <h3 className="font-display text-sm font-medium text-text-strong">Transcript</h3>
              </div>
              <div className="p-4 sm:p-5 space-y-1">
                {call.events.length > 0 ? (
                  call.events.map((event) => {
                    const style = speakerStyle(event.role);
                    const isConversation = event.role === "AGENT" || event.role === "USER";
                    return (
                      <div key={event.id} className={`${style.bgClass} ${isConversation ? "py-2.5" : "my-2"}`}>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <span className="font-mono text-[0.6rem] text-text-subtle/40 w-7 sm:w-8 shrink-0 pt-0.5 text-right">{event.sequence}</span>
                          <div className="flex-1 min-w-0">
                            <span className={`font-body text-[0.68rem] font-medium ${style.labelClass} mr-2`}>{style.label}</span>
                            <span className={`font-body text-[0.78rem] sm:text-[0.82rem] leading-[1.65] ${event.role === "TOOL" || event.role === "SYSTEM" ? "text-text-subtle" : "text-text-body"}`}>{event.text ?? ""}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : call.transcriptText ? (
                  <p className="font-body text-[0.82rem] text-text-body leading-[1.7] whitespace-pre-wrap">{call.transcriptText}</p>
                ) : (
                  <p className="font-body text-[0.82rem] text-text-subtle">No transcript available.</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {call.summary && (
              <div className="bg-surface-panel rounded-card border border-border-soft">
                <div className="px-4 sm:px-5 py-4 border-b border-border-soft">
                  <h3 className="font-display text-sm font-medium text-text-strong">Summary</h3>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="font-body text-[0.8rem] text-text-body leading-[1.7]">{call.summary}</p>
                </div>
              </div>
            )}

            {toolEvents.length > 0 && (
              <div className="bg-surface-panel rounded-card border border-border-soft">
                <div className="px-4 sm:px-5 py-4 border-b border-border-soft">
                  <h3 className="font-display text-sm font-medium text-text-strong">Tool actions</h3>
                </div>
                <div className="p-4 space-y-2">
                  {toolEvents.map((e) => (
                    <div key={e.id} className="p-3 rounded-lg bg-surface-subtle/50">
                      <p className="font-body text-[0.7rem] text-text-subtle leading-relaxed">{e.text}</p>
                      <span className="font-mono text-[0.6rem] text-text-subtle/40 mt-1 block">seq {e.sequence}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-surface-panel rounded-card border border-border-soft">
              <div className="px-4 sm:px-5 py-4 border-b border-border-soft">
                <h3 className="font-display text-sm font-medium text-text-strong">Routing</h3>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { label: "Agent", value: call.agentName ?? "—" },
                  { label: "Number", value: call.phoneNumber ?? call.toNumber ?? "—" },
                  { label: "Status", value: statusLabel(call.status) },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1 px-1">
                    <span className="font-body text-[0.72rem] text-text-subtle">{item.label}</span>
                    <span className="font-body text-[0.72rem] text-text-body">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
