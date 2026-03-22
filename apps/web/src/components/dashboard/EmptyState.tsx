import { type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
}

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="w-12 h-12 rounded-2xl bg-foreground/[0.04] flex items-center justify-center mb-5">
      <Icon className="w-5.5 h-5.5 text-text-subtle" />
    </div>
    <h3 className="font-display text-[1.05rem] font-semibold text-text-strong tracking-[-0.01em] mb-1.5">
      {title}
    </h3>
    <p className="font-body text-[0.82rem] text-text-subtle leading-relaxed max-w-[320px] mb-6">
      {description}
    </p>
    <div className="flex items-center gap-3">
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-foreground text-background hover:bg-foreground/90 font-display font-medium tracking-[-0.01em] text-[0.82rem] h-10 rounded-lg px-5 gap-2"
        >
          {actionLabel}
        </Button>
      )}
      {secondaryLabel && onSecondary && (
        <button
          onClick={onSecondary}
          className="font-body text-[0.8rem] text-text-subtle hover:text-text-body transition-colors"
        >
          {secondaryLabel}
        </button>
      )}
    </div>
  </div>
);

export default EmptyState;
