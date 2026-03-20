import { ConsoleShell } from "@/components/console-shell";
import { createAgentAction } from "@/app/_actions/agents";
import { requireSession } from "@/lib/auth";

type NewAgentPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

const fields = [
  {
    name: "name",
    label: "Agent name",
    placeholder: "Front desk concierge",
  },
  {
    name: "description",
    label: "Role / use case",
    placeholder: "Handles inbound qualification and appointment triage",
  },
  {
    name: "systemPrompt",
    label: "System prompt",
    placeholder: "You are a warm and efficient voice agent for Yapsolutely...",
    multiline: true,
  },
  {
    name: "firstMessage",
    label: "First message",
    placeholder: "Thanks for calling Yapsolutely — how can I help today?",
  },
  {
    name: "voiceModel",
    label: "Voice model",
    placeholder: "aura-2-thalia-en",
  },
  {
    name: "transferNumber",
    label: "Transfer number",
    placeholder: "+10000000001",
  },
];

export default async function NewAgentPage({ searchParams }: NewAgentPageProps) {
  const session = await requireSession();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <ConsoleShell
      eyebrow="Create agent"
      title="Start shaping the first AI caller experience."
      description="This form now posts through a server action and is ready to create real agent records as soon as the database is configured."
      userEmail={session.email}
    >
      {resolvedSearchParams?.error ? (
        <div className="mb-6 rounded-3xl border border-amber-400/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-100">
          {resolvedSearchParams.error === "missing-required-fields"
            ? "Agent name and system prompt are required."
            : "Database is not configured yet, so the agent could not be saved."}
        </div>
      ) : null}

      <form action={createAgentAction} className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
            <span className="text-sm font-medium text-slate-200">{field.label}</span>
            {field.multiline ? (
              <textarea
                name={field.name}
                rows={6}
                required={field.name === "systemPrompt"}
                placeholder={field.placeholder}
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/40"
              />
            ) : (
              <input
                type="text"
                name={field.name}
                required={field.name === "name"}
                placeholder={field.placeholder}
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400/40"
              />
            )}
          </label>
        ))}

        <div className="md:col-span-2 flex items-center justify-between rounded-3xl border border-violet-400/20 bg-violet-500/10 p-5">
          <p className="max-w-2xl text-sm leading-6 text-slate-200">
            If the database is still using placeholder credentials, the form will safely bounce back with a database-unavailable hint instead of exploding theatrically.
          </p>
          <button
            type="submit"
            className="rounded-2xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-medium text-violet-100 transition hover:bg-violet-500/25"
          >
            Save draft agent
          </button>
        </div>
      </form>
    </ConsoleShell>
  );
}
