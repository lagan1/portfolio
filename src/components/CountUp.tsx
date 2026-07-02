import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

interface CountUpProps {
  value: string;
  className?: string;
  duration?: number;
}

/**
 * Animates a numeric value from 0 when scrolled into view.
 * Non-numeric values (e.g. "MSc") render as-is. Honors prefers-reduced-motion.
 */
export default function CountUp({ value, className, duration = 1.2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const target = parseInt(value, 10);
  const isNumeric = !Number.isNaN(target);
  const [display, setDisplay] = useState(isNumeric ? '0' : value);

  useEffect(() => {
    if (!isNumeric || !inView) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, isNumeric, target, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
