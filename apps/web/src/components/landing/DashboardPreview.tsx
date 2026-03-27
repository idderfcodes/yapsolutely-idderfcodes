import { Phone, MessageSquare } from "lucide-react";

const DashboardPreview = () => {
  return (
    <section className="px-5 sm:px-6 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="mb-8 sm:mb-12">
          <span className="mb-4 block font-body text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Dashboard</span>
          <h2 className="mb-4 text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-[2.75rem]">
            Your command center
          </h2>
          <p className="max-w-lg font-body text-[0.9rem] leading-[1.7] text-[var(--color-text-muted)]">
            Manage agents, review transcripts, and monitor every call from a single workspace. Everything you need in one place.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[1.5rem] bg-[var(--color-dark-section)] p-5 shadow-surface-xl sm:rounded-[2rem] sm:p-8 md:p-10">
          {/* Floating label */}
          <div className="absolute top-3 right-3 sm:top-8 sm:right-8 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-overlay-medium)] px-3 py-1 font-body text-[0.6rem] uppercase tracking-wider text-[var(--color-text-muted-on-dark)]">
              Live dashboard preview
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {/* Agent sidebar */}
            <div className="hidden rounded-2xl bg-[var(--color-badge-dark)] p-5 sm:block">
              <div className="mb-4 text-[0.6rem] font-body uppercase tracking-[0.15em] text-[var(--color-text-muted-on-dark)]">Agents</div>
              <div className="space-y-2">
                {[
                  { name: "Inbound Sales", active: true },
                  { name: "Support - Tier 1", active: true },
                  { name: "Appointment Booking", active: false },
                ].map((agent, i) => (
                  <div key={agent.name} className={`flex items-center gap-3 rounded-xl p-3 text-sm font-body transition-colors ${i === 0 ? "bg-[var(--color-dark-divider)] text-[var(--color-text-on-dark)]" : "text-[var(--color-text-muted-on-dark)]"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${agent.active ? "bg-[var(--color-accent-secondary)]" : "bg-[var(--color-dark-divider)]"}`} />
                    {agent.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Main content area */}
            <div className="sm:col-span-2 space-y-4">
              <div className="rounded-2xl bg-[var(--color-badge-dark)] p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[0.6rem] font-body uppercase tracking-[0.15em] text-[var(--color-text-muted-on-dark)]">Call log</div>
                  <div className="text-xs font-body text-[var(--color-text-muted-on-dark)]">Today</div>
                </div>
                <div className="space-y-1.5">
                  {[
                    { number: "+1 (415) 555-0142", duration: "4:23", status: "Completed" },
                    { number: "+1 (212) 555-0198", duration: "2:17", status: "Completed" },
                    { number: "+1 (310) 555-0067", duration: "6:51", status: "Flagged" },
                  ].map((call, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl bg-[var(--color-dark-divider)] p-2.5 text-sm font-body sm:p-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Phone className="h-3 w-3 text-[var(--color-accent-secondary)]" />
                        <span className="font-mono text-[0.65rem] text-[var(--color-text-on-dark)] sm:text-xs">{call.number}</span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="hidden text-xs text-[var(--color-text-muted-on-dark)] sm:inline">{call.duration}</span>
                        <span className={`text-xs ${call.status === "Flagged" ? "text-[var(--color-accent-pop)]" : "text-[var(--color-text-muted-on-dark)]"}`}>
                          {call.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[var(--color-badge-dark)] p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-3 w-3 text-[var(--color-accent-secondary)]" />
                  <div className="text-[0.6rem] font-body uppercase tracking-[0.15em] text-[var(--color-text-muted-on-dark)]">Transcript</div>
                </div>
                <div className="space-y-2.5 text-sm font-body">
                  <div className="flex gap-3">
                    <span className="shrink-0 font-mono text-xs text-[var(--color-text-muted-on-dark)]">Agent</span>
                    <span className="text-[var(--color-text-on-dark)]">Good afternoon, how can I help you today?</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="shrink-0 font-mono text-xs text-[var(--color-text-muted-on-dark)]">Caller</span>
                    <span className="text-[var(--color-text-on-dark)]">I&apos;d like to schedule a walkthrough of your enterprise plan.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
