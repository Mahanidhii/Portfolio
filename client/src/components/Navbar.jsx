import { useState, useEffect } from 'react';
import { personal } from '../data/content.js';

const NAV_LINKS = [
  { href: '#home',       label: 'Home' },
  { href: '#about',      label: 'About' },
  { href: '#experience', label: 'Exp' },
  { href: '#projects',   label: 'Projects' },
  { href: '#skills',     label: 'Skills' },
  { href: '#contact',    label: 'Contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);

  // Track scroll for navbar style + active section
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(18,19,26,0.85)] backdrop-blur-md border-b border-[--color-outline-variant]/30 shadow-[0_0_20px_rgba(0,219,231,0.08)]'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center w-full px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-44 py-4 max-w-[1600px] mx-auto">

        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="font-sora text-lg font-bold text-[--color-primary-fixed] tracking-tighter hover:text-[--color-primary-fixed-dim] transition-colors"
          aria-label="Mahanidhi G K — Home"
        >
          MAHANIDHI_GK
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8" role="menubar">
          {NAV_LINKS.map(({ href, label }) => {
            const id = href.slice(1);
            const active = activeSection === id;
            return (
              <a
                key={id}
                href={href}
                role="menuitem"
                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                className={`font-mono text-xs uppercase tracking-widest transition-all duration-200 pb-1 hover:text-[--color-primary-fixed] ${
                  active
                    ? 'text-[--color-primary-fixed] border-b border-[--color-primary-fixed]'
                    : 'text-[--color-on-surface-variant]'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Resume button */}
        <div className="hidden md:block">
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-[--color-primary-fixed] border border-[--color-primary-fixed]/50 px-4 py-2 hover:bg-[--color-primary-fixed]/10 transition-all duration-200"
            aria-label="Open resume in new tab"
          >
            Resume
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-[--color-primary-fixed] p-1"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[--color-surface-container] border-t border-[--color-outline-variant]/30 px-5 py-4 flex flex-col gap-4"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
              className="font-mono text-xs uppercase tracking-widest text-[--color-on-surface-variant] hover:text-[--color-primary-fixed] transition-colors py-1"
            >
              {label}
            </a>
          ))}
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-[--color-primary-fixed] border border-[--color-primary-fixed]/50 px-4 py-2 text-center hover:bg-[--color-primary-fixed]/10 transition-all mt-2"
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  );
}
