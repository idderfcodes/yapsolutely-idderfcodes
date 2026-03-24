"use client";

import { useEffect, useRef } from "react";

const TOTAL = 240;
const BG = "#f0f2f5";

function pad(n: number) {
  return String(n).padStart(3, "0");
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Scroll-scrubbing canvas: 240 JPG frames play as user scrolls from #product → #workflow.
 * Fixed behind content, light mode only, respects prefers-reduced-motion.
 */
export default function FrameScrubber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(HTMLImageElement | null)[]>([]);
  const lastIdx = useRef(-1);
  const raf = useRef(0);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;

    // Bail in dark mode or reduced motion
    if (document.documentElement.classList.contains("dark")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- helpers ---
    function sizeCanvas() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    function draw(idx: number) {
      if (!canvas || !ctx) return;
      const list = frames.current;
      const clamped = Math.max(0, Math.min(idx, list.length - 1));
      if (clamped === lastIdx.current) return;
      lastIdx.current = clamped;

      const img = list[clamped];
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (img) {
        const cw = canvas.width, ch = canvas.height;
        const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      }
    }

    function onScroll() {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        const list = frames.current;
        if (!list.length) return;
        const hero = document.getElementById("product");
        const end = document.getElementById("workflow");
        if (!hero || !end) return;
        const top = hero.getBoundingClientRect().top + window.scrollY;
        const bot = end.getBoundingClientRect().top + window.scrollY;
        const range = bot - top;
        if (range <= 0) return;
        const t = Math.max(0, Math.min(1, (window.scrollY - top) / range));
        draw(Math.round(t * (list.length - 1)));
      });
    }

    function onResize() {
      sizeCanvas();
      if (lastIdx.current >= 0) {
        const saved = lastIdx.current;
        lastIdx.current = -1;
        draw(saved);
      }
    }

    // --- init ---
    sizeCanvas();

    // Use every-other frame on mobile
    const step = window.innerWidth < 768 ? 2 : 1;
    const indices: number[] = [];
    for (let i = 1; i <= TOTAL; i += step) indices.push(i);

    // Load all frames in parallel
    Promise.all(
      indices.map((n) => loadImage(`/frames/light-mode/ezgif-frame-${pad(n)}.jpg`))
    ).then((imgs) => {
      if (!alive.current) return;
      frames.current = imgs;
      canvas.style.opacity = "1";
      sizeCanvas();
      onScroll();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      alive.current = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ backgroundColor: BG, opacity: 0, transition: "opacity 0.5s ease" }}
      />
    </div>
  );
}
