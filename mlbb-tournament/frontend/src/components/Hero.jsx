import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-light relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="hero-photo absolute inset-0 -z-20" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(15,23,42,0.84)_0%,rgba(30,41,59,0.72)_38%,rgba(30,41,59,0.28)_76%)]" />
      <div className="absolute right-12 top-12 hidden h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl lg:block" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.16, delayChildren: 0.15 }}
          className="max-w-3xl"
        >
          <motion.div
            variants={reveal}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-slate-950/25 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.26em] text-cyan-200 backdrop-blur-sm"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" />
            University MLBB championship · Season 04
          </motion.div>

          <motion.h1
            variants={reveal}
            transition={{ duration: 0.7 }}
            className="text-5xl font-black leading-[0.92] tracking-tight text-white drop-shadow-[0_8px_24px_rgba(15,23,42,0.5)] sm:text-7xl lg:text-8xl"
          >
            MLBB
            <span className="mt-2 block text-cyan-300">Campus Clash</span>
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.65 }}
            className="mt-6 max-w-xl text-lg font-medium text-slate-200 sm:text-xl"
          >
            Campus teams meet for a season of Mobile Legends: Bang Bang. Check
            the fixtures, follow the scores, and bring your five to the arena.
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.65 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#register"
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-3.5 text-sm font-black uppercase tracking-[0.15em] text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.28)] transition hover:-translate-y-1 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Register your squad
              <HiArrowRight
                className="text-lg transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#live"
              className="rounded-xl border border-slate-300/25 bg-slate-950/20 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-200 backdrop-blur-sm"
            >
              View live match
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="hidden items-center justify-center lg:flex"
        >
          <div className="relative w-full max-w-md rounded-[2rem] border border-cyan-400/10 bg-slate-950/30 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.18)] backdrop-blur-md">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-slate-400">
                  Live bracket
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  Season 04
                </h2>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
                live
              </span>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/8 bg-slate-900/55 p-4">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Championship Finals</span>
                  <span className="text-cyan-300">14:00</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-lg font-bold text-white">
                  <span>UTYCC A</span>
                  <span className="text-slate-500">vs</span>
                  <span>MSU One</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-cyan-400/10 bg-cyan-500/5 p-3 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    Teams
                  </p>
                  <p className="mt-2 text-2xl font-black text-cyan-300">16</p>
                </div>
                <div className="rounded-2xl border border-cyan-400/10 bg-cyan-500/5 p-3 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    Rounds
                  </p>
                  <p className="mt-2 text-2xl font-black text-cyan-300">8</p>
                </div>
                <div className="rounded-2xl border border-cyan-400/10 bg-cyan-500/5 p-3 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                    Prize
                  </p>
                  <p className="mt-2 text-2xl font-black text-cyan-300">$2k</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
