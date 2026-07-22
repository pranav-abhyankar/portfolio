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
    let trailIndex = 0

    const TRAIL_COUNT = 8
    const trails = trailsRef.current

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY

      // Spawn trail particle
      const t = trails[trailIndex % TRAIL_COUNT]
      if (t) {
        t.style.left = `${mx}px`
        t.style.top = `${my}px`
        t.style.opacity = '0.6'
        t.style.transform = 'translate(-50%, -50%) scale(1)'
        setTimeout(() => {
          t.style.opacity = '0'
          t.style.transform = 'translate(-50%, -50%) scale(0.1)'
        }, 50)
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
        halo.style.width = '56px'
        halo.style.height = '56px'
        halo.style.borderColor = 'rgba(139,92,246,0.8)'
        halo.style.backgroundColor = 'rgba(139,92,246,0.06)'
        dot.style.transform = 'translate(-50%, -50%) scale(1.8)'
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
        halo.style.width = '32px'
        halo.style.height = '32px'
        halo.style.borderColor = 'rgba(139,92,246,0.4)'
        halo.style.backgroundColor = 'transparent'
        dot.style.transform = 'translate(-50%, -50%) scale(1)'
        dot.style.backgroundColor = '#8b5cf6'
      }
    }

    const onMouseDown = () => {
      halo.style.transform = `translate(-50%, -50%) scale(0.85)`
      dot.style.transform = 'translate(-50%, -50%) scale(0.6)'
    }

    const onMouseUp = () => {
      halo.style.transform = `translate(-50%, -50%) scale(${isHovering ? 1.15 : 1})`
      dot.style.transform = `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`
    }

    const tick = () => {
      // Lerp halo toward cursor
      hx += (mx - hx) * 0.12
      hy += (my - hy) * 0.12

      dot.style.left = `${mx}px`
      dot.style.top = `${my}px`
      halo.style.left = `${hx}px`
      halo.style.top = `${hy}px`

      rafId = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove)
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
