// Copies the site's brand assets from a release of xena-studios/brand, the single
// source of truth for logos, colours and scenes. The copies are committed, so builds
// never fetch the brand repo and the site only changes when someone syncs on purpose.
//
// It reads the files from a release tag in a checkout of the brand repo, not from
// whatever that checkout has open, so the site always matches a release (and what
// jsDelivr serves for it).
//
//   pnpm brand:sync                    # the latest release, from ../brand
//   pnpm brand:sync v1.2.0             # a given release
//   BRAND_DIR=/path/to/brand pnpm brand:sync
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const BRAND = path.resolve(process.env.BRAND_DIR ?? path.join(ROOT, "../brand"));

if (!fs.existsSync(path.join(BRAND, ".git"))) {
  console.error(`No brand checkout at ${BRAND}. Clone xena-studios/brand there or set BRAND_DIR.`);
  process.exit(1);
}

const git = (...args: string[]) => execFileSync("git", ["-C", BRAND, ...args], { encoding: "utf8", maxBuffer: 64 << 20 });
const gitBytes = (...args: string[]) => execFileSync("git", ["-C", BRAND, ...args], { maxBuffer: 64 << 20 });

// The release: the one asked for, or the newest tag on GitHub.
git("fetch", "--quiet", "--tags", "origin");
const release = process.argv[2] ?? git("describe", "--tags", "--abbrev=0", "--match", "v[0-9]*", "origin/main").trim();
if (!/^v\d+\.\d+\.\d+$/.test(release)) {
  console.error(`${release} isn't a release tag (vX.Y.Z).`);
  process.exit(1);
}

// [from (in brand), to (in website)]
const files = [
  ["tokens/colors.css", "src/brand/colors.css"],
  ["tokens/colors.json", "src/brand/colors.json"],
  ["logo/xena-studios.svg", "src/brand/logo/xena-studios.svg"],
  ["logo/xena.svg", "src/brand/logo/xena.svg"],
  ["scene/horizon.svg", "src/brand/scene/horizon.svg"],
  ["raptor/official/logo-dark.svg", "src/brand/raptor/logo-dark.svg"],
  ["neoskript/logo-dark.svg", "src/brand/neoskript/logo-dark.svg"],
  ["mostwanted/official/wordmark.png", "src/brand/mostwanted/wordmark.png"],
  ["mostwanted/official/key-art.png", "src/brand/mostwanted/key-art.png"],
  // Airfields shows its current season's key art, as airfieldsmc.com does.
  ["airfields/themes/winter/key-art.png", "src/brand/airfields/key-art.png"],
  // Each product's and server's icon tile, for the site's product row and menus.
  ["raptor/icon.png", "src/brand/icons/raptor.png"],
  ["neoskript/icon.png", "src/brand/icons/neoskript.png"],
  ["mostwanted/icon.png", "src/brand/icons/mostwanted.png"],
  ["airfields/icon.png", "src/brand/icons/airfields.png"],
  ...["xutilities", "zchat", "xlimbo", "xrewind", "xplots", "xteleport", "xvote", "xbans", "xmoney", "xstats", "xbackup"]
    .map((id) => [`plugins/${id}/icon.svg`, `src/brand/plugins/${id}.svg`]),
  ["avatar/favicon.svg", "public/favicon.svg"],
  ["avatar/apple-touch-icon.png", "public/apple-touch-icon.png"],
  ["social/og-card.png", "public/og.png"],
];

for (const [from, to] of files) {
  const dest = path.join(ROOT, to);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, gitBytes("show", `${release}:${from}`));
}

const source = { repo: "xena-studios/brand", release, commit: git("rev-parse", `${release}^{commit}`).trim() };
fs.writeFileSync(path.join(ROOT, "src/brand/SOURCE.json"), JSON.stringify(source, null, 2) + "\n");

console.log(`synced ${files.length} files from brand ${release} (${source.commit.slice(0, 7)})`);
