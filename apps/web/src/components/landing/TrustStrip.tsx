const TrustStrip = () => {
  const capabilities = [
    "Dedicated phone numbers",
    "Full transcript review",
    "Sub-second latency",
    "Live call monitoring",
  ];

  return (
    <section className="py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {capabilities.map((cap, i) => (
            <div key={cap} className="flex items-center gap-3 font-body text-[0.8rem] text-text-subtle/70 tracking-wide">
              {i > 0 && <span className="hidden sm:block w-px h-3 bg-border/50" />}
              {cap}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
