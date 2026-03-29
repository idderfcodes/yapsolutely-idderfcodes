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
  /** GSAP scrub behavior; use true for direct sync or a number for smoothing */
  scrub?: boolean | number;
  /** Optional className on the outer wrapper */
  className?: string;
}

export function ScrollSequenceCanvas({
  framePaths,
  scrollHeights = 5,
  scrub = true,
  className,
}: ScrollSequenceCanvasProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFramesRef = useRef<boolean[]>([]);
  const frameIndexRef = useRef({ value: 0 });

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

  /** Draw a specific frame index onto the canvas, covering it fully */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderableIndex = getRenderableFrameIndex(index);
    if (renderableIndex < 0) return;

    const img = imagesRef.current[renderableIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover-fit: fill canvas completely, crop edges if needed
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, [getRenderableFrameIndex]);

  /** Resize canvas to match device pixel ratio for sharp rendering */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    drawFrame(frameIndexRef.current.value);
  }, [drawFrame]);

  useEffect(() => {
    if (!framePaths.length) return;

    // --- 1. Preload all frames ---
    loadedFramesRef.current = new Array(framePaths.length).fill(false);

    const images: HTMLImageElement[] = framePaths.map((_, index) => {
      const img = new Image();
      img.decoding = "async";
      if (index < 12) {
        img.fetchPriority = "high";
      }
      return img;
    });
    imagesRef.current = images;

    let loadedCount = 0;
    const settledFrames = new Set<number>();

    const settleFrame = (index: number, loaded: boolean) => {
      if (settledFrames.has(index)) {
        return;
      }

      settledFrames.add(index);

      if (loaded) {
        loadedFramesRef.current[index] = true;
      }

      loadedCount += 1;

      if (loaded && index === 0) {
        resizeCanvas();
        drawFrame(0);
      }

      const currentFrame = Math.round(frameIndexRef.current.value);
      if (loaded && Math.abs(index - currentFrame) <= 1) {
        drawFrame(currentFrame);
      }

      if (loadedCount === images.length) {
        ScrollTrigger.refresh();
      }
    };

    images.forEach((img, index) => {
      img.onload = () => {
        settleFrame(index, true);
      };
      img.onerror = () => {
        settleFrame(index, false);
      };
      img.src = framePaths[index] ?? "";

      if (img.complete) {
        settleFrame(index, img.naturalWidth > 0);
      }
    });

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
        end: () => `+=${window.innerHeight * scrollHeights}`,
        pin: true,
        pinSpacing: true,
        scrub,
        fastScrollEnd: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
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
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      });
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
        style={{ display: "block", willChange: "contents" }}
      />

      {/* Invisible spacer to keep the pinned section at viewport height */}
      <div className="relative h-screen h-[100svh]" />
    </div>
  );
}
