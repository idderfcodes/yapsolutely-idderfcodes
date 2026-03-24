"use client";

import Image from "next/image";

const stack = [
  { name: "Twilio", file: "twilio.svg", color: "#F22F46" },
  { name: "Deepgram", file: "deepgram.svg", color: "#13EF93" },
  { name: "Anthropic", file: "anthropic.svg", color: "#D4A27F" },
  { name: "Next.js", file: "nextdotjs.svg", color: "#000000" },
  { name: "React", file: "react.svg", color: "#61DAFB" },
  { name: "TypeScript", file: "typescript.svg", color: "#3178C6" },
  { name: "PostgreSQL", file: "postgresql.svg", color: "#4169E1" },
  { name: "Prisma", file: "prisma.svg", color: "#2D3748" },
  { name: "Tailwind CSS", file: "tailwindcss.svg", color: "#06B6D4" },
  { name: "Node.js", file: "nodedotjs.svg", color: "#5FA04E" },
  { name: "Docker", file: "docker.svg", color: "#2496ED" },
  { name: "Vercel", file: "vercel.svg", color: "#000000" },
  { name: "Zod", file: "zod.svg", color: "#3E67B1" },
];

const BrandCarousel = () => {
  // Duplicate the list for seamless infinite loop
  const items = [...stack, ...stack];

  return (
    <section className="pt-2 sm:pt-3 pb-8 sm:pb-10 overflow-hidden select-none">
      <p className="text-center font-body text-[0.7rem] text-text-body uppercase tracking-[0.18em] mb-6">
        Powered by
      </p>

      <div className="relative">
        {/* Left fade */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scroll-left gap-10 sm:gap-14 w-max">
          {items.map((brand, i) => (
            <div key={`${brand.name}-${i}`} className="flex items-center gap-2.5 opacity-70 shrink-0">
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
