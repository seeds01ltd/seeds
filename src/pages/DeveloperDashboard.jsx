import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';
import { CheckSquare, Sprout, GitBranch, GitPullRequest, Clock } from 'lucide-react';

const TABS = [
  { key: 'tasks', label: 'Tasks', icon: CheckSquare },
  { key: 'sprints', label: 'Sprints', icon: Sprout },
  { key: 'repos', label: 'Repos', icon: GitBranch },
  { key: 'reviews', label: 'Code Reviews', icon: GitPullRequest },
  { key: 'time', label: 'Time Tracking', icon: Clock },
];

export default function DeveloperDashboard() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [tab, setTab] = useState('tasks');
  const [tasks, setTasks] = useState([]);
  const [sprints, setSprints] = useState([]);
  const [repos, setRepos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => { api.developer.getTasks().then(setTasks); }, []);
  useEffect(() => { api.developer.getSprints().then(setSprints); }, []);
  useEffect(() => { api.developer.getRepos().then(setRepos); }, []);
  useEffect(() => { api.developer.getCodeReviews().then(setReviews); }, []);
  useEffect(() => { api.developer.getTimeEntries().then(setTime); }, []);

  if (loading) return null;
  if (!user || user.role !== 'developer') return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  const badge = (s) => {
    const m = { 'in-progress': 'badge-blue', done: 'badge-em', todo: 'badge-gray', high: 'badge-red', medium: 'badge-yellow', low: 'badge-gray', approved: 'badge-em', 'changes-requested': 'badge-red', pending: 'badge-yellow' };
    return <span className={`badge ${m[s] || 'badge-gray'}`} style={{ fontSize: '0.7rem' }}>{s}</span>;
  };

  const totalHours = time.reduce((s, t) => s + t.hours, 0);

  return (
    <div className="page-wrapper" style={{ paddingTop: '6rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Developer Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 'var(--sp-8)' }}>Welcome, {user.name}</p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 'var(--sp-8)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
              background: tab === t.key ? 'var(--bg-card)' : 'transparent',
              border: tab === t.key ? '1px solid var(--border)' : '1px solid transparent',
              borderRadius: 'var(--r-sm)  var(--r-sm) 0 0', color: tab === t.key ? 'var(--text-primary)' : 'var(--text-muted)',
              cursor: 'pointer', fontSize: '0.8125rem', fontFamily: 'var(--font-body)',
              borderBottom: tab === t.key ? '1px solid var(--bg-base)' : '1px solid transparent',
              marginBottom: '-0.5rem',
            }}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'tasks' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {tasks.map(t => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-4) var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <p style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{t.title}</p>
                    {badge(t.priority)}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.project} · {t.sprint} · Due {t.due}</p>
                </div>
                {badge(t.status)}
              </div>
            ))}
          </div>
        )}

        {tab === 'sprints' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sprints.map(s => (
              <div key={s.id} style={{ padding: 'var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{s.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.project}</p>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{s.startDate} → {s.endDate}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ flex: 1, maxWidth: 300, height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${s.totalTasks > 0 ? (s.completedTasks / s.totalTasks) * 100 : 0}%`, height: '100%', background: 'var(--indigo-light)', borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{s.completedTasks}/{s.totalTasks}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Velocity: {s.velocity}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'repos' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {repos.map(r => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-4) var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                <div>
                  <p style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{r.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.language} · ⭐ {r.stars} · 🍴 {r.forks} · {r.prsOpen} open PRs</p>
                </div>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Last commit: {r.lastCommit}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {reviews.map(r => (
              <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-4) var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                <div>
                  <p style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{r.title}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.repo} · by {r.author} · {r.created}</p>
                </div>
                {badge(r.status)}
              </div>
            ))}
          </div>
        )}

        {tab === 'time' && (
          <div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-5)', marginBottom: 'var(--sp-4)' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Total Hours Logged</p>
              <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-accent)' }}>{totalHours}h</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {time.map(t => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-4) var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                  <div>
                    <p style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{t.description}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.project} · {t.date}</p>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-accent)' }}>{t.hours}h</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
