import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "../utils/data";

interface GalleryModalProps {
	project: Project;
	onClose: () => void;
}

/**
 * SCREENSHOT GALLERY — brutalist lightbox.
 * Solid-ink overlay, hard-bordered viewer frame, filmstrip of numbered
 * thumbs (selected = accent border + full color), prev/next controls,
 * keyboard (← → Esc) AND touch swipe on mobile. Locks page scroll.
 *
 * Mobile-first sizing: compact paddings, smaller thumbs/arrows, and a
 * truncated header keep everything inside small viewports.
 */
export function GalleryModal({ project, onClose }: GalleryModalProps) {
	const [index, setIndex] = useState(0);
	const total = project.screenshots.length;
	const mono = project.monochrome ?? false;
	const touchStartX = useRef<number | null>(null);

	const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + total) % total), [total]);

	/* Keyboard controls + scroll lock */
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight") go(1);
			if (e.key === "ArrowLeft") go(-1);
		};
		window.addEventListener("keydown", onKey);
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = prevOverflow;
		};
	}, [onClose, go]);

	/* Touch swipe — left/right flick advances the film */
	const onTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	};
	const onTouchEnd = (e: React.TouchEvent) => {
		if (touchStartX.current === null) return;
		const delta = e.changedTouches[0].clientX - touchStartX.current;
		touchStartX.current = null;
		if (Math.abs(delta) > 48) go(delta < 0 ? 1 : -1);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			onClick={onClose}
			className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-ink/95 p-2 sm:p-4 md:p-8"
			role="dialog"
			aria-modal="true"
			aria-label={`${project.title} screenshot gallery`}
		>
			<motion.div
				initial={{ scale: 0.94, y: 16 }}
				animate={{ scale: 1, y: 0 }}
				exit={{ scale: 0.94, y: 16 }}
				transition={{ duration: 0.22, ease: "easeOut" }}
				onClick={(e) => e.stopPropagation()}
				className="flex max-h-full w-full max-w-[calc(100vw-1rem)] min-w-0 flex-col overflow-hidden border-4 border-paper bg-ink text-paper shadow-brutal-accent sm:max-w-[calc(100vw-2rem)] md:max-w-[calc(70vw-8rem)]"
			>
				{/* Header */}
				<header className="flex shrink-0 items-center justify-between gap-3 border-b-4 border-paper px-3 py-2 sm:px-5 sm:py-3">
					<p className="min-w-0 truncate font-heading text-[11px] font-extrabold uppercase tracking-[0.2em] sm:text-sm">
						{project.title}
						<span className="ml-3 hidden font-mono text-[11px] font-normal tracking-widest text-paper/50 lg:inline">SCREENSHOT ARCHIVE</span>
					</p>
					<button
						type="button"
						onClick={onClose}
						autoFocus
						aria-label="Close gallery"
						className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center border-2 border-paper text-paper transition-colors hover:border-accent hover:bg-accent sm:h-9 sm:w-9"
					>
						<X size={16} />
					</button>
				</header>

				{/* Viewer — the compressible row: preferred height per breakpoint,
            but it shrinks (never overflows) when the panel gets clamped.
            The image letterboxes inside via absolute positioning. */}
				<div
					className="relative h-[36vh] min-h-[150px] shrink touch-pan-y overflow-hidden border-b-4 border-paper bg-black sm:h-[42vh] md:h-[52vh]"
					onTouchStart={onTouchStart}
					onTouchEnd={onTouchEnd}
				>
					<img
						src={project.screenshots[index]}
						alt={`${project.title} screenshot ${index + 1} of ${total}`}
						draggable={false}
						className={`absolute inset-0 h-full w-full select-none object-contain object-center ${mono ? "grayscale" : ""}`}
					/>

					{/* Prev / next */}
					<button
						type="button"
						onClick={() => go(-1)}
						aria-label="Previous screenshot"
						className="absolute left-1 top-1/2 grid h-9 w-9 -translate-y-1/2 cursor-pointer place-items-center border-2 border-paper bg-ink/85 text-paper transition-colors hover:bg-accent sm:left-3 sm:h-11 sm:w-11"
					>
						<ChevronLeft size={18} />
					</button>
					<button
						type="button"
						onClick={() => go(1)}
						aria-label="Next screenshot"
						className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 cursor-pointer place-items-center border-2 border-paper bg-ink/85 text-paper transition-colors hover:bg-accent sm:right-3 sm:h-11 sm:w-11"
					>
						<ChevronRight size={18} />
					</button>

					{/* Frame caption */}
					<span className="absolute bottom-2 left-2 border border-paper/40 bg-ink/80 px-1 py-0.5 font-mono text-[9px] tracking-[0.25em] text-paper/70 sm:left-3 sm:text-[10px]">
						FIG.{index + 1} · {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
					</span>
				</div>

				{/* Filmstrip — always fits the panel width; thumbs scroll
            horizontally inside on narrow screens. */}
				<div className="scrollbar-hide flex w-full min-w-0 shrink-0 gap-1.5 overflow-x-auto overscroll-x-contain p-2 sm:gap-2 sm:p-4">
					{project.screenshots.map((src, i) => (
						<button
							key={src}
							type="button"
							onClick={() => setIndex(i)}
							aria-label={`Show screenshot ${i + 1}`}
							aria-current={i === index}
							className={`relative h-12 w-16 shrink-0 cursor-pointer overflow-hidden border-[3px] p-0 transition-colors sm:h-14 sm:w-24 ${
								i === index ? "border-accent" : "border-paper/30 hover:border-paper"
							}`}
						>
							<img src={src} alt="" loading="lazy" className={`h-full w-full object-cover ${mono ? "grayscale" : i === index ? "" : "grayscale hover:grayscale-0"}`} />
							<span className="absolute bottom-0 right-0 bg-ink/80 px-1 font-mono text-[8px] text-paper/80 sm:text-[9px]">{i + 1}</span>
						</button>
					))}
				</div>
			</motion.div>
		</motion.div>
	);
}
