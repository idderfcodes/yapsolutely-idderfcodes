"use client";

import { useState, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Fingerprint } from "lucide-react";
import { verifyOtpAction, sendOtpAction, completeVerificationAction } from "@/app/_actions/verification";

export default function VerifyIdentityPage() {
  return <Suspense><VerifyIdentityInner /></Suspense>;
}

function VerifyIdentityInner() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const nameParam = searchParams.get("name") || "";
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [code]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [code]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newCode = [...code];
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i];
    }
    setCode(newCode);
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  }, [code]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length < 6) {
      setError("Please enter the full 6-digit code");
      return;
    }
    if (!email) {
      setError("Missing email. Please go back and enter your email.");
      return;
    }
    setIsLoading(true);
    const result = await verifyOtpAction(email, fullCode);
    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }
    // Set session cookie now that email is verified
    const sessionResult = await completeVerificationAction(email, nameParam || undefined);
    if (sessionResult.error) {
      setError(sessionResult.error);
      setIsLoading(false);
      return;
    }
    window.location.href = "/onboarding";
  };

  const handleResend = async () => {
    if (!email || isResending) return;
    setIsResending(true);
    setResendMessage("");
    const result = await sendOtpAction(email);
    if (result.error) {
      setError(result.error);
    } else {
      setResendMessage("New code sent! Check your inbox.");
    }
    setIsResending(false);
  };

  return (
    <div className="min-h-screen bg-canvas flex">
      {/* Left: form panel */}
      <div className="flex-1 flex flex-col px-6 sm:px-10 py-8">
        <div className="flex items-center justify-between mb-auto">
          <Link href="/secure-account" className="inline-flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 text-text-subtle group-hover:text-foreground transition-colors" />
            <span className="font-display text-sm font-semibold tracking-[-0.02em] text-text-strong group-hover:opacity-80 transition-opacity">
              Yapsolutely
            </span>
          </Link>
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-1 rounded-full bg-foreground" />
            <span className="w-6 h-1 rounded-full bg-foreground" />
            <span className="w-6 h-1 rounded-full bg-border" />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-content-auth animate-fade-in" style={{ animationDelay: "0.05s" }}>
            <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-border-soft/30 flex items-center justify-center mb-6 shadow-surface-xs">
              <Fingerprint className="w-5 h-5 text-text-body" />
            </div>

            <h1 className="font-display text-[1.5rem] sm:text-[1.75rem] font-semibold tracking-[-0.03em] text-text-strong leading-[1.15] mb-2">
              Enter your code
            </h1>
            <p className="font-body text-body-md text-text-subtle leading-relaxed mb-8">
              We sent a 6-digit code to your email. Check your inbox and spam folder.
            </p>

            <form className="mb-6" onSubmit={handleSubmit} noValidate>
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-6">
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={i === 0 ? handlePaste : undefined}
                    className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-lg font-display font-semibold rounded-xl border-2 bg-surface-panel text-text-strong transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-foreground ${
                      error ? "border-destructive ring-1 ring-destructive/20" : "border-border-soft"
                    }`}
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              {error && (
                <p className="font-body text-label text-destructive text-center mb-4 animate-slide-down">{error}</p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full font-display font-medium tracking-[-0.01em] text-body-md h-11 rounded-xl transition-all duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-background rounded-full animate-spin" />
                    Verifying…
                  </span>
                ) : "Verify and continue"}
              </Button>
            </form>

            <div className="text-center space-y-1">
              <button
                onClick={handleResend}
                disabled={isResending}
                className="font-body text-body-sm text-text-subtle hover:text-text-strong transition-colors disabled:opacity-50"
              >
                Didn&apos;t receive a code? <span className="font-medium underline underline-offset-4">{isResending ? "Sending…" : "Resend"}</span>
              </button>
              {resendMessage && (
                <p className="font-body text-label text-emerald-500 animate-slide-down">{resendMessage}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <p className="font-body text-[0.65rem] text-text-subtle/50">© 2025 Yapsolutely, Inc.</p>
        </div>
      </div>

      {/* Right: trust panel */}
      <div className="hidden lg:flex flex-1 bg-surface-dark rounded-l-[2rem] p-12 xl:p-16 items-center justify-center relative overflow-hidden">
        <div className="max-w-md animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <span className="font-body text-[0.6rem] text-surface-dark-foreground/20 uppercase tracking-[0.2em] block mb-6">One-time code</span>
          <p className="font-display text-[1.75rem] font-semibold tracking-[-0.025em] text-surface-dark-foreground leading-[1.2] mb-6">
            Almost there. Enter the code to access your workspace.
          </p>
          <p className="font-body text-body-md text-surface-dark-foreground/35 leading-relaxed mb-10">
            The one-time code ensures your voice operations data stays private and only authorized team members have access.
          </p>

          <div className="bg-surface-dark-foreground/5 rounded-2xl p-6">
            <div className="space-y-4">
              {[
                { step: "1", label: "Enter email", status: "done" },
                { step: "2", label: "Enter code", status: "current" },
                { step: "3", label: "Set up workspace", status: "upcoming" },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs ${
                    item.status === "done" ? "bg-emerald-400/15 text-emerald-400/70" :
                    item.status === "current" ? "bg-surface-dark-foreground/15 text-surface-dark-foreground/70" :
                    "bg-surface-dark-foreground/5 text-surface-dark-foreground/20"
                  }`}>
                    {item.status === "done" ? "✓" : item.step}
                  </div>
                  <span className={`font-body text-[0.82rem] ${
                    item.status === "done" ? "text-surface-dark-foreground/40 line-through" :
                    item.status === "current" ? "text-surface-dark-foreground/60" :
                    "text-surface-dark-foreground/25"
                  }`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
