import { education, languages } from '../../data/content';
import SectionHeader from '../SectionHeader';
import Reveal from '../Reveal';

export default function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeader cmd="cat ~/education.yml && locale -a" title="education & languages" note="GISMA · UNIPÊ" />

      <div className="grid gap-12 font-mono lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        {/* education, yaml-flavored */}
        <div className="space-y-px">
          {education.map((ed, i) => (
            <Reveal key={ed.degree} delay={i * 0.08}>
              <div className="group flex flex-col gap-2 border-t border-line-strong py-7 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        ed.status === 'In progress' ? 'animate-pulse bg-accent' : 'bg-[var(--fg-faint)]'
                      }`}
                    />
                    <h3 className="text-xl font-bold tracking-tightest text-fg transition-colors group-hover:text-accent sm:text-2xl">
                      <span className="font-normal text-faint">- degree: </span>
                      {ed.degree}
                    </h3>
                  </div>
                  <p className="mt-2 pl-5 text-sm text-dim">
                    <span className="text-faint">school: </span>
                    {ed.school}
                  </p>
                  <p className="pl-5 text-xs text-faint">location: {ed.location}</p>
                </div>
                <div className="pl-5 text-left sm:pl-0 sm:text-right">
                  <div className="text-sm text-fg">{ed.period}</div>
                  <div className="text-[10px] uppercase tracking-widest text-accent">
                    {ed.status === 'In progress' ? 'status: in_progress' : 'status: done ✓'}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* languages */}
        <Reveal delay={0.1}>
          <div className="corner-ticks border border-line-strong p-6 sm:p-8">
            <span className="dim-label">$ locale -a · 4 installed</span>
            <div className="mt-6 space-y-5">
              {languages.map((lang) => (
                <div key={lang.code} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center border border-line-strong text-[10px] text-accent">
                      {lang.code}
                    </span>
                    <span className="text-base text-fg">{lang.name}</span>
                  </div>
                  <span className="text-xs text-dim">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
