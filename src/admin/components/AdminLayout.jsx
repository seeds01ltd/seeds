import { Outlet } from 'react-router-dom';
import { useAdmin } from '../AdminContext';
import Sidebar from './Sidebar';

export default function AdminLayout() {
  const { user, logout } = useAdmin();

  return (
    <div className="admin-wrapper">
      <Sidebar onLogout={logout} />
      <div className="admin-main">
        <header className="admin-topbar">
          <h1>Dashboard</h1>
          <div className="admin-topbar-user">
            <span>{user?.name}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
              {user?.role}
            </span>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}