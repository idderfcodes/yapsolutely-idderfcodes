const Workflow = () => {
  return (
    <section id="workflow" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-20">
          <h2 className="text-[2.5rem] sm:text-[3.25rem] font-semibold tracking-[-0.03em] text-foreground leading-[1.1]">
            Three steps to a
            <br />
            working phone agent
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Build — featured */}
          <div className="lg:col-span-7 bg-surface-dark rounded-panel p-10 sm:p-14 flex flex-col justify-between min-h-[340px]">
            <div>
              <span className="font-mono text-xs text-surface-dark-foreground/20 block mb-8">01</span>
              <h3 className="font-display text-[1.75rem] sm:text-[2.25rem] font-semibold tracking-[-0.025em] text-surface-dark-foreground mb-5 leading-[1.15]">
                Define your agent's
                <br />
                behavior and script
              </h3>
              <p className="font-body text-surface-dark-foreground/40 text-[0.9rem] leading-[1.7] max-w-md">
                Set the voice, tone, routing logic, and fallback rules. Configure what your agent says, when it transfers, and how it handles edge cases.
              </p>
            </div>
            <div className="mt-10 font-body text-[0.65rem] text-surface-dark-foreground/15 uppercase tracking-[0.2em]">Build</div>
          </div>

          {/* Deploy + Monitor stacked */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-elevated rounded-panel p-8 sm:p-10 flex-1">
              <span className="font-mono text-xs text-text-subtle/50 block mb-5">02</span>
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-foreground mb-2.5 leading-snug">
                Assign a number and go live
              </h3>
              <p className="font-body text-sm text-text-subtle leading-[1.7]">
                Provision a phone number, attach it to your agent, and start receiving inbound calls. Push updates without downtime.
              </p>
              <div className="mt-7 font-body text-[0.65rem] text-text-subtle/30 uppercase tracking-[0.2em]">Deploy</div>
            </div>

            <div className="bg-surface-elevated rounded-panel p-8 sm:p-10 flex-1">
              <span className="font-mono text-xs text-text-subtle/50 block mb-5">03</span>
              <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-foreground mb-2.5 leading-snug">
                Review every call in detail
              </h3>
              <p className="font-body text-sm text-text-subtle leading-[1.7]">
                Read transcripts, flag conversations, and track agent performance. Full audit trail on every interaction.
              </p>
              <div className="mt-7 font-body text-[0.65rem] text-text-subtle/30 uppercase tracking-[0.2em]">Monitor</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
