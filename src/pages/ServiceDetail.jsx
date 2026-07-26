import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import SectionReveal from '../components/UI/SectionReveal';
import { ArrowLeft } from 'lucide-react';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.services.getBySlug(slug).then(d => {
      setService(d);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--text-muted)' }}>Loading service...</div>;
  if (!service) return <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--text-muted)' }}>Service not found.</div>;

  const Icon = service.icon;

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem', position: 'relative', zIndex: 1 }}>
          <ArrowLeft size={16} /> Back to Services
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem', color: service.color }}>
          <Icon size={48} strokeWidth={1.5} />
        </div>
        <h1 className="page-hero-title">
          {service.title}
        </h1>
        <p className="page-hero-desc" style={{ color: service.color }}>
          {service.tagline}
        </p>
      </div>

      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section" style={{ maxWidth: 1000, margin: '0 auto', paddingTop: '4rem' }}>
          
          <SectionReveal>
            {service.video ? (
              <div style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '4rem', background: '#000' }}>
                <video src={service.video} controls autoPlay muted loop style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            ) : service.image ? (
              <img src={service.image} alt={service.title} style={{ width: '100%', height: 'auto', maxHeight: 600, objectFit: 'cover', borderRadius: 'var(--r-xl)', marginBottom: '4rem', border: '1px solid var(--border)' }} />
            ) : null}
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Overview</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                  {service.description}
                </p>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: service.content }} style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8 }} />
              </div>

              <div>
                <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-subtle)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>Technologies Used</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {service.tech.map(t => (
                      <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: service.color }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '2rem' }}>
                    Start a Project
                  </Link>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
