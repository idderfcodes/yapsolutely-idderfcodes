"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AnimatedGradientText from "./AnimatedGradientText";
import VideoPlayer from "../ui/video-player";

gsap.registerPlugin(ScrollTrigger);

function SingleVideoZoomParallax() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;
    const glow = glowRef.current;

    if (!section || !panel) {
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.4}`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          fastScrollEnd: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.fromTo(
        panel,
        {
          scale: 0.9,
          yPercent: 8,
        },
        {
          scale: 1.05,
          yPercent: -4,
          ease: "none",
        },
        0,
      );

      if (glow) {
        timeline.fromTo(
          glow,
          {
            opacity: 0.18,
            scale: 0.9,
          },
          {
            opacity: 0.42,
            scale: 1.08,
            ease: "none",
          },
          0,
        );
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative mt-3 sm:mt-4">
      <div className="relative h-screen h-[100svh] overflow-hidden">
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent-primary)] opacity-[0.18] blur-[140px]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,99,30,0.14),transparent_46%)]" />

        <div className="flex h-full w-full items-center justify-center px-4 sm:px-6">
          <div ref={panelRef} className="w-[90vw] max-w-[1120px] origin-center transform-gpu will-change-transform">
            <VideoPlayer
              src="/videos/demo-transcript.webm"
              label="Yapsolutely inbound call demo"
              autoPlay
              loop
              muted
              preload="metadata"
              className="w-full rounded-[26px] border border-white/10 bg-[#11111198] shadow-[0_18px_48px_-18px_rgba(0,0,0,0.55)] backdrop-blur-sm"
              videoClassName="aspect-video w-full rounded-[26px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SeeItInActionScrollSection() {
  return (
    <section className="landing-section relative overflow-hidden bg-black pt-8 pb-6 sm:pt-10 sm:pb-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[55rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent-primary)] opacity-[0.05] blur-[160px]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-screen" />

      <div className="landing-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[42rem] text-center"
        >
          <div className="landing-pill mx-auto inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-primary)]">
            See it in action
          </div>
          <h2 className="landing-display landing-display-1 mx-auto mt-6 max-w-[16ch] text-[var(--color-text-on-dark)]">
            <AnimatedGradientText
              text="A real call, not a script."
              gradientWordCount={2}
              gradientPosition="start"
              animationSpeed="normal"
            />
          </h2>
          <p className="landing-body landing-body-1-regular mx-auto mt-4 max-w-[32rem] text-[var(--color-text-muted-on-dark)]">
            Watch the agent handle an inbound call with live transcription.
          </p>
        </motion.div>

        <SingleVideoZoomParallax />
      </div>
    </section>
  );
}
