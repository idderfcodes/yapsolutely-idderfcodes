"use client";

import * as React from "react";
import Link from "next/link";

import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { cn } from "@/lib/utils";

const links = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Docs",
    href: "/docs",
  },
];

export function Header() {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full px-4 pt-4",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between rounded-full border px-4 transition-all duration-300 ease-out md:h-[60px] md:px-5",
          {
            "border-white/12 bg-[#111111]/92 shadow-[0_18px_48px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl":
              scrolled || open,
            "border-white/8 bg-[#111111]/72 backdrop-blur-md": !scrolled && !open,
          },
        )}
      >
        <Link
          href="/"
          className="landing-display text-[1.8rem] leading-none tracking-[-0.05em] text-white transition-opacity hover:opacity-85"
          aria-label="Yapsolutely home"
        >
          Yapsolutely
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              className="landing-body inline-flex h-10 items-center rounded-full px-4 text-[14px] font-medium text-white/72 transition-colors duration-200 hover:text-white"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/sign-in"
            className="landing-body inline-flex h-10 items-center rounded-full border border-white/14 px-4 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-white/6"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="landing-body inline-flex h-10 items-center rounded-full bg-white px-4 text-[14px] font-medium text-[#111111] transition-transform duration-200 hover:scale-[1.02]"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </button>
      </nav>

      <div
        className={cn(
          "fixed inset-x-4 top-[4.75rem] z-50 overflow-hidden rounded-[28px] border border-white/10 bg-[#111111]/96 shadow-[0_24px_56px_-28px_rgba(0,0,0,0.76)] backdrop-blur-xl md:hidden",
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
            {links.map((link) => (
              <Link
                key={link.label}
                className="landing-body flex justify-start rounded-2xl px-4 py-3 text-[15px] font-medium text-white/78 transition-colors duration-200 hover:bg-white/6 hover:text-white"
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
              className="landing-body flex w-full items-center justify-center rounded-full border border-white/14 px-4 py-3 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-white/6"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="landing-body flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-[15px] font-medium text-[#111111] transition-transform duration-200 hover:scale-[1.01]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}