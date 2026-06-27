import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { scrollToSection } from '../hooks/useLenis';
import Magnetic from './Magnetic';

const LINKS = [
  { id: 'about', label: 'About', n: '01' },
  { id: 'projects', label: 'Work', n: '02' },
  { id: 'experience', label: 'Path', n: '03' },
  { id: 'skills', label: 'Stack', n: '04' },
  { id: 'contact', label: 'Contact', n: '05' },
];

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
    ['about', 'projects', 'experience', 'skills', 'education', 'contact'].forEach((id) => {
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
          scrolled ? 'border-b backdrop-blur-md' : 'border-b border-transparent'
        }`}
        style={{
          borderColor: scrolled ? 'var(--line)' : 'transparent',
          backgroundColor: scrolled ? 'color-mix(in srgb, var(--bg) 75%, transparent)' : 'transparent',
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          {/* Logo mark */}
          <button
            onClick={() => scrollToSection('hero')}
            data-cursor="link"
            className="group flex items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="relative flex h-7 w-7 items-center justify-center border border-line-strong">
              <span className="font-mono text-xs font-bold text-accent">PC</span>
              <span className="absolute -right-px -top-px h-1.5 w-1.5 border-r border-t border-accent" />
              <span className="absolute -bottom-px -left-px h-1.5 w-1.5 border-b border-l border-accent" />
            </span>
            <span className="hidden font-mono text-xs tracking-wider text-dim sm:inline">
              pablo.cunha
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                data-cursor="link"
                className="group relative px-3 py-2 font-mono text-xs tracking-wide transition-colors"
                style={{ color: active === l.id ? 'var(--accent)' : 'var(--fg-dim)' }}
              >
                <span className="mr-1.5 text-[10px] text-faint group-hover:text-accent">{l.n}</span>
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-0.5 h-px bg-accent"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} toggle={toggle} />
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              data-cursor="link"
              className="flex h-9 w-9 items-center justify-center border border-line-strong md:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <div className="flex flex-col gap-1">
                <span
                  className="h-px w-4 bg-current transition-transform"
                  style={{ transform: menuOpen ? 'translateY(2.5px) rotate(45deg)' : 'none' }}
                />
                <span
                  className="h-px w-4 bg-current transition-transform"
                  style={{ transform: menuOpen ? 'translateY(-2.5px) rotate(-45deg)' : 'none' }}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[99] bg-base/95 backdrop-blur-lg md:hidden"
        style={{ backgroundColor: 'color-mix(in srgb, var(--bg) 96%, transparent)' }}
      >
        <div className="flex h-full flex-col justify-center gap-2 px-8">
          {LINKS.map((l, i) => (
            <motion.button
              key={l.id}
              onClick={() => go(l.id)}
              initial={{ opacity: 0, x: -20 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: menuOpen ? i * 0.06 : 0 }}
              className="flex items-baseline gap-4 border-b border-line py-5 text-left"
            >
              <span className="font-mono text-xs text-accent">{l.n}</span>
              <span className="font-serif text-3xl text-fg">{l.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );
}

function ThemeToggle({ theme, toggle }: { theme: string; toggle: () => void }) {
  return (
    <Magnetic strength={0.3}>
      <button
        onClick={toggle}
        data-cursor="link"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className="flex h-9 items-center gap-2 border border-line-strong px-3 font-mono text-[10px] uppercase tracking-widest text-dim transition-colors hover:text-accent"
      >
        <span className="relative flex h-3 w-3 items-center justify-center">
          <span
            className="absolute h-3 w-3 rounded-full border transition-all"
            style={{
              borderColor: 'var(--accent)',
              background: theme === 'dark' ? 'transparent' : 'var(--accent)',
              clipPath: theme === 'dark' ? 'inset(0 0 0 50%)' : 'none',
            }}
          />
        </span>
        {theme === 'dark' ? 'DARK' : 'LIGHT'}
      </button>
    </Magnetic>
  );
}
