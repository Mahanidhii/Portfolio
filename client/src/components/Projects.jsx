import { motion } from 'framer-motion';
import { projects } from '../data/content.js';

function TechBadge({ label }) {
  return (
    <span className="font-mono text-[10px] bg-[--color-secondary]/10 border border-[--color-secondary]/20 text-[--color-secondary] px-2 py-1">
      ● {label}
    </span>
  );
}

const PROJECT_COLORS = {
  1: { icon: 'text-[--color-primary-fixed]', metricText: 'text-[--color-primary-fixed]', metricBg: 'bg-[--color-primary-fixed]/8', metricBorder: 'border-[--color-primary-fixed]/20', arrow: 'text-[--color-secondary]' }, // CV/ML
  2: { icon: 'text-[--color-secondary]', metricText: 'text-[--color-secondary]', metricBg: 'bg-[--color-secondary]/8', metricBorder: 'border-[--color-secondary]/20', arrow: 'text-[--color-primary-fixed]' }, // NLP
  3: { icon: 'text-[--color-error]', metricText: 'text-[--color-error]', metricBg: 'bg-[--color-error]/8', metricBorder: 'border-[--color-error]/20', arrow: 'text-[--color-secondary]' }, // Time-series
  4: { icon: 'text-[--color-surface-tint]', metricText: 'text-[--color-surface-tint]', metricBg: 'bg-[--color-surface-tint]/8', metricBorder: 'border-[--color-surface-tint]/20', arrow: 'text-[--color-secondary]' }, // Data Analysis
};

function ProjectCard({ project, index, featured }) {
  const theme = PROJECT_COLORS[project.id] || PROJECT_COLORS[1];

  return (
    <motion.article
      className={`glass-panel tech-border p-6 xl:p-8 flex flex-col h-full group hover:-translate-y-2 hover:shadow-[0_0_24px_rgba(0,219,231,0.12)] transition-all duration-300 ${
        featured ? 'md:col-span-2' : ''
      }`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      aria-label={project.title}
    >
      {/* Card header */}
      <div className="flex justify-between items-center mb-4 border-b border-[--color-outline-variant]/30 pb-3">
        <span
          className={`material-symbols-outlined text-2xl ${theme.icon}`}
          aria-hidden="true"
        >
          {project.icon}
        </span>
        <div className="flex gap-2">
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[--color-on-surface-variant] hover:text-[--color-primary-fixed] transition-colors"
              aria-label={`${project.title} GitHub repository`}
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">code</span>
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[--color-on-surface-variant] hover:text-[--color-primary-fixed] transition-colors"
              aria-label={`${project.title} live demo`}
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">open_in_new</span>
            </a>
          )}
        </div>
      </div>

      <h3 className="font-sora text-lg xl:text-xl font-semibold text-[--color-on-background] mb-3">
        {project.title}
      </h3>

      <p className="font-inter text-sm text-[--color-on-surface-variant] leading-relaxed mb-3 flex-grow">
        {project.description}
      </p>

      {/* Metric / outcome stat line */}
      {project.metric && (
        <div className={`font-mono text-[10px] ${theme.metricText} ${theme.metricBg} border ${theme.metricBorder} px-3 py-1.5 mb-4 flex items-center gap-2 leading-snug`}>
          <span className={`${theme.arrow} select-none`}>▸</span>
          {project.metric}
        </div>
      )}

      {/* Sub-projects (Applied Data Analysis) */}
      {project.subProjects && (
        <ul className="mb-4 space-y-2" aria-label="Sub-projects">
          {project.subProjects.map((sub) => (
            <li key={sub.title} className="border-l-2 border-[--color-outline-variant]/50 pl-3">
              <span className="font-sora text-xs font-semibold text-[--color-primary-fixed]">{sub.title}</span>
              <p className="font-inter text-xs text-[--color-on-surface-variant] mt-0.5">{sub.description}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mt-auto" aria-label="Technologies used">
        {project.tech.map((t) => (
          <TechBadge key={t} label={t} />
        ))}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24" aria-labelledby="projects-heading">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-10 xl:mb-14">
        <h2
          id="projects-heading"
          className="font-sora text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-[--color-on-background] whitespace-nowrap"
        >
          <span className="text-[--color-primary-fixed] mr-2">03.</span>Projects
        </h2>
        <div className="h-px bg-[--color-outline-variant]/50 flex-grow max-w-xs xl:max-w-md" aria-hidden="true" />
      </div>

      {/* Card grid — featured projects span 2 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 xl:gap-8">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            featured={project.featured}
          />
        ))}
      </div>
    </section>
  );
}
