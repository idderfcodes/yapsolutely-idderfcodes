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
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[var(--color-accent-pop)]" />
              <span className="font-body text-[0.7rem] tracking-wide text-[var(--color-text-muted)]">Handling calls now</span>
            </div>
            <h1 className="mb-6 text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.035em] text-[var(--color-text-primary)] sm:text-[3.5rem] lg:text-[4.5rem]">
              AI agents that
              <br />
              answer your phone
            </h1>
            <p className="mb-8 max-w-lg text-[0.95rem] leading-[1.65] text-[var(--color-text-muted)] sm:text-[1.05rem]">
              Build voice agents, assign them real phone numbers, and let them handle inbound calls. Review every transcript and monitor every conversation from one workspace.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3">
              <Button variant="hero" size="xl" className="btn-press w-full sm:w-auto" asChild>
                <Link href="/sign-up">
                  Start building free
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" className="btn-press w-full sm:w-auto" asChild>
                <a href="#workflow">See how it works</a>
              </Button>
            </div>
            <p className="mt-4 flex items-center gap-1.5 font-body text-[0.75rem] text-[var(--color-text-muted)]">
              <span className="h-1 w-1 rounded-full bg-[var(--color-accent-pop)]" />
              No credit card required. Free plan available.
            </p>
          </div>

          {/* Right column - embedded voice agent illustration */}
          <div className="lg:col-span-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {/* Browser-style bezel around real dashboard screenshot */}
            <div className="relative mx-auto overflow-hidden rounded-xl border border-[var(--color-border)] shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
              {/* Browser chrome bar */}
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-primary)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-pop)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-secondary)]" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="truncate rounded-md bg-[var(--color-bg)] px-3 py-1 text-center font-mono text-[0.6rem] text-[var(--color-text-muted)]">
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
