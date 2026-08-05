import { useEffect, useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { GiLaurelsTrophy } from 'react-icons/gi'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Teams', href: '#teams' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Bracket', href: '#bracket' },
  { label: 'Register', href: '#register' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-blue-400/15 bg-slate-950/95 text-slate-100 shadow-[0_15px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-100" onClick={() => setIsOpen(false)}>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/30 bg-gradient-to-br from-amber-300 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/20">
            <GiLaurelsTrophy className="text-2xl" aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-xs text-amber-400">MLBB</span>
            <span className="text-lg font-semibold text-white">Championship</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-300 transition hover:text-amber-300 focus-visible:outline-none focus-visible:text-amber-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-slate-100 transition hover:border-amber-300/50 hover:text-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      <div id="mobile-navigation" className={`${isOpen ? 'block' : 'hidden'} border-t border-slate-800 bg-slate-950/98 md:hidden`}>
        <nav className="space-y-1 px-4 py-4 sm:px-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:bg-amber-400/10 hover:text-amber-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
