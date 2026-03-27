"use client";

import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  const preloadTimeoutRef = useRef<number | null>(null);
  const activeFrameRef = useRef(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 0.45, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.16], [0, -40]);

  // Lenis smooth scroll — lerp 0.14 keeps page feel without lagging the scrub
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.14, smoothWheel: true });
    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

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
    <div ref={containerRef} className={cn("relative h-[420vh] bg-[#141414]", className)}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#141414]">
        <img
          src={currentFrame}
          alt={title}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,20,0.52)_0%,rgba(20,20,20,0.12)_24%,rgba(20,20,20,0.12)_60%,rgba(20,20,20,0.58)_100%)]" />

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="relative z-10 flex h-full items-start justify-center px-6 pt-[4.5rem] text-center sm:px-10 sm:pt-24"
        >
          <div className="mx-auto max-w-[42rem]">
            <div className="landing-body inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] font-medium text-[#D4CEC2] backdrop-blur-md">
              {label}
            </div>
            <h2 className="landing-display mt-6 text-[3rem] leading-[0.92] tracking-[-0.06em] text-[#F7F4EF] sm:text-[3.5rem] lg:text-[4rem]">
              {title}
            </h2>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
