import { motion } from 'framer-motion'
import { FaCrown } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { fetchTeams, getApiErrorMessage } from '../services/api'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchTeams().then(setTeams).catch((requestError) => setError(getApiErrorMessage(requestError, 'Unable to load teams.'))) }, [])

  return (
    <section id="teams" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Campus Squads</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">UTYCC Team Lineup</h2>
          </div>
            <p className="max-w-md text-sm text-slate-400">Registered MLBB squads competing for the campus title.</p>
        </div>

        {error && <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">{error}</p>}
        {!error && !teams.length && <p className="rounded-xl border border-dashed border-white/10 p-6 text-sm text-slate-500">Teams will appear here after registration.</p>}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {teams.map((team, index) => (
            <motion.article
              key={team.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_25px_60px_-35px_rgba(2,8,23,0.9)] backdrop-blur"
            >
              <div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-linear-to-br ${team.accent} opacity-15 blur-2xl transition duration-300 group-hover:opacity-30`} />
              <div className="relative flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${team.accent} text-lg font-black text-white shadow-lg`}>
                  {team.name.split(' ').map((word) => word[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{team.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">MLBB · Registered</p>
                </div>
              </div>
              <div className="relative mt-6 border-t border-white/10 pt-4">
                <p className="flex items-center gap-2 text-sm text-slate-300"><FaCrown className="text-cyan-300" aria-hidden="true" /> {team.players?.length || 0} players · Captain: {team.captain_name}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
