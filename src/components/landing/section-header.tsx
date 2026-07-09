/** Numbered HUD section header: `01 · SYSTEMS` with a right-aligned note. */
export function SectionHeader({
	index,
	title,
	note,
}: {
	index: string;
	title: string;
	note: string;
}) {
	return (
		<div className="flex items-end justify-between gap-4 border-fd-border border-b pb-4">
			<div className="flex items-baseline gap-4">
				<span className="font-mono text-fd-primary text-xs tracking-[0.2em]">
					{index}
				</span>
				<h2 className="font-display text-2xl text-fd-foreground uppercase tracking-tight">
					{title}
				</h2>
			</div>
			<span className="font-mono text-[0.65rem] text-fd-muted-foreground uppercase tracking-[0.2em]">
				{note}
			</span>
		</div>
	);
}
