import { ConsoleShell } from "@/components/console-shell";
import { requireSession } from "@/lib/auth";
import { getSettingsReadiness } from "@/lib/settings-data";

function statusPillClassName(status: "configured" | "missing") {
  return status === "configured"
    ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
    : "border-amber-400/20 bg-amber-500/10 text-amber-100";
}

function runtimeHealthPillClassName(status: "reachable" | "unreachable" | "skipped") {
  switch (status) {
    case "reachable":
      return "border-emerald-400/20 bg-emerald-500/10 text-emerald-100";
    case "skipped":
      return "border-slate-400/20 bg-slate-500/10 text-slate-200";
    default:
      return "border-amber-400/20 bg-amber-500/10 text-amber-100";
  }
}

function runtimeReadinessPillClassName(status?: string) {
  switch (status) {
    case "ready":
      return "border-emerald-400/20 bg-emerald-500/10 text-emerald-100";
    case "needs_configuration":
      return "border-amber-400/20 bg-amber-500/10 text-amber-100";
    default:
      return "border-slate-400/20 bg-slate-500/10 text-slate-200";
  }
}

export default async function SettingsPage() {
  const session = await requireSession();
  const readiness = await getSettingsReadiness();

  return (
    <ConsoleShell
      eyebrow="Settings"
      title="Provider credentials and platform behavior live here."
      description="Expect environment introspection, Twilio/Deepgram/Anthropic configuration, and future tenant-level controls."
      userEmail={session.email}
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Environment readiness</h2>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                This page tracks whether the repo is still in scaffold mode or ready for real provider wiring and live validation.
              </p>
            </div>
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${readiness.readyForLiveValidation ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100" : "border-amber-400/20 bg-amber-500/10 text-amber-100"}`}
            >
              {readiness.readyForLiveValidation ? "Ready for live validation" : "Credentials still needed"}
            </span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Configured checks</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {readiness.configuredCount}/{readiness.totalCount}
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Runtime mode</p>
              <p className="mt-2 text-3xl font-semibold text-white">{readiness.runtimeMode}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Missing items</p>
              <p className="mt-2 text-3xl font-semibold text-white">{readiness.missingKeys.length}</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">Voice runtime health</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{readiness.runtimeHealth.detail}</p>
              </div>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${runtimeHealthPillClassName(readiness.runtimeHealth.status)}`}
              >
                {readiness.runtimeHealth.status}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
              <span>Configured runtime mode: {readiness.runtimeMode}</span>
              <span>
                Runtime reported mode: {readiness.runtimeHealth.reportedPipelineMode || "unknown"}
              </span>
              <span>Active streams: {readiness.runtimeHealth.activeStreams ?? "—"}</span>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">Voice runtime readiness</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{readiness.runtimeReadiness.detail}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${runtimeHealthPillClassName(readiness.runtimeReadiness.status)}`}
                >
                  {readiness.runtimeReadiness.status}
                </span>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${runtimeReadinessPillClassName(readiness.runtimeReadiness.readinessStatus)}`}
                >
                  {readiness.runtimeReadiness.readinessStatus || "unknown"}
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
              <span>
                Runtime checks: {readiness.runtimeReadiness.configuredCount ?? "—"}/
                {readiness.runtimeReadiness.totalCount ?? "—"}
              </span>
              <span>Runtime → web health: {readiness.runtimeReadiness.webHealthStatus || "unknown"}</span>
              <span>Runtime → web readiness: {readiness.runtimeReadiness.webReadinessStatus || "unknown"}</span>
              <span>
                Runtime says web live-ready: {typeof readiness.runtimeReadiness.webReadyForLiveValidation === "boolean"
                  ? readiness.runtimeReadiness.webReadyForLiveValidation
                    ? "yes"
                    : "no"
                  : "unknown"}
              </span>
            </div>

            {readiness.runtimeReadiness.missingKeys && readiness.runtimeReadiness.missingKeys.length > 0 ? (
              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Runtime missing keys
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {readiness.runtimeReadiness.missingKeys.slice(0, 6).map((key) => (
                    <span
                      key={key}
                      className="rounded-2xl border border-white/8 bg-black/20 px-3 py-2 font-mono text-[11px] text-slate-200"
                    >
                      {key}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-300">
            <p>
              Use <code className="font-mono text-slate-100">docs/credentials-setup.md</code> as the step-by-step guide for collecting the remaining values.
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <span className="rounded-2xl border border-white/8 bg-black/20 px-3 py-2 text-slate-200">
                docs/credentials-setup.md
              </span>
              <span className="rounded-2xl border border-white/8 bg-black/20 px-3 py-2 text-slate-200">
                docs/deployment-runbook.md
              </span>
              <span className="rounded-2xl border border-white/8 bg-black/20 px-3 py-2 text-slate-200">
                docs/live-validation-checklist.md
              </span>
            </div>
            <div className="mt-3 space-y-1 text-xs text-slate-400">
              <p>Web app URL: {readiness.appUrl}</p>
              <p>Voice runtime base URL: {readiness.voiceBaseUrl}</p>
              <p>Voice websocket URL: {readiness.voiceWebSocketUrl}</p>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5 lg:w-80">
          <h2 className="text-lg font-semibold text-white">Next credential focus</h2>
          {readiness.missingKeys.length === 0 ? (
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Everything required for live validation appears configured. The next move is real deployment wiring and a live Twilio call test.
            </p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
              {readiness.missingKeys.slice(0, 6).map((key) => (
                <li key={key} className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2 font-mono text-xs text-slate-200">
                  {key}
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {readiness.sections.map((section) => (
          <article key={section.title} className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
            <h2 className="text-lg font-semibold text-white">{section.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{section.description}</p>
            <div className="mt-4 space-y-3">
              {section.checks.map((check) => (
                <div key={check.key} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{check.label}</p>
                      <p className="mt-1 text-xs font-mono text-slate-500">{check.key}</p>
                    </div>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${statusPillClassName(check.status)}`}
                    >
                      {check.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{check.detail}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </ConsoleShell>
  );
}
