# Xena Studios — Website

The official [Xena Studios](https://github.com/xena-studios) website: a landing page with our
contact info and platform links, a showcase of our projects, and documentation for each of
them. Built with [Fumapress](https://press.fumadocs.dev) (powered by
[Waku](https://waku.gg) and [Fumadocs](https://fumadocs.dev)).

## Structure

- **Landing page** — `src/pages/index.tsx`, wrapped by the home layout re-exported in
  `src/pages/_layout.tsx`. Hero, project showcase, and a contact/links section.
- **Docs** — MDX in `content/docs/`, served under `/docs`. The top-level `content/docs/` is the
  **Overview** section; each project (`xutilities/`, `xlimbo/`, `neoskript/`, `raptor/`) is a
  `root: true` folder, so it becomes its own section in the sidebar's section dropdown with its
  own pages. Ordering is set by each folder's `meta.json`.
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
pnpm build        # static build into dist/
pnpm start        # serve the production build
pnpm types:check  # generate MDX types and type-check
```

## Adding a project

1. Create `content/docs/<project>/` with a `meta.json` (`"title"`, `"root": true`, and a
   `"pages"` array) and one `.mdx` file per page. Each page needs `title` + `description`
   frontmatter.
2. Add the folder name to the `pages` array in `content/docs/meta.json` to place its section in
   the dropdown.
3. Add a card to the `projects` array in `src/pages/index.tsx` so it shows on the landing page.

> Shiki has no `sk` (Skript) grammar — use a ` ```text ` fence for Skript snippets.

## License

MIT
