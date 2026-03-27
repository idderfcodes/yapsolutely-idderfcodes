"use client";

import { Phone, Shield, BarChart3 } from "lucide-react";
import ScrollReveal from "@/components/landing/ScrollReveal";

const ProductShowcase = () => {
  return (
    <section id="platform" className="py-16 sm:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8">
            <ScrollReveal variant="fade-right">
              <span className="mb-4 block font-body text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Platform</span>
              <h2 className="text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-[3rem]">
                One workspace for your
                <br />
                entire voice operation
              </h2>
            </ScrollReveal>
          </div>
        </div>

        {/* Asymmetric feature grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left */}
          <ScrollReveal variant="fade-up" delay={0} duration={600} className="lg:col-span-7">
            <div className="h-full rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-bg)] p-8 transition-all duration-200 hover:border-[var(--color-accent-primary)] hover:shadow-surface-sm sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-overlay-accent-soft)]">
                  <Phone className="h-4 w-4 text-[var(--color-accent-primary)]" />
                </div>
                <h3 className="font-display text-[1rem] font-medium text-[var(--color-text-primary)]">Agents &amp; Numbers</h3>
              </div>
              <p className="mb-8 max-w-lg font-body text-[0.88rem] leading-[1.7] text-[var(--color-text-muted)]">
                Create agents with custom prompts, assign dedicated phone numbers, and configure routing rules. Each agent operates independently with its own script, voice, and tool integrations.
              </p>

              {/* Mini product preview */}
              <div className="rounded-2xl bg-[var(--color-bg-secondary)] p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-accent-pop)]" />
                  <span className="font-display text-sm font-medium text-[var(--color-text-primary)]">Inbound Sales</span>
                  <span className="ml-auto font-body font-mono text-xs text-[var(--color-text-muted)]">+1 (415) 555-0142</span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { label: "Today", value: "47" },
                    { label: "Avg. duration", value: "3:42" },
                    { label: "Resolved", value: "91%" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-[var(--color-bg)] p-3 text-center">
                      <div className="font-display text-base font-semibold text-[var(--color-text-primary)]">{stat.value}</div>
                      <div className="mt-0.5 font-body text-[0.65rem] text-[var(--color-text-muted)]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right stacked */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <ScrollReveal variant="fade-up" delay={150} duration={600}>
              <div className="flex-1 rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-bg)] p-7 transition-all duration-200 hover:border-[var(--color-accent-primary)] hover:shadow-surface-sm sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-overlay-accent-soft)]">
                    <Shield className="h-3.5 w-3.5 text-[var(--color-accent-primary)]" />
                  </div>
                  <h3 className="font-display text-[0.92rem] font-medium text-[var(--color-text-primary)]">Transcripts &amp; Review</h3>
                </div>
                <p className="mb-4 font-body text-[0.82rem] leading-[1.7] text-[var(--color-text-muted)]">
                  Every conversation is transcribed and indexed. Search across calls, flag moments for follow-up, and export data when you need it.
                </p>
                {/* Mini transcript snippet */}
                <div className="space-y-1 rounded-lg bg-[var(--color-bg-secondary)] p-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-[var(--color-accent-secondary)]/70" />
                    <span className="font-mono text-[0.6rem] text-[var(--color-text-muted)]">0:04</span>
                    <span className="font-body text-[0.62rem] text-[var(--color-text-primary)]">Thanks for calling, how can I help?</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-[var(--color-accent-primary)]/70" />
                    <span className="font-mono text-[0.6rem] text-[var(--color-text-muted)]">0:08</span>
                    <span className="font-body text-[0.62rem] text-[var(--color-text-primary)]">I&apos;d like to book an appointment...</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={300} duration={600}>
              <div className="flex-1 rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-bg)] p-7 transition-all duration-200 hover:border-[var(--color-accent-primary)] hover:shadow-surface-sm sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-overlay-accent-soft)]">
                    <BarChart3 className="h-3.5 w-3.5 text-[var(--color-accent-primary)]" />
                  </div>
                  <h3 className="font-display text-[0.92rem] font-medium text-[var(--color-text-primary)]">Call Logs &amp; Performance</h3>
                </div>
                <p className="mb-4 font-body text-[0.82rem] leading-[1.7] text-[var(--color-text-muted)]">
                  Track duration, disposition, and volume across all agents. See which calls were resolved, flagged, and where to improve.
                </p>
                {/* Mini stats bar */}
                <div className="flex gap-2">
                  <div className="flex-1 rounded-lg bg-[var(--color-bg-secondary)] px-3 py-1.5 text-center">
                    <div className="font-display text-sm font-semibold text-[var(--color-text-primary)]">142</div>
                    <div className="font-body text-[0.55rem] text-[var(--color-text-muted)]">Calls</div>
                  </div>
                  <div className="flex-1 rounded-lg bg-[var(--color-bg-secondary)] px-3 py-1.5 text-center">
                    <div className="font-display text-sm font-semibold text-[var(--color-text-primary)]">2:38</div>
                    <div className="font-body text-[0.55rem] text-[var(--color-text-muted)]">Avg</div>
                  </div>
                  <div className="flex-1 rounded-lg bg-[var(--color-bg-secondary)] px-3 py-1.5 text-center">
                    <div className="font-display text-sm font-semibold text-[var(--color-accent-primary)]">94%</div>
                    <div className="font-body text-[0.55rem] text-[var(--color-text-muted)]">Resolved</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
