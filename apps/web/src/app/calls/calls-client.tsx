"use client";

import { useState, Suspense } from "react";
import { Search, Phone, PhoneIncoming, Download } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EmptyState from "@/components/dashboard/EmptyState";

type CallItem = {
  id: string;
  externalCallId: string | null;
  callerNumber: string | null;
  toNumber: string | null;
  status: string;
  durationSeconds: number | null;
  createdAt: string;
  agentName: string | null;
  transcriptPreview: string | null;
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

function CallsInner({ calls }: { calls: CallItem[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = (() => {
    let result = query.trim()
      ? calls.filter(
          (c) =>
            c.callerNumber?.includes(query) ||
            c.agentName?.toLowerCase().includes(query.toLowerCase()) ||
            c.id.includes(query),
        )
      : calls;
    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }
    return result;
  })();

  const handleExportCsv = () => {
    const headers = ["ID", "Caller", "To", "Agent", "Status", "Duration (s)", "Date", "Transcript Preview"];
    const rows = filtered.map((c) => [
      c.id,
      c.callerNumber ?? "",
      c.toNumber ?? "",
      c.agentName ?? "",
      c.status,
      c.durationSeconds?.toString() ?? "",
      c.createdAt,
      (c.transcriptPreview ?? "").replace(/"/g, '""'),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((v) => `"${v}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `yapsolutely-calls-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="p-5 sm:p-8 max-w-[1200px]">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-[1.5rem] font-semibold tracking-[-0.025em] text-text-strong mb-1">Calls</h1>
            <p className="font-body text-[0.82rem] text-text-subtle">Review conversations, outcomes, and transcripts across all agents.</p>
          </div>
          {calls.length > 0 && (
            <Button onClick={handleExportCsv} variant="outline" size="sm" className="font-body text-[0.78rem] gap-1.5 rounded-lg border-border-soft shrink-0">
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </Button>
          )}
        </div>

        {calls.length === 0 ? (
          <div className="bg-surface-panel rounded-card border border-border-soft">
            <EmptyState
              icon={PhoneIncoming}
              title="No calls yet"
              description="Calls will appear here once your agents are live and handling conversations. Create an agent and assign a number to get started."
              actionLabel="Go to Agents"
              onAction={() => router.push("/agents")}
            />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-subtle" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search calls..."
                  className="w-full h-9 pl-9 pr-3 rounded-lg border border-border-soft bg-surface-panel font-body text-[0.8rem] text-text-strong placeholder:text-text-subtle/50 focus:outline-none focus:ring-1 focus:ring-text-strong/10 transition-shadow"
                />
              </div>
              <div className="flex items-center gap-1.5">
                {["all", "COMPLETED", "IN_PROGRESS", "FAILED"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`h-9 px-3 rounded-lg border font-body text-[0.78rem] transition-all ${
                      statusFilter === s
                        ? "border-foreground bg-foreground text-background"
                        : "border-border-soft bg-surface-panel text-text-subtle hover:text-text-body hover:border-foreground/15"
                    }`}
                  >
                    {s === "all" ? "All" : statusLabel(s)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-2">
                <div className="bg-surface-panel rounded-card border border-border-soft overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border-soft">
                          <th className="text-left px-5 py-2.5 font-body text-[0.65rem] font-medium text-text-subtle uppercase tracking-[0.1em]">Call</th>
                          <th className="text-left px-5 py-2.5 font-body text-[0.65rem] font-medium text-text-subtle uppercase tracking-[0.1em]">Caller</th>
                          <th className="text-left px-5 py-2.5 font-body text-[0.65rem] font-medium text-text-subtle uppercase tracking-[0.1em]">Agent</th>
                          <th className="text-left px-5 py-2.5 font-body text-[0.65rem] font-medium text-text-subtle uppercase tracking-[0.1em]">Duration</th>
                          <th className="text-left px-5 py-2.5 font-body text-[0.65rem] font-medium text-text-subtle uppercase tracking-[0.1em]">Status</th>
                          <th className="text-right px-5 py-2.5 font-body text-[0.65rem] font-medium text-text-subtle uppercase tracking-[0.1em]">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((call) => (
                          <tr key={call.id} onClick={() => router.push(`/calls/${call.id}`)} className="border-b border-border-soft last:border-0 hover:bg-surface-subtle/40 transition-colors cursor-pointer group">
                            <td className="px-5 py-3 font-mono text-xs text-text-subtle">{call.id.slice(0, 8)}</td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                <Phone className="w-3 h-3 text-text-subtle/40" />
                                <span className="font-body text-[0.8rem] text-text-body">{call.callerNumber ?? "Unknown"}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3 font-body text-[0.8rem] text-text-body">{call.agentName ?? "—"}</td>
                            <td className="px-5 py-3 font-mono text-xs text-text-subtle">{formatDuration(call.durationSeconds)}</td>
                            <td className="px-5 py-3">
                              <span className={`inline-flex px-2 py-0.5 rounded-md text-[0.68rem] font-body font-medium ${statusStyle(call.status)}`}>{statusLabel(call.status)}</span>
                            </td>
                            <td className="px-5 py-3 text-right font-body text-[0.75rem] text-text-subtle">{formatTime(call.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="bg-surface-panel rounded-card border border-border-soft">
                  <div className="px-5 py-4 border-b border-border-soft">
                    <h3 className="font-display text-sm font-medium text-text-strong">Call summary</h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {(() => {
                      const completed = calls.filter((c) => c.status === "COMPLETED").length;
                      const inProgress = calls.filter((c) => c.status === "IN_PROGRESS" || c.status === "RINGING").length;
                      const failed = calls.filter((c) => c.status === "FAILED").length;
                      const noAnswer = calls.filter((c) => c.status === "NO_ANSWER" || c.status === "BUSY" || c.status === "CANCELED").length;
                      return [
                        { label: "Completed", count: completed },
                        { label: "In progress", count: inProgress },
                        { label: "Failed", count: failed },
                        { label: "No answer", count: noAnswer },
                      ].map((o) => (
                        <div key={o.label} className="flex items-center justify-between py-1.5 px-1">
                          <span className="font-body text-[0.78rem] text-text-body">{o.label}</span>
                          <span className="font-mono text-xs text-text-subtle">{o.count}</span>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default function CallsClient({ calls }: { calls: CallItem[] }) {
  return (
    <Suspense>
      <CallsInner calls={calls} />
    </Suspense>
  );
}
