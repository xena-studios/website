import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import mdx from "fumadocs-mdx/vite";
import press from "fumapress/vite";
import { defineConfig } from "waku/config";

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
		// React Compiler (waku.gg/guides/react-compiler): providing our own `react()`
		// stops Waku auto-adding a bare one, and the babel pass runs the compiler in
		// the rolldown production build. `press()`/`mdx()` stay ahead so content is
		// compiled to components first.
		plugins: [
			press(),
			mdx(),
			tailwindcss(),
			react(),
			babel({ presets: [reactCompilerPreset()] }),
		],
	},
});
