"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ShieldCheck, CheckCircle2, AlertTriangle } from "lucide-react";
import type { QASummary } from "@/lib/qa-data";
import Link from "next/link";

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

type Filter = "all" | "flagged" | "passed";

export default function QAClient({ data }: { data: QASummary }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredCalls =
    filter === "all"
      ? data.calls
      : data.calls.filter((c) => c.status === filter);

  const metrics = [
    { label: "Reviewed", value: data.totalReviewed.toString(), sub: "Calls scored" },
    { label: "Passed", value: data.passed.toString(), sub: "Met criteria" },
    { label: "Flagged", value: data.flagged.toString(), sub: "Needs review" },
    { label: "Avg Score", value: data.totalReviewed > 0 ? `${data.avgScore}` : "—", sub: "Out of 100" },
  ];

  return (
    <DashboardLayout>
      <div className="p-5 sm:p-6 lg:p-8 max-w-[1100px]">
        {/* ── Header ── */}
        <div className="mb-5">
          <h1 className="font-display text-[1.38rem] font-semibold tracking-[-0.02em] text-text-strong">
            Quality Assurance
          </h1>
          <p className="font-body text-[0.89rem] text-text-subtle mt-0.5">
            Review agent performance and flag issues.
          </p>
        </div>

        {/* ── Metrics strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="bg-surface-panel rounded-lg border border-border-soft/60 px-4 py-3 stagger-item"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="font-body text-[0.67rem] text-text-subtle/70 uppercase tracking-[0.1em] mb-0.5">
                {m.label}
              </div>
              <div className="font-mono text-[1.15rem] font-semibold text-text-strong">
                {m.value}
              </div>
              <div className="font-body text-[0.67rem] text-text-subtle/50 mt-0.5">
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* ── Review queue ── */}
        {data.calls.length > 0 ? (
          <div className="bg-surface-panel rounded-card border border-border-soft overflow-hidden">
            <div className="px-4 py-3 border-b border-border-soft/60 flex items-center justify-between">
              <h3 className="font-display text-[0.89rem] font-medium text-text-strong">
                Review Queue
              </h3>
              <div className="flex items-center gap-1.5">
                {(["all", "flagged", "passed"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`font-body text-[0.8rem] px-2 py-0.5 rounded capitalize ${
                      filter === tab
                        ? "bg-foreground text-primary-foreground"
                        : "text-text-subtle hover:text-text-body"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-soft/40">
                    {["Agent", "Caller", "Score", "Duration", "Status", "Date"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left font-body text-[0.79rem] text-text-subtle/60 uppercase tracking-[0.08em] pl-4 pr-3 py-2"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredCalls.map((call) => (
                    <tr
                      key={call.callId}
                      className="border-b border-border-soft/30 last:border-0 hover:bg-surface-elevated/30 transition-colors"
                    >
                      <td className="pl-4 pr-3 py-2.5">
                        <Link
                          href={`/calls/${call.callId}`}
                          className="font-body text-[0.87rem] text-text-strong hover:underline"
                        >
                          {call.agentName}
                        </Link>
                      </td>
                      <td className="pl-4 pr-3 py-2.5 font-mono text-[0.82rem] text-text-body">
                        {call.callerNumber || "—"}
                      </td>
                      <td className="pl-4 pr-3 py-2.5">
                        <span
                          className={`font-mono text-[0.89rem] font-semibold ${
                            call.score >= 80
                              ? "text-emerald-400"
                              : call.score >= 60
                                ? "text-amber-400"
                                : "text-red-400"
                          }`}
                        >
                          {call.score}
                        </span>
                      </td>
                      <td className="pl-4 pr-3 py-2.5 font-mono text-[0.82rem] text-text-body">
                        {call.durationSeconds > 0
                          ? formatDuration(call.durationSeconds)
                          : "—"}
                      </td>
                      <td className="pl-4 pr-3 py-2.5">
                        {call.status === "passed" ? (
                          <span className="inline-flex items-center gap-1 font-body text-[0.79rem] text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" /> Passed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-body text-[0.79rem] text-amber-400">
                            <AlertTriangle className="w-3 h-3" /> Flagged
                          </span>
                        )}
                      </td>
                      <td className="pl-4 pr-3 py-2.5 font-body text-[0.82rem] text-text-subtle">
                        {new Date(call.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-surface-panel rounded-card border border-border-soft px-6 py-10 text-center">
            <ShieldCheck className="w-5 h-5 text-text-subtle/30 mx-auto mb-2" />
            <h3 className="font-display text-[1.02rem] font-medium text-text-strong mb-0.5">
              No reviews yet
            </h3>
            <p className="font-body text-[0.89rem] text-text-subtle max-w-xs mx-auto">
              QA reviews evaluate completed calls against quality criteria.
              Results appear after calls are processed.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
