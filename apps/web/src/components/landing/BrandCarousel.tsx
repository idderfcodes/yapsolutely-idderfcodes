"use client";

import Image from "next/image";

const stack = [
  { name: "Twilio", file: "twilio.svg" },
  { name: "Deepgram", file: "deepgram.svg" },
  { name: "Anthropic", file: "anthropic.svg" },
  { name: "Next.js", file: "nextdotjs.svg" },
  { name: "React", file: "react.svg" },
  { name: "TypeScript", file: "typescript.svg" },
  { name: "PostgreSQL", file: "postgresql.svg" },
  { name: "Prisma", file: "prisma.svg" },
  { name: "Tailwind CSS", file: "tailwindcss.svg" },
  { name: "Node.js", file: "nodedotjs.svg" },
  { name: "Docker", file: "docker.svg" },
  { name: "Vercel", file: "vercel.svg" },
  { name: "Zod", file: "zod.svg" },
];

const BrandCarousel = () => {
  // Duplicate the list for seamless infinite loop
  const items = [...stack, ...stack];

  return (
    <section className="pt-8 sm:pt-10 pb-8 sm:pb-10 overflow-hidden select-none">
      <p className="text-center font-body text-[0.7rem] text-text-subtle/50 uppercase tracking-[0.18em] mb-6">
        Powered by
      </p>

      <div className="relative">
        {/* Left fade */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left gap-10 sm:gap-14 w-max">
          {items.map((brand, i) => (
            <div key={`${brand.name}-${i}`} className="flex items-center gap-2.5 opacity-40 grayscale shrink-0">
              <Image
                src={`/logos/${brand.file}`}
                alt={brand.name}
                width={24}
                height={24}
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
              <span className="font-display text-[0.85rem] sm:text-[0.95rem] font-semibold text-foreground whitespace-nowrap">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
