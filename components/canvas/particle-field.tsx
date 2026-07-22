'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number
  color: string
  alpha: number
  pulse: number
  pulseSpeed: number
}

const COLORS = ['#8b5cf6', '#6366f1', '#22d3ee', '#a78bfa', '#818cf8', '#67e8f9']

export default function ParticleField() {
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

    let w = 0, h = 0, particles: Particle[] = []

    const init = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      const count = Math.min(Math.floor((w * h) / 18000), 100)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.45 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.015,
      }))
    }

    const onResize = () => init()
    const onMouse = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    init()

    const MAX_DIST = 140
    const MOUSE_INFLUENCE = 160

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const d = Math.hypot(dx, dy)
        if (d < MOUSE_INFLUENCE && d > 0) {
          const force = (MOUSE_INFLUENCE - d) / MOUSE_INFLUENCE
          p.vx += (dx / d) * force * 0.06
          p.vy += (dy / d) * force * 0.06
        }

        p.vx *= 0.988; p.vy *= 0.988
        p.pulse += p.pulseSpeed
        p.x += p.vx; p.y += p.vy

        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        if (p.x > w) { p.x = w; p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        if (p.y > h) { p.y = h; p.vy *= -1 }

        const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse))
        ctx.globalAlpha = a
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      // Connections
      const MAX_DIST_SQ = MAX_DIST * MAX_DIST
      ctx.strokeStyle = 'rgba(139,92,246,0.5)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq < MAX_DIST_SQ) {
            const d = Math.sqrt(distSq)
            const op = (1 - d / MAX_DIST) * 0.2
            ctx.globalAlpha = op
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, opacity: 0.55 }}
      aria-hidden="true"
    />
  )
}
