import { motion } from 'framer-motion'
import { SKILLS } from '../utils/data'
import { fadeUpVariants, staggerContainerVariants } from '../hooks/useScrollAnimation'
import { SectionHeading } from './ui/SectionHeading'

/**
 * SKILLS — 3-column grid (desktop), 2 (mobile).
 * Each tile: icon block + name + category. The real-world context
 * slides open on hover / keyboard focus; on touch layouts (<lg) it is
 * always visible since hover is unreliable there.
 */
export function Skills() {
  return (
    <section id="skills" className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          index="02"
          title="Skills"
          sub="Tools I ship with — hover a tile for where it earned its keep."
        />

        <motion.ul
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5"
        >
          {SKILLS.map((skill, i) => (
            <motion.li
              key={skill.name}
              variants={fadeUpVariants}
              tabIndex={0}
              className="group relative border-4 border-ink bg-paper p-6 outline-none transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-brutal focus-visible:border-accent focus-visible:shadow-brutal"
            >
              <div className="flex items-start justify-between">
                {/* Icon block inverts to accent on hover/focus */}
                <span className="grid h-12 w-12 place-items-center border-2 border-ink text-ink transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-paper group-focus-visible:border-accent group-focus-visible:bg-accent group-focus-visible:text-paper">
                  <skill.icon size={24} strokeWidth={2} />
                </span>
                <span aria-hidden className="font-mono text-xs font-bold text-neutral-300">
                  0{i + 1}
                </span>
              </div>

              <h3 className="mt-5 font-heading text-lg font-bold uppercase leading-tight">{skill.name}</h3>
              <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-neutral-400">{skill.category}</p>

              {/* Context reveal — always open below lg, hover-gated above */}
              <p className="max-h-24 overflow-hidden pt-3 text-sm leading-relaxed text-neutral-600 transition-all duration-300 ease-out lg:max-h-0 lg:pt-0 lg:group-hover:max-h-24 lg:group-hover:pt-3 lg:group-focus-within:max-h-24 lg:group-focus-within:pt-3">
                {skill.context}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        <p className="mt-10 font-mono text-xs tracking-wider text-neutral-400">
          {'// always learning — currently deepening TypeScript, cloud architecture & system design'}
        </p>
      </div>
    </section>
  )
}
