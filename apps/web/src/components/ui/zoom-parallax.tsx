"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ZoomParallaxProps = {
  framePaths: string[];
  label?: string | null;
  title?: string | null;
  description?: string;
  className?: string;
  showOverlay?: boolean;
  scrollHeightVh?: number;
};

export function ZoomParallax({
  framePaths,
  label = "See it in action",
  title = "A call handled. In seconds.",
  description,
  className,
  showOverlay = true,
  scrollHeightVh = 600,
}: ZoomParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeFrameRef = useRef(0);
  const renderFrameRef = useRef(0);
  const loadedFramesRef = useRef<boolean[]>([]);
  const [renderFrameIndex, setRenderFrameIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.05, 0.10], [1, 0.45, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.10], [0, -40]);

  const getRenderableFrameIndex = useCallback((index: number) => {
    if (loadedFramesRef.current[index]) {
      return index;
    }

    for (let i = index - 1; i >= 0; i -= 1) {
      if (loadedFramesRef.current[i]) {
        return i;
      }
    }

    for (let i = index + 1; i < loadedFramesRef.current.length; i += 1) {
      if (loadedFramesRef.current[i]) {
        return i;
      }
    }

    return -1;
  }, []);

  const updateRenderableFrame = useCallback((index: number) => {
    const safeIndex = Math.max(0, Math.min(framePaths.length - 1, index));
    const nextRenderableIndex = getRenderableFrameIndex(safeIndex);

    if (nextRenderableIndex < 0 || nextRenderableIndex === renderFrameRef.current) {
      return;
    }

    renderFrameRef.current = nextRenderableIndex;
    setRenderFrameIndex(nextRenderableIndex);
  }, [framePaths.length, getRenderableFrameIndex]);

  // Batch-preload all frames immediately so the browser queues them in order.
  useEffect(() => {
    if (!framePaths.length) return;

    activeFrameRef.current = 0;
    renderFrameRef.current = 0;
    setRenderFrameIndex(0);
    loadedFramesRef.current = new Array(framePaths.length).fill(false);

    let cancelled = false;

    const images = framePaths.map((src) => {
      const img = new window.Image();
      img.decoding = "async";
      return { img, src };
    });

    images.forEach(({ img, src }, index) => {
      if (index < 18) {
        img.fetchPriority = "high";
      }

      img.onload = () => {
        if (cancelled) return;

        loadedFramesRef.current[index] = true;

        if (index === 0) {
          renderFrameRef.current = 0;
          setRenderFrameIndex(0);
        }

        if (Math.abs(index - activeFrameRef.current) <= 2) {
          updateRenderableFrame(activeFrameRef.current);
        }
      };

      img.onerror = () => {
        if (cancelled) return;
      };

      img.src = src;
    });

    return () => {
      cancelled = true;
      images.forEach(({ img }) => {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      });
    };
  }, [framePaths, updateRenderableFrame]);

  // Scroll → frame sync
  useEffect(() => {
    if (!framePaths.length) return;

    activeFrameRef.current = 0;
    renderFrameRef.current = 0;
    setRenderFrameIndex(0);

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const nextFrameIndex = Math.max(
        0,
        Math.min(framePaths.length - 1, Math.round(progress * (framePaths.length - 1))),
      );

      if (nextFrameIndex !== activeFrameRef.current) {
        activeFrameRef.current = nextFrameIndex;
        updateRenderableFrame(nextFrameIndex);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [framePaths, scrollYProgress, updateRenderableFrame]);

  const currentFrame = framePaths[renderFrameIndex] ?? framePaths[0];

  return (
    <div
      ref={containerRef}
      className={cn("relative bg-[var(--color-dark-section)]", className)}
      style={{ height: `${scrollHeightVh}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[var(--color-dark-section)]">
        <img
          src={currentFrame}
          alt={title}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {showOverlay ? (
          <>
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-[rgba(20,20,20,0.9)] via-[rgba(20,20,20,0.3)] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-[rgba(20,20,20,0.92)] via-[rgba(20,20,20,0.34)] to-transparent" />

            <motion.div
              style={{ opacity: titleOpacity, y: titleY }}
              className="relative z-10 flex h-full items-start justify-center px-6 pt-[4.5rem] text-center sm:px-10 sm:pt-24"
            >
              <div className="mx-auto max-w-[42rem]">
                {label ? (
                  <div className="landing-body landing-body-3-semibold inline-flex items-center rounded-full border border-white/10 bg-[rgba(28,28,28,0.92)] px-4 py-2 text-[var(--color-text-muted-on-dark)] backdrop-blur-md">
                    {label}
                  </div>
                ) : null}
                {title ? (
                  <h2 className="landing-display landing-display-1 mt-6 text-[var(--color-text-on-dark)]">
                    {title}
                  </h2>
                ) : null}
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
          </>
        ) : null}
      </div>
    </div>
  );
}
