"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLongRightIcon,
  Bars3Icon,
  BoltIcon,
  ChartBarSquareIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ClockIcon,
  MicrophoneIcon,
  PhoneArrowDownLeftIcon,
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
  { file: "tailwindcss", label: "Tailwind CSS" },
  { file: "prisma", label: "Prisma" },
  { file: "vercel", label: "Vercel" },
  { file: "nodedotjs", label: "Node.js" },
  { file: "typescript", label: "TypeScript" },
  { file: "react", label: "React" },
];

const steps = [
  {
    number: "01",
    title: "Define your agent",
    description: "Write the prompt, choose the voice, and set the rules for how every conversation should flow.",
    eyebrow: "Prompt + voice",
  },
  {
    number: "02",
    title: "Assign a number and go live",
    description: "Connect a real phone number to the agent so inbound calls route instantly without the usual setup maze.",
    eyebrow: "Routing",
  },
  {
    number: "03",
    title: "Review every call",
    description: "Track transcripts, outcomes, and follow-up actions from one workspace that actually feels operational.",
    eyebrow: "Audit trail",
  },
];

const useCases = [
  {
    id: "sales",
    label: "Inbound sales",
    title: "Qualify leads the moment they call",
    description:
      "Answer pricing questions, capture intent, and book the next step before a hot lead cools off.",
    metrics: ["47 calls today", "78% qualified", "3:42 avg duration"],
    lines: [
      "Agent: Thanks for calling. Are you evaluating for your team or a client?",
      "Caller: For my team. We need something live this month.",
      "Action: Demo booked for tomorrow, 11:30 AM.",
    ],
  },
  {
    id: "booking",
    label: "Appointment booking",
    title: "Schedule without the back-and-forth",
    description:
      "Let the agent confirm availability, lock the slot, and send the caller a follow-up confirmation instantly.",
    metrics: ["12 bookings this week", "SMS confirmation sent", "2 reschedules handled"],
    lines: [
      "Agent: I can get you in Wednesday at 2 PM or Thursday at 10:30.",
      "Caller: Thursday works better.",
      "Action: Appointment confirmed. SMS sent.",
    ],
  },
  {
    id: "support",
    label: "Customer support",
    title: "Cover tier-one support around the clock",
    description:
      "Handle common questions, pull from your known answers, and escalate the right conversations to a human.",
    metrics: ["94% resolved", "24/7 coverage", "Escalates only when needed"],
    lines: [
      "Caller: I need help resetting access for my account.",
      "Agent: I can help with that. Let me verify the email first.",
      "Action: Support path completed, transcript saved.",
    ],
  },
  {
    id: "qualification",
    label: "Lead qualification",
    title: "Screen every inquiry with the same standard",
    description:
      "Collect the details that matter, score fit, and pass only the strongest opportunities to the team.",
    metrics: ["Lead score captured", "CRM-ready notes", "No missed intake"],
    lines: [
      "Agent: How many locations are you managing today?",
      "Caller: We have five now and two more opening soon.",
      "Action: Marked as high-intent multi-location prospect.",
    ],
  },
  {
    id: "after-hours",
    label: "After-hours coverage",
    title: "Stay available when your team is offline",
    description:
      "Keep the line active overnight, capture every request, and queue the right follow-ups for the morning.",
    metrics: ["Never miss a call", "Overnight capture", "Morning summary ready"],
    lines: [
      "Agent: Our team is offline right now, but I can help take care of this.",
      "Caller: I need a callback first thing in the morning.",
      "Action: Priority note added for next business day.",
    ],
  },
];

const features = [
  {
    title: "Sub-second responses",
    description: "Streaming voice infrastructure keeps conversations moving naturally instead of sounding like a form submission with a microphone.",
    icon: BoltIcon,
    tone: "wide",
  },
  {
    title: "Full audit trail",
    description: "Every call, transcript, handoff, and follow-up action is stored in one place for review and ops clarity.",
    icon: ShieldCheckIcon,
    tone: "wide",
  },
  {
    title: "Custom agents",
    description: "Set the voice, prompt, first response, and edge-case behavior without duct-taping tools together.",
    icon: SparklesIcon,
    tone: "small",
  },
  {
    title: "Real phone numbers",
    description: "Assign real numbers to real agents and route inbound conversations cleanly.",
    icon: PhoneArrowDownLeftIcon,
    tone: "small",
  },
  {
    title: "After-hours coverage",
    description: "Capture demand when your human team is offline and keep the queue warm.",
    icon: ClockIcon,
    tone: "small",
  },
  {
    title: "Analytics dashboard",
    description: "See outcomes, transcripts, volume, and agent behavior from one workspace.",
    icon: ChartBarSquareIcon,
    tone: "small",
  },
];

const testimonials = [
  {
    quote:
      "We finally have a front line that answers instantly, routes cleanly, and gives us transcripts we can actually act on.",
    name: "Maya Chen",
    role: "Operations Lead",
    company: "Northline Health",
  },
  {
    quote:
      "The biggest difference is operational clarity. We know what was said, what happened, and what needs follow-up after every call.",
    name: "Adrian Cole",
    role: "Revenue Director",
    company: "Ridge Commerce",
  },
  {
    quote:
      "We wanted something that felt like a real product, not a prompt demo. This gives us the workflow, the number routing, and the audit trail.",
    name: "Sara Mitchell",
    role: "Customer Experience",
    company: "Westbay Dental",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "$0",
    blurb: "For proving the workflow and getting the first agent live.",
    cta: "Start free",
    href: "/sign-up",
    highlighted: false,
    features: ["1 active agent", "Limited monthly minutes", "Transcript review", "Basic routing"],
  },
  {
    name: "Pro",
    price: "$149",
    blurb: "For teams that need real inbound coverage and cleaner operations.",
    cta: "Start building",
    href: "/sign-up",
    highlighted: true,
    features: ["Multiple agents", "Number assignment", "Call analytics", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    blurb: "For high-volume teams that need deployment depth and control.",
    cta: "Talk to sales",
    href: "/support",
    highlighted: false,
    features: ["Advanced rollout support", "Security review", "Custom workflows", "Deployment guidance"],
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function RevisedLandingPage() {
  const [activeUseCase, setActiveUseCase] = useState(useCases[0].id);
  const [openFaq, setOpenFaq] = useState(faqItems[0].question);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeUseCaseData = useMemo(
    () => useCases.find((item) => item.id === activeUseCase) ?? useCases[0],
    [activeUseCase],
  );

  return (
    <div className="landing-shell min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--landing-border)]/80 bg-white/88 backdrop-blur-xl">
        <div className="landing-container flex h-[4.5rem] items-center justify-between gap-6 py-4">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <Image src="/favicon.svg" alt="Yapsolutely" width={34} height={34} className="h-8 w-8 rounded-xl" />
            <div>
              <div className="landing-display text-[1.35rem] leading-none tracking-[-0.04em] text-[var(--landing-text)]">Yapsolutely</div>
              <div className="landing-body text-[0.68rem] uppercase tracking-[0.22em] text-[var(--landing-text-muted)]">Voice agent platform</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="landing-body text-[0.94rem] font-medium text-[var(--landing-text)]/88 transition hover:text-[var(--landing-accent)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-3 rounded-full border border-[var(--landing-border)] bg-white px-3 py-2">
            <div className="flex -space-x-2">
              {["#F5C7BB", "#E6D3C7", "#D95F3B"].map((color, index) => (
                <span
                  key={index}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white text-[0.65rem] font-semibold text-[var(--landing-text)]"
                  style={{ backgroundColor: color }}
                >
                  {String.fromCharCode(65 + index)}
                </span>
              ))}
            </div>
            <div className="landing-body text-[0.82rem] font-medium text-[var(--landing-text-muted)]">
              Trusted by operators building live phone workflows
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/sign-in" className="landing-button-secondary px-5 py-3 landing-body text-[0.92rem] font-medium">
              Sign in
            </Link>
            <Link href="/sign-up" className="landing-button-primary px-5 py-3 landing-body text-[0.92rem] font-semibold">
              Start building free
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--landing-border)] text-[var(--landing-text)] md:hidden"
            aria-label="Open navigation"
            aria-expanded={mobileMenuOpen}
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-[var(--landing-border)] bg-white md:hidden">
            <div className="landing-container flex flex-col gap-3 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="landing-body rounded-2xl border border-[var(--landing-border)] px-4 py-3 text-[0.95rem] font-medium text-[var(--landing-text)]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="landing-button-secondary inline-flex items-center justify-center px-5 py-3 landing-body text-[0.92rem] font-medium"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="landing-button-primary inline-flex items-center justify-center px-5 py-3 landing-body text-[0.92rem] font-semibold"
                >
                  Start building free
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section className="relative overflow-hidden pb-10 pt-10 sm:pt-14">
          <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(217,95,59,0.12),transparent_55%)]" />
          <div className="landing-container">
            <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <div className="landing-pill mb-6 inline-flex items-center gap-2 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--landing-accent)]" />
                  <span className="landing-body text-[0.84rem] font-medium text-[var(--landing-text)]">Handling calls now</span>
                </div>

                <h1 className="landing-display max-w-[11ch] text-[3.5rem] leading-[0.92] tracking-[-0.05em] text-[var(--landing-text)] sm:text-[4.7rem] lg:text-[6.3rem]">
                  AI agents that answer your phone
                </h1>

                <p className="landing-body mt-6 max-w-[36rem] text-[1.02rem] leading-8 text-[var(--landing-text-muted)] sm:text-[1.08rem]">
                  Build voice agents, assign real phone numbers, handle inbound calls, and review every transcript from one workspace built for operators, not demos.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href="/sign-up" className="landing-button-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 landing-body text-[0.96rem] font-semibold">
                    Start building free
                    <ArrowLongRightIcon className="h-5 w-5" />
                  </Link>
                  <Link href="#how-it-works" className="landing-button-secondary inline-flex items-center justify-center px-6 py-3.5 landing-body text-[0.96rem] font-medium">
                    See how it works
                  </Link>
                </div>

                <p className="landing-body mt-4 text-[0.86rem] text-[var(--landing-text-muted)]">No credit card required. Free plan available.</p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    ["<800ms", "voice response time"],
                    ["24/7", "inbound coverage"],
                    ["100%", "transcript visibility"],
                  ].map(([value, label]) => (
                    <div key={label} className="landing-card-soft px-5 py-4">
                      <div className="landing-display text-[2rem] leading-none tracking-[-0.04em] text-[var(--landing-text)]">{value}</div>
                      <div className="landing-body mt-2 text-[0.83rem] font-medium text-[var(--landing-text-muted)]">{label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
              >
                <div className="landing-card overflow-hidden p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between rounded-[1.2rem] border border-[var(--landing-border)] bg-[var(--landing-background-soft)] px-4 py-3">
                    <div className="flex gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff8d7a]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffd37a]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#7fcf9f]" />
                    </div>
                    <div className="landing-body rounded-full border border-[var(--landing-border)] bg-white px-3 py-1 text-[0.72rem] font-medium text-[var(--landing-text-muted)]">
                      yapsolutely.xyz
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[1.35rem] border border-[var(--landing-border)] bg-white">
                    <Image
                      src="/hero-dashboard.png"
                      alt="Yapsolutely workspace dashboard"
                      width={1641}
                      height={965}
                      priority
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden py-6">
          <div className="landing-container">
            <div className="mb-5 text-center landing-body text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[var(--landing-text-muted)]">
              Powered by
            </div>
            <div className="relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
              <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
              <div className="flex w-max animate-scroll-left gap-10 py-3">
                {[...marqueeLogos, ...marqueeLogos].map((logo, index) => (
                  <div key={`${logo.file}-${index}`} className="flex items-center gap-3 px-1">
                    <Image src={`/logos/${logo.file}.svg`} alt={logo.label} width={24} height={24} className="h-6 w-6" />
                    <span className="landing-body text-[0.95rem] font-semibold text-[var(--landing-text)]">{logo.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="landing-section">
          <div className="landing-container">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
              <div className="landing-body text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--landing-accent)]">How it works</div>
              <div className="mt-3 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                <h2 className="landing-display max-w-[10ch] text-[2.8rem] leading-[0.95] tracking-[-0.05em] text-[var(--landing-text)] sm:text-[3.7rem]">
                  Three steps to a working phone agent
                </h2>
                <p className="landing-body max-w-[34rem] text-[1rem] leading-8 text-[var(--landing-text-muted)] lg:justify-self-end">
                  The setup is simple on purpose. Define the behavior, attach a number, and review every call without digging through disconnected tools.
                </p>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  className="landing-card p-6 sm:p-7"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.42, delay: index * 0.07 }}
                >
                  <div className="landing-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--landing-accent)]">{step.eyebrow}</div>
                  <div className="mt-6 flex items-center gap-4">
                    <span className="landing-display text-[2.6rem] leading-none tracking-[-0.05em] text-[var(--landing-text)]">{step.number}</span>
                    <span className="h-px flex-1 bg-[var(--landing-border)]" />
                  </div>
                  <h3 className="landing-display mt-6 text-[2rem] leading-[0.96] tracking-[-0.04em] text-[var(--landing-text)]">{step.title}</h3>
                  <p className="landing-body mt-4 text-[0.98rem] leading-7 text-[var(--landing-text-muted)]">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section bg-[var(--landing-background-soft)]" id="use-cases">
          <div className="landing-container">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
              <div className="landing-body text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--landing-accent)]">Use cases</div>
              <div className="mt-3 grid gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
                <h2 className="landing-display max-w-[10ch] text-[2.8rem] leading-[0.95] tracking-[-0.05em] text-[var(--landing-text)] sm:text-[3.7rem]">
                  Built for every inbound call scenario
                </h2>
                <p className="landing-body max-w-[35rem] text-[1rem] leading-8 text-[var(--landing-text-muted)] lg:justify-self-end">
                  Sales, support, scheduling, and after-hours coverage all live in the same product pattern, which means less rework and faster deployment.
                </p>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.44fr_0.56fr]">
              <div className="flex flex-col gap-3">
                {useCases.map((item) => {
                  const active = item.id === activeUseCase;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveUseCase(item.id)}
                      className={`landing-card cursor-pointer text-left px-5 py-5 transition-all ${active ? "border-[var(--landing-accent)] bg-white shadow-[0_20px_50px_-30px_rgba(217,95,59,0.45)]" : "hover:-translate-y-0.5 hover:border-[color:var(--landing-accent)]/35"}`}
                    >
                      <div className="landing-body text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--landing-accent)]">{item.label}</div>
                      <div className="landing-display mt-3 text-[1.9rem] leading-[0.98] tracking-[-0.04em] text-[var(--landing-text)]">{item.title}</div>
                      <p className="landing-body mt-3 text-[0.95rem] leading-7 text-[var(--landing-text-muted)]">{item.description}</p>
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={activeUseCaseData.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="landing-card overflow-hidden bg-[var(--landing-dark)] p-6 text-white sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="landing-body text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-white/55">Live workflow preview</div>
                    <h3 className="landing-display mt-3 text-[2.25rem] leading-[0.97] tracking-[-0.04em] text-white">{activeUseCaseData.title}</h3>
                  </div>
                  <div className="rounded-full border border-white/12 bg-white/[0.06] p-3">
                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-white/80" />
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {activeUseCaseData.metrics.map((metric) => (
                      <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4">
                      <div className="landing-body text-[0.82rem] font-medium text-white/82">{metric}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5">
                  {activeUseCaseData.lines.map((line) => (
                    <div key={line} className="rounded-2xl border border-white/8 bg-white/[0.045] px-4 py-4 landing-body text-[0.94rem] leading-7 text-white/78">
                      {line}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="landing-section">
          <div className="landing-container">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
              <div className="landing-body text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--landing-accent)]">Features</div>
              <div className="mt-3 grid gap-4 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
                <h2 className="landing-display max-w-[10ch] text-[2.8rem] leading-[0.95] tracking-[-0.05em] text-[var(--landing-text)] sm:text-[3.7rem]">
                  The operator layer for voice agents
                </h2>
                <p className="landing-body max-w-[35rem] text-[1rem] leading-8 text-[var(--landing-text-muted)] lg:justify-self-end">
                  This is not just a prompt box with a phone number attached. The homepage needs to show the real product depth, and so does the product itself.
                </p>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ duration: 0.42, delay: index * 0.05 }}
                    className={`landing-card p-6 sm:p-7 ${feature.tone === "wide" ? "lg:col-span-3 lg:grid lg:grid-cols-[0.38fr_0.62fr] lg:items-start lg:gap-6" : ""}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--landing-background-soft)] text-[var(--landing-accent)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className={feature.tone === "wide" ? "lg:flex lg:items-start lg:justify-between lg:gap-6" : ""}>
                      <div>
                        <h3 className="landing-display mt-5 text-[2rem] leading-[0.97] tracking-[-0.04em] text-[var(--landing-text)]">{feature.title}</h3>
                        <p className="landing-body mt-3 max-w-[38rem] text-[0.97rem] leading-7 text-[var(--landing-text-muted)]">{feature.description}</p>
                      </div>
                      {feature.tone === "wide" ? (
                        <div className="mt-6 rounded-[1.4rem] border border-[var(--landing-border)] bg-[var(--landing-card)] p-5 lg:mt-0 lg:min-w-[290px]">
                          <div className="landing-body text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[var(--landing-accent)]">Operational proof</div>
                          <div className="landing-display mt-3 text-[2.4rem] leading-none tracking-[-0.05em] text-[var(--landing-text)]">
                            {feature.title === "Sub-second responses" ? "<800ms" : "100%"}
                          </div>
                          <p className="landing-body mt-2 text-[0.88rem] leading-6 text-[var(--landing-text-muted)]">
                            {feature.title === "Sub-second responses"
                              ? "Average voice response target for natural inbound conversations."
                              : "Transcript and action visibility for post-call review."}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="landing-section bg-[var(--landing-background-soft)]">
          <div className="landing-container">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
              <div className="landing-body text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--landing-accent)]">Social proof</div>
              <div className="mt-3 grid gap-4 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
                <h2 className="landing-display max-w-[10ch] text-[2.8rem] leading-[0.95] tracking-[-0.05em] text-[var(--landing-text)] sm:text-[3.7rem]">
                  What strong operations sound like after deployment
                </h2>
                <p className="landing-body max-w-[35rem] text-[1rem] leading-8 text-[var(--landing-text-muted)] lg:justify-self-end">
                  The brief called for more proof and less template energy. That means showing outcomes, not just claiming them.
                </p>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {testimonials.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.38, delay: index * 0.06 }}
                  className="landing-card p-6 sm:p-7"
                >
                  <div className="mb-5 flex items-center gap-1 text-[var(--landing-accent)]">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span key={starIndex}>★</span>
                    ))}
                  </div>
                  <p className="landing-body text-[1rem] leading-8 text-[var(--landing-text)]">“{item.quote}”</p>
                  <div className="mt-6 border-t border-[var(--landing-border)] pt-5">
                    <div className="landing-display text-[1.55rem] leading-none tracking-[-0.04em] text-[var(--landing-text)]">{item.name}</div>
                    <div className="landing-body mt-2 text-[0.88rem] font-medium text-[var(--landing-text-muted)]">
                      {item.role} · {item.company}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="landing-section" id="pricing">
          <div className="landing-container">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
              <div className="landing-body text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--landing-accent)]">Pricing</div>
              <div className="mt-3 grid gap-4 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
                <h2 className="landing-display max-w-[10ch] text-[2.8rem] leading-[0.95] tracking-[-0.05em] text-[var(--landing-text)] sm:text-[3.7rem]">
                  Start lean. Scale when the workflow proves out.
                </h2>
                <p className="landing-body max-w-[35rem] text-[1rem] leading-8 text-[var(--landing-text-muted)] lg:justify-self-end">
                  Pricing should feel simple on the surface and credible underneath. The goal is to make the first yes easy without flattening the product.
                </p>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.38, delay: index * 0.05 }}
                  className={`p-6 sm:p-7 ${tier.highlighted ? "landing-card border-[var(--landing-accent)] shadow-[0_24px_60px_-28px_rgba(217,95,59,0.4)]" : "landing-card-soft"}`}
                >
                  <div className="landing-body text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-[var(--landing-accent)]">{tier.name}</div>
                  <div className="landing-display mt-4 text-[3rem] leading-none tracking-[-0.05em] text-[var(--landing-text)]">{tier.price}</div>
                  <p className="landing-body mt-4 min-h-[4rem] text-[0.95rem] leading-7 text-[var(--landing-text-muted)]">{tier.blurb}</p>
                  <Link
                    href={tier.href}
                    className={`${tier.highlighted ? "landing-button-primary" : "landing-button-secondary"} mt-6 inline-flex w-full items-center justify-center px-5 py-3 landing-body text-[0.95rem] font-semibold`}
                  >
                    {tier.cta}
                  </Link>
                  <div className="mt-6 space-y-3 border-t border-[var(--landing-border)] pt-6">
                    {tier.features.map((feature) => (
                      <div key={feature} className="landing-body flex items-center gap-3 text-[0.92rem] text-[var(--landing-text)]">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--landing-background)] text-[var(--landing-accent)]">•</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-4 pt-2 sm:px-6 lg:px-8">
          <div className="landing-container">
            <div className="overflow-hidden rounded-[2rem] bg-[var(--landing-dark)] px-6 py-7 text-white sm:px-10 sm:py-9">
              <div className="grid gap-8 sm:grid-cols-3">
                {[
                  ["<800ms", "voice response latency"],
                  ["24/7", "agent availability"],
                  ["100%", "transcript review"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <div className="landing-display text-[3rem] leading-none tracking-[-0.05em] text-white sm:text-[3.6rem]">{value}</div>
                    <div className="landing-body mt-2 text-[0.94rem] font-medium text-white/65">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section">
          <div className="landing-container">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
                <div className="landing-body text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[var(--landing-accent)]">FAQ</div>
                <h2 className="landing-display mt-3 max-w-[10ch] text-[2.8rem] leading-[0.95] tracking-[-0.05em] text-[var(--landing-text)] sm:text-[3.7rem]">
                  Everything you need to know before going live
                </h2>
                <p className="landing-body mt-4 max-w-[32rem] text-[1rem] leading-8 text-[var(--landing-text-muted)]">
                  The core questions are operational, not theoretical. The answers should feel the same way.
                </p>
              </motion.div>

              <div className="space-y-3">
                {faqItems.map((item, index) => {
                  const open = openFaq === item.question;
                  return (
                    <motion.div
                      key={item.question}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, amount: 0.18 }}
                      transition={{ duration: 0.36, delay: index * 0.04 }}
                      className="landing-card overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? "" : item.question)}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                      >
                        <span className="landing-body text-[1rem] font-semibold text-[var(--landing-text)]">{item.question}</span>
                        <ChevronDownIcon className={`h-5 w-5 shrink-0 text-[var(--landing-text-muted)] transition-transform ${open ? "rotate-180" : ""}`} />
                      </button>
                      <motion.div
                        initial={false}
                        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                          <p className="landing-body max-w-[46rem] text-[0.95rem] leading-7 text-[var(--landing-text-muted)]">{item.answer}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 pt-4 sm:px-6 lg:px-8">
          <div className="landing-container">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
              className="overflow-hidden rounded-[2rem] bg-[var(--landing-dark)] px-6 py-8 text-white sm:px-10 sm:py-12 lg:px-14 lg:py-14"
            >
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <div className="landing-body text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-white/55">Get started</div>
                  <h2 className="landing-display mt-3 max-w-[10ch] text-[3rem] leading-[0.93] tracking-[-0.05em] text-white sm:text-[4rem]">
                    Stop losing calls. Start closing them.
                  </h2>
                  <p className="landing-body mt-5 max-w-[33rem] text-[1rem] leading-8 text-white/66">
                    Every missed call is missed intent. Deploy an AI voice agent in minutes and keep the line working even when your team is not.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link href="/sign-up" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 landing-body text-[0.96rem] font-semibold text-[var(--landing-dark)] transition hover:bg-[var(--landing-background-soft)] hover:scale-[1.01]">
                      Get started free
                      <ArrowLongRightIcon className="h-5 w-5" />
                    </Link>
                    <Link href="/docs" className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-3.5 landing-body text-[0.96rem] font-medium text-white transition hover:bg-white/8 hover:scale-[1.01]">
                      See the docs
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[0.62fr_0.38fr] lg:items-stretch">
                  <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-6 sm:p-7">
                    <MascotSignal className="h-28 w-28 text-[#f1b19d]" />
                    <div className="landing-display mt-6 text-[2.1rem] leading-[0.97] tracking-[-0.04em] text-white">A brand cue that feels like Yapsolutely</div>
                    <p className="landing-body mt-4 max-w-[28rem] text-[0.94rem] leading-7 text-white/64">
                      Friendly enough to feel human, structured enough to feel operational. A simple signal mark gives the landing page more identity without turning it into a mascot parade.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                    {[
                      { icon: MicrophoneIcon, title: "Voice-first", copy: "Built for real phone conversations, not chatbot demos." },
                      { icon: ShieldCheckIcon, title: "Reviewable", copy: "Transcripts and actions stay visible after every call." },
                      { icon: ChartBarSquareIcon, title: "Operational", copy: "One workspace for agents, calls, numbers, and outcomes." },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-5">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white/85">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="landing-display mt-5 text-[1.7rem] leading-[0.98] tracking-[-0.04em] text-white">{item.title}</div>
                          <p className="landing-body mt-3 text-[0.92rem] leading-7 text-white/64">{item.copy}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--landing-border)] bg-[var(--landing-background-soft)] py-12">
        <div className="landing-container">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
            <div>
              <Link href="/" className="flex items-center gap-3 cursor-pointer">
                <Image src="/favicon.svg" alt="Yapsolutely" width={34} height={34} className="h-8 w-8 rounded-xl" />
                <span className="landing-display text-[1.35rem] leading-none tracking-[-0.04em] text-[var(--landing-text)]">Yapsolutely</span>
              </Link>
              <p className="landing-body mt-4 max-w-[18rem] text-[0.94rem] leading-7 text-[var(--landing-text-muted)]">
                AI voice agents that answer your phone, handle inbound calls, and give your team a cleaner operational layer.
              </p>
            </div>

            <FooterColumn
              title="Product"
              links={[
                ["Features", "#features"],
                ["Pricing", "/pricing"],
                ["Changelog", "/changelog"],
                ["Docs", "/docs"],
                ["API", "/docs/api"],
              ]}
            />

            <FooterColumn
              title="Company"
              links={[
                ["About", "/about"],
                ["Support", "/support"],
                ["Compliance", "/compliance"],
                ["Contact", "mailto:hello@yapsolutely.com"],
              ]}
            />

            <FooterColumn
              title="Legal"
              links={[
                ["Terms", "/terms"],
                ["Privacy", "/privacy"],
              ]}
            />
          </div>

          <div className="mt-10 border-t border-[var(--landing-border)] pt-6 landing-body text-[0.85rem] text-[var(--landing-text-muted)]">
            © {new Date().getFullYear()} Yapsolutely, Inc.
          </div>
        </div>
      </footer>
    </div>
  );
}

function MascotSignal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill="currentColor" fillOpacity="0.12" />
      <circle cx="60" cy="48" r="18" fill="currentColor" fillOpacity="0.9" />
      <path
        d="M34 89C38 73 48 65 60 65C72 65 82 73 86 89"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path d="M88 31C98 35 104 43 106 54" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      <path d="M95 23C108 28 116 39 118 53" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      <path d="M32 31C22 35 16 43 14 54" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
      <path d="M25 23C12 28 4 39 2 53" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="landing-body text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[var(--landing-text-muted)]">{title}</div>
      <div className="mt-4 flex flex-col gap-3">
        {links.map(([label, href]) => {
          const sharedClassName = "landing-body text-[0.95rem] font-medium text-[var(--landing-text)] transition hover:text-[var(--landing-accent)]";

          if (href.startsWith("mailto:")) {
            return (
              <a key={label} href={href} className={sharedClassName}>
                {label}
              </a>
            );
          }

          return (
            <Link key={label} href={href} className={sharedClassName}>
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}