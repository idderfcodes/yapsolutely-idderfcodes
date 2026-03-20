import { ConsoleShell } from "@/components/console-shell";

export default function CallsLoading() {
  return (
    <ConsoleShell
      eyebrow="Calls"
      title="Loading call activity..."
      description="Fetching recent calls, transcript previews, and filter context for this workspace."
      userEmail="Loading session..."
    >
      <div className="mb-6 grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-slate-950/45 p-5 md:grid-cols-[1fr_220px_auto]">
          <div className="h-20 animate-pulse rounded-2xl bg-white/5" />
          <div className="h-20 animate-pulse rounded-2xl bg-white/5" />
          <div className="h-20 animate-pulse rounded-2xl bg-white/5" />
        </div>
        <div className="h-32 animate-pulse rounded-3xl border border-white/10 bg-slate-950/45" />
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45">
        <div className="grid grid-cols-5 gap-4 border-b border-white/10 px-5 py-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-4 animate-pulse rounded bg-white/5" />
          ))}
        </div>
        <div className="space-y-3 px-5 py-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="grid grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((__, cellIndex) => (
                <div key={cellIndex} className="h-14 animate-pulse rounded-2xl bg-white/[0.03]" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </ConsoleShell>
  );
}