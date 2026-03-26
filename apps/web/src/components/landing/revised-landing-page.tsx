"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLongRightIcon,
  Bars3Icon,
  BoltIcon,
  CalendarDaysIcon,
  ChartBarSquareIcon,
  CheckCircleIcon,
  ClockIcon,
  MinusIcon,
  PhoneIcon,
  PlusIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  { label: "Product", href: "#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "About", href: "/about" },
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

const howItWorks = [
  {
    number: "01",
    title: "Define Your Agent",
    description: "Set the voice, tone, routing logic, and fallback rules for every conversation.",
    render: () => <PromptEditorSnippet />,
  },
  {
    number: "02",
    title: "Assign a Number",
    description: "Attach a real phone number and push changes live without touching custom infrastructure.",
    render: () => <PhoneAssignmentSnippet />,
  },
  {
    number: "03",
    title: "Review Every Call",
    description: "Read transcripts, outcomes, and follow-up actions from one clear review workspace.",
    render: () => <TranscriptReviewSnippet />,
  },
];

const useCases = [
  {
    id: "sales",
    tab: "Inbound Sales",
    title: "Qualify leads, answer pricing, and book demos.",
    description: "Route serious buyers faster by capturing budget, urgency, and fit the moment they call.",
    preview: <LeadScorePreview />,
  },
  {
    id: "booking",
    tab: "Appointment Booking",
    title: "Confirm availability, book the slot, and send the follow-up.",
    description: "Let the agent handle scheduling without the back-and-forth or missed voicemail loops.",
    preview: <BookingCalendarPreview />,
  },
  {
    id: "support",
    tab: "Customer Support",
    title: "Handle tier-one support and escalate only when needed.",
    description: "Answer common questions, capture the issue, and route complex requests with context.",
    preview: <SupportTranscriptPreview />,
  },
  {
    id: "qualification",
    tab: "Lead Qualification",
    title: "Screen interest, capture data, and route the hottest leads first.",
    description: "Use structured intake so the team only spends time on the strongest opportunities.",
    preview: <QualificationPreview />,
  },
  {
    id: "afterhours",
    tab: "After-hours Coverage",
    title: "Capture details overnight and queue follow-ups for the morning.",
    description: "Keep the line active even when the team is offline so no inbound intent gets lost.",
    preview: <AfterHoursPreview />,
  },
];

const featureCards = [
  {
    type: "wide",
    title: "Sub-second Responses",
    description: "Callers can't tell it's AI. Streaming voice keeps the conversation moving naturally.",
    icon: BoltIcon,
    metric: "<800ms",
    caption: "Average voice response target",
  },
  {
    type: "wide",
    title: "Full Audit Trail",
    description: "Every word transcribed, every event logged, and every action visible after the call ends.",
    icon: ShieldCheckIcon,
    metric: "100%",
    caption: "Every word transcribed",
  },
  {
    type: "small",
    title: "Custom Agents",
    description: "Prompt editor, voice settings, and behavior controls in one flow.",
    icon: SparklesIcon,
  },
  {
    type: "small",
    title: "Real Phone Numbers",
    description: "US and international numbers powered through Twilio-backed routing.",
    icon: PhoneIcon,
  },
  {
    type: "small",
    title: "After-hours Coverage",
    description: "Never miss a call when your human team is offline.",
    icon: ClockIcon,
  },
  {
    type: "small",
    title: "Analytics Dashboard",
    description: "Review call outcomes, volume, and agent performance from one workspace.",
    icon: ChartBarSquareIcon,
  },
];

const faqItems = [
  {
    question: "What is Yapsolutely?",
    answer:
      "Yapsolutely is an AI voice agent platform for inbound phone calls. You can build agents, assign numbers, review transcripts, and manage operations from one workspace.",
  },
  {
    question: "How do I set up my first voice agent?",
    answer:
      "Create an agent, define its prompt and voice, assign a number, and publish it. The setup is designed to move from configuration to live calls quickly.",
  },
  {
    question: "What phone numbers are supported?",
    answer:
      "The platform supports real phone-number routing through Twilio-backed provisioning, including the assignment flow for inbound agents.",
  },
  {
    question: "Can I review what my agent said on calls?",
    answer:
      "Yes. Every call includes transcript visibility, metadata, and action history so you can understand what happened after the conversation ends.",
  },
  {
    question: "Is my data secure?",
    answer:
      "The workspace is built with operational review in mind, including protected access, stored call records, and deployment-aware configuration checks.",
  },
  {
    question: "What AI models power the agents?",
    answer:
      "The current stack uses Anthropic for language generation and Deepgram for speech-to-text and text-to-speech in the live runtime path.",
  },
  {
    question: "Can I customize how my agent sounds and behaves?",
    answer:
      "Yes. Prompting, first message, voice behavior, tool actions, and call handling can all be configured per agent.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. You can start building without a credit card and expand once you are ready for more volume and operational depth.",
  },
];

const footerColumns = [
  {
    title: "Product",
    links: [
      ["Features", "#features"],
      ["Pricing", "/pricing"],
      ["Changelog", "/changelog"],
      ["Documentation", "/docs"],
      ["API Reference", "/docs/api"],
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
      ["Terms of Service", "/terms"],
      ["Privacy Policy", "/privacy"],
    ] as [string, string][],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
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
  const [activeUseCase, setActiveUseCase] = useState(useCases[0].id);
  const [openFaq, setOpenFaq] = useState(faqItems[0].question);

  const activeUseCaseData = useMemo(
    () => useCases.find((item) => item.id === activeUseCase) ?? useCases[0],
    [activeUseCase],
  );

  return (
    <div className="landing-shell min-h-screen bg-[var(--landing-background)] text-[var(--landing-text)]">
      <header className="sticky top-0 z-50 border-b border-[var(--landing-border)]/80 bg-white/80 backdrop-blur-md">
        <div className="landing-container flex h-20 items-center justify-between gap-6">
          <Link href="/" className="cursor-pointer landing-display text-[2rem] leading-none tracking-[-0.04em] text-[var(--landing-text)]">
            Yapsolutely
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="landing-body cursor-pointer text-[14px] font-medium text-[var(--landing-text-muted)] transition-colors hover:text-[var(--landing-text)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/sign-in" className="landing-button-secondary inline-flex items-center justify-center px-5 py-3 landing-body text-[14px] font-medium">
              Sign in
            </Link>
            <Link href="/sign-up" className="landing-button-primary inline-flex items-center justify-center px-5 py-3 landing-body text-[14px] font-semibold">
              Start building free
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--landing-border)] text-[var(--landing-text)] md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-[var(--landing-border)] bg-white/95 md:hidden">
            <div className="landing-container flex flex-col gap-3 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="landing-body cursor-pointer rounded-xl border border-[var(--landing-border)] px-4 py-3 text-[14px] font-medium text-[var(--landing-text)]"
                >
                  {link.label}
                </Link>
              ))}
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
                className="landing-button-primary inline-flex items-center justify-center px-5 py-3 landing-body text-[14px] font-semibold"
              >
                Start building free
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section className="landing-section overflow-hidden pt-10 sm:pt-16">
          <div className="landing-container">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.04fr] lg:gap-16">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-[560px]"
              >
                <div className="landing-pill inline-flex items-center gap-3 px-4 py-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--landing-accent)] opacity-45" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--landing-accent)]" />
                  </span>
                  <span className="landing-body text-[13px] font-medium text-[var(--landing-text)]">Handling calls now</span>
                </div>

                <h1 className="landing-display mt-6 max-w-[10ch] text-[3.5rem] leading-[0.94] tracking-[-0.05em] text-[var(--landing-text)] sm:text-[4.2rem] lg:text-[4rem] xl:text-[4.5rem]">
                  AI agents that answer your phone
                </h1>

                <p className="landing-body mt-6 max-w-[32rem] text-[16px] leading-7 text-[var(--landing-text-muted)]">
                  Build voice agents, assign real phone numbers, handle inbound calls. One workspace.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/sign-up" className="landing-button-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 landing-body text-[15px] font-semibold">
                    Start building free
                    <ArrowLongRightIcon className="h-5 w-5" />
                  </Link>
                  <Link href="#how-it-works" className="landing-button-secondary inline-flex items-center justify-center px-6 py-3.5 landing-body text-[15px] font-medium">
                    See how it works
                  </Link>
                </div>

                <p className="landing-body mt-4 text-[13px] text-[var(--landing-text-muted)]">
                  No credit card required. Free plan available.
                </p>

                <div className="landing-body mt-8 flex flex-wrap items-center gap-3 text-[13px] font-medium text-[var(--landing-text-muted)] sm:gap-5">
                  <span>&lt;800ms</span>
                  <span className="text-[var(--landing-border)]">·</span>
                  <span>24/7</span>
                  <span className="text-[var(--landing-border)]">·</span>
                  <span>100% transcribed</span>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
                className="lg:justify-self-end"
              >
                <div className="landing-card rotate-1 overflow-hidden border border-[var(--landing-border)] bg-white p-3 shadow-[0_32px_70px_-34px_rgba(20,20,20,0.28)] sm:p-4">
                  <div className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-background-soft)] px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FF8A80]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#FFD180]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#A5D6A7]" />
                      </div>
                      <div className="landing-body rounded-full border border-[var(--landing-border)] bg-white px-4 py-1.5 text-[12px] font-medium text-[var(--landing-text-muted)]">
                        yapsolutely.xyz/dashboard
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-[180px_1fr]">
                      <div className="rounded-xl border border-[var(--landing-border)] bg-white p-4">
                        <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--landing-text-muted)]">
                          Agents
                        </div>
                        <div className="mt-4 space-y-3">
                          {[
                            { name: "Inbound Sales", status: "ACTIVE" },
                            { name: "Support Line", status: "ACTIVE" },
                            { name: "After-hours", status: "DRAFT" },
                          ].map((agent) => (
                            <div key={agent.name} className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-background-soft)] px-3 py-3">
                              <div className="flex items-center justify-between gap-3">
                                <span className="landing-body text-[13px] font-medium text-[var(--landing-text)]">{agent.name}</span>
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${agent.status === "ACTIVE" ? "bg-[#F6EEE8] text-[var(--landing-accent)]" : "bg-white text-[var(--landing-text-muted)]"}`}>
                                  {agent.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-3">
                          {[
                            ["Calls today", "47"],
                            ["Avg duration", "3:42"],
                            ["Resolved", "91%"],
                          ].map(([label, value]) => (
                            <div key={label} className="rounded-xl border border-[var(--landing-border)] bg-white px-4 py-4">
                              <div className="landing-body text-[11px] font-medium text-[var(--landing-text-muted)]">{label}</div>
                              <div className="landing-display mt-2 text-[1.8rem] leading-none tracking-[-0.04em] text-[var(--landing-text)]">{value}</div>
                            </div>
                          ))}
                        </div>

                        <div className="rounded-xl border border-[var(--landing-border)] bg-white p-4">
                          <div className="flex items-center justify-between gap-4 border-b border-[var(--landing-border)] pb-3">
                            <div>
                              <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--landing-text-muted)]">
                                Live transcript
                              </div>
                              <div className="landing-body mt-1 text-[13px] font-medium text-[var(--landing-text)]">+1 (415) 555-0142</div>
                            </div>
                            <span className="rounded-full bg-[#F6EEE8] px-3 py-1 text-[11px] font-semibold text-[var(--landing-accent)]">
                              Lead score 91
                            </span>
                          </div>

                          <div className="mt-4 space-y-3">
                            <TranscriptBubble speaker="Agent" copy="Thanks for calling. Are you evaluating for your team or for a client?" />
                            <TranscriptBubble speaker="Caller" copy="For my team. We need something live this month." caller />
                            <TranscriptBubble speaker="Action" copy="Demo booked for tomorrow at 11:30 AM." compact />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden py-8 sm:py-10">
          <div className="landing-container">
            <div className="landing-body mb-4 text-center text-[12px] font-medium text-[var(--landing-text-muted)]">Powered by</div>
            <div className="relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent" />
              <div className="absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent" />
              <div className="flex w-max animate-scroll-left items-center gap-12 py-3">
                {[...marqueeLogos, ...marqueeLogos].map((logo, index) => (
                  <div key={`${logo.file}-${index}`} className="flex items-center gap-3 opacity-85">
                    <Image src={`/logos/${logo.file}.svg`} alt={logo.label} width={28} height={28} className="h-7 w-7" />
                    <span className="landing-body text-[14px] font-medium text-[var(--landing-text-muted)]">{logo.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="landing-section bg-[var(--landing-background-soft)]">
          <div className="landing-container">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className="max-w-[700px]"
            >
              <div className="landing-pill inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--landing-text-muted)]">
                How it works
              </div>
              <h2 className="landing-display mt-6 text-[3rem] leading-[0.95] tracking-[-0.05em] text-[var(--landing-text)] sm:text-[3.6rem]">
                Three steps to a working phone agent
              </h2>
              <p className="landing-body mt-4 text-[16px] leading-7 text-[var(--landing-text-muted)]">
                No SDK integration, no custom infrastructure.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="mt-10 grid gap-6 lg:grid-cols-3"
            >
              {howItWorks.map((step) => (
                <motion.div key={step.number} variants={fadeUp} className="landing-card landing-card-hover p-6">
                  <div className="landing-display text-[3rem] leading-none tracking-[-0.05em] text-[var(--landing-accent)]">{step.number}</div>
                  <h3 className="landing-display mt-4 text-[1.75rem] leading-none tracking-[-0.03em] text-[var(--landing-text)]">
                    {step.title}
                  </h3>
                  <p className="landing-body mt-3 text-[14px] leading-6 text-[var(--landing-text-muted)]">
                    {step.description}
                  </p>
                  <div className="mt-6">{step.render()}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="landing-section" id="use-cases">
          <div className="landing-container">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
              <h2 className="landing-display text-[3rem] leading-[0.95] tracking-[-0.05em] text-[var(--landing-text)] sm:text-[3.6rem]">
                Built for every inbound call scenario
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-8"
            >
              <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-[var(--landing-border)] pb-4">
                {useCases.map((useCase) => {
                  const active = activeUseCase === useCase.id;
                  return (
                    <button
                      key={useCase.id}
                      type="button"
                      onClick={() => setActiveUseCase(useCase.id)}
                      className={`landing-body relative cursor-pointer pb-2 text-[15px] font-medium transition-colors ${active ? "text-[var(--landing-text)]" : "text-[var(--landing-text-muted)] hover:text-[var(--landing-text)]"}`}
                    >
                      {useCase.tab}
                      <span className={`absolute inset-x-0 -bottom-[17px] h-0.5 bg-[var(--landing-accent)] transition-opacity ${active ? "opacity-100" : "opacity-0"}`} />
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={activeUseCaseData.id}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="landing-card mt-8 p-6 sm:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                  <div>
                    <div className="landing-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--landing-accent)]">
                      {activeUseCaseData.tab}
                    </div>
                    <h3 className="landing-display mt-4 text-[2.4rem] leading-[0.96] tracking-[-0.04em] text-[var(--landing-text)]">
                      {activeUseCaseData.title}
                    </h3>
                    <p className="landing-body mt-4 max-w-[28rem] text-[15px] leading-7 text-[var(--landing-text-muted)]">
                      {activeUseCaseData.description}
                    </p>
                  </div>
                  <div>{activeUseCaseData.preview}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="landing-section bg-[var(--landing-background-soft)]">
          <div className="landing-container">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }} className="max-w-[760px]">
              <h2 className="landing-display text-[3rem] leading-[0.95] tracking-[-0.05em] text-[var(--landing-text)] sm:text-[3.6rem]">
                Everything you need to deploy voice agents at scale
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-10 grid gap-4 lg:grid-cols-4"
            >
              {featureCards.map((feature) => {
                const Icon = feature.icon;
                const isWide = feature.type === "wide";
                return (
                  <motion.div
                    key={feature.title}
                    variants={fadeUp}
                    className={`landing-card landing-card-hover p-6 ${isWide ? "lg:col-span-2" : "lg:col-span-1"}`}
                  >
                    <div className={`flex ${isWide ? "items-start justify-between gap-6" : "flex-col gap-5"}`}>
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--landing-background-soft)] text-[var(--landing-accent)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      {isWide ? (
                        <div className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-background-soft)] px-4 py-3 text-right">
                          <div className="landing-display text-[2.4rem] leading-none tracking-[-0.05em] text-[var(--landing-text)]">{feature.metric}</div>
                          <div className="landing-body mt-1 text-[12px] text-[var(--landing-text-muted)]">{feature.caption}</div>
                        </div>
                      ) : null}
                    </div>
                    <h3 className="landing-display mt-5 text-[18px] tracking-[-0.02em] text-[var(--landing-text)]">
                      {feature.title}
                    </h3>
                    <p className="landing-body mt-3 text-[14px] leading-6 text-[var(--landing-text-muted)]">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="bg-[var(--landing-dark)] py-10 text-[#F7F4EF] sm:py-12">
          <div className="landing-container">
            <div className="grid gap-8 text-center sm:grid-cols-3 sm:gap-0">
              {[
                ["<800ms", "Average voice response time"],
                ["24/7", "Your agent never sleeps"],
                ["100%", "Every word transcribed"],
              ].map(([value, label], index, array) => (
                <div key={label} className={`px-6 ${index < array.length - 1 ? "sm:border-r sm:border-white/10" : ""}`}>
                  <div className="landing-display text-[3.5rem] leading-none tracking-[-0.05em] text-[#F7F4EF] sm:text-[56px]">{value}</div>
                  <div className="landing-body mt-3 text-[14px] text-white/65">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section">
          <div className="landing-container max-w-[900px]">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
              <h2 className="landing-display text-[3rem] leading-[0.95] tracking-[-0.05em] text-[var(--landing-text)] sm:text-[3.6rem]">
                Frequently asked questions
              </h2>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} className="mt-8">
              {faqItems.map((item) => {
                const open = openFaq === item.question;
                return (
                  <motion.div key={item.question} variants={fadeUp} className="border-b border-[var(--landing-border)] py-5">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? "" : item.question)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
                    >
                      <span className="landing-body text-[18px] font-medium text-[var(--landing-text)]">{item.question}</span>
                      <span className="text-[var(--landing-text-muted)]">
                        {open ? <MinusIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
                      </span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="landing-body max-w-[720px] pt-4 text-[14px] leading-7 text-[var(--landing-text-muted)]">
                        {item.answer}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="bg-[var(--landing-dark)] py-14 text-[#F7F4EF] sm:py-20">
          <div className="landing-container">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center"
            >
              <div>
                <h2 className="landing-display max-w-[11ch] text-[3rem] leading-[0.94] tracking-[-0.05em] text-[#F7F4EF] sm:text-[48px]">
                  Stop losing calls. Start closing them.
                </h2>
                <p className="landing-body mt-5 max-w-[34rem] text-[16px] leading-7 text-white/65">
                  Every missed call is a missed opportunity. Deploy an AI voice agent in minutes.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/sign-up" className="landing-button-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 landing-body text-[15px] font-semibold">
                    Get started free
                    <ArrowLongRightIcon className="h-5 w-5" />
                  </Link>
                  <Link href="/docs" className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/20 px-6 py-3.5 landing-body text-[15px] font-medium text-[#F7F4EF] transition hover:scale-[1.03] hover:border-white/40 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_16px_32px_-20px_rgba(217,95,59,0.35)]">
                    See the docs
                  </Link>
                </div>
              </div>

              <MascotIllustration />
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--landing-border)] bg-[var(--landing-background-soft)] py-12">
        <div className="landing-container">
          <div className="grid gap-10 md:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr]">
            <div>
              <div className="landing-display text-[2rem] leading-none tracking-[-0.04em] text-[var(--landing-text)]">Yapsolutely</div>
              <p className="landing-body mt-4 max-w-[18rem] text-[14px] leading-6 text-[var(--landing-text-muted)]">
                AI voice agents that answer your phone.
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
  );
}

function TranscriptBubble({ speaker, copy, caller = false, compact = false }: { speaker: string; copy: string; caller?: boolean; compact?: boolean }) {
  return (
    <div className={`rounded-xl border px-4 py-3 ${compact ? "border-[#E8E4DE] bg-[var(--landing-background-soft)]" : caller ? "border-[#E8E4DE] bg-white" : "border-[rgba(217,95,59,0.2)] bg-[#FDF5F2]"}`}>
      <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">
        {speaker}
      </div>
      <div className="landing-body mt-2 text-[14px] leading-6 text-[var(--landing-text)]">{copy}</div>
    </div>
  );
}

function PromptEditorSnippet() {
  return (
    <div className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-background-soft)] p-4">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[var(--landing-accent)]" />
        <span className="landing-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">Prompt editor</span>
      </div>
      <div className="mt-4 space-y-2 rounded-xl bg-white p-4">
        {[
          ["voice", "Warm and direct"],
          ["greeting", "Thanks for calling Yapsolutely"],
          ["transfer", "Escalate pricing objections"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3 border-b border-[var(--landing-border)] pb-2 last:border-b-0 last:pb-0">
            <span className="landing-body text-[12px] font-medium text-[var(--landing-text-muted)]">{label}</span>
            <span className="landing-body text-[12px] font-medium text-[var(--landing-text)]">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneAssignmentSnippet() {
  return (
    <div className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-background-soft)] p-4">
      <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">Number inventory</div>
      <div className="mt-4 space-y-3">
        {[
          ["+1 (415) 555-0142", "Inbound Sales"],
          ["+1 (212) 555-0198", "Support Line"],
          ["+1 (310) 555-0067", "After-hours"],
        ].map(([number, agent]) => (
          <div key={number} className="flex items-center justify-between rounded-xl border border-[var(--landing-border)] bg-white px-4 py-3">
            <div>
              <div className="landing-body text-[13px] font-medium text-[var(--landing-text)]">{number}</div>
              <div className="landing-body mt-1 text-[11px] text-[var(--landing-text-muted)]">{agent}</div>
            </div>
            <CheckCircleIcon className="h-5 w-5 text-[var(--landing-accent)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TranscriptReviewSnippet() {
  return (
    <div className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-background-soft)] p-4">
      <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">Call review</div>
      <div className="mt-4 space-y-3 rounded-xl bg-white p-4">
        <TranscriptBubble speaker="Agent" copy="I can help with that. Do you want the pricing for one location or multiple?" />
        <TranscriptBubble speaker="Caller" copy="Multiple. We have five now and two more opening soon." caller />
      </div>
    </div>
  );
}

function LeadScorePreview() {
  return (
    <div className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-background-soft)] p-4">
      <div className="flex items-center justify-between rounded-xl border border-[var(--landing-border)] bg-white px-4 py-4">
        <div>
          <div className="landing-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">Inbound sales</div>
          <div className="landing-body mt-2 text-[14px] font-medium text-[var(--landing-text)]">Karim Oumran • Enterprise demo</div>
        </div>
        <span className="rounded-full bg-[#F6EEE8] px-3 py-1 text-[12px] font-semibold text-[var(--landing-accent)]">Lead score 91</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[["Budget", "Confirmed"], ["Urgency", "This month"], ["Fit", "Multi-site"]].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-[var(--landing-border)] bg-white px-4 py-3">
            <div className="landing-body text-[11px] text-[var(--landing-text-muted)]">{label}</div>
            <div className="landing-body mt-1 text-[13px] font-medium text-[var(--landing-text)]">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingCalendarPreview() {
  return (
    <div className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-background-soft)] p-4">
      <div className="flex items-center gap-3">
        <CalendarDaysIcon className="h-5 w-5 text-[var(--landing-accent)]" />
        <div className="landing-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">Appointment booking</div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ["Wed", "2:00 PM"],
          ["Thu", "10:30 AM"],
          ["Fri", "1:15 PM"],
        ].map(([day, slot]) => (
          <div key={slot} className="rounded-xl border border-[var(--landing-border)] bg-white px-4 py-4 text-center">
            <div className="landing-body text-[11px] text-[var(--landing-text-muted)]">{day}</div>
            <div className="landing-display mt-2 text-[1.5rem] leading-none tracking-[-0.03em] text-[var(--landing-text)]">{slot}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportTranscriptPreview() {
  return (
    <div className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-background-soft)] p-4">
      <div className="space-y-3 rounded-xl bg-white p-4">
        <TranscriptBubble speaker="Caller" copy="I need help resetting access for my account." caller />
        <TranscriptBubble speaker="Agent" copy="I can help with that. Let me verify your email address first." />
      </div>
    </div>
  );
}

function QualificationPreview() {
  return (
    <div className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-background-soft)] p-4">
      <div className="rounded-xl border border-[var(--landing-border)] bg-white p-4">
        <div className="landing-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">Qualification scorecard</div>
        <div className="mt-4 space-y-3">
          {[["Locations", "5 active"], ["Timeline", "30 days"], ["Intent", "High"]].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-b border-[var(--landing-border)] pb-2 last:border-b-0 last:pb-0">
              <span className="landing-body text-[12px] text-[var(--landing-text-muted)]">{label}</span>
              <span className="landing-body text-[13px] font-medium text-[var(--landing-text)]">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AfterHoursPreview() {
  return (
    <div className="rounded-xl border border-[var(--landing-border)] bg-[var(--landing-background-soft)] p-4">
      <div className="space-y-3">
        {[
          ["10:42 PM", "Callback requested", "Priority"],
          ["11:18 PM", "Quote needed", "Morning"],
          ["12:06 AM", "Urgent support", "Escalate"],
        ].map(([time, note, badge]) => (
          <div key={time} className="flex items-center justify-between rounded-xl border border-[var(--landing-border)] bg-white px-4 py-3">
            <div>
              <div className="landing-body text-[12px] text-[var(--landing-text-muted)]">{time}</div>
              <div className="landing-body mt-1 text-[13px] font-medium text-[var(--landing-text)]">{note}</div>
            </div>
            <span className="rounded-full bg-[#F6EEE8] px-3 py-1 text-[11px] font-semibold text-[var(--landing-accent)]">{badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MascotIllustration() {
  return (
    <div className="mx-auto w-full max-w-[320px] rounded-xl border border-white/10 bg-white/[0.03] p-6">
      <svg viewBox="0 0 320 280" className="h-auto w-full" role="img" aria-label="Friendly Yapsolutely mascot">
        <rect x="24" y="188" width="272" height="44" rx="18" fill="rgba(255,255,255,0.04)" />
        <ellipse cx="160" cy="224" rx="86" ry="16" fill="rgba(217,95,59,0.18)" />
        <rect x="129" y="118" width="62" height="82" rx="26" fill="#D95F3B" />
        <circle cx="160" cy="92" r="34" fill="#F7F4EF" />
        <circle cx="148" cy="89" r="4" fill="#141414" />
        <circle cx="172" cy="89" r="4" fill="#141414" />
        <path d="M146 104C149 109 154 112 160 112C166 112 171 109 174 104" stroke="#141414" strokeWidth="4" strokeLinecap="round" />
        <rect x="114" y="138" width="14" height="54" rx="7" fill="#F7F4EF" />
        <rect x="192" y="138" width="14" height="54" rx="7" fill="#F7F4EF" />
        <rect x="141" y="198" width="14" height="36" rx="7" fill="#F7F4EF" />
        <rect x="165" y="198" width="14" height="36" rx="7" fill="#F7F4EF" />
        {[0, 1, 2, 3].map((bar, index) => (
          <rect
            key={bar}
            x={220 + index * 14}
            y={132 - index * 10}
            width="8"
            height={56 + index * 12}
            rx="4"
            fill={index % 2 === 0 ? "#D95F3B" : "#F7F4EF"}
            opacity={0.95 - index * 0.12}
          />
        ))}
        <path d="M207 154C214 148 223 145 231 145" stroke="#D95F3B" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        <path d="M205 171C214 165 226 161 239 161" stroke="#F7F4EF" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
      </svg>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="landing-body text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--landing-text-muted)]">{title}</div>
      <div className="mt-4 flex flex-col gap-3">
        {links.map(([label, href]) => {
          const className = "landing-body cursor-pointer text-[14px] font-medium text-[var(--landing-text)] transition-colors hover:text-[var(--landing-accent)]";

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