import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { HorizontalStory } from "./components/HorizontalStory";
import { Skills } from "./components/Skills";
import { ToolMarquee } from "./components/ToolMarquee";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

/**
 * App shell — section order tells the hiring story:
 * who I am → proof (95%) → tools → work → track record → hire me.
 */
export default function App() {
	return (
		<div className="min-h-screen bg-paper text-ink">
			<a
				href="#home"
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:border-2 focus:border-ink focus:bg-accent focus:px-4 focus:py-2 focus:font-heading focus:text-sm focus:text-paper"
			>
				Skip to content
			</a>

			{/* Film grain texture over everything */}
			<div aria-hidden className="grain" />

			<Navbar />

			<main id="home">
				<Hero />
				<Marquee />
				<HorizontalStory />
				<Skills />
				<ToolMarquee />
				<Projects />
				<Experience />
				<Contact />
			</main>

			<Footer />
		</div>
	);
}
