import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';

export default function App() {
  useLenis();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // Easter egg: a note for the curious who open the console.
  useEffect(() => {
    const style = 'color:#4ade80;font-family:monospace;font-size:12px;';
    // eslint-disable-next-line no-console
    console.log('%c┌─ lagan.parihar ────────────────────┐', style);
    // eslint-disable-next-line no-console
    console.log('%c│  poking around? i like that.   │', style);
    // eslint-disable-next-line no-console
    console.log('%c│  try harder. — HoF @ Google, NASA  │', style);
    // eslint-disable-next-line no-console
    console.log('%c│  hire me → linkedin.com/in/laganparihar │', style);
    // eslint-disable-next-line no-console
    console.log('%c└────────────────────────────────────┘', style);
  }, []);

  return (
    <div className="scanlines relative min-h-screen bg-base">
      <Nav />

      {/* scroll progress rail */}
      <motion.div
        className="fixed left-0 top-0 z-[101] h-0.5 w-full origin-left bg-accent"
        style={{ scaleX: progress }}
        aria-hidden
      />

      {/* skip link for a11y */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:border focus:border-accent focus:bg-base focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-accent"
      >
        Skip to content
      </a>

      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
