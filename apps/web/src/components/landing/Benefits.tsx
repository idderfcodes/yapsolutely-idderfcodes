"use client";

import { useRef, useCallback, type MouseEvent as ReactMouseEvent } from "react";
import { Bot, Shield, Zap, type LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

/* ── Card data ── */
const cards: {
  icon: LucideIcon;
  title: string;
  desc: string;
  rotation: number;
  offsetY: number;
}[] = [
  {
    icon: Bot,
    title: "Custom\nAgents",
    desc: "Build agents with unique personalities, scripts, and behaviors tailored to your business.",
    rotation: -6,
    offsetY: 18,
  },
  {
    icon: Zap,
    title: "Sub-second\nResponses",
    desc: "Streaming STT + LLM + TTS pipeline delivers natural, fast conversations.",
    rotation: 0,
    offsetY: 0,
  },
  {
    icon: Shield,
    title: "Full Audit\nTrail",
    desc: "Every call logged with word-for-word transcripts and timeline events.",
    rotation: 6,
    offsetY: 18,
  },
];

/* ── Tilt card ── */
function TiltCard({
  icon: Icon,
  title,
  desc,
  rotation,
  offsetY,
}: (typeof cards)[number]) {
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
      const rotateY = ((x - midX) / midX) * 12;
      const rotateX = ((midY - y) / midY) * 12;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) rotate(0deg)`;
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
      className="flex-shrink-0 w-[260px] sm:w-[290px]"
      style={{
        transform: `rotate(${rotation}deg) translateY(${offsetY}px)`,
        zIndex: rotation === 0 ? 10 : 5,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] p-7 sm:p-8 transition-transform duration-300 ease-out cursor-default select-none will-change-transform hover:border-accent-purple-soft/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.12)]"
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center mb-5">
          <Icon className="w-6 h-6 text-accent-purple-soft" />
        </div>

        {/* Title */}
        <h3 className="text-[1.6rem] sm:text-[1.85rem] font-bold text-white leading-[1.12] tracking-[-0.02em] whitespace-pre-line mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[0.82rem] text-white/55 leading-[1.6]">{desc}</p>
      </div>
    </div>
  );
}

/* ── Section ── */
const Benefits = () => {
  return (
    <section className="relative py-20 sm:py-28 px-6 bg-surface-dark overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-16 sm:mb-24">
            <span className="font-body text-[0.65rem] text-white/40 uppercase tracking-[0.25em] block mb-5">
              Why Yapsolutely
            </span>
            <h2 className="text-[2rem] sm:text-[2.8rem] lg:text-[3.4rem] font-semibold tracking-[-0.03em] text-white/90 leading-[1.1] italic">
              Everything you need to deploy
              <br className="hidden sm:block" />
              voice agents at scale
            </h2>
          </div>
        </ScrollReveal>

        {/* Fanned cards */}
        <ScrollReveal variant="scale-up" duration={900}>
          <div className="flex justify-center items-end gap-[-20px] sm:gap-0">
            <div className="flex items-end -space-x-4 sm:-space-x-6 justify-center">
              {cards.map((card) => (
                <TiltCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Subtle radial glow behind cards */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px]"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(168,85,247,0.06) 0%, transparent 70%)",
        }}
      />
    </section>
  );
};

export default Benefits;
