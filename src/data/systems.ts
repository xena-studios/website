export type System = {
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

export const systems: System[] = [
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
	{
		code: "S-05",
		name: "zChat",
		kind: "PLUGIN",
		tagline: "Format your server's chat",
		description:
			"A lightweight chat plugin: group-based message formatting, a word and pattern filter, per-player cooldown, global mute, chat clearing, and a per-player toggle. Each feature is individually toggleable and permissioned.",
		page: "https://modrinth.com/mod/zchat",
		pageLabel: "Modrinth",
		docs: "/docs/zchat",
		repo: "https://github.com/xena-studios/zchat",
		meta: ["Java", "Paper / Folia", "GPL-3.0"],
	},
];
