import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Smooth scrolling via Lenis. Respects prefers-reduced-motion by skipping init.
 * Exposes the instance on window for anchor navigation.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // @ts-expect-error attach for anchor scrolling
    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      // @ts-expect-error cleanup
      delete window.__lenis;
    };
  }, []);
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  // @ts-expect-error lenis attached on window
  const lenis = window.__lenis as { scrollTo: (t: HTMLElement, o?: object) => void } | undefined;
  if (lenis) {
    lenis.scrollTo(el, { offset: -40 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
