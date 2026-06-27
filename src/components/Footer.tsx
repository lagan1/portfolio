import { profile } from '../data/content';
import { scrollToSection } from '../hooks/useLenis';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line-strong">
      <div className="blueprint-grid-fine pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            data-cursor="link"
            className="flex items-center gap-3 text-left"
          >
            <span className="flex h-9 w-9 items-center justify-center border border-line-strong font-mono text-xs font-bold text-accent">
              PC
            </span>
            <div>
              <div className="font-serif text-lg text-fg">{profile.name}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-faint">
                back to top ↑
              </div>
            </div>
          </button>

          <div className="flex flex-wrap gap-6">
            {[
              { label: 'GitHub', href: profile.github },
              { label: 'LinkedIn', href: profile.linkedin },
              { label: 'Email', href: `mailto:${profile.email}` },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                data-cursor="link"
                className="font-mono text-xs uppercase tracking-widest text-dim transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-widest text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {profile.name} — all rights reserved</span>
          <span className="flex items-center gap-1.5">
            Built with <span className="text-accent">♥</span> in Berlin · React · TS · Framer Motion
          </span>
          <span>{profile.locationCoords}</span>
        </div>
      </div>
    </footer>
  );
}
