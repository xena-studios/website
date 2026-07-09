# Design

The Xena Studios design language: a dark-only **mission-control HUD**. The surface reads like
instrumentation for an engineered system, monospace readouts, telemetry framing, thin rules, a
single amber signal color, near-square geometry. Tokens are Fumadocs' `--color-fd-*` variables,
overridden in `src/app.css`; the landing page composes them into HUD primitives.

## Theme

**Dark only.** The theme is forced dark in `press.config.tsx`
(`theme: { forcedTheme: "dark" }`) and the theme switch is disabled
(`themeSwitch: { enabled: false }`). Palette tokens are set on both `:root` and `.dark` so there
is no light flash before hydration. Do not add a light theme without a product reason.

## Color

OKLCH throughout. Neutrals are tinted cool (hue ~250) toward a blue-slate near-black; the accent
is a warm signal amber (hue ~68). Chroma stays low on neutrals and modest on the accent to avoid
glare. Strategy: **Committed**, amber carries every meaningful moment (links, active state, CTAs,
markers, HUD ticks) against the near-black field. Amber is never used as body text.

| Token | Value (OKLCH) | Role |
|---|---|---|
| `--color-fd-background` | `0.152 0.012 252` | page field, near-black |
| `--color-fd-foreground` | `0.93 0.008 250` | primary text, cool off-white |
| `--color-fd-muted-foreground` | `0.68 0.015 250` | secondary text, labels |
| `--color-fd-card` | `0.183 0.014 252` | panels / raised surfaces |
| `--color-fd-border` | `0.42 0.02 250 / 0.4` | hairline rules and frames |
| `--color-fd-primary` | `0.8 0.15 68` | **signal amber** — accent, links, CTAs |
| `--color-fd-primary-foreground` | `0.16 0.03 68` | text on amber |
| `--color-fd-ring` | `0.8 0.15 68` | focus ring |
| `--color-signal` | `0.8 0.15 68` | raw amber for HUD accents (theme-independent) |
| `--color-signal-soft` | `0.8 0.15 68 / 0.14` | hero bloom |

Selection is amber-on-dark. Do not introduce a second accent hue; the palette's discipline is
part of the voice.

## Typography

Two families, a deliberate mission-control pairing.

- **Display — `--font-display`: `"Ethnocentric", "Orbitron", ...`.** Wide techno face for the
  wordmark, hero, section titles, system codes/names, and telemetry numerals. Ethnocentric is
  licensed and self-hosted (`public/fonts/ethnocentric.otf`, `@font-face` in `app.css`); until
  the file is present it falls back to **Orbitron** (Google Fonts). Used uppercase with tight
  tracking (`-0.01em`).
- **Mono — `--font-mono` / `--default-font-family`: `"Source Code Pro", ...`.** The body face and
  everything else: prose, UI labels, code, nav, tags, kicker labels. This is intentional (a
  named terminal system, not "mono as shorthand"). Uppercase mono with wide tracking
  (`0.12em`–`0.28em`) is the label grammar.

Scale is fluid on the hero (`clamp(2.3rem, 9vw, 5.75rem)`), stepped elsewhere. Light-on-dark
body uses generous line-height (~1.7) for legibility.

## Geometry & radius

Near-square. The Tailwind radius scale is flattened in `@theme` (`--radius-sm: 0`,
`--radius-lg: 2px`, up to `--radius-4xl: 6px`) so Fumadocs' search box, buttons, popovers, code
blocks and cards all read sharp. `--radius-full` is left intact for status dots and pills. HUD
buttons use `rounded-none`. No decorative rounding.

## Layout

- Content column `max-w-6xl`, fluid horizontal padding.
- Sections open with a **HUD section header**: an index (`01`, `02`), a display title, and a
  right-aligned mono note, over a hairline rule.
- The systems list is full-width **rows** (indexed `S-01`…`S-04`), not a card grid, each row a
  grid of `[code | body | meta+actions]` that stacks on mobile. A hairline sweeps amber on hover.
- Vary spacing for rhythm; generous section separation, tight label groupings.

## HUD primitives (`src/app.css`)

- `.hud-grid` — fine engineering grid, radial-masked to fade at the edges (hero background).
- `.signal-bloom` — soft amber radial bloom behind the hero.
- `.hud-frame` — amber corner ticks (top-left / bottom-right) on framed panels (the Uplink
  terminal).
- Telemetry strip — a 4-cell grid of `value / label` readouts, hairline-separated.
- Buttons — square, mono uppercase, tracked; primary is amber, secondary is outline.

## Iconography

Inline SVG only (no icon-font dependency; `lucide-react` is not hoisted here). Stroke icons at
1.8–2px, filled brand marks (GitHub, Modrinth) as-is. Project **kind markers**: a round dot for a
`PLUGIN`, a rotated square (diamond) for the `PLATFORM`, echoing the wordmark's diamond glyph.

## Motion

Entrance and ambient only, all ease-out-expo (`cubic-bezier(0.16, 1, 0.3, 1)`).

- `hud-rise` — staggered upward fade for hero elements (delays 0.05s–0.28s).
- `hud-sweep` — left-origin scaleX for rules / row hovers.
- `hud-blink` — the `SYS.ONLINE` status dot.

All three are disabled under `@media (prefers-reduced-motion: reduce)`. Never animate layout
properties; transform/opacity only.

## Voice & copy

Terminal-native and exact. Uppercase mono system labels (`// OPEN-SOURCE INFRASTRUCTURE STUDIO`,
`SYS.ONLINE`, `xena@studios:~$ contact`). Numbers over adjectives. **No em dashes** in interface
copy (use commas, colons, periods). Every readout must be true: the telemetry strip states the
real fleet composition (`04 SYSTEMS`, `100% OPEN SOURCE`, `03 PLUGINS`, `01 PLATFORM`).
