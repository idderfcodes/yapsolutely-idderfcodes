import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustStrip from "@/components/landing/TrustStrip";
import BrandCarousel from "@/components/landing/BrandCarousel";
import Workflow from "@/components/landing/Workflow";
import Benefits from "@/components/landing/Benefits";
import DashboardPreview from "@/components/landing/DashboardPreview";
import Testimonials from "@/components/landing/Testimonials";
import ClosingCTA from "@/components/landing/ClosingCTA";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";
import ScrollReveal from "@/components/landing/ScrollReveal";
import StatsStrip from "@/components/landing/StatsStrip";
import UseCases from "@/components/landing/UseCases";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <Hero />
      <ScrollReveal variant="fade-up" delay={80}>
        <BrandCarousel />
      </ScrollReveal>
      <TrustStrip />

      {/* ── Opaque sections: alternating white / gray for rhythm ── */}
      <div className="bg-surface-panel">
        <ScrollReveal variant="slide-up" duration={800}>
          <Workflow />
        </ScrollReveal>
      </div>

      <ScrollReveal variant="fade-up" duration={700}>
        <DashboardPreview />
      </ScrollReveal>

      <Benefits />

      <div className="bg-surface-panel">
        <UseCases />
      </div>

      <div className="bg-canvas">
        <Testimonials />
      </div>

      <div className="bg-surface-panel">
        <ScrollReveal variant="fade-up" duration={600}>
          <StatsStrip />
        </ScrollReveal>
      </div>

      <div className="bg-canvas">
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
