import { Phone, MessageSquare } from "lucide-react";

const DashboardPreview = () => {
  return (
    <section className="px-5 sm:px-6 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="mb-8 sm:mb-12">
          <span className="font-body text-[0.65rem] text-text-body uppercase tracking-[0.2em] block mb-4">Dashboard</span>
          <h2 className="text-[2rem] sm:text-[2.75rem] font-semibold tracking-[-0.03em] text-foreground leading-[1.08] mb-4">
            Your command center
          </h2>
          <p className="font-body text-[0.9rem] text-text-body leading-[1.7] max-w-lg">
            Manage agents, review transcripts, and monitor every call from a single workspace. Everything you need in one place.
          </p>
        </div>

        <div className="relative bg-surface-dark rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 md:p-10 overflow-hidden shadow-surface-xl">
          {/* Floating label */}
          <div className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-dark-foreground/8 font-body text-[0.6rem] text-surface-dark-foreground/40 tracking-wider uppercase">
              Live dashboard preview
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {/* Agent sidebar */}
            <div className="hidden sm:block bg-surface-dark-foreground/5 rounded-2xl p-5">
              <div className="text-[0.6rem] font-body text-surface-dark-foreground/30 uppercase tracking-[0.15em] mb-4">Agents</div>
              <div className="space-y-2">
                {[
                  { name: "Inbound Sales", active: true },
                  { name: "Support - Tier 1", active: true },
                  { name: "Appointment Booking", active: false },
                ].map((agent, i) => (
                  <div key={agent.name} className={`flex items-center gap-3 p-3 rounded-xl text-sm font-body transition-colors ${i === 0 ? "bg-surface-dark-foreground/8 text-surface-dark-foreground" : "text-surface-dark-foreground/35"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${agent.active ? "bg-emerald-400" : "bg-surface-dark-foreground/15"}`} />
                    {agent.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Main content area */}
            <div className="sm:col-span-2 space-y-4">
              <div className="bg-surface-dark-foreground/5 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[0.6rem] font-body text-surface-dark-foreground/30 uppercase tracking-[0.15em]">Call log</div>
                  <div className="text-xs font-body text-surface-dark-foreground/20">Today</div>
                </div>
                <div className="space-y-1.5">
                  {[
                    { number: "+1 (415) 555-0142", duration: "4:23", status: "Completed" },
                    { number: "+1 (212) 555-0198", duration: "2:17", status: "Completed" },
                    { number: "+1 (310) 555-0067", duration: "6:51", status: "Flagged" },
                  ].map((call, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-surface-dark-foreground/[0.03] text-sm font-body">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Phone className="w-3 h-3 text-surface-dark-foreground/20" />
                        <span className="text-surface-dark-foreground/50 font-mono text-[0.65rem] sm:text-xs">{call.number}</span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <span className="text-surface-dark-foreground/20 text-xs hidden sm:inline">{call.duration}</span>
                        <span className={`text-xs ${call.status === "Flagged" ? "text-amber-400/60" : "text-surface-dark-foreground/20"}`}>
                          {call.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface-dark-foreground/5 rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-3 h-3 text-surface-dark-foreground/20" />
                  <div className="text-[0.6rem] font-body text-surface-dark-foreground/30 uppercase tracking-[0.15em]">Transcript</div>
                </div>
                <div className="space-y-2.5 text-sm font-body">
                  <div className="flex gap-3">
                    <span className="text-surface-dark-foreground/20 text-xs font-mono shrink-0">Agent</span>
                    <span className="text-surface-dark-foreground/45">Good afternoon, how can I help you today?</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-surface-dark-foreground/20 text-xs font-mono shrink-0">Caller</span>
                    <span className="text-surface-dark-foreground/45">I&apos;d like to schedule a walkthrough of your enterprise plan.</span>
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
