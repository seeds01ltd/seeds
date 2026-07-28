import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';
import { Briefcase, Milestone, CheckSquare, FileText, FileSignature, Receipt } from 'lucide-react';

const TABS = [
  { key: 'projects', label: 'Projects', icon: Briefcase },
  { key: 'milestones', label: 'Milestones', icon: Milestone },
  { key: 'tasks', label: 'Tasks', icon: CheckSquare },
  { key: 'files', label: 'Files', icon: FileText },
  { key: 'contracts', label: 'Contracts', icon: FileSignature },
  { key: 'invoices', label: 'Invoices', icon: Receipt },
];

export default function ClientDashboard() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [files, setFiles] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => { api.client.getProjects().then(setProjects); }, []);
  useEffect(() => { api.client.getMilestones().then(setMilestones); }, []);
  useEffect(() => { api.client.getTasks().then(setTasks); }, []);
  useEffect(() => { api.client.getFiles().then(setFiles); }, []);
  useEffect(() => { api.client.getContracts().then(setContracts); }, []);
  useEffect(() => { api.client.getInvoices().then(setInvoices); }, []);

  if (loading) return null;
  if (!user || user.role !== 'client') return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  const statusBadge = (s) => {
    const m = { active: 'badge-em', completed: 'badge-indigo', pending: 'badge-yellow', 'in-progress': 'badge-blue', done: 'badge-em', todo: 'badge-gray', paid: 'badge-em', high: 'badge-red', medium: 'badge-yellow', low: 'badge-gray' };
    return <span className={`badge ${m[s] || 'badge-gray'}`} style={{ fontSize: '0.7rem' }}>{s}</span>;
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: '6rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Client Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 'var(--sp-8)' }}>Welcome, {user.name}</p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 'var(--sp-8)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
              background: tab === t.key ? 'var(--bg-card)' : 'transparent',
              border: tab === t.key ? '1px solid var(--border)' : '1px solid transparent',
              borderRadius: 'var(--r-sm)  var(--r-sm) 0 0', color: tab === t.key ? 'var(--text-primary)' : 'var(--text-muted)',
              cursor: 'pointer', fontSize: '0.8125rem', fontFamily: 'var(--font-body)', borderBottom: tab === t.key ? '1px solid var(--bg-base)' : '1px solid transparent',
              marginBottom: '-0.5rem',
            }}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            {projects.map(p => (
              <div key={p.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontWeight: 600, fontSize: '1.05rem' }}>{p.title}</h3>
                  {statusBadge(p.status)}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{p.description}</p>
                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  <span>Budget: <strong style={{ color: 'var(--text-primary)' }}>₦{(p.budget || 0).toLocaleString()}</strong></span>
                  <span>Spent: <strong style={{ color: 'var(--text-primary)' }}>₦{(p.spent || 0).toLocaleString()}</strong></span>
                  <span>Manager: {p.manager}</span>
                  <span>Deadline: {p.deadline}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ flex: 1, maxWidth: 300, height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${p.progress || 0}%`, height: '100%', background: (p.progress || 0) === 100 ? 'var(--emerald-light)' : 'var(--indigo-light)', borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{p.progress || 0}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'milestones' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {milestones.map(m => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-4) var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                <div>
                  <p style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{m.title}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Due {m.due}</p>
                </div>
                {statusBadge(m.status)}
              </div>
            ))}
          </div>
        )}

        {tab === 'tasks' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {tasks.map(t => (
              <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-4) var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <p style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{t.title}</p>
                    {statusBadge(t.priority)}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.assignee} · Due {t.due}</p>
                </div>
                {statusBadge(t.status)}
              </div>
            ))}
          </div>
        )}

        {tab === 'files' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {files.map(f => (
              <div key={f.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-4) var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                <div>
                  <p style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{f.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.size} · Uploaded {f.uploaded} by {f.uploadedBy}</p>
                </div>
                <button className="btn btn-ghost btn-sm" disabled>Download</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'contracts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {contracts.map(c => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-4) var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                <div>
                  <p style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{c.title}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Signed {c.signed} · ₦{(c.value || 0).toLocaleString()} · {c.type}</p>
                </div>
                {statusBadge(c.status)}
              </div>
            ))}
          </div>
        )}

        {tab === 'invoices' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {invoices.map(i => (
              <div key={i.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-4) var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                <div>
                  <p style={{ fontWeight: 500, fontSize: '0.9375rem' }}>{i.number}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Issued {i.issued} · Due {i.due} · <strong>₦{(i.amount || 0).toLocaleString()}</strong></p>
                </div>
                {statusBadge(i.status)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
