import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, BookOpen, Users, ClipboardCheck, DollarSign, Video } from 'lucide-react';

const SIDEBAR = [
  { to: '/instructor', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/instructor/courses', label: 'My Courses', icon: BookOpen },
  { to: '/instructor/students', label: 'Students', icon: Users },
  { to: '/instructor/assignments', label: 'Assignments', icon: ClipboardCheck },
  { to: '/instructor/revenue', label: 'Revenue', icon: DollarSign },
  { to: '/instructor/live', label: 'Live Classes', icon: Video },
];

export default function Instructor() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user || user.role !== 'instructor') return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  return (
    <div className="page-wrapper" style={{ paddingTop: 0 }}>
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 3.5rem)' }}>
        <aside style={{
          width: 240, flexShrink: 0, borderRight: '1px solid var(--border)',
          background: 'var(--bg-surface)', padding: 'var(--sp-6) 0',
          position: 'sticky', top: '3.5rem', alignSelf: 'flex-start', height: 'calc(100vh - 3.5rem)',
          overflowY: 'auto',
        }}>
          <div style={{ padding: '0 var(--sp-4)', marginBottom: 'var(--sp-4)' }}>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 500 }}>Instructor</p>
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
    </div>
  );
}
