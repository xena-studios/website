# Fonts

## Ethnocentric (display / wordmark)

`ethnocentric.otf` is the Xena Studios display face, used for the wordmark and hero. It is
free to use and redistribute, so it is committed here and served directly.

The `@font-face` in `src/app.css` loads it, with **Orbitron** (Google Fonts) as a fallback in
the stack:

```css
--font-display: "Ethnocentric", "Orbitron", ui-sans-serif, system-ui, sans-serif;
```

To swap the display face, replace `ethnocentric.otf` and update the `@font-face` in `src/app.css`.
