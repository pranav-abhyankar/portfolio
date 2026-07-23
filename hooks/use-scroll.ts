'use client'

import { useState, useEffect } from 'react'

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId = 0
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const total = document.documentElement.scrollHeight - window.innerHeight
        setProgress(total > 0 ? window.scrollY / total : 0)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return progress
}

export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let rafId = 0
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        setScrollY(window.scrollY)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return scrollY
}

export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState('')

  useEffect(() => {
    let rafId = 0
    let offsets: { id: string; top: number }[] = []

    // Read layout (offsetTop) only on mount/resize, never inside the scroll handler.
    const measure = () => {
      offsets = ids.map(id => ({ id, top: document.getElementById(id)?.offsetTop ?? 0 })).reverse()
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const y = window.scrollY

        // Near the bottom of the page, the last section may be shorter than
        // the `-140` lookahead can ever satisfy — force it active so nav
        // doesn't get stuck highlighting the second-to-last section.
        const atBottom = y + window.innerHeight >= document.documentElement.scrollHeight - 2
        if (atBottom && offsets.length > 0) {
          setActive(offsets[0].id)
          return
        }

        for (const { id, top } of offsets) {
          if (y >= top - 140) {
            setActive(id)
            return
          }
        }
        setActive('')
      })
    }

    measure()
    window.addEventListener('resize', measure, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [ids])

  return active
}
