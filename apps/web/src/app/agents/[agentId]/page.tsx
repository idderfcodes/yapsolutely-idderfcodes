import Link from "next/link";
import { ConsoleShell } from "@/components/console-shell";
import { AgentStatus } from "@prisma/client";
import { archiveAgentAction, updateAgentAction } from "@/app/_actions/agents";
import { getAgentByIdForUser, listPhoneNumbersForUser } from "@/lib/agent-data";
import { requireSession } from "@/lib/auth";

type AgentDetailPageProps = {
  params: Promise<{
    agentId: string;
  }>;
  searchParams?: Promise<{
    error?: string;
    updated?: string;
    archived?: string;
  }>;
};

export default async function AgentDetailPage({ params, searchParams }: AgentDetailPageProps) {
  const session = await requireSession();
  const { agentId } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const agent = await getAgentByIdForUser(session.email, agentId);
  const phoneNumbers = await listPhoneNumbersForUser(session.email);
  const availablePhoneNumbers = phoneNumbers.filter(
    (phoneNumber) => !phoneNumber.assignedAgentId || phoneNumber.assignedAgentId === agent?.id,
  );

  return (
    <ConsoleShell
      eyebrow="Agent detail"
      title={agent?.name || `Agent ${agentId}`}
      description={
        agent
          ? "This record is loaded through the new Prisma data layer and is ready for richer editing workflows."
          : "This route is ready to become the real per-agent workspace for prompts, voice tuning, activation, and number mapping."
      }
      userEmail={session.email}
    >
      {resolvedSearchParams?.updated ? (
        <div className="mb-6 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-100">
          Agent changes saved successfully.
        </div>
      ) : null}

      {resolvedSearchParams?.archived ? (
        <div className="mb-6 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-100">
          Agent archived successfully and any assigned numbers were released.
        </div>
      ) : null}

      {resolvedSearchParams?.error ? (
        <div className="mb-6 rounded-3xl border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-100">
          {resolvedSearchParams.error === "database-unavailable"
            ? "Database is not configured yet, so the update could not be persisted."
            : resolvedSearchParams.error === "missing-required-fields"
              ? "Name and system prompt are required."
              : resolvedSearchParams.error === "not-found"
                ? "That agent could not be found for the current user."
              : "Something prevented the update from being applied."}
        </div>
      ) : null}

      {agent ? (
        <>
          <form action={updateAgentAction} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="agentId" value={agent.id} />
            <label className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
              <span className="text-sm font-medium text-slate-200">Agent name</span>
              <input
                type="text"
                name="name"
                defaultValue={agent.name}
                required
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/40"
              />
            </label>
            <label className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
              <span className="text-sm font-medium text-slate-200">Role / use case</span>
              <input
                type="text"
                name="description"
                defaultValue={agent.description ?? ""}
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/40"
              />
            </label>
            <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
              <h2 className="text-lg font-semibold text-white">System prompt</h2>
              <textarea
                name="systemPrompt"
                rows={10}
                defaultValue={agent.systemPrompt}
                required
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/40"
              />
            </article>
            <div className="grid gap-4">
              <label className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
                <span className="text-sm font-medium text-slate-200">First message</span>
                <input
                  type="text"
                  name="firstMessage"
                  defaultValue={agent.firstMessage ?? ""}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/40"
                />
              </label>
              <label className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
                <span className="text-sm font-medium text-slate-200">Voice model</span>
                <input
                  type="text"
                  name="voiceModel"
                  defaultValue={agent.voiceModel ?? ""}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/40"
                />
              </label>
              <label className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
                <span className="text-sm font-medium text-slate-200">Transfer number</span>
                <input
                  type="text"
                  name="transferNumber"
                  defaultValue={agent.transferNumber ?? ""}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/40"
                />
              </label>
            </div>

            <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
              <h2 className="text-lg font-semibold text-white">Status and routing</h2>
              <div className="mt-4 grid gap-4">
                <label>
                  <span className="text-sm font-medium text-slate-200">Lifecycle status</span>
                  <select
                    name="status"
                    defaultValue={agent.status}
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/40"
                  >
                    {Object.values(AgentStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="text-sm font-medium text-slate-200">Assigned phone number</span>
                  <select
                    name="phoneNumberId"
                    defaultValue={agent.phoneNumbers[0]?.id ?? ""}
                    className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/40"
                  >
                    <option value="">No number assigned</option>
                    {availablePhoneNumbers.map((phoneNumber) => (
                      <option key={phoneNumber.id} value={phoneNumber.id}>
                        {phoneNumber.friendlyName
                          ? `${phoneNumber.friendlyName} · ${phoneNumber.phoneNumber}`
                          : phoneNumber.phoneNumber}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-3 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={agent.isActive}
                    className="h-4 w-4 rounded border-white/20 bg-slate-950"
                  />
                  Agent is active and available for runtime assignment
                </label>
                <p className="text-xs leading-6 text-slate-400">
                  Only agents with lifecycle status <span className="font-semibold text-slate-200">ACTIVE</span> can stay callable. Saving any other status will automatically mark the agent inactive.
                </p>
              </div>
            </article>

            <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
              <h2 className="text-lg font-semibold text-white">Connected records</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Phone numbers: {agent.phoneNumbers.length}
              </p>
              {agent.phoneNumbers.length ? (
                <div className="mt-3 space-y-2">
                  {agent.phoneNumbers.map((phoneNumber) => (
                    <div
                      key={phoneNumber.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200"
                    >
                      <div className="font-medium text-white">
                        {phoneNumber.friendlyName || "Assigned number"}
                      </div>
                      <div className="mt-1 text-slate-300">{phoneNumber.phoneNumber}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  No phone number is assigned yet. Pick one above to make this agent reachable from an inbound call.
                </p>
              )}
              <p className="mt-1 text-sm leading-6 text-slate-300">Recent calls: {agent.calls.length}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                This is the first number-mapping hook: save an assigned number here, and the data model is ready for runtime lookup by inbound number.
              </p>
            </article>

            <div className="md:col-span-2 flex flex-col gap-4 rounded-3xl border border-violet-400/20 bg-violet-500/10 p-5 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-2xl text-sm leading-6 text-slate-200">
                Editing now writes through a real server action. Once Twilio-purchased numbers exist in the database, this same form becomes the first live number-to-agent mapping control.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="rounded-2xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-medium text-violet-100 transition hover:bg-violet-500/25"
                >
                  Save agent changes
                </button>
                <button
                  type="submit"
                  formAction={archiveAgentAction}
                  className="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-100 transition hover:bg-amber-500/20"
                >
                  Archive agent
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Prompt", "System prompt editor will live here."],
            ["Voice", "Voice model, language, and first-message controls."],
            ["Activation", "Status toggles and runtime readiness checks."],
            ["Number mapping", "Twilio number assignment and transfer behavior."],
          ].map(([title, body]) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
            </article>
          ))}
        </div>
      )}

      <div className="mt-6">
        <Link href="/agents" className="text-sm font-medium text-violet-100 underline underline-offset-4">
          Back to agents
        </Link>
      </div>
    </ConsoleShell>
  );
}