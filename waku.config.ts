import { defineConfig } from "waku/config";
import tailwindcss from "@tailwindcss/vite";
import press from "fumapress/vite";
import mdx from "fumadocs-mdx/vite";

export default defineConfig({
  vite: {
    resolve: {
      dedupe: ["fumadocs-ui", "react", "react-dom"],
    },
    optimizeDeps: {
      // Vite pre-bundling @fuma-translate/react produces a bundle that breaks
      // against the optimized react/jsx-runtime ("does not provide an export
      // named 't'"), blanking the blog pages in dev. Serve it as ESM instead.
      exclude: ["@fuma-translate/react"],
    },
    plugins: [press(), mdx(), tailwindcss()],
  },
});
