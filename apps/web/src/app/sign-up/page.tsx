"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signUpAction } from "@/app/_actions/auth";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!fullName.trim()) e.fullName = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.set("email", email);
    formData.set("name", fullName);
    await signUpAction(formData);
  };

  return (
    <div className="min-h-screen bg-canvas flex">
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-content-auth animate-fade-in" style={{ animationDelay: "0.05s" }}>
          <Link href="/" className="inline-block mb-14 group">
            <span className="font-display text-lg font-semibold tracking-[-0.02em] text-text-strong group-hover:opacity-70 transition-opacity">
              Yapsolutely
            </span>
          </Link>

          <h1 className="font-display text-[1.75rem] font-semibold tracking-[-0.03em] text-text-strong leading-[1.15] mb-2">
            Create your account
          </h1>
          <p className="font-body text-body-md text-text-subtle leading-relaxed mb-10">
            You&apos;ll set up your workspace after signing up.
          </p>

          <form className="space-y-4 mb-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-1.5">
              <Label className="font-body text-body-sm text-text-body">Full name</Label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); if (errors.fullName) setErrors(prev => ({ ...prev, fullName: undefined })); }}
                placeholder="Jane Smith"
                className={`h-11 rounded-xl ${errors.fullName ? "border-destructive ring-1 ring-destructive/20" : ""}`}
              />
              {errors.fullName && <p className="font-body text-label text-destructive animate-slide-down">{errors.fullName}</p>}
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-body-sm text-text-body">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: undefined })); }}
                placeholder="you@company.com"
                className={`h-11 rounded-xl ${errors.email ? "border-destructive ring-1 ring-destructive/20" : ""}`}
              />
              {errors.email && <p className="font-body text-label text-destructive animate-slide-down">{errors.email}</p>}
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full font-display font-medium tracking-[-0.01em] text-body-md h-11 rounded-xl transition-all duration-200"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : "Create account"}
            </Button>
          </form>

          <p className="font-body text-body-sm text-text-subtle text-center">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-text-strong font-medium hover:underline underline-offset-4 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center bg-surface-dark p-16">
        <div className="max-w-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <p className="font-display text-[1.5rem] font-semibold tracking-[-0.025em] text-surface-dark-foreground leading-[1.25] mb-4">
            Your voice operations workspace, ready in minutes.
          </p>
          <p className="font-body text-body-md text-surface-dark-foreground/40 leading-relaxed">
            Create agents, assign numbers, and start handling calls — all from one dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
