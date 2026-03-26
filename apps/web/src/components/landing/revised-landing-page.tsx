"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLongRightIcon,
  BoltIcon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  ClockIcon,
  MinusIcon,
  PhoneIcon,
  PlusIcon,
  QueueListIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import AnimatedTextCycle from "./animated-text-cycle";
import { Header } from "./header";

const LandingDottedSurface = dynamic(
  () => import("./landing-dotted-surface").then((mod) => mod.LandingDottedSurface),
  { ssr: false },
);

const VideoScrollSection = dynamic(
  () => import("./video-scroll-section").then((mod) => mod.VideoScrollSection),
  {
    loading: () => (
      <div className="mt-10 h-[28rem] rounded-[34px] border border-[var(--landing-border)] bg-[var(--landing-background-soft)] shadow-[0_24px_60px_-38px_rgba(20,20,20,0.18)] sm:h-[34rem]" />
    ),
  },
);

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
    label: "Average response target",
  },
  {
    value: "24/7",
    label: "Inbound call coverage",
  },
  {
    value: "100%",
    label: "Calls transcribed",
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
    title: "Built for real inbound call workflows",
    description:
      "Handle inbound sales, support, booking, lead qualification, and after-hours coverage with one voice runtime and one review loop.",
    icon: PhoneIcon,
    type: "wide",
    content: <ScenarioMatrix />,
  },
  {
    title: "Sub-second responses",
    description:
      "Streaming speech and low-latency generation keep live phone calls feeling natural instead of delayed.",
    icon: BoltIcon,
    type: "small",
    content: <MetricBadge value="Fast" label="Low-latency voice pipeline" />,
  },
  {
    title: "Full call record",
    description:
      "Every transcript event, tool action, and post-call outcome stays visible after the call ends.",
    icon: ShieldCheckIcon,
    type: "small",
    content: <MetricBadge value="Logged" label="Transcript + action history" />,
  },
  {
    title: "One workspace from build to review",
    description:
      "Create agents, assign numbers, test behavior, and inspect calls without bouncing between disconnected tools.",
    icon: CalendarDaysIcon,
    type: "wide",
    content: <WorkspacePreview />,
  },
];

const useCases = [
  {
    id: "sales",
    label: "Inbound Sales",
    title: "Qualify leads, answer pricing, and book demos on the first call",
    description:
      "Use Yapsolutely to handle high-intent inbound calls, score opportunities, and route hot leads while the buying signal is still alive.",
    bullets: [
      "Capture team size, urgency, and budget in one flow",
      "Answer common pricing questions before a human joins",
      "Book demos automatically when interest is high",
    ],
    preview: <InboundSalesPreview />,
  },
  {
    id: "booking",
    label: "Appointment Booking",
    title: "Confirm availability and lock appointment slots without back-and-forth",
    description:
      "Let the voice agent confirm availability, collect contact details, and send the next-step confirmation while the caller is still on the line.",
    bullets: [
      "Surface open slots in a structured booking flow",
      "Capture name, date, and contact number in one pass",
      "Send a confirmation text after the call ends",
    ],
    preview: <AppointmentBookingPreview />,
  },
  {
    id: "support",
    label: "Customer Support",
    title: "Handle tier-one questions before escalating complex support calls",
    description:
      "Resolve repetitive inbound support issues, keep the conversation on-script, and escalate only when the caller actually needs a person.",
    bullets: [
      "Answer FAQs using your approved workflow",
      "Track unresolved issues and escalation moments clearly",
      "Keep a transcript for every support interaction",
    ],
    preview: <CustomerSupportPreview />,
  },
  {
    id: "qualification",
    label: "Lead Qualification",
    title: "Screen intent, capture details, and route the strongest leads fast",
    description:
      "Guide inbound callers through a qualification sequence, assign a clear lead score, and trigger the right follow-up while context is fresh.",
    bullets: [
      "Collect qualification answers in a structured flow",
      "Score the lead based on fit and urgency",
      "Push high-intent outcomes straight into the next step",
    ],
    preview: <LeadQualificationPreview />,
  },
  {
    id: "after-hours",
    label: "After-hours Coverage",
    title: "Capture overnight demand instead of sending every caller to voicemail",
    description:
      "Keep your lines open after close, collect the details that matter, and queue organized follow-ups for the next working block.",
    bullets: [
      "Catch calls after business hours with the same brand voice",
      "Log follow-up tasks for morning triage",
      "Stop losing demand to voicemail and missed opportunities",
    ],
    preview: <AfterHoursCoveragePreview />,
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
    question: "How fast can I launch my first agent?",
    answer:
      "You can configure the prompt, set the first message, attach a number, and publish in minutes. The workflow is designed to get an inbound agent live without custom telecom infrastructure work.",
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
  {
    id: "07",
    question: "What phone numbers are supported?",
    answer:
      "Yapsolutely is designed for real number assignment and inbound routing. You can map numbers to agents and make routing visible directly in the workspace.",
  },
  {
    id: "08",
    question: "Can I customize how my agent sounds?",
    answer:
      "Yes. Voice selection, first message, prompt behavior, and operational rules can all be tuned per agent so the experience matches the call scenario you are deploying for.",
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
  const [openFaq, setOpenFaq] = useState(faqItems[0]?.id ?? "");
  const [activeUseCase, setActiveUseCase] = useState(useCases[0]?.id ?? "");
  const [showHeroTexture, setShowHeroTexture] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");

    const syncTexturePreference = () => {
      setShowHeroTexture(mediaQuery.matches);
    };

    syncTexturePreference();
    mediaQuery.addEventListener("change", syncTexturePreference);

    return () => {
      mediaQuery.removeEventListener("change", syncTexturePreference);
    };
  }, []);

  return (
    <div className="landing-shell relative min-h-screen overflow-x-clip bg-[var(--landing-background)] text-[var(--landing-text)]">
      <LandingBackdrop />

      <div className="relative z-10">
        <Header />

        <main>
          <section className="landing-section pb-10 pt-10 sm:pt-12 lg:pb-14">
            <div className="landing-container">
              <div className="grid overflow-hidden rounded-[36px] border border-white/8 bg-[var(--landing-hero-right)] shadow-[0_36px_90px_-54px_rgba(20,20,20,0.5)] lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:gap-0">
                <motion.div
                  variants={revealFromLeft}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-none bg-[var(--landing-hero-left)] px-8 py-10 [transform-style:preserve-3d] sm:px-10 sm:py-12 lg:px-12 lg:py-14"
                >
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--landing-accent)] opacity-35" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--landing-accent)]" />
                    </span>
                    <span className="landing-body text-[13px] font-medium text-[var(--landing-text-on-dark)]">
                      Handling calls now
                    </span>
                  </div>

                  <h1 className="landing-display mt-6 max-w-[12ch] text-[3.75rem] leading-[0.9] tracking-[-0.06em] text-[var(--landing-text-on-dark)] sm:text-[4.6rem] lg:text-[5.25rem]">
                    AI agents for{" "}
                    <span className="text-[var(--landing-accent)]">
                      <AnimatedTextCycle
                        words={["sales", "support", "booking", "after-hours"]}
                        interval={2400}
                        className="landing-display font-medium"
                      />
                    </span>
                    <br />
                    that answer your phone
                  </h1>

                  <p className="landing-body mt-6 max-w-[34rem] text-[17px] leading-8 text-[var(--landing-text-muted-on-dark)]">
                    Build AI voice agents, assign real phone numbers, and review transcripts, actions, and outcomes from one workspace.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/sign-up"
                      className="landing-button-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 landing-body text-[15px] font-medium"
                    >
                      Start building free
                      <ArrowLongRightIcon className="h-5 w-5" />
                    </Link>
                    <Link
                      href="#how-it-works"
                      className="landing-button-secondary-dark inline-flex items-center justify-center px-6 py-3.5 landing-body text-[15px] font-medium"
                    >
                      See how it works
                    </Link>
                  </div>

                  <p className="landing-body mt-4 text-[13px] text-[var(--landing-text-muted-on-dark)]">
                    No credit card required. Free plan available.
                  </p>
                </motion.div>

                <motion.div
                  variants={revealFromRight}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="relative bg-[var(--landing-hero-right)] p-5 [transform-style:preserve-3d] sm:p-6 lg:p-8"
                >
                  <HeroShowcase showTexture={showHeroTexture} />
                </motion.div>
              </div>
            </div>
          </section>

          <section className="px-4 pb-6 sm:px-6 sm:pb-10">
            <div className="landing-container">
              <div className="overflow-hidden rounded-[34px] border border-white/8 bg-[var(--landing-stats-bg)] px-6 py-6 shadow-[0_30px_80px_-52px_rgba(20,20,20,0.5)] sm:px-8 sm:py-8">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
                  <div>
                    <div className="landing-body text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--landing-text-muted-on-dark)]">
                      Built for live phone operations
                    </div>
                    <h2 className="landing-display mt-4 max-w-[12ch] text-[2.8rem] leading-[0.94] tracking-[-0.05em] text-[var(--landing-text-on-dark)] sm:text-[3.6rem]">
                      The metrics teams want before they trust AI on the line
                    </h2>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {heroStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[24px] border border-white/8 bg-white/6 px-5 py-5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]"
                      >
                        <div className="landing-stat text-[2.2rem] leading-none tracking-[-0.05em] text-[var(--landing-text-on-dark)]">
                          {stat.value}
                        </div>
                        <div className="landing-body mt-2 text-[12px] leading-5 text-[var(--landing-text-muted-on-dark)]">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-10 sm:pb-14">
            <div className="landing-container">
              <div className="landing-body mb-5 text-center text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--landing-text-muted)]">
                Powered by the voice stack behind real call flows
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

          <section className="landing-section pt-4">
            <div className="landing-container">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[48rem]"
              >
                <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--landing-text-muted)]">
                  Use cases
                </div>
                <h2 className="landing-display mt-6 text-[3rem] leading-[0.92] tracking-[-0.06em] text-[var(--landing-text)] sm:text-[4rem]">
                  Built for every inbound call scenario
                </h2>
                <p className="landing-body mt-4 max-w-[38rem] text-[16px] leading-7 text-[var(--landing-text-muted)]">
                  From first-touch sales to after-hours coverage, Yapsolutely gives teams a structured way to answer, qualify, book, and route calls without voicemail gaps.
                </p>
              </motion.div>

              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.58, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 overflow-hidden rounded-[30px] border border-[var(--landing-border)] bg-white/92 shadow-[0_24px_44px_-34px_rgba(20,20,20,0.22)]"
              >
                <div className="flex flex-wrap gap-x-6 gap-y-4 border-b border-[var(--landing-border)] px-5 py-5 sm:px-6">
                  {useCases.map((useCase) => {
                    const active = activeUseCase === useCase.id;

                    return (
                      <button
                        key={useCase.id}
                        type="button"
                        onClick={() => setActiveUseCase(useCase.id)}
                        className={`landing-body relative cursor-pointer pb-2 text-[14px] font-medium transition-all duration-200 hover:text-[var(--landing-text)] ${
                          active ? "text-[var(--landing-text)]" : "text-[var(--landing-text-muted)]"
                        }`}
                      >
                        {useCase.label}
                        <span
                          className={`absolute inset-x-0 -bottom-[1px] h-[2px] rounded-full bg-[var(--landing-accent)] transition-opacity duration-200 ${
                            active ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence mode="wait">
                  {useCases
                    .filter((useCase) => useCase.id === activeUseCase)
                    .map((useCase) => (
                      <motion.div
                        key={useCase.id}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="grid gap-6 px-5 py-6 sm:px-6 sm:py-7 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center"
                      >
                        <div>
                          <h3 className="landing-display max-w-[14ch] text-[2.4rem] leading-[0.94] tracking-[-0.05em] text-[var(--landing-text)] sm:text-[3rem]">
                            {useCase.title}
                          </h3>
                          <p className="landing-body mt-4 max-w-[32rem] text-[15px] leading-7 text-[var(--landing-text-muted)] sm:text-[16px]">
                            {useCase.description}
                          </p>

                          <div className="mt-6 space-y-3">
                            {useCase.bullets.map((bullet) => (
                              <div key={bullet} className="flex items-start gap-3 rounded-[18px] border border-[var(--landing-border)] bg-[var(--landing-background-soft)] px-4 py-3">
                                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--landing-accent)]" />
                                <p className="landing-body text-[14px] leading-6 text-[var(--landing-text)]">{bullet}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-[24px] border border-[var(--landing-border)] bg-[var(--landing-background-soft)] p-4 sm:p-5">
                          {useCase.preview}
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          <section className="px-4 py-6 sm:px-6 sm:py-8">
            <div className="landing-container">
              <VideoScrollSection
                videoSrc="/videos/landing-demo.mp4"
                poster="/hero-dashboard.png"
                badge="Product walkthrough"
                title="See the inbound call workflow unfold as you scroll"
                description="This section uses your scroll-scale video pattern to show how Yapsolutely moves from agent setup to live call review."
                points={[
                  {
                    title: "Build",
                    description: "Define the prompt, voice, and escalation rules in one workspace.",
                  },
                  {
                    title: "Deploy",
                    description: "Attach a number and put the agent live without custom telecom work.",
                  },
                  {
                    title: "Review",
                    description: "Keep transcripts, actions, and outcomes visible after every call.",
                  },
                ]}
              />
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
                  Configure the agent, attach a number, and review transcripts and actions after every call.
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
                  Everything you need to run inbound AI phone agents
                </h2>
                <p className="landing-body mt-4 max-w-[36rem] text-[16px] leading-7 text-[var(--landing-text-muted)]">
                  Yapsolutely brings agent configuration, number assignment, transcripts, and runtime proof into one product.
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
                  Questions teams ask before they go live
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
                className="overflow-hidden rounded-[34px] border border-white/8 bg-[var(--landing-cta-bg)] p-8 shadow-[0_28px_70px_-36px_rgba(20,20,20,0.4)] sm:p-10 lg:p-12"
              >
                <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                  <div>
                    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/6 px-4 py-2 landing-body text-[12px] font-medium text-[var(--landing-text-muted-on-dark)]">
                      Go live faster
                    </div>
                    <h2 className="landing-display mt-6 max-w-[11ch] text-[3rem] leading-[0.92] tracking-[-0.06em] text-[var(--landing-text-on-dark)] sm:text-[4rem]">
                      Stop sending inbound calls to voicemail.
                    </h2>
                    <p className="landing-body mt-4 max-w-[34rem] text-[16px] leading-7 text-[var(--landing-text-muted-on-dark)]">
                      Build the agent, attach the number, and keep a full transcript of every conversation from one dashboard.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/sign-up"
                        className="landing-button-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 landing-body text-[15px] font-medium"
                      >
                        Get started free
                        <ArrowLongRightIcon className="h-5 w-5" />
                      </Link>
                      <Link
                        href="/docs"
                        className="landing-button-secondary-dark inline-flex items-center justify-center px-6 py-3.5 landing-body text-[15px] font-medium"
                      >
                        Read the docs
                      </Link>
                    </div>
                  </div>

                  <div className="mx-auto w-full max-w-[320px] rounded-[30px] border border-white/8 bg-white/6 p-5 shadow-[0_22px_42px_-32px_rgba(0,0,0,0.32)] backdrop-blur-sm">
                    <MascotIllustration />
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
                  AI phone agents for inbound calls, transcripts, number routing, and post-call review.
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

function HeroShowcase({ showTexture }: { showTexture: boolean }) {
  return (
    <div className="relative">
      <div className="absolute -left-8 top-6 h-32 w-32 rounded-full bg-[color:color-mix(in_srgb,var(--landing-accent)_18%,transparent)] blur-3xl" />
      <div className="absolute -right-6 bottom-10 h-40 w-40 rounded-full bg-[rgba(247,244,239,0.06)] blur-3xl" />

      <div className="relative overflow-hidden rounded-[34px] border border-white/8 bg-[linear-gradient(145deg,rgba(26,26,26,0.96),rgba(20,20,20,0.98))] p-4 shadow-[0_32px_70px_-38px_rgba(0,0,0,0.4)] sm:p-5">
        {showTexture ? (
          <LandingDottedSurface
            className="opacity-80"
            pointColor="#D95F3B"
            fogColor="#1A1A1A"
            pointOpacity={0.18}
            pointSize={4.5}
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,95,59,0.16),transparent_34%),linear-gradient(180deg,rgba(26,26,26,0.04),rgba(20,20,20,0.22))]" />
        <div className="rounded-[28px] border border-white/8 bg-white/4 p-4 backdrop-blur-sm sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFB4A3]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#F4D7AE]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#C9E1D2]" />
            </div>
            <div className="landing-body rounded-full border border-white/8 bg-white/6 px-4 py-1.5 text-[12px] font-medium text-[var(--landing-text-on-dark)]">
              Live operator view
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[172px_1fr]">
            <div className="space-y-3 rounded-[24px] border border-white/8 bg-black/12 p-4">
              <div className="landing-body text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--landing-text-muted-on-dark)]">
                Agents
              </div>
              {[
                ["Inbound Sales", "ACTIVE"],
                ["Support Line", "ACTIVE"],
                ["After-hours", "DRAFT"],
              ].map(([label, state]) => (
                <div key={label} className="rounded-[18px] border border-white/8 bg-white/6 px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="landing-body text-[13px] font-medium text-[var(--landing-text-on-dark)]">
                      {label}
                    </span>
                    <span className="landing-body rounded-full bg-[color:color-mix(in_srgb,var(--landing-accent)_16%,transparent)] px-2.5 py-1 text-[10px] font-medium text-[var(--landing-accent)]">
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
                  <div key={label} className="rounded-[20px] border border-white/8 bg-white/6 px-4 py-4">
                    <div className="landing-body text-[11px] text-[var(--landing-text-muted-on-dark)]">{label}</div>
                    <div className="landing-stat mt-2 text-[2rem] leading-none tracking-[-0.05em] text-[var(--landing-text-on-dark)]">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden rounded-[24px] border border-[var(--landing-border)] bg-[var(--landing-background-soft)]">
                <div className="flex items-center justify-between border-b border-[var(--landing-border)] bg-[var(--landing-card)] px-4 py-3">
                  <div>
                    <div className="landing-body text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--landing-text-muted)]">
                      Live transcript
                    </div>
                    <div className="landing-body mt-1 text-[13px] font-medium text-[var(--landing-text)]">
                      +1 (415) 555-0142
                    </div>
                  </div>
                  <span className="landing-body rounded-full bg-[color:color-mix(in_srgb,var(--landing-accent)_10%,white)] px-3 py-1 text-[11px] font-medium text-[var(--landing-accent)]">
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
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--landing-accent)]">
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
      <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
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
          <div className="landing-body text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--landing-accent)]">
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
        <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
          Live overview
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["47", "Calls today"],
            ["11", "Booked"],
            ["3", "Escalated"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[16px] bg-[var(--landing-background-soft)] px-3 py-3 text-center">
              <div className="landing-stat text-[1.5rem] leading-none tracking-[-0.04em] text-[var(--landing-text)]">
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
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
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
              <span className="landing-body text-[12px] font-medium text-[var(--landing-accent)]">{value}</span>
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
      <div className="landing-stat text-[2rem] leading-none tracking-[-0.05em] text-[var(--landing-text)]">
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
      <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
        {speaker}
      </div>
      <div className="landing-body mt-2 text-[14px] leading-6 text-[var(--landing-text)]">{copy}</div>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="landing-body text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
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

function InboundSalesPreview() {
  return (
    <div className="rounded-[20px] border border-[var(--landing-border)] bg-white p-4 shadow-[0_18px_34px_-28px_rgba(20,20,20,0.12)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--landing-border)] pb-3">
        <div>
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
            Live inbound call
          </div>
          <div className="landing-body mt-1 text-[13px] font-medium text-[var(--landing-text)]">Qualified lead</div>
        </div>
        <span className="landing-body rounded-full bg-[color:color-mix(in_srgb,var(--landing-accent)_14%,white)] px-3 py-1 text-[11px] font-medium text-[var(--landing-accent)]">
          Lead score 91
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-[18px] border border-[var(--landing-border)] bg-[var(--landing-background-soft)] px-4 py-3">
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
            Caller intent
          </div>
          <div className="landing-body mt-2 text-[14px] text-[var(--landing-text)]">
            &ldquo;We need a demo for five locations and want pricing this week.&rdquo;
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Team", "5 sites"],
            ["Urgency", "This week"],
            ["Booked", "Tomorrow"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[16px] bg-[var(--landing-background-soft)] px-3 py-3 text-center">
              <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--landing-text-muted)]">{label}</div>
              <div className="landing-stat mt-2 text-[1.45rem] leading-none tracking-[-0.04em] text-[var(--landing-text)]">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppointmentBookingPreview() {
  return (
    <div className="rounded-[20px] border border-[var(--landing-border)] bg-white p-4 shadow-[0_18px_34px_-28px_rgba(20,20,20,0.12)]">
      <div className="flex items-center gap-3 border-b border-[var(--landing-border)] pb-3">
        <CalendarDaysIcon className="h-5 w-5 text-[var(--landing-accent)]" />
        <div>
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
            Booking flow
          </div>
          <div className="landing-body mt-1 text-[13px] font-medium text-[var(--landing-text)]">Available slots</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          ["Tue", "10:30 AM"],
          ["Tue", "2:00 PM"],
          ["Wed", "9:00 AM"],
          ["Wed", "1:30 PM"],
        ].map(([day, slot]) => (
          <div key={`${day}-${slot}`} className="rounded-[16px] border border-[var(--landing-border)] bg-[var(--landing-background-soft)] px-4 py-3">
            <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--landing-text-muted)]">{day}</div>
            <div className="landing-body mt-2 text-[14px] font-medium text-[var(--landing-text)]">{slot}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[18px] border border-[var(--landing-border)] bg-[#FDF5F2] px-4 py-3">
        <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--landing-accent)]">Confirmation</div>
        <div className="landing-body mt-2 text-[14px] text-[var(--landing-text)]">SMS confirmation queued after booking is complete.</div>
      </div>
    </div>
  );
}

function CustomerSupportPreview() {
  return (
    <div className="rounded-[20px] border border-[var(--landing-border)] bg-white p-4 shadow-[0_18px_34px_-28px_rgba(20,20,20,0.12)]">
      <div className="flex items-center gap-3 border-b border-[var(--landing-border)] pb-3">
        <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-[var(--landing-accent)]" />
        <div>
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
            Support transcript
          </div>
          <div className="landing-body mt-1 text-[13px] font-medium text-[var(--landing-text)]">Tier-one resolution</div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <TranscriptBubble speaker="Agent" copy="I can help with billing, scheduling, or order updates. Which issue are you calling about?" />
        <TranscriptBubble speaker="Caller" copy="I need to update the delivery address on an existing order." caller />
        <TranscriptBubble speaker="Action" copy="Escalated only after policy check required a human handoff." compact />
      </div>
    </div>
  );
}

function LeadQualificationPreview() {
  return (
    <div className="rounded-[20px] border border-[var(--landing-border)] bg-white p-4 shadow-[0_18px_34px_-28px_rgba(20,20,20,0.12)]">
      <div className="flex items-center gap-3 border-b border-[var(--landing-border)] pb-3">
        <UserPlusIcon className="h-5 w-5 text-[var(--landing-accent)]" />
        <div>
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
            Qualification form
          </div>
          <div className="landing-body mt-1 text-[13px] font-medium text-[var(--landing-text)]">Hot lead routing</div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {[
          ["Use case", "Inbound support and sales"],
          ["Volume", "120 calls / day"],
          ["Urgency", "Needs launch in 2 weeks"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between rounded-[16px] bg-[var(--landing-background-soft)] px-4 py-3">
            <span className="landing-body text-[13px] text-[var(--landing-text-muted)]">{label}</span>
            <span className="landing-body text-[13px] font-medium text-[var(--landing-text)]">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-[18px] border border-[var(--landing-border)] bg-[#FDF5F2] px-4 py-3">
        <span className="landing-body text-[13px] text-[var(--landing-text)]">Lead priority</span>
        <span className="landing-stat text-[1.6rem] leading-none tracking-[-0.04em] text-[var(--landing-accent)]">94</span>
      </div>
    </div>
  );
}

function AfterHoursCoveragePreview() {
  return (
    <div className="rounded-[20px] border border-[var(--landing-border)] bg-white p-4 shadow-[0_18px_34px_-28px_rgba(20,20,20,0.12)]">
      <div className="flex items-center gap-3 border-b border-[var(--landing-border)] pb-3">
        <QueueListIcon className="h-5 w-5 text-[var(--landing-accent)]" />
        <div>
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
            After-hours queue
          </div>
          <div className="landing-body mt-1 text-[13px] font-medium text-[var(--landing-text)]">Morning follow-ups</div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {[
          ["11:42 PM", "New installation request", "Follow-up 8 AM"],
          ["12:08 AM", "Missed billing question", "Route to finance"],
          ["1:16 AM", "Urgent support callback", "Priority"],
        ].map(([time, label, badge]) => (
          <div key={`${time}-${label}`} className="flex items-center justify-between gap-4 rounded-[16px] border border-[var(--landing-border)] bg-[var(--landing-background-soft)] px-4 py-3">
            <div>
              <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--landing-text-muted)]">{time}</div>
              <div className="landing-body mt-1 text-[13px] font-medium text-[var(--landing-text)]">{label}</div>
            </div>
            <span className="landing-body rounded-full bg-white px-3 py-1 text-[11px] font-medium text-[var(--landing-accent)]">
              {badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MascotIllustration() {
  return (
    <div className="text-center">
      <div className="relative mx-auto flex w-full max-w-[240px] items-center justify-center">
        <div className="absolute inset-x-8 top-10 h-24 rounded-full bg-[color:color-mix(in_srgb,var(--landing-accent)_26%,transparent)] blur-3xl" />
        <svg viewBox="0 0 240 240" className="relative h-[220px] w-[220px]" role="img" aria-label="Yapsolutely mascot illustration">
          <circle cx="120" cy="120" r="98" fill="rgba(255,255,255,0.06)" stroke="rgba(247,244,239,0.12)" />
          <circle cx="120" cy="88" r="36" fill="#D95F3B" />
          <circle cx="106" cy="82" r="4.5" fill="#141414" />
          <circle cx="134" cy="82" r="4.5" fill="#141414" />
          <path d="M106 98C112 105 128 105 134 98" stroke="#141414" strokeWidth="4" strokeLinecap="round" fill="none" />
          <rect x="84" y="126" width="72" height="58" rx="28" fill="#F7F4EF" opacity="0.96" />
          <rect x="110" y="136" width="20" height="34" rx="10" fill="#D95F3B" />
          <path d="M92 152C92 170 148 170 148 152" stroke="#141414" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />
          <path d="M168 92C182 98 188 110 188 122" stroke="#D95F3B" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.92" />
          <path d="M181 80C200 90 210 108 210 126" stroke="#D95F3B" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.45" />
          <path d="M72 92C58 98 52 110 52 122" stroke="#D95F3B" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.92" />
          <path d="M59 80C40 90 30 108 30 126" stroke="#D95F3B" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.45" />
          <circle cx="120" cy="198" r="8" fill="#D95F3B" opacity="0.9" />
        </svg>
      </div>

      <div className="mt-2">
        <div className="landing-body text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--landing-text-muted-on-dark)]">
          Always-on voice operator
        </div>
        <p className="landing-body mx-auto mt-3 max-w-[22rem] text-[14px] leading-6 text-[var(--landing-text-on-dark)]">
          A friendlier face for the product — built to suggest voice, responsiveness, and round-the-clock coverage without falling into generic SaaS clipart territory.
        </p>
      </div>
    </div>
  );
}

function LandingBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute left-[-10%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-[color:color-mix(in_srgb,var(--landing-accent)_9%,transparent)] blur-3xl" />
      <div className="absolute bottom-[2%] right-[-8%] h-[26rem] w-[26rem] rounded-full bg-[rgba(20,20,20,0.05)] blur-3xl" />
    </div>
  );
}
