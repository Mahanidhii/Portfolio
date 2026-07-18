import { motion } from 'framer-motion';
import { personal, education } from '../data/content.js';
import selfPic from '../assets/images/SelfPic.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  return (
    <section id="about" className="scroll-mt-24" aria-labelledby="about-heading">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-12">
        <h2
          id="about-heading"
          className="font-sora text-2xl font-semibold text-[--color-on-background] whitespace-nowrap"
        >
          <span className="text-[--color-primary-fixed] mr-2">01.</span>About
        </h2>
        <div className="h-px bg-[--color-outline-variant]/50 flex-grow max-w-xs" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Text */}
        <motion.div
          className="glass-panel tech-border p-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          {personal.bio.map((para, i) => (
            <p
              key={i}
              className={`font-inter text-base text-[--color-on-surface-variant] leading-relaxed ${i < personal.bio.length - 1 ? 'mb-5' : ''}`}
            >
              {para}
            </p>
          ))}

          {/* Education card */}
          <div className="mt-6 pt-6 border-t border-[--color-outline-variant]/30">
            <div className="font-mono text-xs text-[--color-primary-fixed-dim] mb-2 uppercase tracking-widest">
              Education
            </div>
            <p className="font-sora text-sm font-semibold text-[--color-on-background]">{education.degree}</p>
            <p className="font-inter text-sm text-[--color-on-surface-variant] mt-1">{education.university}</p>
            <div className="flex gap-4 mt-2">
              <span className="font-mono text-xs text-[--color-secondary]">{education.period}</span>
              <span className="font-mono text-xs text-[--color-primary-fixed]">CGPA: {education.cgpa}</span>
            </div>
          </div>
        </motion.div>

        {/* Image / visual */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <img
            src={selfPic}
            alt="Mahanidhi G K"
            className="glass-panel tech-border w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            style={{ minHeight: '320px', maxHeight: '420px' }}
          />
          {/* Offset border decoration */}
          <div
            className="absolute inset-0 border-2 border-[--color-primary-fixed] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
