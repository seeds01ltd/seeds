import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from '../components/UI/SectionReveal';
import api from '../api';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.services.getAll().then(d => { setServices(d); setLoading(false); });
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <div className="glow-blob glow-blob-indigo" style={{ width: 500, height: 400, top: '-10%', right: '0', opacity: 0.2 }} />
        <div className="page-hero-eyebrow">What We Do</div>
        <h1 className="page-hero-title">
          Engineering at<br /><span style={{ background: 'linear-gradient(135deg,#818cf8,#60a5fa)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>every layer</span>
        </h1>
        <p className="page-hero-desc">
          Eight specialised practice areas. Senior engineers. Obsessive craft.
          Each discipline is a standalone centre of excellence with deep domain expertise.
        </p>
      </div>

      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section" style={{ paddingTop: '2rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Loading services...</div>
          ) : (
            <div className="grid-auto">
              {services.map((svc, i) => (
                <SectionReveal key={svc.slug} delay={i * 0.07}>
                  <Link to={`/services/${svc.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <div className="service-card" style={{ height: '100%' }}>
                      <div className="service-icon" style={{ background: `${svc.color}15`, borderColor: `${svc.color}25`, color: svc.color }}>
                        <svc.icon size={28} strokeWidth={1.5} />
                      </div>
                      <div className="service-title">{svc.title}</div>
                      <div className="service-desc">{svc.description}</div>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {svc.tech.map(t => (
                          <span key={t} style={{ padding: '0.18rem 0.5rem', borderRadius: 4, background: 'var(--bg-raised)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="service-link">Explore Service →</span>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          )}

          {/* CTA */}
          <SectionReveal>
            <div style={{ marginTop: '4rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Don't see what you need?</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Tell us about your challenge. Our engineers thrive on problems others avoid.</p>
              </div>
              <Link to="/contact" className="btn btn-primary btn-lg">Talk to an Engineer</Link>
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
