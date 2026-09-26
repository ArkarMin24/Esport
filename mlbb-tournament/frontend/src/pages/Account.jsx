import { useEffect, useState } from 'react'
import { dashboardLogout, fetchAccountOverview, getApiErrorMessage } from '../services/api'

export default function Account() {
  const [account, setAccount] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAccountOverview().then(setAccount).catch((requestError) => setError(getApiErrorMessage(requestError, 'Please sign in to view your account.')))
  }, [])

  async function signOut() {
    await dashboardLogout()
    window.location.href = '/login'
  }

  if (error) return <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-center text-rose-200"><div><p>{error}</p><a href="/login" className="mt-4 inline-block text-cyan-300">Go to sign in</a></div></main>
  if (!account) return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-cyan-200">Loading account...</div>

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8">
      <header className="mx-auto flex max-w-5xl items-center justify-between border-b border-white/10 pb-6">
        <div><p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">MLBB Campus Clash</p><h1 className="mt-2 text-3xl font-black">Player account</h1></div>
        <button onClick={signOut} className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-300/40 hover:text-cyan-200">Sign out</button>
      </header>
      <section className="mx-auto mt-8 max-w-5xl rounded-2xl border border-white/10 bg-slate-900/70 p-6">
        <p className="text-sm text-slate-400">Signed in as</p>
        <h2 className="mt-2 text-2xl font-bold">{account.username}</h2>
        <p className="mt-4 text-slate-300">Use the public tournament site to register your MLBB team, view fixtures, follow live matches, and track the bracket.</p>
        <a href="/#register" className="mt-6 inline-block rounded-lg bg-cyan-400 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-slate-950">Register a team</a>
      </section>
    </main>
  )
}