import { defineConfig } from "fumapress";
import { fumadocsMdx } from "fumapress/adapters/mdx";
import { flexsearchPlugin } from "fumapress/plugins/flexsearch";
import { llmsPlugin } from "fumapress/plugins/llms.txt";
import { takumiPlugin } from "fumapress/plugins/takumi";
import { createHomeLayout } from "fumapress/layouts/home";
import { docs } from "./.source/server";

const config = defineConfig({
  content: docs.toFumadocsSource(),
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
            href="https://fonts.googleapis.com/css2?family=Geist:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
            rel="stylesheet"
          />
        </>
      );
    },
  },
})
  .adapters(fumadocsMdx())
  .plugins(flexsearchPlugin(), llmsPlugin(), takumiPlugin())
  .layouts({
    defaultProps() {
      return {
        githubUrl: "https://github.com/xena-studios",
        nav: {
          title: (
            <span className="font-mono text-sm font-semibold uppercase tracking-widest">
              Xena Studios
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

export default config;

function ModrinthIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 2.25c5.376 0 9.75 4.374 9.75 9.75a9.7 9.7 0 0 1-1.02 4.35l-1.86-1.02a7.6 7.6 0 0 0 .63-3.33c0-.36-.03-.72-.075-1.08l-1.905.51a5.7 5.7 0 0 1 .045.57 5.6 5.6 0 0 1-.36 1.98l-1.845-1.005a3.6 3.6 0 0 0 .105-1.11l-2.235.6-1.62-1.62.6-2.235a3.6 3.6 0 0 0-1.11.105L9.42 6.585a5.55 5.55 0 0 1 4.98.45l.51-1.905a7.5 7.5 0 0 0-8.79 1.62 7.5 7.5 0 0 0-.87 9.435l1.62-1.215a5.55 5.55 0 0 1-.045-6.06l1.44 1.44a3.6 3.6 0 0 0 .3 4.02L6.9 19.14A9.72 9.72 0 0 1 2.25 12c0-5.376 4.374-9.75 9.75-9.75z" />
    </svg>
  );
}
