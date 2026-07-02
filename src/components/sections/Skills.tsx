import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/content';
import SectionHeader from '../SectionHeader';
import Reveal from '../Reveal';

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeader cmd="tree ~/stack -L 2" title="what i work with" note="6 DOMAINS" />

      <div className="grid gap-px border border-line-strong bg-[var(--line)] font-mono md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, gi) => (
          <Reveal key={group.category} delay={gi * 0.05}>
            <div
              className="group relative h-full bg-base p-6 transition-colors hover:bg-soft sm:p-8"
              onMouseEnter={() => setActive(group.code)}
              onMouseLeave={() => setActive(null)}
            >
              {/* corner code */}
              <span className="absolute right-4 top-4 text-[10px] tracking-widest text-faint transition-colors group-hover:text-accent">
                {group.code}
              </span>

              <h3 className="text-xl font-bold tracking-tightest text-fg">
                <span className="font-normal text-faint">├── </span>
                {group.category.toLowerCase()}
                <span className="text-faint">/</span>
              </h3>

              <div className="mt-6 flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0.7 }}
                    animate={{
                      opacity: active === null || active === group.code ? 1 : 0.4,
                    }}
                    transition={{ delay: si * 0.02 }}
                    className="border border-line px-3 py-1.5 text-xs text-dim transition-colors hover:border-accent hover:text-accent"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* count */}
              <span className="mt-6 block text-[10px] text-faint">
                {String(group.skills.length).padStart(2, '0')} entries
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
