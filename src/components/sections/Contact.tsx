import { profile } from '../../data/content';
import SectionHeader from '../SectionHeader';
import Reveal from '../Reveal';

const CHANNELS = [
  { label: 'email', value: profile.email, href: `mailto:${profile.email}`, code: 'SMTP' },
  { label: 'linkedin', value: 'in/pabloncf', href: profile.linkedin, code: 'PROF' },
  { label: 'github', value: `@${profile.githubHandle}`, href: profile.github, code: 'REPO' },
];

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeader cmd="./say-hello.sh --now" title="let's talk" note="STATUS: OPEN" />

      <div className="grid gap-12 font-mono lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* big CTA */}
        <Reveal>
          <p className="font-sans text-2xl leading-snug text-fg sm:text-3xl">
            Looking for a backend or security engineer who sweats the details?
          </p>
          <p className="mt-6 max-w-md font-sans text-base leading-relaxed text-dim">
            I'm in Berlin and open to roles across Europe and remote-global teams. Drop me a line —
            I read everything and reply fast.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="group relative mt-10 inline-flex items-center gap-4 overflow-hidden border border-accent px-8 py-5"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            <span className="relative text-lg font-bold text-accent transition-colors duration-300 group-hover:text-ink sm:text-xl">
              $ mail pablo
            </span>
            <span className="relative text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink">
              ↵
            </span>
          </a>
        </Reveal>

        {/* channels */}
        <Reveal delay={0.1}>
          <div className="grid gap-px border border-line-strong bg-[var(--line)]">
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-base p-6 transition-colors hover:bg-soft sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] tracking-widest text-faint">{c.code}</span>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-dim">{c.label}</div>
                    <div className="text-lg text-fg transition-colors group-hover:text-accent">
                      {c.value}
                    </div>
                  </div>
                </div>
                <span className="text-lg text-faint transition-all group-hover:translate-x-1 group-hover:text-accent">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
