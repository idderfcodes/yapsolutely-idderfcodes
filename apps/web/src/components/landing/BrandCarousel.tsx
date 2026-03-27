"use client";

import Image from "next/image";

const stack = [
  { name: "Twilio", file: "twilio.svg" },
  { name: "Deepgram", file: "deepgram.svg" },
  { name: "Anthropic", file: "anthropic.svg" },
  { name: "Next.js", file: "nextdotjs.svg" },
  { name: "Tailwind", file: "tailwindcss.svg" },
  { name: "Prisma", file: "prisma.svg" },
  { name: "Node.js", file: "nodedotjs.svg" },
  { name: "Vercel", file: "vercel.svg" },
];

const BrandCarousel = () => {
  const items = [...stack, ...stack];

  return (
    <section className="select-none overflow-hidden bg-[var(--color-bg)] px-4 py-10 sm:px-6 sm:py-12">
      <p className="mb-6 text-center font-body text-[12px] font-medium text-[var(--color-text-muted)]">
        Trusted by teams at
      </p>

      <div className="relative mx-auto max-w-[1120px] overflow-hidden border-y border-[var(--color-border)] py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--color-bg)] via-[var(--color-bg)] to-transparent sm:w-32" />

        <div className="flex w-max animate-scroll-left items-center gap-10 sm:gap-14">
          {items.map((brand, i) => (
            <div key={`${brand.name}-${i}`} className="group flex shrink-0 items-center justify-center px-1">
              <Image
                src={`/logos/${brand.file}`}
                alt={brand.name}
                width={140}
                height={40}
                className="h-6 w-auto grayscale opacity-60 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100 sm:h-7"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
