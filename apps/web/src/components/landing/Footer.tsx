const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display text-sm font-medium text-foreground">Yapsolutely</span>
        <div className="flex items-center gap-6 font-body text-[0.8rem] text-text-subtle">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Status</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
        <span className="font-body text-xs text-text-subtle/60">© 2026 Yapsolutely, Inc.</span>
      </div>
    </footer>
  );
};

export default Footer;
