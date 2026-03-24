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
      <Navbar />

      {/* ── Hero ── */}
      <Hero />
      <TrustStrip />
      <ScrollReveal variant="fade-up" delay={80}>
        <BrandCarousel />
      </ScrollReveal>

      {/* ── Scroll-scrubbing frame animation with top/bottom fade ── */}
      <div className="relative overflow-hidden flex justify-center" style={{ maxHeight: "360px" }}>
        <FrameScrubber />
        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-24 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, var(--background), transparent)" }}
        />
        {/* Bottom fade into surface-panel */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-10"
          style={{ background: "linear-gradient(to top, var(--surface-panel), transparent)" }}
        />
      </div>

      {/* ── Opaque sections: alternating white / gray for rhythm ── */}
      <div className="bg-surface-panel">
        <ScrollReveal variant="slide-up" duration={800}>
          <Workflow />
        </ScrollReveal>
      </div>

      <div className="bg-canvas">
        <Benefits />
      </div>

      <div className="bg-surface-panel">
        <ScrollReveal variant="fade-up" duration={800}>
          <ProductShowcase />
        </ScrollReveal>
      </div>

      <div className="bg-canvas">
        <Testimonials />
      </div>

      <div className="bg-surface-panel">
        <ScrollReveal variant="scale-up" duration={800}>
          <ClosingCTA />
        </ScrollReveal>
      </div>

      <div className="bg-canvas">
        <ScrollReveal variant="fade-up" duration={600}>
          <FAQ />
        </ScrollReveal>
      </div>

      <Footer />
    </>
  );
}
