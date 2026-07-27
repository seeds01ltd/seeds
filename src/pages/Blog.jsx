import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from '../components/UI/SectionReveal';
import api from '../api';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.blog.getAll().then(d => { setPosts(d); setLoading(false); });
  }, []);

  const [featured, ...rest] = posts;

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <div className="page-hero-eyebrow">Engineering Blog</div>
        <h1 className="page-hero-title">
          Ideas from the<br /><span style={{ background: 'linear-gradient(135deg,#34d399,#6ee7b7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>engineering floor</span>
        </h1>
        <p className="page-hero-desc">
          Depth-first technical writing from senior engineers. No thought leadership — just craft.
        </p>
      </div>

      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section" style={{ paddingTop: '1rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Loading posts...</div>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <SectionReveal>
                  <Link to={`/blog/${featured.slug}`} style={{ textDecoration: 'none' }}>
                    <div
                      className="blog-card"
                      style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', marginBottom: '3rem', display: 'flex', gap: '0', alignItems: 'stretch', transition: 'all var(--t-med)', flexWrap: 'wrap', overflow: 'hidden' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                      {/* Featured image */}
                      <div style={{ width: 340, maxWidth: '100%', flexShrink: 0, minHeight: 280, overflow: 'hidden', position: 'relative' }}>
                        {featured.image ? (
                          <img
                            src={featured.image}
                            alt={featured.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(4,120,87,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}>
                            💡
                          </div>
                        )}
                      </div>

                      {/* Featured content */}
                      <div style={{ flex: 1, minWidth: 280, padding: '3rem' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                          <span className="badge badge-indigo">Featured</span>
                          <span className="badge badge-violet">{featured.category}</span>
                        </div>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                          {featured.title}
                        </h2>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
                          {featured.excerpt}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--indigo), var(--cobalt))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-heading)', flexShrink: 0 }}>
                            {featured.authorInitials}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{featured.author}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{featured.date} · {featured.readTime}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SectionReveal>
              )}

              {/* Rest of posts */}
              <div className="grid-3">
                {rest.map((post, i) => (
                  <SectionReveal key={post.slug} delay={i * 0.08}>
                    <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                      <div className="blog-card" style={{ height: '100%', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        {/* Thumbnail */}
                        {post.image && (
                          <div style={{ height: 200, width: '100%', overflow: 'hidden', borderBottom: '1px solid var(--border-subtle)', flexShrink: 0 }}>
                            <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
                          </div>
                        )}
                        {/* Card body */}
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <div className="blog-header" style={{ marginBottom: '1rem' }}>
                            <span className="badge badge-indigo">{post.category}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{post.readTime}</span>
                          </div>
                          <div className="blog-body">
                            <div className="blog-title">{post.title}</div>
                            <div className="blog-excerpt">{post.excerpt}</div>
                            <div className="blog-footer">
                              <div className="blog-avatar">{post.authorInitials}</div>
                              <div>
                                <div className="blog-author-name">{post.author}</div>
                                <div className="blog-read-time">{post.date}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SectionReveal>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
