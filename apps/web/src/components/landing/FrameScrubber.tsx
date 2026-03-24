"use client";

import { useEffect, useRef } from "react";

const TOTAL = 240;

function pad(n: number) {
  return String(n).padStart(3, "0");
}

/**
 * Scroll-scrubbing animation: 240 JPG frames play as user scrolls
 * from #product (hero) to #workflow (how it works).
 * Uses a plain <img> tag — no canvas, no 2D context, no bitmap sizing.
 * Light mode only. Respects prefers-reduced-motion.
 */
export default function FrameScrubber() {
  const imgRef = useRef<HTMLImageElement>(null);
  const urlsRef = useRef<string[]>([]);
  const aliveRef = useRef(true);
  const rafRef = useRef(0);

  useEffect(() => {
    aliveRef.current = true;

    if (document.documentElement.classList.contains("dark")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const img = imgRef.current;
    if (!img) return;

    // Build frame URL list
    const step = window.innerWidth < 768 ? 2 : 1;
    const urls: string[] = [];
    for (let i = 1; i <= TOTAL; i += step) {
      urls.push(`/frames/light-mode/ezgif-frame-${pad(i)}.jpg`);
    }
    urlsRef.current = urls;

    // Show first frame immediately
    img.src = urls[0];

    // Preload all frames in background
    let loaded = 0;
    for (const url of urls) {
      const preload = new Image();
      preload.onload = preload.onerror = () => {
        loaded++;
        if (loaded >= urls.length && aliveRef.current && imgRef.current) {
          imgRef.current.style.opacity = "1";
        }
      };
      preload.src = url;
    }

    function onScroll() {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        if (!imgRef.current || !urlsRef.current.length) return;
        const hero = document.getElementById("product");
        const end = document.getElementById("workflow");
        if (!hero || !end) return;
        const top = hero.getBoundingClientRect().top + window.scrollY;
        const bot = end.getBoundingClientRect().top + window.scrollY;
        const range = bot - top;
        if (range <= 0) return;
        const t = Math.max(0, Math.min(1, (window.scrollY - top) / range));
        const idx = Math.round(t * (urlsRef.current.length - 1));
        imgRef.current.src = urlsRef.current[idx];
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      aliveRef.current = false;
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <img
        ref={imgRef}
        alt=""
        className="block w-full h-full object-cover"
        style={{ opacity: 0, transition: "opacity 0.6s ease" }}
      />
    </div>
  );
}
