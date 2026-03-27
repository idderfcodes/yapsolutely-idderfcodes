import { cn } from "@/lib/utils";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

type ZoomParallaxSectionProps = {
  className?: string;
};

const demoFramePaths = Array.from({ length: 183 }, (_, index) => {
  const frameNumber = String(index + 1).padStart(5, "0");
  return `/frame-sequence/replacement/${frameNumber}.png`;
});

export function ZoomParallaxSection({ className = "" }: ZoomParallaxSectionProps) {
  return (
    <section className={cn("relative left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-[var(--color-dark-divider)] bg-[var(--color-dark-section)]", className)}>
      <ZoomParallax
        framePaths={demoFramePaths}
        label="Frame-by-frame proof"
        title="Watch the call resolve in real time."
        description="This preserved scroll-linked sequence shows the runtime turning a live inbound call into a captured outcome — from first audio to logged result."
      />
    </section>
  );
}