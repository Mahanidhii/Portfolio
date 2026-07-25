import { motion } from 'framer-motion';
import { personal } from '../data/content.js';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[calc(100vh-5rem)] flex flex-col justify-center relative scroll-mt-20"
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="glass-panel tech-border p-8 md:p-12 max-w-4xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Status chip */}
        <motion.div
          variants={item}
          className="font-mono text-xs text-[--color-secondary] mb-3 flex items-center gap-2"
          aria-hidden="true"
        >
          <span className="w-2 h-2 rounded-full bg-[--color-secondary] animate-pulse inline-block" />
          SYS.INIT_USER_PROFILE
        </motion.div>

        {/* Availability badge */}
        <motion.div
          variants={item}
          className="font-mono text-[10px] text-[--color-primary-fixed] bg-[--color-primary-fixed]/10 border border-[--color-primary-fixed]/30 px-3 py-1 inline-flex items-center gap-2 mb-4 w-fit"
          aria-label="Open to opportunities"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[--color-primary-fixed] animate-pulse inline-block" />
          OPEN_TO_OPPORTUNITIES // SDE &amp; ML ROLES // 2027 GRAD
        </motion.div>

        {/* Name */}
        <motion.h1
          id="hero-heading"
          variants={item}
          className="font-sora text-4xl md:text-6xl font-bold text-[--color-on-background] mb-4 leading-tight tracking-tight"
        >
          {personal.name}
        </motion.h1>

        {/* Tagline */}
        <motion.h2
          variants={item}
          className="font-sora text-xl md:text-2xl font-semibold mb-6 scanline-text leading-snug"
        >
          {personal.tagline}
        </motion.h2>

        {/* Sub-text */}
        <motion.p
          variants={item}
          className="font-inter text-base text-[--color-on-surface-variant] max-w-2xl mb-8 leading-relaxed"
        >
          Building end-to-end AI systems — from deep learning models to production-ready web apps.
          Engineering precision in high-stakes environments.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-wrap gap-4">
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="bg-[--color-primary-fixed] text-[--color-on-primary-fixed] font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-[--color-primary-fixed-dim] transition-all duration-300 shadow-[0_0_12px_rgba(0,219,231,0.15)] hover:shadow-[0_0_20px_rgba(0,219,231,0.4)] inline-flex items-center gap-2 font-semibold"
            aria-label="View my projects"
          >
            View Projects
            <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="border-2 border-[--color-secondary]/70 text-[--color-secondary] font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-[--color-secondary]/10 hover:border-[--color-secondary] transition-all duration-300 hover:shadow-[0_0_16px_rgba(208,188,255,0.25)]"
          >
            Get In Touch
          </a>
          <a
            href={personal.resumeUrl}
            download
            className="border-2 border-[--color-outline-variant]/60 text-[--color-on-surface-variant] font-mono text-xs uppercase tracking-widest px-6 py-3 hover:border-[--color-primary-fixed]/60 hover:text-[--color-primary-fixed] transition-all duration-300 hover:shadow-[0_0_16px_rgba(0,219,231,0.2)] hover:bg-[--color-primary-fixed]/5 inline-flex items-center gap-2"
            aria-label="Download resume PDF"
          >
            <span className="material-symbols-outlined text-base" aria-hidden="true">download</span>
            Resume
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap gap-6 border-t border-[--color-outline-variant]/30 pt-6"
        >
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[--color-on-surface-variant] hover:text-[--color-primary-fixed] transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
            aria-label="GitHub profile"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">code</span>
            GitHub
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[--color-on-surface-variant] hover:text-[--color-primary-fixed] transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
            aria-label="LinkedIn profile"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">work</span>
            LinkedIn
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="text-[--color-on-surface-variant] hover:text-[--color-primary-fixed] transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
            aria-label={`Email ${personal.email}`}
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">mail</span>
            Email
          </a>
        </motion.div>
      </motion.div>

      {/* Decorative syntax brace */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none hidden lg:block select-none" aria-hidden="true">
        <span className="font-mono text-[140px] leading-none text-[--color-primary-fixed]">{'}'}</span>
      </div>
    </section>
  );
}
