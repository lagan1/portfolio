import { profile } from '../data/content';
import { scrollToSection } from '../hooks/useLenis';

/** Bottom bar styled like a tmux status line. */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line-strong font-mono">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="group flex items-center gap-2 text-left text-xs"
          >
            <span className="bg-accent px-1.5 py-0.5 font-bold text-ink">0</span>
            <span className="text-dim transition-colors group-hover:text-accent">
              pablo@berlin:~/portfolio
            </span>
            <span className="text-faint">— back to top ↑</span>
          </button>

          <div className="flex flex-wrap gap-6 text-xs">
            {[
              { label: 'github', href: profile.github },
              { label: 'linkedin', href: profile.linkedin },
              { label: 'email', href: `mailto:${profile.email}` },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="tracking-widest text-dim transition-colors hover:text-accent"
              >
                [{l.label}]
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-5 text-[10px] uppercase tracking-widest text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {profile.name} — all rights reserved</span>
          <span>
            built with <span className="text-accent">♥</span> in berlin · react · ts · framer motion
          </span>
          <span>{profile.locationCoords}</span>
        </div>
      </div>
    </footer>
  );
}
