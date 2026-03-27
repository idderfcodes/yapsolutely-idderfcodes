"use client";

import ScrollReveal from "@/components/landing/ScrollReveal";
import { Phone, FileText, Shield } from "lucide-react";

const useCases = [
  {
    icon: Phone,
    title: "After-hours reception",
    description:
      "Let an AI agent answer calls when your team is offline. Capture caller details, qualify leads, and route urgent requests - so you never miss an opportunity.",
  },
  {
    icon: FileText,
    title: "Appointment scheduling",
    description:
      "Voice agents can collect availability preferences, confirm bookings, and send follow-ups. Your team focuses on high-value work instead of phone tag.",
  },
  {
    icon: Shield,
    title: "Call auditing and compliance",
    description:
      "Every conversation is transcribed and logged automatically. Review full transcripts, flag calls for quality assurance, and maintain an auditable record.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 sm:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-14">
            <span className="mb-4 block font-body text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Use cases</span>
            <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-[2.75rem]">
              Built for real business workflows
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {useCases.map((uc, i) => (
            <ScrollReveal key={uc.title} variant="fade-up" delay={i * 100} duration={500}>
              <div className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-7">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-overlay-accent-soft)]">
                  <uc.icon className="h-5 w-5 text-[var(--color-accent-primary)]" />
                </div>

                <h3 className="mb-3 font-display text-[0.95rem] font-semibold text-[var(--color-text-primary)]">
                  {uc.title}
                </h3>

                <p className="flex-1 font-body text-[0.88rem] leading-[1.7] text-[var(--color-text-muted)]">
                  {uc.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
