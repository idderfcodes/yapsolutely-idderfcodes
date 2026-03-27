import { cn } from "@/lib/utils";
import { ScrollSequenceCanvas } from "@/components/ui/scroll-sequence-canvas";

type ZoomParallaxSectionProps = {
  className?: string;
};

const demoFramePaths = Array.from({ length: 183 }, (_, index) => {
  const frameNumber = String(index + 1).padStart(5, "0");
  return `/frame-sequence/replacement/${frameNumber}.png`;
});

export function ZoomParallaxSection({ className = "" }: ZoomParallaxSectionProps) {
  return (
    <div className={cn("bg-[var(--color-dark-section)]", className)}>
      <ScrollSequenceCanvas
        framePaths={demoFramePaths}
        label="Frame-by-frame proof"
        title="Watch the call resolve in real time."
        description="This preserved scroll-linked sequence shows the runtime turning a live inbound call into a captured outcome — from first audio to logged result."
        scrollHeights={5}
        scrub={0.5}
      />
    </div>
  );
}