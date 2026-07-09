import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { Link } from "fumapress/client";
import { cn } from "../../cn";
import { ArrowUpRight, GitHubIcon, TerminalIcon } from "../icons";

/** Telemetry strip figures shown under the hero. */
const telemetry: [value: string, label: string][] = [
	["04", "Systems"],
	["100%", "Open source"],
	["03", "Plugins"],
	["01", "Platform"],
];

export function Hero() {
	return (
		<section className="relative isolate">
			<div className="hud-grid pointer-events-none absolute inset-x-0 -top-16 -z-10 h-[120%]" />
			<div className="signal-bloom pointer-events-none absolute inset-0 -z-10" />

			{/* status bar */}
			<div className="flex animate-rise items-center justify-between gap-4 border-fd-border border-b py-3 font-mono text-[0.7rem] text-fd-muted-foreground uppercase tracking-[0.2em]">
				<span className="text-fd-foreground">{"XENA//STUDIOS"}</span>
				<span className="hidden sm:inline">40.7128&deg;N 74.0060&deg;W</span>
				<span className="inline-flex items-center gap-1.5">
					<span className="size-1.5 animate-blink rounded-full bg-fd-primary" />
					SYS.ONLINE
				</span>
			</div>

			<div className="flex flex-col items-start py-16 sm:py-24">
				<p
					className="animate-rise font-mono text-fd-primary text-xs uppercase tracking-[0.28em]"
					style={{ animationDelay: "0.05s" }}
				>
					{"// Open-source infrastructure studio"}
				</p>

				<h1
					className="mt-6 animate-rise font-display text-[clamp(2.3rem,9vw,5.75rem)] text-fd-foreground uppercase leading-[0.92] tracking-tight"
					style={{ animationDelay: "0.1s" }}
				>
					Xena
					<br />
					Studios
				</h1>

				<p
					className="mt-8 max-w-xl animate-rise text-[0.95rem] text-fd-muted-foreground leading-7"
					style={{ animationDelay: "0.16s" }}
				>
					Open-source plugins and platforms for Minecraft networks and
					self-hosted game hosting. Near-zero overhead, fail-safe on bad input,
					thread-correct on both Paper and Folia.
				</p>

				<div
					className="mt-10 flex animate-rise flex-wrap items-center gap-3"
					style={{ animationDelay: "0.22s" }}
				>
					<Link
						href="/docs"
						className={cn(
							buttonVariants({ variant: "primary" }),
							"h-11 gap-2 rounded-none px-6 font-mono text-xs uppercase tracking-[0.15em]"
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
							"h-11 gap-2 rounded-none px-6 font-mono text-xs uppercase tracking-[0.15em]"
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
				className="grid animate-rise grid-cols-2 gap-px overflow-hidden border border-fd-border bg-fd-border text-center sm:grid-cols-4"
				style={{ animationDelay: "0.28s" }}
			>
				{telemetry.map(([value, label]) => (
					<div key={label} className="bg-fd-background px-4 py-5">
						<div className="font-display text-fd-foreground text-lg uppercase tracking-tight">
							{value}
						</div>
						<div className="mt-1 font-mono text-[0.65rem] text-fd-muted-foreground uppercase tracking-[0.18em]">
							{label}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
