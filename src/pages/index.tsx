import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { Link } from "fumapress/client";
import { cn } from "../cn";

type System = {
  code: string;
  name: string;
  kind: "PLUGIN" | "PLATFORM";
  tagline: string;
  description: string;
  /** canonical project page: Modrinth for published plugins, the site for the platform */
  page: string;
  pageLabel: string;
  /** internal docs section, when the project has one */
  docs?: string;
  repo: string;
  meta: string[];
};

const systems: System[] = [
  {
    code: "S-01",
    name: "Raptor",
    kind: "PLATFORM",
    tagline: "Your boxes, your fleet",
    description:
      "A hosted, multi-tenant control panel for running Docker game servers and apps on your own Linux boxes, plus the per-box daemon that does the work. Easy and secure by default.",
    page: "https://www.raptorpanel.net",
    pageLabel: "raptorpanel.net",
    repo: "https://github.com/xena-studios/raptor",
    meta: ["TypeScript", "Go", "AGPL-3.0"],
  },
  {
    code: "S-02",
    name: "NeoSkript",
    kind: "PLUGIN",
    tagline: "Skript, rebuilt for speed",
    description:
      "A drop-in replacement for Skript, built for Paper and Folia on Java 25. Runs existing .sk scripts unchanged while being dramatically faster and Folia-safe by construction.",
    page: "https://github.com/xena-studios/neoskript",
    pageLabel: "GitHub",
    docs: "/docs/neoskript",
    repo: "https://github.com/xena-studios/neoskript",
    meta: ["Java 25", "Paper / Folia", "GPL-3.0"],
  },
  {
    code: "S-03",
    name: "xLimbo",
    kind: "PLUGIN",
    tagline: "Never drop a player again",
    description:
      "A rock-solid fallback server. When the main node goes down, players land in a safe void world instead of being disconnected, then rejoin with /join. Built to never go down.",
    page: "https://modrinth.com/mod/xlimbo",
    pageLabel: "Modrinth",
    docs: "/docs/xlimbo",
    repo: "https://github.com/xena-studios/xlimbo",
    meta: ["Java", "Paper", "GPL-3.0"],
  },
  {
    code: "S-04",
    name: "xUtilities",
    kind: "PLUGIN",
    tagline: "Utility commands for every server",
    description:
      "The small quality-of-life commands almost every server wants, each toggleable, permissioned, aliasable, and fully customizable. Near-zero overhead, runs everywhere.",
    page: "https://modrinth.com/mod/xutilities",
    pageLabel: "Modrinth",
    docs: "/docs/xutilities",
    repo: "https://github.com/xena-studios/xutilities",
    meta: ["Java", "Paper / Folia", "GPL-3.0"],
  },
];

const uplinks = [
  {
    label: "GitHub",
    value: "github.com/xena-studios",
    href: "https://github.com/xena-studios",
    icon: <GitHubIcon />,
  },
  {
    label: "Modrinth",
    value: "modrinth.com/organization/xena-studios",
    href: "https://modrinth.com/organization/xena-studios",
    icon: <ModrinthIcon />,
  },
  {
    label: "Website",
    value: "xenastudios.co",
    href: "https://www.xenastudios.co",
    icon: <GlobeIcon />,
  },
  {
    label: "Email",
    value: "contact@xenastudios.co",
    href: "mailto:contact@xenastudios.co",
    icon: <MailIcon />,
  },
];

export default function Page() {
  return (
    <>
      <title>Xena Studios</title>
      <meta property="og:title" content="Xena Studios" />
      <meta
        property="og:description"
        content="Open-source infrastructure for Minecraft networks and self-hosted game hosting."
      />

      <main className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Hero />
        <Systems />
        <Uplink />
        <Footer />
      </main>
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate">
      <div className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-[120%] hud-grid" />
      <div className="pointer-events-none absolute inset-0 -z-10 signal-bloom" />

      {/* status bar */}
      <div className="animate-rise flex items-center justify-between gap-4 border-b border-fd-border py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-fd-muted-foreground">
        <span className="text-fd-foreground">XENA//STUDIOS</span>
        <span className="hidden sm:inline">40.7128&deg;N 74.0060&deg;W</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="animate-blink size-1.5 rounded-full bg-fd-primary" />
          SYS.ONLINE
        </span>
      </div>

      <div className="flex flex-col items-start py-16 sm:py-24">
        <p
          className="animate-rise font-mono text-xs uppercase tracking-[0.28em] text-fd-primary"
          style={{ animationDelay: "0.05s" }}
        >
          // Open-source infrastructure studio
        </p>

        <h1
          className="animate-rise mt-6 font-display text-[clamp(2.3rem,9vw,5.75rem)] uppercase leading-[0.92] tracking-tight text-fd-foreground"
          style={{ animationDelay: "0.1s" }}
        >
          Xena
          <br />
          Studios
        </h1>

        <p
          className="animate-rise mt-8 max-w-xl text-[0.95rem] leading-7 text-fd-muted-foreground"
          style={{ animationDelay: "0.16s" }}
        >
          Open-source plugins and platforms for Minecraft networks and self-hosted game hosting.
          Near-zero overhead, fail-safe on bad input, thread-correct on both Paper and Folia.
        </p>

        <div
          className="animate-rise mt-10 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "0.22s" }}
        >
          <Link
            href="/docs"
            className={cn(
              buttonVariants({ variant: "primary" }),
              "h-11 gap-2 rounded-none px-6 font-mono text-xs uppercase tracking-[0.15em]",
            )}
          >
            <TerminalIcon />
            Read the docs
          </Link>
          <a
            href="https://github.com/xena-studios"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 gap-2 rounded-none px-6 font-mono text-xs uppercase tracking-[0.15em]",
            )}
          >
            <GitHubIcon />
            GitHub
            <ArrowUpRight />
          </a>
        </div>
      </div>

      {/* telemetry strip */}
      <div
        className="animate-rise grid grid-cols-2 gap-px overflow-hidden border border-fd-border bg-fd-border text-center sm:grid-cols-4"
        style={{ animationDelay: "0.28s" }}
      >
        {[
          ["04", "Systems"],
          ["100%", "Open source"],
          ["03", "Plugins"],
          ["01", "Platform"],
        ].map(([value, label]) => (
          <div key={label} className="bg-fd-background px-4 py-5">
            <div className="font-display text-lg uppercase tracking-tight text-fd-foreground">
              {value}
            </div>
            <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fd-muted-foreground">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Systems() {
  return (
    <section className="py-20 sm:py-28">
      <SectionHeader index="01" title="Systems" note="4 units · open source" />
      <ol className="mt-10 border-t border-fd-border">
        {systems.map((system) => (
          <SystemRow key={system.code} system={system} />
        ))}
      </ol>
    </section>
  );
}

function SystemRow({ system }: { system: System }) {
  return (
    <li className="group relative border-b border-fd-border">
      <span className="animate-sweep absolute inset-x-0 top-0 h-px origin-left bg-fd-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-[7rem_1fr_auto] md:items-start md:gap-8">
        <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
          <span className="font-display text-2xl tracking-tight text-fd-muted-foreground transition-colors group-hover:text-fd-primary">
            {system.code}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-fd-muted-foreground">
            {system.kind === "PLATFORM" ? (
              <span className="size-1.5 rotate-45 bg-fd-primary" aria-hidden="true" />
            ) : (
              <span className="size-1.5 rounded-full bg-fd-primary" aria-hidden="true" />
            )}
            {system.kind}
          </span>
        </div>

        <div className="max-w-xl">
          <a
            href={system.page}
            target="_blank"
            rel="noreferrer"
            className="font-display text-xl uppercase tracking-tight text-fd-foreground transition-colors group-hover:text-fd-primary"
          >
            {system.name}
          </a>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-fd-primary">
            {system.tagline}
          </p>
          <p className="mt-4 text-sm leading-6 text-fd-muted-foreground">{system.description}</p>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-fd-muted-foreground md:justify-end">
            {system.meta.map((tag, i) => (
              <span key={tag} className="inline-flex items-center gap-3">
                {i > 0 && <span className="text-fd-border">/</span>}
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-5">
            {system.docs && (
              <Link
                href={system.docs}
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-fd-muted-foreground transition-colors hover:text-fd-foreground"
              >
                Docs
                <ArrowRight />
              </Link>
            )}
            {system.page !== system.repo && (
              <a
                href={system.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${system.name} source on GitHub`}
                className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
              >
                <GitHubIcon />
              </a>
            )}
            <a
              href={system.page}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-fd-foreground transition-colors group-hover:text-fd-primary"
            >
              {system.pageLabel}
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

function Uplink() {
  return (
    <section className="pb-24 sm:pb-32">
      <SectionHeader index="02" title="Uplink" note="contact channels" />
      <div className="hud-frame mt-10 border border-fd-border bg-fd-card/40">
        <div className="flex items-center justify-between border-b border-fd-border px-5 py-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fd-muted-foreground">
          <span>xena@studios:~$ contact</span>
          <span className="hidden sm:inline">4 channels open</span>
        </div>
        <div className="grid grid-cols-1 divide-y divide-fd-border sm:grid-cols-2 sm:divide-y-0">
          {uplinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className={cn(
                "group flex items-center gap-4 px-5 py-5 transition-colors hover:bg-fd-accent",
                i % 2 === 0 && "sm:border-r sm:border-fd-border",
                i >= 2 && "sm:border-t sm:border-fd-border",
                i < 2 && "border-t border-fd-border sm:border-t-0",
              )}
            >
              <span className="flex size-9 shrink-0 items-center justify-center border border-fd-border text-fd-muted-foreground transition-colors group-hover:border-fd-primary group-hover:text-fd-primary">
                {link.icon}
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fd-muted-foreground">
                  {link.label}
                </span>
                <span className="truncate text-sm text-fd-foreground transition-colors group-hover:text-fd-primary">
                  {link.value}
                </span>
              </span>
              <span className="ml-auto text-fd-muted-foreground transition-colors group-hover:text-fd-primary">
                <ArrowUpRight />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ index, title, note }: { index: string; title: string; note: string }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-fd-border pb-4">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs tracking-[0.2em] text-fd-primary">{index}</span>
        <h2 className="font-display text-2xl uppercase tracking-tight text-fd-foreground">
          {title}
        </h2>
      </div>
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-fd-muted-foreground">
        {note}
      </span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-fd-border py-8 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fd-muted-foreground sm:flex-row">
      <span className="inline-flex items-center gap-2 text-fd-foreground">
        <span className="size-1.5 rotate-45 bg-fd-primary" />
        Xena Studios
      </span>
      <span>Open-source infrastructure for Minecraft &amp; game hosting</span>
      <span className="inline-flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-fd-primary" />
        SYS.ONLINE
      </span>
    </footer>
  );
}

/* ---- icons ---------------------------------------------------------------- */

function TerminalIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m4 17 6-6-6-6" />
      <path d="M12 19h8" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

function ModrinthIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 2.25c5.376 0 9.75 4.374 9.75 9.75a9.7 9.7 0 0 1-1.02 4.35l-1.86-1.02a7.6 7.6 0 0 0 .63-3.33c0-.36-.03-.72-.075-1.08l-1.905.51a5.7 5.7 0 0 1 .045.57 5.6 5.6 0 0 1-.36 1.98l-1.845-1.005a3.6 3.6 0 0 0 .105-1.11l-2.235.6-1.62-1.62.6-2.235a3.6 3.6 0 0 0-1.11.105L9.42 6.585a5.55 5.55 0 0 1 4.98.45l.51-1.905a7.5 7.5 0 0 0-8.79 1.62 7.5 7.5 0 0 0-.87 9.435l1.62-1.215a5.55 5.55 0 0 1-.045-6.06l1.44 1.44a3.6 3.6 0 0 0 .3 4.02L6.9 19.14A9.72 9.72 0 0 1 2.25 12c0-5.376 4.374-9.75 9.75-9.75z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="1" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
