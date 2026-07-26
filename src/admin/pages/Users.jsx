import { useState, useEffect } from 'react';
import adminApi from '../AdminApi';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    adminApi.getUsers().then(d => { setUsers(d.users || []); setLoading(false); });
  }, []);

  const handleRoleChange = (user, newRole) => {
    adminApi.updateUser(user.id, { role: newRole }).then(() => {
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: newRole } : u));
      showToast(`${user.name} role changed to ${newRole}`);
    });
  };

  const handleStatusToggle = (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    adminApi.updateUser(user.id, { status: newStatus }).then(() => {
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
      showToast(`${user.name} ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
    });
  };

  const handleDelete = (user) => {
    if (!window.confirm(`Delete user "${user.name}"?`)) return;
    adminApi.deleteUser(user.id).then(() => {
      setUsers(prev => prev.filter(u => u.id !== user.id));
      showToast('User deleted');
    });
  };

  if (loading) return <div className="admin-empty"><p>Loading...</p></div>;

  return (
    <div>
      <div className="admin-card-header">
        <h2>Users ({users.length})</h2>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Joined</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>{u.avatar || '👤'}</span>
                  <span style={{ fontWeight: 500 }}>{u.name}</span>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{u.email}</td>
                <td>
                  <select value={u.role} onChange={e => handleRoleChange(u, e.target.value)} className="admin-form-row" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-primary)' }}>
                    <option>student</option><option>instructor</option><option>admin</option>
                  </select>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{u.joined}</td>
                <td><span className={`admin-badge ${u.status === 'active' ? 'admin-badge-green' : 'admin-badge-red'}`}>{u.status}</span></td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn admin-btn-secondary btn-sm" onClick={() => handleStatusToggle(u)}>
                      {u.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="admin-btn admin-btn-danger btn-sm" onClick={() => handleDelete(u)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast && <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}
