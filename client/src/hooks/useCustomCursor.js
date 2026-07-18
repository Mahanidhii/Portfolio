import { useEffect, useRef } from 'react';

/**
 * Attaches a smooth, eased custom cursor (dot + ring) that follows the mouse.
 * The ring uses a requestAnimationFrame lerp for buttery trailing motion.
 * Automatically disabled on touch-only devices.
 */
export function useCustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);
  const isHover = useRef(false);

  useEffect(() => {
    // Touch-only devices: bail out
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    dotRef.current = dot;
    ringRef.current = ring;

    const LERP = 0.12; // ring smoothing factor (lower = more lag)

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top  = `${e.clientY}px`;
    };

    const onMouseEnterInteractive = () => {
      isHover.current = true;
      document.body.classList.add('cursor-hover');
    };
    const onMouseLeaveInteractive = () => {
      isHover.current = false;
      document.body.classList.remove('cursor-hover');
    };

    const onMouseLeave = () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    };
    const onMouseEnter = () => {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    };

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label[for]';

    // Delegate interaction detection
    const addListeners = () => {
      document.querySelectorAll(INTERACTIVE).forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
    addListeners();

    // MutationObserver to pick up dynamically added interactive elements
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // RAF loop for smooth ring trailing
    const tick = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * LERP;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * LERP;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top  = `${ringPos.current.y}px`;
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);
}
