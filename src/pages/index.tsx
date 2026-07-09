import { Footer } from "../components/landing/footer";
import { Hero } from "../components/landing/hero";
import { Systems } from "../components/landing/systems";
import { Uplink } from "../components/landing/uplink";

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
