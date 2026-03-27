Skip to content
slubbles
yapsolutely
Repository navigation
Code
Issues
Pull requests
Agents
Actions
Projects
Wiki
Security
Insights
Settings
Commit 00d6e95
idderfcodes
idderfcodes
committed
2 hours ago
feat: responsive layout, AnimatedGradientText, overflow fixes, ScrollFAQ
main
1 parent 
4f6c9ee
 commit 
00d6e95
File tree
Filter files…
.github
design-system.md
ACE-UI-components
AnimatedGradientText.tsx
animated-text-cycle.tsx
button.tsx
dotted-surface.tsx
video-player.tsx
video-scroll.tsx
zoomparallax.tsx
MARCH27.md
apps/web
package.json
public/videos
hero-demo.mp4
hero.mp4
src
app
fonts/landing
bagoss-condensed
BagossCondensedTRIAL-Bold.woff2
inter-variable.ttf
globals.css
layout.tsx
components
landing
AnimatedGradientText.tsx
Benefits.tsx
BrandCarousel.tsx
ClosingCTA.tsx
DashboardPreview.tsx
FAQ.tsx
Footer.tsx
Hero.tsx
Navbar.tsx
ProductShowcase.tsx
ScrollFAQ.tsx
StatsStrip.tsx
Testimonials.tsx
TrustStrip.tsx
UseCases.tsx
Workflow.tsx
container-scroll.tsx
dotted-surface.tsx
header.tsx
landing-dotted-surface.tsx
landing-font.ts
revised-landing-page.tsx
video-scroll-section.tsx
zoom-parallax-section.tsx
ui
zoom-parallax.tsx
package-lock.json
video-replace/_MConverter.eu_6secs
00001.png
00002.png
00003.png
00004.png
00005.png
00006.png
00007.png
00008.png
00009.png
00010.png
00011.png
00012.png
00013.png
00014.png
00015.png
00016.png
00017.png
00018.png
00019.png
00020.png
00021.png
00022.png
00023.png
00024.png
00025.png
00026.png
00027.png
00028.png
00029.png
00030.png
00031.png
00032.png
00033.png
00034.png
00035.png
00036.png
00037.png
00038.png
00039.png
00040.png
00041.png
00042.png
00043.png
00044.png
00045.png
00046.png
00047.png
00048.png
00049.png
00050.png
00051.png
00052.png
00053.png
00054.png
00055.png
00056.png
00057.png
00058.png
00059.png
00060.png
00061.png
00062.png
00063.png
00064.png
00065.png
00066.png
00067.png
00068.png
00069.png
00070.png
00071.png
00072.png
00073.png
00074.png
00075.png
00076.png
00077.png
00078.png
00079.png
00080.png
00081.png
00082.png
00083.png
00084.png
00085.png
00086.png
00087.png
00088.png
00089.png
00090.png
00091.png
00092.png
00093.png
00094.png
00095.png
00096.png
00097.png
00098.png
00099.png
00100.png
00101.png
00102.png
00103.png
00104.png
00105.png
00106.png
00107.png
00108.png
00109.png
00110.png
00111.png
00112.png
00113.png
00114.png
00115.png
00116.png
00117.png
00118.png
00119.png
00120.png
00121.png
00122.png
00123.png
00124.png
00125.png
00126.png
00127.png
00128.png
00129.png
00130.png
00131.png
00132.png
00133.png
00134.png
00135.png
00136.png
00137.png
00138.png
00139.png
00140.png
00141.png
00142.png
00143.png
00144.png
00145.png
00146.png
00147.png
00148.png
00149.png
00150.png
00151.png
00152.png
00153.png
00154.png
00155.png
00156.png
00157.png
00158.png
00159.png
00160.png
00161.png
00162.png
00163.png
00164.png
00165.png
00166.png
00167.png
00168.png
00169.png
00170.png
00171.png
00172.png
00173.png
00174.png
00175.png
00176.png
00177.png
00178.png
00179.png
00180.png
00181.png
00182.png
00183.png
videos
lv_0_20260327165847 (1).mp4
lv_0_20260327165945 (1).mp4
Some content is hidden
Large Commits have some content hidden by default. Use the searchbox below for content that may be hidden.
227 files changed
+3576
-1002
lines changed
Search within code
 
‎apps/web/src/components/landing/Testimonials.tsx‎
+7
-7
Lines changed: 7 additions & 7 deletions
Original file line number	Diff line number	Diff line change
@@ -30,8 +30,8 @@ const Testimonials = () => {
      <div className="max-w-7xl mx-auto">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-14">
            <span className="font-body text-[0.65rem] text-text-subtle/60 uppercase tracking-[0.2em] block mb-4">Use cases</span>
            <h2 className="text-[2rem] sm:text-[2.75rem] font-semibold tracking-[-0.03em] text-foreground leading-[1.08]">
            <span className="mb-4 block font-body text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Use cases</span>
            <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-[2.75rem]">
              Built for real business workflows
            </h2>
          </div>
@@ -40,16 +40,16 @@ const Testimonials = () => {
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {useCases.map((uc, i) => (
            <ScrollReveal key={uc.title} variant="fade-up" delay={i * 100} duration={500}>
              <div className="bg-surface-panel rounded-2xl border border-border-soft/60 p-7 h-full flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-accent-purple/[0.06] flex items-center justify-center mb-5">
                  <uc.icon className="w-5 h-5 text-accent-purple-soft" />
              <div className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-7">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-overlay-accent-soft)]">
                  <uc.icon className="h-5 w-5 text-[var(--color-accent-primary)]" />
                </div>

                <h3 className="font-display text-[0.95rem] font-semibold text-text-strong mb-3">
                <h3 className="mb-3 font-display text-[0.95rem] font-semibold text-[var(--color-text-primary)]">
                  {uc.title}
                </h3>

                <p className="font-body text-[0.88rem] text-text-body leading-[1.7] flex-1">
                <p className="flex-1 font-body text-[0.88rem] leading-[1.7] text-[var(--color-text-muted)]">
                  {uc.description}
                </p>
              </div>
‎apps/web/src/components/landing/TrustStrip.tsx‎
+3
-3
Lines changed: 3 additions & 3 deletions
Original file line number	Diff line number	Diff line change
@@ -13,10 +13,10 @@ const TrustStrip = () => {
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-4 sm:gap-x-8">
          {capabilities.map((cap, i) => (
            <div key={cap.label} className="flex items-center gap-3">
              {i > 0 && <span className="hidden sm:block w-px h-4 bg-border/40" />}
              {i > 0 && <span className="hidden h-4 w-px bg-[var(--color-border)] sm:block" />}
              <div className="flex items-center gap-2">
                <span className="font-display text-[0.7rem] font-medium text-text-body tracking-wide">{cap.detail}</span>
                <span className="font-body text-[0.7rem] text-text-body">{cap.label}</span>
                <span className="font-display text-[0.7rem] font-medium tracking-wide text-[var(--color-accent-secondary)]">{cap.detail}</span>
                <span className="font-body text-[0.7rem] text-[var(--color-text-muted)]">{cap.label}</span>
              </div>
            </div>
          ))}
‎apps/web/src/components/landing/UseCases.tsx‎
+53
-53
Lines changed: 53 additions & 53 deletions
Original file line number	Diff line number	Diff line change
@@ -12,32 +12,32 @@ const useCases = [
    mockup: (
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-medium text-white">Inbound Sales Agent</span>
          <span className="text-[0.65rem] text-white/30 ml-auto font-mono">+1 (415) 555-0142</span>
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent-secondary)]" />
          <span className="text-sm font-medium text-[var(--color-text-on-dark)]">Inbound Sales Agent</span>
          <span className="ml-auto font-mono text-[0.65rem] text-[var(--color-text-muted-on-dark)]">+1 (415) 555-0142</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Today", value: "47" },
            { label: "Avg duration", value: "3:42" },
            { label: "Qualified", value: "78%" },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.06] rounded-lg p-2.5 text-center">
              <div className="text-sm font-semibold text-white">{s.value}</div>
              <div className="text-[0.55rem] text-white/40 mt-0.5">{s.label}</div>
            <div key={s.label} className="rounded-lg bg-[var(--color-badge-dark)] p-2.5 text-center">
              <div className="text-sm font-semibold text-[var(--color-text-on-dark)]">{s.value}</div>
              <div className="mt-0.5 text-[0.55rem] text-[var(--color-text-muted-on-dark)]">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white/[0.04] rounded-lg p-2.5 space-y-1">
        <div className="space-y-1 rounded-lg bg-[var(--color-badge-dark)] p-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-400/60" />
            <span className="text-[0.6rem] text-white/30 font-mono">0:04</span>
            <span className="text-[0.62rem] text-white/60">Thanks for calling, how can I help?</span>
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent-secondary)]/70" />
            <span className="font-mono text-[0.6rem] text-[var(--color-text-muted-on-dark)]">0:04</span>
            <span className="text-[0.62rem] text-[var(--color-text-on-dark)]">Thanks for calling, how can I help?</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-blue-400/60" />
            <span className="text-[0.6rem] text-white/30 font-mono">0:08</span>
            <span className="text-[0.62rem] text-white/60">I&apos;d like pricing for the enterprise plan.</span>
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent-primary)]/70" />
            <span className="font-mono text-[0.6rem] text-[var(--color-text-muted-on-dark)]">0:08</span>
            <span className="text-[0.62rem] text-[var(--color-text-on-dark)]">I&apos;d like pricing for the enterprise plan.</span>
          </div>
        </div>
      </div>
@@ -51,28 +51,28 @@ const useCases = [
    mockup: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">Booking Agent</span>
          <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400">Active</span>
          <span className="text-sm font-medium text-[var(--color-text-on-dark)]">Booking Agent</span>
          <span className="rounded-full bg-[var(--color-overlay-secondary-medium)] px-2 py-0.5 text-[0.6rem] text-[var(--color-accent-secondary)]">Active</span>
        </div>
        <div className="space-y-2">
          {[
            { time: "9:00 AM", name: "Sarah M.", status: "Confirmed" },
            { time: "10:30 AM", name: "James K.", status: "Confirmed" },
            { time: "2:00 PM", name: "Lisa R.", status: "Pending" },
          ].map((a) => (
            <div key={a.time} className="flex items-center justify-between bg-white/[0.06] rounded-lg px-3 py-2">
            <div key={a.time} className="flex items-center justify-between rounded-lg bg-[var(--color-badge-dark)] px-3 py-2">
              <div className="flex items-center gap-2.5">
                <span className="text-[0.65rem] text-white/30 font-mono w-14">{a.time}</span>
                <span className="text-[0.75rem] text-white/70">{a.name}</span>
                <span className="w-14 font-mono text-[0.65rem] text-[var(--color-text-muted-on-dark)]">{a.time}</span>
                <span className="text-[0.75rem] text-[var(--color-text-on-dark)]">{a.name}</span>
              </div>
              <span className={`text-[0.6rem] ${a.status === "Confirmed" ? "text-emerald-400/70" : "text-amber-400/70"}`}>
              <span className={`text-[0.6rem] ${a.status === "Confirmed" ? "text-[var(--color-accent-secondary)]" : "text-[var(--color-accent-pop)]"}`}>
                {a.status}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-white/[0.04] rounded-lg p-2.5 text-center">
          <span className="text-[0.65rem] text-white/40">12 bookings this week</span>
        <div className="rounded-lg bg-[var(--color-badge-dark)] p-2.5 text-center">
          <span className="text-[0.65rem] text-[var(--color-text-muted-on-dark)]">12 bookings this week</span>
        </div>
      </div>
    ),
@@ -85,32 +85,32 @@ const useCases = [
    mockup: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">Support Tier 1</span>
          <span className="text-[0.65rem] text-white/30">24/7</span>
          <span className="text-sm font-medium text-[var(--color-text-on-dark)]">Support Tier 1</span>
          <span className="text-[0.65rem] text-[var(--color-text-muted-on-dark)]">24/7</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Resolved", value: "94%" },
            { label: "Avg time", value: "2:17" },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.06] rounded-lg p-2.5 text-center">
              <div className="text-sm font-semibold text-white">{s.value}</div>
              <div className="text-[0.55rem] text-white/40 mt-0.5">{s.label}</div>
            <div key={s.label} className="rounded-lg bg-[var(--color-badge-dark)] p-2.5 text-center">
              <div className="text-sm font-semibold text-[var(--color-text-on-dark)]">{s.value}</div>
              <div className="mt-0.5 text-[0.55rem] text-[var(--color-text-muted-on-dark)]">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="bg-white/[0.04] rounded-lg p-2.5 space-y-1.5">
        <div className="space-y-1.5 rounded-lg bg-[var(--color-badge-dark)] p-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-blue-400/60" />
            <span className="text-[0.62rem] text-white/60">My order hasn&apos;t arrived yet.</span>
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent-primary)]/70" />
            <span className="text-[0.62rem] text-[var(--color-text-on-dark)]">My order hasn&apos;t arrived yet.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-400/60" />
            <span className="text-[0.62rem] text-white/60">Let me look that up for you...</span>
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent-secondary)]/70" />
            <span className="text-[0.62rem] text-[var(--color-text-on-dark)]">Let me look that up for you...</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-400/60" />
            <span className="text-[0.62rem] text-white/60">Your order shipped yesterday. Tracking sent via SMS.</span>
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent-secondary)]/70" />
            <span className="text-[0.62rem] text-[var(--color-text-on-dark)]">Your order shipped yesterday. Tracking sent via SMS.</span>
          </div>
        </div>
      </div>
@@ -124,21 +124,21 @@ const useCases = [
    mockup: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">Lead Qualifier</span>
          <span className="text-[0.65rem] text-white/30 font-mono">142 leads</span>
          <span className="text-sm font-medium text-[var(--color-text-on-dark)]">Lead Qualifier</span>
          <span className="font-mono text-[0.65rem] text-[var(--color-text-muted-on-dark)]">142 leads</span>
        </div>
        <div className="space-y-2">
          {[
            { label: "Company size?", value: "50-200", score: "High" },
            { label: "Budget range?", value: "$5k-10k/mo", score: "High" },
            { label: "Timeline?", value: "This quarter", score: "Hot" },
          ].map((q) => (
            <div key={q.label} className="bg-white/[0.06] rounded-lg px-3 py-2 flex items-center justify-between">
            <div key={q.label} className="flex items-center justify-between rounded-lg bg-[var(--color-badge-dark)] px-3 py-2">
              <div>
                <div className="text-[0.6rem] text-white/35">{q.label}</div>
                <div className="text-[0.72rem] text-white/70">{q.value}</div>
                <div className="text-[0.6rem] text-[var(--color-text-muted-on-dark)]">{q.label}</div>
                <div className="text-[0.72rem] text-[var(--color-text-on-dark)]">{q.value}</div>
              </div>
              <span className={`text-[0.6rem] px-1.5 py-0.5 rounded ${q.score === "Hot" ? "bg-red-400/15 text-red-400" : "bg-emerald-400/15 text-emerald-400"}`}>
              <span className={`rounded px-1.5 py-0.5 text-[0.6rem] ${q.score === "Hot" ? "bg-[var(--color-overlay-accent-medium)] text-[var(--color-accent-deep)]" : "bg-[var(--color-overlay-secondary-medium)] text-[var(--color-accent-secondary)]"}`}>
                {q.score}
              </span>
            </div>
@@ -155,25 +155,25 @@ const useCases = [
    mockup: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">After Hours</span>
          <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-400">Outside hours</span>
          <span className="text-sm font-medium text-[var(--color-text-on-dark)]">After Hours</span>
          <span className="rounded-full bg-[var(--color-overlay-pop-soft)] px-2 py-0.5 text-[0.6rem] text-[var(--color-text-primary)]">Outside hours</span>
        </div>
        <div className="bg-white/[0.06] rounded-lg p-3 space-y-2">
          <div className="text-[0.65rem] text-white/30 uppercase tracking-wider">Last 3 missed-hour calls</div>
        <div className="space-y-2 rounded-lg bg-[var(--color-badge-dark)] p-3">
          <div className="text-[0.65rem] uppercase tracking-wider text-[var(--color-text-muted-on-dark)]">Last 3 missed-hour calls</div>
          {[
            { time: "11:42 PM", caller: "+1 (212) 555-0198" },
            { time: "6:15 AM", caller: "+1 (310) 555-0067" },
            { time: "3:30 AM", caller: "+1 (628) 555-0144" },
          ].map((c) => (
            <div key={c.time} className="flex items-center justify-between">
              <span className="text-[0.65rem] text-white/30 font-mono">{c.time}</span>
              <span className="text-[0.7rem] text-white/60 font-mono">{c.caller}</span>
              <span className="font-mono text-[0.65rem] text-[var(--color-text-muted-on-dark)]">{c.time}</span>
              <span className="font-mono text-[0.7rem] text-[var(--color-text-on-dark)]">{c.caller}</span>
            </div>
          ))}
        </div>
        <div className="bg-white/[0.04] rounded-lg p-2.5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[0.65rem] text-white/50">All calls answered. 3 follow-ups queued.</span>
        <div className="flex items-center gap-2 rounded-lg bg-[var(--color-badge-dark)] p-2.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-accent-secondary)]" />
          <span className="text-[0.65rem] text-[var(--color-text-on-dark)]">All calls answered. 3 follow-ups queued.</span>
        </div>
      </div>
    ),
@@ -215,8 +215,8 @@ const UseCases = () => {
  return (
    <section ref={sectionRef} className="py-16 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <span className="font-body text-[0.65rem] text-text-body uppercase tracking-[0.2em] block mb-4">Use cases</span>
        <h2 className="text-[2rem] sm:text-[2.75rem] font-semibold tracking-[-0.03em] text-foreground leading-[1.08]">
        <span className="mb-4 block font-body text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Use cases</span>
        <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-[2.75rem]">
          Built for every inbound
          <br className="hidden sm:block" />
          call scenario
@@ -231,18 +231,18 @@ const UseCases = () => {
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="shrink-0 w-[320px] sm:w-[360px] rounded-[1.5rem] bg-surface-dark overflow-hidden flex flex-col"
              className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-[1.5rem] bg-[var(--color-dark-section)] sm:w-[360px]"
            >
              {/* Mockup area */}
              <div className="p-5 sm:p-6 flex-1">
                {uc.mockup}
              </div>
              {/* Title + description */}
              <div className="px-5 sm:px-6 pb-6 pt-2">
                <h3 className="font-display text-[1.05rem] font-semibold text-white mb-2">
                <h3 className="mb-2 font-display text-[1.05rem] font-semibold text-[var(--color-text-on-dark)]">
                  {uc.title}
                </h3>
                <p className="font-body text-[0.78rem] text-white/45 leading-[1.6]">
                <p className="font-body text-[0.78rem] leading-[1.6] text-[var(--color-text-muted-on-dark)]">
                  {uc.description}
                </p>
              </div>
‎apps/web/src/components/landing/Workflow.tsx‎
+38
-38
Lines changed: 38 additions & 38 deletions
Original file line number	Diff line number	Diff line change
@@ -33,22 +33,22 @@ function StepIllustration({ activeStep }: { activeStep: number }) {
          activeStep === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-[340px] lg:max-w-[440px] bg-surface-dark rounded-2xl p-5 sm:p-6 lg:p-8 shadow-surface-xl">
        <div className="w-full max-w-[340px] rounded-2xl bg-[var(--color-dark-section)] p-5 shadow-surface-xl sm:p-6 lg:max-w-[440px] lg:p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/50" />
            <span className="ml-auto font-mono text-[0.55rem] text-surface-dark-foreground/20">prompt.md</span>
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-primary)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-pop)]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent-secondary)]/70" />
            <span className="ml-auto font-mono text-[0.55rem] text-[var(--color-text-muted-on-dark)]">prompt.md</span>
          </div>
          <div className="space-y-2 font-mono text-[0.7rem] leading-[1.8]">
            <div className="text-surface-dark-foreground/30"><span className="text-emerald-400/50">role:</span> front-desk-agent</div>
            <div className="text-surface-dark-foreground/30"><span className="text-emerald-400/50">voice:</span> warm, professional</div>
            <div className="text-surface-dark-foreground/30"><span className="text-emerald-400/50">greeting:</span> &quot;Hi, how can I help?&quot;</div>
            <div className="text-surface-dark-foreground/30"><span className="text-emerald-400/50">transfer_on:</span> billing, complaints</div>
            <div className="text-[var(--color-text-muted-on-dark)]"><span className="text-[var(--color-accent-secondary)]">role:</span> front-desk-agent</div>
            <div className="text-[var(--color-text-muted-on-dark)]"><span className="text-[var(--color-accent-secondary)]">voice:</span> warm, professional</div>
            <div className="text-[var(--color-text-muted-on-dark)]"><span className="text-[var(--color-accent-secondary)]">greeting:</span> &quot;Hi, how can I help?&quot;</div>
            <div className="text-[var(--color-text-muted-on-dark)]"><span className="text-[var(--color-accent-secondary)]">transfer_on:</span> billing, complaints</div>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <Settings2 className="w-3.5 h-3.5 text-surface-dark-foreground/20" />
            <span className="text-[0.6rem] text-surface-dark-foreground/20 font-body">Prompt editor</span>
            <Settings2 className="h-3.5 w-3.5 text-[var(--color-text-muted-on-dark)]" />
            <span className="font-body text-[0.6rem] text-[var(--color-text-muted-on-dark)]">Prompt editor</span>
          </div>
        </div>
      </div>
@@ -59,22 +59,22 @@ function StepIllustration({ activeStep }: { activeStep: number }) {
          activeStep === 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-[340px] lg:max-w-[440px] bg-surface-dark rounded-2xl p-5 sm:p-6 lg:p-8 shadow-surface-xl">
          <div className="text-[0.6rem] font-body text-surface-dark-foreground/25 uppercase tracking-[0.15em] mb-5">Phone numbers</div>
        <div className="w-full max-w-[340px] rounded-2xl bg-[var(--color-dark-section)] p-5 shadow-surface-xl sm:p-6 lg:max-w-[440px] lg:p-8">
          <div className="mb-5 text-[0.6rem] font-body uppercase tracking-[0.15em] text-[var(--color-text-muted-on-dark)]">Phone numbers</div>
          <div className="space-y-2.5">
            {[
              { num: "+1 (415) 555-0142", agent: "Inbound Sales", status: "active" },
              { num: "+1 (212) 555-0198", agent: "Support - Tier 1", status: "active" },
              { num: "+1 (310) 555-0067", agent: "Unassigned", status: "idle" },
            ].map((n) => (
              <div key={n.num} className="flex items-center justify-between p-3 rounded-xl bg-surface-dark-foreground/[0.04]">
              <div key={n.num} className="flex items-center justify-between rounded-xl bg-[var(--color-badge-dark)] p-3">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-3 h-3 text-surface-dark-foreground/20" />
                  <span className="font-mono text-[0.7rem] text-surface-dark-foreground/50">{n.num}</span>
                  <Phone className="h-3 w-3 text-[var(--color-accent-secondary)]" />
                  <span className="font-mono text-[0.7rem] text-[var(--color-text-on-dark)]">{n.num}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[0.6rem] text-surface-dark-foreground/25 font-body hidden sm:inline">{n.agent}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${n.status === "active" ? "bg-emerald-400" : "bg-surface-dark-foreground/15"}`} />
                  <span className="hidden font-body text-[0.6rem] text-[var(--color-text-muted-on-dark)] sm:inline">{n.agent}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${n.status === "active" ? "bg-[var(--color-accent-secondary)]" : "bg-[var(--color-dark-divider)]"}`} />
                </div>
              </div>
            ))}
@@ -88,28 +88,28 @@ function StepIllustration({ activeStep }: { activeStep: number }) {
          activeStep === 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-[340px] lg:max-w-[440px] bg-surface-dark rounded-2xl p-5 sm:p-6 lg:p-8 shadow-surface-xl">
        <div className="w-full max-w-[340px] rounded-2xl bg-[var(--color-dark-section)] p-5 shadow-surface-xl sm:p-6 lg:max-w-[440px] lg:p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[0.6rem] font-body text-surface-dark-foreground/25 uppercase tracking-[0.15em]">Call detail</div>
            <span className="text-[0.55rem] text-emerald-400/60 font-body px-2 py-0.5 rounded-full bg-emerald-400/10">Completed</span>
            <div className="text-[0.6rem] font-body uppercase tracking-[0.15em] text-[var(--color-text-muted-on-dark)]">Call detail</div>
            <span className="rounded-full bg-[var(--color-overlay-secondary-medium)] px-2 py-0.5 font-body text-[0.55rem] text-[var(--color-accent-secondary)]">Completed</span>
          </div>
          <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-surface-dark-foreground/[0.06]">
            <Phone className="w-3 h-3 text-surface-dark-foreground/20" />
            <span className="font-mono text-[0.7rem] text-surface-dark-foreground/50">+1 (415) 555-0142</span>
            <span className="ml-auto text-[0.6rem] text-surface-dark-foreground/20 font-body">4:23</span>
          <div className="mb-5 flex items-center gap-2.5 border-b border-[var(--color-dark-divider)] pb-4">
            <Phone className="h-3 w-3 text-[var(--color-accent-secondary)]" />
            <span className="font-mono text-[0.7rem] text-[var(--color-text-on-dark)]">+1 (415) 555-0142</span>
            <span className="ml-auto font-body text-[0.6rem] text-[var(--color-text-muted-on-dark)]">4:23</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare className="w-3 h-3 text-surface-dark-foreground/20" />
            <div className="text-[0.6rem] font-body text-surface-dark-foreground/25 uppercase tracking-[0.15em]">Transcript</div>
            <MessageSquare className="h-3 w-3 text-[var(--color-accent-secondary)]" />
            <div className="text-[0.6rem] font-body uppercase tracking-[0.15em] text-[var(--color-text-muted-on-dark)]">Transcript</div>
          </div>
          <div className="space-y-2 text-[0.72rem] font-body">
            <div className="flex gap-2.5">
              <span className="text-surface-dark-foreground/20 font-mono text-[0.6rem] shrink-0 w-9">Agent</span>
              <span className="text-surface-dark-foreground/40">Good afternoon, how can I help you today?</span>
              <span className="w-9 shrink-0 font-mono text-[0.6rem] text-[var(--color-text-muted-on-dark)]">Agent</span>
              <span className="text-[var(--color-text-on-dark)]">Good afternoon, how can I help you today?</span>
            </div>
            <div className="flex gap-2.5">
              <span className="text-surface-dark-foreground/20 font-mono text-[0.6rem] shrink-0 w-9">Caller</span>
              <span className="text-surface-dark-foreground/40">I&apos;d like to schedule a walkthrough of your enterprise plan.</span>
              <span className="w-9 shrink-0 font-mono text-[0.6rem] text-[var(--color-text-muted-on-dark)]">Caller</span>
              <span className="text-[var(--color-text-on-dark)]">I&apos;d like to schedule a walkthrough of your enterprise plan.</span>
            </div>
          </div>
        </div>
@@ -128,13 +128,13 @@ const Workflow = () => {
        {/* Heading */}
        <ScrollReveal variant="fade-up">
          <div className="mb-10 sm:mb-14">
            <span className="font-body text-[0.65rem] text-text-body uppercase tracking-[0.2em] block mb-4">How it works</span>
            <h2 className="text-[2.25rem] sm:text-[3rem] font-semibold tracking-[-0.03em] text-foreground leading-[1.08] mb-4">
            <span className="mb-4 block font-body text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">How it works</span>
            <h2 className="mb-4 text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-[3rem]">
              Three steps to a
              <br />
              working phone agent
            </h2>
            <p className="font-body text-[0.9rem] text-text-body leading-[1.7] max-w-md">
            <p className="max-w-md font-body text-[0.9rem] leading-[1.7] text-[var(--color-text-muted)]">
              No SDK integration, no custom infrastructure. Configure your agent, assign a number, and calls start flowing.
            </p>
          </div>
@@ -152,21 +152,21 @@ const Workflow = () => {
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 cursor-default ${
                    activeStep === step.id
                      ? "bg-white dark:bg-surface-elevated shadow-surface-sm"
                      ? "bg-[var(--color-bg)] shadow-surface-sm"
                      : "bg-transparent"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className={`font-mono text-[0.75rem] sm:text-[0.85rem] font-bold tracking-tight transition-colors duration-300 ${
                        activeStep === step.id ? "text-accent-gold" : "text-text-body/40"
                        activeStep === step.id ? "text-[var(--color-accent-secondary)]" : "text-[var(--color-text-muted)]/50"
                      }`}
                    >
                      {String(step.id + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={`font-display text-[1rem] sm:text-[1.1rem] font-semibold tracking-[-0.01em] leading-snug transition-colors duration-300 ${
                        activeStep === step.id ? "text-text-strong" : "text-text-body/70"
                        activeStep === step.id ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"
                      }`}
                    >
                      {step.title}
@@ -179,7 +179,7 @@ const Workflow = () => {
                        : "max-h-40 opacity-100 mt-2 lg:max-h-0 lg:opacity-0 lg:mt-0"
                    }`}
                  >
                    <p className="font-body text-[0.82rem] leading-[1.65] text-text-body">
                    <p className="font-body text-[0.82rem] leading-[1.65] text-[var(--color-text-muted)]">
                      {step.desc}
                    </p>
                  </div>
‎apps/web/src/components/landing/container-scroll.tsx‎
+1
-1
Lines changed: 1 addition & 1 deletion
Original file line number	Diff line number	Diff line change
@@ -174,7 +174,7 @@ export const HeroButton = React.forwardRef<
      }}
      ref={ref}
      className={cn(
        "group relative flex w-fit items-center rounded-full border border-[#84cc16] bg-gray-950/10 px-4 py-2 shadow-[0px_4px_24px_#84cc16] transition-colors hover:bg-slate-950/50",
        "group relative flex w-fit items-center rounded-full border border-[var(--color-accent-primary)] bg-[var(--color-overlay-dark)] px-4 py-2 shadow-[0px_4px_24px_rgba(238,48,58,0.28)] transition-colors hover:bg-[var(--color-overlay-medium)]",
        className,
      )}
      {...props}
‎apps/web/src/components/landing/dotted-surface.tsx‎
+13
-2
Lines changed: 13 additions & 2 deletions
Original file line number	Diff line number	Diff line change
@@ -21,6 +21,15 @@ function supportsWebGL() {
  }
}

function resolveThemeColor(input: string) {
  if (typeof window === "undefined" || !input.startsWith("var(")) {
    return input;
  }
  const token = input.slice(4, -1).trim();
  return getComputedStyle(document.documentElement).getPropertyValue(token).trim() || input;
}
export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
@@ -75,7 +84,9 @@ export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
      const colors: number[] = [];
      geometry = new THREE.BufferGeometry();
      const pointColor = new THREE.Color(
        resolvedTheme === "dark" ? "#d8d8d8" : "#d95f3b",
        resolveThemeColor(
          resolvedTheme === "dark" ? "var(--color-text-on-dark)" : "var(--color-accent-primary)",
        ),
      );

      for (let ix = 0; ix < AMOUNT_X; ix += 1) {
@@ -187,7 +198,7 @@ export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  }, [resolvedTheme]);

  const fallbackDotColor =
    resolvedTheme === "dark" ? "rgba(216,216,216,0.18)" : "rgba(217,95,59,0.14)";
    resolvedTheme === "dark" ? "var(--color-overlay-medium)" : "var(--color-overlay-accent-medium)";

  return (
    <>
‎apps/web/src/components/landing/header.tsx‎
+172
-57
Lines changed: 172 additions & 57 deletions
0 commit comments
Comments
0
 (0)
Comment
Copied! 
2 files remain