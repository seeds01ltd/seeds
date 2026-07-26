import { useEffect, useRef, useState } from 'react';

/**
 * Animated counter that counts up from 0 to `target` when it enters the viewport.
 * 
 * Props:
 *   target   - number to count to (required)
 *   suffix   - text after number e.g. "+" or "%"
 *   prefix   - text before number e.g. "$"
 *   duration - animation duration in ms (default 2000)
 */
export default function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000 }) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.unobserve(el); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    // Parse number (strip non-digits for mixed values like "200+")
    const numTarget = parseFloat(String(target).replace(/[^0-9.]/g, ''));
    if (isNaN(numTarget)) { setValue(target); return; }

    const startTime = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      const current = numTarget < 10 ? parseFloat((eased * numTarget).toFixed(1)) : Math.round(eased * numTarget);
      setValue(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, target, duration]);

  // Format: preserve original display format
  const displayValue = String(target).includes('.') || String(target).includes('%')
    ? value
    : String(target).replace(/[0-9.]+/, value);

  return (
    <span ref={ref} className="stat-number">
      {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
    </span>
  );
}
