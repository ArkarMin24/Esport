import { useState } from 'react'
import { dashboardLogin, getApiErrorMessage } from '../services/api'

export default function Login() {
  const [values, setValues] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const account = await dashboardLogin(values)
      window.location.href = account.is_staff ? '/dashboard' : '/account'
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Unable to sign in.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/30">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">MLBB Campus Clash</p>
        <h1 className="mt-3 text-3xl font-black text-white">Sign in</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">Admin accounts open the organizer dashboard. Player accounts open your tournament page.</p>
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
        <a href="/" className="mt-6 block text-center text-sm text-slate-400 transition hover:text-cyan-300">Back to tournament site</a>
      </div>
    </main>
  )
}