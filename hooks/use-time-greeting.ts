'use client'

import { useState, useEffect } from 'react'

function getGreeting(hour: number): string {
  if (hour >= 5  && hour < 12) return 'Good morning'
  if (hour >= 12 && hour < 17) return 'Good afternoon'
  if (hour >= 17 && hour < 21) return 'Good evening'
  return 'Burning midnight oil?'
}

export function useTimeGreeting(): string {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const update = () => setGreeting(getGreeting(new Date().getHours()))
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [])

  return greeting
}
