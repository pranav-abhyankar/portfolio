'use client'

import { useState, useEffect, useCallback } from 'react'

export type Theme = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    // Read what the inline script set on <html> (or fall back to dark)
    const current = document.documentElement.classList.contains('light') ? 'light' : 'dark'
    setTheme(current)
  }, [])

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      const html = document.documentElement
      html.classList.remove('dark', 'light')
      html.classList.add(next)
      try { localStorage.setItem('theme', next) } catch {}
      return next
    })
  }, [])

  return { theme, toggle }
}
