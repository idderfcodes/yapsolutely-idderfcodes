"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ZoomParallaxProps = {
  framePaths: string[];
  label?: string;
  title?: string;
  description?: string;
  className?: string;
};

export function ZoomParallax({
  framePaths,
  label = "See it in action",
  title = "A call handled. In seconds.",
  description,
  className,
}: ZoomParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const preloadTimeoutRef = useRef<number | null>(null);
  const activeFrameRef = useRef(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.10], [1, 0.45, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.10], [0, -40]);

  // Batch-preload all frames immediately so the browser queues them in order.
  // No artificial stagger — browser limits to ~6 concurrent, earliest frames
  // arrive first, which is exactly what we need for scrubbing.
  useEffect(() => {
    if (!framePaths.length) return;
    const images = framePaths.map((src) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
      return img;
    });
    // keep images alive so the browser doesn't GC them before caching
    preloadTimeoutRef.current = null;
    return () => {
      images.forEach((img) => { img.src = ""; });
    };
  }, [framePaths]);

  // Scroll → frame sync
  useEffect(() => {
    if (!framePaths.length) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentFrameIndex(0);
    activeFrameRef.current = 0;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const nextFrameIndex = Math.max(
        0,
        Math.min(framePaths.length - 1, Math.round(progress * (framePaths.length - 1))),
      );

      if (nextFrameIndex !== activeFrameRef.current) {
        activeFrameRef.current = nextFrameIndex;
        setCurrentFrameIndex(nextFrameIndex);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [framePaths, scrollYProgress]);

  const currentFrame = framePaths[currentFrameIndex] ?? framePaths[0];

  return (
    <div ref={containerRef} className={cn("relative h-[600vh] bg-[var(--color-dark-section)]", className)}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[var(--color-dark-section)]">
        <img
          src={currentFrame}
          alt={title}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-[rgba(20,20,20,0.9)] via-[rgba(20,20,20,0.3)] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-[rgba(20,20,20,0.92)] via-[rgba(20,20,20,0.34)] to-transparent" />

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="relative z-10 flex h-full items-start justify-center px-6 pt-[4.5rem] text-center sm:px-10 sm:pt-24"
        >
          <div className="mx-auto max-w-[42rem]">
            <div className="landing-body landing-body-3-semibold inline-flex items-center rounded-full border border-white/10 bg-[rgba(28,28,28,0.92)] px-4 py-2 text-[var(--color-text-muted-on-dark)] backdrop-blur-md">
              {label}
            </div>
            <h2 className="landing-display landing-display-1 mt-6 text-[var(--color-text-on-dark)]">
              {title}
            </h2>
            {description ? (
              <p className="landing-body mx-auto mt-4 max-w-[34rem] text-[15px] leading-7 text-[var(--color-text-muted-on-dark)] sm:text-[16px]">
                {description}
              </p>
            ) : null}
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-7 z-10 px-6 sm:px-10">
          <div className="mx-auto flex max-w-[1180px] justify-end">
            <div className="rounded-full border border-white/10 bg-[rgba(28,28,28,0.72)] px-4 py-2 backdrop-blur-md">
              <span className="landing-body text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted-on-dark)]">
                Scroll to scrub the call flow
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
