import { cn } from "@/lib/utils";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

type ZoomParallaxSectionProps = {
  className?: string;
};

const demoFramePaths = Array.from({ length: 183 }, (_, index) => {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/frame-sequence/demo/ezgif-frame-${frameNumber}.png`;
});

export function ZoomParallaxSection({ className = "" }: ZoomParallaxSectionProps) {
  return (
    <section className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}>
      <ZoomParallax
        framePaths={demoFramePaths}
        label="See it in action"
        title="A call handled. In seconds."
      />
    </section>
  );
}