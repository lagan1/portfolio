import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { scrollToSection } from '../hooks/useLenis';

const LINKS = [
  { id: 'about', label: 'about', n: '1' },
  { id: 'projects', label: 'work', n: '2' },
  { id: 'experience', label: 'path', n: '3' },
  { id: 'skills', label: 'stack', n: '4' },
  { id: 'education', label: 'record', n: '5' },
  { id: 'contact', label: 'contact', n: '6' },
];

/** tmux-style status bar: session name left, window list center, theme right. */
export default function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled ? 'border-b backdrop-blur-sm' : 'border-b border-transparent'
        }`}
        style={{
          borderColor: scrolled ? 'var(--line)' : 'transparent',
          backgroundColor: scrolled ? 'color-mix(in srgb, var(--bg) 82%, transparent)' : 'transparent',
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 font-mono text-xs sm:px-8">
          {/* session name */}
          <button
            onClick={() => scrollToSection('hero')}
            className="group flex items-center gap-2"
            aria-label="Back to top"
          >
            <span className="bg-accent px-1.5 py-0.5 font-bold text-ink">0</span>
            <span className="tracking-wider text-dim transition-colors group-hover:text-accent">
              pablo@berlin
            </span>
          </button>

          {/* Desktop window list */}
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={`relative px-2.5 py-1.5 tracking-wide transition-colors ${
                  active === l.id ? 'text-accent' : 'text-dim hover:text-fg'
                }`}
              >
                <span className="text-faint">{l.n}:</span>
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-px h-px bg-accent"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="border border-line-strong px-2.5 py-1.5 uppercase tracking-widest text-dim transition-colors hover:border-accent hover:text-accent"
            >
              [{theme === 'dark' ? 'dark' : 'light'}]
            </button>
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-8 w-8 items-center justify-center border border-line-strong text-dim md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? '×' : '≡'}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[99] md:hidden"
        style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 96%, transparent)' }}
      >
        <div className="flex h-full flex-col justify-center gap-1 px-8 font-mono">
          {LINKS.map((l, i) => (
            <motion.button
              key={l.id}
              onClick={() => go(l.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: menuOpen ? i * 0.06 : 0 }}
              className="flex items-baseline gap-4 border-b border-line py-5 text-left"
            >
              <span className="text-xs text-accent">{l.n}:</span>
              <span className="text-2xl font-bold text-fg">{l.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
