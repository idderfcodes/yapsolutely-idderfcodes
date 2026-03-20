import { ConsoleShell } from "@/components/console-shell";
import { requireSession } from "@/lib/auth";
import { listRecentCallsForUser } from "@/lib/call-data";
import Link from "next/link";

const columns = ["Caller", "Agent", "Status", "Duration", "Transcript"];
const statuses = ["ALL", "QUEUED", "RINGING", "IN_PROGRESS", "COMPLETED", "FAILED", "NO_ANSWER", "BUSY", "CANCELED"];

type CallsPageProps = {
  searchParams?: Promise<{
    q?: string;
    status?: string;
  }>;
};

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

export default async function CallsPage({ searchParams }: CallsPageProps) {
  const session = await requireSession();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const query = resolvedSearchParams?.q?.trim() || "";
  const status = resolvedSearchParams?.status?.trim().toUpperCase() || "ALL";
  const calls = await listRecentCallsForUser(session.email, {
    query,
    status: status === "ALL" ? "" : status,
  });
  const hasFilters = Boolean(query || (status && status !== "ALL"));

  return (
    <ConsoleShell
      eyebrow="Calls"
      title="Show the proof after every conversation."
      description="The calls area will list every inbound phone interaction and become the bridge into transcript detail pages."
      userEmail={session.email}
    >
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto]">
        <form className="grid gap-4 rounded-3xl border border-white/10 bg-slate-950/45 p-5 md:grid-cols-[1fr_220px_auto]">
          <label>
            <span className="text-sm font-medium text-slate-200">Search calls</span>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Caller, agent, summary, transcript..."
              className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/40"
            />
          </label>

          <label>
            <span className="text-sm font-medium text-slate-200">Status</span>
            <select
              name="status"
              defaultValue={status}
              className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/40"
            >
              {statuses.map((value) => (
                <option key={value} value={value}>
                  {value === "ALL" ? "All statuses" : value.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end gap-3">
            <button
              type="submit"
              className="rounded-2xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-medium text-violet-100 transition hover:bg-violet-500/25"
            >
              Apply filters
            </button>
            {hasFilters ? (
              <Link
                href="/calls"
                className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-violet-400/35 hover:bg-violet-500/10"
              >
                Clear
              </Link>
            ) : null}
          </div>
        </form>

        <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Visible calls</p>
          <p className="mt-2 text-3xl font-semibold text-white">{calls.length}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {hasFilters
              ? "Filtered to the calls that match the current search criteria."
              : "Latest inbound call records for this workspace session."}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45">
        <div className="grid grid-cols-5 gap-4 border-b border-white/10 px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          {columns.map((column) => (
            <div key={column}>{column}</div>
          ))}
        </div>

        {calls.length === 0 ? (
          <div className="px-5 py-10">
            <h2 className="text-lg font-semibold text-white">
              {hasFilters ? "No calls matched those filters" : "No calls yet"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              {hasFilters
                ? "Try clearing the filters or broadening the search query. The list searches caller numbers, agent names, summaries, and transcript text."
                : "Call records will appear here once the runtime starts writing metadata into the database. This page is ready to become the proof surface after every inbound conversation."}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {hasFilters ? (
                <Link href="/calls" className="text-violet-200 underline underline-offset-4">
                  Reset filters
                </Link>
              ) : null}
              <Link href="/calls/demo-call" className="text-violet-200 underline underline-offset-4">
                Preview call detail state
              </Link>
            </div>
          </div>
        ) : (
          calls.map((call) => (
            <Link
              key={call.id}
              href={`/calls/${call.id}`}
              className="grid grid-cols-5 gap-4 border-b border-white/6 px-5 py-4 text-sm text-slate-200 transition hover:bg-violet-500/5 last:border-b-0"
            >
              <div>
                <div className="font-medium text-white">{call.callerNumber || "Unknown"}</div>
                <div className="mt-1 text-xs text-slate-400">{call.createdAt.toLocaleString()}</div>
              </div>
              <div>{call.agentName || "Unassigned"}</div>
              <div>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusPillClassName(call.status)}`}
                >
                  {call.status.replaceAll("_", " ")}
                </span>
              </div>
              <div>{call.durationSeconds ? `${call.durationSeconds}s` : "—"}</div>
              <div className="text-violet-100">
                {call.transcriptPreview ? `${call.transcriptPreview}${call.transcriptPreview.length >= 120 ? "…" : ""}` : "Open transcript"}
              </div>
            </Link>
          ))
        )}
      </div>
    </ConsoleShell>
  );
}
