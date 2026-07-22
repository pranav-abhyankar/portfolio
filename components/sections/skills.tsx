'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Cpu, Layers, Cloud, Code2, Building2, Database, Briefcase } from 'lucide-react'
import { skillGroups } from '@/data/skills'
import { fadeUpVariants } from '@/lib/utils'
import type { SkillGroup } from '@/types'

/* ─── Proficiency pill styles ──────────────────────────────────── */
const PILL = {
  expert:     { bg: 'var(--pill-expert-bg)',     border: 'var(--pill-expert-bdr)',     text: 'var(--pill-expert)',     glow: 'var(--pill-expert-glow)' },
  proficient: { bg: 'var(--pill-proficient-bg)', border: 'var(--pill-proficient-bdr)', text: 'var(--pill-proficient)', glow: 'none' },
  familiar:   { bg: 'var(--pill-familiar-bg)',   border: 'var(--pill-familiar-bdr)',   text: 'var(--pill-familiar)',   glow: 'none' },
}

/* ─── Category metadata ────────────────────────────────────────── */
const CAT: Record<string, { Icon: React.ElementType; color: string; dimColor: string }> = {
  'AI & Machine Learning':  { Icon: Brain,     color: '#8b5cf6', dimColor: 'rgba(139,92,246,0.12)' },
  'LLM Providers':          { Icon: Cpu,       color: '#f59e0b', dimColor: 'rgba(245,158,11,0.1)'  },
  'Frameworks':             { Icon: Layers,    color: '#6366f1', dimColor: 'rgba(99,102,241,0.1)'  },
  'Cloud & Infrastructure': { Icon: Cloud,     color: '#0ea5e9', dimColor: 'rgba(14,165,233,0.1)'  },
  'Languages':              { Icon: Code2,     color: '#10b981', dimColor: 'rgba(16,185,129,0.1)'  },
  'Enterprise Tools':       { Icon: Building2, color: '#5cb8b2', dimColor: 'rgba(92,184,178,0.1)'  },
  'Databases':              { Icon: Database,  color: '#f97316', dimColor: 'rgba(249,115,22,0.1)'  },
}

/* ─── Animated robot mascot ────────────────────────────────────── */
function RobotMascot() {
  return (
    <div className="relative flex-shrink-0 select-none robot-mascot" style={{ width: 110, height: 140 }}>
      <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-3xl scale-150" />
      <svg viewBox="0 0 110 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">
        {/* Antenna stem */}
        <line x1="55" y1="8" x2="55" y2="22" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
        {/* Antenna orb */}
        <circle cx="55" cy="6" r="4" fill="#8b5cf6">
          <animate attributeName="r" values="3.5;5.5;3.5" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="55" cy="6" r="7" fill="#8b5cf6" opacity="0.15">
          <animate attributeName="r" values="5;9;5" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
        </circle>

        {/* Head body */}
        <rect className="r-body" x="12" y="22" width="86" height="60" rx="14" fill="rgba(12,10,24,0.95)" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5"/>
        {/* Inner head glow */}
        <rect className="r-overlay" x="17" y="27" width="76" height="50" rx="10" fill="rgba(139,92,246,0.03)"/>

        {/* Left eye frame */}
        <rect x="20" y="34" width="28" height="18" rx="5" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.4)" strokeWidth="1"/>
        {/* Left eye inner */}
        <rect x="24" y="38" width="20" height="10" rx="3" fill="rgba(139,92,246,0.35)"/>
        {/* Left pupil */}
        <rect x="26" y="40" width="6" height="6" rx="1.5" fill="#c4b5fd">
          <animate attributeName="x" values="24;34;24" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        </rect>
        {/* Pupil shine */}
        <rect x="28" y="41" width="2" height="2" rx="0.5" fill="white" opacity="0.7">
          <animate attributeName="x" values="26;36;26" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        </rect>

        {/* Right eye frame */}
        <rect x="62" y="34" width="28" height="18" rx="5" fill="rgba(99,102,241,0.12)" stroke="rgba(99,102,241,0.4)" strokeWidth="1"/>
        {/* Right eye inner */}
        <rect x="66" y="38" width="20" height="10" rx="3" fill="rgba(99,102,241,0.35)"/>
        {/* Right pupil */}
        <rect x="68" y="40" width="6" height="6" rx="1.5" fill="#a5b4fc">
          <animate attributeName="x" values="66;76;66" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        </rect>
        {/* Pupil shine */}
        <rect x="70" y="41" width="2" height="2" rx="0.5" fill="white" opacity="0.7">
          <animate attributeName="x" values="68;78;68" dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>
        </rect>

        {/* Mouth panel */}
        <rect className="r-panel" x="20" y="60" width="70" height="14" rx="5" fill="rgba(0,0,0,0.5)" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5"/>
        {/* Binary lights */}
        {[1,0,1,1,0,1,0,1].map((on, i) => (
          <rect key={i} x={23 + i * 8.5} y={64} width="5" height="6" rx="1.5"
            fill={on ? '#8b5cf6' : 'rgba(139,92,246,0.12)'}>
            <animate attributeName="opacity"
              values={on ? '0.8;0.2;0.8' : '0.2;0.8;0.2'}
              dur={`${1 + i * 0.2}s`}
              repeatCount="indefinite"/>
          </rect>
        ))}

        {/* Left ear */}
        <rect className="r-body" x="2" y="38" width="10" height="28" rx="4" fill="rgba(12,10,24,0.95)" stroke="rgba(139,92,246,0.3)" strokeWidth="1"/>
        <rect x="4" y="42" width="5" height="4" rx="1.5" fill="rgba(139,92,246,0.5)"/>
        <rect x="4" y="48" width="5" height="2" rx="1" fill="rgba(99,102,241,0.4)"/>
        <rect x="4" y="52" width="5" height="2" rx="1" fill="rgba(139,92,246,0.25)"/>

        {/* Right ear */}
        <rect className="r-body" x="98" y="38" width="10" height="28" rx="4" fill="rgba(12,10,24,0.95)" stroke="rgba(139,92,246,0.3)" strokeWidth="1"/>
        <rect x="101" y="42" width="5" height="4" rx="1.5" fill="rgba(139,92,246,0.5)"/>
        <rect x="101" y="48" width="5" height="2" rx="1" fill="rgba(99,102,241,0.4)"/>
        <rect x="101" y="52" width="5" height="2" rx="1" fill="rgba(139,92,246,0.25)"/>

        {/* Neck */}
        <rect className="r-body" x="38" y="82" width="34" height="12" rx="4" fill="rgba(12,10,24,0.95)" stroke="rgba(139,92,246,0.2)" strokeWidth="1"/>
        {/* Neck bolts */}
        <circle cx="44" cy="88" r="2" fill="rgba(139,92,246,0.3)" stroke="rgba(139,92,246,0.5)" strokeWidth="0.5"/>
        <circle cx="66" cy="88" r="2" fill="rgba(139,92,246,0.3)" stroke="rgba(139,92,246,0.5)" strokeWidth="0.5"/>

        {/* Body / shoulders */}
        <rect className="r-body" x="8" y="94" width="94" height="42" rx="12" fill="rgba(12,10,24,0.95)" stroke="rgba(139,92,246,0.35)" strokeWidth="1.5"/>
        {/* Body gradient overlay */}
        <rect className="r-overlay" x="13" y="99" width="84" height="32" rx="8" fill="rgba(139,92,246,0.04)"/>

        {/* Chest screen */}
        <rect className="r-panel" x="28" y="103" width="54" height="22" rx="6" fill="rgba(0,0,0,0.4)" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5"/>

        {/* Heartbeat / CPU pulse */}
        <circle cx="55" cy="114" r="6" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.5)" strokeWidth="1">
          <animate attributeName="r" values="5;8;5" dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="55" cy="114" r="3" fill="#8b5cf6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.6s" repeatCount="indefinite"/>
        </circle>

        {/* Side vents */}
        {[0,1,2].map(i => (
          <rect key={i} x="15" y={103 + i * 7} width="9" height="3" rx="1.5" fill="rgba(139,92,246,0.25)" stroke="rgba(139,92,246,0.15)" strokeWidth="0.5"/>
        ))}
        {[0,1,2].map(i => (
          <rect key={i} x="86" y={103 + i * 7} width="9" height="3" rx="1.5" fill="rgba(99,102,241,0.25)" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5"/>
        ))}
      </svg>
    </div>
  )
}

/* ─── Skill Pill ───────────────────────────────────────────────── */
function SkillPill({ name, level }: { name: string; level: keyof typeof PILL }) {
  const s = PILL[level]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full font-mono transition-all duration-200 cursor-default select-none"
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.text,
        padding: level === 'expert' ? '5px 12px' : level === 'proficient' ? '4px 10px' : '3px 9px',
        fontSize: level === 'expert' ? '12px' : level === 'proficient' ? '11px' : '10.5px',
        fontWeight: level === 'expert' ? 600 : 500,
        boxShadow: s.glow,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{
          background: level === 'expert' ? 'var(--pill-dot-expert)' : level === 'proficient' ? 'var(--pill-dot-proficient)' : 'var(--pill-dot-familiar)',
        }}
      />
      {name}
    </span>
  )
}

/* ─── Category Card ────────────────────────────────────────────── */
function CategoryCard({ group, featured = false, delay = 0 }: {
  group: SkillGroup
  featured?: boolean
  delay?: number
}) {
  const meta = CAT[group.category] || CAT['AI & Machine Learning']
  const { Icon, color, dimColor } = meta

  return (
    <motion.div
      variants={fadeUpVariants}
      custom={delay}
      className="relative rounded-2xl p-6 flex flex-col gap-5 h-full group transition-all duration-300"
      style={{
        background: featured
          ? `linear-gradient(145deg, ${dimColor}, var(--t-card-bg))`
          : 'var(--t-card-bg)',
        border: '1px solid var(--t-border)',
        borderLeft: `2px solid ${color}55`,
      }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      {/* Top accent glow on hover */}
      <div
        className="absolute inset-x-0 top-0 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
          style={{ background: `${color}15`, border: `1px solid ${color}35` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-sm text-white leading-tight">
            {group.category}
          </h3>
          <p className="text-[10px] font-mono mt-1 leading-snug" style={{ color: 'var(--t-text-muted)' }}>
            {group.description}
          </p>
        </div>
        {featured && (
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0"
            style={{ background: `${color}18`, color, border: `1px solid ${color}35` }}>
            Core
          </span>
        )}
      </div>

      {/* Skill pills — expert → proficient → familiar */}
      <div className="flex flex-wrap gap-1.5">
        {[...group.skills]
          .sort((a, b) => {
            const order = { expert: 0, proficient: 1, familiar: 2 }
            return (order[a.level ?? 'familiar']) - (order[b.level ?? 'familiar'])
          })
          .map(skill => (
            <SkillPill
              key={skill.name}
              name={skill.name}
              level={skill.level ?? 'familiar'}
            />
          ))}
      </div>
    </motion.div>
  )
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [aiMl, llm, frameworks, cloud, languages, enterprise, databases] = skillGroups

  return (
    <section id="skills" className="relative py-[clamp(3rem,6vw,5.5rem)] overflow-hidden">
      {/* Section atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16" ref={ref}>

        {/* ── Header ── */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-8 sm:mb-14 flex items-start justify-between gap-8"
        >
          <div className="flex-1">
            <p className="section-label mb-3">04 — Skills</p>
            <h2 className="font-display font-bold text-[clamp(2.2rem,5vw,3.5rem)] text-white leading-tight">
              Technology &amp; Domain <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-zinc-500 mt-3 max-w-lg text-sm leading-relaxed">
              Technologies powering production AI systems — not a checklist, a working toolkit.
              Proficiency reflects daily production use, not weekend projects.
            </p>

            {/* Proficiency legend */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest mr-1">Proficiency:</span>
              {(['expert', 'proficient', 'familiar'] as const).map(level => (
                <span
                  key={level}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono capitalize"
                  style={{
                    background: PILL[level].bg,
                    border: `1px solid ${PILL[level].border}`,
                    color: PILL[level].text,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: level === 'expert' ? 'var(--pill-dot-expert)' : level === 'proficient' ? 'var(--pill-dot-proficient)' : 'var(--pill-dot-familiar)' }} />
                  {level}
                </span>
              ))}
            </div>
          </div>

          {/* Robot mascot */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="hidden lg:block"
          >
            <RobotMascot />
          </motion.div>
        </motion.div>

        {/* ── Bento Grid ── */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-4"
        >
          {/* Row 1: AI&ML (featured) + LLM Providers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.55fr_1fr] gap-4">
            <CategoryCard group={aiMl} featured delay={0.05} />
            <CategoryCard group={llm} delay={0.1} />
          </div>

          {/* Row 2: Frameworks + Cloud + Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CategoryCard group={frameworks} delay={0.15} />
            <CategoryCard group={cloud} delay={0.2} />
            <CategoryCard group={languages} delay={0.25} />
          </div>

          {/* Row 3: Enterprise + Databases */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CategoryCard group={enterprise} delay={0.3} />
            <CategoryCard group={databases} delay={0.35} />
          </div>
        </motion.div>

        {/* ── Business Domain Expertise ── */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0.4}
          className="mt-4 relative rounded-2xl p-6 flex flex-col gap-5 group transition-all duration-300"
          style={{
            background: 'var(--t-card-bg)',
            border: '1px solid var(--t-border)',
            borderLeft: '2px solid rgba(6,182,212,0.35)',
          }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
        >
          {/* Top accent glow on hover */}
          <div className="absolute inset-x-0 top-0 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.6), transparent)' }} />

          {/* Header */}
          <div className="flex items-start gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.35)' }}
            >
              <Briefcase className="w-5 h-5" style={{ color: '#06b6d4' }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-sm text-white leading-tight">
                Business Domain Expertise
              </h3>
              <p className="text-[10px] font-mono mt-1 leading-snug" style={{ color: 'var(--t-text-muted)' }}>
                Enterprise business processes across supply chain, finance, and operations
              </p>
            </div>
          </div>

          {/* Domain pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              'Order-to-Cash',
              'Source to Pay',
              'Procure-to-Pay',
              'Accounts Payable',
              'Accounts Receivable',
              'HR Management',
              'Plant Management',
              'Treasury Automation',
              'Process Intelligence',
            ].map(d => (
              <span
                key={d}
                className="inline-flex items-center gap-1.5 rounded-full font-mono cursor-default select-none"
                style={{
                  background: 'var(--pill-proficient-bg)',
                  border: '1px solid var(--pill-proficient-bdr)',
                  color: 'var(--pill-proficient)',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: 500,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--pill-dot-proficient)' }} />
                {d}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
