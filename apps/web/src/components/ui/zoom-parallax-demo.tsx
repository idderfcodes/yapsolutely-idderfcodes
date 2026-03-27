"use client";

import { ZoomParallax } from "@/components/ui/zoom-parallax";

export default function ZoomParallaxDemo() {
  return (
    <main className="min-h-screen w-full bg-[#141414]">
      <ZoomParallax videoSrc="/videos/demo.mp4" durationSeconds={6} />
    </main>
  );
}