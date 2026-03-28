"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollSequenceCanvasProps {
  /** Array of image URLs (e.g. PNGs at 30 fps) */
  framePaths: string[];
  /** How many viewport-heights the pinned section consumes (default 5) */
  scrollHeights?: number;
  /** GSAP scrub smoothing in seconds (default 0.5) */
  scrub?: number;
  /** Optional className on the outer wrapper */
  className?: string;
}

export function ScrollSequenceCanvas({
  framePaths,
  scrollHeights = 5,
  scrub = 0.5,
  className,
}: ScrollSequenceCanvasProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef({ value: 0 });

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

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  /** Resize canvas to match device pixel ratio for sharp rendering */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
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
        style={{ display: "block", imageRendering: "auto" }}
      />

      {/* Invisible spacer to keep the pinned section at viewport height */}
      <div className="relative h-[100svh]" />
    </div>
  );
}
