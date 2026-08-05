import { useEffect, useState } from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { HiClock } from 'react-icons/hi'
import { fetchMatches, getApiErrorMessage } from '../services/api'

const statusStyles = { upcoming: 'border-blue-400/30 bg-blue-400/10 text-blue-300', live: 'border-rose-400/40 bg-rose-400/10 text-rose-300', finished: 'border-slate-600 bg-slate-800 text-slate-400' }

export default function MatchSchedule() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetchMatches().then((data) => active && setMatches(data)).catch((requestError) => active && setError(getApiErrorMessage(requestError, 'Unable to load the match schedule.'))).finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return <section id="schedule" className="relative overflow-hidden bg-slate-900/40 px-4 py-20 sm:px-6 lg:px-8"><div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_45%,rgba(37,99,235,.16),transparent_30%)]" /><div className="mx-auto max-w-7xl"><div className="mb-10 text-center"><p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">Battle Timeline</p><h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Match Schedule</h2></div>
    {error && <p role="alert" className="mb-5 rounded-lg border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">{error}</p>}
    {loading && <div className="grid gap-5 lg:grid-cols-3">{[0, 1, 2].map((item) => <div key={item} className="h-64 animate-pulse rounded-2xl border border-white/10 bg-slate-950/70" />)}</div>}
    {!loading && !error && matches.length === 0 && <p className="rounded-xl border border-white/10 bg-slate-950/50 p-6 text-center text-slate-400">No matches have been scheduled yet.</p>}
    {!loading && !error && matches.length > 0 && <div className="grid gap-5 lg:grid-cols-3">{matches.map((match) => { const date = new Date(match.scheduled_at); return <article key={match.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/20 backdrop-blur transition hover:border-amber-300/30"><div className="flex items-center justify-between gap-3"><span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${statusStyles[match.status] || statusStyles.upcoming}`}>{match.status === 'live' && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-300" />}{match.status}</span><span className="text-xs font-bold uppercase tracking-widest text-slate-500">Bo{match.best_of}</span></div><div className="my-8 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center"><p className="text-base font-bold text-white sm:text-lg">{match.team_one_name || 'TBD'}</p><span className="rounded-md border border-amber-300/20 bg-amber-300/10 px-2 py-1 text-xs font-black text-amber-300">VS</span><p className="text-base font-bold text-white sm:text-lg">{match.team_two_name || 'TBD'}</p></div><div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-sm text-slate-400"><span className="flex items-center gap-2"><FaCalendarAlt className="text-amber-400" aria-hidden="true" />{date.toLocaleDateString()}</span><span className="flex items-center gap-2"><HiClock className="text-amber-400" aria-hidden="true" />{date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span></div></article> })}</div>}
  </div></section>
}
