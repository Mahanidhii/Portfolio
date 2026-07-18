import { useEffect, useRef } from 'react';

/**
 * Attaches IntersectionObserver-based scroll-reveal to all elements
 * matching the given selector. Adds/removes the `in-view` class.
 *
 * Usage:
 *   useScrollReveal(); // uses default selector '.reveal'
 *   useScrollReveal('.my-card'); // custom selector
 */
export function useScrollReveal(selector = '.reveal', options = {}) {
  const observerRef = useRef(null);

  useEffect(() => {
    const { threshold = 0.12, rootMargin = '0px 0px -60px 0px' } = options;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold, rootMargin }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, [selector]);
}
