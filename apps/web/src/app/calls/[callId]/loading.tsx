import { ConsoleShell } from "@/components/console-shell";

export default function CallDetailLoading() {
  return (
    <ConsoleShell
      eyebrow="Call detail"
      title="Loading transcript review..."
      description="Pulling the call timeline, metadata, and transcript text into the review surface."
      userEmail="Loading session..."
    >
      <div className="space-y-4">
        <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
          <div className="h-6 w-48 animate-pulse rounded bg-white/5" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-20 animate-pulse rounded-2xl bg-white/[0.03]" />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
          <div className="h-6 w-40 animate-pulse rounded bg-white/5" />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-5 animate-pulse rounded bg-white/[0.03]" />
            ))}
          </div>
        </article>
      </div>
    </ConsoleShell>
  );
}