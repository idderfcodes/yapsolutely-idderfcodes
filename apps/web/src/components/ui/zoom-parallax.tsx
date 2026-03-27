"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ZoomParallaxProps = {
  framePaths: string[];
  label?: string;
  title?: string;
  className?: string;
};

export function ZoomParallax({
  framePaths,
  label = "See it in action",
  title = "A call handled. In seconds.",
  className,
}: ZoomParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const activeFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  // Keep preloaded Image objects alive so the browser doesn't evict them
  const preloadedRef = useRef<HTMLImageElement[]>([]);

  // Batch-preload all frames immediately
  useEffect(() => {
    if (!framePaths.length) return;
    const images = framePaths.map((src) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
      return img;
    });
    preloadedRef.current = images;
    return () => {
      images.forEach((img) => { img.src = ""; });
      preloadedRef.current = [];
    };
  }, [framePaths]);

  // Scroll → frame sync using direct window scroll listener + rAF throttle
  useEffect(() => {
    if (!framePaths.length) return;

    const update = () => {
      rafRef.current = 0;
      const container = containerRef.current;
      const img = imgRef.current;
      const titleEl = titleRef.current;
      if (!container || !img) return;

      const rect = container.getBoundingClientRect();
      const maxScroll = container.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(scrolled / maxScroll, 1);

      // Frame index
      const nextIndex = Math.max(
        0,
        Math.min(framePaths.length - 1, Math.round(progress * (framePaths.length - 1))),
      );
      if (nextIndex !== activeFrameRef.current) {
        activeFrameRef.current = nextIndex;
        const src = framePaths[nextIndex];
        if (src) img.src = src;
      }

      // Title fade: 0–12% progress → opacity 1→0, translate 0→-40px
      if (titleEl) {
        const t = Math.min(progress / 0.12, 1);
        titleEl.style.opacity = String(1 - t);
        titleEl.style.transform = `translateY(${-40 * t}px)`;
      }
    };

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [framePaths]);

  const firstFrame = framePaths[0] ?? "";

  return (
    <div ref={containerRef} className={cn("relative h-[420vh]", className)}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#0d0d0d]">
        <img
          ref={imgRef}
          src={firstFrame}
          alt={title}
          loading="eager"
          // @ts-expect-error fetchpriority is valid HTML but not yet in all React types
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark vignette so title is always readable */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.54)_0%,rgba(0,0,0,0.12)_38%,transparent_70%)]" />

        <div
          ref={titleRef}
          className="relative z-10 flex h-full items-start justify-center px-6 pt-[4.5rem] text-center sm:px-10 sm:pt-24"
        >
          <div className="mx-auto max-w-[42rem]">
            <div className="landing-body inline-flex items-center rounded-full border border-white/12 bg-black/32 px-4 py-2 text-[12px] font-medium text-[#D4CEC2] backdrop-blur-md">
              {label}
            </div>
            <h2 className="ds-h2 mt-6 text-white">
              {title}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
