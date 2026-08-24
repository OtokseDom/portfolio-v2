import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Images, Lock } from 'lucide-react'
import { PROJECTS } from '../utils/data'
import type { Project } from '../utils/data'
import { renderRich } from '../utils/text'
import { fadeUpVariants, staggerContainerVariants } from '../hooks/useScrollAnimation'
import { SectionHeading } from './ui/SectionHeading'
import { GalleryModal } from './GalleryModal'

/**
 * PROJECTS — four flagship builds. Cards lift, shift their border to
 * accent, gain a hard shadow, and the placeholder photo snaps to color
 * on hover. Each card links to its repo and opens a screenshot gallery.
 */
export function Projects() {
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="bg-fog py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          index="03"
          title="Projects"
          sub="Shipped, led, and defended — every card carries its measurable outcome."
        />

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-4"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} onOpenGallery={() => setGalleryIndex(i)} />
          ))}
        </motion.div>
      </div>

      {/* Screenshot gallery */}
      <AnimatePresence>
        {galleryIndex !== null && (
          <GalleryModal
            key={PROJECTS[galleryIndex].title}
            project={PROJECTS[galleryIndex]}
            onClose={() => setGalleryIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ── Card ───────────────────────────────────────────────────────── */

function ProjectCard({ project, onOpenGallery }: { project: Project; onOpenGallery: () => void }) {
  return (
    <motion.article
      variants={fadeUpVariants}
      className="group flex flex-col border-4 border-ink bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-brutal"
    >
      {/* Image + status badge */}
      <button
        type="button"
        onClick={onOpenGallery}
        aria-label={`Open ${project.title} screenshot gallery`}
        className="relative block w-full cursor-pointer overflow-hidden border-b-4 border-ink p-0 text-left"
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          className={`h-44 w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 xl:h-40 ${project.monochrome ? "" : "group-hover:grayscale-0"}`}
        />
        {/* hover affordance for the gallery */}
        <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/40 group-hover:opacity-100">
          <span className="flex items-center gap-2 border-2 border-paper bg-paper px-3 py-1.5 font-heading text-[11px] font-extrabold uppercase tracking-widest text-ink">
            <Images size={14} /> Screenshots
          </span>
        </span>
        <span
          className={`absolute left-3 top-3 border-2 border-ink px-2 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.15em] ${project.badgeClass}`}
        >
          {project.status}
        </span>
      </button>

      {/* Body */}
      <div className="flex grow flex-col p-5">
        <p className="font-mono text-[11px] tracking-widest text-neutral-500">
          {project.year} · {project.role}
        </p>
        <h3 className="mt-2 font-heading text-lg font-extrabold uppercase leading-tight">{project.title}</h3>

        <ul className="mt-3 list-none space-y-2">
          {project.impact.map((line) => (
            <li key={line} className="flex gap-2.5 text-[13px] leading-relaxed text-neutral-700">
              <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent" />
              <span>{renderRich(line)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="border-2 border-ink px-1.5 py-0.5 font-mono text-[10px] font-medium text-ink">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto grid gap-2 pt-5">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-2 border-4 border-ink bg-paper px-4 py-2.5 font-heading text-xs font-extrabold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              View Project Repo <ArrowUpRight size={16} />
            </a>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="This repository is private"
              className="inline-flex cursor-not-allowed select-none items-center justify-between gap-2 border-4 border-ink bg-paper px-4 py-2.5 font-heading text-xs font-extrabold uppercase tracking-widest text-neutral-400"
            >
              Project Repo Is Private <Lock size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={onOpenGallery}
            className="inline-flex cursor-pointer items-center justify-between gap-2 border-4 border-ink bg-fog px-4 py-2.5 font-heading text-xs font-extrabold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
          >
            Screenshots <Images size={16} />
          </button>
        </div>
      </div>
    </motion.article>
  )
}
