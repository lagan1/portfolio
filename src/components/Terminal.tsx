import { useEffect, useRef, useState } from 'react';

export interface Line {
  text: string;
  type: 'prompt' | 'out' | 'ok' | 'warn' | 'accent';
  delay?: number;
}

export const ENVSAFE_SCRIPT: Line[] = [
  { text: '$ pip install envsafe', type: 'prompt' },
  { text: 'Collecting envsafe', type: 'out', delay: 300 },
  { text: 'Successfully installed envsafe-1.2.0', type: 'ok', delay: 250 },
  { text: '$ envsafe scan .', type: 'prompt', delay: 500 },
  { text: 'envsafe :: scanning working tree…', type: 'out', delay: 250 },
  { text: '✓ .gitignore           coverage ok', type: 'ok', delay: 200 },
  { text: '! docker-compose.yml   exposed POSTGRES_PASSWORD', type: 'warn', delay: 200 },
  { text: '! config/prod.env      hardcoded API_KEY (line 12)', type: 'warn', delay: 200 },
  { text: '✓ credentials          no weak secrets', type: 'ok', delay: 200 },
  { text: '', type: 'out', delay: 150 },
  { text: '2 issues found · 2 files flagged · exit 1', type: 'accent', delay: 200 },
  { text: '→ wired into pre-commit + CI. nothing leaks.', type: 'out', delay: 300 },
];

export const SECHEADERS_SCRIPT: Line[] = [
  { text: '$ pip install secheaders', type: 'prompt' },
  { text: 'Collecting secheaders', type: 'out', delay: 300 },
  { text: 'Successfully installed secheaders-1.0.0', type: 'ok', delay: 250 },
  { text: '$ secheaders scan https://example.com', type: 'prompt', delay: 500 },
  { text: 'secheaders :: auditing response headers…', type: 'out', delay: 250 },
  { text: '✓ Strict-Transport-Security   present', type: 'ok', delay: 200 },
  { text: '! Content-Security-Policy     missing', type: 'warn', delay: 200 },
  { text: '! X-Frame-Options             missing (clickjacking)', type: 'warn', delay: 200 },
  { text: '✓ X-Content-Type-Options      nosniff', type: 'ok', delay: 200 },
  { text: '', type: 'out', delay: 150 },
  { text: 'score: 68/100 · grade B · exit 1', type: 'accent', delay: 200 },
  { text: '→ wire --fail-under into CI. ship secure headers.', type: 'out', delay: 300 },
];

const COLORS: Record<Line['type'], string> = {
  prompt: 'var(--fg)',
  out: 'var(--fg-dim)',
  ok: '#4ade80',
  warn: '#fbbf24',
  accent: 'var(--accent)',
};

interface TerminalProps {
  script?: Line[];
  title?: string;
}

/** Self-typing terminal that demos a CLI. Starts when scrolled into view. */
export default function Terminal({ script = ENVSAFE_SCRIPT, title = 'envsafe' }: TerminalProps) {
  const SCRIPT = script;
  const ref = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState('');
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const start = () => {
      if (started.current) return;
      started.current = true;

      if (reduce) {
        setVisibleLines(SCRIPT);
        setDone(true);
        return;
      }

      let li = 0;
      const timers: number[] = [];

      const runLine = () => {
        if (li >= SCRIPT.length) {
          setDone(true);
          return;
        }
        const line = SCRIPT[li];
        const startDelay = line.delay ?? 0;

        timers.push(
          window.setTimeout(() => {
            if (line.type === 'prompt') {
              // type char by char
              let ci = 0;
              const typeChar = () => {
                ci++;
                setTyping(line.text.slice(0, ci));
                if (ci < line.text.length) {
                  timers.push(window.setTimeout(typeChar, 38));
                } else {
                  timers.push(
                    window.setTimeout(() => {
                      setVisibleLines((prev) => [...prev, line]);
                      setTyping('');
                      li++;
                      runLine();
                    }, 250)
                  );
                }
              };
              typeChar();
            } else {
              setVisibleLines((prev) => [...prev, line]);
              li++;
              runLine();
            }
          }, startDelay)
        );
      };

      runLine();
      return () => timers.forEach(clearTimeout);
    };

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          start();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const replay = () => {
    started.current = false;
    setVisibleLines([]);
    setTyping('');
    setDone(false);
    requestAnimationFrame(forceStart);
  };

  // Manual restart helper that bypasses the observer.
  const forceStart = () => {
    if (started.current) return;
    started.current = true;
    let li = 0;
    const timers: number[] = [];
    const runLine = () => {
      if (li >= SCRIPT.length) return setDone(true);
      const line = SCRIPT[li];
      timers.push(
        window.setTimeout(() => {
          if (line.type === 'prompt') {
            let ci = 0;
            const typeChar = () => {
              ci++;
              setTyping(line.text.slice(0, ci));
              if (ci < line.text.length) timers.push(window.setTimeout(typeChar, 38));
              else
                timers.push(
                  window.setTimeout(() => {
                    setVisibleLines((p) => [...p, line]);
                    setTyping('');
                    li++;
                    runLine();
                  }, 250)
                );
            };
            typeChar();
          } else {
            setVisibleLines((p) => [...p, line]);
            li++;
            runLine();
          }
        }, line.delay ?? 0)
      );
    };
    runLine();
  };

  return (
    <div
      ref={ref}
      className="corner-ticks relative w-full overflow-hidden border border-line-strong bg-[#070a08] font-mono text-xs sm:text-sm"
    >
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-line bg-[#0c110d] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full border border-line-strong" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#5b6770]">
          zsh — {title} — 80×24
        </span>
        <button
          onClick={replay}
          className="font-mono text-[10px] uppercase tracking-widest text-[#5b6770] transition-colors hover:text-accent"
          aria-label="Replay demo"
        >
          ↻ replay
        </button>
      </div>

      {/* body */}
      <div className="min-h-[20rem] space-y-1 p-4 sm:min-h-[22rem] sm:p-6">
        {visibleLines.map((line, i) => (
          <div key={i} style={{ color: COLORS[line.type] }} className="whitespace-pre-wrap break-words">
            {line.text || ' '}
          </div>
        ))}
        {typing && (
          <div style={{ color: 'var(--fg)' }} className="whitespace-pre-wrap break-words">
            {typing}
            <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 animate-blink bg-accent" />
          </div>
        )}
        {done && (
          <div className="flex items-center gap-1.5 pt-2 text-[var(--fg)]">
            <span className="text-accent">$</span>
            <span className="inline-block h-3.5 w-2 animate-blink bg-accent" />
          </div>
        )}
      </div>
    </div>
  );
}
