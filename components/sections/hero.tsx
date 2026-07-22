'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, Sparkles, ChevronDown } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useScramble } from '@/hooks/use-scramble'
import { useTimeGreeting } from '@/hooks/use-time-greeting'

const ROLES = [
  { text: '> AI Engineer',              color: '#a78bfa' },
  { text: '> Enterprise AI Developer',  color: '#818cf8' },
  { text: '> AI Platform Engineer',     color: '#67e8f9' },
  { text: '> Applied AI Engineer',      color: '#c084fc' },
]

const STATS = [
  { value: '10+', label: 'Production Agents' },
  { value: '5+',  label: 'Enterprise Clients' },
  { value: '3',   label: 'Cloud Platforms' },
  { value: '8+',  label: 'Certifications' },
]

/* ─── Agent Pipeline Terminal ────────────────────────────────────── */

const QUERY  = 'Find delayed invoices in Q4 AP pipeline'
const RESULT = '23 invoices need urgent follow-up. Writebacks triggered. AP team alerted.'

interface PStep {
  id: string; showAt: number; doneAt: number; section?: 'agents'
  label: string; col: string; bg: string; bdr: string
  doing: string; done: string
}

const PIPE: PStep[] = [
  { id: 'sap',     showAt: 100,  doneAt: 350,  label: 'SAP ERP',      col: '#60a5fa', bg: 'rgba(96,165,250,0.1)',   bdr: 'rgba(96,165,250,0.3)',   doing: 'Fetching invoice records',                done: '847 invoices · 23 delayed · $2.4M outstanding'  },
  { id: 'celonis', showAt: 400,  doneAt: 650,  label: 'Celonis',       col: '#22d3ee', bg: 'rgba(34,211,238,0.1)',   bdr: 'rgba(34,211,238,0.3)',   doing: 'Scanning AP flows for bottlenecks',       done: '12 flow violations · avg delay +4.2 days'       },
  { id: 'rag',     showAt: 720,  doneAt: 950,  section: 'agents', label: 'RAG',          col: '#a78bfa', bg: 'rgba(167,139,250,0.1)',  bdr: 'rgba(167,139,250,0.3)',  doing: 'Searching knowledge base',               done: '3 resolution patterns matched'                 },
  { id: 'ml',      showAt: 1000, doneAt: 1200, section: 'agents', label: 'ML · Python',  col: '#4ade80', bg: 'rgba(74,222,128,0.1)',   bdr: 'rgba(74,222,128,0.3)',   doing: 'Running anomaly detection model',         done: '23 high-risk invoices flagged (P>0.85)'        },
  { id: 'ai',      showAt: 1250, doneAt: 1450, section: 'agents', label: 'AI Reasoning', col: '#f59e0b', bg: 'rgba(245,158,11,0.1)',   bdr: 'rgba(245,158,11,0.3)',   doing: 'Synthesizing alerts and recommendations', done: '4 action items · 2 critical alerts identified' },
  { id: 'aws',     showAt: 1520, doneAt: 1700, label: 'AWS',           col: '#fb923c', bg: 'rgba(251,146,60,0.1)',   bdr: 'rgba(251,146,60,0.3)',   doing: 'Deploying writeback and alert triggers',  done: 'SAP writeback queued · alerts dispatched'      },
]

const RES_AT  = 1800
const CHAR_MS = 10

function AgentStreamTerminal() {
  const [t, setT] = useState(0)
  const epoch = useRef(Date.now())

  useEffect(() => {
    const end = RES_AT + RESULT.length * CHAR_MS + 700
    const id = setInterval(() => {
      const el = Date.now() - epoch.current
      setT(el)
      if (el >= end) clearInterval(id)
    }, 40)
    return () => clearInterval(id)
  }, [])

  const topSteps   = PIPE.filter(s => !s.section && s.id !== 'aws')
  const agentSteps = PIPE.filter(s => s.section === 'agents')
  const awsStep    = PIPE.find(s => s.id === 'aws')!

  const showAgents = t >= agentSteps[0].showAt
  const showAws    = t >= awsStep.showAt

  const dots     = '.'.repeat((Math.floor(t / 250) % 3) + 1)
  const resChars = t > RES_AT ? Math.min(RESULT.length, Math.floor((t - RES_AT) / CHAR_MS)) : 0
  const resDone  = resChars >= RESULT.length
  const cursor   = Math.floor(t / 520) % 2 === 0

  const stepRow = (s: PStep, indent = false) => {
    if (t < s.showAt) return null
    const loading = t < s.doneAt
    return (
      <div key={s.id} className={`flex items-start gap-2.5 ${indent ? 'pl-3' : ''}`}>
        <div className="w-4 flex-shrink-0 flex justify-center" style={{ paddingTop: 2 }}>
          {loading
            ? <div className="w-3 h-3 rounded-full border border-t-transparent animate-spin"
                style={{ borderColor: `${s.col}55`, borderTopColor: s.col }} />
            : <span style={{ color: '#4ade80', fontSize: 13, lineHeight: 1 }}>✓</span>}
        </div>
        <span className="flex-shrink-0 text-[10px] font-bold px-1.5 py-[2px] rounded-md"
          style={{ color: s.col, background: s.bg, border: `1px solid ${s.bdr}` }}>
          {s.label}
        </span>
        <span style={{ color: loading ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.58)' }}>
          {loading ? `${s.doing}${dots}` : s.done}
        </span>
      </div>
    )
  }

  const rule = <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none">
      <div className="absolute -inset-4 rounded-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 55%, rgba(139,92,246,0.13) 0%, transparent 68%)' }} />

      <div className="relative rounded-2xl overflow-hidden font-mono text-[11px] leading-snug"
        style={{
          background: 'rgba(8,8,12,0.95)',
          border: '1px solid rgba(139,92,246,0.2)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 24px 56px rgba(0,0,0,0.6)',
        }}>

        {/* Chrome */}
        <div className="flex items-center gap-1.5 px-4 py-2.5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.055)', background: 'rgba(255,255,255,0.012)' }}>
          <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
          <span className="ml-3 text-[10px]" style={{ color: 'rgba(255,255,255,0.22)' }}>agent_pipeline.py</span>
          <span className="ml-auto flex items-center gap-1.5 text-[10px]" style={{ color: 'rgba(74,222,128,0.7)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
            running
          </span>
        </div>

        {/* Body */}
        <div className="px-4 py-3 space-y-2.5">

          {/* User query */}
          <div className="flex items-start gap-2 pb-2.5"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.055)' }}>
            <span className="text-[9px] uppercase tracking-widest flex-shrink-0 mt-px"
              style={{ color: 'rgba(255,255,255,0.22)' }}>User</span>
            <span style={{ color: 'rgba(255,255,255,0.82)' }}>&quot;{QUERY}&quot;</span>
          </div>

          {/* SAP + Celonis */}
          {topSteps.map(s => stepRow(s))}

          {/* ── Agents section ── */}
          {showAgents && rule}
          {showAgents && (
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-[0.18em] flex-shrink-0"
                style={{ color: 'rgba(255,255,255,0.2)' }}>Agents</span>
              <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
            </div>
          )}
          {agentSteps.map(s => stepRow(s, true))}

          {/* ── AWS ── */}
          {showAws && rule}
          {showAws && stepRow(awsStep)}

          {/* Result card */}
          {t >= RES_AT && (
            <div className="rounded-xl px-3.5 py-3"
              style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <div className="text-[9px] uppercase tracking-widest mb-1.5"
                style={{ color: 'rgba(167,139,250,0.5)' }}>
                Recommendation Generated
              </div>
              <span style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}>
                {RESULT.slice(0, resChars)}
              </span>
              {!resDone && (
                <span className="inline-block w-[2px] h-[13px] rounded-sm align-middle ml-px"
                  style={{ background: 'rgba(167,139,250,0.85)', opacity: cursor ? 1 : 0 }} />
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

function AgentFlowDiagram() {
  return <AgentStreamTerminal />
}

/* ─── Magnetic Button ───────────────────────────────────────────── */
function MagneticButton({
  children, className, href,
}: {
  children: React.ReactNode
  className?: string
  href?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 18 })
  const sy = useSpring(y, { stiffness: 180, damping: 18 })

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  const Tag = href ? 'a' : 'button'
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div style={{ x: sx, y: sy }}>
        <Tag
          href={href}
          className={className}
          target={href?.startsWith('http') ? '_blank' : undefined}
          rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </Tag>
      </motion.div>
    </div>
  )
}

/* ─── Hero ──────────────────────────────────────────────────────── */
export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [ready, setReady] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 3200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return
    let rafId = 0
    let pendingX = 0, pendingY = 0

    const apply = () => {
      rafId = 0
      if (!spotlightRef.current) return
      spotlightRef.current.style.background =
        `radial-gradient(700px circle at ${pendingX}% ${pendingY}%, rgba(139,92,246,0.09), transparent 75%)`
    }

    const handle = (e: MouseEvent) => {
      pendingX = (e.clientX / window.innerWidth) * 100
      pendingY = (e.clientY / window.innerHeight) * 100
      if (!rafId) rafId = requestAnimationFrame(apply)
    }
    window.addEventListener('mousemove', handle, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handle)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [prefersReducedMotion])

  const scrambledFirst  = useScramble('PRANAV',    ready, 35, 100)
  const scrambledMiddle = useScramble('PRADEEP',   ready, 35, 225)
  const scrambledLast   = useScramble('ABHYANKAR', ready, 35, 350)
  const greeting = useTimeGreeting()

  const ease = [0.25, 0.4, 0.25, 1] as const

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Layered backgrounds */}
      <div className="absolute inset-0" style={{ background: 'var(--t-bg)' }} />
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="absolute inset-0 aurora" />

      {/* Perspective grid floor */}
      <div className="perspective-grid" />

      {/* Reactive mouse spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(700px circle at 50% 50%, rgba(139,92,246,0.04), transparent 75%)' }}
      />

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full orb"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full orb"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full orb"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.03) 0%, transparent 70%)', animationDelay: '6s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 pt-20 sm:py-24 sm:pt-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left ── */}
          <div className="flex flex-col items-start gap-6">

            {/* Boot sequence label */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: 'var(--t-badge-bg)',
                  border: '1px solid var(--t-badge-border)',
                  color: 'var(--t-badge-text)',
                  backdropFilter: 'blur(8px)',
                }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                {greeting ? `${greeting} · ` : ''}Available for AI Engineering roles
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              </div>
            </motion.div>

            {/* Scramble name reveal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ duration: 0.3 }}
            >
              <h1 className="font-display font-bold tracking-tight leading-[0.88]">
                <span className="block text-[clamp(2.8rem,7vw,5.5rem)] text-white font-mono">
                  {prefersReducedMotion ? 'PRANAV' : scrambledFirst}
                </span>
                <span className="block text-[clamp(2.8rem,7vw,5.5rem)] font-mono mt-1"
                  style={{ color: 'var(--t-name-mid)' }}>
                  {prefersReducedMotion ? 'PRADEEP' : scrambledMiddle}
                </span>
                <span
                  className="block text-[clamp(2.8rem,7vw,5.5rem)] font-mono mt-1"
                  style={{
                    background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #67e8f9 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {prefersReducedMotion ? 'ABHYANKAR' : scrambledLast}
                </span>
              </h1>
            </motion.div>

            {/* Role cycling */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="h-7 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIdx}
                  initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35, ease }}
                  className="text-base sm:text-lg font-mono font-medium"
                  style={{ color: ROLES[roleIdx].color }}
                >
                  {ROLES[roleIdx].text}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.55 }}
              className="text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ color: 'var(--t-text-body)' }}
            >
              I architect AI solutions, from identifying business challenges to designing and delivering{' '}
              <span className="font-medium" style={{ color: 'var(--t-accent-span)' }}>production-ready systems</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.65 }}
              className="flex flex-wrap items-center gap-3"
            >
              <MagneticButton className="btn btn-primary rounded-full" href="#projects">
                <span className="flex items-center gap-2">
                  View Projects <ArrowRight className="w-4 h-4" />
                </span>
              </MagneticButton>
              <MagneticButton className="btn btn-secondary rounded-full" href="#contact">
                Get in Touch
              </MagneticButton>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.75 }}
              className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-6 pt-4 border-t w-full"
              style={{ borderColor: 'var(--t-border)' }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={ready ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.07, ease }}
                  className="flex flex-col gap-0.5"
                >
                  <span className="font-display font-bold text-2xl text-gradient-violet">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-mono" style={{ color: 'var(--t-text-muted)' }}>
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-2.5"
            >
              {[
                { href: 'https://github.com/pranav-abhyankar',      icon: Github,   label: 'GitHub',   hoverColor: '#a78bfa' },
                { href: 'https://linkedin.com/in/pranav-abhyankar', icon: Linkedin, label: 'LinkedIn', hoverColor: '#60a5fa' },
                { href: 'mailto:pranavabhyankar92@gmail.com',        icon: Mail,     label: 'Email',    hoverColor: '#34d399' },
              ].map(({ href, icon: Icon, label, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-mono transition-all duration-200"
                  style={{
                    color: 'var(--t-text-muted)',
                    background: 'var(--t-card-bg)',
                    border: '1px solid var(--t-border)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = hoverColor
                    el.style.borderColor = hoverColor + '55'
                    el.style.background = hoverColor + '10'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--t-text-muted)'
                    el.style.borderColor = 'var(--t-border)'
                    el.style.background = 'var(--t-card-bg)'
                  }}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <span className="hidden xs:inline">{label}</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Agent Diagram ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={ready ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 1, ease, delay: 0.35 }}
            className="hidden lg:flex items-center justify-center"
          >
            <AgentFlowDiagram />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <motion.span
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[10px] font-mono uppercase tracking-[0.25em]"
          style={{ color: 'var(--t-text-dim)' }}
        >
          scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--t-text-dim)' }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
