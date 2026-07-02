import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { profile } from '../../data/content';
import { scrollToSection } from '../../hooks/useLenis';
import DecodeText from '../DecodeText';

const ASCII_PABLO = `██████╗  █████╗ ██████╗ ██╗      ██████╗
██╔══██╗██╔══██╗██╔══██╗██║     ██╔═══██╗
██████╔╝███████║██████╔╝██║     ██║   ██║
██╔═══╝ ██╔══██║██╔══██╗██║     ██║   ██║
██║     ██║  ██║██████╔╝███████╗╚██████╔╝
╚═╝     ╚═╝  ╚═╝╚═════╝ ╚══════╝ ╚═════╝`;

const ASCII_CUNHA = ` ██████╗██╗   ██╗███╗   ██╗██╗  ██╗ █████╗
██╔════╝██║   ██║████╗  ██║██║  ██║██╔══██╗
██║     ██║   ██║██╔██╗ ██║███████║███████║
██║     ██║   ██║██║╚██╗██║██╔══██║██╔══██║
╚██████╗╚██████╔╝██║ ╚████║██║  ██║██║  ██║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═╝`;

const HOOK_ROTATE_MS = 7000;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Rotate through the hook lines, re-decoding each one
  const [hookIndex, setHookIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(
      () => setHookIndex((i) => (i + 1) % profile.hooks.length),
      HOOK_ROTATE_MS
    );
    return () => clearInterval(id);
  }, []);

  // Spotlight trailing the pointer — transform-only, no repaints (desktop)
  const mx = useMotionValue(-1200);
  const my = useMotionValue(-1200);
  const sx = useSpring(mx, { stiffness: 80, damping: 22, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 80, damping: 22, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-20 font-mono sm:px-8"
    >
      <motion.div
        className="pointer-events-none absolute left-0 top-0 hidden rounded-full lg:block"
        style={{
          x: sx,
          y: sy,
          width: 1120,
          height: 1120,
          marginLeft: -560,
          marginTop: -560,
          background: 'radial-gradient(circle, rgba(74, 222, 128, 0.07), transparent 60%)',
          willChange: 'transform',
        }}
        aria-hidden
      />

      <motion.div style={{ y, opacity }} className="relative mx-auto w-full max-w-7xl">
        {/* prompt line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm"
        >
          <span>
            <span className="text-accent">pablo@berlin</span>
            <span className="text-faint">:~$</span> <span className="text-fg">whoami</span>
          </span>
          <span className="hidden h-3 w-px bg-line-strong sm:block" />
          <span className="flex items-center gap-2 text-dim">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            OPEN TO WORK
          </span>
          <span className="text-faint">{profile.location}</span>
        </motion.div>

        {/* ASCII name */}
        <div aria-label={profile.name} role="heading" aria-level={1}>
          <motion.pre
            aria-hidden
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="phosphor select-none overflow-x-hidden text-accent"
            style={{ fontSize: 'clamp(7px, 2.2vw, 28px)', lineHeight: 1.08 }}
          >
            {ASCII_PABLO}
          </motion.pre>
          <motion.pre
            aria-hidden
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 select-none overflow-x-hidden text-fg"
            style={{ fontSize: 'clamp(7px, 2.2vw, 28px)', lineHeight: 1.08 }}
          >
            {ASCII_CUNHA}
          </motion.pre>
        </div>

        {/* role + hook */}
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[1fr_auto] md:items-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-dim sm:text-sm">
              <span className="text-faint"># </span>
              {profile.title} — {profile.specialty}
            </p>
            <p className="mt-4 min-h-[3em] text-lg leading-relaxed text-fg sm:text-xl">
              <span className="text-accent">&gt; </span>
              <DecodeText
                key={hookIndex}
                text={profile.hooks[hookIndex]}
                speed={22}
                triggerOnView={false}
              />
              <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" />
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-col gap-3 sm:flex-row md:flex-col"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="group relative flex items-center justify-center gap-3 overflow-hidden border border-accent px-7 py-3.5 text-xs uppercase tracking-widest text-accent"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              <span className="relative transition-colors duration-300 group-hover:text-ink">
                [ view the work ]
              </span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center justify-center border border-line-strong px-7 py-3.5 text-xs uppercase tracking-widest text-dim transition-colors hover:border-accent hover:text-fg"
            >
              [ get in touch ]
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-label="Scroll down"
      >
        <span className="dim-label">scroll</span>
        <motion.span
          className="text-xs text-accent"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          ▼
        </motion.span>
      </motion.button>
    </section>
  );
}
