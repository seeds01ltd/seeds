import { useState, useEffect } from 'react';
import adminApi from '../AdminApi';

export default function AdminAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    adminApi.getAnalytics().then(d => setData(d.analytics));
  }, []);

  if (!data) return <div className="admin-empty"><p>Loading analytics...</p></div>;

  const cards = [
    { value: data.totalUsers, label: 'Total Users', color: '#818cf8' },
    { value: data.activeStudents, label: 'Active Students', color: '#34d399' },
    { value: data.instructors, label: 'Instructors', color: '#60a5fa' },
    { value: data.totalCourses, label: 'Courses', color: '#fbbf24' },
    { value: data.totalEnrollments, label: 'Total Enrollments', color: '#f87171' },
    { value: data.totalMedia, label: 'Media Assets', color: '#a78bfa' },
  ];

  return (
    <div>
      <div className="admin-card-header">
        <h2>Analytics</h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last updated: just now</span>
      </div>

      <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {cards.map(c => (
          <div key={c.label} className="admin-stat-card">
            <div className="stat-value" style={{ color: c.color }}>{c.value.toLocaleString()}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="admin-card">
          <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Revenue</h2>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-accent)', fontFamily: 'var(--font-heading)' }}>
            ₦{data.revenue.toLocaleString()}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            <span style={{ color: '#34d399' }}>+{data.growth}%</span> vs last quarter
          </p>
        </div>

        <div className="admin-card">
          <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Platform Health</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { label: 'Uptime', value: '99.97%', color: '#34d399' },
              { label: 'Avg. Session', value: '24m 12s', color: '#818cf8' },
              { label: 'Completion Rate', value: '68%', color: '#fbbf24' },
              { label: 'Active Today', value: `${Math.round(data.activeStudents * 0.3)} users`, color: '#60a5fa' },
            ].map(m => (
              <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{m.label}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: m.color }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
