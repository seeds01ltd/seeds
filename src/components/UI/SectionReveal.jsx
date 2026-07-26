import { useEffect, useRef } from 'react';

/**
 * Scroll-triggered reveal wrapper.
 * Children fade up into view when they enter the viewport.
 * 
 * Usage:
 *   <SectionReveal delay={0.2}>
 *     <div>content</div>
 *   </SectionReveal>
 */
export default function SectionReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}s`;
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
