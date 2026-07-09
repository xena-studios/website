import type { ReactNode } from "react";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { Link } from "fumapress/client";
import { cn } from "../cn";

type Project = {
  name: string;
  tagline: string;
  description: string;
  href: string;
  /** when true, `href` is an external site and opens in a new tab */
  external?: boolean;
  /** call-to-action label; defaults to "Documentation" */
  cta?: string;
  repo: string;
  tags: string[];
};

const projects: Project[] = [
  {
    name: "xUtilities",
    tagline: "Utility commands for every server",
    description:
      "A lightweight, high-performance utility-command plugin for Paper (and Folia). The small quality-of-life commands almost every server wants — each toggleable, permissioned, and fully customizable.",
    href: "/docs/xutilities",
    repo: "https://github.com/xena-studios/xutilities",
    tags: ["Java", "Paper / Folia", "GPL-3.0"],
  },
  {
    name: "xLimbo",
    tagline: "Never drop a player again",
    description:
      "A rock-solid fallback / limbo server plugin for Paper networks. When the main server goes down, players land in a safe void world instead of being disconnected — then hop back with /join.",
    href: "/docs/xlimbo",
    repo: "https://github.com/xena-studios/xlimbo",
    tags: ["Java", "Paper", "GPL-3.0"],
  },
  {
    name: "NeoSkript",
    tagline: "Skript, rebuilt for speed",
    description:
      "A fast, modern, drop-in replacement for Skript — built for Paper + Folia on Java 25. Runs existing .sk scripts unchanged while being dramatically faster and Folia-safe by construction.",
    href: "/docs/neoskript",
    repo: "https://github.com/xena-studios/neoskript",
    tags: ["Java 25", "Paper / Folia", "GPL-3.0"],
  },
  {
    name: "Raptor",
    tagline: "Your boxes, your fleet",
    description:
      "A hosted, multi-tenant control panel for running Docker game servers and apps on your own Linux boxes — plus the per-box daemon that does the work. Easy and secure by default.",
    href: "https://www.raptorpanel.net",
    external: true,
    cta: "Visit raptorpanel.net",
    repo: "https://github.com/xena-studios/raptor",
    tags: ["TypeScript", "Go", "AGPL-3.0"],
  },
];

const contacts = [
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
      <meta
        property="og:title"
        content="Xena Studios"
      />
      <meta
        property="og:description"
        content="Open-source tooling for Minecraft networks and self-hosted game hosting."
      />

      <main className="mx-auto w-full max-w-5xl px-6">
        {/* Hero */}
        <section className="flex flex-col items-center py-24 text-center md:py-32">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-card px-3 py-1 text-xs text-fd-muted-foreground">
            <span className="size-1.5 rounded-full bg-fd-primary" />
            Open-source · Paper, Folia &amp; self-hosting
          </span>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Infrastructure for{" "}
            <span className="bg-linear-to-b from-fd-primary to-fd-foreground bg-clip-text text-transparent">
              Minecraft networks
            </span>{" "}
            &amp; game hosting
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-fd-muted-foreground md:text-lg">
            Xena Studios builds open-source plugins and platforms that run on every server in a
            network with near-zero overhead, fail safe on bad input, and stay thread-correct on
            both Paper and Folia.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs"
              className={cn(buttonVariants({ variant: "primary" }), "gap-2 rounded-xl px-5")}
            >
              <BookIcon />
              Read the docs
            </Link>
            <a
              href="https://github.com/xena-studios"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "gap-2 rounded-xl px-5")}
            >
              <GitHubIcon />
              View on GitHub
            </a>
          </div>
        </section>

        {/* Projects */}
        <section className="py-8">
          <div className="mb-8 flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
            <p className="text-fd-muted-foreground">
              Everything we ship is open source. Plugins are published on{" "}
              <a
                href="https://modrinth.com/organization/xena-studios"
                target="_blank"
                rel="noreferrer"
                className="text-fd-foreground underline underline-offset-4"
              >
                Modrinth
              </a>
              .
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="py-20">
          <div className="rounded-2xl border border-fd-border bg-fd-card p-8 md:p-12">
            <h2 className="text-2xl font-semibold tracking-tight">Get in touch</h2>
            <p className="mt-2 max-w-xl text-fd-muted-foreground">
              Questions, contributions, or want to work with us? Find us across the platforms
              below.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-fd-border bg-fd-background p-4 transition-colors hover:border-fd-primary/50 hover:bg-fd-accent"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-fd-border bg-fd-card text-fd-muted-foreground transition-colors group-hover:text-fd-primary">
                    {contact.icon}
                  </span>
                  <span className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium">{contact.label}</span>
                    <span className="truncate text-sm text-fd-muted-foreground">
                      {contact.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ProjectLink({
  project,
  className,
  children,
}: {
  project: Project;
  className?: string;
  children: ReactNode;
}) {
  if (project.external) {
    return (
      <a href={project.href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={project.href} className={className}>
      {children}
    </Link>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-fd-border bg-fd-card p-6 transition-colors hover:border-fd-primary/50">
      <div className="flex items-start justify-between gap-4">
        <div>
          <ProjectLink project={project} className="text-lg font-semibold tracking-tight">
            {project.name}
          </ProjectLink>
          <p className="text-sm text-fd-primary">{project.tagline}</p>
        </div>
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} on GitHub`}
          className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          <GitHubIcon />
        </a>
      </div>
      <p className="mt-3 grow text-sm text-fd-muted-foreground">{project.description}</p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-fd-border bg-fd-background px-2 py-0.5 text-xs text-fd-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
      <ProjectLink
        project={project}
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-fd-foreground transition-colors group-hover:text-fd-primary"
      >
        {project.cta ?? "Documentation"}
        <ArrowIcon />
      </ProjectLink>
    </div>
  );
}

function BookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

function ModrinthIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 2.25c5.376 0 9.75 4.374 9.75 9.75a9.7 9.7 0 0 1-1.02 4.35l-1.86-1.02a7.6 7.6 0 0 0 .63-3.33c0-.36-.03-.72-.075-1.08l-1.905.51a5.7 5.7 0 0 1 .045.57 5.6 5.6 0 0 1-.36 1.98l-1.845-1.005a3.6 3.6 0 0 0 .105-1.11l-2.235.6-1.62-1.62.6-2.235a3.6 3.6 0 0 0-1.11.105L9.42 6.585a5.55 5.55 0 0 1 4.98.45l.51-1.905a7.5 7.5 0 0 0-8.79 1.62 7.5 7.5 0 0 0-.87 9.435l1.62-1.215a5.55 5.55 0 0 1-.045-6.06l1.44 1.44a3.6 3.6 0 0 0 .3 4.02L6.9 19.14A9.72 9.72 0 0 1 2.25 12c0-5.376 4.374-9.75 9.75-9.75z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
