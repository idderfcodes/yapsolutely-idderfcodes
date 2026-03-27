## Responsive Typography Scale

Breakpoints (Tailwind):
- Mobile: default (< 640px)
- Tablet: md (768px)
- Desktop: lg (1024px)
- Wide: xl (1280px)

| Element       | Mobile  | Tablet  | Desktop | Wide    |
|---------------|---------|---------|---------|---------|
| H1            | 40px    | 56px    | 72px    | 80px    |
| H2            | 32px    | 40px    | 48px    | 56px    |
| H3            | 20px    | 22px    | 24px    | 24px    |
| Stats numbers | 40px    | 48px    | 56px    | 64px    |
| Body          | 15px    | 16px    | 16px    | 18px    |
| Nav links     | 14px    | 14px    | 14px    | 14px    |
| Button text   | 14px    | 14px    | 14px    | 15px    |
| Captions      | 12px    | 12px    | 12px    | 13px    |
| Badge pill    | 12px    | 13px    | 13px    | 13px    |

Tailwind classes example for H1:
text-[40px] md:text-[56px] lg:text-[72px] xl:text-[80px]

---

## Responsive Spacing Scale

| Element              | Mobile  | Tablet  | Desktop |
|----------------------|---------|---------|---------|
| Section padding Y    | py-16   | py-20   | py-24   |
| Section padding X    | px-4    | px-8    | px-16   |
| Card padding         | p-4     | p-5     | p-6     |
| Component gap        | gap-4   | gap-6   | gap-8   |
| Hero padding top     | pt-20   | pt-24   | pt-32   |

---

## Responsive Layout

| Section          | Mobile       | Tablet         | Desktop        |
|------------------|--------------|----------------|----------------|
| Hero             | stack col    | stack col      | 50/50 split    |
| Logo marquee     | same         | same           | same           |
| Positioning      | stack col    | stack col      | 3 col grid     |
| Use cases        | tabs above   | tabs above     | tabs left side |
| How it works     | stack col    | 3 col grid     | 3 col grid     |
| Features bento   | stack col    | 2 col grid     | 2+4 bento      |
| Stats bar        | stack col    | 3 col row      | 3 col row      |
| Testimonials     | stack col    | 2 col grid     | 3 col grid     |
| Security         | 2 col grid   | 2 col grid     | 4 col grid     |
| Integrations     | 2 col grid   | 3 col grid     | 3 col grid     |
| Footer           | stack col    | 2 col grid     | 4 col grid     |

---

## Responsive Nav

Mobile:
- Hide center links
- Show hamburger menu icon
- Full screen menu on open
- Logo left, hamburger right

Tablet (md):
- Same as mobile OR show condensed links
- CTA button visible

Desktop (lg):
- Full nav visible
- All links + dropdowns
- Sign in + CTA button

---

## Responsive Hero

Mobile:
- Single column, stacked
- Video below copy
- H1: 40px
- Video: 16:9 ratio, full width
- Both panels merge into single dark #141414 bg

Tablet:
- Single column still
- H1: 56px
- Video below copy, full width

Desktop:
- True 50/50 split side by side
- Left panel #141414, right panel #1A1A1A
- Full viewport height

---

## Responsive Video

Mobile: width 100%, height auto, aspect-video
Tablet: width 100%, height auto
Desktop: fill right panel completely, object-cover

---

## Responsive Bento Grid

Mobile: single column stack
Tablet: 2 column grid, all cards equal
Desktop: row 1 = 2 wide cards (1fr 1fr), row 2 = 4 small cards (repeat 4, 1fr)

---

## Rules

- Never use fixed px widths on containers — always use % or max-w
- Max content width: max-w-7xl (1280px) centered with mx-auto
- All sections: w-full with horizontal padding
- Images and videos: always w-full, never fixed width
- Touch targets on mobile: minimum 44px height on all buttons and links
- Font sizes never go below 12px on any device
```

---

Add this entire block to your `DESIGN_SYSTEM.md` after the existing content. Then update your `.cursorrules` instruction to:
```
Always read DESIGN_SYSTEM.md before any UI work.
Apply responsive classes for all font sizes, spacing, 
and layouts as defined. Never hardcode sizes that 
don't account for mobile, tablet, and desktop breakpoints.

## Typography

Display / Headlines: Bagoss Condensed Medium
Body / UI / Nav: Inter

### Fluid type scale using clamp()
Format: clamp(minimum, preferred, maximum)
Preferred value uses viewport width (vw) for smooth scaling.

| Element        | Font             | Clamp value                    | Weight   | Line height |
|----------------|------------------|--------------------------------|----------|-------------|
| H1             | Bagoss Condensed | clamp(40px, 5.5vw, 80px)      | Medium   | 1.0         |
| H2             | Bagoss Condensed | clamp(32px, 4vw, 56px)        | Medium   | 1.1         |
| H3             | Bagoss Condensed | clamp(20px, 2.5vw, 24px)      | Medium   | 1.2         |
| Stats numbers  | Bagoss Condensed | clamp(40px, 5vw, 64px)        | SemiBold | 1.0         |
| Body           | Inter            | clamp(15px, 1.2vw, 18px)      | 400      | 1.6         |
| Nav links      | Inter            | clamp(13px, 1vw, 14px)        | 400      | 1.5         |
| Button text    | Inter            | clamp(13px, 1vw, 15px)        | 500      | 1.0         |
| Captions       | Inter            | clamp(11px, 0.9vw, 13px)      | 400      | 1.5         |
| Badge pill     | Inter            | clamp(11px, 0.9vw, 13px)      | 500      | 1.0         |

### How to implement in Tailwind
Tailwind doesn't support clamp() natively in font sizes.
Use arbitrary values:

H1: className="text-[clamp(40px,5.5vw,80px)]"
H2: className="text-[clamp(32px,4vw,56px)]"
H3: className="text-[clamp(20px,2.5vw,24px)]"
Stats: className="text-[clamp(40px,5vw,64px)]"
Body: className="text-[clamp(15px,1.2vw,18px)]"
Nav: className="text-[clamp(13px,1vw,14px)]"
Button: className="text-[clamp(13px,1vw,15px)]"
Caption: className="text-[clamp(11px,0.9vw,13px)]"
Badge: className="text-[clamp(11px,0.9vw,13px)]"

### Or add to tailwind.config.ts for cleaner usage:
theme: {
  extend: {
    fontSize: {
      'display-1': 'clamp(40px, 5.5vw, 80px)',
      'display-2': 'clamp(32px, 4vw, 56px)',
      'display-3': 'clamp(20px, 2.5vw, 24px)',
      'stats': 'clamp(40px, 5vw, 64px)',
      'body': 'clamp(15px, 1.2vw, 18px)',
      'nav': 'clamp(13px, 1vw, 14px)',
      'btn': 'clamp(13px, 1vw, 15px)',
      'caption': 'clamp(11px, 0.9vw, 13px)',
      'badge': 'clamp(11px, 0.9vw, 13px)',
    }
  }
}

Then use cleanly:
className="text-display-1"
className="text-display-2"
className="text-stats"

### Font loading
Bagoss Condensed — local font, add to globals.css:

@font-face {
  font-family: 'BagossCondensed';
  src: url('/fonts/bagoss/BagossCondensedTRIAL-Medium.ttf') format('truetype');
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: 'BagossCondensed';
  src: url('/fonts/bagoss/BagossCondensedTRIAL-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-display: swap;
}

Inter — load from Google Fonts in layout.tsx:
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], weight: ['400', '500'] })

### Rules
- Never use Bagoss for body text
- Never use Inter for headlines
- Never go below clamp minimum values
- font-display: swap on all custom fonts to prevent invisible text
- Letter spacing on H1: tracking-tight (-0.02em)
- Letter spacing on H2: tracking-tight (-0.01em)
- Letter spacing on body: tracking-normal (0)
- Letter spacing on badges/caps labels: tracking-wide (0.05em)

---

# Deel-Inspired Typography System

This design system utilizes a "Display-First" approach, pairing a high-character 
brand font with a high-utility interface font.

---

## 1. Core Typefaces

### Primary Display: Bagoss Standard
- **Purpose**: Hero headlines, section titles, and high-impact quotes.
- **Weights used**: SemiBold (600), Bold (700).
- **Vibe**: Modern, structural, and "chunky."
- **Alternative (Free)**: [Plus Jakarta Sans](https://fonts.google.com) (Bold/ExtraBold).

### Primary Interface: Inter
- **Purpose**: Body text, navigation, buttons, and form labels.
- **Weights used**: Regular (400), Medium (500), SemiBold (600).
- **Vibe**: Neutral, highly legible, optimized for screens.
- **Availability**: [Google Fonts (Free)](https://fonts.google.com).

---

## 2. Type Scale (Desktop)

Deel follows a responsive scale, typically utilizing larger, high-contrast 
headings on desktop.


| Level | Font Family | Size | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **H1 (Hero)** | Bagoss | 64px | 700 | 1.1 (72px) | -0.02em |
| **H2 (Section)** | Bagoss | 48px | 600 | 1.2 (56px) | -0.01em |
| **H3 (Subhead)** | Bagoss | 32px | 600 | 1.25 (40px) | Normal |
| **Body (Large)** | Inter | 18px | 400 | 1.6 (28px) | Normal |
| **Body (Default)**| Inter | 16px | 400 | 1.5 (24px) | Normal |
| **Small/Label** | Inter | 14px | 500 | 1.4 (20px) | +0.01em |

---

## 3. Implementation Rules

### Visual Hierarchy
- **Tight Leading for Headlines**: Bagoss looks best when the line height is 
  tight (around 110-120%). This emphasizes its "chunky" nature.
- **Letter Spacing (Tracking)**: Apply slight negative tracking (`-0.01em` to 
  `-0.02em`) to large Bagoss headlines to create a "locked-in" look.
- **Color Contrast**: Headlines are almost always "Deel Dark Blue" (#000000 
  or #041F69) or White, while body text uses a softer slate gray for 
  readability.

### Baseline Grid
- Align all text to an **8px baseline grid**. 
- Line heights should always be a multiple of 4 or 8 (e.g., 16, 24, 32, 40).

---

## 4. CSS Variable Shortcuts

```css
:root {
  /* Fonts */
  --font-display: 'Bagoss Standard', 'Plus Jakarta Sans', sans-serif;
  --font-interface: 'Inter', system-ui, sans-serif;

  /* Sizes */
  --text-h1: 4rem;    /* 64px */
  --text-h2: 3rem;    /* 48px */
  --text-h3: 2rem;    /* 32px */
  --text-body: 1rem;  /* 16px */
  --text-small: 0.875rem; /* 14px */
}
