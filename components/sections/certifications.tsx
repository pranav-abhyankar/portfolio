'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShieldCheck, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react'
import { certifications } from '@/data/certifications'
import { fadeUpVariants } from '@/lib/utils'

const EXTRAS = [
  { label: 'AWS Academy Cloud Architecting',                          color: '#FF9900' },
  { label: 'Cloud Computing — NPTEL',                                color: '#6366f1' },
  { label: 'Marketing Analytics — NPTEL',                            color: '#10b981' },
  { label: 'AI Intern Certificate — TechSaksham (Microsoft & SAP)',   color: '#0ea5e9' },
]

/* ─── Shield mascot ─────────────────────────────────────────────── */
function ShieldMascot() {
  return (
    <div className="relative flex-shrink-0 select-none shield-mascot" style={{ width: 96, height: 116 }}>
      <div className="absolute inset-0 rounded-full bg-amber-400/8 blur-3xl scale-150" />
      <svg viewBox="0 0 96 116" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_18px_rgba(245,158,11,0.25)]">
        {/* Shield */}
        <path className="s-body" d="M48 6 L82 20 L82 60 Q82 90 48 106 Q14 90 14 60 L14 20 Z"
          fill="rgba(12,10,24,0.95)" stroke="rgba(245,158,11,0.45)" strokeWidth="1.5"/>
        <path className="s-overlay" d="M48 14 L76 26 L76 60 Q76 84 48 98 Q20 84 20 60 L20 26 Z"
          fill="rgba(245,158,11,0.04)" stroke="rgba(245,158,11,0.12)" strokeWidth="0.5"/>

        {/* Antenna star */}
        <circle cx="48" cy="4" r="3.5" fill="#f59e0b">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite"/>
        </circle>

        {/* Corner stars */}
        <circle cx="18" cy="26" r="2" fill="#f59e0b" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="1.9s" repeatCount="indefinite"/>
        </circle>
        <circle cx="78" cy="26" r="2" fill="#a78bfa" opacity="0.5">
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="10" cy="58" r="1.5" fill="#f59e0b" opacity="0.4">
          <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="86" cy="58" r="1.5" fill="#a78bfa" opacity="0.4">
          <animate attributeName="opacity" values="0.1;0.5;0.1" dur="2.7s" repeatCount="indefinite"/>
        </circle>

        {/* Check circle */}
        <circle cx="48" cy="55" r="22" fill="rgba(245,158,11,0.07)" stroke="rgba(245,158,11,0.28)" strokeWidth="1">
          <animate attributeName="r" values="20;23;20" dur="3.2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="48" cy="55" r="16" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.38)" strokeWidth="0.8"/>

        {/* Checkmark draw */}
        <polyline points="37,55 45,64 62,43"
          stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray="32" strokeDashoffset="32">
          <animate attributeName="stroke-dashoffset" values="32;0" dur="0.9s" fill="freeze" begin="0.4s"/>
        </polyline>

        {/* Verified strip */}
        <rect className="s-panel" x="24" y="82" width="48" height="13" rx="5" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.22)" strokeWidth="0.5"/>
        <text x="48" y="92" textAnchor="middle" fill="rgba(245,158,11,0.85)"
          fontSize="6.5" fontFamily="JetBrains Mono" fontWeight="700" letterSpacing="1.2">
          VERIFIED
        </text>
      </svg>
    </div>
  )
}

/* ─── Credential card ───────────────────────────────────────────── */
function CredentialCard({ cert, delay, inView }: {
  cert: typeof certifications[0]
  delay: number
  inView: boolean
}) {
  const [hov, setHov] = useState(false)

  const inner = (
    <>
      <div className="flex items-center gap-4 min-w-0">
        {/* Badge */}
        <div
          className="relative w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
          style={{
            background: `linear-gradient(140deg, ${cert.color}ee 0%, ${cert.color}88 100%)`,
            boxShadow: `0 4px 14px ${cert.color}40, inset 0 1px 0 rgba(255,255,255,0.25)`,
          }}
        >
          <div className="absolute top-1 left-1.5 w-4 h-2 rounded-full opacity-35"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9), transparent)' }} />
          <span className="text-white text-[11px] font-black font-mono tracking-tight z-10 relative">
            {cert.shortCode.length > 3 ? cert.shortCode.slice(0, 3) : cert.shortCode}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-sm text-white leading-tight break-words"
            style={{ fontSize: '13.5px' }}>
            {cert.name}
          </h3>
          <p className="text-[11px] font-mono mt-0.5" style={{ color: `${cert.color}aa` }}>
            {cert.provider}
          </p>
        </div>
      </div>

      {/* Meta row — stacks below on mobile so it never competes with the name for width */}
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-1.5 sm:flex-col sm:items-end flex-shrink-0 mt-3 sm:mt-0 sm:ml-1">
        <div className="flex items-center gap-1 px-2 py-1 rounded-full"
          style={{
            background: 'rgba(16,185,129,0.07)',
            border: '1px solid rgba(16,185,129,0.22)',
          }}>
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span className="text-[9px] font-mono font-semibold text-emerald-400">Verified</span>
        </div>
        {cert.credential && (
          <span className="flex items-center gap-1 text-[9px] font-mono text-violet-400 group-hover:text-violet-300 transition-colors">
            View credential
            <ExternalLink className="w-2.5 h-2.5" />
          </span>
        )}
      </div>
    </>
  )

  const sharedStyle = {
    background: hov ? 'var(--t-surface)' : 'var(--t-card-bg)',
    border: '1px solid var(--t-border)',
    borderLeft: `3px solid ${cert.color}${hov ? 'cc' : '66'}`,
    boxShadow: hov ? `0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px ${cert.color}18` : 'none',
    transform: hov ? 'translateY(-2px)' : 'none',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {cert.credential ? (
        <a
          href={cert.credential}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          className="relative flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-4 rounded-2xl p-4 sm:p-5 transition-all duration-300 group"
          style={sharedStyle}
        >
          {inner}
        </a>
      ) : (
        <div
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          className="relative flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-4 rounded-2xl p-4 sm:p-5 transition-all duration-300 group"
          style={sharedStyle}
        >
          {inner}
        </div>
      )}
    </motion.div>
  )
}

/* ─── Main ──────────────────────────────────────────────────────── */
export default function Certifications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="certifications" className="relative py-[clamp(3rem,6vw,5.5rem)] overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-600/3 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16" ref={ref}>

        {/* ── Header ── */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-8 sm:mb-14 flex items-start justify-between gap-8"
        >
          <div className="flex-1">
            <p className="section-label mb-3">05 — Certifications</p>
            <h2 className="font-display font-bold text-[clamp(2.2rem,5vw,3.5rem)] text-white leading-tight">
              Verified <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-zinc-500 mt-3 max-w-md text-sm leading-relaxed">
              Industry credentials from leading AI, cloud, and enterprise platforms —
              hands-on training with assessed competency.
            </p>

            {/* Stats row */}
            <div className="flex items-center gap-6 mt-6">
              {[
                { value: `${certifications.length}`, label: 'Certifications' },
                { value: '4+', label: 'Additional Courses' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-display font-bold text-xl text-gradient-violet">{value}</span>
                  <span className="text-[10px] font-mono text-zinc-600 mt-0.5">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <ShieldMascot />
          </motion.div>
        </motion.div>

        {/* ── Credential cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {certifications.map((cert, i) => (
            <CredentialCard
              key={cert.name}
              cert={cert}
              delay={0.06 + i * 0.055}
              inView={inView}
            />
          ))}
        </div>

        {/* ── Extras ── */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0.55}
          className="rounded-2xl p-5"
          style={{
            background: 'var(--t-card-bg)',
            border: '1px solid var(--t-border)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-400/60" />
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600">
              Additional Completions
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {EXTRAS.map(({ label, color }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                style={{
                  background: 'var(--t-card-bg)',
                  border: '1px solid var(--t-border)',
                  borderLeft: `2px solid ${color}55`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: color, boxShadow: `0 0 5px ${color}` }} />
                <span className="text-zinc-400 text-xs font-mono leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
