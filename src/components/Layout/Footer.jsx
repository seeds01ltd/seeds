import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const COLS = [
  {
    title: 'Services',
    links: [
      ['Web & Mobile Development', '/services/web-mobile'],
      ['AI & Machine Learning', '/services/ai-ml'],
      ['Cloud & DevOps', '/services/cloud-devops'],
      ['Embedded Systems', '/services/embedded'],
      ['Cybersecurity', '/services/cybersecurity'],
      ['Data Engineering', '/services/data-engineering'],
      ['Blockchain & Web3', '/services/blockchain'],
      ['Design Systems & UX', '/services/design-systems'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About Seed', '/about'],
      ['Our Work', '/portfolio'],
      ['Academy', '/academy'],
      ['Engineering Blog', '/blog'],
      ['Pricing', '/pricing'],
      ['Careers', '/careers'],
    ],
  },
  {
    title: 'Support',
    links: [
      ['FAQ', '/faq'],
      ['Start a Project', '/contact'],
      ['Request a Quote', '/quote'],
      ['Courses', '/courses'],
      ['Privacy Policy', '/legal/privacy'],
      ['Terms of Service', '/legal/terms'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topGlow} />

      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoMark}>
              <img src="/logo.jpg" alt="Seed Logo" className={styles.logoImage} />
            </span>
            <span className={styles.logoName}>Seed<span className={styles.logoDot}>.</span></span>
          </Link>
          <p className={styles.tagline}>
            Elite software engineering, AI, cloud, and embedded systems. 
            We transform ambitious ideas into production-grade digital systems.
          </p>
          <div className={styles.badges}>
            <span className="badge badge-indigo">
              <span className="badge-dot" />
              99.7% SLA Uptime
            </span>
            <span className="badge badge-em">
              ISO 27001 Certified
            </span>
          </div>

        </div>

        {/* Link columns */}
        {COLS.map(col => (
          <div key={col.title} className={styles.col}>
            <h4 className={styles.colTitle}>{col.title}</h4>
            <ul>
              {col.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className={styles.colLink}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p>&copy; 2026 Seed Software Development</p>
        <div className={styles.bottomLinks}>
          <Link to="/legal/privacy">Privacy Policy</Link>
          <Link to="/legal/terms">Terms of Service</Link>
          <Link to="/legal/cookies">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
