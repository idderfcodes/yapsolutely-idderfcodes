"use client";

import { ZoomParallax } from "@/components/ui/zoom-parallax";

const demoFramePaths = Array.from({ length: 183 }, (_, index) => {
  const frameNumber = String(index + 1).padStart(5, "0");
  return `/frame-sequence/replacement/${frameNumber}.png`;
});

export default function ZoomParallaxDemo() {
  return (
    <main className="min-h-screen w-full bg-[#141414]">
      <ZoomParallax framePaths={demoFramePaths} />
    </main>
  );
}