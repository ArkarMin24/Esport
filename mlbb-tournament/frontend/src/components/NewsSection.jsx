import { FaBullhorn } from 'react-icons/fa'

const newsItems = [
  {
    title: 'UTYCC Spring Invitational opens registration',
    body: 'Campus teams can now register for the first official university esports invitational of the semester.',
  },
  {
    title: 'New training hub for competitive squads',
    body: 'A dedicated practice lab and coaching sessions are now available for all registered esports teams.',
  },
  {
    title: 'Broadcast schedule updated for live matches',
    body: 'Viewers can follow weekly match coverage through the official UTYCC arena channel.',
  },
]

export default function NewsSection() {
  return (
    <section id="news" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">News & Updates</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Latest Arena Announcements</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_25px_60px_-35px_rgba(2,8,23,0.9)] backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 text-white">
                <FaBullhorn aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
