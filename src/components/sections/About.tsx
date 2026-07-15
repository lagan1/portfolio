import { profile, stats } from '../../data/content';
import SectionHeader from '../SectionHeader';
import Reveal from '../Reveal';
import CountUp from '../CountUp';

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeader cmd="cat ~/about.md" title="who's writing the code" note="PROFILE.MD" />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        {/* Bio */}
        <div>
          <Reveal>
            <p className="font-sans text-xl leading-relaxed text-fg sm:text-2xl">
              {profile.bioShort}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-dim sm:text-lg">
              {profile.bio}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono">
              <span className="dim-label">open_to =</span>
              {profile.openTo.split(' · ').map((role) => (
                <span key={role} className="text-xs text-dim">
                  <span className="text-faint">[</span>
                  <span className="transition-colors hover:text-accent">{role}</span>
                  <span className="text-faint">]</span>
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Photo panel, styled like an image-viewer pane */}
        <Reveal delay={0.15}>
          <div className="corner-ticks relative w-full max-w-sm border border-line-strong">
            <div className="flex items-center justify-between border-b border-line bg-soft px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-faint">
              <span>feh — lagan.jpg</span>
              <span className="text-accent">●rec</span>
            </div>
            <div className="group relative aspect-[4/5] overflow-hidden">
              <img
                src="/lagan.jpg"
                alt="Lagan Parihar"
                width={900}
                height={1600}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center grayscale transition-all duration-700 group-hover:grayscale-0"
              />
              <div
                className="pointer-events-none absolute inset-0 mix-blend-overlay"
                style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(74,222,128,0.14))' }}
              />
              {/* scan sweep */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-sweep bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
            </div>
            <div className="flex items-center justify-between border-t border-line px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-faint">
              <span>subject: {profile.name.toLowerCase()}</span>
              <span>{profile.location}</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Stats as a TUI table */}
      <div className="mt-20 grid grid-cols-2 gap-px border border-line-strong bg-[var(--line)] font-mono lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="group h-full bg-base p-6 transition-colors hover:bg-soft sm:p-8">
              <div className="flex items-baseline gap-1">
                <CountUp
                  value={s.value}
                  className="text-4xl font-bold tracking-tightest text-fg transition-colors group-hover:text-accent sm:text-5xl"
                />
                <span className="text-2xl font-bold text-accent">{s.suffix}</span>
              </div>
              <div className="mt-3 text-xs uppercase tracking-wide text-fg">{s.label}</div>
              <div className="mt-1 text-[10px] text-faint">{s.sub}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
