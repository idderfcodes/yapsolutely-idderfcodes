"use client";

import Lenis from "lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type ZoomParallaxProps = {
  videoSrc: string;
  durationSeconds?: number;
  label?: string;
  title?: string;
  className?: string;
};

export function ZoomParallax({
  videoSrc,
  durationSeconds = 6,
  label = "See it in action",
  title = "A call handled. In seconds.",
  className,
}: ZoomParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 0.45, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.16], [0, -40]);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const syncVideoTime = (progress: number) => {
      if (video.readyState < 1) {
        return;
      }

      const maxDuration = Number.isFinite(video.duration) && video.duration > 0
        ? Math.min(video.duration, durationSeconds)
        : durationSeconds;
      const nextTime = Math.max(0, Math.min(maxDuration, progress * maxDuration));

      if (Math.abs(video.currentTime - nextTime) > 0.025) {
        video.currentTime = nextTime;
      }
    };

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    const unsubscribe = scrollYProgress.on("change", syncVideoTime);

    return () => {
      unsubscribe();
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [durationSeconds, scrollYProgress]);

  return (
    <div ref={containerRef} className={cn("relative h-[400vh] bg-[#141414]", className)}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#141414]">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          aria-label={title}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,20,0.72)_0%,rgba(20,20,20,0.24)_24%,rgba(20,20,20,0.18)_58%,rgba(20,20,20,0.58)_100%)]" />

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="relative z-10 flex h-full items-start justify-center px-6 pt-[4.5rem] text-center sm:px-10 sm:pt-24"
        >
          <div className="mx-auto max-w-[42rem]">
            <div className="landing-body inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[12px] font-medium text-[#6B6860] backdrop-blur-md">
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