import { motion } from 'framer-motion';
import { experience } from '../data/content.js';

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24" aria-labelledby="exp-heading">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-10 xl:mb-14">
        <h2
          id="exp-heading"
          className="font-sora text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-[--color-on-background] whitespace-nowrap"
        >
          <span className="text-[--color-primary-fixed] mr-2">02.</span>Experience
        </h2>
        <div className="h-px bg-[--color-outline-variant]/50 flex-grow max-w-xs xl:max-w-md" aria-hidden="true" />
      </div>

      {/* Timeline */}
      <div className="relative border-l border-[--color-outline-variant]/30 pl-8 ml-4 space-y-12" role="list">
        {experience.map((exp, i) => (
          <motion.div
            key={i}
            role="listitem"
            className="relative group"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
          >
            {/* Timeline dot */}
            <span
              className="absolute -left-[2.6rem] top-5 w-4 h-4 rounded-full bg-[--color-surface] border-2 border-[--color-primary-fixed] group-hover:bg-[--color-primary-fixed] transition-colors duration-300"
              aria-hidden="true"
            />

            <div className="glass-panel tech-border p-6 xl:p-8 2xl:p-10 group-hover:border-[--color-primary-fixed]/40 transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-2">
                <h3 className="font-sora text-lg xl:text-xl 2xl:text-2xl font-semibold text-[--color-on-background]">
                  {exp.role}
                </h3>
                <span className="font-mono text-xs text-[--color-secondary] shrink-0">{exp.company}</span>
              </div>

              <div className="font-mono text-xs text-[--color-on-surface-variant] mb-1">{exp.period}</div>

              <div className="flex flex-wrap gap-2 mb-4">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] bg-[--color-surface-container] border border-[--color-outline-variant]/40 px-2 py-0.5 text-[--color-on-surface-variant]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="font-inter text-sm xl:text-base text-[--color-on-surface-variant] leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
