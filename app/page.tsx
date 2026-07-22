'use client'

import { useState, useEffect, useCallback } from 'react'
import Navigation from '@/components/shared/navigation'
import LoadingScreen from '@/components/shared/loading-screen'
import ScrollProgress from '@/components/shared/scroll-progress'
import CommandPalette from '@/components/shared/command-palette'
import BackToTop from '@/components/shared/back-to-top'
import CustomCursor from '@/components/shared/custom-cursor'
import GrainOverlay from '@/components/shared/grain-overlay'
import ParticleField from '@/components/canvas/particle-field'
import MarqueeStrip from '@/components/shared/marquee-strip'
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Experience from '@/components/sections/experience'
import Projects from '@/components/sections/projects'
import Skills from '@/components/sections/skills'
import Certifications from '@/components/sections/certifications'
import Contact from '@/components/sections/contact'

const MARQUEE_TECH = [
  'LangGraph', 'LangChain', 'Claude', 'GPT-4o', 'Gemini', 'Multi-Agent Systems',
  'SAP Integration', 'Celonis', 'AWS', 'GCP', 'Azure', 'Python', 'FastAPI',
  'LLM Orchestration', 'Process Mining', 'Enterprise AI',
]

const MARQUEE_SKILLS = [
  'Order-to-Cash Automation', 'Treasury Operations', 'Predictive Maintenance',
  'Agent Reasoning', 'RAG Pipelines', 'Tool Use', 'Function Calling',
  'Vector Databases', 'Semantic Search', 'LLM Routing', 'Agentic Workflows',
]

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [cmdOpen, setCmdOpen] = useState(false)

  const handleLoadComplete = useCallback(() => setLoaded(true), [])
  const openCmd = useCallback(() => setCmdOpen(true), [])
  const closeCmd = useCallback(() => setCmdOpen(false), [])

  // Ctrl/Cmd + K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Konami code easter egg
  useEffect(() => {
    const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let idx = 0
    const onKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[idx]) {
        idx++
        if (idx === KONAMI.length) {
          idx = 0
          // Easter egg: launch particle burst + console art
          console.log('%c⚡ KONAMI CODE ACTIVATED ⚡', 'font-size:24px; color:#8b5cf6; font-weight:bold;')
          console.log('%cYou found the easter egg. Hello, fellow developer 👾', 'color:#a78bfa; font-size:14px;')
          document.body.style.transition = 'filter 0.3s ease'
          document.body.style.filter = 'hue-rotate(180deg)'
          setTimeout(() => { document.body.style.filter = 'none' }, 2000)
        }
      } else {
        idx = 0
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />

      {loaded && (
        <main className="relative overflow-x-hidden" style={{ background: 'var(--t-bg)', color: 'var(--t-text)' }}>
          {/* Global overlays — always on top */}
          <CustomCursor />
          <GrainOverlay />
          <ParticleField />

          {/* Global ambient background */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full opacity-40 orb"
              style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)' }} />
            <div className="absolute top-3/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-30 orb"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', animationDelay: '4s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 orb"
              style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)', animationDelay: '8s' }} />
          </div>

          <div className="relative z-10">
            <ScrollProgress />
            <Navigation onOpenCommand={openCmd} />
            <Hero />

            {/* Ticker between hero → about */}
            <MarqueeStrip items={MARQUEE_TECH} style={{ borderTop: '1px solid var(--t-border)', borderBottom: '1px solid var(--t-border)', background: 'var(--t-surface)' }} />

            <About />
            <div className="section-divider max-w-7xl mx-auto" />

            <Experience />

            {/* Ticker between experience → projects */}
            <MarqueeStrip items={MARQUEE_SKILLS} reverse style={{ borderTop: '1px solid var(--t-border)', borderBottom: '1px solid var(--t-border)', background: 'var(--t-surface)' }} />

            <Projects />
            <div className="section-divider max-w-7xl mx-auto" />

            <Skills />
            <div className="section-divider max-w-7xl mx-auto" />

            <Certifications />

            <div className="section-divider max-w-7xl mx-auto" />
            <Contact />
          </div>

          <CommandPalette open={cmdOpen} onClose={closeCmd} />
          <BackToTop />
        </main>
      )}
    </>
  )
}
