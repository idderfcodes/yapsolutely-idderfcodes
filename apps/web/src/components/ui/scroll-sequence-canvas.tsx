"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSequenceCanvasProps {
  /** Array of image URLs (e.g. PNGs at 30 fps) */
  framePaths: string[];
  /** Label pill text */
  label?: string;
  /** Heading over the sequence */
  title?: string;
  /** Optional description under the heading */
  description?: string;
  /** How many viewport-heights the pinned section consumes (default 5) */
  scrollHeights?: number;
  /** GSAP scrub smoothing in seconds (default 0.5) */
  scrub?: number;
  /** Optional className on the outer wrapper */
  className?: string;
}

export function ScrollSequenceCanvas({
  framePaths,
  label = "See it in action",
  title = "A call handled. In seconds.",
  description,
  scrollHeights = 5,
  scrub = 0.5,
  className,
}: ScrollSequenceCanvasProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef({ value: 0 });
  const titleRef = useRef<HTMLDivElement>(null);

  /** Draw a specific frame index onto the canvas, covering it fully */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover-fit: fill canvas without letter-boxing
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  /** Resize canvas to match device pixel ratio */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    drawFrame(frameIndexRef.current.value);
  }, [drawFrame]);

  useEffect(() => {
    if (!framePaths.length) return;

    // --- 1. Preload all frames ---
    const images: HTMLImageElement[] = framePaths.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      return img;
    });
    imagesRef.current = images;

    // Draw first frame once it loads
    images[0].onload = () => {
      resizeCanvas();
      drawFrame(0);
    };

    // --- 2. Resize observer ---
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // --- 3. GSAP ScrollTrigger ---
    const section = sectionRef.current;
    if (!section) return;

    const frameObj = frameIndexRef.current;
    const lastFrame = framePaths.length - 1;

    // Animate the frameObj.value from 0 → lastFrame, drawn each tick
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${window.innerHeight * scrollHeights}`,
        pin: true,
        scrub,
        anticipatePin: 1,
      },
    });

    tl.to(frameObj, {
      value: lastFrame,
      ease: "none",
      onUpdate() {
        const idx = Math.round(frameObj.value);
        drawFrame(idx);
      },
    });

    // Fade the title overlay out over the first 10% of scroll
    if (titleRef.current) {
      tl.to(
        titleRef.current,
        { opacity: 0, y: -40, ease: "power2.out", duration: 0.1 },
        0,
      );
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
      images.forEach((img) => { img.src = ""; });
    };
  }, [framePaths, scrollHeights, scrub, drawFrame, resizeCanvas]);

  return (
    <div
      ref={sectionRef}
      className={`relative w-full bg-[var(--color-dark-section)] ${className ?? ""}`}
    >
      {/* Canvas fills the viewport while pinned */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ display: "block" }}
      />

      {/* Top / bottom gradient overlays */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-[rgba(20,20,20,0.9)] via-[rgba(20,20,20,0.3)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-[rgba(20,20,20,0.92)] via-[rgba(20,20,20,0.34)] to-transparent" />

      {/* Title overlay — fades out on scroll */}
      <div
        ref={titleRef}
        className="relative z-10 flex h-[100svh] items-start justify-center px-6 pt-[4.5rem] text-center sm:px-10 sm:pt-24"
      >
        <div className="mx-auto max-w-[42rem]">
          <div className="landing-body inline-flex items-center rounded-full border border-white/10 bg-[rgba(28,28,28,0.92)] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-muted-on-dark)] backdrop-blur-md">
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
      </div>

      {/* Scroll hint */}
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
  );
}
