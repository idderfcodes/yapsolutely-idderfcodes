"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface VideoScrollSectionProps {
  videoSrc: string;
  poster?: string;
  badge: string;
  title: string;
  description: string;
  points: Array<{ title: string; description: string }>;
  className?: string;
  startScale?: number;
}

export function VideoScrollSection({
  videoSrc,
  poster,
  badge,
  title,
  description,
  points,
  className = "",
  startScale = 0.42,
}: VideoScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRegionRef = useRef<HTMLDivElement>(null);
  const scaleFrameRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const syncMobileState = () => {
      setIsMobile(mediaQuery.matches);
    };

    syncMobileState();
    mediaQuery.addEventListener("change", syncMobileState);

    return () => {
      mediaQuery.removeEventListener("change", syncMobileState);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const scaleFrame = scaleFrameRef.current;
    const scrollRegion = scrollRegionRef.current;

    if (!scaleFrame || !scrollRegion) {
      return;
    }

    if (shouldReduceMotion || isMobile) {
      scaleFrame.style.transform = "scale(1)";
      return;
    }

    let frame = 0;

    const updateScale = () => {
      if (!scrollRegionRef.current || !scaleFrameRef.current) {
        return;
      }

      const rect = scrollRegionRef.current.getBoundingClientRect();
      const containerHeight = scrollRegionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const startOffset = windowHeight * 0.14;
      const endOffset = windowHeight * 0.72;
      const progressSpan = Math.max(containerHeight - endOffset + startOffset, 1);
      const progress = Math.min(Math.max((startOffset - rect.top) / progressSpan, 0), 1);
      const nextScale = startScale + progress * (1 - startScale);

      scaleFrameRef.current.style.transform = `scale(${nextScale})`;
      frame = 0;
    };

    const handleScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateScale);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, shouldReduceMotion, startScale]);

  const videoElement = (
    <video
      autoPlay={shouldLoadVideo}
      loop
      muted
      playsInline
      preload={isMobile ? "none" : "metadata"}
      poster={poster}
      className="h-full w-full object-cover pt-[60px] sm:pt-[68px]"
    >
      {shouldLoadVideo ? <source src={videoSrc} type="video/mp4" /> : null}
    </video>
  );

  const showcaseCard = (
    <div className="relative w-full overflow-hidden rounded-[24px] border border-[var(--color-dark-divider)] bg-[var(--color-hero-right)] shadow-[0_24px_60px_-34px_rgba(20,20,20,0.32)] sm:rounded-[24px] sm:shadow-[0_36px_80px_-42px_rgba(20,20,20,0.38)]">
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 border-b border-[var(--color-dark-divider)] bg-[var(--color-badge-dark)] px-4 py-3 backdrop-blur-md sm:px-5">
        <div>
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted-on-dark)]">
            Operator walkthrough
          </div>
          <div className="landing-body mt-1 text-[13px] font-medium text-[var(--color-text-on-dark)] sm:text-[14px]">
            Build, assign, and review in one workflow
          </div>
        </div>

        <div className="hidden rounded-full border border-[var(--color-dark-divider)] bg-[var(--color-overlay-medium)] px-3 py-1.5 landing-body text-[11px] font-medium text-[var(--color-text-on-dark)] sm:block">
          Live product view
        </div>
      </div>

      <div className="relative aspect-[16/11] min-h-[320px] w-full bg-[var(--color-hero-right)] sm:aspect-[16/9] sm:min-h-[540px]">
        {videoElement}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,20,0.12)_0%,rgba(20,20,20,0.18)_30%,rgba(20,20,20,0.76)_100%)]" />

        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center px-5 text-center sm:px-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-[34rem]">
            <h3 className="landing-display text-[2.1rem] leading-[0.94] tracking-[-0.06em] text-[var(--color-text-on-dark)] sm:text-[4.4rem]">
              Watch the workflow expand as you scroll
            </h3>
            <p className="landing-body mt-4 text-[15px] leading-7 text-[var(--color-text-muted-on-dark)] sm:text-[17px]">
              See the product move from agent setup to live call review using the real landing walkthrough.
            </p>
          </div>
        </motion.div>

        <div className="absolute bottom-4 left-4 right-4 z-20 grid gap-3 md:grid-cols-3 sm:bottom-5 sm:left-5 sm:right-5">
          {points.map((point) => (
            <div
              key={point.title}
              className="rounded-[18px] border border-[var(--color-dark-divider)] bg-[var(--color-badge-dark)] px-4 py-4 backdrop-blur-md sm:rounded-[24px]"
            >
              <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted-on-dark)]">
                {point.title}
              </div>
              <div className="landing-body mt-2 text-[13px] leading-6 text-[var(--color-text-on-dark)]">
                {point.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className={className}>
      <div className="mx-auto max-w-[46rem] text-center">
        <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-primary)]">
          {badge}
        </div>
        <h2 className="landing-display mt-6 text-[3rem] leading-[0.92] tracking-[-0.06em] text-[var(--color-text-primary)] sm:text-[4rem]">
          {title}
        </h2>
        <p className="landing-body mx-auto mt-4 max-w-[42rem] text-[16px] leading-7 text-[var(--color-text-muted)]">
          {description}
        </p>
      </div>

      <div className="mt-8 md:hidden">{showcaseCard}</div>

      <div ref={scrollRegionRef} className="relative mt-10 hidden h-[165vh] md:block lg:h-[185vh] xl:h-[195vh]">
        <div className="sticky top-[8svh] flex h-[84svh] items-center justify-center overflow-hidden">
          <div
            ref={scaleFrameRef}
            className="relative flex w-full items-center justify-center will-change-transform"
            style={{ transform: `scale(${shouldReduceMotion ? 1 : startScale})`, transformOrigin: "center center" }}
          >
            <div className="w-[min(92vw,1080px)]">{showcaseCard}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
