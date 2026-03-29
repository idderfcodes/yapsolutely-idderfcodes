"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { cn } from "@/lib/utils";

const productLinks = [
  {
    label: "Voice Agents",
    href: "/features/voice-agents",
    description: "Configure voice, prompt, and call behavior",
  },
  {
    label: "Phone Numbers",
    href: "/features/phone-numbers",
    description: "Assign real numbers to live agents",
  },
  {
    label: "Transcripts",
    href: "/features/transcripts",
    description: "Review every conversation after the call",
  },
  {
    label: "Call Analytics",
    href: "/features/call-analytics",
    description: "Track outcomes and performance clearly",
  },
];

const links = [
  {
    label: "Pricing",
    href: "/#pricing",
  },
  {
    label: "Docs",
    href: "/docs",
  },
  {
    label: "About",
    href: "/about",
  },
];

export function Header({ darkHero = false }: { darkHero?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [productOpen, setProductOpen] = React.useState(false);
  const [mobileProductOpen, setMobileProductOpen] = React.useState(false);
  const productMenuRef = React.useRef<HTMLDivElement>(null);

  /* When darkHero is true, keep the nav in the shared hero/video palette */
  const atDarkTop = darkHero && !open;

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!productMenuRef.current?.contains(event.target as Node)) {
        setProductOpen(false);
      }
    }

    if (productOpen) {
      document.addEventListener("mousedown", handlePointerDown);
    }

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [productOpen]);

  return (
    <header className="relative z-50 w-full">
      <nav
        className={cn(
          "w-full transition-all duration-300 ease-out",
          {
            "border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl shadow-[0_4px_24px_-12px_rgba(0,0,0,0.1)]": open,
            "bg-transparent": !open,
          },
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className={cn(
              "landing-display text-[1.85rem] font-semibold leading-none tracking-[-0.03em] transition-colors duration-300 hover:opacity-85",
              atDarkTop ? "text-[var(--color-text-on-dark)]" : "text-[var(--color-text-primary)]"
            )}
            aria-label="yapsolutely home"
          >
            yapsolutely
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            <div ref={productMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setProductOpen((current) => !current)}
                className={cn(
                  "landing-body inline-flex h-10 cursor-pointer items-center gap-1 rounded-full px-4 text-[14px] font-medium transition-colors duration-300",
                  atDarkTop
                    ? "text-[var(--color-text-muted-on-dark)] hover:text-[var(--color-text-on-dark)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                )}
                aria-expanded={productOpen}
              >
                Product
                <ChevronDownIcon
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    productOpen && "rotate-180",
                  )}
                />
              </button>

              {productOpen ? (
                <div className="absolute left-1/2 top-full z-20 mt-3 w-[360px] -translate-x-1/2 overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg)] p-2 shadow-[0_22px_50px_-28px_rgba(20,20,20,0.5)] animate-in fade-in zoom-in-95 duration-200">
                  {/* Subtle inner top glow for depth */}
                  <div className="absolute inset-0 z-0 pointer-events-none rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" />
                  <div className="relative z-10 grid gap-1">
                    {productLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setProductOpen(false)}
                        className="rounded-[18px] px-4 py-3 transition-colors duration-200 hover:bg-[var(--color-bg-secondary)]"
                      >
                        <div className="landing-body text-[14px] font-medium text-[var(--color-text-primary)]">
                          {link.label}
                        </div>
                        <div className="landing-body mt-1 text-[12px] text-[var(--color-text-muted)]">
                          {link.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {links.map((link) => (
              <Link
                key={link.label}
                className={cn(
                  "landing-body inline-flex h-10 cursor-pointer items-center rounded-full px-4 text-[14px] font-medium transition-colors duration-300",
                  atDarkTop
                    ? "text-[var(--color-text-muted-on-dark)] hover:text-[var(--color-text-on-dark)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                )}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/sign-in"
              className={cn(
                "landing-body inline-flex h-10 cursor-pointer items-center justify-center rounded-full border border-transparent px-4 text-[14px] font-medium transition-all duration-300 hover:scale-[1.03]",
                atDarkTop
                  ? "text-[var(--color-text-on-dark)] hover:bg-[var(--color-overlay-soft)] hover:text-[var(--color-accent-secondary)]"
                  : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-accent-primary)]"
              )}
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="landing-button-primary group relative overflow-hidden landing-body inline-flex h-10 cursor-pointer items-center justify-center px-6 text-[14px] font-semibold text-[var(--color-text-on-dark)]"
            >
              <span className="relative z-10">Start building free</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={cn(
              "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border lg:hidden transition-colors duration-300",
              atDarkTop
                ? "border-[var(--color-dark-divider)] text-[var(--color-text-on-dark)]"
                : "border-[var(--color-border)] text-[var(--color-text-primary)]"
            )}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <MenuToggleIcon open={open} className="size-5" duration={300} />
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-x-4 top-[4.85rem] z-50 overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg)] shadow-[0_24px_56px_-28px_rgba(20,20,20,0.16)] backdrop-blur-xl lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div
          data-slot={open ? "open" : "closed"}
          className={cn(
            "data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out",
            "flex h-full w-full flex-col justify-between gap-y-2 p-4",
          )}
        >
          <div className="grid gap-y-2">
            <button
              type="button"
              onClick={() => setMobileProductOpen((current) => !current)}
              className="landing-body flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3 text-left text-[14px] font-medium text-[var(--color-text-muted)] transition-colors duration-200 hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
            >
              <span>Product</span>
              <ChevronDownIcon
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  mobileProductOpen && "rotate-180",
                )}
              />
            </button>

            {mobileProductOpen ? (
              <div className="grid gap-1 px-2 pb-2">
                {productLinks.map((link) => (
                  <Link
                    key={link.href}
                    className="rounded-[18px] px-4 py-3 transition-colors duration-200 hover:bg-[var(--color-bg-secondary)]"
                    href={link.href}
                    onClick={() => {
                      setOpen(false);
                      setMobileProductOpen(false);
                    }}
                  >
                    <div className="landing-body text-[14px] font-medium text-[var(--color-text-primary)]">
                      {link.label}
                    </div>
                    <div className="landing-body mt-1 text-[12px] text-[var(--color-text-muted)]">
                      {link.description}
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}

            {links.map((link) => (
              <Link
                key={link.label}
                className="landing-body flex cursor-pointer justify-start rounded-2xl px-4 py-3 text-[14px] font-medium text-[var(--color-text-muted)] transition-colors duration-200 hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-text-primary)]"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="landing-body flex w-full cursor-pointer items-center justify-center rounded-full border border-[var(--color-border)] px-4 py-3 text-[14px] font-medium text-[var(--color-text-primary)] transition-all duration-200 hover:scale-[1.03] hover:border-[var(--color-text-primary)] hover:shadow-[0_14px_32px_-20px_rgba(20,20,20,0.12)]"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="landing-button-primary landing-body flex w-full cursor-pointer items-center justify-center px-4 py-3 text-[14px] font-semibold text-[var(--color-text-on-dark)]"
            >
              Start building free
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}