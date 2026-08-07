import { FaCalendarAlt } from 'react-icons/fa'
import { HiClock } from 'react-icons/hi'

const matches = [
  { time: '6:30 PM', teams: 'Apex Reign vs Nova Forge', status: 'Live', venue: 'Arena 01' },
  { time: '8:00 PM', teams: 'Titan Pulse vs Phoenix Arc', status: 'Upcoming', venue: 'Broadcast Studio' },
  { time: '9:15 PM', teams: 'Shadow Wolves vs Blue Rush', status: 'Queued', venue: 'Arena 02' },
]

export default function MatchSchedule() {
  return (
    <section id="schedule" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Match Schedule</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Daily Fixtures</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {matches.map((match) => (
            <article key={match.teams} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_25px_60px_-35px_rgba(2,8,23,0.9)] backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">{match.status}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Bo3</span>
              </div>
              <p className="mt-6 text-xl font-bold text-white">{match.teams}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-sm text-slate-400">
                <span className="flex items-center gap-2"><FaCalendarAlt className="text-cyan-300" aria-hidden="true" />{match.time}</span>
                <span className="flex items-center gap-2"><HiClock className="text-cyan-300" aria-hidden="true" />{match.venue}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
