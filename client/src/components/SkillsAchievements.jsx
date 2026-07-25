import { motion } from 'framer-motion';
import { skills, achievements } from '../data/content.js';

function SkillTag({ label }) {
  return (
    <span className="font-mono text-xs bg-[--color-surface-container] border border-[--color-outline-variant]/50 px-3 py-1 text-[--color-on-background]">
      {label}
    </span>
  );
}

export default function SkillsAchievements() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ── Skills (2 of 3 cols) ─────────────────────────────── */}
      <motion.section
        id="skills"
        className="lg:col-span-2 glass-panel tech-border p-5 sm:p-8 scroll-mt-24"
        aria-labelledby="skills-heading"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2
          id="skills-heading"
          className="font-sora text-2xl font-semibold text-[--color-on-background] mb-8 flex items-center gap-2"
        >
          <span className="text-[--color-primary-fixed]">04.</span> Core Competencies
        </h2>

        <div className="space-y-6">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-mono text-xs text-[--color-primary-fixed-dim] mb-2 uppercase tracking-widest">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2" role="list" aria-label={group.category}>
                {group.items.map((item) => (
                  <span role="listitem" key={item}>
                    <SkillTag label={item} />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Achievements (1 of 3 cols) ───────────────────────── */}
      <motion.section
        id="achievements"
        className="glass-panel tech-border p-5 sm:p-8 flex flex-col scroll-mt-24"
        aria-labelledby="ach-heading"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <h2
          id="ach-heading"
          className="font-sora text-2xl font-semibold text-[--color-on-background] mb-8 flex items-center gap-2"
        >
          <span className="text-[--color-primary-fixed]">05.</span> Accolades
        </h2>

        <div className="space-y-6 flex-grow" role="list">
          {achievements.map((ach, i) => (
            <motion.div
              key={i}
              role="listitem"
              className="border-l-2 border-[--color-secondary] pl-4 py-1 hover:border-[--color-primary-fixed] transition-colors duration-300"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="font-sora text-base font-semibold text-[--color-on-background]">
                {ach.title}
              </h3>
              <p className="font-mono text-xs text-[--color-secondary] mt-1">{ach.subtitle}</p>
              <p className="font-inter text-xs text-[--color-on-surface-variant] mt-2 leading-relaxed">
                {ach.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decorative icon */}
        <div className="mt-8 text-right opacity-[0.12] pointer-events-none" aria-hidden="true">
          <span className="material-symbols-outlined text-7xl">emoji_events</span>
        </div>
      </motion.section>

    </div>
  );
}
