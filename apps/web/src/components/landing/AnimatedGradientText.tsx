"use client";

import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  text: string;
  /** How many words (from the chosen position) receive the gradient */
  gradientWordCount?: number;
  gradientPosition?: "start" | "end";
  /** Ordered color stops — will be looped to create the pan effect */
  colors?: string[];
  animationSpeed?: "slow" | "normal" | "fast";
  className?: string;
  style?: React.CSSProperties;
}

const durationMap: Record<string, string> = {
  slow: "5s",
  normal: "3s",
  fast: "1.8s",
};

export default function AnimatedGradientText({
  text,
  gradientWordCount = 1,
  gradientPosition = "end",
  colors = ["#ee303a", "#ff631e", "#ff7b30", "#ffd101"],
  animationSpeed = "normal",
  className,
  style,
}: AnimatedGradientTextProps) {
  const words = text.split(" ");
  const count = Math.min(gradientWordCount, words.length);

  const gradientWords =
    gradientPosition === "end"
      ? words.slice(words.length - count).join(" ")
      : words.slice(0, count).join(" ");

  const plainWords =
    gradientPosition === "end"
      ? words.slice(0, words.length - count).join(" ")
      : words.slice(count).join(" ");

  const gradient = `linear-gradient(90deg, ${[...colors, colors[0]].join(", ")})`;
  const duration = durationMap[animationSpeed] ?? "3s";

  const gradientSpan = (
    <span
      style={{
        background: gradient,
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: `yap-gradient-pan ${duration} linear infinite`,
      }}
    >
      {gradientWords}
    </span>
  );

  return (
    <span className={cn("inline", className)} style={style}>
      {gradientPosition === "end" ? (
        <>
          {plainWords} {gradientSpan}
        </>
      ) : (
        <>
          {gradientSpan} {plainWords}
        </>
      )}
    </span>
  );
}
