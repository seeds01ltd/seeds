import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';
import { Users, Search, Mail } from 'lucide-react';

export default function InstructorStudents() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.instructor.getStudents(user.id).then(setStudents);
  }, [user.id]);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const progressColor = (p) => p >= 80 ? '#34d399' : p >= 40 ? '#fbbf24' : '#f87171';

  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Students</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-6)' }}>
        {students.length} enrolled students
      </p>

      <div style={{ position: 'relative', maxWidth: 400, marginBottom: 'var(--sp-6)' }}>
        <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          placeholder="Search students..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '0.625rem 0.75rem 0.625rem 2.5rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-primary)', fontSize: '0.875rem', fontFamily: 'var(--font-body)' }}
        />
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--sp-16)', color: 'var(--text-muted)' }}>
          <Users size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <p>No students found</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
          {filtered.map(s => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-5)' }}>
              <span style={{ fontSize: '2rem' }}>{s.avatar}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{s.name}</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last active: {s.lastActive}</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  <Mail size={12} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />
                  {s.email} · Enrolled {s.enrolled} · {s.courses.length} course{s.courses.length > 1 ? 's' : ''}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ flex: 1, maxWidth: 300, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${s.overallProgress}%`, height: '100%', background: progressColor(s.overallProgress), borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', minWidth: 32 }}>{s.overallProgress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
