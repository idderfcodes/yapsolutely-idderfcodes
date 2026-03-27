import { ZoomParallax } from "@/components/ui/zoom-parallax";

type ZoomParallaxSectionProps = {
  className?: string;
};

export function ZoomParallaxSection({ className = "" }: ZoomParallaxSectionProps) {
  return (
    <section className={className}>
      <ZoomParallax
        videoSrc="/videos/demo.mp4"
        durationSeconds={6}
        label="See it in action"
        title="A call handled. In seconds."
      />
    </section>
  );
}