# Xena Studios — Website

The official [Xena Studios](https://github.com/xena-studios) website: a landing page with our
contact info and platform links, a showcase of our projects, and documentation for each of
them. Built with [Fumapress](https://press.fumadocs.dev) (powered by
[Waku](https://waku.gg) and [Fumadocs](https://fumadocs.dev)).

## Structure

- **Landing page** — `src/pages/index.tsx`, wrapped by the home layout re-exported in
  `src/pages/_layout.tsx`. Hero, project showcase, and a contact/links section.
- **Docs** — MDX in `content/docs/`, served under `/docs`. The top-level `content/docs/` is the
  **Overview** section; each documented project (`xutilities/`, `xlimbo/`, `neoskript/`) is a
  `root: true` folder, so it becomes its own section in the sidebar's section dropdown with its
  own pages. Ordering is set by each folder's `meta.json`. (Raptor is showcase-only — it links to
  [raptorpanel.net](https://www.raptorpanel.net) and has no docs section here.)
- **Config** — `press.config.tsx` wires the site metadata, navigation (shared nav title, the
  `Documentation` link, GitHub + Modrinth), plugins (search, `llms.txt`, OG images), and the
  `HomeLayout` used by the landing page. `source.config.ts` defines the MDX content source and
  `waku.config.ts` the Vite/Waku setup.

## Development

```sh
pnpm install
pnpm dev          # start the dev server (http://localhost:3000)
```

## Build

```sh
pnpm build        # static build into dist/ (fully prerendered — dist/public)
pnpm start        # serve the production build with the Node server
pnpm types:check  # generate MDX types and type-check
```

## Deploy (Cloudflare Workers)

The site is **fully static** (`mode: "static"` in `press.config.tsx`): every page, the search
index (`/api/search`), RSC navigation payloads, `sitemap.xml`, `llms.txt`, and OG images are
prerendered into `dist/public`. There is no server runtime, so it deploys to **Cloudflare
Workers as static assets** (config in [`wrangler.jsonc`](./wrangler.jsonc), assets-only, no
Worker script).

```sh
pnpm preview      # wrangler dev — serve the built dist/public exactly as Cloudflare would
pnpm deploy       # waku build && wrangler deploy
```

First-time setup: authenticate wrangler once with `pnpm exec wrangler login` (or set a
`CLOUDFLARE_API_TOKEN`). `pnpm deploy` then builds and uploads `dist/public`.

### Deploying via Cloudflare's Git integration

Deploy **only the static assets**, not the Node server. `waku build` also emits `dist/server/`
(for `pnpm start`), which imports `node:module` and **cannot run on Workers** — if Cloudflare
tries to deploy it (its "Waku" framework preset does, because fumapress builds a Node server, not
a Worker), you get `No such module "node:module"`. Point the project at the static path instead:

- **Build command:** `pnpm build`
- **Deploy command:** `npx wrangler deploy` (uses `wrangler.jsonc` → assets-only, serves
  `dist/public`; it uploads a tiny no-op worker plus the static files, never `dist/server`)
- Do **not** pick a "Waku" framework preset that deploys a server/Worker.

A local `pnpm deploy` already does exactly this.

## Adding a project

1. Create `content/docs/<project>/` with a `meta.json` (`"title"`, `"root": true`, and a
   `"pages"` array) and one `.mdx` file per page. Each page needs `title` + `description`
   frontmatter.
2. Add the folder name to the `pages` array in `content/docs/meta.json` to place its section in
   the dropdown.
3. Add a card to the `projects` array in `src/pages/index.tsx` so it shows on the landing page.

> Shiki has no `sk` (Skript) grammar — use a ` ```text ` fence for Skript snippets.

## License

[MIT](./LICENSE)
