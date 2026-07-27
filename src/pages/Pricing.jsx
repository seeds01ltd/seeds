import { Link } from 'react-router-dom';
import SectionReveal from '../components/UI/SectionReveal';
import { plans, faq } from '../data/pricing';
import { Check, HelpCircle } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div className="grid-bg" />
        <div className="glow-blob glow-blob-indigo" style={{ width: 500, height: 400, top: '-10%', right: '0', opacity: 0.2 }} />
        <span className="page-hero-eyebrow" style={{ justifyContent: 'center' }}>Pricing</span>
        <h1 className="page-hero-title">
          Built for <span style={{ background: 'linear-gradient(135deg,#34d399,#6ee7b7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>every stage</span>
        </h1>
        <p className="page-hero-desc" style={{ margin: '0 auto' }}>
          Transparent pricing built around your team size and ambition. No hidden fees, no lock-in contracts.
        </p>
      </div>

      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section" style={{ paddingTop: '2rem' }}>
          <div className="grid-3" style={{ alignItems: 'stretch' }}>
            {plans.map((plan, i) => (
              <SectionReveal key={plan.name} delay={i * 0.1}>
                <div className={`pricing-card ${plan.featured ? 'featured' : ''}`} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {plan.featured && (
                    <span className="badge badge-indigo pricing-badge">Most Popular</span>
                  )}
                  <div className="pricing-name">{plan.name}</div>
                  <div className="pricing-price-row">
                    {plan.price !== 'Custom' && <span className="pricing-currency">₦</span>}
                    <span className="pricing-amount">{plan.price}</span>
                    {plan.unit && <span className="pricing-unit">{plan.unit}</span>}
                  </div>
                  <p className="pricing-desc">{plan.desc}</p>
                  <div className="pricing-features" style={{ flex: 1 }}>
                    {plan.features.map(f => (
                      <div key={f} className="pricing-feature">
                        <span className="pricing-feature-check">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {f}
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                    style={{ width: '100%', justifyContent: 'center', marginTop: '2rem' }}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* FAQ */}
          <SectionReveal>
            <div style={{ marginTop: '6rem' }}>
              <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                Frequently asked <span>questions</span>
              </h2>
              <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {faq.map(item => (
                  <details key={item.q} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-md)', padding: '1.25rem 1.5rem', cursor: 'pointer', transition: 'border-color var(--t-fast)' }}>
                    <summary style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', listStyle: 'none' }}>
                      <HelpCircle size={18} style={{ color: 'var(--indigo-light)', flexShrink: 0 }} />
                      {item.q}
                    </summary>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '1rem', paddingLeft: '2.25rem' }}>
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* CTA */}
          <SectionReveal>
            <div style={{ marginTop: '4rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '3rem', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>Not sure which plan fits?</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Talk to a senior engineer for a free consultation.</p>
              <Link to="/contact" className="btn btn-primary btn-lg">Talk to an Engineer</Link>
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
