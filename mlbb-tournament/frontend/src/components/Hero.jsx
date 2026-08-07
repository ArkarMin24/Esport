import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import heroImage from '../../one.jpg'

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_25%,rgba(56,189,248,0.24),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(29,78,216,0.28),transparent_30%),linear-gradient(135deg,#07111f_20%,#102848_58%,#07111f_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-35 bg-[linear-gradient(rgba(56,189,248,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.14)_1px,transparent_1px)] bg-size-[44px_44px] mask-[linear-gradient(to_bottom,black,transparent)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.16, delayChildren: 0.15 }}
          className="max-w-4xl"
        >
          <motion.div variants={reveal} transition={{ duration: 0.6 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" />
            University Competitive Gaming Platform
          </motion.div>

          <motion.h1 variants={reveal} transition={{ duration: 0.7 }} className="text-4xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
            UTYCC
            <span className="mt-2 block bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">eSport Arena</span>
          </motion.h1>

          <motion.p variants={reveal} transition={{ duration: 0.65 }} className="mt-6 max-w-xl text-lg font-medium text-slate-300 sm:text-xl">
            Official university gaming hub for squads, tournaments, and campus esports excellence.
          </motion.p>

          <motion.div variants={reveal} transition={{ duration: 0.65 }} className="mt-8 flex flex-wrap gap-4">
            <a href="#register" className="group inline-flex items-center gap-3 rounded-xl bg-linear-to-r from-cyan-400 to-blue-600 px-6 py-3.5 text-sm font-black uppercase tracking-[0.15em] text-white shadow-[0_12px_30px_-10px_rgba(56,189,248,0.65)] transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
              Join the Arena
              <HiArrowRight className="text-lg transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#tournaments" className="rounded-xl border border-white/15 bg-white/8 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-200">
              View Tournaments
            </a>
          </motion.div>

          <motion.div variants={reveal} transition={{ duration: 0.65 }} className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-slate-900/40 px-3 py-2">Live brackets</span>
            <span className="rounded-full border border-white/10 bg-slate-900/40 px-3 py-2">Campus squads</span>
            <span className="rounded-full border border-white/10 bg-slate-900/40 px-3 py-2">Official events</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[420px] lg:max-w-[480px]"
        >
          <div className="absolute inset-0 -left-4 -top-4 rounded-[2rem] bg-cyan-400/15 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-2xl shadow-blue-950/40">
            <img
              src={heroImage}
              alt="UTYCC esports branding"
              className="relative h-[360px] w-full object-contain bg-transparent sm:h-[420px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
