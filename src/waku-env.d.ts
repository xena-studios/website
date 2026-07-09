// Ambient declarations for the Vite / Fumapress virtual modules that
// src/waku.server.tsx relies on (vite/client isn't hoisted under pnpm).

interface ImportMeta {
  glob(
    pattern: string,
    options?: { base?: string; eager?: boolean },
  ): Record<string, () => Promise<unknown>>;
}

declare module "virtual:fumapress-core/config" {
  const config: import("fumapress").ConfigBuilder;
  export default config;
}
