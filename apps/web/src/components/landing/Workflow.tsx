"use client";

import { useState } from "react";
import { Phone, MessageSquare, Settings2 } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

/* ── Step data ── */
const steps = [
  {
    id: 0,
    title: "Define Your Agent",
    desc: "Set the voice, tone, routing logic, and fallback rules. Configure what your agent says, when it transfers, and how it handles edge cases.",
  },
  {
    id: 1,
    title: "Assign a Number and Go Live",
    desc: "Provision a phone number, attach it to your agent, and start receiving inbound calls. Push updates without downtime.",
  },
  {
    id: 2,
    title: "Review Every Call",
    desc: "Read transcripts, flag conversations, and track agent performance. Full audit trail on every interaction.",
  },
];

/* ── Illustrations for each step ── */
function StepIllustration({ activeStep }: { activeStep: number }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Step 0 - Prompt editor */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          activeStep === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-[340px] rounded-2xl bg-[var(--color-dark-section)] p-5 shadow-surface-xl sm:p-6 lg:max-w-[440px] lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-primary)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-pop)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-secondary)]/70" />
            <span className="ml-auto font-mono text-[0.55rem] text-[var(--color-text-muted-on-dark)]">prompt.md</span>
          </div>
          <div className="space-y-2 font-mono text-[0.7rem] leading-[1.8]">
            <div className="text-[var(--color-text-muted-on-dark)]"><span className="text-[var(--color-accent-secondary)]">role:</span> front-desk-agent</div>
            <div className="text-[var(--color-text-muted-on-dark)]"><span className="text-[var(--color-accent-secondary)]">voice:</span> warm, professional</div>
            <div className="text-[var(--color-text-muted-on-dark)]"><span className="text-[var(--color-accent-secondary)]">greeting:</span> &quot;Hi, how can I help?&quot;</div>
            <div className="text-[var(--color-text-muted-on-dark)]"><span className="text-[var(--color-accent-secondary)]">transfer_on:</span> billing, complaints</div>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <Settings2 className="h-3.5 w-3.5 text-[var(--color-text-muted-on-dark)]" />
            <span className="font-body text-[0.6rem] text-[var(--color-text-muted-on-dark)]">Prompt editor</span>
          </div>
        </div>
      </div>

      {/* Step 1 - Number assignment */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          activeStep === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-[340px] rounded-2xl bg-[var(--color-dark-section)] p-5 shadow-surface-xl sm:p-6 lg:max-w-[440px] lg:p-8">
          <div className="mb-5 text-[0.6rem] font-body uppercase tracking-[0.15em] text-[var(--color-text-muted-on-dark)]">Phone numbers</div>
          <div className="space-y-2.5">
            {[
              { num: "+1 (415) 555-0142", agent: "Inbound Sales", status: "active" },
              { num: "+1 (212) 555-0198", agent: "Support - Tier 1", status: "active" },
              { num: "+1 (310) 555-0067", agent: "Unassigned", status: "idle" },
            ].map((n) => (
              <div key={n.num} className="flex items-center justify-between rounded-xl bg-[var(--color-badge-dark)] p-3">
                <div className="flex items-center gap-2.5">
                  <Phone className="h-3 w-3 text-[var(--color-accent-secondary)]" />
                  <span className="font-mono text-[0.7rem] text-[var(--color-text-on-dark)]">{n.num}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden font-body text-[0.6rem] text-[var(--color-text-muted-on-dark)] sm:inline">{n.agent}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${n.status === "active" ? "bg-[var(--color-accent-secondary)]" : "bg-[var(--color-dark-divider)]"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step 2 - Call review */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          activeStep === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-[340px] rounded-2xl bg-[var(--color-dark-section)] p-5 shadow-surface-xl sm:p-6 lg:max-w-[440px] lg:p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[0.6rem] font-body uppercase tracking-[0.15em] text-[var(--color-text-muted-on-dark)]">Call detail</div>
            <span className="rounded-full bg-[var(--color-overlay-secondary-medium)] px-2 py-0.5 font-body text-[0.55rem] text-[var(--color-accent-secondary)]">Completed</span>
          </div>
          <div className="mb-5 flex items-center gap-2.5 border-b border-[var(--color-dark-divider)] pb-4">
            <Phone className="h-3 w-3 text-[var(--color-accent-secondary)]" />
            <span className="font-mono text-[0.7rem] text-[var(--color-text-on-dark)]">+1 (415) 555-0142</span>
            <span className="ml-auto font-body text-[0.6rem] text-[var(--color-text-muted-on-dark)]">4:23</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="h-3 w-3 text-[var(--color-accent-secondary)]" />
            <div className="text-[0.6rem] font-body uppercase tracking-[0.15em] text-[var(--color-text-muted-on-dark)]">Transcript</div>
          </div>
          <div className="space-y-2 text-[0.72rem] font-body">
            <div className="flex gap-2.5">
              <span className="w-9 shrink-0 font-mono text-[0.6rem] text-[var(--color-text-muted-on-dark)]">Agent</span>
              <span className="text-[var(--color-text-on-dark)]">Good afternoon, how can I help you today?</span>
            </div>
            <div className="flex gap-2.5">
              <span className="w-9 shrink-0 font-mono text-[0.6rem] text-[var(--color-text-muted-on-dark)]">Caller</span>
              <span className="text-[var(--color-text-on-dark)]">I&apos;d like to schedule a walkthrough of your enterprise plan.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section ── */
const Workflow = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="workflow" className="py-16 sm:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <ScrollReveal variant="fade-up">
          <div className="mb-10 sm:mb-14">
            <span className="mb-4 block font-body text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">How it works</span>
            <h2 className="mb-4 text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-[3rem]">
              Three steps to a
              <br />
              working phone agent
            </h2>
            <p className="max-w-md font-body text-[0.9rem] leading-[1.7] text-[var(--color-text-muted)]">
              No SDK integration, no custom infrastructure. Configure your agent, assign a number, and calls start flowing.
            </p>
          </div>
        </ScrollReveal>

        {/* Two-column: steps on left, illustration on right */}
        <ScrollReveal variant="fade-up" delay={100}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left - hoverable steps */}
            <div className="space-y-2">
              {steps.map((step) => (
                <div
                  key={step.id}
                  onMouseEnter={() => setActiveStep(step.id)}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-default ${
                    activeStep === step.id
                      ? "bg-[var(--color-bg)] shadow-surface-sm"
                      : "bg-transparent"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`font-mono text-[0.75rem] sm:text-[0.85rem] font-bold tracking-tight transition-colors duration-300 ${
                        activeStep === step.id ? "text-[var(--color-accent-secondary)]" : "text-[var(--color-text-muted)]/50"
                      }`}
                    >
                      {String(step.id + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`font-display text-[1rem] sm:text-[1.1rem] font-semibold tracking-[-0.01em] leading-snug transition-colors duration-300 ${
                        activeStep === step.id ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <div
                    className={`transition-all duration-300 overflow-hidden lg:transition-all ${
                      activeStep === step.id
                        ? "max-h-40 opacity-100 mt-2"
                        : "max-h-40 opacity-100 mt-2 lg:max-h-0 lg:opacity-0 lg:mt-0"
                    }`}
                  >
                    <p className="font-body text-[0.82rem] leading-[1.65] text-[var(--color-text-muted)]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right - illustration (desktop only, hidden on mobile) */}
            <div className="relative hidden lg:flex min-h-[320px] sm:min-h-[380px] lg:min-h-[440px] items-center justify-center">
              <StepIllustration activeStep={activeStep} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Workflow;
