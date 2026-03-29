"use client";

import Image from "next/image";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const testimonials = [
  {
    quote: "Yapsolutely completely transformed how we handle after-hours calls. We haven't missed a single lead since deployment.",
    author: "Sarah Jenkins",
    role: "VP of Sales, TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "The setup was literally under 10 minutes. The human-like latency is just mind-blowing. Highly recommend it.",
    author: "Michael Chang",
    role: "Founder, GrowthX",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "We were looking for an AI voice solution that didn't sound robotic. Yapsolutely nailed it on day one.",
    author: "Emily Ross",
    role: "Director of Support, CloudSync",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "I love the dashboard and the transcript reviews. It gives us full visibility into what the AI is actually saying.",
    author: "David Miller",
    role: "Operations Manager, FastTrack",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "Replaced our entire Tier 1 call center team with Yapsolutely. The cost savings are incredible and uptime is 100%.",
    author: "Jessica Alba",
    role: "CEO, Streamline",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "The visual flow builder makes it so easy to adjust prompt triggers on the fly. 10/10 developer experience.",
    author: "Tom Hank",
    role: "Lead Engineer, DevShop",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "Finally, an AI agent that knows how to pause and listen. It handles interruptions flawlessly.",
    author: "Amanda Seyfried",
    role: "Product Manager, Innovate",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    quote: "We use it for inbound sales qualification. It captures the lead data and pushes it right into our CRM.",
    author: "Chris Evans",
    role: "Sales Director, Pipeline",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150"
  }
];

export default function AnimatedTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-800, 0]);

  // Duplicate arrays to ensure seamless sliding if needed
  const row1 = [...testimonials.slice(0, 4), ...testimonials.slice(0, 4)];
  const row2 = [...testimonials.slice(4, 8), ...testimonials.slice(4, 8)];

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-black py-12 [content-visibility:auto] sm:py-20">
      <div className="landing-container mb-8 flex flex-col items-center justify-center text-center sm:mb-12">
        <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-primary)] mb-4">
          Loved by Teams
        </div>
        <h2 className="landing-display landing-display-2 text-[var(--color-text-on-dark)]">
          Don&apos;t just take our word for it
        </h2>
        <p className="relative z-10 mt-4 max-w-[32rem] landing-body landing-body-1-regular text-[var(--color-text-muted-on-dark)]">
          See what our customers have to say about their experience with Yapsolutely.
        </p>
      </div>

      <div className="relative flex flex-col gap-4 sm:gap-6">
        {/* Row 1 */}
        <motion.div 
          style={{ x: x1 }}
          className="flex w-max gap-4 px-4 sm:gap-6"
        >
          {row1.map((item, idx) => (
            <div key={`r1-${idx}`} className="group relative w-[280px] shrink-0 rounded-[24px] bg-[var(--color-bg-secondary)] p-5 transition-all duration-300 hover:-translate-y-1 sm:w-[340px] sm:p-6 lg:w-[380px]">
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] opacity-0 blur-[2px] transition-opacity duration-300 group-hover:opacity-[0.15]" />
              <div className="absolute inset-0 rounded-[24px] border border-[var(--color-border)] transition-colors duration-300 group-hover:border-[var(--color-accent-primary)]/30" />
              
              <div className="relative z-10 flex gap-1.5 text-[var(--color-accent-primary)] mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 sm:h-4 sm:w-4">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="relative z-10 landing-body text-[15px] leading-relaxed text-[var(--color-text-primary)] mb-6">
                &quot;{item.quote}&quot;
              </p>
              <div className="relative z-10 flex items-center gap-3">
                <Image src={item.avatar} alt={item.author} width={44} height={44} sizes="44px" className="h-11 w-11 rounded-full border border-[var(--color-border)] object-cover" />
                <div>
                  <h4 className="landing-body text-[14px] font-semibold text-[var(--color-text-primary)]">{item.author}</h4>
                  <p className="relative z-10 landing-body text-[12px] text-[var(--color-text-muted)] mt-0.5">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div 
          style={{ x: x2 }}
          className="flex w-max gap-4 px-4 sm:gap-6"
        >
          {row2.map((item, idx) => (
            <div key={`r2-${idx}`} className="group relative w-[280px] shrink-0 rounded-[24px] bg-[var(--color-bg-secondary)] p-5 transition-all duration-300 hover:-translate-y-1 sm:w-[340px] sm:p-6 lg:w-[380px]">
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] opacity-0 blur-[2px] transition-opacity duration-300 group-hover:opacity-[0.15]" />
              <div className="absolute inset-0 rounded-[24px] border border-[var(--color-border)] transition-colors duration-300 group-hover:border-[var(--color-accent-primary)]/30" />
              
              <div className="relative z-10 flex gap-1.5 text-[var(--color-accent-primary)] mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 sm:h-4 sm:w-4">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="relative z-10 landing-body text-[15px] leading-relaxed text-[var(--color-text-primary)] mb-6">
                &quot;{item.quote}&quot;
              </p>
              <div className="relative z-10 flex items-center gap-3">
                <Image src={item.avatar} alt={item.author} width={44} height={44} sizes="44px" className="h-11 w-11 rounded-full border border-[var(--color-border)] object-cover" />
                <div>
                  <h4 className="landing-body text-[14px] font-semibold text-[var(--color-text-primary)]">{item.author}</h4>
                  <p className="relative z-10 landing-body text-[12px] text-[var(--color-text-muted)] mt-0.5">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradients to fade out edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-black via-black/80 to-transparent" />
      </div>
    </section>
  );
}
