# xenastudios.co

The Xena Studios website: a one-page static [Astro](https://astro.build) site served by Cloudflare at **[xenastudios.co](https://xenastudios.co)**.

The design comes from [xena-studios/brand](https://github.com/xena-studios/brand). Colours, logos, the horizon scene, the favicon and the link preview are synced from it, not redrawn here. [DESIGN.md](DESIGN.md) describes the visual system; [PRODUCT.md](PRODUCT.md) says who the site is for and what it must do.

## Develop

Needs Node 24.

```sh
npm install
npm run dev        # http://localhost:4321, with hot reload
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
```

The site ships no JavaScript. Pages are Astro components rendered to HTML at build time.

## Layout

```
src/
  pages/
    index.astro        the home page: hero, Raptor, how we work, contact
    404.astro          served for unknown paths
    sitemap.xml.ts     /sitemap.xml (add new routes to its list)
  layouts/Base.astro   <head>, header, footer
  components/
    Logo.astro         inlines a brand logo SVG in currentColor
    Horizon.astro      inlines the brand's horizon scene
    External.astro     the outbound-link arrow
  styles/global.css    tokens (from the brand), type scale, base styles
  assets/raptor/       Raptor's console screenshot (optimised to WebP at build)
  brand/               synced from xena-studios/brand: don't edit
public/                copied as-is: _headers, robots.txt, favicon, og.png
scripts/sync-brand.mjs copies brand assets in
```

Built CSS, fonts and images land in `dist/assets/` with content hashes.

## Brand assets

Everything in `src/brand/`, plus `public/favicon.svg`, `public/apple-touch-icon.png` and `public/og.png`, is copied from the brand repo. Change them there, then sync:

```sh
npm run brand:sync                        # expects the brand repo at ../brand
BRAND_DIR=/path/to/brand npm run brand:sync
```

`src/brand/SOURCE.json` records the brand commit the copies came from. The copies are committed, so a build never has to fetch the brand repo and the site only changes when someone syncs on purpose.

Ethnocentric, the logo typeface, only appears inside the brand's outlined logo SVGs. Its licence doesn't allow webfont use, so never set it as live text.

## Deploy

The Cloudflare Worker **`xenastudios-website`** serves `dist/` as static assets, with no Worker code: Cloudflare's successor to Pages, and the same setup as Raptor's site. It answers only on its custom domain, `xenastudios.co` (`www` redirects there), which was attached by hand, so the deploy token needs no DNS access. Configuration is in [`wrangler.jsonc`](wrangler.jsonc).

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

| Event | What happens |
|---|---|
| Push to `main` | Build, then deploy to xenastudios.co |
| **Run workflow** (Actions tab) | Redeploy `main` without a commit |
| Pull request | Build only, so a broken build can't merge unnoticed |

Deploys use the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets (a token from the "Edit Cloudflare Workers" template, scoped to this account and the `xenastudios.co` zone). To deploy from your machine instead: `npm run deploy` after `wrangler login`.

`public/_headers` sets a strict Content-Security-Policy (no scripts, no inline styles, same-origin assets only), the usual security headers, and a year of caching for the hashed files in `/assets/`. Because of that CSP, Astro is configured never to inline stylesheets or small assets.

## Design skill

`.agents/skills/impeccable` is the [Impeccable](https://github.com/pbakaus/impeccable) design skill (Apache-2.0, v4.7.0), used to build and review the site. It reads PRODUCT.md and DESIGN.md before any design work.

```sh
.agents/skills/impeccable/scripts/impeccable detect --json src   # scan for design anti-patterns
npx impeccable update --project --yes --no-hooks                  # update the skill
```

Its native engine (`scripts/bin/`) is installed per machine and isn't committed; the launcher downloads it on first run.
