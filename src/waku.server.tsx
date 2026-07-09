// Custom Waku server entry that overrides Fumapress's managed one (which hardcodes
// `waku/adapters/default`). This uses the Cloudflare adapter in static mode
// (`{ static: true }`) so `waku build` produces a static-only app for Cloudflare
// with no Worker function. See waku.gg/guides/cloudflare#static-apps-without-a-worker.
// It replicates Fumapress's managed entry (createRouter / fsRouterFn / patchAdapter).
// The Vite/Fumapress virtual modules are declared in src/waku-env.d.ts.

import pressConfig from "virtual:fumapress-core/config";
import { createRouter } from "fumapress/router";
import { fsRouterFn } from "fumapress/router/fs";
import _adapter from "waku/adapters/cloudflare";

const modules = import.meta.glob("./pages/**/*.{ts,tsx,js,jsx}", {
	base: "/src",
});

const router = await createRouter(pressConfig);
const pages = router.createPages(fsRouterFn(modules));
const middlewareFns = router.createMiddlewares();
const adapter = router.patchAdapter(_adapter);

export default adapter(pages, { middlewareFns, static: true });
