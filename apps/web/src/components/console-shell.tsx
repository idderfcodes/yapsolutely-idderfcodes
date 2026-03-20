import Link from "next/link";
import { ReactNode } from "react";
import { signOutAction } from "@/app/_actions/auth";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/agents", label: "Agents" },
  { href: "/numbers", label: "Numbers" },
  { href: "/agents/new", label: "Create agent" },
  { href: "/calls", label: "Calls" },
  { href: "/settings", label: "Settings" },
];

type ConsoleShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  userEmail?: string;
  children?: ReactNode;
};

export function ConsoleShell({
  eyebrow,
  title,
  description,
  userEmail,
  children,
}: ConsoleShellProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-8 sm:px-10 lg:px-12">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[28px] border border-white/10 bg-slate-950/60 p-5 shadow-[0_20px_80px_rgba(3,7,18,0.3)] backdrop-blur">
          <Link href="/" className="block rounded-2xl border border-violet-400/20 bg-violet-500/10 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-200">
              Yapsolutely
            </p>
            <p className="mt-2 text-lg font-semibold text-white">Voice OS dashboard</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Early shell for agents, calls, and runtime operations.
            </p>
          </Link>

          <nav className="mt-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl border border-white/8 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-violet-400/35 hover:bg-violet-500/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(8,15,31,0.92))] p-8 shadow-[0_24px_100px_rgba(3,7,18,0.35)]">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-violet-200/80">
                {eyebrow}
              </p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-slate-950/45 p-4 sm:min-w-[240px]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Session
              </p>
              <div>
                <p className="text-sm font-medium text-white">
                  {userEmail || "Demo session"}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Cookie-backed auth scaffold for Milestone A. Replace with production auth next.
                </p>
              </div>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-violet-400/35 hover:bg-violet-500/10"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Milestone
              </p>
              <p className="mt-2 text-lg font-semibold text-white">A · Foundation</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Establishing the shell before auth, schema, and runtime integration.
              </p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Priority
              </p>
              <p className="mt-2 text-lg font-semibold text-white">Critical path only</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Keep the demo path moving: agent → number → call → transcript.
              </p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Status
              </p>
              <p className="mt-2 text-lg font-semibold text-white">Scaffolded</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                These screens are intentionally thin but now give the app a navigable skeleton.
              </p>
            </article>
          </div>

          {children ? <div className="mt-8">{children}</div> : null}
        </section>
      </div>
    </main>
  );
}
