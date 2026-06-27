import { useEffect, useRef, useState } from 'react';

const GLYPHS = '01<>/{}[]#$%&*+=~|abcdef0123456789';

interface DecodeTextProps {
  text: string;
  className?: string;
  /** ms per reveal step */
  speed?: number;
  /** start decoding when scrolled into view */
  triggerOnView?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Renders text that "decodes" from random cipher glyphs into the final string.
 * Honors prefers-reduced-motion by rendering final text immediately.
 */
export default function DecodeText({
  text,
  className,
  speed = 28,
  triggerOnView = true,
  as = 'span',
}: DecodeTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(triggerOnView ? '' : text);
  const started = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(text);
      return;
    }

    const run = () => {
      if (started.current) return;
      started.current = true;
      let frame = 0;
      const total = text.length;
      const interval = setInterval(() => {
        frame++;
        const revealed = Math.floor(frame / 2);
        let out = '';
        for (let i = 0; i < total; i++) {
          if (text[i] === ' ') {
            out += ' ';
          } else if (i < revealed) {
            out += text[i];
          } else {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        setDisplay(out);
        if (revealed >= total) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, speed);
    };

    if (!triggerOnView) {
      run();
      return;
    }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [text, speed, triggerOnView]);

  const Tag = as as 'span';
  return (
    <Tag ref={ref as React.Ref<HTMLSpanElement>} className={className} aria-label={text}>
      <span aria-hidden>{display || ' '}</span>
    </Tag>
  );
}
