import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '../AdminApi';
import { badgeClass } from '../constants';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState({ contacts: [], quotes: [] });

  useEffect(() => {
    Promise.all([
      adminApi.getServices({ limit: '1' }),
      adminApi.getProjects({ limit: '1' }),
      adminApi.getPosts({ limit: '1' }),
      adminApi.getTeam(),
      adminApi.getContacts({ limit: '5' }),
      adminApi.getQuotes({ limit: '5' }),
      adminApi.getCourses(),
      adminApi.getUsers(),
      adminApi.getAnalytics(),
    ]).then(([services, projects, posts, team, contacts, quotes, courses, users, analytics]) => {
      setStats({
        services: services.services?.length || 0,
        projects: projects.projects?.length || 0,
        posts: posts.posts?.length || 0,
        team: team.members?.length || 0,
        contacts: contacts.contacts?.length || 0,
        quotes: quotes.quotes?.length || 0,
        courses: courses.courses?.length || 0,
        users: users.users?.length || 0,
        revenue: analytics.analytics?.revenue || 0,
      });
      setRecent({
        contacts: contacts.contacts || [],
        quotes: quotes.quotes || [],
      });
    }).catch(() => {});
  }, []);

  if (!stats) return <div className="admin-empty"><p>Loading dashboard...</p></div>;

  const statCards = [
    { value: stats.users, label: 'Users', link: '/admin/users', color: '#818cf8' },
    { value: stats.courses, label: 'Courses', link: '/admin/courses', color: '#34d399' },
    { value: stats.services, label: 'Services', link: '/admin/services', color: '#60a5fa' },
    { value: stats.projects, label: 'Projects', link: '/admin/portfolio', color: '#fbbf24' },
    { value: stats.posts, label: 'Blog Posts', link: '/admin/blog', color: '#a78bfa' },
    { value: `₦${(stats.revenue / 1000).toFixed(0)}k`, label: 'Revenue', link: '/admin/analytics', color: '#f87171' },
  ];

  return (
    <div>
      <div className="admin-stats-grid">
        {statCards.map(s => (
          <Link key={s.label} to={s.link} style={{ textDecoration: 'none' }}>
            <div className="admin-stat-card" style={{ cursor: 'pointer' }}>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="admin-card">
          <div className="admin-card-header">
            <h2>Recent Contacts</h2>
            <Link to="/admin/contacts" className="admin-btn admin-btn-secondary" style={{ fontSize: '0.75rem' }}>View All</Link>
          </div>
          {recent.contacts.length === 0 ? (
            <div className="admin-empty"><p>No contacts yet</p></div>
          ) : (
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Email</th><th>Status</th></tr></thead>
              <tbody>
                {recent.contacts.map(c => (
                  <tr key={c.id}><td>{c.name}</td><td style={{ color:'var(--text-muted)' }}>{c.email}</td><td><span className={badgeClass(c.status)}>{c.status}</span></td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h2>Recent Quotes</h2>
            <Link to="/admin/quotes" className="admin-btn admin-btn-secondary" style={{ fontSize: '0.75rem' }}>View All</Link>
          </div>
          {recent.quotes.length === 0 ? (
            <div className="admin-empty"><p>No quotes yet</p></div>
          ) : (
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Service</th><th>Status</th></tr></thead>
              <tbody>
                {recent.quotes.map(q => (
                  <tr key={q.id}><td>{q.name}</td><td style={{ color:'var(--text-muted)' }}>{q.service}</td><td><span className={badgeClass(q.status)}>{q.status}</span></td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}