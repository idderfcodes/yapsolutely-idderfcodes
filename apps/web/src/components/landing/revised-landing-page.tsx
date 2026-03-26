"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLongRightIcon,
  Bars3Icon,
  BoltIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  MinusIcon,
  PhoneIcon,
  PlusIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import {
  ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerSticky,
  HeroButton,
  HeroVideo,
} from "./container-scroll";
import { DottedSurface } from "./dotted-surface";

const navLinks = [
  { label: "Product", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Docs", href: "/docs" },
];

const marqueeLogos = [
  { file: "twilio", label: "Twilio" },
  { file: "deepgram", label: "Deepgram" },
  { file: "anthropic", label: "Anthropic" },
  { file: "nextdotjs", label: "Next.js" },
  { file: "tailwindcss", label: "Tailwind" },
  { file: "prisma", label: "Prisma" },
  { file: "vercel", label: "Vercel" },
  { file: "nodedotjs", label: "Node.js" },
];

const heroStats = [
  {
    value: "<800ms",
    label: "Streaming reply target",
  },
  {
    value: "24/7",
    label: "After-hours coverage",
  },
  {
    value: "100%",
    label: "Calls transcribed",
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2069&auto=format&fit=crop",
    alt: "Team collaborating around a desk",
  },
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    alt: "Operator working at a laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    alt: "Business team in a planning meeting",
  },
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop",
    alt: "Modern operations workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
    alt: "Professionals speaking across a table",
  },
  {
    src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
    alt: "Desk with laptop and digital collaboration tools",
  },
  {
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop",
    alt: "Distributed team reviewing work together",
  },
  {
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1974&auto=format&fit=crop",
    alt: "Customer support style headset and computer workspace",
  },
];

const howItWorks = [
  {
    number: "01",
    title: "Design the call flow",
    description:
      "Start with your greeting, qualifying prompts, fallback rules, and escalation logic in one clean builder.",
    icon: SparklesIcon,
    preview: <PromptFlowPreview />,
  },
  {
    number: "02",
    title: "Attach a real number",
    description:
      "Assign a live phone number, publish the agent, and route inbound calls without custom telecom plumbing.",
    icon: PhoneIcon,
    preview: <NumberAssignmentPreview />,
  },
  {
    number: "03",
    title: "Review every outcome",
    description:
      "See transcripts, summaries, captured actions, and next steps in the same operator workspace.",
    icon: ShieldCheckIcon,
    preview: <TranscriptReviewPreview />,
  },
];

const featureTiles = [
  {
    title: "Built for every inbound call scenario",
    description:
      "From sales qualification to support triage and after-hours coverage, the runtime stays structured while the experience sounds human.",
    icon: PhoneIcon,
    type: "wide",
    content: <ScenarioMatrix />,
  },
  {
    title: "Sub-second turn taking",
    description:
      "Streaming STT, LLM, and TTS keep the conversation moving without robotic pauses.",
    icon: BoltIcon,
    type: "small",
    content: <MetricBadge value="Fast" label="Low-latency voice pipeline" />,
  },
  {
    title: "Full audit trail",
    description:
      "Every transcript event, tool action, and post-call outcome is visible after the line goes quiet.",
    icon: ShieldCheckIcon,
    type: "small",
    content: <MetricBadge value="Logged" label="Transcript + action history" />,
  },
  {
    title: "One workspace for builders and operators",
    description:
      "Configure prompts, manage numbers, and review outcomes without bouncing between disconnected tools.",
    icon: CalendarDaysIcon,
    type: "wide",
    content: <WorkspacePreview />,
  },
];

const faqItems = [
  {
    id: "01",
    question: "What is Yapsolutely?",
    answer:
      "Yapsolutely is an AI voice agent platform for inbound phone calls. You can build agents, assign real numbers, and review transcripts and outcomes from one workspace.",
  },
  {
    id: "02",
    question: "How fast can I launch an agent?",
    answer:
      "You can configure the prompt, set the first message, attach a number, and publish in minutes. The workflow is designed for quick setup without custom infrastructure work.",
  },
  {
    id: "03",
    question: "Can I review what happened after each call?",
    answer:
      "Yes. Calls include transcripts, timeline events, structured metadata, and tool outcomes so teams can review exactly what the agent said and did.",
  },
  {
    id: "04",
    question: "Which providers power the live runtime?",
    answer:
      "The current live stack uses Anthropic for language generation and Deepgram for speech-to-text and text-to-speech, with Twilio-backed phone routing for inbound calls.",
  },
  {
    id: "05",
    question: "Can I customize the voice and behavior?",
    answer:
      "Absolutely. Each agent can have its own system prompt, first message, voice setup, and operational rules for escalation, lead capture, and follow-up actions.",
  },
  {
    id: "06",
    question: "Is there a free plan?",
    answer:
      "Yes. You can start building without a credit card and upgrade when you need more volume, more agents, or deeper operations workflows.",
  },
];

const footerColumns = [
  {
    title: "Product",
    links: [
      ["Features", "#features"],
      ["Pricing", "/pricing"],
      ["Documentation", "/docs"],
      ["Changelog", "/changelog"],
    ] as [string, string][],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Support", "/support"],
      ["Compliance", "/compliance"],
      ["Contact", "mailto:hello@yapsolutely.com"],
    ] as [string, string][],
  },
  {
    title: "Legal",
    links: [
      ["Terms", "/terms"],
      ["Privacy", "/privacy"],
    ] as [string, string][],
  },
];

const revealFromLeft = {
  hidden: { x: -48, y: 20, scale: 0.96, rotate: -1.5 },
  show: { x: 0, y: 0, scale: 1, rotate: 0 },
};

const revealFromRight = {
  hidden: { x: 48, y: 20, scale: 0.96, rotate: 1.5 },
  show: { x: 0, y: 0, scale: 1, rotate: 0 },
};

const sectionReveal = {
  hidden: {
    y: 42,
    scale: 0.97,
    clipPath: "inset(0 0 100% 0 round 28px)",
  },
  show: {
    y: 0,
    scale: 1,
    clipPath: "inset(0 0 0% 0 round 28px)",
  },
};

const cardReveal = {
  hidden: { y: 54, scale: 0.94, rotateX: 10 },
  show: { y: 0, scale: 1, rotateX: 0 },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function RevisedLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(faqItems[0]?.id ?? "");

  return (
    <div className="landing-shell relative min-h-screen overflow-x-clip bg-[var(--landing-background)] text-[var(--landing-text)]">
      <LandingBackdrop />
      <SpotlightCursor />

      <div className="relative z-10">
        <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6">
          <div className="landing-container">
            <div className="rounded-full border border-[var(--landing-border)]/90 bg-white/85 px-5 py-4 shadow-[0_20px_40px_-30px_rgba(20,20,20,0.18)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <Link
                  href="/"
                  className="landing-display cursor-pointer text-[2rem] leading-none tracking-[-0.05em] text-[var(--landing-text)] transition-transform duration-200 hover:scale-[1.02]"
                >
                  Yapsolutely
                </Link>

                <nav className="hidden items-center gap-8 lg:flex">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="landing-body cursor-pointer text-[14px] font-medium text-[var(--landing-text-muted)] transition-all duration-200 hover:scale-[1.03] hover:text-[var(--landing-text)]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                  <Link
                    href="/sign-in"
                    className="landing-button-secondary inline-flex items-center justify-center px-5 py-3 landing-body text-[14px] font-medium"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    className="landing-button-primary inline-flex items-center justify-center gap-2 px-5 py-3 landing-body text-[14px] font-semibold"
                  >
                    Start building free
                    <ArrowLongRightIcon className="h-4 w-4" />
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((current) => !current)}
                  className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--landing-border)] bg-white text-[var(--landing-text)] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_14px_28px_-18px_rgba(217,95,59,0.42)] lg:hidden"
                  aria-label="Toggle navigation"
                  aria-expanded={mobileMenuOpen}
                >
                  <Bars3Icon className="h-5 w-5" />
                </button>
              </div>

              {mobileMenuOpen ? (
                <div className="mt-4 border-t border-[var(--landing-border)] pt-4 lg:hidden">
                  <div className="flex flex-col gap-3">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="landing-body cursor-pointer rounded-2xl border border-[var(--landing-border)] bg-[var(--landing-background)] px-4 py-3 text-[14px] font-medium text-[var(--landing-text)] transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_14px_28px_-18px_rgba(217,95,59,0.35)]"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="flex flex-col gap-3 pt-1">
                      <Link
                        href="/sign-in"
                        onClick={() => setMobileMenuOpen(false)}
                        className="landing-button-secondary inline-flex items-center justify-center px-5 py-3 landing-body text-[14px] font-medium"
                      >
                        Sign in
                      </Link>
                      <Link
                        href="/sign-up"
                        onClick={() => setMobileMenuOpen(false)}
                        className="landing-button-primary inline-flex items-center justify-center gap-2 px-5 py-3 landing-body text-[14px] font-semibold"
                      >
                        Start building free
                        <ArrowLongRightIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main>
          <section className="landing-section pb-10 pt-10 sm:pt-12 lg:pb-14">
            <div className="landing-container">
              <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:gap-14">
                <motion.div
                  variants={revealFromLeft}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-[38rem] [transform-style:preserve-3d]"
                >
                  <div className="landing-pill inline-flex items-center gap-3 px-4 py-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--landing-accent)] opacity-35" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--landing-accent)]" />
                    </span>
                    <span className="landing-body text-[13px] font-medium text-[var(--landing-text)]">
                      Handling calls now
                    </span>
                  </div>

                  <h1 className="landing-display mt-6 max-w-[11ch] text-[3.75rem] leading-[0.9] tracking-[-0.06em] text-[var(--landing-text)] sm:text-[4.6rem] lg:text-[5.25rem]">
                    AI agents that answer your phone
                  </h1>

                  <p className="landing-body mt-6 max-w-[34rem] text-[17px] leading-8 text-[var(--landing-text-muted)]">
                    Build voice agents, assign real phone numbers, and review every conversation from one beautifully calm operator workspace.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/sign-up"
                      className="landing-button-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 landing-body text-[15px] font-semibold"
                    >
                      Start building free
                      <ArrowLongRightIcon className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#how-it-works"
                      className="landing-button-secondary inline-flex items-center justify-center px-6 py-3.5 landing-body text-[15px] font-medium"
                    >
                      See how it works
                    </Link>
                  </div>

                  <p className="landing-body mt-4 text-[13px] text-[var(--landing-text-muted)]">
                    No credit card required. Free plan available.
                  </p>

                  <div className="mt-10 grid gap-3 sm:grid-cols-3">
                    {heroStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[22px] border border-[var(--landing-border)] bg-white/90 px-4 py-4 shadow-[0_18px_36px_-28px_rgba(20,20,20,0.18)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.02]"
                      >
                        <div className="landing-display text-[2rem] leading-none tracking-[-0.05em] text-[var(--landing-text)]">
                          {stat.value}
                        </div>
                        <div className="landing-body mt-2 text-[12px] leading-5 text-[var(--landing-text-muted)]">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  variants={revealFromRight}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="relative [transform-style:preserve-3d]"
                >
                  <HeroShowcase />
                </motion.div>
              </div>
            </div>
          </section>

          <section className="pb-10 sm:pb-14">
            <div className="landing-container">
              <div className="landing-body mb-5 text-center text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--landing-text-muted)]">
                Powered by proven voice infrastructure
              </div>

              <div className="relative overflow-hidden rounded-[28px] border border-[var(--landing-border)] bg-white/80 px-4 py-4 shadow-[0_22px_42px_-34px_rgba(20,20,20,0.2)] backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/90 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/90 to-transparent" />
                <div className="flex w-max animate-scroll-left items-center gap-12 py-3">
                  {[...marqueeLogos, ...marqueeLogos].map((logo, index) => (
                    <div key={`${logo.file}-${index}`} className="flex items-center gap-3 opacity-85">
                      <Image
                        src={`/logos/${logo.file}.svg`}
                        alt={logo.label}
                        width={28}
                        height={28}
                        className="h-7 w-7"
                      />
                      <span className="landing-body text-[14px] font-medium text-[var(--landing-text-muted)]">
                        {logo.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-4 py-6 sm:px-6 sm:py-8">
            <div className="landing-container">
              <RelevantImageGallery />
            </div>
          </section>

          <section className="px-4 py-6 sm:px-6 sm:py-8">
            <div className="landing-container">
              <ScrollVideoShowcase />
            </div>
          </section>

          <section id="how-it-works" className="landing-section pt-8">
            <div className="landing-container">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[42rem]"
              >
                <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--landing-text-muted)]">
                  How it works
                </div>
                <h2 className="landing-display mt-6 text-[3rem] leading-[0.92] tracking-[-0.06em] text-[var(--landing-text)] sm:text-[4rem]">
                  Three steps to a working phone agent
                </h2>
                <p className="landing-body mt-4 max-w-[32rem] text-[16px] leading-7 text-[var(--landing-text-muted)]">
                  The section structure is inspired by the fetched features layout, then reworked into a lighter Yapsolutely flow with calmer cards and clearer operator cues.
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                className="mt-10 grid gap-6 lg:grid-cols-3"
              >
                {howItWorks.map((step) => {
                  const Icon = step.icon;

                  return (
                    <motion.div key={step.number} variants={cardReveal}>
                      <motion.div
                        variants={cardReveal}
                        whileHover={{ y: -10, rotate: -0.8, scale: 1.015 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="landing-card landing-card-hover h-full rounded-[30px] bg-white/92 p-6 shadow-[0_24px_44px_-34px_rgba(20,20,20,0.22)] [transform-style:preserve-3d]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--landing-accent)_10%,white)] text-[var(--landing-accent)]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="landing-display text-[2.5rem] leading-none tracking-[-0.06em] text-[color:color-mix(in_srgb,var(--landing-accent)_82%,white)]">
                            {step.number}
                          </div>
                        </div>

                        <h3 className="landing-display mt-6 text-[2rem] leading-[0.95] tracking-[-0.04em] text-[var(--landing-text)]">
                          {step.title}
                        </h3>
                        <p className="landing-body mt-3 text-[14px] leading-7 text-[var(--landing-text-muted)]">
                          {step.description}
                        </p>

                        <div className="mt-6 rounded-[24px] border border-[var(--landing-border)] bg-[var(--landing-background-soft)] p-4">
                          {step.preview}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          <section id="features" className="landing-section pt-4">
            <div className="landing-container">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[46rem]"
              >
                <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--landing-text-muted)]">
                  Platform
                </div>
                <h2 className="landing-display mt-6 text-[3rem] leading-[0.92] tracking-[-0.06em] text-[var(--landing-text)] sm:text-[4rem]">
                  A bento-style system for inbound voice operations
                </h2>
                <p className="landing-body mt-4 max-w-[36rem] text-[16px] leading-7 text-[var(--landing-text-muted)]">
                  This section borrows the compact composition of the fetched bento grid, then swaps in the locked palette, typography, and product-specific content.
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
              >
                {featureTiles.map((tile) => {
                  const Icon = tile.icon;
                  const wide = tile.type === "wide";

                  return (
                    <motion.div
                      key={tile.title}
                      variants={cardReveal}
                      whileHover={{ y: -12, rotate: 0.6, scale: 1.012 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className={wide ? "lg:col-span-2" : "lg:col-span-1"}
                    >
                      <div className="landing-card landing-card-hover h-full rounded-[30px] bg-white/92 p-6 shadow-[0_24px_44px_-34px_rgba(20,20,20,0.22)]">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--landing-accent)_10%,white)] text-[var(--landing-accent)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="landing-display mt-6 text-[2rem] leading-[0.96] tracking-[-0.04em] text-[var(--landing-text)]">
                          {tile.title}
                        </h3>
                        <p className="landing-body mt-3 max-w-[40rem] text-[14px] leading-7 text-[var(--landing-text-muted)]">
                          {tile.description}
                        </p>
                        <div className="mt-6 rounded-[24px] border border-[var(--landing-border)] bg-[var(--landing-background-soft)] p-4">
                          {tile.content}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          <section id="faq" className="landing-section pt-4">
            <div className="landing-container max-w-[62rem]">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[42rem]"
              >
                <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--landing-text-muted)]">
                  FAQ
                </div>
                <h2 className="landing-display mt-6 text-[3rem] leading-[0.92] tracking-[-0.06em] text-[var(--landing-text)] sm:text-[4rem]">
                  Questions teams ask before they hand the phone to AI
                </h2>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                className="mt-10 rounded-[30px] border border-[var(--landing-border)] bg-white/92 px-4 py-2 shadow-[0_24px_44px_-34px_rgba(20,20,20,0.22)] sm:px-6"
              >
                {faqItems.map((item) => {
                  const open = openFaq === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      variants={cardReveal}
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="border-b border-[var(--landing-border)] py-4 last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? "" : item.id)}
                        className="flex w-full cursor-pointer items-start justify-between gap-4 rounded-2xl px-2 py-2 text-left transition-transform duration-200 hover:scale-[1.01]"
                      >
                        <div className="flex flex-1 items-start gap-4 sm:gap-6">
                          <span className="landing-body pt-1 text-[12px] font-medium text-[var(--landing-text-muted)]">
                            {item.id}
                          </span>
                          <div>
                            <div className="landing-display text-[2rem] leading-[0.95] tracking-[-0.04em] text-[var(--landing-text)] sm:text-[2.6rem]">
                              {item.question}
                            </div>
                            <motion.div
                              initial={false}
                              animate={{
                                height: open ? "auto" : 0,
                                y: open ? 0 : -16,
                                clipPath: open
                                  ? "inset(0 0 0% 0 round 12px)"
                                  : "inset(0 0 100% 0 round 12px)",
                              }}
                              transition={{ duration: 0.24, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <p className="landing-body max-w-[42rem] pt-4 text-[15px] leading-7 text-[var(--landing-text-muted)]">
                                {item.answer}
                              </p>
                            </motion.div>
                          </div>
                        </div>

                        <span className="mt-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--landing-border)] bg-[var(--landing-background-soft)] text-[var(--landing-text-muted)] transition-all duration-200 hover:scale-[1.06] hover:border-[color:color-mix(in_srgb,var(--landing-accent)_25%,var(--landing-border))] hover:text-[var(--landing-accent)]">
                          {open ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                        </span>
                      </button>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          <section className="px-4 pb-10 sm:px-6 sm:pb-14">
            <div className="landing-container">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="overflow-hidden rounded-[34px] border border-[var(--landing-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(247,244,239,0.96))] p-8 shadow-[0_28px_48px_-34px_rgba(20,20,20,0.24)] sm:p-10 lg:p-12"
              >
                <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                  <div>
                    <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--landing-text-muted)]">
                      Ready when you are
                    </div>
                    <h2 className="landing-display mt-6 max-w-[11ch] text-[3rem] leading-[0.92] tracking-[-0.06em] text-[var(--landing-text)] sm:text-[4rem]">
                      Stop missing calls. Start routing real conversations.
                    </h2>
                    <p className="landing-body mt-4 max-w-[34rem] text-[16px] leading-7 text-[var(--landing-text-muted)]">
                      Deploy an AI phone agent in minutes, keep every transcript, and give your team a calmer way to operate inbound voice.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/sign-up"
                        className="landing-button-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 landing-body text-[15px] font-semibold"
                      >
                        Get started free
                        <ArrowLongRightIcon className="h-5 w-5" />
                      </Link>
                      <Link
                        href="/docs"
                        className="landing-button-secondary inline-flex items-center justify-center px-6 py-3.5 landing-body text-[15px] font-medium"
                      >
                        Read the docs
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-[30px] border border-[var(--landing-border)] bg-white/90 p-5 shadow-[0_22px_42px_-32px_rgba(20,20,20,0.2)]">
                    <div className="space-y-3">
                      {[
                        ["Inbound Sales", "Live now"],
                        ["Support Line", "Active"],
                        ["After-hours", "Catching every lead"],
                      ].map(([label, status]) => (
                        <div
                          key={label}
                          className="flex items-center justify-between rounded-[20px] border border-[var(--landing-border)] bg-[var(--landing-background-soft)] px-4 py-3"
                        >
                          <div>
                            <div className="landing-body text-[13px] font-medium text-[var(--landing-text)]">
                              {label}
                            </div>
                            <div className="landing-body mt-1 text-[11px] text-[var(--landing-text-muted)]">
                              {status}
                            </div>
                          </div>
                          <CheckCircleIcon className="h-5 w-5 text-[var(--landing-accent)]" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="border-t border-[var(--landing-border)] bg-[rgba(247,244,239,0.72)] py-12 backdrop-blur-sm">
          <div className="landing-container">
            <div className="grid gap-10 md:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">
              <div>
                <div className="landing-display text-[2rem] leading-none tracking-[-0.05em] text-[var(--landing-text)]">
                  Yapsolutely
                </div>
                <p className="landing-body mt-4 max-w-[18rem] text-[14px] leading-6 text-[var(--landing-text-muted)]">
                  AI voice agents that answer your phone and leave your team with a usable call record.
                </p>
              </div>

              {footerColumns.map((column) => (
                <FooterColumn key={column.title} title={column.title} links={column.links} />
              ))}
            </div>

            <div className="landing-body mt-10 border-t border-[var(--landing-border)] pt-6 text-[14px] text-[var(--landing-text-muted)]">
              © 2026 Yapsolutely, Inc.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function HeroShowcase() {
  return (
    <div className="relative">
      <div className="absolute -left-8 top-6 h-32 w-32 rounded-full bg-[color:color-mix(in_srgb,var(--landing-accent)_18%,transparent)] blur-3xl" />
      <div className="absolute -right-6 bottom-10 h-40 w-40 rounded-full bg-[rgba(20,20,20,0.06)] blur-3xl" />

      <div className="relative overflow-hidden rounded-[34px] border border-[var(--landing-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(247,244,239,0.92))] p-4 shadow-[0_32px_70px_-38px_rgba(20,20,20,0.26)] sm:p-5">
        <div className="rounded-[28px] border border-[var(--landing-border)] bg-white/85 p-4 backdrop-blur-sm sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFB4A3]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F4D7AE]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#C9E1D2]" />
            </div>
            <div className="landing-body rounded-full border border-[var(--landing-border)] bg-[var(--landing-background-soft)] px-4 py-1.5 text-[12px] font-medium text-[var(--landing-text-muted)]">
              Live operator view
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[172px_1fr]">
            <div className="space-y-3 rounded-[24px] border border-[var(--landing-border)] bg-[var(--landing-background-soft)] p-4">
              <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--landing-text-muted)]">
                Agents
              </div>
              {[
                ["Inbound Sales", "ACTIVE"],
                ["Support Line", "ACTIVE"],
                ["After-hours", "DRAFT"],
              ].map(([label, state]) => (
                <div key={label} className="rounded-[18px] border border-[var(--landing-border)] bg-white px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="landing-body text-[13px] font-medium text-[var(--landing-text)]">
                      {label}
                    </span>
                    <span className="rounded-full bg-[color:color-mix(in_srgb,var(--landing-accent)_10%,white)] px-2.5 py-1 text-[10px] font-semibold text-[var(--landing-accent)]">
                      {state}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Calls today", "47"],
                  ["Booked", "11"],
                  ["Resolved", "91%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[20px] border border-[var(--landing-border)] bg-white px-4 py-4">
                    <div className="landing-body text-[11px] text-[var(--landing-text-muted)]">{label}</div>
                    <div className="landing-display mt-2 text-[2rem] leading-none tracking-[-0.05em] text-[var(--landing-text)]">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden rounded-[24px] border border-[var(--landing-border)] bg-white">
                <div className="flex items-center justify-between border-b border-[var(--landing-border)] bg-[var(--landing-background-soft)] px-4 py-3">
                  <div>
                    <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--landing-text-muted)]">
                      Live transcript
                    </div>
                    <div className="landing-body mt-1 text-[13px] font-medium text-[var(--landing-text)]">
                      +1 (415) 555-0142
                    </div>
                  </div>
                  <span className="rounded-full bg-[color:color-mix(in_srgb,var(--landing-accent)_10%,white)] px-3 py-1 text-[11px] font-semibold text-[var(--landing-accent)]">
                    Lead score 91
                  </span>
                </div>

                <div className="space-y-3 p-4">
                  <TranscriptBubble speaker="Agent" copy="Thanks for calling. Are you buying for your team or for a client?" />
                  <TranscriptBubble speaker="Caller" copy="For my team. We need something live this month." caller />
                  <TranscriptBubble speaker="Action" copy="Demo booked for tomorrow at 11:30 AM." compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollVideoShowcase() {
  return (
    <div className="overflow-hidden rounded-[34px] border border-[var(--landing-border)] bg-[#0E0E10] shadow-[0_34px_80px_-48px_rgba(20,20,20,0.55)]">
      <ContainerScroll className="min-h-[160svh]">
        <ContainerSticky className="flex min-h-svh items-center justify-center px-3 py-3 sm:px-6 sm:py-6">
          <div className="relative flex min-h-[680px] w-full items-stretch overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(217,95,59,0.24),transparent_32%),linear-gradient(180deg,#121316_0%,#0B0B0C_100%)]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_26%,rgba(0,0,0,0.16)_100%)]" />

            <ContainerAnimated
              className="relative z-20 mx-auto flex w-full max-w-[44rem] flex-col items-center px-6 pt-14 text-center sm:px-10 sm:pt-18"
              inputRange={[0, 0.36]}
              outputRange={[56, 0]}
            >
              <div className="landing-body inline-flex items-center rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/72 backdrop-blur-sm">
                Product walkthrough
              </div>

              <h3 className="landing-display mt-6 max-w-[12ch] text-[3rem] leading-[0.9] tracking-[-0.06em] text-white sm:text-[4.5rem]">
                See the operator workspace move like a real team would use it
              </h3>

              <p className="landing-body mt-5 max-w-[34rem] text-[16px] leading-7 text-white/70 sm:text-[17px]">
                This section uses your scroll-driven container pattern as a placeholder product film: one surface for the call flow, the live transcript, and the handoff cues your team actually cares about.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <HeroButton
                  type="button"
                  onClick={() => {
                    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="border-[rgba(217,95,59,0.45)] bg-[rgba(217,95,59,0.12)] px-5 py-2.5 shadow-[0px_18px_48px_rgba(217,95,59,0.24)] hover:bg-[rgba(217,95,59,0.18)]"
                >
                  <span className="landing-body text-[14px] font-semibold text-white">
                    Follow the workflow
                  </span>
                  <ArrowLongRightIcon className="ml-2 h-4 w-4 text-white transition-transform duration-200 group-hover:translate-x-0.5" />
                </HeroButton>

                <div className="landing-body rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-medium text-white/65 backdrop-blur-sm">
                  Placeholder video for now — motion system is live.
                </div>
              </div>
            </ContainerAnimated>

            <ContainerInset
              className="absolute inset-x-3 bottom-3 top-[35%] z-10 sm:inset-x-6 sm:bottom-6 sm:top-[32%]"
              insetYRange={[54, 2]}
              insetXRange={[42, 2]}
              roundednessRange={[1000, 30]}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[30px] border border-white/10 bg-[#111214] shadow-[0_30px_90px_-46px_rgba(0,0,0,0.9)]">
                <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-black/45 px-5 py-3 backdrop-blur-md">
                  <div>
                    <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.18em] text-white/48">
                      Placeholder walkthrough
                    </div>
                    <div className="landing-body mt-1 text-[14px] font-medium text-white">
                      Voice agent workspace preview
                    </div>
                  </div>

                  <div className="landing-body rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-[11px] font-medium text-white/72">
                    Live preview
                  </div>
                </div>

                <HeroVideo
                  poster="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                  preload="none"
                  aria-label="Placeholder video panel for the Yapsolutely product walkthrough"
                  className="h-full w-full object-cover pt-[68px]"
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,transparent_30%,rgba(7,7,8,0.72)_100%)]" />

                <div className="absolute bottom-5 left-5 right-5 z-20 grid gap-3 md:grid-cols-3">
                  {[
                    ["Transcript", "Streaming line-by-line with action events attached"],
                    ["Routing", "Escalate to a human when pricing or urgency crosses the line"],
                    ["Outcome", "Book, resolve, or capture structured follow-up in one pass"],
                  ].map(([title, description]) => (
                    <div
                      key={title}
                      className="rounded-[20px] border border-white/10 bg-black/40 px-4 py-4 backdrop-blur-md"
                    >
                      <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[rgba(255,255,255,0.48)]">
                        {title}
                      </div>
                      <div className="landing-body mt-2 text-[13px] leading-6 text-white/78">
                        {description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ContainerInset>
          </div>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  );
}

function PromptFlowPreview() {
  return (
    <div className="space-y-3">
      {[
        ["Greeting", "Thank the caller and set the tone"],
        ["Qualification", "Capture team size, urgency, and use case"],
        ["Fallback", "Escalate pricing objections to a human"],
      ].map(([title, copy]) => (
        <div
          key={title}
          className="rounded-[18px] border border-[var(--landing-border)] bg-white px-4 py-3"
        >
          <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-accent)]">
            {title}
          </div>
          <div className="landing-body mt-1 text-[13px] text-[var(--landing-text)]">{copy}</div>
        </div>
      ))}
    </div>
  );
}

function NumberAssignmentPreview() {
  return (
    <div className="space-y-3">
      {[
        ["+1 (415) 555-0142", "Inbound Sales"],
        ["+1 (212) 555-0198", "Support Line"],
        ["+1 (310) 555-0067", "After-hours"],
      ].map(([number, agent]) => (
        <div
          key={number}
          className="flex items-center justify-between rounded-[18px] border border-[var(--landing-border)] bg-white px-4 py-3"
        >
          <div>
            <div className="landing-body text-[13px] font-medium text-[var(--landing-text)]">{number}</div>
            <div className="landing-body mt-1 text-[11px] text-[var(--landing-text-muted)]">{agent}</div>
          </div>
          <CheckCircleIcon className="h-5 w-5 text-[var(--landing-accent)]" />
        </div>
      ))}
    </div>
  );
}

function TranscriptReviewPreview() {
  return (
    <div className="rounded-[18px] border border-[var(--landing-border)] bg-white p-4">
      <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
        Outcome timeline
      </div>
      <div className="mt-4 space-y-3">
        <TranscriptBubble speaker="Agent" copy="I can help with that. Are you looking for a quote or a demo first?" />
        <TranscriptBubble speaker="Caller" copy="A demo. We have five locations now and two more coming soon." caller />
      </div>
    </div>
  );
}

function ScenarioMatrix() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[
        ["Inbound sales", "Qualify, book, and route hot leads"],
        ["Support", "Handle tier-one questions before escalation"],
        ["Booking", "Confirm availability and lock a slot"],
        ["After-hours", "Capture overnight demand without voicemail"],
      ].map(([title, description]) => (
        <div
          key={title}
          className="rounded-[18px] border border-[var(--landing-border)] bg-white px-4 py-4"
        >
          <div className="landing-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-accent)]">
            {title}
          </div>
          <div className="landing-body mt-2 text-[13px] leading-6 text-[var(--landing-text-muted)]">
            {description}
          </div>
        </div>
      ))}
    </div>
  );
}

function WorkspacePreview() {
  return (
    <div className="grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[18px] border border-[var(--landing-border)] bg-white p-4">
        <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
          Live overview
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["47", "Calls today"],
            ["11", "Booked"],
            ["3", "Escalated"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[16px] bg-[var(--landing-background-soft)] px-3 py-3 text-center">
              <div className="landing-display text-[1.5rem] leading-none tracking-[-0.04em] text-[var(--landing-text)]">
                {value}
              </div>
              <div className="landing-body mt-1 text-[11px] text-[var(--landing-text-muted)]">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[18px] border border-[var(--landing-border)] bg-white p-4">
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4 text-[var(--landing-accent)]" />
          <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
            Queue status
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {[
            ["Waiting", "2"],
            ["Active", "4"],
            ["Needs follow-up", "7"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between rounded-[16px] bg-[var(--landing-background-soft)] px-3 py-3">
              <span className="landing-body text-[12px] text-[var(--landing-text)]">{label}</span>
              <span className="landing-body text-[12px] font-semibold text-[var(--landing-accent)]">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[18px] border border-[var(--landing-border)] bg-white px-4 py-4">
      <div className="landing-display text-[2rem] leading-none tracking-[-0.05em] text-[var(--landing-text)]">
        {value}
      </div>
      <div className="landing-body mt-2 text-[13px] leading-6 text-[var(--landing-text-muted)]">{label}</div>
    </div>
  );
}

function TranscriptBubble({
  speaker,
  copy,
  caller = false,
  compact = false,
}: {
  speaker: string;
  copy: string;
  caller?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-[18px] border px-4 py-3 ${
        compact
          ? "border-[var(--landing-border)] bg-[var(--landing-background-soft)]"
          : caller
            ? "border-[var(--landing-border)] bg-white"
            : "border-[rgba(217,95,59,0.18)] bg-[#FDF5F2]"
      }`}
    >
      <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
        {speaker}
      </div>
      <div className="landing-body mt-2 text-[14px] leading-6 text-[var(--landing-text)]">{copy}</div>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="landing-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
        {title}
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {links.map(([label, href]) => {
          const className =
            "landing-body cursor-pointer text-[14px] font-medium text-[var(--landing-text)] transition-all duration-200 hover:scale-[1.02] hover:text-[var(--landing-accent)]";

          if (href.startsWith("mailto:")) {
            return (
              <a key={label} href={href} className={className}>
                {label}
              </a>
            );
          }

          return (
            <Link key={label} href={href} className={className}>
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function RelevantImageGallery() {
  const duplicatedImages = [...galleryImages, ...galleryImages];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .landing-infinite-scroll {
          animation: scroll-right 20s linear infinite;
        }

        .landing-scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .landing-image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .landing-image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.08);
        }
      `}</style>

      <div className="relative overflow-hidden rounded-[34px] border border-[rgba(255,255,255,0.08)] bg-black px-6 py-10 shadow-[0_32px_70px_-36px_rgba(0,0,0,0.45)] sm:px-8 sm:py-12 lg:px-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-0" />

        <div className="relative z-10 mb-8 flex max-w-[42rem] flex-col gap-4">
          <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <span className="landing-body text-[12px] font-medium uppercase tracking-[0.18em] text-white/60">
              Who it is for
            </span>
          </div>
          <h2 className="landing-display max-w-[12ch] text-[3rem] leading-[0.92] tracking-[-0.06em] text-white sm:text-[4rem]">
            Built for teams living inside real customer conversations
          </h2>
          <p className="landing-body max-w-[38rem] text-[16px] leading-7 text-white/65">
            Sales desks, support teams, clinics, service operators, and after-hours teams all need the same thing: every inbound call answered, captured, and routed cleanly.
          </p>
        </div>

        <div className="relative z-10 flex items-center justify-center py-2">
          <div className="landing-scroll-container w-full">
            <div className="landing-infinite-scroll flex w-max gap-6">
              {duplicatedImages.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="landing-image-item flex-shrink-0 h-48 w-48 overflow-hidden rounded-xl shadow-2xl md:h-64 md:w-64 lg:h-80 lg:w-80"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-20" />
      </div>
    </>
  );
}

function LandingBackdrop() {
  return (
    <>
      <DottedSurface className="opacity-[0.52] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.42),rgba(0,0,0,0.14))] [-webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.42),rgba(0,0,0,0.14))]" />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-[color:color-mix(in_srgb,var(--landing-accent)_9%,transparent)] blur-3xl" />
        <div className="absolute bottom-[2%] right-[-8%] h-[26rem] w-[26rem] rounded-full bg-[rgba(20,20,20,0.05)] blur-3xl" />
      </div>
    </>
  );
}

function SpotlightCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let animationFrameId = 0;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const handleMouseLeave = () => {
      targetX = -1000;
      targetY = -1000;
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (currentX > -900 && currentY > -900) {
        const gradient = context.createRadialGradient(currentX, currentY, 0, currentX, currentY, 220);
        gradient.addColorStop(0, "rgba(217,95,59,0.10)");
        gradient.addColorStop(1, "rgba(217,95,59,0)");

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationFrameId = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-20 h-full w-full" aria-hidden="true" />;
}
