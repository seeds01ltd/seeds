import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroOverlay.module.css';

const PHRASES = [
  'Where Code Comes Alive',
  'AI That Thinks Deeper',
  'Systems Built to Last',
  'Engineering Excellence',
];

export default function HeroOverlay() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const current = PHRASES[phraseIdx];

    if (!deleting) {
      if (charIdx < current.length) {
        timerRef.current = setTimeout(() => setCharIdx(i => i + 1), 45);
      } else {
        timerRef.current = setTimeout(() => setDeleting(true), 2800);
      }
    } else {
      if (charIdx > 0) {
        timerRef.current = setTimeout(() => setCharIdx(i => i - 1), 28);
      } else {
        setDeleting(false);
        setPhraseIdx(i => (i + 1) % PHRASES.length);
      }
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timerRef.current);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <div className={styles.overlay}>
      <div className={styles.inner}>
        {/* Status badge */}
        <div className={styles.statusBadge}>
          <span className={styles.statusDot} />
          <span>All systems operational — 99.7% uptime</span>
        </div>

        {/* Main headline */}
        <h1 className={styles.title}>
          <span className={styles.typewriter}>
            {displayed}
            <span className={styles.cursor}>|</span>
          </span>
        </h1>

        {/* Subheading */}
        <p className={styles.subtitle}>
          Seed Software Development — crafting intelligent digital ecosystems with precision engineering,
          AI mastery, and deep technical craft. From embedded silicon to cloud-native platforms.
        </p>

        {/* CTA Row */}
        <div className={styles.cta}>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Start Your Project <span>→</span>
          </Link>
          <Link to="/portfolio" className="btn btn-outline btn-lg">
            View Our Work
          </Link>
          <Link to="/quote" className="btn btn-ghost btn-lg">
            Get a Quote
          </Link>
        </div>

        {/* Micro-stats */}
        <div className={styles.microStats}>
          {[
            { num: '200+', label: 'Engineers' },
            { num: '500+', label: 'Projects' },
            { num: '35+', label: 'Industries' },
            { num: '99.7%', label: 'SLA Uptime' },
          ].map(({ num, label }) => (
            <div key={label} className={styles.microStat}>
              <span className={styles.microNum}>{num}</span>
              <span className={styles.microLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span>Scroll to explore</span>
      </div>
    </div>
  );
}
