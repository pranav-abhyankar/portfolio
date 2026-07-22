'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Command, Terminal } from 'lucide-react'
import { useScrollY, useActiveSection } from '@/hooks/use-scroll'
import ThemeToggle from '@/components/shared/theme-toggle'

const NAV_IDS = ['about', 'experience', 'projects', 'skills', 'certifications', 'contact']
const NAV_LABELS: Record<string, string> = {
  about: 'About',
  experience: 'Experience',
  projects: 'Projects',
  skills: 'Skills',
  certifications: 'Certifications',
  contact: 'Contact',
}

interface NavigationProps {
  onOpenCommand?: () => void
}

export default function Navigation({ onOpenCommand }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrollY = useScrollY()
  const active = useActiveSection(NAV_IDS)
  const scrolled = scrollY > 60

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-white/[0.05] shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : ''
        }`}
        style={scrolled ? {
          background: 'var(--t-nav-bg)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          borderBottomColor: 'var(--t-nav-border)',
          boxShadow: 'var(--t-nav-shadow)',
        } : undefined}
      >
        <nav className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                boxShadow: '0 0 16px rgba(124,58,237,0.35)',
              }}>
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <span className="font-mono text-sm font-semibold text-white/80 group-hover:text-white transition-colors hidden sm:block tracking-tight">
              pranav.dev
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_IDS.map(id => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === id
                    ? 'text-violet-300'
                    : 'text-zinc-500 hover:text-zinc-200'
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">{NAV_LABELS[id]}</span>
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <ThemeToggle />

            {/* Command palette trigger */}
            <button
              onClick={onOpenCommand}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 transition-colors"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              aria-label="Open command palette"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">K</span>
            </button>

            <a
              href="mailto:pranavabhyankar92@gmail.com"
              className="hidden md:flex btn btn-primary rounded-full text-sm"
              style={{ padding: '8px 20px' }}
            >
              <span>Hire Me</span>
            </a>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
            style={{
              background: 'var(--t-mobile-menu-bg)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--t-mobile-border)',
            }}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {NAV_IDS.map((id, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollTo(id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
                    active === id
                      ? 'text-violet-300 bg-violet-500/10 border border-violet-500/20'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                  }`}
                >
                  <span className="font-mono text-[10px] text-zinc-700 w-6">0{i + 1}</span>
                  {NAV_LABELS[id]}
                </motion.button>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <a
                href="mailto:pranavabhyankar92@gmail.com"
                className="btn btn-primary rounded-xl justify-center mt-1"
              >
                <span>Get in Touch</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
