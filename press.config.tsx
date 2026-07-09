import { defineConfig } from "fumapress";
import { fumadocsMdx } from "fumapress/adapters/mdx";
import { flexsearchPlugin } from "fumapress/plugins/flexsearch";
import { llmsPlugin } from "fumapress/plugins/llms.txt";
import { takumiPlugin } from "fumapress/plugins/takumi";
import { sitemapPlugin } from "fumapress/plugins/sitemap";
import { blogPlugin } from "fumapress/plugins/blog";
import { createHomeLayout } from "fumapress/layouts/home";
import { createRootLayout } from "fumapress/layouts/root";
import { createNotebookLayoutPage } from "fumapress/layouts/notebook";
import { blog, docs } from "./.source/server";

const config = defineConfig({
  // Fully static: prerender everything (including search) so the site deploys as
  // plain assets (e.g. Cloudflare static assets) with no server runtime.
  mode: "static",
  content: {
    docs: docs.toFumadocsSource({ baseDir: "docs" }),
    blog: blog.toFumadocsSource({ baseDir: "blog" }),
  },
  site: {
    name: "Xena Studios",
    baseUrl: "https://www.xenastudios.co",
    git: {
      user: "xena-studios",
      repo: "website",
      branch: "main",
    },
  },
  meta: {
    root() {
      return (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Source+Code+Pro:ital,wght@0,300..700;1,300..700&display=swap"
            rel="stylesheet"
          />
        </>
      );
    },
  },
})
  .adapters(fumadocsMdx())
  .plugins(
    flexsearchPlugin(),
    llmsPlugin(),
    takumiPlugin({
      generate(page) {
        return {
          node: ogImage({
            title: page.data.title,
            description: page.data.description,
            site: this.siteConfig.name,
          }),
        };
      },
    }),
    sitemapPlugin(),
  )
  .layouts({
    root: createRootLayout({
      providerProps: {
        theme: { defaultTheme: "dark", forcedTheme: "dark", enableSystem: false },
      },
    }),
    page: createNotebookLayoutPage(),
    defaultProps() {
      return {
        githubUrl: "https://github.com/xena-studios",
        themeSwitch: { enabled: false },
        nav: {
          title: (
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rotate-45 bg-fd-primary" />
              <span className="font-display text-[0.95rem] uppercase tracking-tight">
                Xena Studios
              </span>
            </span>
          ),
        },
        links: [
          {
            text: "Documentation",
            url: "/docs",
            active: "nested-url",
          },
          {
            text: "Blog",
            url: "/blog",
            active: "nested-url",
          },
          {
            type: "icon",
            text: "Modrinth",
            label: "Modrinth",
            url: "https://modrinth.com/organization/xena-studios",
            icon: <ModrinthIcon />,
          },
        ],
      };
    },
  });

export type Ctx = typeof config.$context;

export const HomeLayout = createHomeLayout<Ctx>();

export default config.plugins(blogPlugin({ layouts: { layout: HomeLayout } }));

/**
 * Open Graph image (1200x630, webp via takumi) styled as the site's mission-control
 * HUD: cool near-black field, signal-amber accents, corner ticks, a status bar, and a
 * telemetry footer. Rendered by @takumi-rs, so only inline styles + flexbox are allowed.
 */
function ogImage({
  title,
  description,
  site,
}: {
  title: string;
  description?: string;
  site?: string;
}) {
  const bg = "#0e1218";
  const fg = "#e9ebee";
  const muted = "#8f97a1";
  const amber = "#f0a43a";
  const border = "#272e39";
  const tick = { position: "absolute" as const, width: 26, height: 26, borderColor: amber };
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: bg,
        color: fg,
        padding: 72,
        fontFamily: "monospace",
      }}
    >
      {/* HUD corner ticks */}
      <div style={{ ...tick, top: 40, left: 40, borderWidth: "3px 0 0 3px", borderStyle: "solid" }} />
      <div style={{ ...tick, top: 40, right: 40, borderWidth: "3px 3px 0 0", borderStyle: "solid" }} />
      <div style={{ ...tick, bottom: 40, left: 40, borderWidth: "0 0 3px 3px", borderStyle: "solid" }} />
      <div style={{ ...tick, bottom: 40, right: 40, borderWidth: "0 3px 3px 0", borderStyle: "solid" }} />

      {/* status bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 24,
          borderBottom: `1px solid ${border}`,
          fontSize: 22,
          letterSpacing: 4,
          color: muted,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 15, height: 15, backgroundColor: amber, transform: "rotate(45deg)" }} />
          <span style={{ color: fg }}>XENA//STUDIOS</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 12, height: 12, borderRadius: 9999, backgroundColor: amber }} />
          <span>SYS.ONLINE</span>
        </div>
      </div>

      {/* body */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 26, letterSpacing: 8, color: amber }}>
          // OPEN-SOURCE INFRASTRUCTURE STUDIO
        </span>
        <span
          style={{
            marginTop: 28,
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: -1,
            color: fg,
          }}
        >
          {title}
        </span>
        {description ? (
          <span style={{ marginTop: 28, maxWidth: 940, fontSize: 31, lineHeight: 1.4, color: muted }}>
            {description}
          </span>
        ) : null}
      </div>

      {/* telemetry footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 24,
          borderTop: `1px solid ${border}`,
          fontSize: 20,
          letterSpacing: 3,
          color: muted,
        }}
      >
        <span style={{ color: fg }}>{site ?? "Xena Studios"}</span>
        <span>PAPER / FOLIA · SELF-HOSTED</span>
      </div>
    </div>
  );
}

function ModrinthIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 2.25c5.376 0 9.75 4.374 9.75 9.75a9.7 9.7 0 0 1-1.02 4.35l-1.86-1.02a7.6 7.6 0 0 0 .63-3.33c0-.36-.03-.72-.075-1.08l-1.905.51a5.7 5.7 0 0 1 .045.57 5.6 5.6 0 0 1-.36 1.98l-1.845-1.005a3.6 3.6 0 0 0 .105-1.11l-2.235.6-1.62-1.62.6-2.235a3.6 3.6 0 0 0-1.11.105L9.42 6.585a5.55 5.55 0 0 1 4.98.45l.51-1.905a7.5 7.5 0 0 0-8.79 1.62 7.5 7.5 0 0 0-.87 9.435l1.62-1.215a5.55 5.55 0 0 1-.045-6.06l1.44 1.44a3.6 3.6 0 0 0 .3 4.02L6.9 19.14A9.72 9.72 0 0 1 2.25 12c0-5.376 4.374-9.75 9.75-9.75z" />
    </svg>
  );
}
