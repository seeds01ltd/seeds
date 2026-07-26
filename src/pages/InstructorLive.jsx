import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';
import { Video, Calendar, Clock, Users } from 'lucide-react';

export default function InstructorLive() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    api.instructor.getLiveClasses(user.id).then(setClasses);
  }, [user.id]);

  const upcoming = classes.filter(l => l.status === 'upcoming');
  const completed = classes.filter(l => l.status === 'completed');

  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Live Classes</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-8)' }}>
        Schedule and manage live sessions
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-6)' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-6)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--sp-4)' }}>Upcoming</h2>
          {upcoming.length === 0 ? (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No upcoming classes scheduled.</p>
          ) : upcoming.map(l => (
            <div key={l.id} style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{l.title}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {l.course}
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span><Calendar size={12} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />{l.date}</span>
                <span><Clock size={12} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />{l.time} · {l.duration}</span>
                <span><Users size={12} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />{l.enrolled} enrolled</span>
              </div>
            </div>
          ))}
          <button className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }} disabled>Schedule Class</button>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-6)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--sp-4)' }}>Past Classes</h2>
          {completed.length === 0 ? (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No completed classes yet.</p>
          ) : completed.map(l => (
            <div key={l.id} style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{l.title}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {l.course} · {l.date} · {l.duration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
