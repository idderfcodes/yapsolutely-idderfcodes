"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  PhoneIcon,
  SparklesIcon,
  ShieldCheckIcon,
  Bars3Icon,
  XMarkIcon,
  ChatBubbleLeftIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

// Color palette from revised-LP.md
const palette = {
  bg: "#FFFFFF",
  bgAlt: "#F7F4EF",
  text: "#141414",
  textMuted: "#6B6860",
  accent: "#D95F3B",
  border: "#E8E4DE",
  cardBg: "#F0EDE8",
  dark: "#141414",
};

// Reusable motion variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ─── NAVBAR ───
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ borderColor: palette.border, backgroundColor: palette.bg }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold" style={{ color: palette.text }}>
          Yapsolutely
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-sm" style={{ color: palette.textMuted }}>
            Product
          </Link>
          <Link href="#" className="text-sm" style={{ color: palette.textMuted }}>
            Pricing
          </Link>
          <Link href="#" className="text-sm" style={{ color: palette.textMuted }}>
            Docs
          </Link>
          <Link href="#" className="text-sm" style={{ color: palette.textMuted }}>
            About
          </Link>
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="rounded-full"
              style={{ color: palette.text }}
            >
              Sign in
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              className="rounded-full text-white"
              style={{ backgroundColor: palette.accent }}
            >
              Start building free
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
          style={{ color: palette.text }}
        >
          {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t"
          style={{ borderColor: palette.border }}
        >
          <div className="px-6 py-4 space-y-3 flex flex-col">
            <Link href="#" className="text-sm" style={{ color: palette.textMuted }}>
              Product
            </Link>
            <Link href="#" className="text-sm" style={{ color: palette.textMuted }}>
              Pricing
            </Link>
            <Link href="#" className="text-sm" style={{ color: palette.textMuted }}>
              Docs
            </Link>
            <Link href="/sign-up" className="pt-2">
              <Button className="w-full rounded-full text-white" style={{ backgroundColor: palette.accent }}>
                Start building free
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

// ─── HERO ───
function Hero() {
  return (
    <section className="pt-32 pb-20 px-6" style={{ backgroundColor: palette.bg }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Copy */}
          <motion.div variants={fadeIn} className="space-y-6">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
              style={{ borderColor: palette.border, backgroundColor: palette.cardBg }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: palette.accent }}
              />
              <span className="text-xs font-medium" style={{ color: palette.textMuted }}>
                Handling calls now
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeIn}
              className="text-5xl lg:text-6xl font-bold leading-tight"
              style={{
                color: palette.text,
                fontFamily: "var(--font-bagoss)",
                letterSpacing: "-0.02em",
              }}
            >
              AI agents that answer your phone
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeIn}
              className="text-lg max-w-md"
              style={{ color: palette.textMuted, fontFamily: "var(--font-inter)" }}
            >
              Build voice agents, assign real phone numbers, handle inbound calls. One workspace. Full transcripts.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="rounded-full text-white w-full sm:w-auto"
                  style={{ backgroundColor: palette.accent }}
                >
                  Start building free
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="#how">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full w-full sm:w-auto"
                  style={{ borderColor: palette.border, color: palette.text }}
                >
                  See how it works
                </Button>
              </Link>
            </motion.div>

            {/* Microcopy */}
            <motion.p
              variants={fadeIn}
              className="text-xs pt-2"
              style={{ color: palette.textMuted, fontFamily: "var(--font-inter)" }}
            >
              No credit card required. Free plan available.
            </motion.p>
          </motion.div>

          {/* Right: Screenshot */}
          <motion.div
            variants={fadeIn}
            className="relative rounded-xl overflow-hidden shadow-lg border"
            style={{ borderColor: palette.border }}
          >
            <img
              src="/hero-dashboard.png"
              alt="Yapsolutely dashboard"
              className="w-full h-auto"
            />
          </motion.div>
        </motion.div>

        {/* Stats below */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-6 mt-16 pt-12 border-t"
          style={{ borderColor: palette.border }}
        >
          {[
            { stat: "< 800ms", label: "Voice response" },
            { stat: "24/7", label: "Availability" },
            { stat: "100%", label: "Transcribed" },
          ].map((item) => (
            <motion.div key={item.label} variants={fadeIn} className="text-center">
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: palette.text, fontFamily: "var(--font-bagoss)" }}
              >
                {item.stat}
              </div>
              <div className="text-xs" style={{ color: palette.textMuted }}>
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── LOGO MARQUEE ───
function LogoMarquee() {
  const logos = [
    "Twilio",
    "Deepgram",
    "Anthropic",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "Tailwind",
    "Node.js",
    "Docker",
    "Vercel",
  ];

  return (
    <section
      className="py-12 px-6 border-t border-b"
      style={{ borderColor: palette.border, backgroundColor: palette.bgAlt }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs font-medium mb-8" style={{ color: palette.textMuted }}>
          POWERED BY
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          {logos.map((logo) => (
            <div
              key={logo}
              className="text-sm font-medium"
              style={{ color: palette.textMuted }}
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ───
function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Define Your Agent",
      desc: "Set voice, tone, routing logic. Configure what your agent says and how it handles edge cases.",
    },
    {
      number: "02",
      title: "Assign a Number and Go Live",
      desc: "Provision a phone number, attach it to your agent, and start receiving inbound calls.",
    },
    {
      number: "03",
      title: "Review Every Call",
      desc: "Read transcripts, track performance, and have a full audit trail on every interaction.",
    },
  ];

  return (
    <section id="how" className="py-20 px-6" style={{ backgroundColor: palette.bg }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: palette.text, fontFamily: "var(--font-bagoss)" }}
          >
            Three steps to a working phone agent
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: palette.textMuted }}>
            Everything you need to build, deploy, and monitor voice agents that actually work.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeIn}
              className="p-6 rounded-lg border"
              style={{ borderColor: palette.border, backgroundColor: palette.cardBg }}
            >
              <div
                className="text-4xl font-bold mb-3"
                style={{ color: palette.accent, fontFamily: "var(--font-bagoss)" }}
              >
                {step.number}
              </div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: palette.text, fontFamily: "var(--font-bagoss)" }}
              >
                {step.title}
              </h3>
              <p className="text-sm" style={{ color: palette.textMuted }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FEATURES BENTO ───
function Features() {
  return (
    <section
      className="py-20 px-6 border-t"
      style={{
        borderColor: palette.border,
        backgroundColor: palette.bgAlt,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: palette.text, fontFamily: "var(--font-bagoss)" }}
          >
            Everything you need
          </h2>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Large cards */}
          {[
            {
              title: "Sub-second Responses",
              desc: "< 800ms latency. Streaming STT + LLM + TTS pipeline.",
              icon: SparklesIcon,
            },
            {
              title: "Full Audit Trail",
              desc: "100% transcribed. Every event logged and reviewable.",
              icon: ShieldCheckIcon,
            },
            {
              title: "Custom Agents",
              desc: "Prompt editor, voice settings, routing logic.",
              icon: PhoneIcon,
            },
            {
              title: "Real Phone Numbers",
              desc: "US + international. Provisioned via Twilio.",
              icon: ChatBubbleLeftIcon,
            },
            {
              title: "After-hours Coverage",
              desc: "Never miss a call. Agent runs 24/7.",
              icon: ClockIcon,
            },
            {
              title: "Analytics Dashboard",
              desc: "Track call outcomes, agent performance, trends.",
              icon: ChartBarIcon,
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn}
              className="p-6 rounded-lg border"
              style={{ borderColor: palette.border, backgroundColor: palette.bg }}
            >
              <feature.icon
                className="w-6 h-6 mb-4"
                style={{ color: palette.accent }}
              />
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: palette.text, fontFamily: "var(--font-bagoss)" }}
              >
                {feature.title}
              </h3>
              <p className="text-sm" style={{ color: palette.textMuted }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ───
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is Yapsolutely?",
      a: "An AI voice agent platform that lets you build, deploy, and manage phone agents. Your agents handle inbound calls with full transcripts and call logs.",
    },
    {
      q: "How do I set up my first voice agent?",
      a: "Create an account, write a system prompt describing your agent, assign a phone number, and you're live.",
    },
    {
      q: "What phone numbers are supported?",
      a: "US and international numbers through Twilio. You can purchase new or bring existing.",
    },
    {
      q: "Can I review what my agent said?",
      a: "Yes. Every call is transcribed in real time. View full conversations, duration, and performance metrics.",
    },
    {
      q: "Is my data secure?",
      a: "All data encrypted in transit and at rest. Industry-standard security practices. Full audit trail.",
    },
    {
      q: "What AI powers the agents?",
      a: "Anthropic's Claude for language understanding, Deepgram for real-time speech, Twilio for telephony.",
    },
  ];

  return (
    <section className="py-20 px-6" style={{ backgroundColor: palette.bg }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl font-bold mb-3"
            style={{ color: palette.text, fontFamily: "var(--font-bagoss)" }}
          >
            Frequently asked questions
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn}
              className="border rounded-lg"
              style={{ borderColor: palette.border }}
            >
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full p-4 text-left font-bold flex items-center justify-between"
                style={{ color: palette.text, fontFamily: "var(--font-bagoss)" }}
              >
                {faq.q}
                <span>{open === idx ? "−" : "+"}</span>
              </button>
              {open === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-4 border-t"
                  style={{ borderColor: palette.border, color: palette.textMuted }}
                >
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ───
function CTABanner() {
  return (
    <section
      className="py-20 px-6"
      style={{ backgroundColor: palette.dark }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-bold mb-4"
          style={{
            color: palette.bg,
            fontFamily: "var(--font-bagoss)",
            letterSpacing: "-0.02em",
          }}
        >
          Stop losing calls. Start closing them.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg mb-8 opacity-70"
          style={{ color: palette.bg }}
        >
          Every missed call is a missed opportunity. Deploy an AI voice agent in minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/sign-up">
            <Button
              size="lg"
              className="rounded-full text-white"
              style={{ backgroundColor: palette.accent }}
            >
              Get started free
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/docs">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
              style={{ borderColor: palette.bg, color: palette.bg }}
            >
              See the docs
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer
      className="py-12 px-6 border-t"
      style={{
        borderColor: palette.border,
        backgroundColor: palette.bgAlt,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3
              className="font-bold mb-2"
              style={{ color: palette.text, fontFamily: "var(--font-bagoss)" }}
            >
              Yapsolutely
            </h3>
            <p className="text-xs" style={{ color: palette.textMuted }}>
              AI voice agents for your business.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4
              className="text-xs font-bold mb-3 uppercase"
              style={{ color: palette.textMuted }}
            >
              Product
            </h4>
            <div className="space-y-2 text-xs">
              <Link href="#" style={{ color: palette.textMuted }}>
                Features
              </Link>
              <Link href="#" style={{ color: palette.textMuted }}>
                Pricing
              </Link>
              <Link href="#" style={{ color: palette.textMuted }}>
                Docs
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-xs font-bold mb-3 uppercase"
              style={{ color: palette.textMuted }}
            >
              Company
            </h4>
            <div className="space-y-2 text-xs">
              <Link href="#" style={{ color: palette.textMuted }}>
                About
              </Link>
              <Link href="#" style={{ color: palette.textMuted }}>
                Support
              </Link>
              <Link href="mailto:hello@yapsolutely.com" style={{ color: palette.textMuted }}>
                Contact
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="text-xs font-bold mb-3 uppercase"
              style={{ color: palette.textMuted }}
            >
              Legal
            </h4>
            <div className="space-y-2 text-xs">
              <Link href="#" style={{ color: palette.textMuted }}>
                Terms
              </Link>
              <Link href="#" style={{ color: palette.textMuted }}>
                Privacy
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="text-center text-xs border-t pt-8"
          style={{
            borderColor: palette.border,
            color: palette.textMuted,
          }}
        >
          © {new Date().getFullYear()} Yapsolutely, Inc.
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ───
export default function Home() {
  return (
    <main style={{ backgroundColor: palette.bg }}>
      <Navbar />
      <Hero />
      <LogoMarquee />
      <HowItWorks />
      <Features />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
