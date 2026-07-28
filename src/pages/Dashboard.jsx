import { Navigate, NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, BookOpen, BookmarkCheck, Award, Trophy, Settings, Home } from 'lucide-react';

const SIDEBAR = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/courses', label: 'My Courses', icon: BookOpen },
  { to: '/dashboard/bookmarks', label: 'Bookmarks', icon: BookmarkCheck },
  { to: '/dashboard/certificates', label: 'Certificates', icon: Award },
  { to: '/dashboard/achievements', label: 'Achievements', icon: Trophy },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  return (
    <div className="page-wrapper" style={{ paddingTop: 0 }}>
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 3.5rem)' }}>
        <aside className="dashboard-sidebar" style={{
          width: 240, flexShrink: 0, borderRight: '1px solid var(--border)',
          background: 'var(--bg-surface)', padding: 'var(--sp-6) 0',
          position: 'sticky', top: '3.5rem', alignSelf: 'flex-start', height: 'calc(100vh - 3.5rem)',
          overflowY: 'auto',
        }}>
          <div style={{ padding: '0 var(--sp-4)', marginBottom: 'var(--sp-3)' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 'var(--sp-3)', padding: '0.25rem 0', transition: 'color var(--t-fast)' }}
              className="dashboard-back-link">
              <Home size={14} /> Back to Site
            </Link>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 500 }}>Dashboard</p>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 var(--sp-3)' }}>
            {SIDEBAR.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.625rem 0.75rem', borderRadius: 'var(--r-sm)',
                color: 'var(--text-secondary)', textDecoration: 'none',
                fontSize: '0.875rem', transition: 'all var(--t-fast)',
              }} className={({ isActive }) => isActive ? 'dashboard-nav-active' : ''}>
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main style={{ flex: 1, padding: 'var(--sp-8)', background: 'var(--bg-base)', minHeight: 'calc(100vh - 3.5rem)' }}>
          <Outlet />
        </main>
      </div>
      <style>{`
        .dashboard-nav-active {
          background: rgba(16, 185, 129, 0.1) !important;
          color: var(--text-accent) !important;
          border: 1px solid var(--border);
        }
        .dashboard-nav-active svg { color: var(--text-accent); }
        .dashboard-back-link:hover { color: var(--text-accent) !important; }
        @media (max-width: 768px) {
          .dashboard-sidebar { display: none; }
        }
      `}</style>
    </div>
  );
}
