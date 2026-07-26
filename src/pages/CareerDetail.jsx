import { useParams, Link } from 'react-router-dom';
import { getBySlug } from '../data/careers';
import { ArrowLeft, MapPin, Briefcase, Clock, Check } from 'lucide-react';

export default function CareerDetail() {
  const { slug } = useParams();
  const job = getBySlug(slug);

  if (!job) {
    return (
      <div className="page-wrapper" style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Position not found</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>This role may have been filled or the link is incorrect.</p>
        <Link to="/careers" className="btn btn-primary">View All Roles</Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <Link to="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Careers
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span className="badge badge-indigo">{job.type}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <Briefcase size={14} /> {job.department}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <MapPin size={14} /> {job.location}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <Clock size={14} /> Posted {job.posted}
          </span>
        </div>
        <h1 className="page-hero-title">{job.title}</h1>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--indigo-light)' }}>{job.salary}</span>
        </div>
      </div>

      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section" style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '3rem' }}>
            <div>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                {job.description}
              </p>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Requirements</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {job.requirements.map(r => (
                  <li key={r} style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    <Check size={18} style={{ color: 'var(--emerald-light)', flexShrink: 0, marginTop: '0.2rem' }} />
                    {r}
                  </li>
                ))}
              </ul>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Benefits</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {job.benefits.map(b => (
                  <li key={b} style={{ display: 'flex', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    <Check size={18} style={{ color: 'var(--emerald-light)', flexShrink: 0, marginTop: '0.2rem' }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-subtle)', position: 'sticky', top: '6rem' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>Apply for this role</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Send your CV and a brief cover letter. We aim to respond within 5 business days.
                </p>
                <a href="mailto:careers@seed.dev?subject=Application: ${job.title}" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Apply Now
                </a>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.75rem' }}>
                  careers@seed.dev
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
