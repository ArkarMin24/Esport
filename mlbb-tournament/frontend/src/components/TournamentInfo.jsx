import { useEffect, useState } from 'react'
import { FaCalendarAlt, FaGamepad, FaTrophy, FaUsers } from 'react-icons/fa'
import { HiClock } from 'react-icons/hi'
import { fetchTournaments } from '../services/api'

const fallbackTournament = {
  prize_pool: '10000', start_date: '2026-05-24', end_date: '2026-05-26', team_count: 0,
  max_teams: 32, game_mode: '5v5 Draft Pick', registration_deadline: '2026-05-12T23:59:00Z',
}

const formatDate = (date) => new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${date}T00:00:00`))
const formatCurrency = (value) => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(value))

export default function TournamentInfo() {
  const [tournament, setTournament] = useState(fallbackTournament)

  useEffect(() => {
    let active = true
    fetchTournaments().then((items) => {
      const selected = items.find((item) => item.id === Number(import.meta.env.VITE_TOURNAMENT_ID)) || items[0]
      if (active && selected) setTournament(selected)
    }).catch(() => {})
    return () => { active = false }
  }, [])

  const tournamentDetails = [
    { label: 'Prize Pool', value: formatCurrency(tournament.prize_pool), icon: FaTrophy, accent: 'text-amber-300' },
    { label: 'Tournament Date', value: `${formatDate(tournament.start_date)} – ${formatDate(tournament.end_date)}`, icon: FaCalendarAlt, accent: 'text-blue-300' },
    { label: 'Teams', value: `${tournament.team_count} / ${tournament.max_teams}`, icon: FaUsers, accent: 'text-violet-300' },
    { label: 'Game Mode', value: tournament.game_mode, icon: FaGamepad, accent: 'text-emerald-300' },
    { label: 'Registration Deadline', value: new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(tournament.registration_deadline)), icon: HiClock, accent: 'text-rose-300' },
  ]

  return (
    <section id="tournament-info" className="relative scroll-mt-20 overflow-hidden bg-slate-950 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_55%,rgba(37,99,235,.14),transparent_25%),radial-gradient(circle_at_88%_20%,rgba(245,158,11,.12),transparent_25%)]" />
      <div className="mx-auto max-w-7xl"><div className="mb-10 text-center"><p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">Tournament Intel</p><h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Enter the Arena</h2></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{tournamentDetails.map(({ label, value, icon: Icon, accent }) => <article key={label} className="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/15 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"><Icon className={`mb-8 text-2xl ${accent}`} aria-hidden="true" /><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p><p className="mt-2 text-lg font-bold text-white">{value}</p></article>)}</div>
      </div>
    </section>
  )
}
