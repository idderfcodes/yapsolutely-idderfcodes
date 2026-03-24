import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section id="product" className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-5 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Asymmetric hero: left-aligned headline + right embedded illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-14 sm:mb-20">
          <div className="lg:col-span-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-elevated border border-border-soft/40 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse-dot" />
              <span className="font-body text-[0.7rem] text-text-subtle tracking-wide">Handling calls now</span>
            </div>
            <h1 className="text-[2.25rem] sm:text-[3.5rem] lg:text-[4.5rem] font-semibold tracking-[-0.035em] leading-[1.02] text-foreground mb-6">
              AI agents that
              <br />
              answer your phone
            </h1>
            <p className="text-[0.95rem] sm:text-[1.05rem] text-text-subtle max-w-lg leading-[1.65] mb-8">
              Build voice agents, assign them real phone numbers, and let them handle inbound calls. Review every transcript and monitor every conversation from one workspace.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Button variant="hero" size="xl" className="btn-press" asChild>
                <Link href="/sign-up">
                  Start building free
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" className="btn-press" asChild>
                <a href="#workflow">See how it works</a>
              </Button>
            </div>
            <p className="mt-4 font-body text-[0.75rem] text-text-subtle/60 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent-gold" />
              No credit card required. Free plan available.
            </p>
          </div>

          {/* Right column - embedded voice agent illustration */}
          <div className="lg:col-span-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {/* Browser-style bezel around real dashboard screenshot */}
            <div className="relative mx-auto rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-border-soft/60">
              {/* Browser chrome bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-panel border-b border-border-soft/40">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-canvas rounded-md px-3 py-1 text-[0.6rem] text-text-subtle font-mono text-center truncate">
                    yapsolutely.xyz/dashboard
                  </div>
                </div>
              </div>
              {/* Screenshot */}
              <img
                src="/hero-dashboard.png"
                alt="Yapsolutely dashboard showing voice agents, call logs, and live transcripts"
                width={1641}
                height={965}
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>

        {/* Dark contrast dashboard preview - the signature editorial block */}
        <div className="animate-fade-up" style={{ animationDelay: "0.35s" }}>
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
      </div>
    </section>
  );
};

export default Hero;
