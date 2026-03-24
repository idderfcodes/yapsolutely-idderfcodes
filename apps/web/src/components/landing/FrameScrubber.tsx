"use client";

import { useEffect, useRef } from "react";

function pad(n: number) {
  return String(n).padStart(3, "0");
}

// Use every other frame: 1, 3, 5, ... 239 = 120 frames total
const FRAMES: number[] = [];
for (let i = 1; i <= 240; i += 2) {
  FRAMES.push(i);
}

export default function FrameScrubber() {
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const img = imgRef.current;
    const wrap = wrapRef.current;
    if (!img || !wrap) return;

    const urls = FRAMES.map(i => `/frames/light-mode/ezgif-frame-${pad(i)}.jpg`);

    img.src = urls[0];

    // Preload
    for (const url of urls) {
      const p = new Image();
      p.src = url;
    }

    function onScroll() {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        if (!img || !wrap) return;
        const rect = wrap.getBoundingClientRect();
        const viewH = window.innerHeight;
        const scrolled = viewH - rect.top;
        const total = rect.height + viewH;
        const t = Math.max(0, Math.min(1, scrolled / total));
        const idx = Math.round(t * (urls.length - 1));
        img.src = urls[idx];
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none select-none" aria-hidden="true">
      <img
        ref={imgRef}
        alt=""
        style={{ display: "block" }}
      />
    </div>
  );
}
