import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';
import { Briefcase, Users, GraduationCap, Plus, X } from 'lucide-react';

const TABS = [
  { key: 'jobs', label: 'Job Posts', icon: Briefcase },
  { key: 'applications', label: 'Applications', icon: Users },
  { key: 'graduates', label: 'Hire Graduates', icon: GraduationCap },
];

export default function EmployerDashboard() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [tab, setTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [graduates, setGraduates] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', department: 'Engineering', type: 'Full-time', location: 'Lagos / Remote', salary: '' });
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  useEffect(() => { api.employer.getJobs().then(setJobs); }, []);
  useEffect(() => { api.employer.getApplications(selectedJob).then(setApplications); }, [selectedJob]);
  useEffect(() => { api.employer.getGraduates().then(setGraduates); }, []);

  if (loading) return null;
  if (!user || user.role !== 'employer') return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  const handleCreateJob = () => {
    api.employer.createJob(form).then(job => {
      setJobs(prev => [job, ...prev]);
      setShowForm(false);
      setForm({ title: '', department: 'Engineering', type: 'Full-time', location: 'Lagos / Remote', salary: '' });
      showToast('Job posted');
    });
  };

  const handleStage = (id, stage) => {
    api.employer.updateStage(id, stage).then(() => {
      setApplications(prev => prev.map(a => a.id === id ? { ...a, stage } : a));
      showToast(`Application moved to ${stage}`);
    });
  };

  const stageBadge = (s) => {
    const m = { review: 'badge-gray', shortlist: 'badge-blue', interview: 'badge-yellow', offer: 'badge-em', rejected: 'badge-red', hired: 'badge-green' };
    return <span className={`badge ${m[s] || 'badge-gray'}`} style={{ fontSize: '0.7rem' }}>{s}</span>;
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: '6rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Employer Dashboard</h1>
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

        {tab === 'jobs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--sp-4)' }}>
              <button className="btn btn-primary btn-sm" onClick={() => setShowForm(true)}><Plus size={16} /> Post New Job</button>
            </div>

            {showForm && (
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-6)', marginBottom: 'var(--sp-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ fontWeight: 600 }}>New Job Post</h3>
                  <button className="btn btn-ghost btn-sm" onClick={() => setShowForm(false)}><X size={16} /></button>
                </div>
                <div className="admin-form" style={{ maxWidth: '100%' }}>
                  <div className="admin-form-row"><label>Job Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
                  <div className="admin-form-inline">
                    <div className="admin-form-row" style={{ flex: 1 }}><label>Department</label><select value={form.department} onChange={e => setForm({...form, department: e.target.value})}><option>Engineering</option><option>AI</option><option>Infrastructure</option><option>Security</option></select></div>
                    <div className="admin-form-row" style={{ flex: 1 }}><label>Type</label><select value={form.type} onChange={e => setForm({...form, type: e.target.value})}><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Graduate</option><option>Internship</option></select></div>
                  </div>
                  <div className="admin-form-inline">
                    <div className="admin-form-row" style={{ flex: 1 }}><label>Location</label><input value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
                    <div className="admin-form-row" style={{ flex: 1 }}><label>Salary Range</label><input value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} /></div>
                  </div>
                  <button className="admin-btn admin-btn-primary" onClick={handleCreateJob}>Post Job</button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {jobs.map(j => (
                <div key={j.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-4) var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', cursor: 'pointer' }}
                  onClick={() => { setSelectedJob(j.id); setTab('applications'); }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{j.title}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{j.department} · {j.type} · {j.location} · {j.salary}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{j.applicants} applicants</span>
                    <span className={`badge ${j.status === 'active' ? 'badge-em' : 'badge-gray'}`} style={{ fontSize: '0.7rem' }}>{j.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'applications' && (
          <div>
            {selectedJob && (
              <div style={{ marginBottom: 'var(--sp-4)' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Showing applications for: <strong style={{ color: 'var(--text-primary)' }}>{jobs.find(j => j.id === selectedJob)?.title}</strong>
                  <button className="btn btn-ghost btn-sm" style={{ marginLeft: '0.5rem' }} onClick={() => setSelectedJob(null)}>Clear filter</button>
                </p>
              </div>
            )}
            {applications.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--sp-10)' }}>No applications yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {applications.map(a => (
                  <div key={a.id} style={{ padding: 'var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>{a.avatar}</span>
                        <div>
                          <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{a.name}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.email} · {a.experience} experience</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Match: <strong>{a.matchScore}%</strong></span>
                        {stageBadge(a.stage)}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                      {['review', 'shortlist', 'interview', 'offer', 'hired', 'rejected'].map(s => (
                        <button key={s} className={`btn btn-ghost btn-sm ${a.stage === s ? 'btn-primary' : ''}`}
                          style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem', opacity: a.stage === s ? 1 : 0.6 }}
                          onClick={() => handleStage(a.id, s)}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'graduates' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {graduates.map(g => (
              <div key={g.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{g.avatar}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{g.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{g.program} · {g.grade} · Graduated {g.graduated}</p>
                    <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.25rem' }}>
                      {g.skills.map(s => <span key={s} className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>{s}</span>)}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {g.seeking ? (
                    <span className="badge badge-em" style={{ fontSize: '0.7rem' }}>Available</span>
                  ) : (
                    <span className="badge badge-gray" style={{ fontSize: '0.7rem' }}>Placed</span>
                  )}
                  <button className="btn btn-primary btn-sm" style={{ display: 'block', marginTop: '0.5rem' }} disabled={!g.seeking}>
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {toast && <div className="admin-toast success">{toast}</div>}
      </div>
    </div>
  );
}
