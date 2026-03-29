"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const easeOutCurve: [number, number, number, number] = [0.22, 1, 0.36, 1];
const easeInCurve: [number, number, number, number] = [0.4, 0, 1, 1];

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
  pauseOnReducedMotion?: boolean;
}

export default function AnimatedTextCycle({
  words,
  interval = 5000,
  className = "",
  pauseOnReducedMotion = true,
}: AnimatedTextCycleProps) {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldPauseCycle = shouldReduceMotion && pauseOnReducedMotion;
  const shouldAnimate = !shouldReduceMotion;

  useEffect(() => {
    if (shouldPauseCycle || words.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((previousIndex) => (previousIndex + 1) % words.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, shouldPauseCycle, words.length]);

  const longestWord = useMemo(
    () => words.reduce((longest, word) => (word.length > longest.length ? word : longest), words[0] ?? ""),
    [words],
  );

  const variants = {
    hidden: {
      y: -18,
      opacity: 0,
      filter: "blur(8px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.38,
        ease: easeOutCurve,
      },
    },
    exit: {
      y: 18,
      opacity: 0,
      filter: "blur(8px)",
      transition: {
        duration: 0.28,
        ease: easeInCurve,
      },
    },
  };

  return (
    <span className="relative inline-grid align-baseline">
      <span aria-hidden="true" className={`invisible col-start-1 row-start-1 whitespace-nowrap ${className}`}>
        {longestWord}
      </span>

      {shouldAnimate ? (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[currentIndex]}
            className={`col-start-1 row-start-1 inline-block whitespace-nowrap ${className}`}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span className={`col-start-1 row-start-1 inline-block whitespace-nowrap ${className}`}>
          {words[currentIndex]}
        </span>
      )}
    </span>
  );
}
