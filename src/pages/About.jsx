import { Link } from 'react-router-dom';
import SectionReveal from '../components/UI/SectionReveal';
import AnimatedCounter from '../components/UI/AnimatedCounter';
import { timeline } from '../data/team';
import { Star, Eye, Shield } from 'lucide-react';

const VALUES = [
  { icon: Star, title: 'Senior-Only Teams', desc: 'Every project is led and built by senior engineers. No juniors, no outsourcing — just experienced owners who ship.' },
  { icon: Eye, title: 'Transparent Process', desc: 'Weekly engineering reports, open repositories, and direct Slack access to your entire team. Nothing hidden.' },
  { icon: Shield, title: 'Long-term Partnership', desc: 'We architect for the next five years, not just the next sprint. Our average engagement runs over 3 years.' },
];

const STATS = [
  { num: 200, suf: '+', label: 'Senior Engineers', color: '#818cf8' },
  { num: 500, suf: '+', label: 'Projects Shipped', color: '#60a5fa' },
  { num: 8, suf: '', label: 'Years Operating', color: '#34d399' },
  { num: 35, suf: '+', label: 'Industries Served', color: '#fbbf24' },
  { num: 40, suf: '', label: 'Countries', color: '#c084fc' },
  { num: 99.7, suf: '%', label: 'SLA Uptime', color: '#f87171' },
];

export default function About() {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <div className="glow-blob glow-blob-indigo" style={{ width: 600, height: 500, top: '-15%', right: '-5%', opacity: 0.15 }} />
        <div className="page-hero-eyebrow">About Seed</div>
        <h1 className="page-hero-title">
          We're <span style={{ background: 'linear-gradient(135deg,#34d399,#6ee7b7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Seed.</span>
        </h1>
        <p className="page-hero-desc">
          An elite engineering studio of 200+ specialists building the software systems that power ambitious companies — from seed-stage startups to global enterprises.
        </p>
      </div>

      {/* Stats */}
      <section style={{ background: 'var(--bg-surface)' }}>
        <div className="section section-xs" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1.5rem' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.04em', color: s.color }}>
                  <AnimatedCounter target={s.num} suffix={s.suf} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: 'var(--bg-base)' }}>
        <div className="section">
          <SectionReveal>
            <span className="section-eyebrow">How We Work</span>
            <h2 className="section-title" style={{ marginBottom: '3rem' }}>
              Engineering-first,<br /><span>always.</span>
            </h2>
          </SectionReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {VALUES.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.1}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(52,211,153,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--indigo-light)', marginBottom: '1rem' }}>
                    <v.icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Timeline */}
      <section style={{ background: 'var(--bg-surface)' }}>
        <div className="section">
          <SectionReveal>
            <span className="section-eyebrow">Our Story</span>
            <h2 className="section-title" style={{ marginBottom: '4rem' }}>
              From four engineers<br /><span>to two hundred.</span>
            </h2>
          </SectionReveal>
          <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(180deg, var(--indigo), var(--cobalt-light), transparent)', opacity: 0.4 }} />
            {timeline.map((item, i) => (
              <SectionReveal key={item.year} delay={i * 0.08}>
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', position: 'relative' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--bg-card)', border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, zIndex: 1, boxShadow: '0 0 0 4px var(--bg-surface)' }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1, paddingTop: '0.25rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--indigo-light)', fontWeight: 500, marginBottom: '0.25rem' }}>{item.year}</div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg-base)', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-blob glow-blob-cobalt" style={{ width: 600, height: 400, top: '-20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.15 }} />
        <div className="section" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <SectionReveal>
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
              Want to build something<br /><span>remarkable?</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '1.5rem auto 2.5rem' }}>
              Whether you need a full engineering team or expert consultation, we'd love to hear from you.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary btn-xl">Start a Project</Link>
              <Link to="/services" className="btn btn-secondary btn-xl">Explore Services</Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
