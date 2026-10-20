# xenastudios.co

The Xena Studios website: a static [Astro](https://astro.build) site deployed to Cloudflare Pages.

The design comes from [xena-studios/brand](https://github.com/xena-studios/brand): colours, logos, the horizon scene, the favicon and the link preview are synced from it, not redrawn here. See [DESIGN.md](DESIGN.md) for the visual system and [PRODUCT.md](PRODUCT.md) for who the site is for.

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview
```

## Brand assets

Everything in `src/brand/`, plus `public/favicon.svg`, `public/apple-touch-icon.png` and `public/og.png`, is copied from the brand repo. Don't edit them here. Change them in the brand repo, then:

```sh
npm run brand:sync                        # expects the brand repo at ../brand
BRAND_DIR=/path/to/brand npm run brand:sync
```

`src/brand/SOURCE.json` records which brand commit the copies came from. The copies are committed, so builds never need access to the (private) brand repo.

Ethnocentric, the logo typeface, only appears inside the brand's outlined logo SVGs. Its licence doesn't allow webfont use, so never set it as live text.

## Deploy

Cloudflare Pages project **`xenastudios`**.

- **CI**: `.github/workflows/deploy.yml` builds every push and pull request. With the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets set, `main` deploys to production and pull requests get a preview URL.
- **Manually**: `npm run deploy` (needs `wrangler login`).

`public/_headers` sets a strict Content-Security-Policy (the site ships no JavaScript), security headers, and long-lived caching for hashed assets.

## Design skill

`.agents/skills/impeccable` is the [Impeccable](https://github.com/pbakaus/impeccable) design skill (Apache-2.0) used to build and review the site.
