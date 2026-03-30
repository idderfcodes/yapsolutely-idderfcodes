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
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFramesRef = useRef<boolean[]>([]);
  const frameIndexRef = useRef({ value: 0 });
  const sectionHeight = `${Math.max(1, scrollHeights + 1) * 100}svh`;

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

    const safeIndex = Math.max(
      0,
      Math.min(framePaths.length - 1, Math.round(index)),
    );

    const renderableIndex = getRenderableFrameIndex(safeIndex);
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
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const maxDpr = window.innerWidth < 768 ? 1.5 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const rect = stage.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    drawFrame(Math.round(frameIndexRef.current.value));
  }, [drawFrame]);

  useEffect(() => {
    if (!framePaths.length) return;

    const eagerFrameCount = Math.min(framePaths.length, 32);
    let isDisposed = false;
    let idleCallbackId: number | null = null;
    let timeoutId: number | null = null;

    // --- 1. Preload all frames ---
    loadedFramesRef.current = new Array(framePaths.length).fill(false);

    const images: HTMLImageElement[] = framePaths.map((_, index) => {
      const img = new Image();
      img.decoding = "async";
      img.loading = index < eagerFrameCount ? "eager" : "lazy";
      if (index < eagerFrameCount) {
        img.fetchPriority = "high";
      } else {
        img.fetchPriority = "low";
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

    const loadFrame = (index: number) => {
      const img = images[index];
      if (!img) return;

      img.src = framePaths[index] ?? "";

      if (img.complete) {
        settleFrame(index, img.naturalWidth > 0);
      }
    };

    images.forEach((img, index) => {
      img.onload = () => {
        settleFrame(index, true);
      };
      img.onerror = () => {
        settleFrame(index, false);
      };
    });

    for (let index = 0; index < eagerFrameCount; index += 1) {
      loadFrame(index);
    }

    let nextFrameIndex = eagerFrameCount;

    const queueRemainingFrames = () => {
      if (isDisposed || nextFrameIndex >= images.length) {
        return;
      }

      const pump = () => {
        if (isDisposed) {
          return;
        }

        const batchEnd = Math.min(nextFrameIndex + 8, images.length);

        for (; nextFrameIndex < batchEnd; nextFrameIndex += 1) {
          loadFrame(nextFrameIndex);
        }

        if (nextFrameIndex >= images.length) {
          return;
        }

        if (typeof window.requestIdleCallback === "function") {
          idleCallbackId = window.requestIdleCallback(pump, { timeout: 220 });
        } else {
          timeoutId = window.setTimeout(pump, 48);
        }
      };

      pump();
    };

    queueRemainingFrames();

    // --- 2. Resize observer ---
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // --- 3. GSAP ScrollTrigger ---
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const frameObj = frameIndexRef.current;
    const lastFrame = framePaths.length - 1;

    // Animate the frameObj.value from 0 → lastFrame, drawn each tick
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${window.innerHeight * scrollHeights}`,
        pin: stage,
        pinSpacing: false,
        scrub,
        fastScrollEnd: false,
        anticipatePin: 1,
        refreshPriority: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          drawFrame(0);
        },
        onEnterBack: () => {
          drawFrame(lastFrame);
        },
        onLeave: () => {
          drawFrame(lastFrame);
        },
        onLeaveBack: () => {
          drawFrame(0);
        },
        onRefresh: () => {
          drawFrame(Math.round(frameObj.value));
        },
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
      isDisposed = true;
      if (idleCallbackId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
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
      className={`relative isolate z-10 w-full overflow-hidden bg-[var(--color-dark-section)] ${className ?? ""}`}
      style={{ height: sectionHeight }}
    >
      <div
        ref={stageRef}
        className="relative z-10 h-screen h-[100svh] overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 h-full w-full"
          style={{ display: "block", willChange: "contents" }}
        />
      </div>
    </div>
  );
}
