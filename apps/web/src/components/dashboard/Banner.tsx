import { type ReactNode } from "react";
import { type LucideIcon, AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type BannerVariant = "info" | "warning" | "success" | "error";

const variantConfig: Record<BannerVariant, { icon: LucideIcon; className: string }> = {
  info: { icon: Info, className: "bg-surface-panel border-border-soft text-text-body" },
  warning: { icon: AlertTriangle, className: "bg-accent-warm/5 border-accent-warm/20 text-accent-warm-dim" },
  success: { icon: CheckCircle2, className: "bg-emerald-400/5 border-emerald-400/20 text-emerald-700" },
  error: { icon: XCircle, className: "bg-destructive/5 border-destructive/20 text-destructive" },
};

interface BannerProps {
  variant?: BannerVariant;
  title?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
  onDismiss?: () => void;
}

const Banner = ({ variant = "info", title, children, action, className, onDismiss }: BannerProps) => {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={cn("flex items-start gap-3 rounded-xl border p-4", config.className, className)}>
      <Icon className="w-4 h-4 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-display text-sm font-medium tracking-[-0.01em] mb-0.5">{title}</div>
        )}
        <div className="font-body text-body-sm leading-relaxed">{children}</div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 p-0.5 rounded text-current opacity-50 hover:opacity-100 transition-opacity"
        >
          <XCircle className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default Banner;
