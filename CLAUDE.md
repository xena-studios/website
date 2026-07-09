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
  `pnpm start` (serve the build), `pnpm types:check` (`fumadocs-mdx` codegen + `tsc --noEmit`).
- **Verify with a real build**, not just types: `pnpm build` renders every page (SSG) and is the
  only thing that catches MDX/Shiki/RSC errors. `pnpm types:check` alone will pass on a page that
  fails to render.

## Layout
- `src/pages/index.tsx` — the landing page (a Waku React page: hero, project cards, contact
  section). Uses `buttonVariants` from `fumadocs-ui`, `Link` from `fumapress/client`, and
  hand-rolled inline-SVG icons (no `lucide-react` — it isn't a hoisted dependency here).
- `src/pages/_layout.tsx` — re-exports `HomeLayout` from `press.config` to wrap the landing page.
- `src/cn.ts` — tiny `cn()` class-name joiner (avoids adding `cnfast`/`clsx`).
- `src/app.css` — Tailwind + Fumadocs/Fumapress CSS presets; Geist / JetBrains Mono fonts.
- `press.config.tsx` — the Fumapress config: site metadata, the content source, plugins, the
  shared `defaultProps` (nav title + `Documentation` link + `githubUrl` + Modrinth icon), and the
  exported `HomeLayout`.
- `source.config.ts` — `defineDocs({ dir: "content" })` (fumadocs-mdx content source).
- `waku.config.ts` — Vite plugins (`press()`, `mdx()`, `tailwindcss()`).
- `content/docs/` — all documentation MDX (see **Docs structure**).

## Docs structure
- Docs are served under `/docs`. The content loader's `dir` is `content`, so files under
  `content/docs/` map to `/docs/...` — **do not** pass `baseDir: "docs"` to
  `toFumadocsSource()` or you get a doubled `/docs/docs/...` prefix.
- **Section dropdown = `root: true` folders.** Fumadocs' `getPageTreeRoots` builds the sidebar
  section switcher from every folder whose `meta.json` has `"root": true`, **plus** the top-level
  tree itself. So the top-level `content/docs/` is the **Overview** section, and each documented
  project (`xutilities/`, `xlimbo/`, `neoskript/`) is its own root folder = its own dropdown
  section with its own sidebar pages. **Raptor is showcase-only** — it has no docs section; its
  landing card links out to `www.raptorpanel.net` (`external: true` in the `projects` array).
- Each folder's `meta.json` sets `title`, `root`, and a `pages` order array. Every page needs
  `title` + `description` frontmatter.
- **Shiki has no `sk` (Skript) grammar** — use a ` ```text ` fence for NeoSkript/Skript snippets
  or the build fails with `Language 'sk' not found`.

## Key design rules
- **No new runtime dependencies without checking pnpm hoisting.** `lucide-react` and `cnfast`
  are present transitively but are **not** top-level/hoisted, so a bare import can fail to
  resolve. Prefer inline SVGs and the local `cn` helper; add a real dependency to `package.json`
  if you genuinely need one.
- **Theme-aware styling only.** Use Fumadocs design tokens (`fd-foreground`,
  `fd-muted-foreground`, `fd-card`, `fd-border`, `fd-primary`, `fd-background`, `fd-accent`) so
  the landing page tracks light/dark automatically. No hard-coded hex colors.
- **Nav is defined once.** The nav title, the `Documentation` link, `githubUrl` and the Modrinth
  icon live in `.layouts({ defaultProps })`; `createHomeLayout` inherits them by default
  (`inheritLayoutProps = true`). Don't also pass `links` to `createHomeLayout` — `@fastify/deepmerge`
  concatenates arrays, so they'd duplicate.
- **Content is sourced from the project READMEs.** Keep docs accurate to each repo; don't invent
  features. Version targets, requirements and reload semantics are load-bearing — copy them
  faithfully.

## Content overview
- **Landing** (`/`) — hero, four project cards (xUtilities, xLimbo, NeoSkript, and Raptor as an
  external showcase link), and a contact section (GitHub, Modrinth, website `xenastudios.co`,
  email `contact@xenastudios.co`).
- **Overview** section — `content/docs/index.mdx`, the studio intro + project index.
- **xUtilities** — overview, commands, configuration.
- **xLimbo** — overview, configuration, protection.
- **NeoSkript** — overview, syntax, modules & addons.
- **Raptor** — no docs section; showcased on the landing page, links to `www.raptorpanel.net`.

## Status
Landing page + docs for all four projects are built and verified with `pnpm build` (SSG) and a
browser smoke test (landing, `/docs`, project sections + the section dropdown). Search
(`flexsearch`), `llms.txt` and OG images (`takumi`) plugins are enabled.

## Follow-ups (not required by the brief)
- No CI yet (the plugin repos have `build.yml` etc.; this repo could add a build/deploy workflow).
- No favicon / logo asset — the nav uses a text wordmark; a logo could be added to `defaultProps.nav.title`.
- Docs are README-depth overviews; deeper per-project guides can be added as new pages under each
  section folder.

Remote: `git@github.com:xena-studios/website.git` (push over gh HTTPS; SSH key isn't authorized).
