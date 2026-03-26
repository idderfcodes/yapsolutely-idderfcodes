"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type MenuToggleIconProps = React.ComponentProps<"div"> & {
  open?: boolean;
  duration?: number;
};

export function MenuToggleIcon({
  open = false,
  duration = 300,
  className,
  ...props
}: MenuToggleIconProps) {
  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      aria-hidden="true"
      {...props}
    >
      <span
        className="absolute block h-0.5 w-5 rounded-full bg-current"
        style={{
          transitionDuration: `${duration}ms`,
          transform: open ? "rotate(45deg)" : "translateY(-6px)",
          transitionProperty: "transform, opacity",
        }}
      />
      <span
        className="absolute block h-0.5 w-5 rounded-full bg-current"
        style={{
          transitionDuration: `${duration}ms`,
          opacity: open ? 0 : 1,
          transitionProperty: "transform, opacity",
        }}
      />
      <span
        className="absolute block h-0.5 w-5 rounded-full bg-current"
        style={{
          transitionDuration: `${duration}ms`,
          transform: open ? "rotate(-45deg)" : "translateY(6px)",
          transitionProperty: "transform, opacity",
        }}
      />
    </div>
  );
}