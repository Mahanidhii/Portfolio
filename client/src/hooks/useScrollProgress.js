import { useEffect } from 'react';

/**
 * Updates the CSS width of #scroll-progress as the user scrolls.
 */
export function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    const update = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
      bar.style.width = `${pct}%`;
    };

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
}
