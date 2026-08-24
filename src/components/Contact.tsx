import { useState } from 'react'
import type { FormEvent } from 'react'
import { Download, Github, Linkedin, Mail, Phone, Send } from 'lucide-react'
import { CONTACT, PROFILE } from '../utils/data'
import {
  composeMailtoLink,
  sendContactEmail,
} from '../utils/email'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

type FormState = 'idle' | 'sending' | 'sent' | 'error' | 'handoff'

/**
 * CONTACT — info + CV download on the left; contact form on the right.
 * Messages are delivered to the owner's inbox via EmailJS (free tier).
 * Until keys are configured in .env, submitting gracefully hands off
 * to a prefilled mailto: so the form never dead-ends.
 */
export function Contact() {
  const [state, setState] = useState<FormState>('idle')
  const [feedback, setFeedback] = useState('')

  /* Deliver through EmailJS, or fall back to the visitor's mail client. */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state === 'sending') return

    const data = new FormData(e.currentTarget)
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    }

    setState('sending')
    const res = await sendContactEmail(payload)

    if (res.status === 'sent') {
      setState('sent')
      e.currentTarget.reset()
    } else if (res.status === 'unconfigured') {
      // Keys not set yet — never leave a message stranded.
      window.location.href = composeMailtoLink(payload)
      setState('handoff')
    } else {
      setState('error')
      setFeedback(res.msg ?? 'Something went wrong. Try again.')
    }
  }

  const channels = [
    { icon: Mail, label: 'EMAIL', value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: Phone, label: 'PHONE', value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
    { icon: Linkedin, label: 'LINKEDIN', value: '/in/otokse', href: CONTACT.linkedin },
    { icon: Github, label: 'GITHUB', value: '@OtokseDom', href: CONTACT.github },
  ]

  const inputClasses =
    'w-full border-4 border-ink bg-paper px-4 py-3 font-sans text-ink placeholder:text-neutral-400 focus:border-accent focus:shadow-brutal-sm focus:outline-none transition-shadow duration-200'

  return (
    <section id="contact" className="bg-paper py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading index="05" title="Contact" sub="Open to full-stack & frontend roles. I reply fast." />

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: channels + CV ──────────────────────────────── */}
          <div>
            <Reveal>
              <h3 className="font-heading text-2xl font-extrabold uppercase leading-tight md:text-3xl">
                Let's build something
                <br />
                that saves time<span className="text-accent">.</span>
              </h3>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-8 list-none">
                {channels.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="border-b-2 border-ink/10">
                    <a
                      href={href}
                      {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center gap-4 py-4"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-ink text-ink transition-colors duration-200 group-hover:bg-accent group-hover:text-paper">
                        <Icon size={18} />
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.2em] text-neutral-400">{label}</span>
                      <span className="ml-auto break-all text-sm font-medium text-ink transition-colors group-hover:text-accent sm:text-base">
                        {value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* CV download */}
            <Reveal delay={0.16}>
              <div className="mt-10">
                <a
                  href={PROFILE.cv}
                  download="John_Dominic_Escoto_CV.pdf"
                  className="inline-flex items-center gap-3 border-4 border-ink bg-ink px-6 py-4 font-heading text-sm font-extrabold uppercase tracking-widest text-paper transition-colors duration-200 hover:border-accent hover:bg-accent"
                >
                  <Download size={18} /> Download CV
                </a>
              </div>
            </Reveal>
          </div>

          {/* ── Right: contact form ──────────────────────────────── */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="border-4 border-ink bg-fog p-6 shadow-brutal md:p-8">
              <h3 className="font-heading text-xl font-extrabold uppercase leading-tight">
                Send a message<span className="text-accent">.</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Roles, projects, or questions: it lands straight in my inbox.
              </p>

              <div className="mt-6 grid gap-5">
                <label className="block">
                  <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-ink">Name *</span>
                  <input required name="name" type="text" autoComplete="name" placeholder="Ada Lovelace" className={`mt-2 ${inputClasses}`} />
                </label>

                <label className="block">
                  <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-ink">Email *</span>
                  <input required name="email" type="email" autoComplete="email" placeholder="ada@analytical.engine" className={`mt-2 ${inputClasses}`} />
                </label>

                <label className="block">
                  <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-ink">Message *</span>
                  <textarea required name="message" rows={5} placeholder="Tell me about the role, the team, or the problem you want solved." className={`mt-2 resize-y ${inputClasses}`} />
                </label>

                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-3 border-4 border-ink bg-accent px-6 py-4 font-heading text-sm font-extrabold uppercase tracking-widest text-paper transition-colors duration-200 hover:bg-ink disabled:cursor-wait disabled:bg-neutral-400"
                >
                  {state === 'sending' ? 'Sending…' : 'Send Message'} <Send size={16} />
                </button>

                {/* Status banners */}
                {state === 'sent' && (
                  <p role="status" className="border-4 border-ink bg-accent px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-paper">
                    ✔ Message sent. I'll get back to you soon.
                  </p>
                )}
                {state === 'handoff' && (
                  <p role="status" className="border-4 border-ink bg-paper px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-ink">
                    ✔ Handed off to your mail app. Hit send there.
                  </p>
                )}
                {state === 'error' && (
                  <p role="alert" className="border-4 border-paper bg-ink px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-paper">
                    ✕ Send failed. {feedback} Or reach me directly:{' '}
                    <a href={`mailto:${CONTACT.email}`} className="underline decoration-accent underline-offset-4">
                      {CONTACT.email}
                    </a>
                    .
                  </p>
                )}

                <p className="font-mono text-xs leading-relaxed tracking-wide text-neutral-500">
                  {'// delivered by emailjs · prefer your own client? '}
                  <a href={`mailto:${CONTACT.email}`} className="underline decoration-accent underline-offset-4 hover:text-accent">
                    email me directly
                  </a>
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
