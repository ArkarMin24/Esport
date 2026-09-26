import { useEffect, useState } from 'react'
import { fetchMatches, getApiErrorMessage } from '../services/api'

export default function TournamentBracket() {
  const [matches, setMatches] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMatches()
      .then(setMatches)
      .catch((requestError) => setError(getApiErrorMessage(requestError, 'Unable to load bracket.')))
  }, [])

  const stages = [...new Set(matches.map((match) => match.stage))]

  return (
    <section id="bracket" className="overflow-hidden bg-slate-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">Road to glory</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Live bracket</h2>
        </div>
        {error && <p role="alert" className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">{error}</p>}
        {!error && !matches.length && <p className="rounded-xl border border-dashed border-white/10 p-6 text-sm text-slate-500">The bracket will appear when matches are scheduled.</p>}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {stages.map((stage) => (
            <div key={stage} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">{stage}</h3>
              <div className="mt-4 space-y-3">
                {matches.filter((match) => match.stage === stage).map((match) => (
                  <div key={match.id} className="rounded-lg border border-white/10 bg-slate-950/70 p-3 text-sm">
                    <p className="font-semibold text-white">{match.team_one_name || 'TBD'} <span className="text-slate-500">vs</span> {match.team_two_name || 'TBD'}</p>
                    <p className="mt-2 font-black text-cyan-200">{match.team_one_score} - {match.team_two_score} · {match.status}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
