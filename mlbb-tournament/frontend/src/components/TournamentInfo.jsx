import { FaCalendarAlt, FaGamepad, FaTrophy, FaUsers } from 'react-icons/fa'
import { HiClock } from 'react-icons/hi'

const tournamentDetails = [
  { label: 'Prize Pool', value: 'RM 3,500', icon: FaTrophy, accent: 'text-cyan-300' },
  { label: 'Next Event', value: 'Campus Clash • Oct 24', icon: FaCalendarAlt, accent: 'text-blue-300' },
  { label: 'Active Teams', value: '24 / 32', icon: FaUsers, accent: 'text-sky-300' },
  { label: 'Format', value: '5v5 Draft Pick', icon: FaGamepad, accent: 'text-emerald-300' },
  { label: 'Registration', value: 'Ends Oct 18', icon: HiClock, accent: 'text-yellow-300' },
]

const leaderboard = [
  { rank: 1, team: 'Apex Reign', points: '980' },
  { rank: 2, team: 'Nova Forge', points: '932' },
  { rank: 3, team: 'Titan Pulse', points: '901' },
]

export default function TournamentInfo() {
  return (
    <section id="tournaments" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Tournament Program</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Official Events & Leaderboard</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {tournamentDetails.map(({ label, value, icon: Icon, accent }) => (
            <article key={label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-[0_20px_50px_-30px_rgba(2,8,23,0.8)] backdrop-blur">
              <Icon className={`mb-8 text-2xl ${accent}`} aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
              <p className="mt-2 text-lg font-bold text-white">{value}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-6 shadow-[0_20px_60px_-35px_rgba(56,189,248,0.45)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Upcoming Tournaments</p>
                <h3 className="mt-2 text-xl font-bold text-white">Season calendar</h3>
              </div>
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Live</span>
            </div>
            <div className="mt-6 space-y-3">
              {['Campus Clash','Night Sprint Cup','UTYCC Finals'].map((event, index) => (
                <div key={event} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                  <div>
                    <p className="font-semibold text-white">{event}</p>
                    <p className="text-sm text-slate-400">{index === 0 ? 'Oct 24 · Arena 01' : index === 1 ? 'Nov 08 · Online Qualifiers' : 'Nov 22 · Grand Finals'}</p>
                  </div>
                  <span className="text-sm font-semibold text-cyan-300">{index + 1} slot</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_20px_60px_-35px_rgba(2,8,23,0.8)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Leaderboard</p>
                <h3 className="mt-2 text-xl font-bold text-white">Season standings</h3>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-white">#{entry.rank} {entry.team}</p>
                  </div>
                  <span className="text-sm font-semibold text-cyan-300">{entry.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
