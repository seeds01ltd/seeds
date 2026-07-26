import { useAuth } from '../contexts/AuthContext';
import { getCertificates } from '../data/db';
import { Link } from 'react-router-dom';
import { Award, Download } from 'lucide-react';

export default function DashboardCertificates() {
  const { user } = useAuth();
  const certs = getCertificates(user.id);

  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Certificates</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-8)' }}>
        {certs.length} certificate{certs.length !== 1 ? 's' : ''} earned
      </p>

      {certs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--sp-16)', color: 'var(--text-muted)' }}>
          <Award size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>No certificates yet</p>
          <p style={{ fontSize: '0.875rem', marginBottom: 'var(--sp-6)' }}>Complete a course to earn your first certificate</p>
          <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--sp-4)' }}>
          {certs.map(cert => (
            <div key={cert.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-6)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <Award size={40} style={{ color: '#fbbf24', marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{cert.courseTitle}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Issued {new Date(cert.issuedAt).toLocaleDateString()} · {cert.certId}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <Link to={`/courses/${cert.courseSlug}`} className="btn btn-secondary btn-sm">View Course</Link>
                <button className="btn btn-ghost btn-sm" disabled><Download size={14} /> PDF</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
