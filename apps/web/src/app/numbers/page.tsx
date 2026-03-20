import Link from "next/link";
import { deletePhoneNumberAction, registerPhoneNumberAction } from "@/app/_actions/phone-numbers";
import { ConsoleShell } from "@/components/console-shell";
import { listAgentsForUser } from "@/lib/agent-data";
import { requireSession } from "@/lib/auth";
import { listPhoneNumbersWithAssignments } from "@/lib/phone-number-data";

type NumbersPageProps = {
  searchParams?: Promise<{
    error?: string;
    created?: string;
    deleted?: string;
  }>;
};

export default async function NumbersPage({ searchParams }: NumbersPageProps) {
  const session = await requireSession();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const [phoneNumbers, agents] = await Promise.all([
    listPhoneNumbersWithAssignments(session.email),
    listAgentsForUser(session.email),
  ]);

  return (
    <ConsoleShell
      eyebrow="Numbers"
      title="Register and map inbound numbers to agents."
      description="This is the first number provisioning seam: manually register Twilio numbers now, then let the runtime resolve inbound calls through the shared product data layer."
      userEmail={session.email}
    >
      {resolvedSearchParams?.created ? (
        <div className="mb-6 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-100">
          Phone number registered successfully.
        </div>
      ) : null}

      {resolvedSearchParams?.deleted ? (
        <div className="mb-6 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-100">
          Phone number removed successfully.
        </div>
      ) : null}

      {resolvedSearchParams?.error ? (
        <div className="mb-6 rounded-3xl border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-100">
          {resolvedSearchParams.error === "missing-phone-number"
            ? "A phone number is required."
            : resolvedSearchParams.error === "invalid-agent"
              ? "The selected agent is invalid for the current user."
              : resolvedSearchParams.error === "duplicate-phone-number"
                ? "That phone number is already registered."
                : resolvedSearchParams.error === "duplicate-twilio-sid"
                  ? "That Twilio SID is already registered."
                  : resolvedSearchParams.error === "not-found"
                    ? "That phone number record could not be found for the current user."
            : "Database is not configured yet, so the number could not be saved."}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form action={registerPhoneNumberAction} className="rounded-3xl border border-white/10 bg-slate-950/45 p-6">
          <h2 className="text-xl font-semibold text-white">Register a number</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Until Twilio purchase automation is wired, this screen lets you manually register owned numbers and assign them to agents.
          </p>

          <div className="mt-6 grid gap-4">
            <label>
              <span className="text-sm font-medium text-slate-200">Phone number</span>
              <input
                type="text"
                name="phoneNumber"
                placeholder="+15551234567"
                required
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/40"
              />
            </label>

            <label>
              <span className="text-sm font-medium text-slate-200">Friendly name</span>
              <input
                type="text"
                name="friendlyName"
                placeholder="Main sales line"
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/40"
              />
            </label>

            <label>
              <span className="text-sm font-medium text-slate-200">Twilio SID</span>
              <input
                type="text"
                name="twilioSid"
                placeholder="PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/40"
              />
            </label>

            <label>
              <span className="text-sm font-medium text-slate-200">Assign to agent</span>
              <select
                name="agentId"
                className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400/40"
                defaultValue=""
              >
                <option value="">Unassigned</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-3xl border border-violet-400/20 bg-violet-500/10 p-5">
            <p className="max-w-xl text-sm leading-6 text-slate-200">
              Once saved, this number becomes eligible for runtime lookup through the secure resolve-agent endpoint.
            </p>
            <button
              type="submit"
              className="rounded-2xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-medium text-violet-100 transition hover:bg-violet-500/25"
            >
              Save number
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-6">
            <h2 className="text-xl font-semibold text-white">Runtime contract</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              The voice runtime can call the product API to resolve an inbound number to an agent config.
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 font-mono text-xs text-slate-200">
              /api/runtime/resolve-agent?phoneNumber=%2B15551234567
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Authenticate requests with the <code className="font-mono">x-yapsolutely-runtime-secret</code> header.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-6">
            <h2 className="text-xl font-semibold text-white">Next step</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              After manual registration is stable, replace this with Twilio purchase/import flows and feed the same records directly into the inbound call path.
            </p>
            <div className="mt-4 text-sm">
              <Link href="/agents" className="text-violet-100 underline underline-offset-4">
                Review agent assignments
              </Link>
            </div>
          </article>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45">
        <div className="grid grid-cols-[1.1fr_1fr_1fr_0.8fr_auto] gap-4 border-b border-white/10 px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          <div>Number</div>
          <div>Friendly name</div>
          <div>Assigned agent</div>
          <div>Created</div>
          <div>Actions</div>
        </div>

        {phoneNumbers.length === 0 ? (
          <div className="px-5 py-10 text-sm text-slate-300">
            No phone numbers registered yet. Add your first Twilio number above to start building the inbound routing layer.
          </div>
        ) : (
          phoneNumbers.map((phoneNumber) => (
            <div
              key={phoneNumber.id}
              className="grid grid-cols-[1.1fr_1fr_1fr_0.8fr_auto] gap-4 border-b border-white/6 px-5 py-4 text-sm text-slate-200 last:border-b-0"
            >
              <div className="font-medium text-white">{phoneNumber.phoneNumber}</div>
              <div>{phoneNumber.friendlyName || "—"}</div>
              <div>{phoneNumber.assignedAgentName || "Unassigned"}</div>
              <div>{phoneNumber.createdAt.toLocaleDateString()}</div>
              <div>
                <form action={deletePhoneNumberAction}>
                  <input type="hidden" name="phoneNumberId" value={phoneNumber.id} />
                  <button
                    type="submit"
                    className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-100 transition hover:bg-amber-500/20"
                  >
                    Remove
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </ConsoleShell>
  );
}