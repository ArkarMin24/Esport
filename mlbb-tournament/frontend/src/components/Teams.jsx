import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaCrown } from 'react-icons/fa'
import { fetchTeams, getApiErrorMessage } from '../services/api'

const colors = ['from-sky-400 to-blue-700', 'from-rose-400 to-red-700', 'from-amber-300 to-orange-600', 'from-violet-400 to-indigo-700', 'from-emerald-300 to-green-700', 'from-cyan-300 to-blue-600']

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    fetchTeams()
      .then((data) => active && setTeams(data))
      .catch((requestError) => active && setError(getApiErrorMessage(requestError, 'Unable to load teams.')))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [])

  return (
    <section id="teams" className="bg-slate-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">Registered Squads</p><h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Meet the Teams</h2></div>
          <p className="max-w-sm text-sm text-slate-400">{loading ? 'Loading registered teams…' : `${teams.length} team${teams.length === 1 ? '' : 's'} ready to stake their claim.`}</p>
        </div>
        {error && <p role="alert" className="mb-5 rounded-lg border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">{error}</p>}
        {loading && <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((item) => <div key={item} className="h-36 animate-pulse rounded-2xl border border-white/10 bg-slate-900/60" />)}</div>}
        {!loading && !error && teams.length === 0 && <p className="rounded-xl border border-white/10 bg-slate-900/50 p-6 text-center text-slate-400">No teams have registered yet.</p>}
        {!loading && !error && teams.length > 0 && <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, index) => <motion.article key={team.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: index * 0.06 }} whileHover={{ y: -8 }} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-black/20 backdrop-blur transition-colors hover:border-amber-300/40">
            <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${colors[index % colors.length]} opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-30`} />
            <div className="relative flex items-center gap-5"><div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${colors[index % colors.length]} p-px shadow-lg`}><div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950 text-xl font-black tracking-tight text-white">{team.name.split(' ').map((word) => word[0]).slice(0, 2).join('')}</div></div><div className="min-w-0"><h3 className="truncate text-xl font-bold text-white">{team.name}</h3><p className="mt-1 flex items-center gap-2 text-sm text-slate-400"><FaCrown className="text-amber-300" aria-hidden="true" /> Captain: {team.captain_name}</p></div></div>
            <div className="relative mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </motion.article>)}
        </div>}
      </div>
    </section>
  )
}
