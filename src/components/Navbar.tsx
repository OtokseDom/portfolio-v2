import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, PROFILE } from '../utils/data'

/**
 * Fixed top bar. Thick bottom border, square logo block, mono links.
 * Collapses to a full-width dropdown panel under the bar on mobile.
 */
export function Navbar() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-ink bg-paper/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-3" onClick={close}>
          <span className="grid h-9 w-9 place-items-center border-2 border-ink bg-accent font-heading text-sm font-extrabold text-paper transition-transform duration-200 group-hover:-translate-y-0.5">
            JD
          </span>
          <span className="font-heading text-lg font-bold tracking-tight text-ink">
            ESCOTO<span className="text-accent">.</span>DEV
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-heading text-xs font-bold tracking-widest text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={PROFILE.cv}
              download="John_Dominic_Escoto_CV.pdf"
              className="border-2 border-ink px-3 py-1.5 font-heading text-xs font-bold uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              CV ↓
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid h-10 w-10 place-items-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-paper md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t-4 border-ink bg-paper px-4 py-6 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className="block border-b-2 border-ink/10 px-2 py-3 font-heading text-sm font-bold tracking-widest text-ink transition-colors hover:bg-accent hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href={PROFILE.cv}
                download="John_Dominic_Escoto_CV.pdf"
                onClick={close}
                className="inline-block w-full border-4 border-ink bg-ink px-4 py-3 text-center font-heading text-sm font-bold uppercase tracking-widest text-paper transition-colors hover:bg-accent hover:border-accent"
              >
                Download CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
