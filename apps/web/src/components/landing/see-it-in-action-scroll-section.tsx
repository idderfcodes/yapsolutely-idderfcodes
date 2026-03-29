"use client";

import { motion } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

import VideoPlayer from "../ui/video-player";
import { BGPattern } from "@/components/ui/bg-pattern";

const sectionReveal = {
  hidden: {
    y: 28,
    opacity: 0,
    scale: 0.985,
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
};

const callProofStats = [
  {
    label: "Reply speed",
    value: "Live",
    icon: ClockIcon,
  },
  {
    label: "Transcript",
    value: "Saved",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    label: "Outcome",
    value: "Tracked",
    icon: CheckCircleIcon,
  },
] as const;

const transcriptTurns = [
  {
    speaker: "Caller",
    copy: "I need after-hours coverage for three locations and want to know what setup looks like.",
    tone: "caller" as const,
  },
  {
    speaker: "Agent",
    copy: "I can help with that. I’ll capture your locations, confirm your timeline, and queue a follow-up for the team.",
    tone: "agent" as const,
  },
  {
    speaker: "Action",
    copy: "Lead captured • follow-up requested • transcript stored in the dashboard",
    tone: "action" as const,
  },
];

const proofChecklist = [
  "Hear the live response, not a stitched mockup",
  "Review exactly what the caller asked for afterward",
  "Track actions and outcomes alongside the transcript",
];

export function SeeItInActionScrollSection() {
  return (
    <section className="landing-section relative overflow-hidden bg-black py-14 sm:py-16 lg:py-20">
      <BGPattern
        variant="dots"
        size={26}
        fill="#ffffff"
        mask="fade-edges"
        className="opacity-[0.04]"
      />
      <div className="pointer-events-none absolute left-[12%] top-[18%] h-[24rem] w-[24rem] rounded-full bg-[var(--color-accent-primary)] opacity-[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[8%] right-[8%] h-[20rem] w-[20rem] rounded-full bg-[var(--color-accent-secondary)] opacity-[0.06] blur-[120px]" />

      <div className="landing-container relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          variants={sectionReveal}
          className="mx-auto max-w-[44rem] text-center"
        >
          <div className="landing-pill mx-auto inline-flex items-center px-4 py-2 landing-body text-[12px] font-medium text-[var(--color-accent-primary)]">
            See it in action
          </div>
          <h2 className="landing-display landing-display-1 mx-auto mt-6 max-w-[15ch] text-[var(--color-text-on-dark)]">
            A real call, with proof after.
          </h2>
          <p className="landing-body landing-body-1-regular mx-auto mt-4 max-w-[34rem] text-[var(--color-text-muted-on-dark)]">
            Watch the agent handle the conversation live, then review the transcript, action trail, and outcome your team actually keeps.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.22fr)_minmax(300px,0.78fr)] lg:items-stretch xl:gap-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.14 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            variants={sectionReveal}
            className="overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.03)] shadow-[0_30px_80px_-42px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:rounded-[32px]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-primary)] opacity-50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent-primary)]" />
                </span>
                <span className="landing-body text-[12px] font-medium text-[var(--color-text-on-dark)]">
                  Inbound call walkthrough
                </span>
              </div>
              <span className="landing-body rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-[var(--color-text-muted-on-dark)]">
                Live demo video
              </span>
            </div>

            <div className="p-3 sm:p-4">
              <VideoPlayer
                src="/videos/demo-transcript.webm"
                label="Yapsolutely inbound call demo"
                autoPlay
                loop
                muted
                preload="metadata"
                className="w-full overflow-hidden rounded-[22px] border border-white/8 bg-[#0b0b0b] shadow-none sm:rounded-[26px]"
                videoClassName="aspect-[1213/667] w-full rounded-[22px] object-cover sm:rounded-[26px]"
              />
            </div>

            <div className="grid gap-3 border-t border-white/8 px-4 py-4 sm:px-5 md:grid-cols-3">
              {callProofStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-3"
                  >
                    <div className="flex items-center gap-2 text-[var(--color-accent-primary)]">
                      <Icon className="h-4 w-4" />
                      <span className="landing-body text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted-on-dark)]">
                        {stat.label}
                      </span>
                    </div>
                    <div className="landing-display mt-3 text-[1.45rem] leading-none tracking-[-0.05em] text-[var(--color-text-on-dark)]">
                      {stat.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="flex flex-col gap-4 sm:gap-5">
            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.52, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
              variants={sectionReveal}
              className="rounded-[26px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5 shadow-[0_24px_64px_-40px_rgba(0,0,0,0.78)] backdrop-blur-sm sm:p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-[var(--color-accent-primary)]">
                  <ChatBubbleLeftRightIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted-on-dark)]">
                    Transcript preview
                  </div>
                  <div className="landing-body mt-1 text-[14px] font-medium text-[var(--color-text-on-dark)]">
                    What the team can review after the call
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {transcriptTurns.map((turn) => (
                  <div
                    key={`${turn.speaker}-${turn.copy}`}
                    className={
                      turn.tone === "agent"
                        ? "rounded-[18px] border border-[rgba(255,99,30,0.25)] bg-[rgba(255,99,30,0.08)] px-4 py-3"
                        : turn.tone === "action"
                          ? "rounded-[18px] border border-white/8 bg-white/[0.03] px-4 py-3"
                          : "rounded-[18px] border border-white/8 bg-black/30 px-4 py-3"
                    }
                  >
                    <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted-on-dark)]">
                      {turn.speaker}
                    </div>
                    <p className="landing-body mt-2 text-[14px] leading-6 text-[var(--color-text-on-dark)]">
                      {turn.copy}
                    </p>
                  </div>
                ))}
              </div>
            </motion.article>

            <motion.article
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.52, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              variants={sectionReveal}
              className="rounded-[26px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5 shadow-[0_24px_64px_-40px_rgba(0,0,0,0.78)] backdrop-blur-sm sm:p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-[var(--color-accent-primary)]">
                  <PhoneIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="landing-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text-muted-on-dark)]">
                    Why this matters
                  </div>
                  <div className="landing-body mt-1 text-[14px] font-medium text-[var(--color-text-on-dark)]">
                    Not just a flashy playback block
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {proofChecklist.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[18px] border border-white/8 bg-black/30 px-4 py-3"
                  >
                    <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent-primary)]" />
                    <p className="landing-body text-[14px] leading-6 text-[var(--color-text-on-dark)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
