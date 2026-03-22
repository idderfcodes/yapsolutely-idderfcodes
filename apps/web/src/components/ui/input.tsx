import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-border-soft bg-surface-panel px-3 py-2 font-body text-body-md text-text-strong ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-subtle/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-strong/10 focus-visible:border-text-subtle/30 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow md:text-body-md",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
