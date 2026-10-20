---
name: Xena Studios website
description: xenastudios.co, the studio's front door. Ion Blue on deep space, type-only brand, one planet horizon.
source: xena-studios/brand (synced into src/brand/ by scripts/sync-brand.mjs)
colors:
  void: "#06080D"
  space: "#0A0E16"
  surface: "#121824"
  line: "#222B3B"
  muted: "#8A93A6"
  text: "#EDF1F7"
  accent: "#5CB4FF"
typography:
  family: "JetBrains Mono Variable, ui-monospace, monospace"
  h1: { size: "clamp(1.75rem, 1.1rem + 3.9vw, 4.5rem)", weight: 600, lineHeight: 1.05, letterSpacing: "-0.03em" }
  h2: { size: "clamp(1.75rem, 1.3rem + 1.9vw, 2.75rem)", weight: 600, lineHeight: 1.12, letterSpacing: "-0.03em" }
  h3: { size: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)", weight: 600 }
  lead: { size: "clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)", lineHeight: 1.75, color: muted }
  body: { size: "1rem", lineHeight: 1.7 }
  label: { size: "0.75rem", letterSpacing: "0.14em", transform: uppercase, color: muted }
spacing: "4pt scale: 4, 8, 12, 16, 24, 32, 48, then fluid 64–96 and 96–160"
rounded: { image: "12px", button: "999px" }
motion: { ease: "cubic-bezier(0.16, 1, 0.3, 1)", hero: "1.8s horizon rise, copy settles in a 90ms stagger" }
icons: "one authored outbound arrow (External.astro), 1.4 stroke, currentColor"
---

# Design

## 1. Overview

**North star: Linear-grade precision on the brand repo, nothing invented.** Every colour, logo and scene comes from [xena-studios/brand](https://github.com/xena-studios/brand). The site composes them with exact type, hairlines, and space. It reads like an engineer wrote it: plain claims, real screenshots, links to source.

The page is one column of four ideas (hero, Raptor, how we work, contact) on deep space, bookended by the brand's planet horizon at the top and bottom.

## 2. Colour

Restrained: tinted deep-space neutrals with Ion Blue under a tenth of any screen. Tokens are the brand's `--xena-*` custom properties, aliased in `src/styles/global.css` (`--bg`, `--raised`, `--surface`, `--rule`, `--muted`, `--text`, `--accent`).

- **Ion Blue** (`accent`) marks the one primary action, the contact address, focus rings, selection, and the horizon's rim. Nothing decorative.
- **Raptor red** appears only inside Raptor's own logo, never as a site colour.
- Contrast (WCAG 2.2 AA): muted on void 6.5:1, text on void 17.7:1, accent on void 9.0:1, void on accent 9.0:1, muted on surface 5.8:1.
- Translucent colours mix in **sRGB** (`color-mix(in srgb, X, transparent)`); oklch mixing with `transparent` drifts the hue toward red.

## 3. Typography

One family, **JetBrains Mono** (variable, self-hosted via Fontsource), with size and weight doing the hierarchy. **Ethnocentric is never live text**: its licence covers outlined artwork only, so it appears solely inside the brand's logo SVGs (`Logo.astro`).

- Headings 600 with -0.03em tracking and `text-wrap: balance`; prose `text-wrap: pretty`, capped at 64ch.
- `.label` (uppercase, +0.14em) is used for metadata only (the screenshot caption, "Runs on", the copyright), never as an eyebrow above a heading.
- The latin subset of the font is preloaded so headings don't reflow after the first paint.

## 4. Components

- **External** (`src/components/External.astro`): the site's only icon, an outbound arrow drawn as SVG at 0.62em in `currentColor`, nudging up-right on hover and focus. Every link that leaves the site carries it; no Unicode arrows.
- **Logo** (`src/components/Logo.astro`): inlines a brand logo SVG, crops the exported clear space, and fills with `currentColor`.
- **Horizon** (`src/components/Horizon.astro`): inlines `scene/horizon.svg` with `preserveAspectRatio="xMidYMax slice"` and a bottom mask so the planet body fades into the page. Positioned absolutely at the bottom of an `isolation: isolate` section.
- **Buttons**: pill, 44px tall. Primary is solid Ion Blue with void text; secondary is a hairline outline that warms toward Ion Blue on hover.
- **Spec list** (Raptor parts): a `<dl>` of hairline-separated rows, name / what / where, collapsing to one column under 44rem.
- **Principles**: hairline rows, statement left and explanation right, collapsing under 52rem. Not cards.
- **Screenshot**: real Raptor capture through `astro:assets` (responsive WebP), 12px radius, hairline border, a bottom fade because the capture is cropped. On phones it crops to the top-left at a readable size.

## 5. Motion

One authored moment: on load, the hero horizon rises (1.8s, expo out) and the hero copy settles in a short stagger. Nothing else animates on entry; sections are simply there when you scroll to them. Hover and focus transitions run 160–200ms on the same curve.

`prefers-reduced-motion: reduce` collapses every animation and transition to its final state instantly, and no content depends on an animation to become visible.

## 6. Browser surfaces

The parts the browser draws are themed from the palette too: `color-scheme: dark`, Ion Blue focus rings (2px, 3px offset), Ion Blue text selection at 35%, a `line`-on-`void` scrollbar, and link underlines at 0.25em offset in a 35% tint of the text colour.

## 7. Do's and Don'ts

**Do:** pull new visuals from the brand repo first (`npm run brand:sync`); link claims to code, docs, or releases; keep one idea per section; keep Raptor in its own identity.

**Don't:** add stars, particles, galaxy imagery, glows beyond the horizon, gradient text, card grids, eyebrows above headings, Unicode or emoji icons, entrance animations on every section, or a second accent colour. Don't set Ethnocentric as live text. Don't recolour Raptor's logo. Don't inline styles or scripts: the CSP blocks them.
