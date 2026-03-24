"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 240;
const BATCH_SIZE = 20;
const FRAME_PATH = "/frames/light-mode/ezgif-frame-";
const CANVAS_BG = "#f0f2f5";

function padFrame(n: number): string {
  return String(n).padStart(3, "0");
}

/**
 * Scroll-scrubbing canvas that plays 240 JPG frames as a background animation.
 * - Fixed behind hero, completes by Workflow section
 * - Light mode only (hidden in dark mode, no images loaded)
 * - Batched preloading (20 at a time)
 * - Reduced frame set on mobile/low-end (every other frame)
 * - Respects prefers-reduced-motion
 */
export default function FrameScrubber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedCountRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastFrameRef = useRef(-1);

  const [ready, setReady] = useState(false);

  // Detect low-end / mobile → use half the frames
  const isLowEnd = useCallback(() => {
    if (typeof window === "undefined") return false;
    const isMobile = window.innerWidth < 768;
    const lowMemory =
      "deviceMemory" in navigator &&
      (navigator as unknown as { deviceMemory: number }).deviceMemory < 4;
    const lowCores =
      "hardwareConcurrency" in navigator && navigator.hardwareConcurrency < 4;
    return isMobile || lowMemory || lowCores;
  }, []);

  // Build the frame index list (all 240 or every other for low-end)
  const getFrameIndices = useCallback(() => {
    const step = isLowEnd() ? 2 : 1;
    const indices: number[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += step) {
      indices.push(i);
    }
    return indices;
  }, [isLowEnd]);

  // Preload images in batches of BATCH_SIZE
  const preloadFrames = useCallback(
    (indices: number[]) => {
      return new Promise<HTMLImageElement[]>((resolve) => {
        const images: (HTMLImageElement | null)[] = new Array(indices.length).fill(null);
        let loaded = 0;
        const total = indices.length;

        function onImageDone(i: number, img: HTMLImageElement | null) {
          if (img) images[i] = img;
          loaded++;
          loadedCountRef.current = loaded;
          if (loaded >= total) {
            resolve(images as HTMLImageElement[]);
          }
        }

        function loadBatch(startIdx: number) {
          const end = Math.min(startIdx + BATCH_SIZE, total);
          for (let i = startIdx; i < end; i++) {
            const img = new Image();
            const frameNum = indices[i];
            // Set handlers BEFORE src to catch cached images that fire synchronously
            img.onload = () => onImageDone(i, img);
            img.onerror = () => onImageDone(i, null);
            img.src = `${FRAME_PATH}${padFrame(frameNum)}.jpg`;
          }
          // Schedule next batch after a small delay to avoid blocking
          if (end < total) {
            setTimeout(() => loadBatch(end), 16);
          }
        }

        loadBatch(0);
      });
    },
    []
  );

  // Draw a frame to the canvas
  const drawFrame = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      const frames = framesRef.current;
      if (!canvas || !frames.length) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const clampedIdx = Math.max(0, Math.min(frameIdx, frames.length - 1));
      if (clampedIdx === lastFrameRef.current) return;
      lastFrameRef.current = clampedIdx;

      const img = frames[clampedIdx];
      if (!img) {
        ctx.fillStyle = CANVAS_BG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      // Cover-fit the image to the canvas
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.fillStyle = CANVAS_BG;
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    },
    []
  );

  // Resize canvas bitmap to match its CSS layout size
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    if (w === 0 || h === 0) return; // not laid out yet
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    // Redraw current frame at new size
    if (lastFrameRef.current >= 0) {
      const saved = lastFrameRef.current;
      lastFrameRef.current = -1;
      drawFrame(saved);
    }
  }, [drawFrame]);

  // Scroll handler: map scroll position to frame index
  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const frames = framesRef.current;
      if (!frames.length) return;

      // Find hero and workflow sections
      const hero = document.getElementById("product");
      const workflow = document.getElementById("workflow");
      if (!hero || !workflow) return;

      const heroTop = hero.getBoundingClientRect().top + window.scrollY;
      const workflowTop = workflow.getBoundingClientRect().top + window.scrollY;
      const scrollRange = workflowTop - heroTop;

      if (scrollRange <= 0) return;

      const progress = Math.max(
        0,
        Math.min(1, (window.scrollY - heroTop) / scrollRange)
      );
      const frameIdx = Math.round(progress * (frames.length - 1));
      drawFrame(frameIdx);
    });
  }, [drawFrame]);

  // Main setup effect
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isDark || reducedMotion) return;

    // Size canvas bitmap IMMEDIATELY before anything else
    resizeCanvas();

    const indices = getFrameIndices();

    preloadFrames(indices).then((images) => {
      framesRef.current = images;
      setReady(true);
      resizeCanvas();
      onScroll(); // Draw initial frame
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      framesRef.current = [];
      loadedCountRef.current = 0;
      lastFrameRef.current = -1;
    };
  }, [getFrameIndices, preloadFrames, resizeCanvas, onScroll]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{
          backgroundColor: CANVAS_BG,
          opacity: ready ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />
    </div>
  );
}
