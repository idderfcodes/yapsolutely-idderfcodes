import Link from "next/link";

const featureCards = [
  {
    title: "Agent control center",
    description:
      "Create inbound voice agents, tune prompts, choose voices, and track which number maps to which persona.",
  },
  {
    title: "Realtime voice runtime",
    description:
      "Separate runtime prepared for Twilio, Deepgram, Claude, barge-in handling, and low-latency streaming.",
  },
  {
    title: "Logs that prove it works",
    description:
      "Calls, transcripts, statuses, and next-step workflow visibility — the kind of evidence Karim can actually demo.",
  },
];

const launchChecklist = [
  "Create the dashboard shell",
  "Wire the data model with Prisma + Supabase",
  "Adapt the voice runtime for Twilio Media Streams",
  "Persist calls and transcripts back into the product",
];

const quickLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/agents", label: "Agents" },
  { href: "/calls", label: "Calls" },
  { href: "/settings", label: "Settings" },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-12">
      <header className="flex flex-col gap-6 rounded-[28px] border border-white/10 bg-white/5 px-6 py-5 shadow-[0_20px_80px_rgba(3,7,18,0.35)] backdrop-blur md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-violet-200">
            Yapsolutely
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Retell-inspired voice agents, with your product layer actually owned.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            Milestone A is underway: the monorepo is live, the dashboard app is
            scaffolded, and the voice runtime now has its first working shell.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:w-[320px]">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-violet-400/40 hover:bg-violet-500/10"
            >
              Open {link.label}
            </Link>
          ))}
        </div>
      </header>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(8,15,31,0.92))] p-8 shadow-[0_24px_100px_rgba(3,7,18,0.4)]">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-violet-200/80">
            Execution status
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            From planning repo to product foundation.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            The immediate finish line is still the MVP proof: create an agent,
            map a number, take a real call, and see the transcript afterward.
            Everything on this screen exists to keep that path brutally clear.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-[32px] border border-white/10 bg-slate-950/65 p-8 shadow-[0_24px_80px_rgba(3,7,18,0.3)]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Critical path</h2>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              active
            </span>
          </div>
          <ul className="mt-6 space-y-3">
            {launchChecklist.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-200"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/20 text-xs font-semibold text-violet-100">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-3xl border border-violet-400/20 bg-violet-500/10 p-5">
            <p className="text-sm font-medium text-violet-100">
              Current milestone note
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              Voice runtime scaffold and env contract are in place. Next up:
              make the dashboard routes feel like a product shell, then wire the
              first persistence layer.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
