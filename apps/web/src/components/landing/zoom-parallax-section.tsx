"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollSequenceCanvas } from "@/components/ui/scroll-sequence-canvas";
import { getLandingMediaProfile, type FrameSequenceTier } from "./landing-media-profile";

type ZoomParallaxSectionProps = {
  className?: string;
};

const demoFrameCount = 159;
// 159 frames compressed into 3.5 viewport-heights skips too aggressively on
// wheel / trackpad input. Give the sequence more scroll resolution so the full
// range can actually be traversed before the page continues.
const demoScrollHeights = Math.max(8, Math.ceil(demoFrameCount / 20));
const demoScrub = 0.2;

export function ZoomParallaxSection({ className = "" }: ZoomParallaxSectionProps) {
  const [frameTier, setFrameTier] = useState<FrameSequenceTier>("1080");

  useEffect(() => {
    const updateFrameTier = () => {
      setFrameTier(getLandingMediaProfile(window).frameTier);
    };

    updateFrameTier();
    window.addEventListener("resize", updateFrameTier);

    return () => {
      window.removeEventListener("resize", updateFrameTier);
    };
  }, []);

  const frameDirectory = frameTier === "4k" ? "replacement-4k" : "replacement";

  const demoFramePaths = useMemo(
    () =>
      Array.from({ length: demoFrameCount }, (_, index) => {
        const frameNumber = String(index + 1).padStart(5, "0");
        return `/frame-sequence/${frameDirectory}/${frameNumber}.webp`;
      }),
    [frameDirectory],
  );

  return (
    <div className={cn("bg-[var(--color-dark-section)]", className)}>
      <ScrollSequenceCanvas
        framePaths={demoFramePaths}
        scrollHeights={demoScrollHeights}
        scrub={demoScrub}
        className="isolate"
      />
    </div>
  );
}