import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorMode = 'default' | 'link' | 'project' | 'text';

/**
 * Context-aware custom cursor. Two layers: a precise dot and a lagging ring.
 * Reads data-cursor="link|project|text" off hovered elements to change mode.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [label, setLabel] = useState('');
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });
  const rafLabel = useRef('');

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add('custom-cursor');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null;
      if (target) {
        const m = (target.dataset.cursor as CursorMode) || 'default';
        setMode(m);
        const l = target.dataset.cursorLabel || '';
        if (l !== rafLabel.current) {
          rafLabel.current = l;
          setLabel(l);
        }
      } else {
        setMode('default');
        rafLabel.current = '';
        setLabel('');
      }
    };
    const downH = () => setDown(true);
    const upH = () => setDown(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', downH);
    window.addEventListener('mouseup', upH);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', downH);
      window.removeEventListener('mouseup', upH);
      document.body.classList.remove('custom-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = mode === 'project' ? 64 : mode === 'link' ? 44 : mode === 'text' ? 4 : 30;

  return (
    <>
      {/* Dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          background: 'var(--accent)',
          opacity: mode === 'text' ? 0 : 1,
        }}
      />
      {/* Ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid var(--accent)',
          mixBlendMode: 'difference' as const,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          scale: down ? 0.8 : 1,
          backgroundColor: mode === 'project' ? 'rgba(34,211,238,0.08)' : 'rgba(0,0,0,0)',
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{label}</span>
        )}
      </motion.div>
    </>
  );
}
