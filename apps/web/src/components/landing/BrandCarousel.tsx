"use client";

/* Simple recognizable SVG brand wordmarks — styled monochromatically for uniformity */
const BrandLogo = ({ name }: { name: string }) => {
  const cls = "h-6 sm:h-7 w-auto text-text-subtle/40";
  switch (name) {
    case "Zendesk":
      return (
        <svg className={cls} viewBox="0 0 120 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.6 7.2L0 22.8h12.6V7.2zm0-7.2H0v5.4l12.6 0V0zm2.8 22.8h12.6V0H15.4l0 22.8zm0 5.2h12.6L15.4 13.4V28zM40 9.8c0-2.8 1.6-4.2 3.6-4.2 2 0 3.4 1.4 3.4 4v.4h-4.2c.1 1.4 1 2.2 2.4 2.2 1 0 1.8-.3 2.6-.8l.8 1.6c-1 .7-2.2 1.1-3.6 1.1C41.8 14.1 40 12.4 40 9.8zm5.2-.8c-.1-1.2-.7-1.8-1.7-1.8-.9 0-1.6.7-1.7 1.8h3.4zM49 5.8h2.4l.2 1.2c.8-.8 1.8-1.4 3-1.4 2.2 0 3.2 1.4 3.2 3.8V14h-2.6V9.8c0-1.4-.5-2-1.5-2-.8 0-1.4.4-2.1 1V14H49V5.8zM65.2 0h2.6v14h-2.4l-.2-1.2c-.8.8-1.7 1.4-3 1.4-2.4 0-4-1.8-4-4.4s1.6-4.4 4-4.4c1 0 1.9.4 2.6 1l.4-.1V0zm-2 12.2c.9 0 1.5-.4 2-1V8.4c-.5-.6-1.1-.9-2-.9-1.3 0-2.1 1-2.1 2.4 0 1.3.8 2.3 2.1 2.3zM69.8 9.8c0-2.8 1.6-4.2 3.6-4.2 2 0 3.4 1.4 3.4 4v.4h-4.2c.1 1.4 1 2.2 2.4 2.2 1 0 1.8-.3 2.6-.8l.8 1.6c-1 .7-2.2 1.1-3.6 1.1C71.6 14.1 69.8 12.4 69.8 9.8zm5.2-.8c-.1-1.2-.7-1.8-1.7-1.8-.9 0-1.6.7-1.7 1.8h3.4zM78.6 11.6l1.6-1.4c.8.9 1.8 1.6 3.2 1.6 1.1 0 1.7-.5 1.7-1.1 0-.8-.8-1-2-1.4-1.6-.5-3.4-1-3.4-3.2 0-1.8 1.5-3.2 3.8-3.2 1.6 0 3 .7 3.8 1.6l-1.4 1.4c-.7-.7-1.5-1.1-2.5-1.1-.9 0-1.4.4-1.4 1 0 .7.7 1 1.8 1.3 1.7.5 3.6 1 3.6 3.2 0 1.8-1.4 3.4-4 3.4-1.8 0-3.4-.8-4.4-2zM90 5.8h2.6l.8 3.6.6 2.6.8-2.6 1.2-3.6h1.8l1.2 3.6.8 2.6.6-2.6.8-3.6h2.4L100.8 14h-2.4l-1.2-3.8-.6-2-.6 2L94.8 14h-2.4L90 5.8z"/>
        </svg>
      );
    case "HubSpot":
      return (
        <svg className={cls} viewBox="0 0 100 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="21" fontSize="20" fontWeight="700" fontFamily="system-ui" letterSpacing="-0.5">HubSpot</text>
        </svg>
      );
    case "Calendly":
      return (
        <svg className={cls} viewBox="0 0 110 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="21" fontSize="20" fontWeight="600" fontFamily="system-ui" letterSpacing="-0.3">Calendly</text>
        </svg>
      );
    case "Zocdoc":
      return (
        <svg className={cls} viewBox="0 0 90 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="21" fontSize="20" fontWeight="700" fontFamily="system-ui" letterSpacing="-0.5">Zocdoc</text>
        </svg>
      );
    case "Freshworks":
      return (
        <svg className={cls} viewBox="0 0 130 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="21" fontSize="19" fontWeight="600" fontFamily="system-ui" letterSpacing="-0.3">Freshworks</text>
        </svg>
      );
    case "Toast":
      return (
        <svg className={cls} viewBox="0 0 70 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="21" fontSize="20" fontWeight="700" fontFamily="system-ui" letterSpacing="-0.5">Toast</text>
        </svg>
      );
    case "Dialpad":
      return (
        <svg className={cls} viewBox="0 0 90 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="21" fontSize="19" fontWeight="600" fontFamily="system-ui" letterSpacing="-0.3">Dialpad</text>
        </svg>
      );
    case "Lemonade":
      return (
        <svg className={cls} viewBox="0 0 120 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="21" fontSize="20" fontWeight="600" fontFamily="system-ui" letterSpacing="-0.3">Lemonade</text>
        </svg>
      );
    case "ServiceTitan":
      return (
        <svg className={cls} viewBox="0 0 140 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="21" fontSize="18" fontWeight="700" fontFamily="system-ui" letterSpacing="-0.3">ServiceTitan</text>
        </svg>
      );
    case "Opendoor":
      return (
        <svg className={cls} viewBox="0 0 110 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="21" fontSize="19" fontWeight="700" fontFamily="system-ui" letterSpacing="-0.5">Opendoor</text>
        </svg>
      );
    case "Better.com":
      return (
        <svg className={cls} viewBox="0 0 120 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="21" fontSize="19" fontWeight="700" fontFamily="system-ui" letterSpacing="-0.5">Better.com</text>
        </svg>
      );
    case "Mindbody":
      return (
        <svg className={cls} viewBox="0 0 120 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <text x="0" y="21" fontSize="19" fontWeight="700" fontFamily="system-ui" letterSpacing="-0.3">MINDBODY</text>
        </svg>
      );
    default:
      return <span className="font-display text-[0.95rem] font-semibold text-text-subtle/40 whitespace-nowrap">{name}</span>;
  }
};

const brands = [
  "Zendesk", "HubSpot", "Calendly", "Zocdoc", "Freshworks", "Toast",
  "Dialpad", "Lemonade", "ServiceTitan", "Opendoor", "Better.com", "Mindbody",
];

const BrandCarousel = () => {
  return (
    <section className="py-10 sm:py-14 overflow-hidden select-none">
      <p className="text-center font-body text-[0.7rem] text-text-subtle/50 uppercase tracking-[0.18em] mb-6">
        Built for teams like
      </p>

      <div className="relative">
        {/* Left / right fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 z-10 bg-gradient-to-r from-canvas to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 z-10 bg-gradient-to-l from-canvas to-transparent" />

        {/* Two identical tracks side by side for seamless infinite loop */}
        <div className="flex w-max animate-scroll-left">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-10 sm:gap-14 px-5 sm:px-7 shrink-0">
              {brands.map((name) => (
                <div key={`${name}-${copy}`} className="shrink-0 opacity-90 hover:opacity-100 transition-opacity">
                  <BrandLogo name={name} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
