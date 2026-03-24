"use client";

import { useRef, useCallback, type MouseEvent as ReactMouseEvent } from "react";
import ScrollReveal from "@/components/landing/ScrollReveal";

/* ── Card data ── */
const cards = [
  {
    title: "Custom Agents",
    desc: "Your best employee - cloned. Build agents that sound exactly like your brand, handle objections like a pro, and never take a sick day.",
    visual: (
      <div className="relative w-full h-full bg-gradient-to-br from-purple-900/40 via-purple-800/20 to-transparent flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(168,85,247,0.15),transparent_60%)]" />
        {/* Agent avatar cluster */}
        <div className="relative flex items-center -space-x-3">
          {["bg-purple-500/80", "bg-indigo-500/80", "bg-violet-500/80"].map((bg, i) => (
            <div key={i} className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${bg} border-2 border-surface-dark flex items-center justify-center shadow-lg`}>
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
              </svg>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[0.6rem] text-white/40 font-mono">3 agents active</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Sub-second Responses",
    desc: "Callers can't tell it's AI. Our streaming STT + LLM + TTS pipeline responds faster than any human - under 800ms, every time.",
    visual: (
      <div className="relative w-full h-full bg-gradient-to-br from-amber-900/30 via-orange-800/10 to-transparent flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,158,11,0.1),transparent_60%)]" />
        {/* Latency visualization */}
        <div className="relative flex flex-col items-center gap-3">
          <div className="text-[2.5rem] sm:text-[3rem] font-bold text-white/80 tracking-tight leading-none">
            &lt;800<span className="text-[1.2rem] text-white/40 ml-0.5">ms</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full bg-amber-400/60"
                style={{ height: `${12 + i * 6}px`, opacity: 0.4 + i * 0.15 }}
              />
            ))}
          </div>
          <span className="text-[0.6rem] text-white/30 font-body">voice response latency</span>
        </div>
      </div>
    ),
  },
  {
    title: "Full Audit Trail",
    desc: "Never wonder what happened on a call again. Every word transcribed, every event logged, every conversation reviewable from one place.",
    visual: (
      <div className="relative w-full h-full bg-gradient-to-br from-emerald-900/30 via-teal-800/10 to-transparent flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(16,185,129,0.1),transparent_60%)]" />
        {/* Transcript lines */}
        <div className="w-[85%] space-y-2.5">
          {[
            { role: "Agent", text: "How can I help you today?", color: "text-emerald-400/50" },
            { role: "Caller", text: "I need to reschedule my appointment.", color: "text-white/30" },
            { role: "Agent", text: "Of course, let me pull that up for you.", color: "text-emerald-400/50" },
          ].map((line, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <span className={`text-[0.55rem] font-mono ${line.color} shrink-0 w-8 mt-0.5`}>{line.role}</span>
              <span className="text-[0.7rem] text-white/35 leading-[1.5] font-body">{line.text}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 ml-[42px] pt-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400/40" />
            <span className="text-[0.5rem] text-white/20 font-body">100% transcribed</span>
          </div>
        </div>
      </div>
    ),
  },
];

/* ── Tilt card ── */
function BenefitCard({ title, desc, visual }: (typeof cards)[number]) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotateY = ((x - midX) / midX) * 8;
      const rotateX = ((midY - y) / midY) * 8;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden transition-transform duration-300 ease-out cursor-default select-none will-change-transform hover:border-accent-purple-soft/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.08)] flex flex-col"
    >
      {/* Visual / image area */}
      <div className="w-full h-[200px] sm:h-[220px]">
        {visual}
      </div>

      {/* Text content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        <h3 className="text-[1.25rem] sm:text-[1.4rem] font-bold text-white leading-[1.15] tracking-[-0.02em] mb-3">
          {title}
        </h3>
        <p className="text-[0.82rem] text-white/45 leading-[1.65] font-body">
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ── Section ── */
const Benefits = () => {
  return (
    <section className="relative py-20 sm:py-28 px-6 bg-surface-dark overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-14 sm:mb-20">
            <span className="font-body text-[0.65rem] text-white/40 uppercase tracking-[0.25em] block mb-5">
              Why Yapsolutely
            </span>
            <h2 className="text-[1.6rem] sm:text-[2.8rem] lg:text-[3.4rem] font-semibold tracking-[-0.03em] text-white/90 leading-[1.12] italic">
              Everything you need to deploy<br className="hidden sm:block" />{" "}
              voice agents at scale
            </h2>
          </div>
        </ScrollReveal>

        {/* Cards grid - equal sizes */}
        <ScrollReveal variant="fade-up" delay={100} duration={800}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((card) => (
              <BenefitCard key={card.title} {...card} />
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px]"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(168,85,247,0.05) 0%, transparent 70%)",
        }}
      />
    </section>
  );
};

export default Benefits;
