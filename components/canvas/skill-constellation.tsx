'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface SkillNode {
  x: number; y: number
  vx: number; vy: number
  label: string
  r: number
  color: string
  alpha: number
  pulse: number
  pulseSpeed: number
  level: 'expert' | 'proficient' | 'familiar'
}

const SKILL_DATA = [
  // Core — center cluster
  { label: 'LangGraph',    level: 'expert'     as const, color: '#8b5cf6' },
  { label: 'LangChain',    level: 'expert'     as const, color: '#8b5cf6' },
  { label: 'Claude API',   level: 'expert'     as const, color: '#d97706' },
  { label: 'Python',       level: 'expert'     as const, color: '#a78bfa' },
  { label: 'FastAPI',      level: 'expert'     as const, color: '#6366f1' },
  // Mid ring
  { label: 'GPT-4o',       level: 'expert'     as const, color: '#10a37f' },
  { label: 'Gemini',       level: 'proficient' as const, color: '#4285F4' },
  { label: 'AWS',          level: 'expert'     as const, color: '#f97316' },
  { label: 'GCP',          level: 'proficient' as const, color: '#4285F4' },
  { label: 'SAP',          level: 'expert'     as const, color: '#0070f3' },
  { label: 'Celonis',      level: 'expert'     as const, color: '#5cb8b2' },
  { label: 'TypeScript',   level: 'proficient' as const, color: '#3178c6' },
  // Outer
  { label: 'Azure',        level: 'proficient' as const, color: '#0078d4' },
  { label: 'Docker',       level: 'proficient' as const, color: '#2496ed' },
  { label: 'PostgreSQL',   level: 'proficient' as const, color: '#336791' },
  { label: 'Streamlit',    level: 'familiar'   as const, color: '#ff4b4b' },
  { label: 'Next.js',      level: 'proficient' as const, color: '#f7f7f7' },
  { label: 'Groq',         level: 'proficient' as const, color: '#f55036' },
]

const LEVEL_SIZE = { expert: 32, proficient: 24, familiar: 18 }

export default function SkillConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const mouse = useRef({ x: -9999, y: -9999 })
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0
    let nodes: SkillNode[] = []

    const init = () => {
      w = canvas.width  = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight

      // Arrange in loose clusters
      nodes = SKILL_DATA.map((s, i) => {
        const angle = (i / SKILL_DATA.length) * Math.PI * 2
        const ring = s.level === 'expert' ? 0.28 : s.level === 'proficient' ? 0.42 : 0.52
        const jitter = 0.08
        const r = Math.min(w, h) * (ring + (Math.random() - 0.5) * jitter)
        return {
          x: w / 2 + Math.cos(angle) * r,
          y: h / 2 + Math.sin(angle) * r,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          label: s.label,
          r: LEVEL_SIZE[s.level],
          color: s.color,
          alpha: s.level === 'expert' ? 0.9 : s.level === 'proficient' ? 0.7 : 0.5,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.012,
          level: s.level,
        }
      })
    }

    const onResize = () => init()
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }

    window.addEventListener('resize', onResize)
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', onLeave)
    init()

    const MAX_CONN = 140

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d = Math.hypot(dx, dy)
          if (d < MAX_CONN) {
            const op = (1 - d / MAX_CONN) * 0.15
            ctx.globalAlpha = op
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(139,92,246,0.8)`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        // Mouse attraction
        const dx = mouse.current.x - n.x
        const dy = mouse.current.y - n.y
        const d = Math.hypot(dx, dy)
        const ATTRACT = 120
        if (d < ATTRACT && d > 0) {
          const force = (ATTRACT - d) / ATTRACT
          n.vx += (dx / d) * force * 0.04
          n.vy += (dy / d) * force * 0.04
        }

        // Gentle gravity back to origin
        const centerPull = 0.0008
        n.vx += (w / 2 - n.x) * centerPull
        n.vy += (h / 2 - n.y) * centerPull

        n.vx *= 0.96; n.vy *= 0.96
        n.x += n.vx;  n.y += n.vy
        n.pulse += n.pulseSpeed

        // Boundary bounce
        if (n.x < n.r)     { n.x = n.r;     n.vx *= -1 }
        if (n.x > w - n.r) { n.x = w - n.r; n.vx *= -1 }
        if (n.y < n.r)     { n.y = n.r;     n.vy *= -1 }
        if (n.y > h - n.r) { n.y = h - n.r; n.vy *= -1 }

        const pulseFactor = 0.85 + 0.15 * Math.sin(n.pulse)
        const rr = n.r * pulseFactor

        // Glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, rr * 1.8)
        grd.addColorStop(0, `${n.color}30`)
        grd.addColorStop(1, 'transparent')
        ctx.globalAlpha = 1
        ctx.beginPath()
        ctx.arc(n.x, n.y, rr * 1.8, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Circle
        ctx.globalAlpha = n.alpha * pulseFactor
        ctx.beginPath()
        ctx.arc(n.x, n.y, rr, 0, Math.PI * 2)
        ctx.fillStyle = `${n.color}18`
        ctx.fill()
        ctx.strokeStyle = `${n.color}80`
        ctx.lineWidth = 1
        ctx.stroke()

        // Label
        ctx.globalAlpha = n.alpha
        ctx.fillStyle = '#f7f7f7'
        ctx.font = `${n.level === 'expert' ? 700 : 500} ${n.level === 'expert' ? 10 : 9}px "JetBrains Mono", monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(n.label, n.x, n.y)
      }

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[320px] rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.01)',
        border: '1px solid rgba(139,92,246,0.1)',
      }}
      aria-label="Interactive skill constellation"
    />
  )
}
