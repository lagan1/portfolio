import { motion, type Variant } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/** Tasteful scroll-reveal: fade + small rise, triggered once when in view. */
export default function Reveal({ children, className, delay = 0, y = 24, once = true }: RevealProps) {
  const hidden: Variant = { opacity: 0, y };
  const visible: Variant = { opacity: 1, y: 0 };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      variants={{ hidden, visible }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
