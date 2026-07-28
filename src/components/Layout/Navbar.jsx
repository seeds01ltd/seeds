import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

const MODULES = [
  { to: '/modules/crm',                label: 'CRM' },
  { to: '/modules/project-management', label: 'Project Mgmt' },
  { to: '/modules/finance',            label: 'Finance' },
  { to: '/modules/messages',           label: 'Messages' },
  { to: '/modules/knowledge-base',     label: 'Knowledge Base' },
  { to: '/modules/community',          label: 'Community' },
  { to: '/modules/certificate-verify', label: 'Certificates' },
];

const NAV = [
  { to: '/',          label: 'Home',      exact: true },
  { to: '/about',     label: 'About' },
  { to: '/services',  label: 'Services' },
  { to: '/portfolio', label: 'Work' },
  { to: '/pricing',   label: 'Pricing' },
  { to: '/academy',   label: 'Academy' },
  { to: '/courses',   label: 'Courses' },
  { to: '/blog',      label: 'Blog' },
  { to: '/careers',   label: 'Careers' },
  { to: '#',          label: 'Modules', dropdown: true },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled]     = useState(false);
  const [progress, setProgress]     = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => { setDropdownOpen(false); }, [location]);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <div className={styles.progress} style={{ width: `${progress}%` }} />

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoMark}>
              <img src="/logo.jpg" alt="Seed Logo" className={styles.logoImage} />
            </span>
            <span className={styles.logoName}>Seed<span className={styles.logoDot}>.</span></span>
          </Link>

          {/* Desktop nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            {NAV.map(({ to, label, exact, dropdown }) =>
              dropdown ? (
                <div key="modules" className={styles.dropdownWrapper} ref={dropdownRef}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  onClick={() => setDropdownOpen(o => !o)}
                >
                  <span className={`${styles.navLink} ${styles.dropdownToggle}`}>
                    {label} <span className={styles.dropdownArrow}>▾</span>
                  </span>
                  <div className={`${styles.dropdown} ${dropdownOpen ? styles.dropdownOpen : ''}`}>
                    {MODULES.map(m => (
                      <NavLink key={m.to} to={m.to}
                        className={({ isActive }) => `${styles.dropdownItem} ${isActive ? styles.active : ''}`}
                      >
                        {m.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink key={to} to={to} end={exact}
                  className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                >
                  {label}
                </NavLink>
              )
            )}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-ghost btn-sm">
                  Dashboard
                </Link>
                {user.role === 'instructor' && (
                  <Link to="/instructor" className="btn btn-ghost btn-sm">
                    Teach
                  </Link>
                )}
                {user.role === 'client' && (
                  <Link to="/client" className="btn btn-ghost btn-sm">
                    Projects
                  </Link>
                )}
                {user.role === 'developer' && (
                  <Link to="/developer" className="btn btn-ghost btn-sm">
                    Dev
                  </Link>
                )}
                {user.role === 'employer' && (
                  <Link to="/employer" className="btn btn-ghost btn-sm">
                    Hire
                  </Link>
                )}
                <Link to="/profile" className="btn btn-ghost btn-sm">
                  {user.avatar || '👤'} {user.name || user.email || 'User'}
                </Link>
                <button className="btn btn-ghost btn-sm" onClick={logout} style={{ color: 'var(--rose)' }}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Get Started
                </Link>
              </>
            )}
            <button
              className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`${styles.mobile} ${mobileOpen ? styles.mobileOpen : ''}`} aria-hidden={!mobileOpen}>
        <nav>
          {NAV.map(({ to, label, dropdown }) =>
            dropdown ? (
              <div key="modules">
                <span className={styles.mobileLink} style={{ cursor: 'default', opacity: 0.5 }}>
                  {label}
                </span>
                <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.5rem' }}>
                  {MODULES.map(m => (
                    <NavLink key={m.to} to={m.to}
                      className={({ isActive }) => `${styles.mobileSubLink} ${isActive ? styles.mobileActive : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {m.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={to} to={to}
                className={({ isActive }) => `${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </NavLink>
            )
          )}
          <div className={styles.mobileFooterBtns}>
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-secondary btn-md" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
                {user.role === 'instructor' && (
                  <Link to="/instructor" className="btn btn-secondary btn-md" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
                    Teach
                  </Link>
                )}
                {user.role === 'client' && (
                  <Link to="/client" className="btn btn-secondary btn-md" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
                    Projects
                  </Link>
                )}
                {user.role === 'developer' && (
                  <Link to="/developer" className="btn btn-secondary btn-md" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
                    Dev
                  </Link>
                )}
                {user.role === 'employer' && (
                  <Link to="/employer" className="btn btn-secondary btn-md" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
                    Hire
                  </Link>
                )}
                <Link to="/profile" className="btn btn-secondary btn-md" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
                  Profile
                </Link>
                <button className="btn btn-secondary btn-md" style={{ width: '100%', justifyContent: 'center', color: 'var(--rose)' }} onClick={() => { logout(); setMobileOpen(false); }}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-secondary btn-md" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
                Sign In
              </Link>
            )}
            <Link to="/register" className="btn btn-primary btn-md" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
