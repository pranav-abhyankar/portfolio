'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const halo = haloRef.current
    if (!dot || !halo) return

    let mx = -100, my = -100
    let hx = -100, hy = -100
    let rafId = 0
    let isHovering = false
    let isDown = false
    let dotScale = 1
    let haloScale = 1
    let trailIndex = 0
    let lastTrailTime = 0

    const TRAIL_COUNT = 8
    const TRAIL_INTERVAL_MS = 35
    const trails = trailsRef.current

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY

      const now = performance.now()
      if (now - lastTrailTime < TRAIL_INTERVAL_MS) return
      lastTrailTime = now

      const t = trails[trailIndex % TRAIL_COUNT]
      if (t) {
        t.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(1)`
        t.style.opacity = '0.6'
        requestAnimationFrame(() => {
          t.style.opacity = '0'
          t.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(0.1)`
        })
      }
      trailIndex++
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="pointer"]')
      ) {
        isHovering = true
        halo.style.borderColor = 'rgba(139,92,246,0.8)'
        halo.style.backgroundColor = 'rgba(139,92,246,0.06)'
        dot.style.backgroundColor = '#a78bfa'
      }
    }

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor="pointer"]')
      ) {
        isHovering = false
        halo.style.borderColor = 'rgba(139,92,246,0.4)'
        halo.style.backgroundColor = 'transparent'
        dot.style.backgroundColor = '#8b5cf6'
      }
    }

    const onMouseDown = () => { isDown = true }
    const onMouseUp = () => { isDown = false }

    const tick = () => {
      // Lerp halo position toward cursor
      hx += (mx - hx) * 0.12
      hy += (my - hy) * 0.12

      const dotTarget = isDown ? 0.6 : isHovering ? 1.8 : 1
      const haloTarget = isDown ? 0.85 : isHovering ? 1.75 : 1
      dotScale += (dotTarget - dotScale) * 0.25
      haloScale += (haloTarget - haloScale) * 0.2

      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${dotScale})`
      halo.style.transform = `translate3d(${hx}px, ${hy}px, 0) translate(-50%, -50%) scale(${haloScale})`

      rafId = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    rafId = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(rafId)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
      />
      {/* Halo — lags behind */}
      <div
        ref={haloRef}
        className="cursor-halo"
        aria-hidden="true"
      />
      {/* Trail particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailsRef.current[i] = el }}
          className="cursor-trail"
          aria-hidden="true"
        />
      ))}
    </>
  )
}
