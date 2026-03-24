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
        <div className="w-full max-w-[340px] bg-surface-dark rounded-2xl p-5 sm:p-6 shadow-surface-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/50" />
            <span className="ml-auto font-mono text-[0.55rem] text-surface-dark-foreground/20">prompt.md</span>
          </div>
          <div className="space-y-2 font-mono text-[0.7rem] leading-[1.8]">
            <div className="text-surface-dark-foreground/30"><span className="text-emerald-400/50">role:</span> front-desk-agent</div>
            <div className="text-surface-dark-foreground/30"><span className="text-emerald-400/50">voice:</span> warm, professional</div>
            <div className="text-surface-dark-foreground/30"><span className="text-emerald-400/50">greeting:</span> &quot;Hi, how can I help?&quot;</div>
            <div className="text-surface-dark-foreground/30"><span className="text-emerald-400/50">transfer_on:</span> billing, complaints</div>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <Settings2 className="w-3.5 h-3.5 text-surface-dark-foreground/20" />
            <span className="text-[0.6rem] text-surface-dark-foreground/20 font-body">Prompt editor</span>
          </div>
        </div>
      </div>

      {/* Step 1 - Number assignment */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          activeStep === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-[340px] bg-surface-dark rounded-2xl p-5 sm:p-6 shadow-surface-xl">
          <div className="text-[0.6rem] font-body text-surface-dark-foreground/25 uppercase tracking-[0.15em] mb-5">Phone numbers</div>
          <div className="space-y-2.5">
            {[
              { num: "+1 (415) 555-0142", agent: "Inbound Sales", status: "active" },
              { num: "+1 (212) 555-0198", agent: "Support - Tier 1", status: "active" },
              { num: "+1 (310) 555-0067", agent: "Unassigned", status: "idle" },
            ].map((n) => (
              <div key={n.num} className="flex items-center justify-between p-3 rounded-xl bg-surface-dark-foreground/[0.04]">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-3 h-3 text-surface-dark-foreground/20" />
                  <span className="font-mono text-[0.7rem] text-surface-dark-foreground/50">{n.num}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[0.6rem] text-surface-dark-foreground/25 font-body hidden sm:inline">{n.agent}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${n.status === "active" ? "bg-emerald-400" : "bg-surface-dark-foreground/15"}`} />
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
        <div className="w-full max-w-[340px] bg-surface-dark rounded-2xl p-5 sm:p-6 shadow-surface-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[0.6rem] font-body text-surface-dark-foreground/25 uppercase tracking-[0.15em]">Call detail</div>
            <span className="text-[0.55rem] text-emerald-400/60 font-body px-2 py-0.5 rounded-full bg-emerald-400/10">Completed</span>
          </div>
          <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-surface-dark-foreground/[0.06]">
            <Phone className="w-3 h-3 text-surface-dark-foreground/20" />
            <span className="font-mono text-[0.7rem] text-surface-dark-foreground/50">+1 (415) 555-0142</span>
            <span className="ml-auto text-[0.6rem] text-surface-dark-foreground/20 font-body">4:23</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-3 h-3 text-surface-dark-foreground/20" />
            <div className="text-[0.6rem] font-body text-surface-dark-foreground/25 uppercase tracking-[0.15em]">Transcript</div>
          </div>
          <div className="space-y-2 text-[0.72rem] font-body">
            <div className="flex gap-2.5">
              <span className="text-surface-dark-foreground/20 font-mono text-[0.6rem] shrink-0 w-9">Agent</span>
              <span className="text-surface-dark-foreground/40">Good afternoon, how can I help you today?</span>
            </div>
            <div className="flex gap-2.5">
              <span className="text-surface-dark-foreground/20 font-mono text-[0.6rem] shrink-0 w-9">Caller</span>
              <span className="text-surface-dark-foreground/40">I&apos;d like to schedule a walkthrough of your enterprise plan.</span>
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
            <span className="font-body text-[0.65rem] text-text-subtle/60 uppercase tracking-[0.2em] block mb-4">How it works</span>
            <h2 className="text-[2.25rem] sm:text-[3rem] font-semibold tracking-[-0.03em] text-foreground leading-[1.08] mb-4">
              Three steps to a
              <br />
              working phone agent
            </h2>
            <p className="font-body text-[0.9rem] text-text-subtle leading-[1.7] max-w-md">
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
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-default ${
                    activeStep === step.id
                      ? "bg-white dark:bg-surface-elevated shadow-surface-sm"
                      : "bg-transparent"
                  }`}
                >
                  <h3
                    className={`font-display text-[1rem] sm:text-[1.1rem] font-semibold tracking-[-0.01em] leading-snug transition-colors duration-300 ${
                      activeStep === step.id ? "text-text-strong" : "text-text-subtle/50"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      activeStep === step.id
                        ? "max-h-40 opacity-100 mt-2"
                        : "max-h-0 opacity-0 mt-0"
                    }`}
                  >
                    <p className="font-body text-[0.82rem] leading-[1.65] text-text-subtle">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right - illustration */}
            <div className="relative min-h-[320px] sm:min-h-[380px] flex items-center justify-center">
              <StepIllustration activeStep={activeStep} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Workflow;
