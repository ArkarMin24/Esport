import { FaCalendarAlt, FaGamepad, FaTrophy, FaUsers } from 'react-icons/fa'
import { HiClock } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { fetchTournaments, getApiErrorMessage } from '../services/api'

export default function TournamentInfo() {
  const [tournament, setTournament] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { fetchTournaments().then((items) => setTournament(items[0] || null)).catch((requestError) => setError(getApiErrorMessage(requestError, 'Unable to load tournament details.'))) }, [])
  if (error) return <section id="tournaments" className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">{error}</div></section>
  if (!tournament) return <section id="tournaments" className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl rounded-xl border border-dashed border-white/10 p-6 text-sm text-slate-500">Tournament details will appear here once the organizer publishes an event.</div></section>
  const details = [
    ['Prize pool', `RM ${Number(tournament.prize_pool).toLocaleString()}`, FaTrophy],
    ['Start date', new Date(tournament.start_date).toLocaleDateString(), FaCalendarAlt],
    ['Teams', `${tournament.team_count} / ${tournament.max_teams}`, FaUsers],
    ['Format', tournament.game_mode, FaGamepad],
    ['Registration', new Date(tournament.registration_deadline).toLocaleString(), HiClock],
  ]
  return (
    <section id="tournaments" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Tournament Program</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">{tournament.name}</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {details.map(([label, value, Icon]) => (
            <article key={label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-[0_20px_50px_-30px_rgba(2,8,23,0.8)] backdrop-blur">
              <Icon className="mb-8 text-2xl text-cyan-300" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
              <p className="mt-2 text-lg font-bold text-white">{value}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-6 shadow-[0_20px_60px_-35px_rgba(56,189,248,0.45)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">About the event</p>
            <h3 className="mt-2 text-xl font-bold text-white">MLBB tournament details</h3>
            <p className="mt-5 text-sm leading-7 text-slate-400">{tournament.description || 'Official MLBB competition for campus teams.'}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_60px_-35px_rgba(2,8,23,0.8)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Registration</p>
            <h3 className="mt-2 text-xl font-bold text-white">Build your roster</h3>
            <p className="mt-5 text-sm leading-7 text-slate-400">Registration closes {new Date(tournament.registration_deadline).toLocaleString()}. Submit five unique in-game names with one captain.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
