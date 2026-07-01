import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects, type Project } from '../../data/content';
import SectionHeader from '../SectionHeader';
import Reveal from '../Reveal';
import Terminal, { ENVSAFE_SCRIPT, SECHEADERS_SCRIPT, type Line } from '../Terminal';
import Magnetic from '../Magnetic';

const TERMINAL_SCRIPTS: Record<string, Line[]> = {
  envsafe: ENVSAFE_SCRIPT,
  secheaders: SECHEADERS_SCRIPT,
};

export default function Projects() {
  const flagships = projects.filter((p) => p.flagship);
  const rest = projects.filter((p) => !p.flagship);

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeader index="02 / WORK" title="Things I've built" note="5 SELECTED" />

      {/* Flagships — published to PyPI */}
      <div className="space-y-10">
        {flagships.map((p) => (
          <Flagship key={p.id} project={p} />
        ))}
      </div>

      {/* Rest */}
      <div className="mt-20 border-t border-line-strong">
        {rest.map((p, i) => (
          <ProjectRow key={p.id} project={p} num={i} />
        ))}
      </div>
    </section>
  );
}

function Flagship({ project }: { project: Project }) {
  return (
    <Reveal>
      <div className="corner-ticks relative grid gap-8 border border-line-strong p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
        <span className="absolute -top-3 left-8 flex items-center gap-2 bg-base px-3">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          <span className="dim-label text-accent">FLAGSHIP</span>
        </span>

        {/* Left: info */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-faint">{project.index}</span>
            <span className="h-px w-6 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-accent">
              live on pypi
            </span>
          </div>
          <h3 className="mt-4 font-serif text-5xl tracking-tightest text-fg sm:text-6xl">
            {project.name}
          </h3>
          <p className="mt-3 font-mono text-sm text-accent">{project.tagline}</p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-dim">{project.description}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="border border-line px-2.5 py-1 font-mono text-[11px] text-dim">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                data-cursor-label="open"
                className="group flex items-center gap-2 border border-accent bg-accent px-5 py-3 font-mono text-xs uppercase tracking-widest text-ink transition-opacity hover:opacity-90"
              >
                View on GitHub
                <span className="transition-transform group-hover:translate-x-0.5">↗</span>
              </a>
            </Magnetic>
            {project.install && <CopyInstall command={project.install} />}
          </div>
        </div>

        {/* Right: terminal */}
        <div className="flex items-center">
          <Terminal script={TERMINAL_SCRIPTS[project.id]} title={project.name} />
        </div>
      </div>
    </Reveal>
  );
}

function CopyInstall({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — no-op */
    }
  };
  return (
    <button
      onClick={copy}
      data-cursor="link"
      className="group flex items-center gap-3 border border-line-strong px-5 py-3 font-mono text-xs text-dim transition-colors hover:border-accent hover:text-fg"
    >
      <span className="text-accent">$</span>
      <span>{command}</span>
      <span className="text-faint group-hover:text-accent">{copied ? '✓ copied' : '⧉'}</span>
    </button>
  );
}

function ProjectRow({ project, num }: { project: Project; num: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={num * 0.05}>
      <div
        className="group border-b border-line-strong"
        data-cursor="project"
        data-cursor-label={open ? 'close' : 'open'}
      >
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center gap-5 py-7 text-left sm:gap-8 sm:py-9"
          aria-expanded={open}
        >
          <span className="font-mono text-xs text-faint">{project.index}</span>
          <div className="flex-1">
            <h3 className="font-serif text-3xl tracking-tightest text-fg transition-colors group-hover:text-accent sm:text-4xl">
              {project.name}
            </h3>
            <p className="mt-1 font-mono text-xs text-dim sm:text-sm">{project.tagline}</p>
          </div>
          {/* metric peek (desktop) */}
          <div className="hidden flex-shrink-0 gap-6 lg:flex">
            {project.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="text-right">
                <div className="font-mono text-[10px] uppercase tracking-wide text-faint">
                  {m.label}
                </div>
                <div className="font-mono text-xs text-dim">{m.value}</div>
              </div>
            ))}
          </div>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-line-strong text-lg text-dim transition-colors group-hover:border-accent group-hover:text-accent"
          >
            +
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid gap-8 pb-9 pl-0 sm:pl-12 lg:grid-cols-[1.3fr_1fr]">
                <div>
                  <p className="max-w-lg text-base leading-relaxed text-dim">{project.description}</p>
                  <p className="mt-4 font-serif text-lg italic text-fg">{project.highlight}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="border border-line px-2.5 py-1 font-mono text-[11px] text-dim"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Magnetic>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      data-cursor-label="open"
                      className="mt-7 inline-flex items-center gap-2 border border-line-strong px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-dim transition-colors hover:border-accent hover:text-accent"
                    >
                      View on GitHub <span>↗</span>
                    </a>
                  </Magnetic>
                </div>
                {/* metrics spec card */}
                <div className="grid h-fit grid-cols-1 gap-px border border-line bg-[var(--line)]">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex items-baseline justify-between bg-base p-4">
                      <span className="font-mono text-[10px] uppercase tracking-wide text-faint">
                        {m.label}
                      </span>
                      <span className="font-mono text-sm text-accent">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
