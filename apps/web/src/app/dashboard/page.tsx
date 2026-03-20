import { ConsoleShell } from "@/components/console-shell";
import { requireSession } from "@/lib/auth";
import { getDashboardMetrics } from "@/lib/dashboard-data";
import Link from "next/link";

function statusPillClassName(status: string) {
  switch (status) {
    case "COMPLETED":
      return "border-emerald-400/20 bg-emerald-500/10 text-emerald-100";
    case "IN_PROGRESS":
    case "RINGING":
    case "QUEUED":
      return "border-sky-400/20 bg-sky-500/10 text-sky-100";
    case "BUSY":
    case "NO_ANSWER":
    case "CANCELED":
      return "border-amber-400/20 bg-amber-500/10 text-amber-100";
    default:
      return "border-rose-400/20 bg-rose-500/10 text-rose-100";
  }
}

export default async function DashboardPage() {
  const session = await requireSession();
  const metrics = await getDashboardMetrics(session.email);

  return (
    <ConsoleShell
      eyebrow="Dashboard"
      title="Monitor the whole voice stack from one place."
      description="This will become the operator view for agent health, assigned numbers, recent calls, and quick actions."
      userEmail={session.email}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Active agents", String(metrics.activeAgents), "Agents marked active in the data layer."],
          ["Assigned numbers", String(metrics.assignedNumbers), "Phone numbers currently mapped to agents."],
          ["Calls today", String(metrics.callsToday), "Calls created since the start of the current day."],
          ["Tool actions today", String(metrics.toolActionsToday), "Runtime actions recorded in the call timeline today."],
          ["Completed calls", String(metrics.completedCalls), "Calls that reached a completed end state."],
          ["Needs attention", String(metrics.failedCalls), "Calls that ended failed, canceled, busy, or unanswered."],
          ["Runtime status", metrics.runtimeStatus, metrics.runtimeNote],
        ].map(([label, value, note]) => (
          <article key={label} className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{note}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent call proof</h2>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                The newest persisted call records, including status and whether runtime tools fired during the call.
              </p>
            </div>
            <Link href="/calls" className="text-sm font-medium text-violet-100 underline underline-offset-4">
              Open all calls
            </Link>
          </div>

          {metrics.recentCalls.length === 0 ? (
            <p className="mt-4 text-sm leading-6 text-slate-300">
              No recent calls yet. Once the runtime persists activity, the freshest proof of execution will appear here.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {metrics.recentCalls.map((call) => (
                <Link
                  key={call.id}
                  href={`/calls/${call.id}`}
                  className="block rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 transition hover:bg-violet-500/5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{call.callerNumber || "Unknown caller"}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {call.agentName || "Unassigned agent"} • {call.createdAt.toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${statusPillClassName(call.status)}`}
                    >
                      {call.status.replaceAll("_", " ")}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-300">
                    <span>Duration: {call.durationSeconds ? `${call.durationSeconds}s` : "—"}</span>
                    <span>Runtime actions: {call.toolEvents}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </article>

        <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent runtime actions</h2>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                The latest tool activity recorded from live or mock calls.
              </p>
            </div>
            <Link href="/calls" className="text-sm font-medium text-violet-100 underline underline-offset-4">
              Review transcripts
            </Link>
          </div>

          {metrics.recentToolEvents.length === 0 ? (
            <p className="mt-4 text-sm leading-6 text-slate-300">
              No runtime actions recorded yet. Tool events like lead capture and SMS confirmation will show up here.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {metrics.recentToolEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/calls/${event.callId}`}
                  className="block rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 transition hover:bg-violet-500/5"
                >
                  <p className="font-medium text-white">{event.text || "Runtime tool action recorded"}</p>
                  <p className="mt-2 text-sm text-slate-300">
                    {event.agentName || "Unknown agent"} • {event.callerNumber || "Unknown caller"}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{event.createdAt.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          )}
        </article>
      </div>
    </ConsoleShell>
  );
}
