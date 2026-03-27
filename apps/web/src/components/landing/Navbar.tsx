"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X, ChevronDown, Bot, Phone, FileText, BarChart3, Workflow, Sparkles, ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import Image from "next/image";

const productLinks = [
  { label: "Voice Agents", href: "/features/voice-agents", description: "AI-powered phone agents", icon: Bot },
  { label: "Phone Numbers", href: "/features/phone-numbers", description: "Provision and assign numbers", icon: Phone },
  { label: "Transcripts", href: "/features/transcripts", description: "Full call transcription", icon: FileText },
  { label: "Call Analytics", href: "/features/call-analytics", description: "Logs and performance data", icon: BarChart3 },
  { label: "Flow Builder", href: "/features/flow-builder", description: "Visual conversation design", icon: Workflow },
  { label: "AI Prompts", href: "/features/ai-prompts", description: "Auto-generated instructions", icon: Sparkles },
];

const navLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductOpen(false);
      }
    };
    if (productOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [productOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-bg)] backdrop-blur-2xl border-b border-[var(--color-border)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Logo + nav */}
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="font-display mr-8 text-[1.2rem] font-bold tracking-[-0.03em] text-[var(--color-text-primary)] transition-opacity hover:opacity-80"
            >
              <span className="flex items-center gap-2">
                <Image src="/favicon.svg" alt="" width={28} height={28} className="w-7 h-7 rounded-lg" />
                Yapsolutely
              </span>
            </Link>

            <div className="hidden lg:flex items-center">
              {/* Product dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setProductOpen(!productOpen)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-body text-[0.88rem] transition-all duration-150 ${
                    productOpen
                      ? "bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  Product
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productOpen ? "rotate-180" : ""}`} />
                </button>

                {productOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[440px] rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-2 shadow-xl backdrop-blur-2xl animate-slide-down">
                    <div className="grid grid-cols-2 gap-0.5">
                      {productLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setProductOpen(false)}
                          className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[var(--color-bg-secondary)]"
                        >
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-overlay-accent-soft)] transition-colors group-hover:bg-[var(--color-overlay-accent-medium)]">
                            <link.icon className="h-4 w-4 text-[var(--color-accent-primary)]" />
                          </div>
                          <div>
                            <span className="block font-display text-[0.82rem] font-semibold leading-tight text-[var(--color-text-primary)]">
                              {link.label}
                            </span>
                            <span className="font-body text-[0.7rem] leading-snug text-[var(--color-text-muted)]">
                              {link.description}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-1 border-t border-[var(--color-border)] px-1 pt-1">
                      <Link
                        href="/pricing"
                        onClick={() => setProductOpen(false)}
                        className="group flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--color-bg-secondary)]"
                      >
                        <span className="font-body text-[0.78rem] text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-text-primary)]">View all features &amp; pricing</span>
                        <ArrowRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]/70 transition-all group-hover:translate-x-0.5 group-hover:text-[var(--color-text-primary)]" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-1.5 font-body text-[0.88rem] text-[var(--color-text-muted)] transition-all duration-150 hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="hidden sm:flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/sign-in"
              className="rounded-lg px-3 py-1.5 font-body text-[0.88rem] text-[var(--color-text-muted)] transition-all duration-150 hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
            >
              Sign in
            </Link>
            <Button
              size="default"
              className="btn-press h-9 rounded-full bg-[var(--color-accent-primary)] px-5 font-display text-[0.85rem] font-medium text-[var(--color-text-on-dark)] shadow-sm hover:bg-[var(--color-accent-hover)]"
              asChild
            >
              <Link href="/sign-up">
                Start building free
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-[var(--color-bg-secondary)] lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5 text-[var(--color-text-primary)]" /> : <Menu className="h-5 w-5 text-[var(--color-text-primary)]" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-slide-down border-b border-[var(--color-border)] bg-[var(--color-bg)] px-5 pb-5 pt-2 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col gap-0.5 mb-4">
            <button
              onClick={() => setMobileProductOpen(!mobileProductOpen)}
              className="flex items-center justify-between rounded-lg px-2 py-2.5 font-body text-[0.95rem] text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-secondary)]"
            >
              Product
              <ChevronDown className={`h-4 w-4 text-[var(--color-text-muted)] transition-transform duration-200 ${mobileProductOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileProductOpen && (
              <div className="pl-2 pb-1 space-y-0.5">
                {productLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => { setMobileOpen(false); setMobileProductOpen(false); }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[var(--color-bg-secondary)]"
                  >
                    <link.icon className="h-4 w-4 shrink-0 text-[var(--color-accent-primary)]" />
                    <div>
                      <span className="block font-body text-[0.85rem] leading-tight text-[var(--color-text-primary)]">{link.label}</span>
                      <span className="font-body text-[0.65rem] text-[var(--color-text-muted)]">{link.description}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-2 py-2.5 font-body text-[0.95rem] text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-secondary)]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 border-t border-[var(--color-border)] pt-4">
            <div className="flex items-center px-2 py-1.5">
              <ThemeToggle />
            </div>
            <Link
              href="/sign-in"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-2 py-2.5 font-body text-[0.88rem] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
            >
              Sign in
            </Link>
            <Button size="lg" className="rounded-full bg-[var(--color-accent-primary)] font-display text-[0.88rem] text-[var(--color-text-on-dark)] hover:bg-[var(--color-accent-hover)]" asChild>
              <Link href="/sign-up" onClick={() => setMobileOpen(false)}>
                Start building free
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
