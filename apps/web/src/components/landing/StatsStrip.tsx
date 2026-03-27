const stats = [
  { value: "< 800ms", label: "Voice response latency" },
  { value: "100%", label: "Full transcript review" },
  { value: "Real lines", label: "Dedicated phone numbers" },
  { value: "24/7", label: "Agent availability" },
  { value: "Minutes", label: "Setup time" },
];

const StatsStrip = () => {
  return (
    <section className="py-14 sm:py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-1 font-display text-[1.5rem] font-semibold tracking-[-0.03em] text-[var(--color-accent-secondary)] sm:text-[1.75rem]">
                {stat.value}
              </div>
              <div className="font-body text-[0.78rem] text-[var(--color-text-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
