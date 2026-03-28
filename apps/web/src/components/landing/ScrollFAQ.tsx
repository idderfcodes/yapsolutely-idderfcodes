"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface ScrollFAQProps {
  data: FAQItem[];
  eyebrow?: string;
  heading?: string;
  subtext?: string;
  className?: string;
}

export default function ScrollFAQ({
  data,
  eyebrow = "FAQ",
  heading = "Questions teams ask before they trust the line.",
  subtext = "The basics matter: setup speed, voice behavior, transcripts, security posture, and what happens after the call ends.",
  className,
}: ScrollFAQProps) {
  const [openItem, setOpenItem] = React.useState<string>(data[0]?.id ?? "");
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || data.length === 0) return;

      // Kill any previous triggers on this container
      ScrollTrigger.getAll()
        .filter((t) => t.vars.id === "faq-scroll")
        .forEach((t) => t.kill());

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "faq-scroll",
          trigger: containerRef.current,
          start: "top top",
          end: `+=${data.length * 220}`,
          scrub: 0.4,
          pin: true,
          anticipatePin: 1,
        },
      });

      data.forEach((item, index) => {
        tl.add(() => setOpenItem(item.id), index * 1.4);
      });

      return () => {
        ScrollTrigger.getAll()
          .filter((t) => t.vars.id === "faq-scroll")
          .forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [data] },
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex h-screen w-full items-center justify-center bg-[var(--color-bg)]",
        className,
      )}
    >
      <div className="landing-container w-full">
        <div className="grid gap-10 lg:grid-cols-[minmax(280px,0.78fr)_minmax(0,1.22fr)] lg:items-start">
          {/* Left column — sticky header */}
          <div>
            <div className="landing-pill inline-flex items-center px-4 py-2 landing-body font-medium text-[var(--color-accent-primary)]">
              {eyebrow}
            </div>
            <h2 className="landing-display landing-display-1 mt-6 max-w-[12ch] text-[var(--color-text-primary)]">
              {heading}
            </h2>
            <p className="landing-body landing-body-1-regular mt-4 max-w-[28rem] text-[var(--color-text-muted)]">
              {subtext}
            </p>

            {/* Progress dots */}
            <div className="mt-8 flex gap-2">
              {data.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setOpenItem(item.id)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    openItem === item.id
                      ? "w-6 bg-[var(--color-accent-primary)]"
                      : "w-1.5 bg-[var(--color-border)]",
                  )}
                  aria-label={`Open question ${item.id}`}
                />
              ))}
            </div>
          </div>

          {/* Right column — accordion */}
          <Accordion.Root
            type="single"
            collapsible
            value={openItem}
            onValueChange={(val) => val && setOpenItem(val)}
            className="flex flex-col gap-4"
          >
            {data.map((item, index) => {
              const isOpen = openItem === item.id;

              return (
                <Accordion.Item
                  key={item.id}
                  value={item.id}
                  className={cn(
                    "overflow-hidden rounded-[24px] border transition-all duration-300",
                    isOpen
                      ? "border-[var(--color-accent-primary)] bg-[var(--color-bg)] shadow-[0_24px_44px_-34px_rgba(238,48,58,0.18)]"
                      : "border-[var(--color-border)] bg-[var(--color-bg)]",
                  )}
                >
                  <Accordion.Header>
                    <Accordion.Trigger asChild>
                      <button
                        type="button"
                        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6"
                      >
                        <div className="flex flex-1 items-start gap-4">
                          <span className="landing-body mt-1 rounded-full bg-[var(--color-bg-secondary)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "landing-display landing-display-3 flex-1 text-[var(--color-text-primary)]",
                            )}
                          >
                            {item.question}
                          </span>
                        </div>
                        <span
                          className={cn(
                            "mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                            isOpen
                              ? "border-[var(--color-accent-primary)] bg-[var(--color-overlay-accent-soft)] text-[var(--color-accent-primary)]"
                              : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]",
                          )}
                        >
                          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </span>
                      </button>
                    </Accordion.Trigger>
                  </Accordion.Header>

                  <Accordion.Content asChild forceMount>
                    <motion.div
                      initial="collapsed"
                      animate={isOpen ? "open" : "collapsed"}
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="landing-body landing-body-1-regular px-5 pb-5 pl-[4.5rem] text-[var(--color-text-muted)] sm:px-6 sm:pb-6 sm:pl-[5rem]">
                        {item.answer}
                      </p>
                    </motion.div>
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
          </Accordion.Root>
        </div>
      </div>
    </div>
  );
}
