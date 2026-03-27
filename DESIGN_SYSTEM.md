# Yapsolutely Design System

> **Always read this file before making any UI changes.**
> All colors, fonts, spacing, and interactions must match the design system exactly.
> Never use colors outside of what is defined here.

---

## Colors

### Light surfaces
```
--color-bg: #FFFFFF
--color-bg-secondary: #F7F4EF
--color-bg-card: #F0EDE8
--color-border: #E8E4DE
```

### Text
```
--color-text-primary: #141414
--color-text-muted: #6B6860
--color-text-on-dark: #F7F4EF
--color-text-muted-on-dark: #9A9590
```

### Accent scale
```
--color-accent-deep: #B10032
--color-accent-primary: #EE303A
--color-accent-hover: #FF631E
--color-accent-secondary: #FF7B30
--color-accent-pop: #FFD101
```

### Dark sections
```
--color-dark-primary: #141414
--color-dark-secondary: #1A1A1A
--color-dark-divider: #2A2A2A
```

### Gradient
```
--gradient-accent: linear-gradient(135deg, #FF7B30, #EE303A, #B10032)
```

---

## Tailwind config mapping

Extend your `tailwind.config.ts` with:

```js
colors: {
  bg: '#FFFFFF',
  'bg-secondary': '#F7F4EF',
  'bg-card': '#F0EDE8',
  border: '#E8E4DE',
  text: '#141414',
  muted: '#6B6860',
  'text-dark': '#F7F4EF',
  'muted-dark': '#9A9590',
  'accent-deep': '#B10032',
  accent: '#EE303A',
  'accent-hover': '#FF631E',
  'accent-secondary': '#FF7B30',
  pop: '#FFD101',
  dark: '#141414',
  'dark-2': '#1A1A1A',
  'dark-divider': '#2A2A2A',
}
```

---

## Typography

**Display / Headlines:** Bagoss Condensed Medium  
**Body / UI / Nav:** Inter

| Element        | Font               | Size  | Weight    | Line height |
|----------------|--------------------|-------|-----------|-------------|
| H1             | Bagoss Condensed   | 72px  | Medium    | 1.0         |
| H2             | Bagoss Condensed   | 48px  | Medium    | 1.1         |
| H3             | Bagoss Condensed   | 24px  | Medium    | 1.2         |
| Stats numbers  | Bagoss Condensed   | 56px  | SemiBold  | 1.0         |
| Body           | Inter              | 16px  | 400       | 1.6         |
| Nav links      | Inter              | 14px  | 400       | 1.5         |
| Button text    | Inter              | 14px  | 500       | 1.0         |
| Captions       | Inter              | 12px  | 400       | 1.5         |
| Badge pill     | Inter              | 13px  | 500       | 1.0         |

Font files location: `apps/web/src/app/fonts/landing/`
- `bagoss-condensed/BagossCondensedTRIAL-Medium.woff2` — use for H1, H2, H3
- `bagoss-condensed/BagossCondensedTRIAL-SemiBold.woff2` — use for stats numbers only

Inter: load via `next/font/local` from `inter-variable.ttf`

---

## Spacing

Base unit: 8px  
All spacing must be multiples of 8px.  
Use Tailwind spacing scale — `p-2` (8px), `p-4` (16px), `p-8` (32px), `p-16` (64px)

Section vertical padding: `py-24` (96px) minimum  
Component internal padding: `p-6` (24px) or `p-8` (32px)

---

## Border radius

- Buttons: `rounded-md` (8px)
- Cards: `rounded-xl` (12px)
- Pills/badges: `rounded-full` (999px)
- Large sections: `rounded-2xl` (16px)

---

## Shadows

- Cards: `shadow-sm` only
- Hover state: `shadow-md`
- No dramatic drop shadows anywhere

---

## Color application rules

### Buttons
- Primary: `bg #EE303A`, text `#FFFFFF`, hover `bg #FF631E`, active `bg #B10032`
- Ghost on light: border `#E8E4DE`, text `#141414`, hover border `#141414`
- Ghost on dark: border `#F7F4EF`, text `#F7F4EF`

### Text on backgrounds
- Light bg (`#FFFFFF`, `#F7F4EF`): text `#141414`, muted `#6B6860`
- Dark bg (`#141414`, `#1A1A1A`): text `#F7F4EF`, muted `#9A9590`
- Colored buttons (`#EE303A`, `#FF631E`): text `#FFFFFF` always
- `#FFD101` bg: text `#141414` always — **NEVER white on yellow**

### Cards
- Background: `#F7F4EF` or `#FFFFFF`
- Border: `#E8E4DE` default
- Hover border: `#FF631E`
- Hover transform: `translateY(-2px)`
- Transition: `all 0.2s ease`

### Section backgrounds alternate
- Light sections: `#FFFFFF`
- Secondary sections: `#F7F4EF`
- Dark sections: `#141414`

---

## Icons

- Library: Heroicons
- Style: outline
- Size: 20px default, 24px for feature cards
- Color: inherit from context — `#EE303A` for accents, `#6B6860` for muted

---

## Interactions

**Buttons:**
- `cursor-pointer` on all interactive elements
- hover: `scale(1.03)` + box-shadow glow at 30% opacity in button color
- transition: `all 0.15s ease`

**Cards:**
- hover: `translateY(-2px)`
- hover: border-color → `#FF631E`
- transition: `all 0.2s ease`

**Links:**
- default: `#6B6860`
- hover: `#EE303A`
- transition: `color 0.15s ease`

---

## Animations

Scroll entrance (all sections):
- Framer Motion `whileInView`
- initial: `opacity 0`, `y: 20`
- animate: `opacity 1`, `y: 0`
- transition: `duration 0.5s`, `ease easeOut`
- viewport: `once true`
- Stagger children: 0.1s delay between each

Hero H1:
- Word by word reveal on page load
- Each word: `opacity 0 → 1`, `y: 10 → 0`
- Stagger: 0.08s per word

Stats numbers:
- Count up from 0 on scroll into view
- Duration: 1.5s

---

## Component rules

### Nav
Sticky. Default: bg white, no border.  
On scroll: `backdrop-blur-md`, `bg white/90`, `border-b #E8E4DE`

### Hero
50/50 split, full viewport height.  
Left panel: `#141414`  
Right panel: `#1A1A1A`  
Both panels go full height — no gap between them.

### Badge pill
- bg: `#1C1C1C` (on dark) or `#F0EDE8` (on light)
- text: `#9A9590` (on dark) or `#6B6860` (on light)
- pulse dot: `#FFD101`
- border-radius: full
- padding: `px-3 py-1`

### Section labels
- Small pill above H2
- bg: transparent
- border: `1px solid #EE303A`
- text: `#EE303A`
- border-radius: full
- font: Inter 12px

### Accent word in H1
- Always the last or most impactful word
- Color: `#FF631E`
- No underline, no other decoration

---

## Hero video

The hero right panel uses a video player.  
Asset: `/videos/hero-demo.mp4` (served from `apps/web/public/videos/`)  
A replacement video `lv_0_20260327165847 (1).mp4` is available at `/workspaces/yapsolutely-idderfcodes/videos/` and should be copied to `apps/web/public/videos/hero-demo.mp4` when ready.

---

## Do not use

- Any shade of purple or blue as accent
- Pure `#000000` black
- Pure `#FFFFFF` white as text
- Inter for headlines
- Bagoss for body text
- Box shadows larger than `shadow-md`
- More than 2 fonts
- Any color not in this design system
- Generic gray `#888888` or similar
- shadcn default colors on the landing page
