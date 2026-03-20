"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ConsoleShell } from "@/components/console-shell";

type CallsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function CallsError({ error, reset }: CallsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ConsoleShell
      eyebrow="Calls"
      title="The calls workspace hit a snag."
      description="Something interrupted the call log view before it could finish loading the latest records."
      userEmail="Workspace session"
    >
      <article className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-6">
        <h2 className="text-lg font-semibold text-white">Unable to load calls right now</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200">
          Try reloading the route. If the problem persists, it is likely a temporary database or runtime connectivity issue rather than missing UI wiring.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-2xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-medium text-violet-100 transition hover:bg-violet-500/25"
          >
            Retry calls view
          </button>
          <Link
            href="/dashboard"
            className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-violet-400/35 hover:bg-violet-500/10"
          >
            Back to dashboard
          </Link>
        </div>
      </article>
    </ConsoleShell>
  );
}