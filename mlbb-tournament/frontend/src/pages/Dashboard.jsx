import { useCallback, useEffect, useState } from 'react'
import { FaChartLine, FaGamepad, FaSignOutAlt, FaUsers } from 'react-icons/fa'
import { dashboardLogin, dashboardLogout, fetchDashboardOverview, getApiErrorMessage, updateDashboardMatch } from '../services/api'
import AdminTools from './AdminTools'

const initialLogin = { username: '', password: '' }

function Login({ onLogin }) {
  const [values, setValues] = useState(initialLogin)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const account = await dashboardLogin(values)
      if (!account.is_staff) {
        window.location.href = '/account'
        return
      }
      onLogin()
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Unable to sign in to the organizer dashboard.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/30">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">MLBB Campus Clash</p>
        <h1 className="mt-3 text-3xl font-black text-white">Organizer dashboard</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">Sign in with a Django staff account to manage teams, fixtures, and live match status.</p>
        {error && <div role="alert" className="mt-6 rounded-xl border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">{error}</div>}
        <form onSubmit={submit} className="mt-7 space-y-4">
          {['username', 'password'].map((name) => (
            <label key={name} className="block">
              <span className="mb-2 block text-sm font-semibold capitalize text-slate-200">{name}</span>
              <input required type={name === 'password' ? 'password' : 'text'} value={values[name]} onChange={(event) => setValues({ ...values, [name]: event.target.value })} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30" />
            </label>
          ))}
          <button disabled={loading} className="w-full rounded-lg bg-cyan-400 px-4 py-3 text-sm font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60">{loading ? 'Signing in...' : 'Sign in'}</button>
        </form>
        <a href="/" className="mt-6 block text-center text-sm text-slate-400 transition hover:text-cyan-300">Back to public tournament site</a>
      </div>
    </main>
  )
}

function DashboardHome({ onLogout }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [savingMatch, setSavingMatch] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  const load = useCallback(async () => {
    try {
      setError('')
      setData(await fetchDashboardOverview())
    } catch (requestError) {
      if (requestError.response?.status === 401 || requestError.response?.status === 403) {
        onLogout()
        return
      }
      setError(getApiErrorMessage(requestError, 'Unable to load the dashboard.'))
    }
  }, [onLogout])

  useEffect(() => { load() }, [load])

  async function saveMatch(match, form) {
    setSavingMatch(match.id)
    try {
      await updateDashboardMatch(match.id, { status: form.status, team_one_score: Number(form.teamOneScore), team_two_score: Number(form.teamTwoScore) })
      await load()
    } catch (requestError) { setError(getApiErrorMessage(requestError, 'Match update failed.')) }
    finally { setSavingMatch(null) }
  }

  if (!data) return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-cyan-200">Loading dashboard...</div>
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-8 lg:px-12">
      <header className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div><p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">MLBB Campus Clash</p><h1 className="mt-2 text-3xl font-black">Control center</h1></div>
        <div className="flex items-center gap-4"><span className="text-sm text-slate-400">Signed in as <strong className="text-white">{data?.user}</strong></span><button onClick={async () => { await dashboardLogout(); onLogout() }} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-300/40 hover:text-cyan-200"><FaSignOutAlt /> Sign out</button></div>
      </header>
      <nav className="mx-auto mt-6 flex max-w-7xl flex-wrap gap-2" aria-label="Admin sections">
        {[['overview', 'Overview'], ['tournaments', 'Tournaments'], ['teams', 'Teams & rosters'], ['matches', 'Schedule & matches']].map(([tab, label]) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`rounded-lg px-4 py-2 text-sm font-bold transition ${activeTab === tab ? 'bg-cyan-400 text-slate-950' : 'border border-white/10 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-200'}`}>{label}</button>)}
      </nav>
      {error && <div role="alert" className="mx-auto mt-6 max-w-7xl rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">{error}</div>}
      {activeTab !== 'overview' && <AdminTools activeTab={activeTab} />}
      {activeTab === 'overview' && <>
      <section className="mx-auto mt-8 grid max-w-7xl gap-4 sm:grid-cols-3">
        {[['Registered teams', data?.teams, FaUsers], ['Live matches', data?.live_matches, FaGamepad], ['Team capacity', `${data?.tournament?.team_count || 0} / ${data?.tournament?.max_teams || 0}`, FaChartLine]].map(([label, value, Icon]) => <article key={label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"><Icon className="text-cyan-300" /><p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p></article>)}
      </section>
      <section className="mx-auto mt-8 max-w-7xl rounded-2xl border border-white/10 bg-slate-900/70 p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Match operations</p><h2 className="mt-2 text-2xl font-black">Live schedule</h2></div><a href="/" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">View public site</a></div>
        <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[820px] text-left text-sm"><thead className="border-b border-white/10 text-xs uppercase tracking-[0.16em] text-slate-500"><tr><th className="px-3 py-3">Match</th><th className="px-3 py-3">Stage</th><th className="px-3 py-3">Score</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Action</th></tr></thead><tbody>{data?.matches?.map((match) => <MatchRow key={match.id} match={match} saving={savingMatch === match.id} onSave={saveMatch} />)}</tbody></table></div>
      </section>
      </>}
    </main>
  )
}

function MatchRow({ match, saving, onSave }) {
  const [form, setForm] = useState({ status: match.status, teamOneScore: match.team_one_score, teamTwoScore: match.team_two_score })
  return <tr className="border-b border-white/5"><td className="px-3 py-4 font-semibold">{match.team_one_name || 'TBD'} <span className="text-slate-500">vs</span> {match.team_two_name || 'TBD'}</td><td className="px-3 py-4 text-slate-400">{match.stage}</td><td className="px-3 py-4"><div className="flex items-center gap-2"><input type="number" min="0" value={form.teamOneScore} onChange={(event) => setForm({ ...form, teamOneScore: event.target.value })} className="w-14 rounded-md border border-slate-700 bg-slate-950 px-2 py-2 text-center font-black text-cyan-200" aria-label="Team one score" /><span className="text-slate-500">-</span><input type="number" min="0" value={form.teamTwoScore} onChange={(event) => setForm({ ...form, teamTwoScore: event.target.value })} className="w-14 rounded-md border border-slate-700 bg-slate-950 px-2 py-2 text-center font-black text-cyan-200" aria-label="Team two score" /></div></td><td className="px-3 py-4"><select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="rounded-md border border-slate-700 bg-slate-950 px-2 py-2 text-xs text-white"><option value="upcoming">Upcoming</option><option value="live">Live</option><option value="finished">Finished</option></select></td><td className="px-3 py-4"><button type="button" onClick={() => onSave(match, form)} disabled={saving} className="rounded-md bg-cyan-400 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-slate-950 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button></td></tr>
}

export default function Dashboard() {
  const [loggedIn, setLoggedIn] = useState(null)
  useEffect(() => { fetchDashboardOverview().then(() => setLoggedIn(true)).catch(() => setLoggedIn(false)) }, [])
  if (loggedIn === null) return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-cyan-200">Checking session...</div>
  return loggedIn ? <DashboardHome onLogout={() => setLoggedIn(false)} /> : <Login onLogin={() => setLoggedIn(true)} />
}