import { cn } from "../../cn";
import { uplinks } from "../../data/uplinks";
import { ArrowUpRight } from "../icons";
import { SectionHeader } from "./section-header";

export function Uplink() {
	return (
		<section className="pb-24 sm:pb-32">
			<SectionHeader index="02" title="Uplink" note="contact channels" />
			<div className="hud-frame mt-10 border border-fd-border bg-fd-card/40">
				<div className="flex items-center justify-between border-fd-border border-b px-5 py-3 font-mono text-[0.65rem] text-fd-muted-foreground uppercase tracking-[0.2em]">
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
								i % 2 === 0 && "sm:border-fd-border sm:border-r",
								i >= 2 && "sm:border-fd-border sm:border-t",
								i < 2 && "border-fd-border border-t sm:border-t-0"
							)}
						>
							<span className="flex size-9 shrink-0 items-center justify-center border border-fd-border text-fd-muted-foreground transition-colors group-hover:border-fd-primary group-hover:text-fd-primary">
								{link.icon}
							</span>
							<span className="flex min-w-0 flex-col">
								<span className="font-mono text-[0.65rem] text-fd-muted-foreground uppercase tracking-[0.2em]">
									{link.label}
								</span>
								<span className="truncate text-fd-foreground text-sm transition-colors group-hover:text-fd-primary">
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
