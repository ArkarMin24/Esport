import { FaInstagram, FaYoutube, FaDiscord } from "react-icons/fa";

const socials = [
  { label: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
  { label: "YouTube", icon: FaYoutube, href: "https://youtube.com" },
  { label: "Discord", icon: FaDiscord, href: "https://discord.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/80 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-4xl border border-slate-700/80 bg-slate-900/60 p-6 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.8)] backdrop-blur md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-500/10 text-sm font-black tracking-[0.12em] text-cyan-300">
            ML
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              UTYCC
            </p>
            <p className="text-base font-semibold text-slate-100">
              MLBB Campus Clash
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {socials.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-300"
            >
              <Icon aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
