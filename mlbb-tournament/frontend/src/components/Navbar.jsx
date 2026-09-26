import { useEffect, useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import logo from '../../one.jpg'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Live', href: '#live' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Bracket', href: '#bracket' },
  { label: 'Register', href: '#register' },
  { label: 'Sign in', href: '/login' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/90 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="UTYCC university logo" className="h-11 w-11 rounded-full border border-cyan-200 object-contain shadow-lg shadow-cyan-700/15" />
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-300">UTYCC</span>
            <span className="text-sm font-semibold text-slate-100">MLBB Campus Clash</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-300 transition hover:text-cyan-300 focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 p-2.5 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      <div id="mobile-navigation" className={`${isOpen ? 'block' : 'hidden'} border-t border-slate-800 bg-slate-950/95 md:hidden`}>
        <nav className="space-y-1 px-4 py-4 sm:px-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-200 transition hover:bg-slate-800 hover:text-cyan-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
