import { personal } from '../data/content.js';

const FOOTER_LINKS = [
  { label: 'GitHub',   href: personal.github,   external: true  },
  { label: 'LinkedIn', href: personal.linkedin,  external: true  },
  { label: 'Email',    href: `mailto:${personal.email}`, external: false },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full py-10 border-t border-[--color-outline-variant]/20 bg-[--color-surface-container-lowest] mt-12"
      role="contentinfo"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-44 flex flex-col md:flex-row justify-between items-center gap-5">

        {/* Logo */}
        <div className="font-sora text-base font-bold text-[--color-primary]">
          MAHANIDHI_GK
        </div>

        {/* Copyright */}
        <div className="font-mono text-[10px] text-[--color-secondary] text-center">
          © {year} MAHANIDHI G K // TERMINAL_ACCESS_GRANTED
        </div>

        {/* Nav */}
        <nav aria-label="Footer navigation">
          <ul className="flex gap-5" role="list">
            {FOOTER_LINKS.map(({ label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="font-mono text-[10px] uppercase tracking-widest text-[--color-on-tertiary-fixed-variant] hover:text-[--color-primary-fixed] transition-colors duration-300 hover:scale-110 inline-block"
                  aria-label={label}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
