# Yapsolutely Design System (Deel-Inspired)

## Core Variables
- `--mz-coral`: `#FF4F40` (Primary Accent / Call to Action)
- `--mz-navy`: `#091723` (Backgrounds, Strong Text, Core Elements)
- `--mz-bg`: `#F2F8F3` (Light Backgrounds, Panels)
- `--mz-white`: `#FFFFFF` (Surfaces, Light Text)
- `--mz-gray`: `#545454` (Muted Text, Subtle Borders)

## Geometry
- `--rad-card`: `24px` (Large surfaces, panels, feature cards)
- `--rad-pill`: `32px` (Buttons, badges, tags)

## The Deel Look Rules
- Use massive Bagoss typography for heroes.
- Use tight spacing (-0.04em) on titles.
- Generous padding inside pill buttons (32px radius).
- Minimalist palette heavily leaning on Navy vs White space, with Coral as the bold pop.

## Typography Roles

### "Face" (Hero, Titles, Display)
- **Font**: BagossExtendedFont / BagossStandardVF
- **Tracking**: `-0.04em` (very tight)
- **Line-Height**: `1.05` to `1.1`
- **Fluid Scale**: (clamp rules for h1-h6)

### "Logic" (UI, Body, Buttons)
- **Font**: Inter
- **Tracking**: `-0.01em`
- **Line-Height**: `1.5`
- **Fluid Scale**: Responsive body sizes

## Fluid Typography (Face)
- **H1**: `clamp(40px, 6vw, 96px)`
- **H2**: `clamp(32px, 5vw, 64px)`
- **H3**: `clamp(28px, 4vw, 48px)`
- **H4**: `clamp(24px, 3vw, 36px)`
