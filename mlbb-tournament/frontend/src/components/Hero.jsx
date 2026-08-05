import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

export default function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[calc(100svh-73px)] items-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_25%,rgba(37,99,235,0.32),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(234,88,12,0.28),transparent_30%),linear-gradient(135deg,#020617_20%,#0f172a_52%,#020617_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(96,165,250,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,.16)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="absolute -right-24 top-1/2 -z-10 h-80 w-80 -translate-y-1/2 rounded-full border border-amber-300/20 sm:h-[32rem] sm:w-[32rem]" />
      <div className="absolute -right-10 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full border border-blue-400/20 sm:h-[25rem] sm:w-[25rem]" />

      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.16, delayChildren: 0.15 }}
          className="max-w-4xl"
        >
          <motion.div variants={reveal} transition={{ duration: 0.6 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
            <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_12px_#fcd34d]" />
            Season 2026 · Open Registration
          </motion.div>

          <motion.h1 variants={reveal} transition={{ duration: 0.7 }} className="text-5xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
            Mobile Legends
            <span className="block bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">Championship</span>
          </motion.h1>

          <motion.p variants={reveal} transition={{ duration: 0.65 }} className="mt-7 max-w-xl text-lg font-medium text-slate-300 sm:text-xl">
            Battle. Compete. Become Champion.
          </motion.p>

          <motion.div variants={reveal} transition={{ duration: 0.65 }} className="mt-10">
            <a href="#register" className="group inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-amber-300 to-orange-500 px-6 py-3.5 text-sm font-black uppercase tracking-[0.15em] text-slate-950 shadow-[0_12px_35px_-10px_rgba(245,158,11,0.65)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_-10px_rgba(245,158,11,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
              Register Now
              <HiArrowRight className="text-lg transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
