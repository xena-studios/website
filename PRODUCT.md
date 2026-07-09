# Product

## Register

brand

## Platform

web

## Users

Server operators and network owners running Minecraft networks (Paper / Folia), plus the
developers who extend them and self-hosters who run their own game-server boxes. They arrive to
evaluate Xena Studios' open-source tooling, read the docs for a specific project, grab a build
from Modrinth or GitHub, or make contact. They are technical, skeptical of marketing, and
reassured by precision and evidence of reliability.

## Product Purpose

The public home of Xena Studios: a landing page that showcases the fleet of projects (three
Paper/Folia plugins and one self-hosting platform) with clear routes to each project's page,
source, and docs, plus first-class documentation for the plugins. Success is a visitor
immediately understanding what the studio ships, trusting it is well-engineered, and reaching
the right destination (docs, Modrinth, the platform, or source) in one click.

## Brand Personality

Engineered, precise, unstoppable. The voice is mission-control: terminal-native, exact, quietly
confident. It never oversells. The reliability of the software (fail-safe, near-zero overhead,
thread-correct) is the brand, so the interface itself should feel like instrumentation, not
marketing. Emotional goal: the calm confidence of a system that stays online.

## Anti-references

- Generic SaaS-cream landing pages (soft gradients, rounded cards, pastel blobs, hero-metric
  templates).
- Crypto / "web3" neon-on-pure-black with glow spam.
- Cluttered gamer/esports sites with drop-shadows, badges, and loud imagery.
- Editorial-magazine aesthetic (display-serif + italic + drop caps). This is not a magazine.

## Design Principles

- **Instrumentation, not decoration.** Every label, number, and readout means something. If a
  stat cannot be defended as true and useful, it does not ship.
- **Fail-safe is the message.** The software never goes down; the site should read as engineered
  and exact, reinforcing that promise through precision rather than adjectives.
- **Terminal-native voice.** Monospace, uppercase system labels, coordinate/telemetry framing,
  bracketed actions. The register is a console, not a brochure.
- **One click to the right place.** Each project routes clearly to its canonical page (Modrinth
  for published plugins, the site for the platform), its source, and its docs.
- **Sharp over soft.** Near-square geometry, thin rules, deliberate spacing. No decorative
  rounding, no glassmorphism.

## Accessibility & Inclusion

- Target WCAG 2.1 AA contrast for text and interactive elements against the near-black surface.
- All motion is entrance/ambient only and is disabled under `prefers-reduced-motion`.
- Keyboard navigation and focus states come from Fumadocs defaults; the amber ring token is kept
  visible. Icons that are decorative are `aria-hidden`; links that are icon-only carry
  `aria-label`s.
- Dark-only by design; the palette keeps chroma modest and contrast high for legibility.
