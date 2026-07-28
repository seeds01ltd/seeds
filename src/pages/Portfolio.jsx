import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from '../components/UI/SectionReveal';
import api from '../api';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [active, setActive]     = useState('All');

  const industries = ['All', 'Healthcare', 'FinTech', 'Logistics', 'Manufacturing', 'Education', 'Web3'];

  useEffect(() => {
    api.portfolio.getAll().then(d => { setProjects(d); setLoading(false); });
  }, []);

  const filtered = active === 'All' ? projects : projects.filter(p => p.industry === active);

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <div className="page-hero-eyebrow">Case Studies</div>
        <h1 className="page-hero-title">
          Work that<br /><span style={{ background: 'linear-gradient(135deg,#818cf8,#60a5fa)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>defines industries</span>
        </h1>
        <p className="page-hero-desc">
          Real systems. Measurable outcomes. Every project tells the story of a complex problem solved with precision engineering.
        </p>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          {industries.map(ind => (
            <button
              key={ind}
              onClick={() => setActive(ind)}
              style={{
                padding: '0.4rem 1rem', borderRadius: 'var(--r-full)',
                border: '1px solid', fontSize: '0.85rem',
                fontFamily: 'var(--font-body)', fontWeight: 500,
                transition: 'all 0.2s',
                background: active === ind ? 'var(--indigo)' : 'transparent',
                borderColor: active === ind ? 'var(--indigo)' : 'var(--border)',
                color: active === ind ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section" style={{ paddingTop: '2rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Loading projects...</div>
          ) : (
            <div className="grid-2">
              {filtered.map((p, i) => (
                <SectionReveal key={p.slug} delay={i * 0.08}>
                  <Link to={`/portfolio/${p.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <div className="project-card" style={{ height: '100%' }}>
                      <div className="project-thumb" style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)`, height: 220, overflow: 'hidden' }}>
                        {p.image ? (
                          <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, opacity: 0.85 }} />
                        ) : (
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color }}>
                            <p.icon size={56} strokeWidth={1.5} />
                          </div>
                        )}
                        <div className="project-thumb-overlay" />
                        <span className="badge project-industry-tag" style={{ background: `${p.color}18`, borderColor: `${p.color}30`, color: p.color, border: `1px solid ${p.color}30` }}>
                          {p.industry}
                        </span>
                      </div>
                      <div className="project-body">
                        <div className="project-client">{p.client}</div>
                        <div className="project-title">{p.title}</div>
                        <div className="project-desc">{p.summary}</div>
                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', margin: '0.5rem 0' }}>
                          {(p.tech || []).map(t => (
                            <span key={t} style={{ padding: '0.18rem 0.5rem', borderRadius: 4, background: 'var(--bg-raised)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="project-metrics">
                          {(p.results || []).map((r, ri) => (
                            <div key={ri}>
                              <div className="project-metric-val" style={{ color: p.color }}>{r.metric}</div>
                              <div className="project-metric-label">{r.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
