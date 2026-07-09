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
  .plugins(flexsearchPlugin(), llmsPlugin(), takumiPlugin(), sitemapPlugin())
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

function ModrinthIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 2.25c5.376 0 9.75 4.374 9.75 9.75a9.7 9.7 0 0 1-1.02 4.35l-1.86-1.02a7.6 7.6 0 0 0 .63-3.33c0-.36-.03-.72-.075-1.08l-1.905.51a5.7 5.7 0 0 1 .045.57 5.6 5.6 0 0 1-.36 1.98l-1.845-1.005a3.6 3.6 0 0 0 .105-1.11l-2.235.6-1.62-1.62.6-2.235a3.6 3.6 0 0 0-1.11.105L9.42 6.585a5.55 5.55 0 0 1 4.98.45l.51-1.905a7.5 7.5 0 0 0-8.79 1.62 7.5 7.5 0 0 0-.87 9.435l1.62-1.215a5.55 5.55 0 0 1-.045-6.06l1.44 1.44a3.6 3.6 0 0 0 .3 4.02L6.9 19.14A9.72 9.72 0 0 1 2.25 12c0-5.376 4.374-9.75 9.75-9.75z" />
    </svg>
  );
}
