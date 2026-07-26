import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';
import SectionReveal from '../components/UI/SectionReveal';
import { ArrowLeft } from 'lucide-react';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.blog.getBySlug(slug).then(d => {
      setPost(d);
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--text-muted)' }}>Loading article...</div>;
  if (!post) return <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--text-muted)' }}>Article not found.</div>;

  return (
    <div className="page-wrapper">
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '10rem 2rem 5rem' }}>
        <SectionReveal>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span className="badge badge-indigo">{post.category}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{post.readTime}</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '2rem', letterSpacing: '-0.03em' }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, var(--indigo), var(--cobalt))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-heading)' }}>
              {post.authorInitials}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>{post.author}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{post.date}</div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          {post.image && (
            <img src={post.image} alt={post.title} style={{ width: '100%', height: 'auto', maxHeight: 500, objectFit: 'cover', borderRadius: 'var(--r-xl)', marginBottom: '4rem', border: '1px solid var(--border)' }} />
          )}
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div 
            className="article-content" 
            dangerouslySetInnerHTML={{ __html: post.content }} 
            style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}
          />
        </SectionReveal>
      </div>
    </div>
  );
}
