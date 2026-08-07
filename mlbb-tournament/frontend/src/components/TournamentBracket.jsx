import { FaCrown } from 'react-icons/fa'

const rounds = [
  {
    title: 'Quarter Final',
    matches: [
      ['Skyforge Titans', 'Crimson Vipers'],
      ['Solar Rebellion', 'Void Phantoms'],
      ['Emerald Wolves', 'Nova Legion'],
      ['Iron Sentinels', 'Lunar Knights'],
    ],
  },
  {
    title: 'Semi Final',
    matches: [
      ['Skyforge Titans', 'Solar Rebellion'],
      ['Emerald Wolves', 'TBD'],
    ],
  },
  {
    title: 'Final',
    matches: [['TBD', 'TBD']],
  },
]

function MatchCard({ teams, roundIndex }) {
  return (
    <div className="relative w-52 overflow-hidden rounded-lg border border-white/10 bg-slate-950/80 shadow-lg shadow-black/20">
      {teams.map((team, index) => (
        <div key={team} className={`flex items-center justify-between px-3 py-2.5 text-sm font-semibold ${index ? 'border-t border-white/10' : ''} ${team === 'TBD' ? 'text-slate-500' : 'text-slate-200'}`}>
          <span>{team}</span>
          <span className="text-xs text-slate-500">{roundIndex === 0 && team !== 'TBD' ? '0' : '—'}</span>
        </div>
      ))}
    </div>
  )
}

export default function TournamentBracket() {
  return (
    <section id="bracket" className="overflow-hidden bg-slate-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">Road to Glory</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Tournament Bracket</h2>
        </div>

        <div className="overflow-x-auto pb-5 [scrollbar-color:#475569_transparent]">
          <div className="mx-auto grid min-w-237.5 grid-cols-[1.25fr_1fr_.8fr_.85fr] gap-8 rounded-2xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur sm:p-8">
            {rounds.map((round, roundIndex) => (
              <div key={round.title} className="flex min-h-90 flex-col">
                <h3 className="mb-5 text-center text-xs font-black uppercase tracking-[0.18em] text-amber-300">{round.title}</h3>
                <div className={`flex flex-1 flex-col ${roundIndex === 0 ? 'justify-between' : roundIndex === 1 ? 'justify-around py-10' : 'justify-center'}`}>
                  {round.matches.map((teams, matchIndex) => (
                    <div key={`${round.title}-${matchIndex}`} className="relative flex items-center">
                      <MatchCard teams={teams} roundIndex={roundIndex} />
                      {roundIndex < 2 && <span className="absolute -right-8 h-px w-8 bg-amber-300/30" aria-hidden="true" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex min-h-90 flex-col items-center justify-center border-l border-dashed border-amber-300/25 pl-8">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-amber-300">Champion</p>
              <div className="w-44 rounded-2xl border border-amber-300/40 bg-linear-to-b from-amber-300/20 to-orange-500/10 p-5 text-center shadow-[0_0_40px_-12px_rgba(251,191,36,.5)]">
                <FaCrown className="mx-auto text-3xl text-amber-300" aria-hidden="true" />
                <p className="mt-3 text-lg font-black text-white">TBD</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-amber-200/70">Claim the crown</p>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-2 text-center text-xs text-slate-500 lg:hidden">Swipe horizontally to view the full bracket.</p>
      </div>
    </section>
  )
}
