import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 font-body text-[0.68rem] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-foreground/[0.06] text-text-body",
        secondary: "bg-surface-subtle text-text-subtle",
        destructive: "bg-destructive/10 text-destructive",
        outline: "border border-border-soft text-text-body",
        active: "bg-emerald-400/10 text-emerald-600",
        paused: "bg-accent-warm/10 text-accent-warm-dim",
        draft: "bg-surface-subtle text-text-subtle",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
