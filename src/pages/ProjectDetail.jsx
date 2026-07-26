import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import SectionReveal from '../components/UI/SectionReveal';
import { ArrowLeft } from 'lucide-react';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.portfolio.getBySlug(slug).then(d => {
      setProject(d);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--text-muted)' }}>Loading project...</div>;
  if (!project) return <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--text-muted)' }}>Project not found.</div>;

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '4rem' }}>
        <div className="grid-bg" />
        <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem', position: 'relative', zIndex: 1 }}>
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
        <div style={{ marginBottom: '1rem' }}>
          <span className="badge" style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
            {project.industry}
          </span>
        </div>
        <h1 className="page-hero-title" style={{ maxWidth: 800, margin: '0 auto' }}>
          {project.title}
        </h1>
        <p className="page-hero-desc" style={{ maxWidth: 600, margin: '1.5rem auto 0' }}>
          {project.summary}
        </p>
      </div>

      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section" style={{ maxWidth: 1000, margin: '0 auto', paddingTop: '2rem' }}>
          
          <SectionReveal>
            {project.image && (
              <img src={project.image} alt={project.title} style={{ width: '100%', height: 'auto', maxHeight: 600, objectFit: 'cover', borderRadius: 'var(--r-xl)', marginBottom: '4rem', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} />
            )}
          </SectionReveal>

          <SectionReveal delay={0.1}>
            {/* Metrics block */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
              {project.results.map((r, i) => (
                <div key={i} style={{ background: 'var(--bg-raised)', padding: '2rem', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: project.color, marginBottom: '0.5rem' }}>{r.metric}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.label}</div>
                </div>
              ))}
            </div>

            <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem' }}>
              <div>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: project.content }} style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }} />
              </div>

              <div>
                <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-subtle)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Client</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{project.client}</p>

                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>Tech Stack</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.tech.map(t => (
                      <span key={t} style={{ padding: '0.3rem 0.75rem', borderRadius: 4, background: 'var(--bg-raised)', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
