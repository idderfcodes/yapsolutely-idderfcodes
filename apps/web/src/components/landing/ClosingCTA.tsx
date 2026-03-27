import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Zap, Shield } from "lucide-react";
import Link from "next/link";

const ClosingCTA = () => {
  return (
    <section className="py-16 sm:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-[var(--color-dark-section)] sm:rounded-[2rem]">
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(238,48,58,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,123,48,0.08),transparent_60%)]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: CTA */}
            <div className="p-8 sm:p-14 lg:p-16 flex flex-col justify-center">
              <h2 className="mb-5 font-display text-[1.75rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-text-on-dark)] sm:text-[2.75rem]">
                Stop losing calls.
                <br />
                Start closing them.
              </h2>
              <p className="mb-8 max-w-md font-body text-[0.95rem] leading-[1.7] text-[var(--color-text-muted-on-dark)]">
                Every missed call is a missed opportunity. Deploy an AI voice agent in minutes and never let another lead slip through.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3">
                <Button size="xl" className="btn-press rounded-full bg-[var(--color-accent-primary)] font-display font-medium tracking-[-0.01em] text-[var(--color-text-on-dark)] shadow-[0_0_20px_-4px_rgba(238,48,58,0.3)] hover:bg-[var(--color-accent-hover)]" asChild>
                  <Link href="/sign-up">
                    Get started free
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>
                <Button size="xl" className="rounded-full border border-[var(--color-dark-divider)] bg-transparent font-body font-medium tracking-[-0.01em] text-[var(--color-text-on-dark)] hover:bg-[var(--color-overlay-soft)] hover:text-[var(--color-text-on-dark)]" asChild>
                  <Link href="/docs">See the docs</Link>
                </Button>
              </div>
              <p className="mt-4 font-body text-[0.72rem] text-[var(--color-text-muted-on-dark)]">
                No credit card required. Free tier includes 50 minutes/month.
              </p>
            </div>

            {/* Right: quick proof points */}
            <div className="p-8 sm:p-10 lg:p-14 flex items-center">
              <div className="space-y-6 w-full">
                {[
                  { icon: Zap, stat: "< 800ms", label: "Average voice response time. Callers can't tell it's AI." },
                  { icon: Phone, stat: "24/7", label: "Your agent never sleeps, takes breaks, or calls in sick." },
                  { icon: Shield, stat: "100%", label: "Every word transcribed and logged. Full audit trail." },
                ].map((item) => (
                  <div key={item.stat} className="flex items-start gap-4 group">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-overlay-medium)] transition-colors group-hover:bg-[var(--color-overlay-strong)]">
                      <item.icon className="h-5 w-5 text-[var(--color-accent-secondary)]" />
                    </div>
                    <div>
                      <div className="mb-0.5 font-display text-lg font-semibold text-[var(--color-text-on-dark)]">{item.stat}</div>
                      <div className="font-body text-[0.82rem] leading-[1.6] text-[var(--color-text-muted-on-dark)]">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTA;
