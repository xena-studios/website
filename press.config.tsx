import { defineConfig } from "fumapress";
import { fumadocsMdx } from "fumapress/adapters/mdx";
import { createHomeLayout } from "fumapress/layouts/home";
import { createNotebookLayoutPage } from "fumapress/layouts/notebook";
import { createRootLayout } from "fumapress/layouts/root";
import { blogPlugin } from "fumapress/plugins/blog";
import { flexsearchPlugin } from "fumapress/plugins/flexsearch";
import { llmsPlugin } from "fumapress/plugins/llms.txt";
import { sitemapPlugin } from "fumapress/plugins/sitemap";
import { takumiPlugin } from "fumapress/plugins/takumi";
import { blog, docs } from "./.source/server";
import { ModrinthIcon } from "./src/components/icons";

const config = defineConfig({
	// Fully static: prerender everything (including search) so the site deploys as
	// plain assets (e.g. Cloudflare static assets) with no server runtime.
	mode: "static",
	content: {
		docs: docs.toFumadocsSource({ baseDir: "docs" }),
		blog: blog.toFumadocsSource({ baseDir: "blog" }),
	},
	site: {
		name: "Xena Studios",
		baseUrl: "https://www.xenastudios.co",
		git: {
			user: "xena-studios",
			repo: "website",
			branch: "main",
		},
	},
	meta: {
		root() {
			return (
				<>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin=""
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Source+Code+Pro:ital,wght@0,300..700;1,300..700&display=swap"
						rel="stylesheet"
					/>
				</>
			);
		},
	},
})
	.adapters(fumadocsMdx())
	.plugins(
		flexsearchPlugin(),
		llmsPlugin(),
		takumiPlugin({
			generate(page) {
				return {
					node: ogImage({
						title: page.data.title,
						description: page.data.description,
						site: this.siteConfig.name,
					}),
				};
			},
		}),
		sitemapPlugin()
	)
	.layouts({
		root: createRootLayout({
			providerProps: {
				theme: {
					defaultTheme: "dark",
					forcedTheme: "dark",
					enableSystem: false,
				},
			},
		}),
		page: createNotebookLayoutPage(),
		defaultProps() {
			return {
				githubUrl: "https://github.com/xena-studios",
				themeSwitch: { enabled: false },
				nav: {
					title: (
						<span className="inline-flex items-center gap-2">
							<span className="size-1.5 rotate-45 bg-fd-primary" />
							<span className="font-display text-[0.95rem] uppercase tracking-tight">
								Xena Studios
							</span>
						</span>
					),
				},
				links: [
					{
						text: "Documentation",
						url: "/docs",
						active: "nested-url",
					},
					{
						text: "Blog",
						url: "/blog",
						active: "nested-url",
					},
					{
						type: "icon",
						text: "Modrinth",
						label: "Modrinth",
						url: "https://modrinth.com/organization/xena-studios",
						icon: <ModrinthIcon size={18} />,
					},
				],
			};
		},
	});

export type Ctx = typeof config.$context;

export const HomeLayout = createHomeLayout<Ctx>();

export default config.plugins(blogPlugin({ layouts: { layout: HomeLayout } }));

/**
 * Open Graph image (1200x630, webp via takumi) styled as the site's mission-control
 * HUD: cool near-black field, signal-amber accents, corner ticks, a status bar, and a
 * telemetry footer. Rendered by @takumi-rs, so only inline styles + flexbox are allowed.
 */
function ogImage({
	title,
	description,
	site,
}: {
	title: string;
	description?: string;
	site?: string;
}) {
	const bg = "#0e1218";
	const fg = "#e9ebee";
	const muted = "#8f97a1";
	const amber = "#f0a43a";
	const border = "#272e39";
	const tick = {
		position: "absolute" as const,
		width: 26,
		height: 26,
		borderColor: amber,
	};
	return (
		<div
			style={{
				position: "relative",
				display: "flex",
				flexDirection: "column",
				width: "100%",
				height: "100%",
				backgroundColor: bg,
				color: fg,
				padding: 72,
				fontFamily: "monospace",
			}}
		>
			{/* HUD corner ticks */}
			<div
				style={{
					...tick,
					top: 40,
					left: 40,
					borderWidth: "3px 0 0 3px",
					borderStyle: "solid",
				}}
			/>
			<div
				style={{
					...tick,
					top: 40,
					right: 40,
					borderWidth: "3px 3px 0 0",
					borderStyle: "solid",
				}}
			/>
			<div
				style={{
					...tick,
					bottom: 40,
					left: 40,
					borderWidth: "0 0 3px 3px",
					borderStyle: "solid",
				}}
			/>
			<div
				style={{
					...tick,
					bottom: 40,
					right: 40,
					borderWidth: "0 3px 3px 0",
					borderStyle: "solid",
				}}
			/>

			{/* status bar */}
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					paddingBottom: 24,
					borderBottom: `1px solid ${border}`,
					fontSize: 22,
					letterSpacing: 4,
					color: muted,
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
					<div
						style={{
							width: 15,
							height: 15,
							backgroundColor: amber,
							transform: "rotate(45deg)",
						}}
					/>
					<span style={{ color: fg }}>{"XENA//STUDIOS"}</span>
				</div>
				<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 9999,
							backgroundColor: amber,
						}}
					/>
					<span>SYS.ONLINE</span>
				</div>
			</div>

			{/* body */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					flexGrow: 1,
					justifyContent: "center",
				}}
			>
				<span style={{ fontSize: 26, letterSpacing: 8, color: amber }}>
					{"// OPEN-SOURCE INFRASTRUCTURE STUDIO"}
				</span>
				<span
					style={{
						marginTop: 28,
						fontSize: 84,
						fontWeight: 700,
						lineHeight: 1.04,
						letterSpacing: -1,
						color: fg,
					}}
				>
					{title}
				</span>
				{description ? (
					<span
						style={{
							marginTop: 28,
							maxWidth: 940,
							fontSize: 31,
							lineHeight: 1.4,
							color: muted,
						}}
					>
						{description}
					</span>
				) : null}
			</div>

			{/* telemetry footer */}
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					paddingTop: 24,
					borderTop: `1px solid ${border}`,
					fontSize: 20,
					letterSpacing: 3,
					color: muted,
				}}
			>
				<span style={{ color: fg }}>{site ?? "Xena Studios"}</span>
				<span>OPEN-SOURCE · SELF-HOSTED</span>
			</div>
		</div>
	);
}
