'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export function useScramble(target: string, trigger: boolean, speed = 40, delay = 0) {
  const [output, setOutput] = useState('')
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const iterRef = useRef(0)

  const scramble = useCallback(() => {
    let frame = 0
    const totalFrames = target.length * 3

    const tick = () => {
      const resolved = Math.floor(frame / 3)
      let result = ''

      for (let i = 0; i < target.length; i++) {
        if (target[i] === ' ') { result += ' '; continue }
        if (i < resolved) {
          result += target[i]
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }
      setOutput(result)
      frame++
      if (frame <= totalFrames) {
        frameRef.current = setTimeout(tick, speed)
      } else {
        setOutput(target)
      }
    }

    iterRef.current = window.setTimeout(() => {
      tick()
    }, delay)
  }, [target, speed, delay])

  useEffect(() => {
    if (!trigger) return
    scramble()
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current)
      if (iterRef.current) clearTimeout(iterRef.current)
    }
  }, [trigger, scramble])

  return output
}
