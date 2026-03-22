const ProductShowcase = () => {
  return (
    <section id="platform" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: narrative */}
          <div className="lg:pt-4">
            <h2 className="text-[2.5rem] sm:text-[3.25rem] font-semibold tracking-[-0.03em] text-foreground leading-[1.1] mb-10">
              One dashboard for
              <br />
              your entire voice operation
            </h2>

            <div className="space-y-10">
              <div>
                <h3 className="font-display text-[0.95rem] font-medium text-foreground mb-2">Agents & numbers</h3>
                <p className="font-body text-sm text-text-subtle leading-[1.7] max-w-md">
                  Create agents, assign dedicated phone numbers, and configure routing — each agent operates independently with its own script and logic.
                </p>
              </div>
              <div className="w-10 h-px bg-border/60" />
              <div>
                <h3 className="font-display text-[0.95rem] font-medium text-foreground mb-2">Transcripts & review</h3>
                <p className="font-body text-sm text-text-subtle leading-[1.7] max-w-md">
                  Every conversation is transcribed and indexed. Search across calls, flag moments for follow-up, and export data when you need it.
                </p>
              </div>
              <div className="w-10 h-px bg-border/60" />
              <div>
                <h3 className="font-display text-[0.95rem] font-medium text-foreground mb-2">Call logs & performance</h3>
                <p className="font-body text-sm text-text-subtle leading-[1.7] max-w-md">
                  Track duration, disposition, and volume across all agents. See which calls were resolved, which were flagged, and where to improve.
                </p>
              </div>
            </div>
          </div>

          {/* Right: product preview card */}
          <div className="bg-surface-elevated rounded-panel p-6 sm:p-8 border border-border/30">
            <div className="mb-6">
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-display text-sm font-medium text-foreground">Inbound Sales</span>
                <span className="font-body text-xs text-text-subtle/60 ml-auto font-mono">+1 (415) 555-0142</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Today", value: "47" },
                  { label: "Avg. duration", value: "3:42" },
                  { label: "Resolved", value: "91%" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-secondary rounded-xl p-3.5 text-center">
                    <div className="font-display text-lg font-semibold text-foreground">{stat.value}</div>
                    <div className="font-body text-xs text-text-subtle mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary rounded-xl p-4">
              <div className="font-body text-[0.65rem] text-text-subtle/50 uppercase tracking-[0.15em] mb-3">Latest transcript</div>
              <div className="space-y-3 text-sm font-body">
                <div>
                  <span className="text-xs font-mono text-text-subtle/30 mr-2">0:00</span>
                  <span className="text-xs font-medium text-foreground/50">Agent</span>
                  <p className="text-text-subtle mt-0.5">Good afternoon. How can I help you?</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-text-subtle/30 mr-2">0:04</span>
                  <span className="text-xs font-medium text-foreground/50">Caller</span>
                  <p className="text-text-subtle mt-0.5">We need something to handle after-hours calls for our practice.</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-text-subtle/30 mr-2">0:12</span>
                  <span className="text-xs font-medium text-foreground/50">Agent</span>
                  <p className="text-text-subtle mt-0.5">I can walk you through how that works. It takes about ten minutes to set up.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
