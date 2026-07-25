import { useCustomCursor }  from './hooks/useCustomCursor.js';
import { useScrollProgress } from './hooks/useScrollProgress.js';

import AnimatedBackground   from './components/AnimatedBackground.jsx';
import Navbar               from './components/Navbar.jsx';
import Hero                 from './components/Hero.jsx';
import About                from './components/About.jsx';
import Experience           from './components/Experience.jsx';
import Projects             from './components/Projects.jsx';
import SkillsAchievements   from './components/SkillsAchievements.jsx';
import Contact              from './components/Contact.jsx';
import Footer               from './components/Footer.jsx';

export default function App() {
  useCustomCursor();
  useScrollProgress();

  return (
    <>
      {/* ── Global overlays ─────────────────────────────────── */}
      <AnimatedBackground />

      {/* Dot-matrix texture overlay */}
      <div
        className="fixed inset-0 z-[-1] pointer-events-none bg-grid-pattern opacity-25"
        aria-hidden="true"
      />

      {/* Custom cursor elements */}
      <div className="cursor-dot"  aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />

      {/* Scroll progress bar */}
      <div id="scroll-progress" aria-hidden="true" />

      {/* ── Navigation ──────────────────────────────────────── */}
      <Navbar />

      {/* ── Main content ────────────────────────────────────── */}
      <main
        className="max-w-[1440px] mx-auto pt-20 md:pt-28 pb-16 md:pb-24 px-4 sm:px-6 md:px-16 flex flex-col gap-16 md:gap-32"
      >
        <Hero />
        <About />
        <Experience />
        <Projects />
        <SkillsAchievements />
        <Contact />
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
