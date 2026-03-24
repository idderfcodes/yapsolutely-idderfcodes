"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Phone, MessageSquare, BarChart3, Settings, Workflow, ChevronLeft, ChevronRight } from "lucide-react";

const useCases = [
  {
    title: "Inbound sales",
    description:
      "Qualify leads, answer pricing questions, and book demos automatically. Every call turns into a sales opportunity your team can follow up on.",
    icon: Phone,
    mockup: (
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-medium text-white">Inbound Sales Agent</span>
          <span className="text-[0.65rem] text-white/30 ml-auto font-mono">+1 (415) 555-0142</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Today", value: "47" },
            { label: "Avg duration", value: "3:42" },
            { label: "Qualified", value: "78%" },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.06] rounded-lg p-2.5 text-center">
              <div className="text-sm font-semibold text-white">{s.value}</div>
              <div className="text-[0.55rem] text-white/40 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white/[0.04] rounded-lg p-2.5 space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-400/60" />
            <span className="text-[0.6rem] text-white/30 font-mono">0:04</span>
            <span className="text-[0.62rem] text-white/60">Thanks for calling, how can I help?</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-blue-400/60" />
            <span className="text-[0.6rem] text-white/30 font-mono">0:08</span>
            <span className="text-[0.62rem] text-white/60">I&apos;d like pricing for the enterprise plan.</span>
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
          <span className="text-sm font-medium text-white">Booking Agent</span>
          <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400">Active</span>
        </div>
        <div className="space-y-2">
          {[
            { time: "9:00 AM", name: "Sarah M.", status: "Confirmed" },
            { time: "10:30 AM", name: "James K.", status: "Confirmed" },
            { time: "2:00 PM", name: "Lisa R.", status: "Pending" },
          ].map((a) => (
            <div key={a.time} className="flex items-center justify-between bg-white/[0.06] rounded-lg px-3 py-2">
              <div className="flex items-center gap-2.5">
                <span className="text-[0.65rem] text-white/30 font-mono w-14">{a.time}</span>
                <span className="text-[0.75rem] text-white/70">{a.name}</span>
              </div>
              <span className={`text-[0.6rem] ${a.status === "Confirmed" ? "text-emerald-400/70" : "text-amber-400/70"}`}>
                {a.status}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-white/[0.04] rounded-lg p-2.5 text-center">
          <span className="text-[0.65rem] text-white/40">12 bookings this week</span>
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
          <span className="text-sm font-medium text-white">Support Tier 1</span>
          <span className="text-[0.65rem] text-white/30">24/7</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Resolved", value: "94%" },
            { label: "Avg time", value: "2:17" },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.06] rounded-lg p-2.5 text-center">
              <div className="text-sm font-semibold text-white">{s.value}</div>
              <div className="text-[0.55rem] text-white/40 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white/[0.04] rounded-lg p-2.5 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-blue-400/60" />
            <span className="text-[0.62rem] text-white/60">My order hasn&apos;t arrived yet.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-400/60" />
            <span className="text-[0.62rem] text-white/60">Let me look that up for you...</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-400/60" />
            <span className="text-[0.62rem] text-white/60">Your order shipped yesterday. Tracking sent via SMS.</span>
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
          <span className="text-sm font-medium text-white">Lead Qualifier</span>
          <span className="text-[0.65rem] text-white/30 font-mono">142 leads</span>
        </div>
        <div className="space-y-2">
          {[
            { label: "Company size?", value: "50-200", score: "High" },
            { label: "Budget range?", value: "$5k-10k/mo", score: "High" },
            { label: "Timeline?", value: "This quarter", score: "Hot" },
          ].map((q) => (
            <div key={q.label} className="bg-white/[0.06] rounded-lg px-3 py-2 flex items-center justify-between">
              <div>
                <div className="text-[0.6rem] text-white/35">{q.label}</div>
                <div className="text-[0.72rem] text-white/70">{q.value}</div>
              </div>
              <span className={`text-[0.6rem] px-1.5 py-0.5 rounded ${q.score === "Hot" ? "bg-red-400/15 text-red-400" : "bg-emerald-400/15 text-emerald-400"}`}>
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
          <span className="text-sm font-medium text-white">After Hours</span>
          <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-400">Outside hours</span>
        </div>
        <div className="bg-white/[0.06] rounded-lg p-3 space-y-2">
          <div className="text-[0.65rem] text-white/30 uppercase tracking-wider">Last 3 missed-hour calls</div>
          {[
            { time: "11:42 PM", caller: "+1 (212) 555-0198" },
            { time: "6:15 AM", caller: "+1 (310) 555-0067" },
            { time: "3:30 AM", caller: "+1 (628) 555-0144" },
          ].map((c) => (
            <div key={c.time} className="flex items-center justify-between">
              <span className="text-[0.65rem] text-white/30 font-mono">{c.time}</span>
              <span className="text-[0.7rem] text-white/60 font-mono">{c.caller}</span>
            </div>
          ))}
        </div>
        <div className="bg-white/[0.04] rounded-lg p-2.5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[0.65rem] text-white/50">All calls answered. 3 follow-ups queued.</span>
        </div>
      </div>
    ),
  },
];

const UseCases = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 380; // card width + gap

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, useCases.length - 1));
    setCurrentIndex(clamped);
    track.scrollTo({ left: clamped * cardWidth, behavior: "smooth" });
  }, []);

  const handlePrev = useCallback(() => scrollToIndex(currentIndex - 1), [currentIndex, scrollToIndex]);
  const handleNext = useCallback(() => scrollToIndex(currentIndex + 1), [currentIndex, scrollToIndex]);

  return (
    <section className="py-16 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-body text-[0.65rem] text-text-body uppercase tracking-[0.2em] block mb-4">Use cases</span>
            <h2 className="text-[2rem] sm:text-[2.75rem] font-semibold tracking-[-0.03em] text-foreground leading-[1.08]">
              Built for every inbound
              <br className="hidden sm:block" />
              call scenario
            </h2>
          </div>
          {/* Pagination arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border border-border-soft/60 flex items-center justify-center transition-all hover:bg-surface-elevated disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous use case"
            >
              <ChevronLeft className="w-4.5 h-4.5 text-foreground" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= useCases.length - 1}
              className="w-10 h-10 rounded-full border border-border-soft/60 flex items-center justify-center transition-all hover:bg-surface-elevated disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next use case"
            >
              <ChevronRight className="w-4.5 h-4.5 text-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-5 pl-6 pr-6 sm:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="shrink-0 w-[320px] sm:w-[360px] rounded-[1.5rem] bg-surface-dark overflow-hidden flex flex-col snap-start"
            >
              {/* Mockup area */}
              <div className="p-5 sm:p-6 flex-1">
                {uc.mockup}
              </div>
              {/* Title + description */}
              <div className="px-5 sm:px-6 pb-6 pt-2">
                <h3 className="font-display text-[1.05rem] font-semibold text-white mb-2">
                  {uc.title}
                </h3>
                <p className="font-body text-[0.78rem] text-white/45 leading-[1.6]">
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
