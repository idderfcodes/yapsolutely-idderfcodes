import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Zap, Shield } from "lucide-react";
import Link from "next/link";

const ClosingCTA = () => {
  return (
    <section className="py-16 sm:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-surface-dark rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden relative">
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--accent-purple)/0.08,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,var(--accent-gold)/0.06,transparent_60%)]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: CTA */}
            <div className="p-10 sm:p-14 lg:p-16 flex flex-col justify-center">
              <h2 className="font-display text-[1.75rem] sm:text-[2.75rem] font-semibold tracking-[-0.03em] text-surface-dark-foreground mb-5 leading-[1.08]">
                Stop losing calls.
                <br />
                Start closing them.
              </h2>
              <p className="font-body text-surface-dark-foreground/40 text-[0.95rem] max-w-md mb-8 leading-[1.7]">
                Every missed call is a missed opportunity. Deploy an AI voice agent in minutes and never let another lead slip through.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Button size="xl" className="bg-accent-gold text-surface-dark hover:bg-accent-gold/90 rounded-full font-display font-medium tracking-[-0.01em] btn-press shadow-[0_0_20px_-4px_var(--accent-gold)/0.4]" asChild>
                  <Link href="/sign-up">
                    Get started free
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>
                <Button size="xl" className="border border-surface-dark-foreground/10 bg-transparent text-surface-dark-foreground/60 hover:text-surface-dark-foreground hover:bg-surface-dark-foreground/5 rounded-full font-body font-medium tracking-[-0.01em]" asChild>
                  <Link href="/docs">See the docs</Link>
                </Button>
              </div>
              <p className="font-body text-[0.72rem] text-surface-dark-foreground/20 mt-4">
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
                    <div className="w-10 h-10 rounded-xl bg-accent-gold/10 flex items-center justify-center shrink-0 group-hover:bg-accent-gold/20 transition-colors">
                      <item.icon className="w-5 h-5 text-accent-gold" />
                    </div>
                    <div>
                      <div className="font-display text-lg font-semibold text-surface-dark-foreground/90 mb-0.5">{item.stat}</div>
                      <div className="font-body text-[0.82rem] text-surface-dark-foreground/35 leading-[1.6]">{item.label}</div>
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
