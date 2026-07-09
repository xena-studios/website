# Fonts

## Ethnocentric (display / wordmark)

Ethnocentric is a **licensed** font (Typodermic Fonts) and cannot be redistributed,
so it isn't committed here. The site is wired to use it the moment you add it:

1. Buy / obtain **Ethnocentric** and convert it to `.otf`.
2. Save it as `public/fonts/ethnocentric.otf` (this folder).
3. Rebuild. The `@font-face` in `src/app.css` picks it up automatically.

Until the file is present, the display stack falls back to **Orbitron** (loaded from
Google Fonts), so wordmarks and the hero still render in a close futuristic face.

The font stack is defined in `src/app.css`:

```css
--font-display: "Ethnocentric", "Orbitron", ui-sans-serif, system-ui, sans-serif;
```
