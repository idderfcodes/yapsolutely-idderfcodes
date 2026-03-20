"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ConsoleShell } from "@/components/console-shell";

type CallDetailErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function CallDetailError({ error, reset }: CallDetailErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ConsoleShell
      eyebrow="Call detail"
      title="This call detail view ran into trouble."
      description="The transcript review surface could not finish loading the requested record."
      userEmail="Workspace session"
    >
      <article className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-6">
        <h2 className="text-lg font-semibold text-white">Unable to open this call right now</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-200">
          Retry the route first. If it keeps failing, the call record may be missing or the database may be temporarily unavailable.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-2xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-medium text-violet-100 transition hover:bg-violet-500/25"
          >
            Retry call detail
          </button>
          <Link
            href="/calls"
            className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-violet-400/35 hover:bg-violet-500/10"
          >
            Back to calls
          </Link>
        </div>
      </article>
    </ConsoleShell>
  );
}