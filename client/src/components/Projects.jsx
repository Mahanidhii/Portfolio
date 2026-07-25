import { motion } from 'framer-motion';
import { projects } from '../data/content.js';

function TechBadge({ label }) {
  return (
    <span className="font-mono text-[10px] bg-[--color-secondary]/10 border border-[--color-secondary]/20 text-[--color-secondary] px-2 py-1">
      ● {label}
    </span>
  );
}

function ProjectCard({ project, index, featured }) {
  return (
    <motion.article
      className={`glass-panel tech-border p-6 flex flex-col h-full group hover:-translate-y-2 hover:shadow-[0_0_24px_rgba(0,219,231,0.12)] transition-all duration-300 ${
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
          className="material-symbols-outlined text-[--color-primary-fixed] text-2xl"
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

      <h3 className="font-sora text-lg font-semibold text-[--color-on-background] mb-3">
        {project.title}
      </h3>

      <p className="font-inter text-sm text-[--color-on-surface-variant] leading-relaxed mb-3 flex-grow">
        {project.description}
      </p>

      {/* Metric / outcome stat line */}
      {project.metric && (
        <div className="font-mono text-[10px] text-[--color-primary-fixed] bg-[--color-primary-fixed]/8 border border-[--color-primary-fixed]/20 px-3 py-1.5 mb-4 flex items-center gap-2 leading-snug">
          <span className="text-[--color-secondary] select-none">▸</span>
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
      <div className="flex items-center gap-4 mb-12">
        <h2
          id="projects-heading"
          className="font-sora text-2xl font-semibold text-[--color-on-background] whitespace-nowrap"
        >
          <span className="text-[--color-primary-fixed] mr-2">03.</span>Projects
        </h2>
        <div className="h-px bg-[--color-outline-variant]/50 flex-grow max-w-xs" aria-hidden="true" />
      </div>

      {/* Card grid — featured projects span 2 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
