import type { ReactNode } from "react";
import {
	GitHubIcon,
	GlobeIcon,
	MailIcon,
	ModrinthIcon,
} from "../components/icons";

export type Uplink = {
	label: string;
	value: string;
	href: string;
	icon: ReactNode;
};

export const uplinks: Uplink[] = [
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
