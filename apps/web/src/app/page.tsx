import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustStrip from "@/components/landing/TrustStrip";
import BrandCarousel from "@/components/landing/BrandCarousel";
import Workflow from "@/components/landing/Workflow";
import Benefits from "@/components/landing/Benefits";
import ProductShowcase from "@/components/landing/ProductShowcase";
import Testimonials from "@/components/landing/Testimonials";
import ClosingCTA from "@/components/landing/ClosingCTA";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import ScrollReveal from "@/components/landing/ScrollReveal";
import FrameScrubber from "@/components/landing/FrameScrubber";

export default function Home() {
  return (
    <>
      {/* Override body bg so the fixed canvas at z-0 is visible */}
      <style>{`body { background: transparent !important; }`}</style>
      <div className="min-h-screen">
      {/* Fixed canvas behind everything — light mode only */}
      <FrameScrubber />
      <div className="relative z-10">
      <Navbar />
      <Hero />
      <ScrollReveal variant="fade-up" delay={0}>
        <TrustStrip />
      </ScrollReveal>
      <ScrollReveal variant="fade-up" delay={80}>
        <BrandCarousel />
      </ScrollReveal>
      <ScrollReveal variant="slide-up" duration={800}>
        <Workflow />
      </ScrollReveal>
      {/* Solid background from here down to cover the fixed canvas */}
      <div className="bg-canvas">
      <Benefits />
      <ScrollReveal variant="fade-up" duration={800}>
        <ProductShowcase />
      </ScrollReveal>
      <Testimonials />
      <ScrollReveal variant="scale-up" duration={800}>
        <ClosingCTA />
      </ScrollReveal>
      <ScrollReveal variant="fade-up" duration={600}>
        <FAQ />
      </ScrollReveal>
      <Footer />
      </div>
      </div>
    </div>
    </>
  );
}
