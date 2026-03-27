import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[var(--color-dark-section)] px-6 py-14 text-[var(--color-text-on-dark)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="mb-3 flex items-center gap-2 transition-opacity hover:opacity-80">
              <Image src="/favicon.svg" alt="" width={24} height={24} className="w-6 h-6 rounded-md" />
              <span className="font-display text-sm font-medium text-[var(--color-text-on-dark)]">Yapsolutely</span>
            </Link>
            <p className="max-w-[200px] font-body text-[0.75rem] leading-[1.6] text-[var(--color-text-muted-on-dark)]">
              AI voice agents that answer your phone. Build, deploy, monitor.
            </p>
          </div>

          {/* Product */}
          <div>
            <div className="mb-3 font-body text-[0.65rem] uppercase tracking-[0.12em] text-[var(--color-text-muted-on-dark)]">Product</div>
            <div className="flex flex-col gap-2">
              <a href="#product" className="font-body text-[0.78rem] text-[var(--color-text-muted-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">Features</a>
              <Link href="/pricing" className="font-body text-[0.78rem] text-[var(--color-text-muted-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">Pricing</Link>
              <Link href="/changelog" className="font-body text-[0.78rem] text-[var(--color-text-muted-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">Changelog</Link>
              <Link href="/docs" className="font-body text-[0.78rem] text-[var(--color-text-muted-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">Documentation</Link>
              <Link href="/docs/api" className="font-body text-[0.78rem] text-[var(--color-text-muted-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">API Reference</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="mb-3 font-body text-[0.65rem] uppercase tracking-[0.12em] text-[var(--color-text-muted-on-dark)]">Company</div>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="font-body text-[0.78rem] text-[var(--color-text-muted-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">About</Link>
              <Link href="/support" className="font-body text-[0.78rem] text-[var(--color-text-muted-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">Support</Link>
              <Link href="/compliance" className="font-body text-[0.78rem] text-[var(--color-text-muted-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">Compliance</Link>
              <a href="mailto:hello@yapsolutely.com" className="font-body text-[0.78rem] text-[var(--color-text-muted-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">Contact</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className="mb-3 font-body text-[0.65rem] uppercase tracking-[0.12em] text-[var(--color-text-muted-on-dark)]">Legal</div>
            <div className="flex flex-col gap-2">
              <Link href="/terms" className="font-body text-[0.78rem] text-[var(--color-text-muted-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">Terms of Service</Link>
              <Link href="/privacy" className="font-body text-[0.78rem] text-[var(--color-text-muted-on-dark)] transition-colors hover:text-[var(--color-text-on-dark)]">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-[var(--color-dark-divider)] pt-6">
          <span className="font-body text-xs text-[var(--color-text-muted-on-dark)]">© {new Date().getFullYear()} Yapsolutely, Inc.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
