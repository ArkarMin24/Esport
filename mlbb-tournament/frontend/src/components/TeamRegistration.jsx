import { useState } from 'react'
import { HiCheckCircle } from 'react-icons/hi'
import { getApiErrorMessage, registerTeam } from '../services/api'

const initialValues = {
  teamName: '', captainName: '', player1: '', player2: '', player3: '', player4: '', player5: '', email: '', phone: '',
}

const fields = [
  ['teamName', 'Team name'], ['captainName', 'Captain name'], ['player1', 'Player 1'], ['player2', 'Player 2'], ['player3', 'Player 3'], ['player4', 'Player 4'], ['player5', 'Player 5'],
]

export default function TeamRegistration() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function validate() {
    const nextErrors = {}
    Object.entries(values).forEach(([name, value]) => {
      if (!value.trim()) nextErrors[name] = 'This field is required.'
    })
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = 'Enter a valid email address.'
    if (values.phone && !/^[+\d][\d\s()-]{6,}$/.test(values.phone)) nextErrors.phone = 'Enter a valid phone number.'
    return nextErrors
  }

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setSubmitted(false)
    setSubmitError('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setIsSubmitting(true)
    setSubmitError('')
    try {
      await registerTeam({
        tournament: Number(import.meta.env.VITE_TOURNAMENT_ID || 1),
        name: values.teamName,
        captain_name: values.captainName,
        email: values.email,
        phone_number: values.phone,
        players: [values.player1, values.player2, values.player3, values.player4, values.player5].map((inGameName, index) => ({ in_game_name: inGameName, is_captain: index === 0 })),
      })
      setSubmitted(true)
      setValues(initialValues)
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, 'Unable to register your team. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="register" className="relative overflow-hidden bg-slate-900/40 px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_35%,rgba(245,158,11,.14),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(37,99,235,.14),transparent_30%)]" />
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">Secure Your Spot</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">Team Registration</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400">Register your full roster to enter the Mobile Legends Championship.</p>
        </div>

        {submitted && (
          <div role="status" className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-200">
            <HiCheckCircle className="shrink-0 text-2xl text-emerald-300" aria-hidden="true" />
            Registration received! We’ll contact the team captain with the next steps.
          </div>
        )}
        {submitError && <div role="alert" className="mb-6 rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">{submitError}</div>}

        <form noValidate onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map(([name, label]) => (
              <label key={name} className={name.startsWith('player') ? '' : 'sm:col-span-1'}>
                <span className="mb-2 block text-sm font-semibold text-slate-200">{label}</span>
                <input name={name} value={values[name]} onChange={handleChange} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} className={`w-full rounded-lg border bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-2 focus:ring-amber-300/60 ${errors[name] ? 'border-rose-400' : 'border-slate-700 focus:border-amber-300'}`} />
                {errors[name] && <span id={`${name}-error`} className="mt-1.5 block text-xs text-rose-300">{errors[name]}</span>}
              </label>
            ))}
            <label>
              <span className="mb-2 block text-sm font-semibold text-slate-200">Email</span>
              <input type="email" name="email" value={values.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} className={`w-full rounded-lg border bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-2 focus:ring-amber-300/60 ${errors.email ? 'border-rose-400' : 'border-slate-700 focus:border-amber-300'}`} />
              {errors.email && <span id="email-error" className="mt-1.5 block text-xs text-rose-300">{errors.email}</span>}
            </label>
            <label>
              <span className="mb-2 block text-sm font-semibold text-slate-200">Phone number</span>
              <input type="tel" name="phone" value={values.phone} onChange={handleChange} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} className={`w-full rounded-lg border bg-slate-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-2 focus:ring-amber-300/60 ${errors.phone ? 'border-rose-400' : 'border-slate-700 focus:border-amber-300'}`} />
              {errors.phone && <span id="phone-error" className="mt-1.5 block text-xs text-rose-300">{errors.phone}</span>}
            </label>
          </div>
          <button type="submit" disabled={isSubmitting} className="mt-7 w-full rounded-lg bg-gradient-to-r from-amber-300 to-orange-500 px-6 py-3.5 text-sm font-black uppercase tracking-[0.15em] text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">{isSubmitting ? 'Registering…' : 'Register Team'}</button>
        </form>
      </div>
    </section>
  )
}
