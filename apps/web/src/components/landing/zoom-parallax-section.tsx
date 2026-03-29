import { cn } from "@/lib/utils";
import { ScrollSequenceCanvas } from "@/components/ui/scroll-sequence-canvas";

type ZoomParallaxSectionProps = {
  className?: string;
};

const demoFrameCount = 159;
const demoScrollHeights = Math.max(12, Math.ceil(demoFrameCount / 14));

const demoFramePaths = Array.from({ length: demoFrameCount }, (_, index) => {
  const frameNumber = String(index + 1).padStart(5, "0");
  return `/frame-sequence/replacement/${frameNumber}.webp`;
});

export function ZoomParallaxSection({ className = "" }: ZoomParallaxSectionProps) {
  return (
    <div className={cn("bg-[var(--color-dark-section)]", className)}>
      <ScrollSequenceCanvas
        framePaths={demoFramePaths}
        scrollHeights={demoScrollHeights}
        scrub={true}
      />
    </div>
  );
}