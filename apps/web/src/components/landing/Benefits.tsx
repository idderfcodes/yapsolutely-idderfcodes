"use client";

import { useRef, useEffect, type MouseEvent as ReactMouseEvent } from "react";
import ScrollReveal from "@/components/landing/ScrollReveal";

/* ── Card data ── */
const cards = [
  {
    title: "Custom Agents",
    desc: "Your best employee - cloned. Build agents that sound exactly like your brand, handle objections like a pro, and never take a sick day.",
    visual: (
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(135deg, color-mix(in srgb, var(--color-accent-deep) 28%, transparent), color-mix(in srgb, var(--color-accent-primary) 14%, transparent), transparent)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, color-mix(in srgb, var(--color-accent-primary) 15%, transparent), transparent 60%)",
          }}
        />
        {/* Agent avatar cluster */}
        <div className="relative flex items-center -space-x-3">
          {["bg-[var(--color-accent-primary)]/80", "bg-[var(--color-accent-secondary)]/80", "bg-[var(--color-accent-deep)]/80"].map((bg, i) => (
            <div key={i} className={`flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--color-dark-section)] shadow-lg sm:h-16 sm:w-16 ${bg}`}>
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--color-text-on-dark)]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" />
              </svg>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex w-fit items-center gap-2 rounded-full bg-[var(--color-overlay-soft)] px-3 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent-secondary)]" />
            <span className="font-mono text-[0.6rem] text-[var(--color-text-muted-on-dark)]">3 agents active</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Sub-second Responses",
    desc: "Callers can't tell it's AI. Our streaming STT + LLM + TTS pipeline responds faster than any human - under 800ms, every time.",
    visual: (
      <div
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(135deg, color-mix(in srgb, var(--color-accent-secondary) 24%, transparent), color-mix(in srgb, var(--color-accent-hover) 12%, transparent), transparent)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, color-mix(in srgb, var(--color-accent-secondary) 12%, transparent), transparent 60%)",
          }}
        />
        {/* Latency visualization */}
        <div className="relative flex flex-col items-center gap-3">
          <div className="text-[2.5rem] sm:text-[3rem] font-bold leading-none tracking-tight text-[var(--color-text-on-dark)]">
            &lt;800<span className="ml-0.5 text-[1.2rem] text-[var(--color-text-muted-on-dark)]">ms</span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 rounded-full bg-[var(--color-accent-secondary)]/70"
                style={{ height: `${12 + i * 6}px`, opacity: 0.4 + i * 0.15 }}
              />
            ))}
          </div>
          <span className="font-body text-[0.6rem] text-[var(--color-text-muted-on-dark)]">voice response latency</span>
        </div>
      </div>
    ),
  },
  {
    title: "Full Audit Trail",
    desc: "Never wonder what happened on a call again. Every word transcribed, every event logged, every conversation reviewable from one place.",
    visual: (
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(135deg, color-mix(in srgb, var(--color-accent-primary) 18%, transparent), color-mix(in srgb, var(--color-accent-secondary) 8%, transparent), transparent)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 60%, color-mix(in srgb, var(--color-accent-primary) 12%, transparent), transparent 60%)",
          }}
        />
        {/* Transcript lines */}
        <div className="w-[85%] space-y-2.5">
          {[
            { role: "Agent", text: "How can I help you today?", color: "text-[var(--color-accent-secondary)]/70" },
            { role: "Caller", text: "I need to reschedule my appointment.", color: "text-[var(--color-text-muted-on-dark)]" },
            { role: "Agent", text: "Of course, let me pull that up for you.", color: "text-[var(--color-accent-secondary)]/70" },
          ].map((line, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <span className={`text-[0.55rem] font-mono ${line.color} shrink-0 w-8 mt-0.5`}>{line.role}</span>
              <span className="font-body text-[0.7rem] leading-[1.5] text-[var(--color-text-muted-on-dark)]">{line.text}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 ml-[42px] pt-1">
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent-secondary)]/60" />
            <span className="font-body text-[0.5rem] text-[var(--color-text-muted-on-dark)]">100% transcribed</span>
          </div>
        </div>
      </div>
    ),
  },
];

/* ── Tilt card ── */
function BenefitCard({ title, desc, visual }: (typeof cards)[number]) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const currentRotationRef = useRef({ x: 0, y: 0, lift: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0, lift: 0 });

  function animateTilt() {
    const el = cardRef.current;
    if (!el) return;

    const easing = 0.12;
    const current = currentRotationRef.current;
    const target = targetRotationRef.current;

    current.x += (target.x - current.x) * easing;
    current.y += (target.y - current.y) * easing;
    current.lift += (target.lift - current.lift) * easing;

    el.style.transform = `perspective(900px) rotateX(${current.x.toFixed(2)}deg) rotateY(${current.y.toFixed(2)}deg) translateY(${current.lift.toFixed(2)}px)`;

    const isStillMoving =
      Math.abs(target.x - current.x) > 0.01 ||
      Math.abs(target.y - current.y) > 0.01 ||
      Math.abs(target.lift - current.lift) > 0.01;

    if (isStillMoving) {
      frameRef.current = window.requestAnimationFrame(animateTilt);
    } else {
      frameRef.current = null;
    }
  }

  function queueAnimation() {
    if (frameRef.current !== null) {
      return;
    }

    frameRef.current = window.requestAnimationFrame(animateTilt);
  }

  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    targetRotationRef.current = {
      y: ((x - midX) / midX) * 4.5,
      x: ((midY - y) / midY) * 4.5,
      lift: -5,
    };
    queueAnimation();
  }

  function handleMouseLeave() {
    targetRotationRef.current = { x: 0, y: 0, lift: 0 };
    queueAnimation();
  }

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex cursor-default select-none flex-col overflow-hidden rounded-2xl border border-[var(--color-dark-divider)] bg-[var(--color-dark-section)] transition-transform duration-300 ease-out will-change-transform hover:-translate-y-[2px] hover:border-[var(--color-accent-primary)] hover:shadow-[0_0_40px_rgba(238,48,58,0.08)]"
    >
      {/* Visual / image area */}
      <div className="w-full h-[200px] sm:h-[220px]">
        {visual}
      </div>

      {/* Text content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        <h3 className="mb-3 text-[1.25rem] font-bold leading-[1.15] tracking-[-0.02em] text-[var(--color-text-on-dark)] sm:text-[1.4rem]">
          {title}
        </h3>
        <p className="font-body text-[0.82rem] leading-[1.65] text-[var(--color-text-muted-on-dark)]">
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ── Section ── */
const Benefits = () => {
  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-section)] px-5 py-16 sm:px-6 sm:py-28">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-14 sm:mb-20">
            <span className="mb-5 block font-body text-[0.65rem] uppercase tracking-[0.25em] text-[var(--color-text-muted-on-dark)]">
              Why Yapsolutely
            </span>
            <h2 className="text-[1.6rem] font-semibold italic leading-[1.12] tracking-[-0.03em] text-[var(--color-text-on-dark)] sm:text-[2.8rem] lg:text-[3.4rem]">
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
            "radial-gradient(ellipse at center bottom, color-mix(in srgb, var(--color-accent-primary) 6%, transparent) 0%, transparent 70%)",
        }}
      />
    </section>
  );
};

export default Benefits;
