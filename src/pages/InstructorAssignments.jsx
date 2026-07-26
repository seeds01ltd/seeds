import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';
import { ClipboardCheck, ChevronDown, ChevronUp, CheckCircle, XCircle } from 'lucide-react';

export default function InstructorAssignments() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [submissions, setSubmissions] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    api.instructor.getAssignments(user.id).then(setAssignments);
  }, [user.id]);

  const loadSubmissions = async (id) => {
    if (submissions[id]) return;
    const data = await api.instructor.getSubmissions(id);
    setSubmissions(prev => ({ ...prev, [id]: data }));
  };

  const handleExpand = (id) => {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    loadSubmissions(id);
  };

  const handleGrade = async (subId, grade) => {
    await api.instructor.gradeSubmission(subId, grade, 'Graded by instructor');
    setSubmissions(prev => ({
      ...prev,
      [expanded]: prev[expanded].map(s => s.id === subId ? { ...s, grade } : s),
    }));
    showToast(`Grade saved: ${grade}%`);
  };

  const statusBadge = (status) => {
    const styles = { open: 'badge-em', grading: 'badge-indigo', closed: '' };
    return <span className={`badge ${styles[status] || ''}`} style={{ fontSize: '0.7rem' }}>{status}</span>;
  };

  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Assignments</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-8)' }}>
        {assignments.length} total
      </p>

      {assignments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--sp-16)', color: 'var(--text-muted)' }}>
          <ClipboardCheck size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <p>No assignments yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
          {assignments.map(a => (
            <div key={a.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-5)', cursor: 'pointer' }}
                onClick={() => handleExpand(a.id)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{a.title}</p>
                    {statusBadge(a.status)}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>
                    {a.courseTitle} · Due {a.due} · {a.submitted}/{a.totalStudents} submitted
                  </p>
                </div>
                {expanded === a.id ? <ChevronUp size={18} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />}
              </div>

              {expanded === a.id && (
                <div style={{ borderTop: '1px solid var(--border)', padding: 'var(--sp-5)' }}>
                  {(!submissions[a.id] || submissions[a.id].length === 0) ? (
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No submissions yet.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {submissions[a.id].map(sub => (
                        <div key={sub.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-raised)', borderRadius: 'var(--r-sm)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontSize: '1.25rem' }}>{sub.studentAvatar}</span>
                            <div>
                              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{sub.studentName}</p>
                              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Submitted {sub.submittedAt}</p>
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {sub.grade !== null ? (
                              <span className={`badge ${sub.grade >= 70 ? 'badge-em' : sub.grade >= 50 ? 'badge-yellow' : 'badge-red'}`} style={{ fontSize: '0.7rem' }}>
                                {sub.grade}%
                              </span>
                            ) : (
                              <>
                                {[100, 85, 70, 60, 50, 0].map(g => (
                                  <button key={g} className="btn btn-ghost btn-sm" style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem' }} onClick={() => handleGrade(sub.id, g)}>
                                    {g === 0 ? <XCircle size={14} /> : g}%
                                  </button>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {toast && <div className="admin-toast success">{toast}</div>}
    </>
  );
}
