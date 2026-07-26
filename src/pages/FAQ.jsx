import { useState } from 'react';
import { faqCategories } from '../data/faq';
import SectionReveal from '../components/UI/SectionReveal';
import { Search, ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [openCategory, setOpenCategory] = useState(faqCategories[0]?.title);
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (catTitle, q) => {
    const key = `${catTitle}::${q}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const allItems = faqCategories.flatMap(c => c.items);
  const filtered = search
    ? allItems.filter(item =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div className="grid-bg" />
        <div className="glow-blob glow-blob-indigo" style={{ width: 500, height: 400, top: '-10%', right: '0', opacity: 0.15 }} />
        <span className="page-hero-eyebrow" style={{ justifyContent: 'center' }}>Help Centre</span>
        <h1 className="page-hero-title">
          Frequently asked <span style={{ background: 'linear-gradient(135deg,#34d399,#6ee7b7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>questions</span>
        </h1>
        <p className="page-hero-desc" style={{ margin: '0 auto 2rem' }}>
          Everything you need to know about SEED. Can't find what you're looking for? Contact our team.
        </p>

        {/* Search */}
        <div style={{ maxWidth: 500, margin: '0 auto', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            className="form-input"
            style={{ paddingLeft: '2.75rem' }}
            placeholder="Search questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section" style={{ paddingTop: '2rem', maxWidth: 800, margin: '0 auto' }}>
          {filtered ? (
            /* Search results */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "{search}"
              </p>
              {filtered.map((item, i) => {
                const key = `search::${i}`;
                return (
                  <SectionReveal key={key} delay={i * 0.03}>
                    <div
                      onClick={() => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))}
                      style={{
                        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--r-md)', padding: '1.25rem 1.5rem', cursor: 'pointer',
                        transition: 'border-color var(--t-fast)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.q}</span>
                        <ChevronDown size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, transform: openItems[key] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                      </div>
                      {openItems[key] && (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '1rem' }}>{item.a}</p>
                      )}
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          ) : (
            /* Categories */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {faqCategories.map((cat, ci) => (
                <SectionReveal key={cat.title} delay={ci * 0.05}>
                  <h3
                    onClick={() => setOpenCategory(prev => prev === cat.title ? null : cat.title)}
                    style={{
                      fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700,
                      color: 'var(--text-primary)', marginBottom: '1rem', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                    }}
                  >
                    {cat.title}
                    <ChevronDown size={16} style={{ color: 'var(--text-muted)', transform: openCategory === cat.title ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {cat.items.map(item => {
                      const key = `${cat.title}::${item.q}`;
                      return (
                        <div
                          key={item.q}
                          onClick={() => toggleItem(cat.title, item.q)}
                          style={{
                            background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--r-md)', padding: '1.25rem 1.5rem', cursor: 'pointer',
                            transition: 'border-color var(--t-fast)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{item.q}</span>
                            <ChevronDown size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, transform: openItems[key] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                          </div>
                          {openItems[key] && (
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '1rem' }}>{item.a}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}

          {/* Contact CTA */}
          <SectionReveal>
            <div style={{ marginTop: '4rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '3rem', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Still have questions?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Our team is here to help. Reach out and we'll get back to you within 24 hours.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="mailto:hello@seed.dev" className="btn btn-primary btn-lg">Email Us</a>
                <a href="/contact" className="btn btn-secondary btn-lg">Contact Page</a>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
