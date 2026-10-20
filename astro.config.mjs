// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://xenastudios.co",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
});
