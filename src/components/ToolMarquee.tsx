import { TOOLS } from "../utils/data";
import type { Tool } from "../utils/data";

// Inline SVG sources (simple-icons). Inlined — not <img> — so logos
// inherit currentColor and can flip to accent on hover.
import postman from "../assets/logos/postman.svg?raw";
import figma from "../assets/logos/figma.svg?raw";
import phpstorm from "../assets/logos/phpstorm.svg?raw";
import git from "../assets/logos/git.svg?raw";
import github from "../assets/logos/github.svg?raw";
import docker from "../assets/logos/docker.svg?raw";
import xampp from "../assets/logos/xampp.svg?raw";
import obsidian from "../assets/logos/obsidian.svg?raw";
import tailwindcss from "../assets/logos/tailwindcss.svg?raw";
import bootstrap from "../assets/logos/bootstrap.svg?raw";
import shadcnui from "../assets/logos/shadcnui.svg?raw";

const LOGOS: Record<string, string> = {
	postman,
	figma,
	phpstorm,
	git,
	github,
	docker,
	xampp,
	obsidian,
	tailwindcss,
	bootstrap,
	shadcnui,
};

/**
 * TOOLS WALL — full-width double marquee between Skills and Projects.
 * Two rows drifting in opposite directions (top → left, bottom → right),
 * pausing on hover; icons flip from ink to accent. Brands without an
 * available monochrome logo fall back to two-letter brutalist tiles.
 */
export function ToolMarquee() {
	return (
		<section aria-label="Tools I use daily" className="group overflow-hidden border-y-4 border-ink bg-paper py-7">
			<MarqueeRow tools={TOOLS} animation="animate-marquee" />
		</section>
	);
}

function MarqueeRow({ tools, animation }: { tools: Tool[]; animation: string }) {
	// Duplicated content + a -50% / +50% keyframe pair = seamless loop.
	const items = [...tools, ...tools];
	return (
		<div className="overflow-hidden">
			<div className={`flex w-max items-center whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused] ${animation}`}>
				{items.map((tool, i) => (
					<ToolItem key={`${tool.name}-${i}`} tool={tool} />
				))}
			</div>
		</div>
	);
}

function ToolItem({ tool }: { tool: Tool }) {
	return (
		<span className="mx-8 flex items-center gap-3 text-ink transition-colors duration-200 hover:text-accent">
			{tool.slug ? (
				<span aria-hidden className="[&_svg]:h-9 [&_svg]:w-9 [&_svg]:fill-current" dangerouslySetInnerHTML={{ __html: LOGOS[tool.slug] }} />
			) : (
				<span aria-hidden className="grid h-9 w-9 place-items-center border-[3px] border-current font-heading text-sm font-extrabold">
					{tool.initials}
				</span>
			)}
			<span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">{tool.name}</span>
		</span>
	);
}
