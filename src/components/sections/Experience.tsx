import { experience } from '../../data/content';
import SectionHeader from '../SectionHeader';
import Reveal from '../Reveal';

/** Deterministic fake commit hash from a string. */
function fakeHash(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeader cmd="git log --career --reverse=false" title="the career so far" note="2020 → NOW" />

      <div className="relative font-mono">
        {/* git graph rail */}
        <div className="absolute left-[3px] top-2 hidden h-full w-px bg-line-strong sm:block" />

        <div className="space-y-2">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.06}>
              <div className="group relative py-6 sm:pl-10">
                {/* graph node */}
                <span className="absolute -left-[2px] top-8 hidden h-3 w-3 rounded-full border border-accent bg-base transition-colors group-hover:bg-accent sm:block" />

                {/* commit line */}
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs sm:text-sm">
                  <span className="text-warn">{fakeHash(job.company + job.role)}</span>
                  {i === 0 && (
                    <span className="text-xs">
                      <span className="text-faint">(</span>
                      <span className="text-accent">HEAD → now</span>
                      <span className="text-faint">)</span>
                    </span>
                  )}
                  <span className="text-faint">{job.period}</span>
                  <span className="text-faint">· {job.location}</span>
                </div>

                <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-2xl font-bold tracking-tightest text-fg transition-colors group-hover:text-accent sm:text-3xl">
                    {job.company}
                  </h3>
                  <span className="text-sm text-dim">{job.role}</span>
                </div>

                {/* diff-style points */}
                <ul className="mt-4 space-y-1.5">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm leading-relaxed">
                      <span className="flex-shrink-0 select-none text-accent">+</span>
                      <span className="font-sans text-dim">{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-[11px]">
                  {job.tags.map((t) => (
                    <span key={t} className="text-dim">
                      <span className="text-faint">[</span>
                      {t}
                      <span className="text-faint">]</span>
                    </span>
                  ))}
                </div>

                <div className="rule-dashed absolute bottom-0 left-0 right-0 hidden sm:left-10 sm:block" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
