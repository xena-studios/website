// Copies the site's brand assets from a checkout of xena-studios/brand, the
// single source of truth for logos, colours and scenes. The copies are
// committed, so builds never fetch the brand repo and the site only changes
// when someone syncs on purpose.
//
//   npm run brand:sync                 # expects ../brand
//   BRAND_DIR=/path/to/brand npm run brand:sync
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const BRAND = path.resolve(process.env.BRAND_DIR ?? path.join(ROOT, "../brand"));

if (!fs.existsSync(path.join(BRAND, "tokens/colors.css"))) {
  console.error(`No brand checkout at ${BRAND}. Clone xena-studios/brand there or set BRAND_DIR.`);
  process.exit(1);
}

// [from (in brand), to (in website)]
const files = [
  ["tokens/colors.css", "src/brand/colors.css"],
  ["tokens/colors.json", "src/brand/colors.json"],
  ["logo/xena-studios.svg", "src/brand/logo/xena-studios.svg"],
  ["logo/xena.svg", "src/brand/logo/xena.svg"],
  ["logo/x-blue.svg", "src/brand/logo/x-blue.svg"],
  ["scene/horizon.svg", "src/brand/scene/horizon.svg"],
  ["raptor/official/logo-dark.svg", "src/brand/raptor/logo-dark.svg"],
  ["neoskript/logo-dark.svg", "src/brand/neoskript/logo-dark.svg"],
  ["plugins/xutilities/icon.svg", "src/brand/plugins/xutilities.svg"],
  ["plugins/zchat/icon.svg", "src/brand/plugins/zchat.svg"],
  ["plugins/xlimbo/icon.svg", "src/brand/plugins/xlimbo.svg"],
  ["avatar/favicon.svg", "public/favicon.svg"],
  ["avatar/avatar.png", "public/apple-touch-icon.png"],
  ["social/og-card.png", "public/og.png"],
];

for (const [from, to] of files) {
  const dest = path.join(ROOT, to);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.join(BRAND, from), dest);
}

const git = (...args) => execFileSync("git", ["-C", BRAND, ...args], { encoding: "utf8" }).trim();
const source = { repo: "xena-studios/brand", commit: git("rev-parse", "HEAD"), dirty: git("status", "--porcelain") !== "" };
fs.writeFileSync(path.join(ROOT, "src/brand/SOURCE.json"), JSON.stringify(source, null, 2) + "\n");

console.log(`synced ${files.length} files from brand@${source.commit.slice(0, 7)}${source.dirty ? " (dirty)" : ""}`);
