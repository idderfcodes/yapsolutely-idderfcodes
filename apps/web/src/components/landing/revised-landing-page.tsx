"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause, Volume2, Volume1, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ArrowTopRightOnSquareIcon,
  ArrowLongRightIcon,
  BoltIcon,
  CalendarDaysIcon,
  ChartBarSquareIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckCircleIcon,
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
import { landingDisplayFont } from "./landing-font";
import { ZoomParallaxSection } from "./zoom-parallax-section";
import BrandCarousel from "./BrandCarousel";
import ScrollFAQ from "./ScrollFAQ";
import AnimatedGradientText from "./AnimatedGradientText";
import { cn } from "@/lib/utils";

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
    label: "Average voice response time",
  },
  {
    value: "24/7",
    label: "Your agent never sleeps",
  },
  {
    value: "100%",
    label: "Every word transcribed",
  },
];

const positioningColumns = [
  {
    eyebrow: "Old Way",
    title: "IVR",
    description:
      "Rigid phone trees keep callers trapped in button menus, disconnected handoffs, and low-context follow-up.",
    points: [
      "Press-based routing instead of natural conversation",
      "Little visibility into what happened after the call",
      "Disconnected telecom, notes, and follow-up tools",
    ],
    footer: "Feels robotic the moment call volume rises.",
    highlighted: false,
  },
  {
    eyebrow: "Almost There",
    title: "AI Assistants (IVA)",
    description:
      "Smarter conversations help, but the operator workflow is often still fragmented across vendors and tabs.",
    points: [
      "Better voice UX, weaker deployment and review loop",
      "Prompts, routing, and outcomes live in separate places",
      "Teams still stitch together proof by hand",
    ],
    footer: "Smarter calls, but not a full operating system.",
    highlighted: false,
  },
  {
    eyebrow: "Why Yapsolutely",
    title: "Yapsolutely",
    description:
      "Purpose-built for inbound AI phone operations — from build, to number assignment, to transcript-backed review.",
    points: [
      "Natural voice agents with real number routing built in",
      "Transcript, actions, and outcomes captured in one workspace",
      "Designed for teams that need proof, not just novelty",
    ],
    footer: "Build → Deploy → Monitor in one operator loop.",
    highlighted: true,
  },
];

const howItWorks = [
  {
    number: "01",
    eyebrow: "Build",
    title: "Define Your Agent",
    description:
      "Set the voice, opening line, qualification logic, and routing rules before a single live caller hits the line.",
    icon: SparklesIcon,
    signal: "Voice + prompt + routing",
    preview: <PromptFlowPreview />,
  },
  {
    number: "02",
    eyebrow: "Deploy",
    title: "Assign a Number and Go Live",
    description:
      "Connect a real phone number, publish the agent, and route inbound calls without rebuilding telecom infrastructure.",
    icon: PhoneIcon,
    signal: "Routing ready for live traffic",
    preview: <NumberAssignmentPreview />,
  },
  {
    number: "03",
    eyebrow: "Monitor",
    title: "Review Every Call",
    description:
      "Open transcripts, captured actions, and outcomes after every conversation so operators can tune what happens next.",
    icon: ShieldCheckIcon,
    signal: "Transcript + audit trail",
    preview: <TranscriptReviewPreview />,
  },
];

const featureTiles = [
  {
    title: "Sub-second Responses",
    description:
      "Streaming STT, LLM, and TTS keep the voice loop fast enough that callers stay in the conversation instead of waiting through dead air.",
    icon: BoltIcon,
    type: "wide",
    content: <LatencyPreview />,
  },
  {
    title: "Full Audit Trail",
    description:
      "Every word is transcribed, every event is logged, and every follow-up stays visible after the call ends.",
    icon: ShieldCheckIcon,
    type: "wide",
    content: <AuditTrailPreview />,
  },
  {
    title: "Custom Agents",
    description:
      "Tune prompt logic, voice settings, and first-message behavior for every use case.",
    icon: SparklesIcon,
    type: "small",
    content: <AgentBuilderMini />,
  },
  {
    title: "Real Phone Numbers",
    description:
      "Assign US and international numbers through Twilio-backed routing that maps directly to agents.",
    icon: PhoneIcon,
    type: "small",
    content: <PhoneNumbersMini />,
  },
  {
    title: "After-hours Coverage",
    description:
      "Keep answering after close, capture context, and queue the right follow-ups for the next shift.",
    icon: QueueListIcon,
    type: "small",
    content: <AfterHoursMini />,
  },
  {
    title: "Analytics Dashboard",
    description:
      "Track outcomes, performance, and queue health in one operator view built for real call operations.",
    icon: ChartBarSquareIcon,
    type: "small",
    content: <AnalyticsMini />,
  },
];

const useCases = [
  {
    id: "sales",
    label: "Inbound Sales",
    eyebrow: "Sales workflow",
    title: "Qualify leads, answer pricing, and book demos on the first call",
    description:
      "Use Yapsolutely to handle high-intent inbound calls, score opportunities, and route hot leads while the buying signal is still alive.",
    bullets: [
      "Capture team size, urgency, and budget in one flow",
      "Answer common pricing questions before a human joins",
      "Book demos automatically when interest is high",
    ],
    footer: "Lead score, booking outcome, and next-step proof stay attached to the call.",
    preview: <InboundSalesPreview />,
  },
  {
    id: "booking",
    label: "Appointment Booking",
    eyebrow: "Scheduling workflow",
    title: "Confirm availability and lock appointment slots without back-and-forth",
    description:
      "Let the voice agent confirm availability, collect contact details, and send the next-step confirmation while the caller is still on the line.",
    bullets: [
      "Surface open slots in a structured booking flow",
      "Capture name, date, and contact number in one pass",
      "Send a confirmation text after the call ends",
    ],
    footer: "Availability, selection, and confirmation happen in one contained flow.",
    preview: <AppointmentBookingPreview />,
  },
  {
    id: "support",
    label: "Customer Support",
    eyebrow: "Support workflow",
    title: "Handle tier-one questions before escalating complex support calls",
    description:
      "Resolve repetitive inbound support issues, keep the conversation on-script, and escalate only when the caller actually needs a person.",
    bullets: [
      "Answer FAQs using your approved workflow",
      "Track unresolved issues and escalation moments clearly",
      "Keep a transcript for every support interaction",
    ],
    footer: "Support teams get a cleaner escalation path instead of another black-box bot.",
    preview: <CustomerSupportPreview />,
  },
  {
    id: "qualification",
    label: "Lead Qualification",
    eyebrow: "Qualification workflow",
    title: "Screen intent, capture details, and route the strongest leads fast",
    description:
      "Guide inbound callers through a qualification sequence, assign a clear lead score, and trigger the right follow-up while context is fresh.",
    bullets: [
      "Collect qualification answers in a structured flow",
      "Score the lead based on fit and urgency",
      "Push high-intent outcomes straight into the next step",
    ],
    footer: "Qualification becomes structured data, not just a vague call summary.",
    preview: <LeadQualificationPreview />,
  },
  {
    id: "after-hours",
    label: "After-hours Coverage",
    eyebrow: "Coverage workflow",
    title: "Capture overnight demand instead of sending every caller to voicemail",
    description:
      "Keep your lines open after close, collect the details that matter, and queue organized follow-ups for the next working block.",
    bullets: [
      "Catch calls after business hours with the same brand voice",
      "Log follow-up tasks for morning triage",
      "Stop losing demand to voicemail and missed opportunities",
    ],
    footer: "The queue is already organized by the time your team logs in.",
    preview: <AfterHoursCoveragePreview />,
  },
];

const proofCards = [
  {
    eyebrow: "After-hours follow-up",
    title: "What happened overnight is already organized by morning.",
    description:
      "The point is not a nice-sounding bot. The point is waking up to captured demand, routed urgency, and clean follow-up context instead of voicemail roulette.",
    preview: <ProofQueuePreview />,
  },
  {
    eyebrow: "Booking confirmation",
    title: "Availability, booking, and confirmation stay in one visible flow.",
    description:
      "Operators can see what slot was offered, what the caller chose, and what follow-up was sent — all without digging through disconnected systems.",
    preview: <ProofBookingPreview />,
  },
  {
    eyebrow: "Call review",
    title: "Every important moment stays reviewable after the call ends.",
    description:
      "Transcripts, actions, and outcomes give teams something concrete to audit, improve, and trust before they scale usage.",
    preview: <ProofAuditPreview />,
  },
];

const complianceFrameworks = [
  {
    title: "GDPR",
    subtitle: "Privacy rights and data handling",
    points: [
      "Access, deletion, and export support",
      "DPA availability on request",
    ],
  },
  {
    title: "CCPA / CPRA",
    subtitle: "Consumer privacy controls",
    points: [
      "Disclosure and deletion rights supported",
      "No sale of personal information",
    ],
  },
  {
    title: "TCPA",
    subtitle: "Call-flow compliance posture",
    points: [
      "AI disclosure workflow guidance",
      "Consent-based call handling support",
    ],
  },
];

const securityPractices = [
  "Encrypted in transit and at rest",
  "Role-based access and session-based authentication",
  "Full call logs, transcript history, and system events",
  "Dedicated compliance documentation at /compliance",
];

const integrationStacks = [
  {
    eyebrow: "Telephony layer",
    title: "Twilio",
    description:
      "Number provisioning, inbound webhooks, and live audio handoff all start at the phone layer operators already expect.",
    icon: PhoneIcon,
    points: [
      "Real phone numbers mapped to agents in the workspace",
      "Inbound call stream routing into the live runtime",
    ],
    badge: "Phone + routing",
  },
  {
    eyebrow: "Speech layer",
    title: "Deepgram",
    description:
      "Streaming speech-to-text and text-to-speech keep the call responsive enough to feel like an actual conversation, not a queued bot.",
    icon: BoltIcon,
    points: [
      "Real-time transcription and playback in one loop",
      "Barge-in aware voice handling during live calls",
    ],
    badge: "STT + TTS",
  },
  {
    eyebrow: "Reasoning layer",
    title: "Anthropic",
    description:
      "Claude powers the response loop, tool execution decisions, and the prompt behavior generated from your flow builder.",
    icon: CpuChipIcon,
    points: [
      "Prompt-guided live replies with tool orchestration",
      "Flow-generated instructions feed the same runtime",
    ],
    badge: "LLM + tools",
  },
  {
    eyebrow: "Product layer",
    title: "Next.js + Prisma",
    description:
      "Calls, transcripts, actions, and reviewable metadata land back in the dashboard so teams can audit the full lifecycle after every conversation.",
    icon: CircleStackIcon,
    points: [
      "Persisted call records and timeline events",
      "Transcript-backed operator review inside the workspace",
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
  const [activeUseCase, setActiveUseCase] = useState(useCases[0]?.id ?? "");
  const selectedUseCase = useCases.find((useCase) => useCase.id === activeUseCase) ?? useCases[0];

  return (
    <div
      className={`${landingDisplayFont.variable} landing-shell relative min-h-screen w-full overflow-x-hidden bg-[var(--color-bg)] text-[var(--color-text-primary)]`}
    >
      <LandingBackdrop />

      <div className="relative z-10">
        <Header />

        <main>
          <section className="pt-0">
            <div className="flex min-h-[calc(100svh-4rem)] w-full flex-col bg-[#141414]">
              {/* Hero copy — centered */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={staggerContainer}
                className="flex flex-col items-center px-6 pt-20 text-center sm:px-10 md:pt-24 lg:pt-32"
              >
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
                  className="landing-body landing-body-1-regular mt-6 max-w-[38rem] text-[var(--color-text-muted-on-dark)]"
                >
                  Build voice agents, assign real phone numbers, handle inbound calls. One workspace.
                </motion.p>

                <motion.div
                  variants={cardReveal}
                  transition={{ duration: 0.48, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex flex-col gap-3 sm:flex-row"
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
                  className="landing-body mt-4 text-[12px] text-[var(--color-text-muted)]"
                >
                  No credit card required. Free plan available.
                </motion.p>
              </motion.div>

              {/* Hero video — full width below copy */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto mt-10 w-full max-w-[960px] px-6 pb-12 sm:mt-12 sm:px-10 md:mt-14 lg:mt-16"
              >
                <HeroVideoPanel />
              </motion.div>
            </div>
          </section>

          <section className="pb-10 sm:pb-14">
            <BrandCarousel />
          </section>

          <section className="landing-section pt-2 sm:pt-4">
            <div className="landing-container">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[46rem]"
              >
                <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-primary)]">
                  Why Yapsolutely
                </div>
                <h2 className="landing-display landing-display-1 mt-6 text-[var(--color-text-primary)]">
                  Built different. On purpose.
                </h2>
                <p className="landing-body landing-body-1-regular mt-4 max-w-[38rem] text-[var(--color-text-muted)]">
                  Most phone systems optimize for routing. Some AI tools optimize for conversation. Yapsolutely is built for the full inbound operator loop — the call, the context, and the proof after it ends.
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                className="mt-10 grid gap-5 lg:grid-cols-3"
              >
                {positioningColumns.map((column) => (
                  <motion.div key={column.title} variants={cardReveal}>
                    <div
                      className={cn(
                        "h-full overflow-hidden rounded-[30px] border p-6 shadow-[0_24px_44px_-34px_rgba(20,20,20,0.14)] sm:p-7",
                        column.highlighted
                          ? "border-[var(--color-dark-divider)] bg-[linear-gradient(155deg,var(--color-dark-section),var(--color-hero-right))] shadow-[0_32px_72px_-44px_rgba(20,20,20,0.48)]"
                          : "border-[var(--color-border)] bg-[var(--color-bg)]",
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={cn(
                            "landing-body rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em]",
                            column.highlighted
                              ? "border border-[var(--color-dark-divider)] bg-[var(--color-badge-dark)] text-[var(--color-text-muted-on-dark)]"
                              : "bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]",
                          )}
                        >
                          {column.eyebrow}
                        </span>

                        {column.highlighted ? (
                          <span className="landing-body rounded-full border border-[var(--color-overlay-accent-border)] bg-[var(--color-overlay-accent-medium)] px-3 py-1 text-[11px] font-medium text-[var(--color-accent-secondary)]">
                            Recommended
                          </span>
                        ) : null}
                      </div>

                      <h3
                        className={cn(
                          "landing-display landing-display-2 mt-6",
                          column.highlighted ? "text-[var(--color-text-on-dark)]" : "text-[var(--color-text-primary)]",
                        )}
                      >
                        {column.title}
                      </h3>

                      <p
                        className={cn(
                          "landing-body landing-body-2-regular mt-4 min-h-[5.5rem]",
                          column.highlighted ? "text-[var(--color-text-muted-on-dark)]" : "text-[var(--color-text-muted)]",
                        )}
                      >
                        {column.description}
                      </p>

                      <div className="mt-6 space-y-3">
                        {column.points.map((point) => (
                          <div
                            key={point}
                            className={cn(
                              "rounded-[18px] border px-4 py-3",
                              column.highlighted
                                ? "border-[var(--color-dark-divider)] bg-[var(--color-overlay-soft)]"
                                : "border-[var(--color-border)] bg-[var(--color-bg-secondary)]",
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <CheckCircleIcon
                                className={cn(
                                  "mt-0.5 h-5 w-5 shrink-0",
                                  column.highlighted
                                    ? "text-[var(--color-accent-secondary)]"
                                    : "text-[var(--color-accent-primary)]",
                                )}
                              />
                              <p
                                className={cn(
                                  "landing-body text-[13px] leading-6",
                                  column.highlighted ? "text-[var(--color-text-on-dark)]" : "text-[var(--color-text-primary)]",
                                )}
                              >
                                {point}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div
                        className={cn(
                          "landing-body mt-6 border-t pt-4 text-[12px] font-medium uppercase tracking-[0.16em]",
                          column.highlighted
                            ? "border-[var(--color-dark-divider)] text-[var(--color-accent-secondary)]"
                            : "border-[var(--color-border)] text-[var(--color-text-muted)]",
                        )}
                      >
                        {column.footer}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="landing-section bg-[var(--color-bg)] pt-4">
            <div className="landing-container">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[48rem]"
              >
                <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-primary)]">
                  Use cases
                </div>
                <h2 className="landing-display landing-display-1 mt-6 text-[var(--color-text-primary)]">
                  Built for every inbound call scenario
                </h2>
                <p className="landing-body landing-body-1-regular mt-4 max-w-[38rem] text-[var(--color-text-muted)]">
                  From first-touch sales to after-hours coverage, Yapsolutely gives teams a structured way to answer, qualify, book, and route calls without voicemail gaps.
                </p>
              </motion.div>

              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.58, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-bg)] shadow-[0_24px_44px_-34px_rgba(20,20,20,0.14)]"
              >
                <div className="overflow-x-auto border-b border-[var(--color-border)] px-5 py-3 sm:px-6">
                  <div className="flex min-w-max gap-6 sm:gap-7">
                  {useCases.map((useCase) => {
                    const active = activeUseCase === useCase.id;

                    return (
                      <button
                        key={useCase.id}
                        type="button"
                        onClick={() => setActiveUseCase(useCase.id)}
                        className={`landing-body relative cursor-pointer pb-2 text-[14px] font-medium transition-all duration-200 hover:text-[var(--color-text-primary)] ${
                          active ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"
                        }`}
                      >
                        {useCase.label}
                        <span
                          className={`absolute inset-x-0 -bottom-[1px] h-[2px] rounded-full bg-[var(--color-accent-primary)] transition-opacity duration-200 ${
                            active ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </button>
                    );
                  })}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedUseCase.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="grid gap-6 px-5 py-6 sm:px-6 sm:py-7 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-center"
                  >
                    <div>
                      <div className="landing-pill inline-flex items-center px-3.5 py-1.5 landing-body text-[11px] font-medium text-[var(--color-accent-primary)]">
                        {selectedUseCase.eyebrow}
                      </div>

                      <h3 className="landing-display landing-display-2 mt-5 max-w-[14ch] text-[var(--color-text-primary)]">
                        {selectedUseCase.title}
                      </h3>
                      <p className="landing-body landing-body-1-regular mt-4 max-w-[32rem] text-[var(--color-text-muted)]">
                        {selectedUseCase.description}
                      </p>

                      <div className="mt-6 space-y-3">
                        {selectedUseCase.bullets.map((bullet) => (
                          <div key={bullet} className="flex items-start gap-3 rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3">
                            <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent-primary)]" />
                            <p className="landing-body landing-body-2-regular text-[var(--color-text-primary)]">{bullet}</p>
                          </div>
                        ))}
                      </div>

                      <div className="landing-body mt-6 border-t border-[var(--color-border)] pt-4 text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        {selectedUseCase.footer}
                      </div>
                    </div>

                    <div className="rounded-[26px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 sm:p-5">
                      <div className="mb-4 flex items-center justify-between gap-3 border-b border-[var(--color-border)] pb-3">
                        <div>
                          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                            Live example
                          </div>
                          <div className="landing-body mt-1 text-[13px] font-medium text-[var(--color-text-primary)]">
                            {selectedUseCase.label}
                          </div>
                        </div>

                        <span className="landing-body rounded-full bg-[var(--color-bg)] px-3 py-1 text-[11px] font-medium text-[var(--color-accent-primary)]">
                          Mini preview
                        </span>
                      </div>

                      {selectedUseCase.preview}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          <section id="how-it-works" className="landing-section bg-[var(--color-bg-secondary)] pt-8">
            <div className="landing-container">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[42rem]"
              >
                <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-primary)]">
                  How it works
                </div>
                <h2 className="landing-display landing-display-1 mt-6 text-[var(--color-text-primary)]">
                  Three steps to a working phone agent
                </h2>
                <p className="landing-body landing-body-1-regular mt-4 max-w-[32rem] text-[var(--color-text-muted)]">
                  Configure the agent, attach a number, and review transcripts and actions after every call.
                </p>
              </motion.div>

              <div className="relative mt-10">
                <div className="pointer-events-none absolute left-[10%] right-[10%] top-7 hidden h-px lg:block">
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-[var(--color-accent-primary)]/35 to-transparent" />
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.12 }}
                  className="grid gap-6 lg:grid-cols-3"
                >
                  {howItWorks.map((step) => {
                    const Icon = step.icon;

                    return (
                      <motion.div key={step.number} variants={cardReveal}>
                        <motion.div
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="landing-card landing-card-hover relative h-full rounded-[30px] border border-[var(--color-border)] bg-[var(--color-bg)] p-6 shadow-[0_24px_44px_-34px_rgba(20,20,20,0.14)] sm:p-7"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(217,95,59,0.18)] bg-[var(--color-overlay-accent-soft)] text-[var(--color-accent-primary)]">
                                <span className="landing-display text-[1.7rem] leading-none tracking-[-0.06em]">
                                  {step.number}
                                </span>
                              </div>

                              <div>
                                <div className="landing-body text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent-primary)]">
                                  {step.eyebrow}
                                </div>
                                <div className="landing-body mt-1 text-[12px] text-[var(--color-text-muted)]">
                                  {step.signal}
                                </div>
                              </div>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-bg-secondary)] text-[var(--color-accent-primary)]">
                              <Icon className="h-5 w-5" />
                            </div>
                          </div>

                          <h3 className="landing-display landing-display-3 mt-6 max-w-[12ch] text-[var(--color-text-primary)]">
                            {step.title}
                          </h3>
                          <p className="landing-body landing-body-2-regular mt-3 max-w-[30rem] text-[var(--color-text-muted)]">
                            {step.description}
                          </p>

                          <div className="mt-6 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                            {step.preview}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
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
                <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-primary)]">
                  Platform
                </div>
                <h2 className="landing-display landing-display-1 mt-6 text-[var(--color-text-primary)]">
                  Everything you need to deploy voice agents at scale
                </h2>
                <p className="landing-body landing-body-1-regular mt-4 max-w-[36rem] text-[var(--color-text-muted)]">
                  Build voice agents, assign real phone numbers, handle inbound calls. One workspace.
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
              >
                {featureTiles.map((tile) => {
                  const Icon = tile.icon;
                  const wide = tile.type === "wide";

                  return (
                    <motion.div
                      key={tile.title}
                      variants={cardReveal}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className={wide ? "md:col-span-2 lg:col-span-2" : "lg:col-span-1"}
                    >
                      <div className="landing-card landing-card-hover h-full rounded-[30px] border border-[var(--color-border)] bg-[var(--color-bg)] p-6 shadow-[0_24px_44px_-34px_rgba(20,20,20,0.14)] transition-colors duration-200 hover:border-[var(--color-accent-primary)]">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-overlay-accent-soft)] text-[var(--color-accent-primary)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="landing-display landing-display-3 mt-6 text-[var(--color-text-primary)]">
                          {tile.title}
                        </h3>
                        <p className="landing-body mt-3 max-w-[40rem] text-[14px] leading-6 text-[var(--color-text-muted)]">
                          {tile.description}
                        </p>
                        <div className="mt-6 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                          {tile.content}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          <section className="overflow-hidden bg-[var(--color-dark-section)] py-0">
            <ZoomParallaxSection />
          </section>

          <LandingStatsBar />

          <section className="landing-section pt-6 sm:pt-10">
            <div className="landing-container">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[46rem]"
              >
                <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-primary)]">
                  Proof
                </div>
                <h2 className="landing-display landing-display-1 mt-6 text-[var(--color-text-primary)]">
                  Don&apos;t just take our word for it.
                </h2>
                <p className="landing-body landing-body-1-regular mt-4 max-w-[38rem] text-[var(--color-text-muted)]">
                  Trust comes from what teams can verify: follow-up queues, booking outcomes, transcripts, and logged runtime actions that stay visible after every call.
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                className="mt-10 grid gap-5 lg:grid-cols-3"
              >
                {proofCards.map((card) => (
                  <motion.div key={card.title} variants={cardReveal}>
                    <div className="landing-card landing-card-hover h-full rounded-[30px] border border-[var(--color-border)] bg-[var(--color-bg)] p-6 shadow-[0_24px_44px_-34px_rgba(20,20,20,0.14)] sm:p-7">
                      <div className="landing-body text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-accent-primary)]">
                        {card.eyebrow}
                      </div>
                      <h3 className="landing-display landing-display-3 mt-4 max-w-[13ch] text-[var(--color-text-primary)]">
                        {card.title}
                      </h3>
                      <p className="landing-body landing-body-2-regular mt-4 text-[var(--color-text-muted)]">
                        {card.description}
                      </p>

                      <div className="mt-6 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
                        {card.preview}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="landing-section bg-[var(--color-bg-secondary)] pt-4">
            <div className="landing-container">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[48rem]"
              >
                <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-primary)]">
                  Security &amp; Compliance
                </div>
                <h2 className="landing-display landing-display-1 mt-6 text-[var(--color-text-primary)]">
                  Built to support privacy, auditability, and trust.
                </h2>
                <p className="landing-body landing-body-1-regular mt-4 max-w-[38rem] text-[var(--color-text-muted)]">
                  Yapsolutely is designed to give operators clear transcript history, auditable call events, and a compliance posture teams can review before they put AI on the line.
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]"
              >
                <motion.div variants={cardReveal}>
                  <div className="relative h-full overflow-hidden rounded-[32px] border border-[var(--color-dark-divider)] bg-[linear-gradient(155deg,var(--color-dark-section),var(--color-hero-right))] p-6 shadow-[0_32px_72px_-44px_rgba(20,20,20,0.48)] sm:p-8">
                    <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-[var(--color-overlay-accent-medium)] blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-36 w-36 rounded-full bg-[var(--color-overlay-secondary-medium)] blur-3xl" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--color-dark-divider)] bg-[var(--color-overlay-soft)] text-[var(--color-accent-secondary)]">
                          <ShieldCheckIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="landing-body text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted-on-dark)]">
                            Security practices
                          </div>
                          <div className="landing-body mt-1 text-[13px] text-[var(--color-text-on-dark)]">
                            Visible controls for teams that need a real review loop.
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-3">
                        {securityPractices.map((practice) => (
                          <div key={practice} className="flex items-start gap-3 rounded-[18px] border border-[var(--color-dark-divider)] bg-[var(--color-overlay-soft)] px-4 py-3">
                            <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent-secondary)]" />
                            <p className="landing-body text-[13px] leading-6 text-[var(--color-text-on-dark)]">{practice}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 rounded-[20px] border border-[var(--color-dark-divider)] bg-[var(--color-overlay-soft)] px-4 py-4">
                        <div className="landing-body text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted-on-dark)]">
                          Live posture
                        </div>
                        <div className="landing-body mt-2 text-[14px] leading-6 text-[var(--color-text-on-dark)]">
                          Compliance is not hidden in a PDF somewhere — operators can review public posture details and route deeper requests straight to the compliance page.
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="grid gap-5">
                  {complianceFrameworks.map((framework) => (
                    <motion.div key={framework.title} variants={cardReveal}>
                      <div className="landing-card landing-card-hover rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg)] p-6 shadow-[0_24px_44px_-34px_rgba(20,20,20,0.14)]">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="landing-display landing-display-3 text-[var(--color-text-primary)]">
                              {framework.title}
                            </div>
                            <div className="landing-body mt-2 text-[13px] text-[var(--color-text-muted)]">
                              {framework.subtitle}
                            </div>
                          </div>

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-overlay-accent-soft)] text-[var(--color-accent-primary)]">
                            <ShieldCheckIcon className="h-4.5 w-4.5" />
                          </div>
                        </div>

                        <div className="mt-5 space-y-3">
                          {framework.points.map((point) => (
                            <div key={point} className="flex items-start gap-3 rounded-[16px] bg-[var(--color-bg-secondary)] px-4 py-3">
                              <CheckCircleIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--color-accent-primary)]" />
                              <p className="landing-body text-[13px] leading-6 text-[var(--color-text-primary)]">{point}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <motion.div variants={cardReveal}>
                    <Link
                      href="/compliance"
                      className="landing-body inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-4 text-[14px] font-medium text-[var(--color-text-primary)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"
                    >
                      Explore full compliance details
                      <ArrowLongRightIcon className="h-4.5 w-4.5" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="integrations" className="landing-section pt-4">
            <div className="landing-container">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[48rem]"
              >
                <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-primary)]">
                  Integrations
                </div>
                <h2 className="landing-display landing-display-1 mt-6 text-[var(--color-text-primary)]">
                  The voice stack plugs into the product layer you actually operate.
                </h2>
                <p className="landing-body landing-body-1-regular mt-4 max-w-[39rem] text-[var(--color-text-muted)]">
                  Yapsolutely is not a floating demo glued together with pretty screenshots. The telephony, speech, reasoning, and dashboard layers are wired together so the call and the proof loop stay in sync.
                </p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.12 }}
                className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]"
              >
                <motion.div variants={cardReveal}>
                  <div className="relative overflow-hidden rounded-[32px] border border-[var(--color-dark-divider)] bg-[linear-gradient(155deg,var(--color-dark-section),var(--color-hero-right))] p-6 shadow-[0_32px_72px_-44px_rgba(20,20,20,0.48)] sm:p-8">
                    <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[var(--color-overlay-accent-medium)] blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[var(--color-overlay-secondary-medium)] blur-3xl" />

                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="landing-body rounded-full border border-[var(--color-dark-divider)] bg-[var(--color-badge-dark)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-muted-on-dark)]">
                          Live system map
                        </span>
                        <span className="landing-body rounded-full border border-[var(--color-overlay-accent-border)] bg-[var(--color-overlay-accent-medium)] px-3 py-1 text-[11px] font-medium text-[var(--color-accent-secondary)]">
                          Runtime + dashboard
                        </span>
                      </div>

                      <h3 className="landing-display landing-display-2 mt-6 max-w-[12ch] text-[var(--color-text-on-dark)]">
                        One call, four connected layers.
                      </h3>
                      <p className="landing-body mt-4 max-w-[32rem] text-[14px] leading-7 text-[var(--color-text-muted-on-dark)]">
                        The inbound call hits telephony, moves through speech and reasoning, then returns to the dashboard as something teams can review, measure, and improve.
                      </p>

                      <div className="mt-6 rounded-[24px] border border-[var(--color-dark-divider)] bg-[var(--color-overlay-soft)] p-4 sm:p-5">
                        <IntegrationFlowPreview />
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2.5">
                        {integrationPartners.map((partner) => (
                          <span
                            key={partner}
                            className="landing-body rounded-full border border-[var(--color-dark-divider)] bg-[var(--color-overlay-soft)] px-3.5 py-2 text-[12px] font-medium text-[var(--color-text-on-dark)]"
                          >
                            {partner}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="grid gap-5">
                  {integrationStacks.map((stack) => {
                    const Icon = stack.icon;

                    return (
                      <motion.div key={stack.title} variants={cardReveal}>
                        <div className="landing-card landing-card-hover rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg)] p-6 shadow-[0_24px_44px_-34px_rgba(20,20,20,0.14)]">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-accent-primary)]">
                                {stack.eyebrow}
                              </div>
                              <h3 className="landing-display landing-display-3 mt-3 text-[var(--color-text-primary)]">
                                {stack.title}
                              </h3>
                            </div>

                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-overlay-accent-soft)] text-[var(--color-accent-primary)]">
                              <Icon className="h-5 w-5" />
                            </div>
                          </div>

                          <p className="landing-body landing-body-2-regular mt-4 text-[var(--color-text-muted)]">
                            {stack.description}
                          </p>

                          <div className="mt-5 space-y-3">
                            {stack.points.map((point) => (
                              <div key={point} className="flex items-start gap-3 rounded-[16px] bg-[var(--color-bg-secondary)] px-4 py-3">
                                <CheckCircleIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-[var(--color-accent-primary)]" />
                                <p className="landing-body text-[13px] leading-6 text-[var(--color-text-primary)]">{point}</p>
                              </div>
                            ))}
                          </div>

                          <div className="landing-body mt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                            {stack.badge}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </section>

          <ScrollFAQ
            data={faqItems.slice(0, 6).map((item) => ({
              id: item.id,
              question: item.question,
              answer: item.answer,
            }))}
          />

          <section className="px-4 pb-10 sm:px-6 sm:pb-14">
            <div className="landing-container">
              <motion.div
                variants={sectionReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -2 }}
                className="overflow-hidden rounded-[34px] border border-[var(--color-dark-divider)] bg-[var(--color-dark-section)] p-8 shadow-[0_28px_70px_-36px_rgba(20,20,20,0.4)] sm:p-10 lg:p-12"
              >
                <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                  <div>
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
                      Build the agent, attach the number, and review every conversation with transcripts, actions, and outcomes in one operator workspace.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
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
                        className="landing-button-primary landing-body landing-body-2-semibold inline-flex items-center justify-center gap-2 px-6 py-3.5"
                      >
                        Get started free
                        <ArrowLongRightIcon className="h-5 w-5" />
                      </Link>
                      <Link
                        href="/docs"
                        className="landing-button-secondary-dark landing-body landing-body-2-semibold inline-flex items-center justify-center px-6 py-3.5"
                      >
                        Read the docs
                      </Link>
                    </div>
                    <p className="landing-body mt-4 text-[12px] text-[var(--color-text-muted-on-dark)]">
                      No fake proof. No buried transcripts. Just the full inbound workflow, wired together.
                    </p>
                  </div>

                  <div className="mx-auto w-full max-w-[320px] rounded-[30px] border border-[var(--color-dark-divider)] bg-[var(--color-overlay-soft)] p-5 shadow-[0_22px_42px_-32px_rgba(0,0,0,0.32)] backdrop-blur-sm">
                    <MascotIllustration />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-12">
          <div className="landing-container">
            <div className="grid gap-10 md:grid-cols-[1.35fr_0.85fr_0.85fr_0.85fr]">
              <div>
                <Link href="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-85">
                  <Image
                    src="/favicon.svg"
                    alt="Yapsolutely logo"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] object-cover"
                  />
                  <div>
                    <div className="landing-display landing-display-3 text-[var(--color-text-primary)]">
                      Yapsolutely
                    </div>
                    <div className="landing-body mt-1 text-[12px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                      AI voice operations
                    </div>
                  </div>
                </Link>
                <p className="landing-body landing-body-2-regular mt-4 max-w-[20rem] text-[var(--color-text-muted)]">
                  AI phone agents for inbound calls, phone routing, transcripts, and post-call review that teams can actually trust.
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {footerActionLinks.map((link) => {
                    const Icon = link.icon;
                    const commonClassName = "landing-body inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-2 text-[12px] font-medium text-[var(--color-text-primary)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]";

                    if (link.href.startsWith("mailto:")) {
                      return (
                        <a key={link.label} href={link.href} className={commonClassName}>
                          <Icon className="h-4 w-4" />
                          {link.label}
                        </a>
                      );
                    }

                    return (
                      <Link key={link.label} href={link.href} className={commonClassName}>
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {footerColumns.map((column) => (
                <FooterColumn key={column.title} title={column.title} links={column.links} />
              ))}
            </div>

            <div className="landing-body mt-10 flex flex-col gap-3 border-t border-[var(--color-border)] pt-6 text-[14px] text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
              <span>© 2026 Yapsolutely, Inc.</span>
              <span>Built for real inbound call ops, not just demo theatrics.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function LandingStatsBar() {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 border-y border-[var(--color-dark-divider)] bg-[var(--color-dark-section)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
        {heroStats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-1 flex-col items-center justify-center px-6 py-4 text-center",
              index < heroStats.length - 1 && "lg:border-r lg:border-[var(--color-dark-divider)]",
            )}
          >
            <div className="landing-stat text-[var(--color-text-on-dark)]">
              {stat.value}
            </div>
            <div className="landing-body mt-3 max-w-[16rem] text-[13px] leading-6 text-[var(--color-text-muted-on-dark)] sm:text-[14px]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
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

function HeroVideoPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    return `${m}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); } else { videoRef.current.play(); }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(isFinite(p) ? p : 0);
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current?.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pct * videoRef.current.duration;
    setProgress(pct * 100);
  };

  const handleVolumeChange = (val: number) => {
    if (!videoRef.current) return;
    videoRef.current.volume = val / 100;
    setVolume(val / 100);
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    if (!isMuted) { setVolume(0); } else { setVolume(1); videoRef.current.volume = 1; }
  };

  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-[20px] bg-[#11111198] shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video — landscape 16:9 */}
      <div className="aspect-video w-full overflow-hidden bg-[var(--color-dark-section)]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay}
          className="h-full w-full cursor-pointer object-cover"
        >
          <source src="/videos/hero-demo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Controls overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 mx-auto max-w-[90%] m-3 p-3 rounded-2xl bg-[#11111198] backdrop-blur-md"
            initial={{ y: 16, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 16, opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Progress bar */}
            <div
              className="relative mb-2.5 h-1 w-full cursor-pointer rounded-full bg-[rgba(255,255,255,0.2)]"
              onClick={handleSeek}
            >
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-[var(--color-text-on-dark)] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  onClick={togglePlay}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[var(--color-text-on-dark)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[var(--color-text-on-dark)]"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>

                <Button
                  onClick={toggleMute}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-[var(--color-text-on-dark)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[var(--color-text-on-dark)]"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : volume > 0.5 ? <Volume2 className="h-4 w-4" /> : <Volume1 className="h-4 w-4" />}
                </Button>

                {/* Volume slider */}
                <div
                  className="relative h-1 w-16 cursor-pointer rounded-full bg-[rgba(255,255,255,0.2)]"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    handleVolumeChange(((e.clientX - rect.left) / rect.width) * 100);
                  }}
                >
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-[var(--color-text-on-dark)]"
                    style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                  />
                </div>

                <span className="landing-body ml-1 text-[11px] text-[var(--color-text-muted-on-dark)]">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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

function LatencyPreview() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_200px] lg:items-center">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["STT", "Live transcription"],
          ["LLM", "Fast turn generation"],
          ["TTS", "Playback in stream"],
        ].map(([label, description]) => (
          <div key={label} className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-4">
            <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              {label}
            </div>
            <div className="landing-body mt-2 text-[13px] leading-6 text-[var(--color-text-primary)]">
              {description}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-[20px] border border-[rgba(217,95,59,0.18)] bg-[var(--color-bg)] px-5 py-5 text-center">
        <div className="landing-stat-lg leading-none tracking-[-0.05em] text-[var(--color-accent-primary)]">
          &lt;800ms
        </div>
        <div className="landing-body mt-2 text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          Callers can&apos;t tell it&apos;s AI
        </div>
      </div>
    </div>
  );
}

function AuditTrailPreview() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_180px] lg:items-center">
      <div className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
        <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          Transcript timeline
        </div>
        <div className="mt-4 space-y-3">
          <TranscriptBubble speaker="Agent" copy="Thanks for calling — are you looking for support, pricing, or a demo?" compact />
          <TranscriptBubble speaker="Caller" copy="Pricing, and we need a launch before next month." caller />
          <TranscriptBubble speaker="Action" copy="Lead score 91 · follow-up SMS queued · demo booked" compact />
        </div>
      </div>

      <div className="space-y-3">
        {[
          ["100%", "Every word transcribed"],
          ["Logged", "Every event recorded"],
        ].map(([value, label]) => (
          <div key={label} className="overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-4 text-center">
            <div className="landing-stat-lg leading-none tracking-[-0.05em] text-[var(--color-text-primary)]">
              {value}
            </div>
            <div className="landing-body mt-2 text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentBuilderMini() {
  return (
    <div className="space-y-3">
      {[
        ["Voice", "Warm · Confident"],
        ["First message", "Thanks for calling Yapsolutely..."],
        ["Fallback", "Transfer on pricing objection"],
      ].map(([label, value]) => (
        <div key={label} className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3">
          <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">{label}</div>
          <div className="landing-body mt-1 text-[13px] text-[var(--color-text-primary)]">{value}</div>
        </div>
      ))}
    </div>
  );
}

function PhoneNumbersMini() {
  return (
    <div className="space-y-3">
      {[
        ["+1 (415) 555-0142", "Inbound Sales"],
        ["+44 20 7946 0018", "Front Desk"],
        ["+61 2 5550 0121", "After-hours"],
      ].map(([number, agent]) => (
        <div key={number} className="flex items-center justify-between rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3">
          <div>
            <div className="landing-body text-[13px] font-medium text-[var(--color-text-primary)]">{number}</div>
            <div className="landing-body mt-1 text-[11px] text-[var(--color-text-muted)]">{agent}</div>
          </div>
          <PhoneIcon className="h-4 w-4 text-[var(--color-accent-primary)]" />
        </div>
      ))}
    </div>
  );
}

function AfterHoursMini() {
  return (
    <div className="space-y-3">
      {[
        ["11:42 PM", "Installation request"],
        ["12:08 AM", "Billing callback"],
        ["1:16 AM", "Urgent support"],
      ].map(([time, label]) => (
        <div key={`${time}-${label}`} className="flex items-center justify-between rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3">
          <div>
            <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">{time}</div>
            <div className="landing-body mt-1 text-[13px] text-[var(--color-text-primary)]">{label}</div>
          </div>
          <span className="landing-body rounded-full bg-[var(--color-bg-secondary)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-accent-primary)]">
            Queued
          </span>
        </div>
      ))}
    </div>
  );
}

function AnalyticsMini() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[
          ["47", "Calls"],
          ["11", "Booked"],
          ["94%", "Resolved"],
        ].map(([value, label]) => (
          <div key={label} className="min-w-0 overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-3 text-center">
            <div className="landing-stat-sm leading-none tracking-[-0.04em] text-[var(--color-text-primary)]">{value}</div>
            <div className="landing-body mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">{label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3">
        <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">Performance trend</div>
        <div className="mt-3 flex items-end gap-2">
          {[42, 58, 50, 71, 64, 82].map((height, index) => (
            <div key={index} className="flex-1 rounded-full bg-[var(--color-overlay-accent-soft)]" style={{ height: `${height}px` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProofQueuePreview() {
  return (
    <div className="space-y-3">
      {[
        ["11:42 PM", "Installation request", "8 AM follow-up"],
        ["12:08 AM", "Billing callback", "Route to finance"],
        ["1:16 AM", "Urgent support", "Priority"],
      ].map(([time, label, badge]) => (
        <div key={`${time}-${label}`} className="flex items-center justify-between gap-3 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3">
          <div>
            <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">{time}</div>
            <div className="landing-body mt-1 text-[13px] text-[var(--color-text-primary)]">{label}</div>
          </div>
          <span className="landing-body rounded-full bg-[var(--color-bg-secondary)] px-3 py-1 text-[11px] font-medium text-[var(--color-accent-primary)]">
            {badge}
          </span>
        </div>
      ))}
    </div>
  );
}

function ProofBookingPreview() {
  return (
    <div className="space-y-3">
      <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3">
        <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">Selected slot</div>
        <div className="landing-body mt-2 text-[13px] font-medium text-[var(--color-text-primary)]">Wednesday · 1:30 PM</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          ["Caller", "Sarah M."],
          ["Status", "Confirmed"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3">
            <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">{label}</div>
            <div className="landing-body mt-2 text-[13px] text-[var(--color-text-primary)]">{value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-[16px] border border-[rgba(238,48,58,0.18)] bg-[var(--color-bg-card-highlight)] px-4 py-3">
        <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent-primary)]">Next action</div>
        <div className="landing-body mt-2 text-[13px] text-[var(--color-text-primary)]">Confirmation SMS queued and logged.</div>
      </div>
    </div>
  );
}

function ProofAuditPreview() {
  return (
    <div className="space-y-3">
      <TranscriptBubble speaker="Agent" copy="I can help with pricing, support, or booking. Which one should we handle first?" compact />
      <TranscriptBubble speaker="Caller" copy="Pricing first — and we need a rollout before next month." caller />
      <div className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3">
        <div className="landing-body text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">Logged outcome</div>
        <div className="landing-body mt-2 text-[13px] text-[var(--color-text-primary)]">Lead score saved · follow-up SMS sent · demo handoff queued</div>
      </div>
    </div>
  );
}

function IntegrationFlowPreview() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-[repeat(4,minmax(0,1fr))]">
        {[
          ["01", "Call enters", "Twilio number receives the inbound call"],
          ["02", "Speech loop", "Deepgram transcribes and speaks back in stream"],
          ["03", "Reasoning", "Anthropic drives replies and tool choices"],
          ["04", "Proof lands", "Next.js + Prisma persist the call review trail"],
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
          ["&lt;800ms", "Average response time"],
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
      <div className="landing-body text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
        {title}
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {links.map(([label, href]) => {
          const className =
            "landing-body cursor-pointer text-[14px] font-medium text-[var(--color-text-primary)] transition-all duration-200 hover:scale-[1.02] hover:text-[var(--color-accent-primary)]";

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

function MascotIllustration() {
  return (
    <div className="text-center">
      <div className="relative mx-auto flex w-full max-w-[240px] items-center justify-center">
        <div className="absolute inset-x-8 top-10 h-24 rounded-full bg-[var(--color-overlay-accent-medium)] blur-3xl" />
        <svg viewBox="0 0 240 240" className="relative h-[220px] w-[220px]" role="img" aria-label="Yapsolutely mascot illustration">
          <circle cx="120" cy="120" r="98" fill="var(--color-overlay-soft)" stroke="var(--color-overlay-medium)" />
          <circle cx="120" cy="88" r="36" fill="var(--color-accent-primary)" />
          <circle cx="106" cy="82" r="4.5" fill="var(--color-text-primary)" />
          <circle cx="134" cy="82" r="4.5" fill="var(--color-text-primary)" />
          <path d="M106 98C112 105 128 105 134 98" stroke="var(--color-text-primary)" strokeWidth="4" strokeLinecap="round" fill="none" />
          <rect x="84" y="126" width="72" height="58" rx="28" fill="var(--color-text-on-dark)" opacity="0.96" />
          <rect x="110" y="136" width="20" height="34" rx="10" fill="var(--color-accent-primary)" />
          <path d="M92 152C92 170 148 170 148 152" stroke="var(--color-text-primary)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />
          <path d="M168 92C182 98 188 110 188 122" stroke="var(--color-accent-primary)" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.92" />
          <path d="M181 80C200 90 210 108 210 126" stroke="var(--color-accent-primary)" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.45" />
          <path d="M72 92C58 98 52 110 52 122" stroke="var(--color-accent-primary)" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.92" />
          <path d="M59 80C40 90 30 108 30 126" stroke="var(--color-accent-primary)" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.45" />
          <circle cx="120" cy="198" r="8" fill="var(--color-accent-primary)" opacity="0.9" />
        </svg>
      </div>

      <div className="mt-2">
        <div className="landing-body text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted-on-dark)]">
          Always-on voice operator
        </div>
        <p className="landing-body mx-auto mt-3 max-w-[22rem] text-[14px] leading-6 text-[var(--color-text-on-dark)]">
          A friendlier face for the product — built to suggest voice, responsiveness, and round-the-clock coverage without falling into generic SaaS clipart territory.
        </p>
      </div>
    </div>
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
