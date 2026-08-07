import { FaInstagram, FaYoutube, FaDiscord } from 'react-icons/fa'
import logo from '../../one.jpg'

const socials = [
  { label: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
  { label: 'YouTube', icon: FaYoutube, href: 'https://youtube.com' },
  { label: 'Discord', icon: FaDiscord, href: 'https://discord.com' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-4xl border border-cyan-400/20 bg-slate-900/70 p-6 shadow-[0_20px_60px_-35px_rgba(56,189,248,0.35)] backdrop-blur md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="UTYCC logo" className="h-12 w-12 rounded-full border border-cyan-400/40 object-contain" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">UTYCC</p>
            <p className="text-base font-semibold text-white">University eSport Arena</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {socials.map(({ label, icon: Icon, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-200">
              <Icon aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
