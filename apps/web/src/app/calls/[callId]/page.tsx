import Link from "next/link";
import { ConsoleShell } from "@/components/console-shell";
import { requireSession } from "@/lib/auth";
import { getCallByIdForUser } from "@/lib/call-data";

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function formatDateTime(value: Date | string | null | undefined) {
  if (!value) {
    return "—";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString();
}

function formatLabel(value: string) {
  return value.replaceAll("_", " ").replaceAll("-", " ");
}

function formatValue(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "string") {
    return value.trim() || null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : null;
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    const items = value.map((item) => formatValue(item)).filter(Boolean);
    return items.length ? items.join(", ") : null;
  }

  if (isRecord(value)) {
    const entries = Object.entries(value)
      .map(([key, nestedValue]) => {
        const formatted = formatValue(nestedValue);
        return formatted ? `${formatLabel(key)}: ${formatted}` : null;
      })
      .filter(Boolean);

    return entries.length ? entries.join(" • ") : null;
  }

  return String(value);
}

function rolePillClassName(role: string) {
  switch (role) {
    case "AGENT":
      return "border-violet-400/30 bg-violet-500/10 text-violet-100";
    case "USER":
      return "border-sky-400/30 bg-sky-500/10 text-sky-100";
    case "TOOL":
      return "border-emerald-400/30 bg-emerald-500/10 text-emerald-100";
    default:
      return "border-white/10 bg-white/[0.04] text-slate-200";
  }
}

function outcomePillClassName(status: "success" | "warning" | "error") {
  switch (status) {
    case "success":
      return "border-emerald-400/30 bg-emerald-500/10 text-emerald-100";
    case "warning":
      return "border-amber-400/30 bg-amber-500/10 text-amber-100";
    default:
      return "border-rose-400/30 bg-rose-500/10 text-rose-100";
  }
}

function buildEventDetails(payload: unknown) {
  if (!isRecord(payload)) {
    return [] as Array<{ label: string; value: string }>;
  }

  const details: Array<{ label: string; value: string }> = [];
  const push = (label: string, value: unknown) => {
    const formatted = formatValue(value);

    if (formatted) {
      details.push({ label, value: formatted });
    }
  };

  push("Type", payload.type);
  push("Tool", payload.toolName);
  push("Source", payload.source);
  push("Confidence", payload.confidence);
  push("To", payload.to);
  push("From", payload.from);
  push("SID", payload.sid);
  push("Reason", payload.reason);
  push("Error", payload.message);

  if (isRecord(payload.lead)) {
    push("Lead name", payload.lead.fullName);
    push("Lead email", payload.lead.email);
    push("Lead service", payload.lead.service);
    push("Lead time", payload.lead.preferredDateTime);
    push("Lead notes", payload.lead.notes);
    push("Lead caller", payload.lead.callerNumber);
  }

  return details;
}

function inferToolOutcomeStatus(text: string | null | undefined, payload: unknown) {
  const normalizedText = (text || "").toLowerCase();
  const hasErrorMessage = isRecord(payload) && typeof payload.message === "string";

  if (
    normalizedText.includes("failed") ||
    normalizedText.includes("could not") ||
    normalizedText.includes("missing") ||
    hasErrorMessage
  ) {
    return "error" as const;
  }

  if (normalizedText.includes("queued")) {
    return "warning" as const;
  }

  return "success" as const;
}

type CallDetailPageProps = {
  params: Promise<{
    callId: string;
  }>;
};

export default async function CallDetailPage({ params }: CallDetailPageProps) {
  const session = await requireSession();
  const { callId } = await params;
  const call = await getCallByIdForUser(session.email, callId);

  const metadata = call && isRecord(call.metadata) ? call.metadata : null;
  const latestLeadCapture = metadata && isRecord(metadata.latestLeadCapture) ? metadata.latestLeadCapture : null;
  const toolEvents = call?.events.filter((event) => event.role === "TOOL") ?? [];

  return (
    <ConsoleShell
      eyebrow="Call detail"
      title={call?.agent?.name ? `${call.agent.name} call` : `Call ${callId}`}
      description="Review the full conversation, inspect runtime actions, and verify what the agent actually did behind the scenes during the call."
      userEmail={session.email}
    >
      {call ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Status</p>
              <div className="mt-3">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${rolePillClassName(call.status === "COMPLETED" ? "TOOL" : call.status === "IN_PROGRESS" ? "USER" : "SYSTEM")}`}
                >
                  {call.status.replaceAll("_", " ")}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300">Started {formatDateTime(call.startedAt || call.createdAt)}</p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Caller</p>
              <p className="mt-3 text-lg font-semibold text-white">{call.callerNumber || "Unknown"}</p>
              <p className="mt-2 text-sm text-slate-300">To {call.toNumber || call.phoneNumber?.phoneNumber || "Unknown"}</p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Duration</p>
              <p className="mt-3 text-lg font-semibold text-white">
                {call.durationSeconds ? `${call.durationSeconds}s` : "Still processing"}
              </p>
              <p className="mt-2 text-sm text-slate-300">{call.events.length} timeline events recorded</p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Runtime actions</p>
              <p className="mt-3 text-lg font-semibold text-white">{toolEvents.length}</p>
              <p className="mt-2 text-sm text-slate-300">
                {toolEvents.length > 0
                  ? "Tool activity was recorded during this call."
                  : "No runtime tools were triggered on this call."}
              </p>
            </article>
          </div>

          {toolEvents.length > 0 || latestLeadCapture ? (
            <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Action outcomes</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Runtime tools, captured lead details, and other behind-the-scenes actions from this call.
                  </p>
                </div>
                {latestLeadCapture ? (
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Latest lead captured {formatDateTime(formatValue(latestLeadCapture.capturedAt))}
                  </p>
                ) : null}
              </div>

              {latestLeadCapture ? (
                <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">
                      Latest lead capture
                    </h3>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-100">
                      Captured
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3 text-sm text-slate-200">
                    <p>Name: {formatValue(latestLeadCapture.fullName) || "—"}</p>
                    <p>Email: {formatValue(latestLeadCapture.email) || "—"}</p>
                    <p>Service: {formatValue(latestLeadCapture.service) || "—"}</p>
                    <p>Requested time: {formatValue(latestLeadCapture.preferredDateTime) || "—"}</p>
                    <p>Caller number: {formatValue(latestLeadCapture.callerNumber) || "—"}</p>
                    <p>Captured at: {formatDateTime(formatValue(latestLeadCapture.capturedAt))}</p>
                  </div>
                  {formatValue(latestLeadCapture.notes) ? (
                    <p className="mt-3 text-sm leading-6 text-slate-300">Notes: {formatValue(latestLeadCapture.notes)}</p>
                  ) : null}
                </div>
              ) : null}

              {toolEvents.length > 0 ? (
                <div className="mt-4 grid gap-4 xl:grid-cols-2">
                  {toolEvents.map((event) => {
                    const payload = isRecord(event.payload) ? event.payload : null;
                    const status = inferToolOutcomeStatus(event.text, payload);
                    const toolName = typeof payload?.toolName === "string" ? payload.toolName : "runtime_action";
                    const details = buildEventDetails(payload);

                    return (
                      <div key={event.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-sm font-semibold text-white">{formatLabel(toolName)}</span>
                          <span
                            className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${outcomePillClassName(status)}`}
                          >
                            {status}
                          </span>
                          <span className="text-xs text-slate-400">{formatDateTime(event.createdAt)}</span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-200">{event.text || "Tool event recorded."}</p>
                        {details.length > 0 ? (
                          <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                            {details.map((detail) => (
                              <div key={`${event.id}-${detail.label}`}>
                                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                  {detail.label}
                                </dt>
                                <dd className="mt-1 text-slate-200">{detail.value}</dd>
                              </div>
                            ))}
                          </dl>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </article>
          ) : null}

          <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Transcript timeline</h2>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  A chronological view of caller speech, assistant replies, runtime actions, and system events.
                </p>
              </div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{call.events.length} total events</p>
            </div>
            {call.events.length === 0 ? (
              <p className="mt-2 text-sm leading-6 text-slate-300">
                No transcript events recorded yet. The runtime event API is now ready to populate this timeline.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {call.events.map((event) => {
                  const details = buildEventDetails(event.payload);

                  return (
                    <div key={event.id} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${rolePillClassName(event.role)}`}
                          >
                            {event.role}
                          </span>
                          <span className="text-xs text-slate-400">#{event.sequence}</span>
                          <span className="text-xs text-slate-500">{formatDateTime(event.createdAt)}</span>
                        </div>
                        {event.startedAt || event.endedAt ? (
                          <span className="text-xs text-slate-500">
                            {event.startedAt ? formatDateTime(event.startedAt) : "—"}
                            {event.endedAt ? ` → ${formatDateTime(event.endedAt)}` : ""}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-200">{event.text || "No text payload"}</p>
                      {details.length > 0 ? (
                        <dl className="mt-4 grid gap-3 text-sm md:grid-cols-2 xl:grid-cols-3">
                          {details.map((detail) => (
                            <div key={`${event.id}-${detail.label}`}>
                              <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                {detail.label}
                              </dt>
                              <dd className="mt-1 text-slate-200">{detail.value}</dd>
                            </div>
                          ))}
                        </dl>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </article>

          <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
            <h2 className="text-lg font-semibold text-white">Call metadata</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2 text-sm text-slate-300">
              <p>Status: {call.status}</p>
              <p>Caller: {call.callerNumber || "Unknown"}</p>
              <p>To: {call.toNumber || call.phoneNumber?.phoneNumber || "Unknown"}</p>
              <p>Agent: {call.agent?.name || "Unassigned"}</p>
              <p>Duration: {call.durationSeconds ? `${call.durationSeconds}s` : "—"}</p>
              <p>External call ID: {call.externalCallId || "—"}</p>
              <p>Answered: {formatDateTime(call.answeredAt)}</p>
              <p>Ended: {formatDateTime(call.endedAt)}</p>
            </div>

            {call.summary ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Summary</h3>
                <p className="mt-2 text-sm leading-6 text-slate-200">{call.summary}</p>
              </div>
            ) : null}

            {call.transcriptText ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Transcript text</h3>
                <pre className="mt-2 whitespace-pre-wrap rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-slate-200">
                  {call.transcriptText}
                </pre>
              </div>
            ) : null}

            {metadata ? (
              <div className="mt-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Runtime metadata</h3>
                <pre className="mt-2 whitespace-pre-wrap rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-slate-200">
                  {JSON.stringify(metadata, null, 2)}
                </pre>
              </div>
            ) : null}
          </article>
        </div>
      ) : (
        <div className="space-y-4">
          <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
            <h2 className="text-lg font-semibold text-white">Call not found</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              This call either does not exist for the current session user or the database is not configured yet.
            </p>
          </article>
        </div>
      )}

      <div className="mt-6">
        <Link href="/calls" className="text-sm font-medium text-violet-100 underline underline-offset-4">
          Back to calls
        </Link>
      </div>
    </ConsoleShell>
  );
}