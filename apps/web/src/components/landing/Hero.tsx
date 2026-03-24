import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section id="product" className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-5 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Asymmetric hero: left-aligned headline + right embedded illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-14 sm:mb-20">
          <div className="lg:col-span-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-elevated border border-border-soft/40 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse-dot" />
              <span className="font-body text-[0.7rem] text-text-body tracking-wide">Handling calls now</span>
            </div>
            <h1 className="text-[2.25rem] sm:text-[3.5rem] lg:text-[4.5rem] font-semibold tracking-[-0.035em] leading-[1.02] text-foreground mb-6">
              AI agents that
              <br />
              answer your phone
            </h1>
            <p className="text-[0.95rem] sm:text-[1.05rem] text-text-body max-w-lg leading-[1.65] mb-8">
              Build voice agents, assign them real phone numbers, and let them handle inbound calls. Review every transcript and monitor every conversation from one workspace.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Button variant="hero" size="xl" className="btn-press" asChild>
                <Link href="/sign-up">
                  Start building free
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" className="btn-press" asChild>
                <a href="#workflow">See how it works</a>
              </Button>
            </div>
            <p className="mt-4 font-body text-[0.75rem] text-text-body/80 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-accent-gold" />
              No credit card required. Free plan available.
            </p>
          </div>

          {/* Right column - embedded voice agent illustration */}
          <div className="lg:col-span-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {/* Browser-style bezel around real dashboard screenshot */}
            <div className="relative mx-auto rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-border-soft/60">
              {/* Browser chrome bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-panel border-b border-border-soft/40">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-canvas rounded-md px-3 py-1 text-[0.6rem] text-text-body font-mono text-center truncate">
                    yapsolutely.xyz/dashboard
                  </div>
                </div>
              </div>
              {/* Screenshot */}
              <img
                src="/hero-dashboard.png"
                alt="Yapsolutely dashboard showing voice agents, call logs, and live transcripts"
                width={1641}
                height={965}
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
