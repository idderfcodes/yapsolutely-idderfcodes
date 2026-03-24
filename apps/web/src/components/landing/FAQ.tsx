"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Yapsolutely?",
    answer:
      "Yapsolutely is an AI voice agent platform that lets you build, deploy, and manage phone-based AI agents. Your agents can answer inbound calls, handle scheduling, qualify leads, and more - with full transcripts and call logs.",
  },
  {
    question: "How do I set up my first voice agent?",
    answer:
      "Create an account, navigate to the Agents page, and click \"Create Agent.\" Give your agent a name, write a system prompt describing its personality and instructions, assign a phone number, and you're live.",
  },
  {
    question: "What phone numbers are supported?",
    answer:
      "Yapsolutely supports US and international phone numbers through our Twilio integration. You can purchase new numbers or bring your own existing numbers to the platform.",
  },
  {
    question: "Can I review what my agent said on calls?",
    answer:
      "Yes. Every call is transcribed in real time. You can view full conversation transcripts, call duration, caller info, and agent performance metrics from the Calls dashboard.",
  },
  {
    question: "Is my data secure?",
    answer:
      "All data is encrypted in transit and at rest. Call recordings and transcripts are stored securely, and access is scoped to your workspace. We follow industry-standard security practices.",
  },
  {
    question: "What AI models power the voice agents?",
    answer:
      "Our agents are powered by Anthropic's Claude models for natural language understanding and generation, combined with Deepgram for real-time speech-to-text and text-to-speech.",
  },
  {
    question: "Can I customize how my agent sounds and behaves?",
    answer:
      "Absolutely. You control the system prompt, voice settings, response style, and specific instructions for how your agent handles different scenarios. You can also use our AI-powered prompt improver to refine your agent's behavior.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "We offer a free tier to get started with limited minutes and one agent. Paid plans unlock more agents, higher call volumes, advanced analytics, and priority support.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border-soft/40 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-display text-[1rem] sm:text-[1.05rem] font-medium text-text-strong pr-4 group-hover:text-foreground transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-4.5 h-4.5 text-text-body shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-60 pb-5" : "max-h-0"}`}
      >
        <p className="font-body text-body-md text-text-body leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

const FAQ = () => {
  return (
    <section className="py-16 sm:py-20 px-5 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-[1.6rem] sm:text-[2rem] font-semibold tracking-[-0.03em] text-text-strong leading-[1.15] mb-3">
            Frequently asked questions
          </h2>
          <p className="font-body text-body-md text-text-body max-w-xl mx-auto">
            Everything you need to know about building and deploying AI voice agents.
          </p>
        </div>
        <div className="divide-y-0">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
