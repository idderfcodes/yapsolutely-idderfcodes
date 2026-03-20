import Link from "next/link";
import { ConsoleShell } from "@/components/console-shell";
import { listAgentsForUser } from "@/lib/agent-data";
import { requireSession } from "@/lib/auth";

export default async function AgentsPage() {
  const session = await requireSession();
  const agents = await listAgentsForUser(session.email);

  return (
    <ConsoleShell
      eyebrow="Agents"
      title="Define who answers the phone."
      description="The agent workflow will live here: prompt, first message, voice, activation, and number assignment."
      userEmail={session.email}
    >
      {agents.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">No agents yet</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                The create-agent form is now wired. Once your database credentials are real, saved agents will appear here.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Preview route: <Link href="/agents/demo-agent" className="text-violet-200 underline underline-offset-4">demo agent detail</Link>
              </p>
            </div>
            <Link
              href="/agents/new"
              className="inline-flex items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-medium text-violet-100 transition hover:bg-violet-500/25"
            >
              Create first agent
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="rounded-3xl border border-white/10 bg-slate-950/45 p-5 transition hover:border-violet-400/35 hover:bg-violet-500/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">{agent.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {agent.firstMessage || "No first message set yet."}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                  {agent.status}
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-400">
                <span>Voice: {agent.voiceModel || "default"}</span>
                <span>{agent.isActive ? "Active" : "Inactive"}</span>
                <span>Updated {agent.updatedAt.toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </ConsoleShell>
  );
}
