import { useEffect, useRef } from 'react';

/**
 * Custom cursor component — green glowing dot that follows the mouse.
 * A larger ring follows with slight lag for a premium feel.
 */
export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const rafRef  = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Dot follows exactly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Ring follows with lag
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);

    // Hover effects via event delegation
    const onOver = (e) => {
      if (e.target.matches('a, button, [role="button"]')) {
        dotRef.current?.classList.add('cursor-hover');
        ringRef.current?.classList.add('cursor-hover');
      }
    };
    const onOut = (e) => {
      if (e.target.matches('a, button, [role="button"]')) {
        dotRef.current?.classList.remove('cursor-hover');
        ringRef.current?.classList.remove('cursor-hover');
      }
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  id="cursor-dot"  />
      <div ref={ringRef} id="cursor-ring" />
    </>
  );
}
