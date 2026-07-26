import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../data/db';
import { courses } from '../data/courses';
import SectionReveal from '../components/UI/SectionReveal';

export default function Profile() {
  const { user, loading, logout, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) { setName(user.name); setBio(user.bio || ''); }
  }, [user]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" state={{ from: '/profile' }} replace />;

  const enrolledSlugs = db.getEnrolledCourses();
  const enrollments = enrolledSlugs.map(slug => {
    const course = courses.find(c => c.slug === slug);
    const p = db.getProgress(slug);
    return {
      slug,
      title: course?.title || slug,
      progress: p.progress || 0,
      completed: p.completed?.length || 0,
    };
  });
  const completedCount = enrollments.filter(e => e.progress === 100).length;
  const totalLessons = enrollments.reduce((s, e) => s + e.completed, 0);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({ name, bio });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <SectionReveal>
          <h1 className="page-hero-title">Profile</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>Manage your account and track your progress</p>
        </SectionReveal>
      </div>
      <div className="content-sections">
        <section style={{ padding: 'var(--sp-16) 0' }}>
          <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)' }}>
            <div className="admin-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--sp-6)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem' }}>Account</h2>
                <button className="btn btn-ghost btn-sm" onClick={() => setEditing(!editing)}>
                  {editing ? 'Cancel' : 'Edit'}
                </button>
              </div>
              <div style={{ display: 'flex', gap: 'var(--sp-6)', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '3rem', lineHeight: 1 }}>{user.avatar || '👤'}</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                  {editing ? (
                    <>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} style={{ padding: '0.625rem 0.75rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-primary)', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Bio</label>
                        <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} style={{ padding: '0.625rem 0.75rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-primary)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', resize: 'vertical' }} />
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
                          {saving ? 'Saving...' : 'Save'}
                        </button>
                        {saved && <span style={{ fontSize: '0.8125rem', color: 'var(--text-accent)', alignSelf: 'center' }}>Saved!</span>}
                      </div>
                    </>
                  ) : (
                    <>
                      <p style={{ fontSize: '1.125rem', fontWeight: 600 }}>{user.name}</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{user.email}</p>
                      {user.bio && <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{user.bio}</p>}
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                        <span className="badge badge-indigo">{user.role}</span>
                        {user.verified ? (
                          <span className="badge badge-em">Verified</span>
                        ) : (
                          <Link to={`/verify-email?userId=${user.id}`} className="badge" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', textDecoration: 'none' }}>Unverified</Link>
                        )}
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Joined {new Date(user.joined).toLocaleDateString()}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="admin-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-8)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', marginBottom: 'var(--sp-6)' }}>Learning Progress</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'var(--sp-4)', marginBottom: 'var(--sp-6)' }}>
                <div style={{ background: 'var(--bg-raised)', borderRadius: 'var(--r-sm)', padding: 'var(--sp-4)', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-accent)' }}>{enrollments.length}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enrolled</p>
                </div>
                <div style={{ background: 'var(--bg-raised)', borderRadius: 'var(--r-sm)', padding: 'var(--sp-4)', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-accent)' }}>{completedCount}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Completed</p>
                </div>
                <div style={{ background: 'var(--bg-raised)', borderRadius: 'var(--r-sm)', padding: 'var(--sp-4)', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-accent)' }}>{totalLessons}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Lessons Done</p>
                </div>
              </div>
              {enrollments.length === 0 ? (
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No courses yet. <Link to="/courses" style={{ color: 'var(--text-accent)' }}>Browse courses</Link></p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                  {enrollments.map(enr => (
                    <Link key={enr.slug} to={`/courses/${enr.slug}`} style={{ textDecoration: 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-3) var(--sp-4)', background: 'var(--bg-raised)', borderRadius: 'var(--r-sm)', gap: 'var(--sp-4)' }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>{enr.title}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                          <div style={{ width: 100, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                            <div style={{ width: `${enr.progress}%`, height: '100%', background: 'var(--text-accent)', borderRadius: 3 }} />
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', minWidth: 32, textAlign: 'right' }}>{enr.progress}%</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button className="btn btn-ghost" onClick={logout} style={{ alignSelf: 'flex-start' }}>
              Sign Out
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
