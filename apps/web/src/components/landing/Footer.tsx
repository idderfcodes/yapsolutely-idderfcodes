import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-14 px-6 bg-surface-dark text-surface-dark-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity">
              <Image src="/favicon.svg" alt="" width={24} height={24} className="w-6 h-6 rounded-md brightness-0 invert" />
              <span className="font-display text-sm font-medium text-surface-dark-foreground">Yapsolutely</span>
            </Link>
            <p className="font-body text-[0.75rem] text-surface-dark-foreground/40 leading-[1.6] max-w-[200px]">
              AI voice agents that answer your phone. Build, deploy, monitor.
            </p>
          </div>

          {/* Product */}
          <div>
            <div className="font-body text-[0.65rem] text-surface-dark-foreground/25 uppercase tracking-[0.12em] mb-3">Product</div>
            <div className="flex flex-col gap-2">
              <a href="#product" className="font-body text-[0.78rem] text-surface-dark-foreground/40 hover:text-surface-dark-foreground transition-colors">Features</a>
              <Link href="/pricing" className="font-body text-[0.78rem] text-surface-dark-foreground/40 hover:text-surface-dark-foreground transition-colors">Pricing</Link>
              <Link href="/changelog" className="font-body text-[0.78rem] text-surface-dark-foreground/40 hover:text-surface-dark-foreground transition-colors">Changelog</Link>
              <Link href="/docs" className="font-body text-[0.78rem] text-surface-dark-foreground/40 hover:text-surface-dark-foreground transition-colors">Documentation</Link>
              <Link href="/docs/api" className="font-body text-[0.78rem] text-surface-dark-foreground/40 hover:text-surface-dark-foreground transition-colors">API Reference</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="font-body text-[0.65rem] text-surface-dark-foreground/25 uppercase tracking-[0.12em] mb-3">Company</div>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="font-body text-[0.78rem] text-surface-dark-foreground/40 hover:text-surface-dark-foreground transition-colors">About</Link>
              <Link href="/support" className="font-body text-[0.78rem] text-surface-dark-foreground/40 hover:text-surface-dark-foreground transition-colors">Support</Link>
              <Link href="/compliance" className="font-body text-[0.78rem] text-surface-dark-foreground/40 hover:text-surface-dark-foreground transition-colors">Compliance</Link>
              <a href="mailto:hello@yapsolutely.com" className="font-body text-[0.78rem] text-surface-dark-foreground/40 hover:text-surface-dark-foreground transition-colors">Contact</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className="font-body text-[0.65rem] text-surface-dark-foreground/25 uppercase tracking-[0.12em] mb-3">Legal</div>
            <div className="flex flex-col gap-2">
              <Link href="/terms" className="font-body text-[0.78rem] text-surface-dark-foreground/40 hover:text-surface-dark-foreground transition-colors">Terms of Service</Link>
              <Link href="/privacy" className="font-body text-[0.78rem] text-surface-dark-foreground/40 hover:text-surface-dark-foreground transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-surface-dark-foreground/10 flex items-center justify-center">
          <span className="font-body text-xs text-surface-dark-foreground/30">© {new Date().getFullYear()} Yapsolutely, Inc.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
