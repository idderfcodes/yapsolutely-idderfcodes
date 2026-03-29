"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import {
  ArrowTopRightOnSquareIcon,
  ArrowLongRightIcon,
  BoltIcon,
  CalendarDaysIcon,
  ChartBarSquareIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
  CheckIcon,
  CircleStackIcon,
  ClockIcon,
  CpuChipIcon,
  EnvelopeIcon,
  LifebuoyIcon,
  MinusIcon,
  PhoneIcon,
  PlusIcon,
  QueueListIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import { Header } from "./header";
import { BentoGridShowcase } from "./bento-grid-showcase";
import { landingDisplayFont } from "./landing-font";
import AnimatedGradientText from "./AnimatedGradientText";
import { BGPattern } from "@/components/ui/bg-pattern";
import { cn } from "@/lib/utils";

const LazyZoomParallaxSection = dynamic(
  () => import("./zoom-parallax-section").then((mod) => mod.ZoomParallaxSection),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="h-[100svh] rounded-none bg-[var(--color-dark-section)]" />,
  },
);

const LazySeeItInActionScrollSection = dynamic(
  () => import("./see-it-in-action-scroll-section").then((mod) => mod.SeeItInActionScrollSection),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="h-[560px] sm:h-[760px]" />,
  },
);

const LazyVideoMasking = dynamic(() => import("@/components/ui/video-masking"), {
  ssr: false,
  loading: () => <SectionSkeleton className="aspect-[1213/667] w-full rounded-[28px] sm:rounded-[32px]" />,
});

const LazyImageReveal = dynamic(() => import("@/components/ui/image-reveal"), {
  ssr: false,
  loading: () => <SectionSkeleton className="mx-auto h-[300px] w-full max-w-6xl rounded-[28px] sm:h-[460px] sm:rounded-[32px]" />,
});

const LazyImageAutoSlider = dynamic(() => import("@/components/ui/image-auto-slider"), {
  ssr: false,
  loading: () => <SectionSkeleton className="h-[220px] rounded-[24px] sm:h-[360px] sm:rounded-[28px]" />,
});

const LazyAnimatedTestimonials = dynamic(() => import("@/components/ui/animated-testimonials"), {
  ssr: false,
  loading: () => <SectionSkeleton className="h-[560px] rounded-[24px] sm:h-[660px] sm:rounded-[28px]" />,
});

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


const howItWorks = [
  {
    number: "01",
    eyebrow: "Build",
    title: "Define Your Agent",
    description:
      "Set the voice, prompt, and routing rules.",
    icon: SparklesIcon,
    signal: "Voice + prompt + routing",
    preview: <PromptFlowPreview />,
  },
  {
    number: "02",
    eyebrow: "Deploy",
    title: "Assign a Number and Go Live",
    description:
      "Attach a real number and start taking calls.",
    icon: PhoneIcon,
    signal: "Routing ready",
    preview: <NumberAssignmentPreview />,
  },
  {
    number: "03",
    eyebrow: "Monitor",
    title: "Review Every Call",
    description:
      "Transcripts, actions, and outcomes after every call.",
    icon: ShieldCheckIcon,
    signal: "Transcript + audit trail",
    preview: <TranscriptReviewPreview />,
  },
];

const useCases = [
  {
    id: "sales",
    label: "Inbound Sales",
    eyebrow: "Sales workflow",
    title: "Qualify, price, and book on the first ring",
    description:
      "Score opportunities and route hot leads before the signal fades.",
    bullets: [
      "Capture team size, urgency, and budget",
      "Answer pricing questions automatically",
      "Book demos when interest is high",
    ],
    footer: "Lead score + booking outcome attached to every call.",
    preview: <InboundSalesPreview />,
  },
  {
    id: "booking",
    label: "Appointment Booking",
    eyebrow: "Scheduling workflow",
    title: "Lock slots without the back-and-forth",
    description:
      "Confirm availability, collect details, and send confirmation on the call.",
    bullets: [
      "Surface open slots in a structured flow",
      "Capture name, date, and contact in one pass",
      "Send confirmation text after the call",
    ],
    footer: "One call, one confirmed booking.",
    preview: <AppointmentBookingPreview />,
  },
  {
    id: "support",
    label: "Customer Support",
    eyebrow: "Support workflow",
    title: "Resolve tier-one, escalate the rest",
    description:
      "Handle repetitive issues on-script. Escalate only when needed.",
    bullets: [
      "Answer FAQs from your approved workflow",
      "Track unresolved issues and escalations",
      "Transcript for every interaction",
    ],
    footer: "Cleaner escalation path, not another black-box bot.",
    preview: <CustomerSupportPreview />,
  },
  {
    id: "qualification",
    label: "Lead Qualification",
    eyebrow: "Qualification workflow",
    title: "Screen, score, and route in one call",
    description:
      "Structured qualification with a clear lead score.",
    bullets: [
      "Collect answers in a structured flow",
      "Score on fit and urgency",
      "Route high-intent leads instantly",
    ],
    footer: "Structured data, not a vague call summary.",
    preview: <LeadQualificationPreview />,
  },
  {
    id: "after-hours",
    label: "After-hours Coverage",
    eyebrow: "Coverage workflow",
    title: "Stop losing overnight calls to voicemail",
    description:
      "Keep lines open after close. Queue organized follow-ups.",
    bullets: [
      "Same brand voice after business hours",
      "Follow-up tasks ready for morning triage",
      "No more missed opportunities",
    ],
    footer: "Queue organized before your team logs in.",
    preview: <AfterHoursCoveragePreview />,
  },
];

const moreUseCaseBenefits = [
  "Speed up the line",
  "Book more visits",
  "Handle repeat questions",
  "Catch after-hours demand",
  "Keep staff on task",
];



const integrationStacks = [
  {
    eyebrow: "Telephony layer",
    title: "Twilio",
    description:
      "Number provisioning, webhooks, and live audio handoff.",
    icon: PhoneIcon,
    points: [
      "Numbers mapped to agents",
      "Inbound routing into the live runtime",
    ],
    badge: "Phone + routing",
  },
  {
    eyebrow: "Speech layer",
    title: "Deepgram",
    description:
      "Streaming STT and TTS that feels like a real conversation.",
    icon: BoltIcon,
    points: [
      "Real-time transcription and playback",
      "Barge-in aware voice handling",
    ],
    badge: "STT + TTS",
  },
  {
    eyebrow: "Reasoning layer",
    title: "Anthropic",
    description:
      "Claude powers replies, tool execution, and prompt behavior.",
    icon: CpuChipIcon,
    points: [
      "Prompt-guided replies with tool orchestration",
      "Flow-generated instructions in the same runtime",
    ],
    badge: "LLM + tools",
  },
  {
    eyebrow: "Product layer",
    title: "Next.js + Prisma",
    description:
      "Calls, transcripts, and actions land in the dashboard.",
    icon: CircleStackIcon,
    points: [
      "Persisted call records and events",
      "Transcript-backed operator review",
    ],
    badge: "App + data",
  },
];

const integrationPartners = [
  "Twilio",
  "Deepgram",
  "Anthropic",
  "Next.js",
  "Prisma",
  "Node.js",
  "Vercel",
];

const ctaSignalPills = [
  "Real phone numbers",
  "Transcript-backed review",
  "Built for inbound ops",
];

const ctaProofStats = [
  { label: "Coverage", value: "24/7" },
  { label: "Review", value: "Every call" },
  { label: "Launch", value: "Fast" },
];

const footerActionLinks = [
  {
    label: "Docs",
    href: "/docs",
    icon: ArrowTopRightOnSquareIcon,
  },
  {
    label: "Support",
    href: "/support",
    icon: LifebuoyIcon,
  },
  {
    label: "Compliance",
    href: "/compliance",
    icon: ShieldCheckIcon,
  },
  {
    label: "Contact",
    href: "mailto:hello@yapsolutely.com",
    icon: EnvelopeIcon,
  },
];

const footerColumns = [
  {
    title: "Product",
    links: [
      ["Features", "#features"],
      ["Pricing", "/#pricing"],
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

const sectionReveal = {
  hidden: {
    y: 32,
    opacity: 0,
    scale: 0.985,
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
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
  return (
    <div
      className={`${landingDisplayFont.variable} landing-shell relative min-h-screen w-full overflow-x-hidden bg-[var(--color-bg)] text-[var(--color-text-primary)]`}
    >
      <LandingBackdrop />

      <div className="relative z-10">
        <main>
          <section className="bg-black pt-0">
            <div className="relative flex min-h-screen min-h-[100svh] w-full flex-col overflow-hidden bg-black pt-16">
              <div className="absolute inset-0 z-0">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                  aria-hidden="true"
                >
                  <source src="/videos/newHEROSECTION.webm" type="video/webm" />
                  <source src="/videos/newHEROSECTION.mp4" type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-b from-transparent via-black/28 to-[#050505]" />
              </div>

              <div className="relative z-10 flex min-h-screen min-h-[100svh] flex-col">
                <Header darkHero />

                <div className="mx-auto flex w-full max-w-[960px] flex-1 items-center justify-center px-4 pb-16 pt-10 sm:px-10 md:pt-14 lg:pb-20 lg:pt-16">
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={staggerContainer}
                  className="relative mx-auto flex max-w-[44rem] flex-col items-center text-center"
                >
                  <div className="pointer-events-none absolute -left-20 top-20 z-0 h-[22rem] w-[22rem] rounded-full bg-[var(--color-accent-primary)] opacity-[0.08] blur-[80px]" />
                  <motion.div
                    variants={cardReveal}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex w-fit items-center gap-3 rounded-full bg-[var(--color-badge-dark)] px-4 py-2"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-pop)] opacity-35" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent-pop)]" />
                    </span>
                    <span className="landing-body text-[13px] font-medium text-[var(--color-text-muted-on-dark)]">
                      Handling calls now
                    </span>
                  </motion.div>

                  <motion.div variants={cardReveal} transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}>
                    <HeroWordReveal />
                  </motion.div>

                  <motion.p
                    variants={cardReveal}
                    transition={{ duration: 0.48, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="landing-body landing-body-1-regular mt-4 max-w-[38rem] text-[var(--color-text-muted-on-dark)] sm:mt-6"
                  >
                    Build voice agents, assign real phone numbers, handle inbound calls. One workspace.
                  </motion.p>

                  <motion.div
                    variants={cardReveal}
                    transition={{ duration: 0.48, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row"
                  >
                    <Link
                      href="/sign-up"
                      className="landing-button-primary landing-body landing-body-2-semibold inline-flex min-h-[44px] items-center justify-center px-6 py-3"
                    >
                      Start building free
                    </Link>
                    <Link
                      href="#how-it-works"
                      className="landing-button-secondary-dark landing-body landing-body-2-semibold inline-flex min-h-[44px] items-center justify-center px-6 py-3"
                    >
                      See how it works
                    </Link>
                  </motion.div>

                  <motion.p
                    variants={cardReveal}
                    transition={{ duration: 0.42, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="landing-body mt-4 text-[12px] text-[var(--color-text-muted-on-dark)]"
                  >
                    No credit card required. Free plan available.
                  </motion.p>
                </motion.div>
                </div>
              </div>
            </div>
          </section>

                    <section id="how-it-works" className="landing-section relative overflow-hidden bg-[#050505] pt-16 sm:pt-24">
            <div className="pointer-events-none absolute inset-0 z-0">
              <div className="absolute left-[20%] top-[-10%] h-[40rem] w-[40rem] rounded-full bg-[var(--color-accent-primary)] opacity-[0.03] blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[10%] h-[30rem] w-[30rem] rounded-full bg-[var(--color-accent-secondary)] opacity-[0.03] blur-[100px]" />
            </div>
            <div className="landing-container relative z-10">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-[42rem] text-center"
              >
                <div className="landing-pill mx-auto inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-primary)]">
                  How it works
                </div>
                <h2 className="landing-display landing-display-1 mt-6 text-[var(--color-text-on-dark)]">
                  <HowItWorksAnimatedText text="Three steps to a live agent" distance={24} />
                </h2>
                <p className="landing-body landing-body-1-regular mx-auto mt-4 max-w-[32rem] text-[var(--color-text-muted-on-dark)]">
                  Configure. Attach a number. Review calls.
                </p>
              </motion.div>
            </div>
          
              <div className="relative z-10 mt-2 flex w-full justify-center pb-12 sm:mt-8 sm:pb-16">
                <DeferredSection
                  rootMargin="220px 0px"
                  placeholder={<SectionSkeleton className="mx-auto h-[300px] w-full max-w-6xl rounded-[28px] sm:h-[460px] sm:rounded-[32px]" />}
                >
                  <LazyImageReveal
                    leftImage="/images/how-it-works/1.png"
                    middleImage="/images/how-it-works/2.png"
                    rightImage="/images/how-it-works/3.png"
                  />
                </DeferredSection>
              </div>

              <div className="landing-container relative z-10 pb-16 sm:pb-20">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3 md:gap-6"
                >
                  {howItWorks.map((step, index) => {
                    const alignmentClassName =
                      index === 0
                        ? "md:justify-self-start"
                        : index === 1
                          ? "md:justify-self-center"
                          : "md:justify-self-end";

                    return (
                      <motion.article
                        key={step.number}
                        variants={cardReveal}
                        className={cn(
                          "w-full rounded-[24px] border border-[var(--color-dark-divider)] bg-[rgba(255,255,255,0.02)] p-5 shadow-[0_22px_54px_-36px_rgba(0,0,0,0.65)] backdrop-blur-sm sm:p-6 md:max-w-[340px]",
                          alignmentClassName,
                        )}
                      >
                        <h3 className="landing-display text-[2rem] leading-[0.95] tracking-[-0.05em] text-[var(--color-text-on-dark)] sm:text-[2.2rem]">
                          <HowItWorksAnimatedText text={step.title} distance={18} />
                        </h3>
                        <p className="landing-body mt-3 max-w-[26rem] text-[15px] leading-6 text-[var(--color-text-muted-on-dark)]">
                          {step.description}
                        </p>
                      </motion.article>
                    );
                  })}
                </motion.div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[15%] bg-gradient-to-b from-transparent via-[rgba(240,232,250,0.24)] to-[rgba(240,232,250,0.88)]" />

              <div className="pointer-events-none absolute inset-x-0 bottom-[-4%] z-[1] h-[15%] bg-[radial-gradient(ellipse_at_center,rgba(240,232,250,0.95)_0%,rgba(240,232,250,0.5)_40%,transparent_76%)] blur-3xl" />
</section>

          <DeferredSection
            rootMargin="260px 0px"
            placeholder={<SectionSkeleton className="h-[100svh] rounded-none bg-[var(--color-dark-section)]" />}
          >
            <LazyZoomParallaxSection />
          </DeferredSection>

          <section className="landing-section relative overflow-hidden bg-black pt-4 pb-12 sm:pb-16">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-transparent to-[var(--color-bg)] z-10" />
              <BGPattern variant="dots" size={24} fill="var(--color-text-muted)" className="opacity-[0.15]" />
            </div>

            <div className="landing-container relative z-10">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  variants={sectionReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-[48rem] flex flex-col items-center"
                >
                  <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-primary)]">
                    Drive-thru AI agent
                  </div>
                  <h2 className="landing-display landing-display-1 mt-6 text-[var(--color-text-on-dark)]">
                    <AnimatedGradientText
                      text="Drive-thru orders without slowing the line"
                      gradientWordCount={2}
                      gradientPosition="start"
                      animationSpeed="normal"
                    />
                  </h2>
                  <p className="landing-body landing-body-1-regular mt-4 max-w-[38rem] text-[var(--color-text-muted-on-dark)]">
                    This demo shows Yapsolutely handling a drive-thru conversation in real time—greeting the customer, capturing the order, confirming modifiers, and keeping the handoff clean for staff.
                  </p>
                </motion.div>

                <motion.div
                  variants={sectionReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.1 }}
                  className="relative mt-10 flex w-full max-w-4xl justify-center bg-transparent sm:mt-12"
                >
                  <div className="absolute inset-0 z-[-1] bg-[var(--color-accent-primary)] opacity-[0.08] blur-[120px] rounded-full transform scale-75" />
                  <DeferredSection
                    rootMargin="220px 0px"
                    className="w-full"
                    placeholder={<SectionSkeleton className="aspect-[1213/667] w-full rounded-[28px] sm:rounded-[32px]" />}
                  >
                    <LazyVideoMasking className="w-full h-auto" />
                  </DeferredSection>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Bento Use Cases */}
          <section className="landing-section relative bg-black py-12 sm:py-16">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            </div>
            <div className="landing-container">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <div className="landing-pill mx-auto inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-secondary)] border border-[var(--color-accent-secondary)] bg-transparent">
                  More Use Cases
                </div>
                <h2 className="landing-display landing-display-1 mx-auto mt-6 max-w-2xl text-[var(--color-text-on-dark)]">
                  <AnimatedGradientText
                    text="Get more done with the same team"
                    gradientWordCount={2}
                    gradientPosition="end"
                    animationSpeed="normal"
                  />
                </h2>
                <p className="landing-body landing-body-1-regular mx-auto mt-4 max-w-[38rem] text-[var(--color-text-muted-on-dark)]">
                  Move faster, miss less, and stay available when the rush hits.
                </p>
              </motion.div>

              <div className="mx-auto mt-8 max-w-[68rem] sm:mt-10">
                <BentoGridShowcase
                  integration={<UseCaseLibraryCard items={moreUseCaseBenefits} activeItem="More done per shift" />}
                  trackers={<UseCaseMessageCard eyebrow="Benefit-led" title="Less waiting. More completed orders." description="Customers get quick answers. Staff stay focused." />}
                  statistic={<UseCaseBulletCard index="01" copy="Shorter queues in busy moments" />}
                  focus={<UseCaseBulletCard index="02" copy="Fewer missed orders and callbacks" />}
                  productivity={<UseCaseBulletCard index="03" copy="More coverage without more headcount" />}
                  shortcuts={<UseCasePreviewCard label="Service stays smooth" footer="See the upside" preview={<MoreUseCasesImagePreview />} />}
                />
              </div>
            </div>
          </section>

          <DeferredSection
            rootMargin="320px 0px"
            placeholder={<SectionSkeleton className="h-[560px] rounded-[24px] sm:h-[760px] sm:rounded-[28px]" />}
          >
            <LazySeeItInActionScrollSection />
          </DeferredSection>

          <section id="features" className="landing-section relative overflow-hidden bg-black pt-4">
            <BGPattern variant="diagonal-stripes" size={48} fill="#ffffff" mask="fade-edges" className="opacity-[0.03]" />
            <div className="landing-container relative z-10">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex max-w-[46rem] flex-col items-center text-center"
              >
                <div className="landing-pill mx-auto inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-primary)]">
                  Platform
                </div>
                <h2 className="landing-display landing-display-1 mt-6 text-[var(--color-text-on-dark)]">
                  <AnimatedGradientText
                    text="Voice agents at scale"
                    gradientWordCount={2}
                    gradientPosition="start"
                    animationSpeed="normal"
                  />
                </h2>
                <p className="landing-body landing-body-1-regular mx-auto mt-4 max-w-[36rem] text-[var(--color-text-muted-on-dark)]">
                  Agents, numbers, calls. One workspace.
                </p>
              </motion.div>

              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 sm:mt-10"
              >
                <DeferredSection
                  rootMargin="180px 0px"
                  placeholder={<SectionSkeleton className="h-[220px] rounded-[24px] sm:h-[360px] sm:rounded-[28px]" />}
                >
                  <LazyImageAutoSlider />
                </DeferredSection>
              </motion.div>
            </div>
          </section>

          <DeferredSection
            rootMargin="260px 0px"
            placeholder={<SectionSkeleton className="h-[560px] rounded-[24px] sm:h-[660px] sm:rounded-[28px]" />}
          >
            <LazyAnimatedTestimonials />
          </DeferredSection>


          <section className="bg-black px-4 pb-10 sm:px-6 sm:pb-14">
            <div className="landing-container relative">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group relative overflow-hidden rounded-[22px] border border-[var(--color-dark-divider)] bg-[#0c0c0c] p-5 shadow-[0_28px_70px_-36px_rgba(20,20,20,0.6)] hover:border-[var(--color-accent-primary)]/40 hover:shadow-[0_40px_80px_-20px_rgba(255,123,48,0.2)] transition-all duration-700 sm:rounded-[34px] sm:p-10 lg:p-12"
              >
                {/* Glowing orb behind the CTA content */}
                <div className="absolute top-0 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent-primary)] opacity-0 group-hover:opacity-[0.08] blur-[120px] pointer-events-none rounded-full transition-opacity duration-1000" />
                {/* Noise overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-screen pointer-events-none"></div>
                <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
                  <div className="max-w-[35rem]">
                    <div className="inline-flex items-center rounded-full border border-[var(--color-dark-divider)] bg-[var(--color-badge-dark)] px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-text-muted-on-dark)]">
                      Go live faster
                    </div>
                    <h2 className="landing-display landing-display-1 mt-6 max-w-[14ch] text-[var(--color-text-on-dark)]">
                      <AnimatedGradientText
                        text="Stop missing the call that should have converted."
                        gradientWordCount={3}
                        gradientPosition="end"
                        colors={["#ee303a", "#ff631e", "#ff7b30", "#ffd101"]}
                        animationSpeed="normal"
                      />
                    </h2>
                    <p className="landing-body landing-body-1-regular mt-4 max-w-[34rem] text-[var(--color-text-muted-on-dark)]">
                      Build the agent, attach the number, review every call.
                    </p>
                    <div className="mt-5 flex max-w-[34rem] flex-wrap gap-2.5">
                      {ctaSignalPills.map((pill) => (
                        <span
                          key={pill}
                          className="landing-body rounded-full border border-[var(--color-dark-divider)] bg-[var(--color-overlay-soft)] px-3.5 py-2 text-[12px] font-medium text-[var(--color-text-on-dark)]"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/sign-up"
                        className="landing-button-primary landing-body landing-body-2-semibold relative overflow-hidden group/btn inline-flex items-center justify-center gap-2 px-8 py-4 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,123,48,0.4)]"
                      >
                        <span className="relative z-10 flex items-center gap-2">Get started free <ArrowLongRightIcon className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" /></span>
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full" />
                      </Link>
                      <Link
                        href="/docs"
                        className="landing-button-secondary-dark landing-body landing-body-2-semibold inline-flex items-center justify-center px-6 py-3.5"
                      >
                        Read the docs
                      </Link>
                    </div>
                    <div className="mt-6 grid max-w-[30rem] gap-3 sm:grid-cols-3">
                      {ctaProofStats.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-[18px] border border-[var(--color-dark-divider)] bg-white/[0.03] px-4 py-3"
                        >
                          <div className="landing-body text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted-on-dark)]">
                            {item.label}
                          </div>
                          <div className="landing-body mt-2 text-[13px] font-medium text-[var(--color-text-on-dark)]">
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="landing-body mt-4 text-[12px] text-[var(--color-text-muted-on-dark)]">
                      Real transcripts. Real proof. Full workflow.
                    </p>
                  </div>

                  <CtaImagePanel />
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="relative overflow-hidden bg-[#050505] py-16 sm:py-20">
          {/* Subtle noise and glow for the footer */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-screen pointer-events-none"></div>
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--color-accent-primary)] opacity-[0.02] blur-[100px] pointer-events-none rounded-full" />
          <div className="landing-container">
            <div className="rounded-[28px] border border-[var(--color-dark-divider)] bg-white/[0.02] p-6 shadow-[0_28px_72px_-48px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:rounded-[34px] sm:p-8 lg:p-10">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.8fr)] lg:gap-14">
                <div className="max-w-[24rem]">
                  <Link href="/" className="group inline-flex flex-col transition-opacity hover:opacity-100">
                    <span className="landing-display text-[2rem] leading-none tracking-[-0.04em] text-[var(--color-text-on-dark)]">
                      yapsolutely
                    </span>
                    <span className="landing-body mt-2 text-[12px] uppercase tracking-[0.18em] text-[var(--color-text-muted-on-dark)]">
                      AI voice operations
                    </span>
                  </Link>

                  <p className="relative z-10 landing-body landing-body-2-regular mt-5 max-w-[22rem] text-[var(--color-text-muted-on-dark)]">
                    AI phone agents for inbound calls, routing, and post-call review.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {footerActionLinks.map((link) => {
                      const Icon = link.icon;
                      const commonClassName = "landing-body group/link inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[#0A0A0A] px-3.5 py-2 text-[12px] font-medium text-[var(--color-text-muted-on-dark)] transition-all duration-300 hover:-translate-y-[2px] hover:border-[var(--color-accent-primary)]/50 hover:bg-[#111] hover:text-[var(--color-text-on-dark)] hover:shadow-[0_0_12px_rgba(255,123,48,0.15)]";

                      if (link.href.startsWith("mailto:")) {
                        return (
                          <a key={link.label} href={link.href} className={commonClassName}>
                            <Icon className="h-4 w-4 transition-colors duration-300 group-hover/link:text-[var(--color-accent-primary)]" />
                            {link.label}
                          </a>
                        );
                      }

                      return (
                        <Link key={link.label} href={link.href} className={commonClassName}>
                          <Icon className="h-4 w-4 transition-colors duration-300 group-hover/link:text-[var(--color-accent-primary)]" />
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {footerColumns.map((column) => (
                    <FooterColumn key={column.title} title={column.title} links={column.links} />
                  ))}
                </div>
              </div>

              <div className="relative z-10 landing-body mt-10 flex flex-col gap-3 border-t border-[var(--color-dark-divider)] pt-6 text-center text-[13px] text-[var(--color-text-muted-on-dark)] sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <span>© 2026 yapsolutely, Inc.</span>
              <span>Built for inbound call ops.</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

type HowItWorksAnimatedCharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  distance: number;
};

function HowItWorksAnimatedCharacter({
  char,
  index,
  centerIndex,
  scrollYProgress,
  distance,
}: HowItWorksAnimatedCharacterProps) {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * distance, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [Math.abs(distanceFromCenter) * 16, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 18, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.5], [0, 0.55, 1]);

  return (
    <motion.span
      className={cn("inline-block will-change-transform", isSpace && "w-[0.3em]")}
      style={{ x, y, rotateX, opacity }}
    >
      {isSpace ? "\u00A0" : char}
    </motion.span>
  );
}

function HowItWorksAnimatedText({
  text,
  distance = 22,
}: {
  text: string;
  distance?: number;
}) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.92", "center 0.55"],
  });

  const characters = Array.from(text);
  const centerIndex = Math.floor(characters.length / 2);
  let currentCharacterIndex = 0;

  return (
    <span ref={containerRef} className="inline whitespace-normal [perspective:700px]">
      {text.split(" ").map((word, wordIndex, words) => {
        const wordCharacters = Array.from(word);
        const wordNode = (
          <span key={`word-${wordIndex}-${word}`} className="inline-block whitespace-nowrap">
            {wordCharacters.map((char) => {
              const characterIndex = currentCharacterIndex;
              currentCharacterIndex += 1;

              return (
                <HowItWorksAnimatedCharacter
                  key={`char-${wordIndex}-${characterIndex}-${char}`}
                  char={char}
                  index={characterIndex}
                  centerIndex={centerIndex}
                  scrollYProgress={scrollYProgress}
                  distance={distance}
                />
              );
            })}
          </span>
        );

        if (wordIndex === words.length - 1) {
          return wordNode;
        }

        const spaceIndex = currentCharacterIndex;
        currentCharacterIndex += 1;

        return (
          <Fragment key={`fragment-${wordIndex}-${word}`}>
            {wordNode}
            <HowItWorksAnimatedCharacter
              char=" "
              index={spaceIndex}
              centerIndex={centerIndex}
              scrollYProgress={scrollYProgress}
              distance={distance}
            />
          </Fragment>
        );
      })}
    </span>
  );
}

function HeroWordReveal() {
  const words = ["AI", "agents", "that", "answer", "your", "phone"];

  return (
    <h1 className="landing-display landing-hero-h1 mt-6 text-[var(--color-text-on-dark)]">
      {words.map((word, index) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mr-[0.22em] inline-block",
            word === "phone" && "text-[var(--color-accent-hover)]",
          )}
        >
          {word}
        </motion.span>
      ))}
    </h1>
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
          className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3"
        >
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-accent-primary)]">
            {title}
          </div>
          <div className="landing-body mt-1 text-[13px] text-[var(--color-text-primary)]">{copy}</div>
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
          className="flex items-center justify-between rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3"
        >
          <div>
            <div className="landing-body text-[13px] font-medium text-[var(--color-text-primary)]">{number}</div>
            <div className="landing-body mt-1 text-[11px] text-[var(--color-text-muted)]">{agent}</div>
          </div>
          <CheckCircleIcon className="h-5 w-5 text-[var(--color-accent-primary)]" />
        </div>
      ))}
    </div>
  );
}

function TranscriptReviewPreview() {
  return (
    <div className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
      <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
        Outcome timeline
      </div>
      <div className="mt-4 space-y-3">
        <TranscriptBubble speaker="Agent" copy="I can help with that. Are you looking for a quote or a demo first?" />
        <TranscriptBubble speaker="Caller" copy="A demo. We have five locations now and two more coming soon." caller />
      </div>
    </div>
  );
}

function IntegrationFlowPreview() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-[repeat(4,minmax(0,1fr))]">
        {[
          ["01", "Call enters", "Twilio receives the call"],
          ["02", "Speech loop", "Deepgram transcribes and speaks"],
          ["03", "Reasoning", "Anthropic drives replies"],
          ["04", "Proof lands", "Prisma persists the trail"],
        ].map(([step, title, copy]) => (
          <div key={step} className="rounded-[18px] border border-[var(--color-dark-divider)] bg-[var(--color-overlay-soft)] px-4 py-4">
            <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-accent-secondary)]">
              {step}
            </div>
            <div className="landing-display mt-3 text-[1.35rem] leading-[0.95] tracking-[-0.04em] text-[var(--color-text-on-dark)]">
              {title}
            </div>
            <p className="landing-body mt-3 text-[12px] leading-6 text-[var(--color-text-muted-on-dark)]">
              {copy}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["<800ms", "Average response time"],
          ["Logged", "Transcript + events"],
          ["Reviewable", "Operator proof loop"],
        ].map(([value, label]) => (
          <div key={label} className="min-w-0 overflow-hidden rounded-[18px] border border-[var(--color-dark-divider)] bg-[var(--color-overlay-soft)] px-4 py-3 text-center">
            <div className="landing-stat-sm leading-none tracking-[-0.05em] text-[var(--color-text-on-dark)]">
              {value}
            </div>
            <div className="landing-body mt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted-on-dark)]">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UseCaseLibraryCard({ items, activeItem }: { items: string[]; activeItem: string }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-[24px] border border-[var(--color-dark-divider)] bg-[var(--color-dark-primary)] p-5 shadow-[0_28px_72px_-44px_rgba(0,0,0,0.8)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-[var(--color-accent-primary)]/0 to-[var(--color-accent-primary)]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="landing-body text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted-on-dark)]">
          Benefits stack
        </div>
        <h3 className="landing-display mt-3 text-[1.65rem] leading-[0.95] text-[var(--color-text-on-dark)] sm:text-[2rem]">
          {activeItem}
        </h3>
        <div className="mt-4 space-y-2.5">
          {items.map((item) => {
            const active = item === activeItem;

            return (
              <div
                key={item}
                className={cn(
                  "rounded-[16px] border px-3.5 py-2.5 transition-colors",
                  active
                    ? "border-[var(--color-accent-primary)]/50 bg-[rgba(255,99,30,0.12)]"
                    : "border-[var(--color-dark-divider)] bg-white/[0.03]",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "landing-body text-[13px] font-medium",
                      active ? "text-[var(--color-text-on-dark)]" : "text-[var(--color-text-muted-on-dark)]",
                    )}
                  >
                    {item}
                  </span>
                  {active ? <CheckIcon className="h-4 w-4 text-[var(--color-accent-primary)]" /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MoreUseCasesImagePreview() {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="relative h-36 w-full sm:h-44">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
            alt="Busy restaurant service interior"
            fill
            sizes="(max-width: 640px) 100vw, 420px"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="landing-body text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Busy shift, calmer service
          </div>
          <p className="landing-body mt-2 text-[13px] leading-6 text-[var(--color-text-primary)]">
            Keep orders moving, keep staff focused, and stay consistent through the rush.
          </p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {[
          "Faster lines",
          "Fewer misses",
          "More covered hours",
        ].map((item) => (
          <div
            key={item}
            className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-3 text-center"
          >
            <div className="landing-body text-[11px] font-medium text-[var(--color-text-primary)]">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UseCaseMessageCard({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-[24px] border border-[var(--color-dark-divider)] bg-[var(--color-dark-primary)] p-5 shadow-[0_28px_72px_-44px_rgba(0,0,0,0.8)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-[var(--color-accent-primary)]/0 to-[var(--color-accent-primary)]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="landing-body text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent-primary)]">
          {eyebrow}
        </div>
        <h3 className="landing-display mt-3 text-[1.65rem] leading-[0.95] text-[var(--color-text-on-dark)] sm:text-[1.95rem]">
          {title}
        </h3>
        <p className="landing-body mt-3 text-[14px] leading-6 text-[var(--color-text-muted-on-dark)]">
          {description}
        </p>
      </div>
    </div>
  );
}

function UseCaseBulletCard({ index, copy }: { index: string; copy: string }) {
  return (
    <div className="group relative flex h-full overflow-hidden rounded-[24px] border border-[var(--color-dark-divider)] bg-[var(--color-dark-primary)] p-5 shadow-[0_28px_72px_-44px_rgba(0,0,0,0.8)]">
      <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-[var(--color-accent-primary)]/0 to-[var(--color-accent-primary)]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 flex flex-col justify-between gap-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-[var(--color-dark-divider)] bg-white/[0.03] text-[var(--color-accent-primary)]">
          <span className="landing-body text-[12px] font-medium uppercase tracking-[0.16em]">{index}</span>
        </div>
        <p className="landing-body text-[14px] leading-6 text-[var(--color-text-on-dark)]">
          {copy}
        </p>
      </div>
    </div>
  );
}

function UseCasePreviewCard({
  label,
  footer,
  preview,
}: {
  label: string;
  footer: string;
  preview: ReactNode;
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-[24px] border border-[var(--color-dark-divider)] bg-[var(--color-dark-primary)] p-5 shadow-[0_28px_72px_-44px_rgba(0,0,0,0.8)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-[var(--color-accent-primary)]/0 to-[var(--color-accent-primary)]/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted-on-dark)]">
          {footer}
        </div>

        <div className="mt-4 rounded-[24px] border border-[var(--color-dark-divider)] bg-white/[0.03] p-3.5 sm:p-4">
          <div className="mb-3 flex items-center justify-between gap-3 border-b border-[var(--color-dark-divider)] pb-2.5">
            <div>
              <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted-on-dark)]">
                Live example
              </div>
              <div className="landing-body mt-1 text-[13px] font-medium text-[var(--color-text-on-dark)]">
                {label}
              </div>
            </div>

            <span className="landing-body rounded-full border border-[var(--color-dark-divider)] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-[var(--color-accent-primary)]">
              Mini preview
            </span>
          </div>

          {preview}
        </div>
      </div>
    </div>
  );
}

function InboundSalesCompactPreview() {
  return (
    <div className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg)] p-3.5 shadow-[0_18px_34px_-28px_rgba(20,20,20,0.12)] sm:p-4">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] pb-2.5">
        <div>
          <div className="landing-body text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Live inbound call
          </div>
          <div className="landing-body mt-1 text-[12px] font-medium text-[var(--color-text-primary)]">Qualified lead</div>
        </div>
        <span className="landing-body rounded-full bg-[var(--color-overlay-accent-medium)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-accent-primary)]">
          Lead score 91
        </span>
      </div>

      <div className="mt-3 space-y-3">
        <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-3">
          <div className="landing-body text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Caller intent
          </div>
          <div className="landing-body mt-2 text-[13px] leading-6 text-[var(--color-text-primary)]">
            &ldquo;We need a demo for five locations and want pricing this week.&rdquo;
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          {[
            ["Team", "5 sites"],
            ["Urgency", "This week"],
            ["Booked", "Tomorrow"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[14px] bg-[var(--color-bg-secondary)] px-3 py-3 text-center">
              <div className="landing-body text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">{label}</div>
              <div className="landing-body mt-1.5 text-[12px] font-medium text-[var(--color-text-primary)]">{value}</div>
            </div>
          ))}
        </div>
      </div>
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
          ? "border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
          : caller
            ? "border-[var(--color-border)] bg-[var(--color-bg)]"
            : "border-[rgba(238,48,58,0.18)] bg-[var(--color-bg-card-highlight)]"
      }`}
    >
      <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
        {speaker}
      </div>
      <div className="landing-body mt-2 text-[14px] leading-6 text-[var(--color-text-primary)]">{copy}</div>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="landing-body text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted-on-dark)]">
        {title}
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {links.map(([label, href]) => {
          const className =
            "landing-body cursor-pointer text-[14px] font-medium text-[var(--color-text-on-dark)] transition-all duration-200 hover:scale-[1.02] hover:text-[var(--color-accent-primary)]";

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
    <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg)] p-4 shadow-[0_18px_34px_-28px_rgba(20,20,20,0.12)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] pb-3">
        <div>
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Live inbound call
          </div>
          <div className="landing-body mt-1 text-[13px] font-medium text-[var(--color-text-primary)]">Qualified lead</div>
        </div>
        <span className="landing-body rounded-full bg-[var(--color-overlay-accent-medium)] px-3 py-1 text-[11px] font-medium text-[var(--color-accent-primary)]">
          Lead score 91
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3">
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Caller intent
          </div>
          <div className="landing-body mt-2 text-[14px] text-[var(--color-text-primary)]">
            &ldquo;We need a demo for five locations and want pricing this week.&rdquo;
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Team", "5 sites"],
            ["Urgency", "This week"],
            ["Booked", "Tomorrow"],
          ].map(([label, value]) => (
            <div key={label} className="min-w-0 overflow-hidden rounded-[16px] bg-[var(--color-bg-secondary)] px-3 py-3 text-center">
              <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">{label}</div>
              <div className="landing-stat-sm mt-2 leading-none tracking-[-0.04em] text-[var(--color-text-primary)]">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppointmentBookingPreview() {
  return (
    <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg)] p-4 shadow-[0_18px_34px_-28px_rgba(20,20,20,0.12)]">
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] pb-3">
        <CalendarDaysIcon className="h-5 w-5 text-[var(--color-accent-primary)]" />
        <div>
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Booking flow
          </div>
          <div className="landing-body mt-1 text-[13px] font-medium text-[var(--color-text-primary)]">Available slots</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          ["Tue", "10:30 AM"],
          ["Tue", "2:00 PM"],
          ["Wed", "9:00 AM"],
          ["Wed", "1:30 PM"],
        ].map(([day, slot]) => (
          <div key={`${day}-${slot}`} className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3">
            <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">{day}</div>
            <div className="landing-body mt-2 text-[14px] font-medium text-[var(--color-text-primary)]">{slot}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[18px] border border-[rgba(238,48,58,0.18)] bg-[var(--color-bg-card-highlight)] px-4 py-3">
        <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent-primary)]">Confirmation</div>
        <div className="landing-body mt-2 text-[14px] text-[var(--color-text-primary)]">SMS confirmation queued after booking is complete.</div>
      </div>
    </div>
  );
}

function CustomerSupportPreview() {
  return (
    <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg)] p-4 shadow-[0_18px_34px_-28px_rgba(20,20,20,0.12)]">
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] pb-3">
        <ChatBubbleBottomCenterTextIcon className="h-5 w-5 text-[var(--color-accent-primary)]" />
        <div>
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Support transcript
          </div>
          <div className="landing-body mt-1 text-[13px] font-medium text-[var(--color-text-primary)]">Tier-one resolution</div>
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
    <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg)] p-4 shadow-[0_18px_34px_-28px_rgba(20,20,20,0.12)]">
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] pb-3">
        <UserPlusIcon className="h-5 w-5 text-[var(--color-accent-primary)]" />
        <div>
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            Qualification form
          </div>
          <div className="landing-body mt-1 text-[13px] font-medium text-[var(--color-text-primary)]">Hot lead routing</div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {[
          ["Use case", "Inbound support and sales"],
          ["Volume", "120 calls / day"],
          ["Urgency", "Needs launch in 2 weeks"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between rounded-[16px] bg-[var(--color-bg-secondary)] px-4 py-3">
            <span className="landing-body text-[13px] text-[var(--color-text-muted)]">{label}</span>
            <span className="landing-body text-[13px] font-medium text-[var(--color-text-primary)]">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-[18px] border border-[rgba(238,48,58,0.18)] bg-[var(--color-bg-card-highlight)] px-4 py-3">
        <span className="landing-body text-[13px] text-[var(--color-text-primary)]">Lead priority</span>
        <span className="landing-stat-lg leading-none tracking-[-0.04em] text-[var(--color-accent-primary)]">94</span>
      </div>
    </div>
  );
}

function AfterHoursCoveragePreview() {
  return (
    <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg)] p-4 shadow-[0_18px_34px_-28px_rgba(20,20,20,0.12)]">
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] pb-3">
        <QueueListIcon className="h-5 w-5 text-[var(--color-accent-primary)]" />
        <div>
          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            After-hours queue
          </div>
          <div className="landing-body mt-1 text-[13px] font-medium text-[var(--color-text-primary)]">Morning follow-ups</div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {[
          ["11:42 PM", "New installation request", "Follow-up 8 AM"],
          ["12:08 AM", "Missed billing question", "Route to finance"],
          ["1:16 AM", "Urgent support callback", "Priority"],
        ].map(([time, label, badge]) => (
          <div key={`${time}-${label}`} className="flex items-center justify-between gap-4 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3">
            <div>
              <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">{time}</div>
              <div className="landing-body mt-1 text-[13px] font-medium text-[var(--color-text-primary)]">{label}</div>
            </div>
            <span className="landing-body rounded-full bg-[var(--color-bg)] px-3 py-1 text-[11px] font-medium text-[var(--color-accent-primary)]">
              {badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CtaImagePanel() {
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <div className="pointer-events-none absolute inset-6 rounded-[32px] bg-[var(--color-accent-primary)] opacity-[0.12] blur-3xl" />
      <div className="relative overflow-hidden rounded-[30px] border border-[var(--color-dark-divider)] bg-[var(--color-overlay-soft)] shadow-[0_24px_50px_-32px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        <div className="relative aspect-[0.92] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
            alt="Professional operator handling customer conversations from a modern workspace"
            fill
            sizes="(min-width: 1024px) 340px, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/38 to-black/8" />
          <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/10 bg-black/45 px-3 py-1.5 backdrop-blur-md">
            <span className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-white/80">
              Inbound calls covered
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <div className="rounded-[22px] border border-white/10 bg-black/50 p-4 backdrop-blur-md">
              <div className="landing-body text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-accent-primary)]">
                Online-sourced proof panel
              </div>
              <p className="landing-body mt-2 text-[14px] leading-6 text-[var(--color-text-on-dark)]">
                Give every caller a fast first response, even when your team is slammed.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-[var(--color-dark-divider)] bg-black/40 p-4">
          {ctaProofStats.map((item) => (
            <div key={item.label} className="rounded-[16px] border border-white/8 bg-white/[0.03] px-3 py-3 text-center">
              <div className="landing-body text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted-on-dark)]">
                {item.label}
              </div>
              <div className="landing-body mt-1.5 text-[12px] font-medium text-[var(--color-text-on-dark)]">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type DeferredSectionProps = {
  children: ReactNode;
  placeholder: ReactNode;
  rootMargin?: string;
  className?: string;
};

function DeferredSection({
  children,
  placeholder,
  rootMargin = "240px 0px",
  className,
}: DeferredSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      return;
    }

    const element = containerRef.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, shouldRender]);

  const deferredStyle = !shouldRender
    ? ({ contentVisibility: "auto" } as CSSProperties)
    : undefined;

  return (
    <div ref={containerRef} className={className} style={deferredStyle}>
      {shouldRender ? children : placeholder}
    </div>
  );
}

function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "w-full animate-pulse rounded-[28px] border border-white/6 bg-white/[0.03] shadow-[0_24px_60px_-40px_rgba(0,0,0,0.55)]",
        className,
      )}
    />
  );
}

function LandingBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute left-[-10%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-[var(--color-overlay-accent-soft)] blur-3xl" />
      <div className="absolute bottom-[2%] right-[-8%] h-[26rem] w-[26rem] rounded-full bg-[var(--color-overlay-dark)] blur-3xl" />
    </div>
  );
}
