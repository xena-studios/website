import { Link } from "fumapress/client";
import { type System, systems } from "../../data/systems";
import { ArrowRight, ArrowUpRight } from "../icons";
import { SectionHeader } from "./section-header";

export function Systems() {
	return (
		<section className="py-20 sm:py-28">
			<SectionHeader index="01" title="Systems" note="5 units · open source" />
			<ol className="mt-10 border-fd-border border-t">
				{systems.map((system) => (
					<SystemRow key={system.code} system={system} />
				))}
			</ol>
		</section>
	);
}

function SystemRow({ system }: { system: System }) {
	return (
		<li className="group relative border-fd-border border-b">
			<span className="absolute inset-x-0 top-0 h-px origin-left animate-sweep bg-fd-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
			<div className="grid grid-cols-1 gap-x-8 gap-y-4 py-8 md:grid-cols-[6.5rem_1fr]">
				{/* index + kind */}
				<div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
					<span className="font-display text-2xl text-fd-muted-foreground tracking-tight transition-colors group-hover:text-fd-primary">
						{system.code}
					</span>
					<span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] text-fd-muted-foreground uppercase tracking-[0.18em]">
						{system.kind === "PLATFORM" ? (
							<span
								className="size-1.5 rotate-45 bg-fd-primary"
								aria-hidden="true"
							/>
						) : (
							<span
								className="size-1.5 rounded-full bg-fd-primary"
								aria-hidden="true"
							/>
						)}
						{system.kind}
					</span>
				</div>

				{/* body */}
				<div className="min-w-0">
					<div className="flex flex-col gap-x-4 gap-y-1.5 sm:flex-row sm:items-baseline sm:justify-between">
						<a
							href={system.page}
							target="_blank"
							rel="noreferrer"
							className="font-display text-fd-foreground text-xl uppercase tracking-tight transition-colors group-hover:text-fd-primary"
						>
							{system.name}
						</a>
						<div className="flex flex-wrap gap-x-2.5 font-mono text-[0.65rem] text-fd-muted-foreground uppercase tracking-[0.12em]">
							{system.meta.map((tag, i) => (
								<span key={tag} className="inline-flex items-center gap-2.5">
									{i > 0 && <span className="text-fd-border">/</span>}
									{tag}
								</span>
							))}
						</div>
					</div>
					<p className="mt-2 font-mono text-fd-primary text-xs uppercase tracking-[0.12em]">
						{system.tagline}
					</p>
					<p className="mt-4 max-w-2xl text-fd-muted-foreground text-sm leading-6">
						{system.description}
					</p>
					{/* consistent, left-aligned actions: Docs · GitHub · canonical page */}
					<div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.14em]">
						{system.docs && (
							<Link
								href={system.docs}
								className="inline-flex items-center gap-1.5 text-fd-muted-foreground transition-colors hover:text-fd-foreground"
							>
								Docs
								<ArrowRight />
							</Link>
						)}
						<a
							href={system.repo}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center gap-1.5 text-fd-muted-foreground transition-colors hover:text-fd-foreground"
						>
							GitHub
							<ArrowUpRight />
						</a>
						{system.page !== system.repo && (
							<a
								href={system.page}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center gap-1.5 text-fd-foreground transition-colors hover:text-fd-primary"
							>
								{system.pageLabel}
								<ArrowUpRight />
							</a>
						)}
					</div>
				</div>
			</div>
		</li>
	);
}
