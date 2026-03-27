"use client";

import { useEffect, useRef } from "react";
import { Phone, MessageSquare, BarChart3, Settings, Workflow } from "lucide-react";

const useCases = [
  {
    title: "Inbound sales",
    description:
      "Qualify leads, answer pricing questions, and book demos automatically. Every call turns into a sales opportunity your team can follow up on.",
    icon: Phone,
    mockup: (
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent-secondary)]" />
          <span className="text-sm font-medium text-[var(--color-text-on-dark)]">Inbound Sales Agent</span>
          <span className="ml-auto font-mono text-[0.65rem] text-[var(--color-text-muted-on-dark)]">+1 (415) 555-0142</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Today", value: "47" },
            { label: "Avg duration", value: "3:42" },
            { label: "Qualified", value: "78%" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-[var(--color-badge-dark)] p-2.5 text-center">
              <div className="text-sm font-semibold text-[var(--color-text-on-dark)]">{s.value}</div>
              <div className="mt-0.5 text-[0.55rem] text-[var(--color-text-muted-on-dark)]">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="space-y-1 rounded-lg bg-[var(--color-badge-dark)] p-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent-secondary)]/70" />
            <span className="font-mono text-[0.6rem] text-[var(--color-text-muted-on-dark)]">0:04</span>
            <span className="text-[0.62rem] text-[var(--color-text-on-dark)]">Thanks for calling, how can I help?</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent-primary)]/70" />
            <span className="font-mono text-[0.6rem] text-[var(--color-text-muted-on-dark)]">0:08</span>
            <span className="text-[0.62rem] text-[var(--color-text-on-dark)]">I&apos;d like pricing for the enterprise plan.</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Appointment booking",
    description:
      "Let your AI agent handle scheduling calls end to end. It confirms availability, books the slot, and sends an SMS confirmation to the caller.",
    icon: MessageSquare,
    mockup: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--color-text-on-dark)]">Booking Agent</span>
          <span className="rounded-full bg-[var(--color-overlay-secondary-medium)] px-2 py-0.5 text-[0.6rem] text-[var(--color-accent-secondary)]">Active</span>
        </div>
        <div className="space-y-2">
          {[
            { time: "9:00 AM", name: "Sarah M.", status: "Confirmed" },
            { time: "10:30 AM", name: "James K.", status: "Confirmed" },
            { time: "2:00 PM", name: "Lisa R.", status: "Pending" },
          ].map((a) => (
            <div key={a.time} className="flex items-center justify-between rounded-lg bg-[var(--color-badge-dark)] px-3 py-2">
              <div className="flex items-center gap-2.5">
                <span className="w-14 font-mono text-[0.65rem] text-[var(--color-text-muted-on-dark)]">{a.time}</span>
                <span className="text-[0.75rem] text-[var(--color-text-on-dark)]">{a.name}</span>
              </div>
              <span className={`text-[0.6rem] ${a.status === "Confirmed" ? "text-[var(--color-accent-secondary)]" : "text-[var(--color-accent-pop)]"}`}>
                {a.status}
              </span>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-[var(--color-badge-dark)] p-2.5 text-center">
          <span className="text-[0.65rem] text-[var(--color-text-muted-on-dark)]">12 bookings this week</span>
        </div>
      </div>
    ),
  },
  {
    title: "Customer support",
    description:
      "Handle tier-1 support calls with AI that knows your FAQ, troubleshoots common issues, and escalates to a human when needed.",
    icon: Settings,
    mockup: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--color-text-on-dark)]">Support Tier 1</span>
          <span className="text-[0.65rem] text-[var(--color-text-muted-on-dark)]">24/7</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Resolved", value: "94%" },
            { label: "Avg time", value: "2:17" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-[var(--color-badge-dark)] p-2.5 text-center">
              <div className="text-sm font-semibold text-[var(--color-text-on-dark)]">{s.value}</div>
              <div className="mt-0.5 text-[0.55rem] text-[var(--color-text-muted-on-dark)]">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="space-y-1.5 rounded-lg bg-[var(--color-badge-dark)] p-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent-primary)]/70" />
            <span className="text-[0.62rem] text-[var(--color-text-on-dark)]">My order hasn&apos;t arrived yet.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent-secondary)]/70" />
            <span className="text-[0.62rem] text-[var(--color-text-on-dark)]">Let me look that up for you...</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent-secondary)]/70" />
            <span className="text-[0.62rem] text-[var(--color-text-on-dark)]">Your order shipped yesterday. Tracking sent via SMS.</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Lead qualification",
    description:
      "Screen inbound interest before it reaches your sales team. Ask qualifying questions, capture data, and route hot leads instantly.",
    icon: BarChart3,
    mockup: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--color-text-on-dark)]">Lead Qualifier</span>
          <span className="font-mono text-[0.65rem] text-[var(--color-text-muted-on-dark)]">142 leads</span>
        </div>
        <div className="space-y-2">
          {[
            { label: "Company size?", value: "50-200", score: "High" },
            { label: "Budget range?", value: "$5k-10k/mo", score: "High" },
            { label: "Timeline?", value: "This quarter", score: "Hot" },
          ].map((q) => (
            <div key={q.label} className="flex items-center justify-between rounded-lg bg-[var(--color-badge-dark)] px-3 py-2">
              <div>
                <div className="text-[0.6rem] text-[var(--color-text-muted-on-dark)]">{q.label}</div>
                <div className="text-[0.72rem] text-[var(--color-text-on-dark)]">{q.value}</div>
              </div>
              <span className={`rounded px-1.5 py-0.5 text-[0.6rem] ${q.score === "Hot" ? "bg-[var(--color-overlay-accent-medium)] text-[var(--color-accent-deep)]" : "bg-[var(--color-overlay-secondary-medium)] text-[var(--color-accent-secondary)]"}`}>
                {q.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "After-hours coverage",
    description:
      "Never miss a call again. Your AI agent answers when your team is offline, captures key details, and follows up the next business day.",
    icon: Workflow,
    mockup: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--color-text-on-dark)]">After Hours</span>
          <span className="rounded-full bg-[var(--color-overlay-pop-soft)] px-2 py-0.5 text-[0.6rem] text-[var(--color-text-primary)]">Outside hours</span>
        </div>
        <div className="space-y-2 rounded-lg bg-[var(--color-badge-dark)] p-3">
          <div className="text-[0.65rem] uppercase tracking-wider text-[var(--color-text-muted-on-dark)]">Last 3 missed-hour calls</div>
          {[
            { time: "11:42 PM", caller: "+1 (212) 555-0198" },
            { time: "6:15 AM", caller: "+1 (310) 555-0067" },
            { time: "3:30 AM", caller: "+1 (628) 555-0144" },
          ].map((c) => (
            <div key={c.time} className="flex items-center justify-between">
              <span className="font-mono text-[0.65rem] text-[var(--color-text-muted-on-dark)]">{c.time}</span>
              <span className="font-mono text-[0.7rem] text-[var(--color-text-on-dark)]">{c.caller}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-[var(--color-badge-dark)] p-2.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent-secondary)]" />
          <span className="text-[0.65rem] text-[var(--color-text-on-dark)]">All calls answered. 3 follow-ups queued.</span>
        </div>
      </div>
    ),
  },
];

const UseCases = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let raf: number;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - rect.top) / (vh + rect.height * 0.5);
      const progress = Math.max(0, Math.min(1, raw));
      const maxShift = track.scrollWidth - (track.parentElement?.clientWidth ?? 0);
      track.style.transform = `translateX(-${progress * Math.max(0, maxShift)}px)`;
    };

    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <span className="mb-4 block font-body text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Use cases</span>
        <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-[2.75rem]">
          Built for every inbound
          <br className="hidden sm:block" />
          call scenario
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-5 pl-6 sm:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pr-6 will-change-transform"
        >
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-[1.5rem] bg-[var(--color-dark-section)] sm:w-[360px]"
            >
              {/* Mockup area */}
              <div className="p-5 sm:p-6 flex-1">
                {uc.mockup}
              </div>
              {/* Title + description */}
              <div className="px-5 sm:px-6 pb-6 pt-2">
                <h3 className="mb-2 font-display text-[1.05rem] font-semibold text-[var(--color-text-on-dark)]">
                  {uc.title}
                </h3>
                <p className="font-body text-[0.78rem] leading-[1.6] text-[var(--color-text-muted-on-dark)]">
                  {uc.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
