"use client";

import { ZoomParallax } from "@/components/ui/zoom-parallax";

const demoFramePaths = Array.from({ length: 92 }, (_, index) => {
  const frameNumber = String(index * 2 + 1).padStart(3, "0");
  return `/frame-sequence/demo/ezgif-frame-${frameNumber}.png`;
});

export default function ZoomParallaxDemo() {
  return (
    <main className="min-h-screen w-full bg-[#141414]">
      <ZoomParallax framePaths={demoFramePaths} />
    </main>
  );
}