export function Footer() {
	return (
		<footer className="flex flex-col items-center justify-between gap-4 border-fd-border border-t py-8 font-mono text-[0.65rem] text-fd-muted-foreground uppercase tracking-[0.18em] sm:flex-row">
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
