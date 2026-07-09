# Xena Studios Website — Developer Context

The official **Xena Studios** website: a landing page (contact info + platform links + project
showcase) and documentation for our projects. It's a **Fumapress** app — an opinionated docs
framework powered by **Waku** (React Server Components) and **Fumadocs**. Content is MDX; the
landing page is a Waku React page. The site builds to static output. Priority order:
**clarity of content > correct navigation/structure > polish > cleverness**.

## Conventions (IMPORTANT)
- **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`, `ci:`, `refactor:`, `test:`),
  scoped where useful (e.g. `feat(docs):`, `feat(landing):`). Commit in small, feature-grouped
  increments.
- **Commit body is a bulleted list** of the concrete changes (one `-` item per change), as in
  the other Xena Studios repos.
- **Do NOT** add a `Co-Authored-By: Claude` trailer to commits.

## Build / target
- **Fumapress `0.7.1`** on **Waku `1.0.0-beta.6`**, **React 19**, **Tailwind CSS v4**,
  **TypeScript** (strict). Package manager is **pnpm**.
- Scripts: `pnpm dev` (dev server on :3000), `pnpm build` (static build → `dist/`),
  `pnpm start` (serve the build), `pnpm types:check` (`fumadocs-mdx` codegen + `tsc --noEmit`),
  `pnpm preview` (`wrangler dev` over `dist/public`), `pnpm deploy` (`waku build && wrangler deploy`).
- **Verify with a real build**, not just types: `pnpm build` renders every page (SSG) and is the
  only thing that catches MDX/Shiki/RSC errors. `pnpm types:check` alone will pass on a page that
  fails to render.
- **Fully static + Cloudflare.** `press.config.tsx` sets `mode: "static"`, so `waku build`
  prerenders everything into `dist/public` — pages, the search index (`/api/search`), RSC
  navigation payloads, `sitemap.xml`, `llms.txt`, OG images — with **no server runtime**. It
  deploys to **Cloudflare Workers as static assets** via [`wrangler.jsonc`](wrangler.jsonc)
  (assets-only, no Worker script; `html_handling: "drop-trailing-slash"` to keep Waku's clean
  URLs, `not_found_handling: "404-page"`). Fumapress hardcodes `waku/adapters/default` in its
  managed server entry, so the *dynamic* Worker path isn't wired up — static is the supported
  route and matches the content (docs/blog/landing are all static). `pnpm exec wrangler login`
  once before `pnpm deploy`.

## Layout
- `src/pages/index.tsx` — the landing page (a Waku React page): the mission-control HUD (hero,
  telemetry strip, `systems` manifest rows, Uplink terminal, footer). Uses `buttonVariants` from
  `fumadocs-ui`, `Link` from `fumapress/client`, and hand-rolled inline-SVG icons (no
  `lucide-react` — it isn't a hoisted dependency here).
- `src/pages/_layout.tsx` — re-exports `HomeLayout` from `press.config` to wrap the landing page.
- `src/cn.ts` — tiny `cn()` class-name joiner (avoids adding `cnfast`/`clsx`).
- `src/app.css` — Tailwind + Fumadocs/Fumapress presets, then the design system: fonts
  (Ethnocentric/Orbitron + Source Code Pro), the mission-control palette (overrides `--color-fd-*`),
  a sharpened `--radius-*` scale, and the HUD primitives (`.hud-grid`, `.hud-frame`,
  `.signal-bloom`, the `animate-*` keyframes). See **Design system** below and `DESIGN.md`.
- `press.config.tsx` — the Fumapress config: site metadata, the content source, plugins, the
  Google Fonts link (Orbitron + Source Code Pro), the forced-dark **root layout**, and the shared
  `defaultProps` (display wordmark nav title, `Documentation` link, `githubUrl`, Modrinth icon,
  `themeSwitch` disabled), plus the exported `HomeLayout`.
- `source.config.ts` — `defineDocs({ dir: "content" })` (fumadocs-mdx content source).
- `waku.config.ts` — Vite plugins (`press()`, `mdx()`, `tailwindcss()`).
- `content/docs/` — documentation MDX; `content/blog/` — blog posts (see **Docs & blog**).

## Docs & blog
- **Two content sources.** `source.config.ts` defines `docs` (`dir: "content/docs"`) and `blog`
  (`dir: "content/blog"`, `blogPageSchema`/`blogMetaSchema`, plus the `lastModified` plugin for
  post dates). `press.config.tsx` wires them as `content: { docs: …baseDir "docs", blog: …baseDir
  "blog" }`, serving `/docs/*` and `/blog/*`. Because each source's `dir` already points at its
  subfolder, `baseDir` here is correct (it does **not** double the prefix — that only happens with
  `dir: "content"` + `baseDir: "docs"`).
- **Blog** is enabled with `blogPlugin({ layouts: { layout: HomeLayout } })` in the default
  export, plus a `Blog` nav link. It ships `/blog` (index), `/blog/tags`, and per-post pages. The
  blog is its own `root: true` section, so it appears in the docs section switcher as well as the
  nav (this is fumapress's docs+blog convention; the docs layout reads a global page tree, so you
  cannot filter the blog out of that switcher from a per-page `render`).
- **Section dropdown = `root: true` folders.** Fumadocs' `getPageTreeRoots` builds the sidebar
  section switcher from every folder whose `meta.json` has `"root": true`, **plus** the top-level
  tree itself. So the top-level `content/docs/` is the **Overview** section, and each documented
  project (`xutilities/`, `xlimbo/`, `neoskript/`) is its own root folder = its own dropdown
  section with its own sidebar pages. **Raptor is showcase-only** — it has no docs section; its
  landing card links out to `www.raptorpanel.net`.
- Each folder's `meta.json` sets `title`, `root`, and a `pages` order array. Every page needs
  `title` + `description` frontmatter.
- **Shiki has no `sk` (Skript) grammar** — use a ` ```text ` fence for NeoSkript/Skript snippets
  or the build fails with `Language 'sk' not found`.

## Key design rules
- **No new runtime dependencies without checking pnpm hoisting.** `lucide-react` and `cnfast`
  are present transitively but are **not** top-level/hoisted, so a bare import can fail to
  resolve. Prefer inline SVGs and the local `cn` helper; add a real dependency to `package.json`
  if you genuinely need one.
- **Style with design tokens, never hex.** Use Fumadocs tokens (`fd-foreground`,
  `fd-muted-foreground`, `fd-card`, `fd-border`, `fd-primary`, `fd-background`, `fd-accent`) and
  the HUD utilities; the palette is redefined in `app.css`. The `fd-primary` token IS the signal
  amber. No hard-coded colors.
- **Nav is defined once.** The nav title, the `Documentation` link, `githubUrl`, the Modrinth
  icon, and `themeSwitch: { enabled: false }` live in `.layouts({ defaultProps })`;
  `createHomeLayout` inherits them by default (`inheritLayoutProps = true`). Don't also pass
  `links` to `createHomeLayout` — `@fastify/deepmerge` concatenates arrays, so they'd duplicate.
- **Content is sourced from the project READMEs.** Keep docs accurate to each repo; don't invent
  features. Version targets, requirements and reload semantics are load-bearing — copy them
  faithfully.

## Design system
See `PRODUCT.md` (brand strategy) and `DESIGN.md` (the full design language). In short:
- **Dark-only mission-control HUD.** The theme is forced dark in `press.config.tsx`
  (`providerProps.theme = { forcedTheme: "dark" }`) and the toggle is hidden. Palette tokens are
  set on both `:root` and `.dark` in `app.css` to avoid a light flash. Do not add a light theme.
- **Fonts.** Display = Ethnocentric (licensed, self-hosted at `public/fonts/ethnocentric.otf`
  with `format("opentype")`; falls back to **Orbitron** until the file exists). Body + UI + code =
  **Source Code Pro** (this mono-body is deliberate, the terminal voice, not laziness).
- **Color.** Cool near-black neutrals (hue ~250) + one **signal amber** accent (hue ~68), OKLCH,
  Committed strategy. Amber is never body text.
- **Geometry.** Near-square: the `--radius-*` scale is flattened in `@theme` (keep `--radius-full`
  for dots/pills). HUD buttons use `rounded-none`.
- **Absolute bans honored:** no gradient text, no identical card grids (the systems list is
  indexed rows), no glassmorphism, no side-stripe borders, no em dashes in interface copy.

## Content overview
- **Landing** (`/`) — mission-control HUD: hero + telemetry strip, a `systems` manifest of the
  four projects (Raptor `S-01` `PLATFORM`, then NeoSkript / xLimbo / xUtilities as `PLUGIN`s, each
  with a kind marker, a link to its canonical page — Modrinth for published plugins, GitHub for
  NeoSkript, `raptorpanel.net` for Raptor — plus Docs and source), and an Uplink contact terminal
  (GitHub, Modrinth, website `xenastudios.co`, email `contact@xenastudios.co`).
- **Overview** section — `content/docs/index.mdx`, the studio intro + project index.
- **xUtilities** — overview, commands, configuration.
- **xLimbo** — overview, configuration, protection.
- **NeoSkript** — overview, syntax, modules & addons.
- **Raptor** — no docs section; showcased on the landing page, links to `www.raptorpanel.net`.

## Status
Landing page + docs are built and verified with `pnpm build` (SSG) and a browser smoke test
(landing, `/docs`, project sections + the section dropdown). The dark-only mission-control
redesign (`PRODUCT.md` / `DESIGN.md`) is shipped. Enabled plugins: search (`flexsearch`),
`llms.txt`, OG images (`takumi`), `sitemap`, and `blog`.

## Follow-ups (not required by the brief)
- **Ethnocentric font** is not committed (licensed). Drop `public/fonts/ethnocentric.otf` to
  activate it; until then the wordmark renders in Orbitron. See `public/fonts/README.md`.
- No CI yet (the plugin repos have `build.yml` etc.; this repo could add a build/deploy workflow).
- No favicon / logo asset — the nav uses a text wordmark; a logo could be added to `defaultProps.nav.title`.
- Docs are README-depth overviews; deeper per-project guides can be added as new pages under each
  section folder.

Remote: `git@github.com:xena-studios/website.git`. SSH **is** authorized in this environment
(pushes over SSH work); `gh` HTTPS also works as the `mrzcookie` account.
