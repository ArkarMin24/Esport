import { FaCalendarAlt } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import { useEffect, useState } from "react";
import { fetchMatches, getApiErrorMessage } from "../services/api";

export default function MatchSchedule() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMatches()
      .then(setMatches)
      .catch((requestError) =>
        setError(getApiErrorMessage(requestError, "Unable to load matches.")),
      );
  }, []);

  return (
    <section id="live" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            Live desk
          </p>
          <h2
            id="schedule"
            className="mt-3 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl"
          >
            Matches and results
          </h2>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200"
          >
            {error}
          </p>
        )}
        {!error && !matches.length && (
          <p className="rounded-xl border border-dashed border-white/10 p-6 text-sm text-slate-500">
            No matches have been scheduled yet.
          </p>
        )}
        <div className="grid gap-5 lg:grid-cols-3">
          {matches.map((match) => (
            <article
              key={match.teams}
              className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_25px_60px_-35px_rgba(2,8,23,0.9)] backdrop-blur"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                  {match.status}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Bo3
                </span>
              </div>
              <p className="mt-6 text-xl font-bold text-white">
                {match.team_one_name || "TBD"} vs {match.team_two_name || "TBD"}
              </p>
              <p className="mt-2 text-3xl font-black tracking-widest text-cyan-200">
                {match.team_one_score} - {match.team_two_score}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt className="text-cyan-300" aria-hidden="true" />
                  {new Date(match.scheduled_at).toLocaleString()}
                </span>
                <span className="flex items-center gap-2">
                  <HiClock className="text-cyan-300" aria-hidden="true" />
                  {match.stage} · Bo{match.best_of}
                </span>
              </div>
              {match.status === "live" && (
                <button
                  type="button"
                  className="mt-5 w-full rounded-lg bg-cyan-400 px-4 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-300"
                >
                  Watch live stream
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
