'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, MapPin, Send, ArrowRight, Copy, Check } from 'lucide-react'
import { fadeUpVariants } from '@/lib/utils'

const EMAIL = 'pranavabhyankar92@gmail.com'

function CopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono text-zinc-500 hover:text-zinc-200 transition-all duration-200"
      style={{ background: 'var(--t-card-bg)', border: '1px solid var(--t-border)' }}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div key="check" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}
            className="flex items-center gap-1.5 text-emerald-400">
            <Check className="w-3.5 h-3.5" />
            Copied!
          </motion.div>
        ) : (
          <motion.div key="copy" className="flex items-center gap-1.5">
            <Copy className="w-3.5 h-3.5" />
            {EMAIL}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    description: '@pranav-abhyankar',
    href: 'https://github.com/pranav-abhyankar',
    icon: Github,
    color: '#f4f4f5',
  },
  {
    label: 'LinkedIn',
    description: 'Connect professionally',
    href: 'https://linkedin.com/in/pranav-abhyankar',
    icon: Linkedin,
    color: '#0a66c2',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="relative pt-[clamp(3rem,6vw,5.5rem)] pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[500px] rounded-full bg-violet-600/6 blur-[140px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center" ref={ref}>

        {/* Section label */}
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="section-label mb-4"
        >
          06 — Contact
        </motion.p>

        {/* Headline */}
        <motion.h2
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0.05}
          className="font-display font-bold text-[clamp(2.5rem,6vw,4rem)] text-white leading-tight mb-4"
        >
          Let&apos;s Build Something{' '}
          <span className="text-gradient">Together</span>
        </motion.h2>

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0.1}
          className="text-zinc-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
        >
          Whether it&apos;s an enterprise AI system, an agentic workflow, or just a conversation about
          the future of LLMs — I&apos;m always open for a discussion.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0.15}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="btn btn-primary rounded-full text-base"
            style={{ padding: '14px 36px' }}
          >
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Send a Message
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
          <CopyEmail />
        </motion.div>

        {/* Social cards */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0.2}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
        >
          {SOCIAL_LINKS.map(({ label, description, href, icon: Icon, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-200 w-full sm:w-auto"
              style={{
                background: 'var(--t-card-bg)',
                border: '1px solid var(--t-border)',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor = color + '40'
                ;(e.currentTarget as HTMLAnchorElement).style.background = color + '08'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--t-border)'
                ;(e.currentTarget as HTMLAnchorElement).style.background = 'var(--t-card-bg)'
              }}
            >
              <Icon className="w-4 h-4 text-zinc-500 group-hover:scale-110 transition-transform" style={{ color: color + 'cc' }} />
              <div className="text-left">
                <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">{label}</p>
                <p className="text-sm text-zinc-300 font-medium">{description}</p>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Location */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0.25}
          className="flex items-center justify-center gap-2 text-zinc-700 text-xs font-mono mb-6"
        >
          <MapPin className="w-3.5 h-3.5" />
          Bengaluru, Karnataka, India
        </motion.div>

        {/* Footer */}
        <div className="h-px w-full mb-5" style={{ background: 'linear-gradient(90deg, transparent, var(--t-border), transparent)' }} />
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0.3}
          className="text-center text-zinc-700 text-[11px] font-mono"
        >
          Designed &amp; built by{' '}
          <span className="text-violet-400">Pranav Pradeep Abhyankar</span>
        </motion.div>
      </div>
    </section>
  )
}
