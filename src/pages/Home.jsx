import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero3D from '../components/Hero/Hero3D';
import SectionReveal from '../components/UI/SectionReveal';
import AnimatedCounter from '../components/UI/AnimatedCounter';
import api from '../api';
import { Star, Eye, Shield } from 'lucide-react';

/* ─── Typewriter ────────────────────────────────────────────── */
const PHRASES = ['Software Engineering', 'AI & Machine Learning', 'Cloud Architecture', 'Embedded Systems', 'Digital Transformation'];

function Typewriter() {
  const [idx, setIdx]       = useState(0);
  const [displayed, setText] = useState('');
  const [deleting, setDel]  = useState(false);
  const [charIdx, setChar]  = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    const current = PHRASES[idx];
    if (!deleting) {
      if (charIdx < current.length) {
        timer.current = setTimeout(() => setChar(c => c + 1), 48);
      } else {
        timer.current = setTimeout(() => setDel(true), 2600);
      }
    } else {
      if (charIdx > 0) {
        timer.current = setTimeout(() => setChar(c => c - 1), 28);
      } else {
        setDel(false);
        setIdx(i => (i + 1) % PHRASES.length);
      }
    }
    setText(current.slice(0, charIdx));
    return () => clearTimeout(timer.current);
  }, [charIdx, deleting, idx]);

  return (
    <span>
      {displayed}
      <span className="typewriter-cursor" />
    </span>
  );
}

/* ─── Marquee strip ─────────────────────────────────────────── */
const CLIENTS = ['NexusHealth', 'Orbital Capital', 'Aurora Logistics', 'Zenith Manufacturing', 'Prism EdTech', 'VaultChain', 'CrestEnergy', 'Spectra Biotech'];

/* ─── Testimonials ──────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "Seed rebuilt our entire clinical data platform in six months. The AI diagnostic layer alone has saved our radiologists four hours per shift. I can't recommend them highly enough.",
    name: 'Dr. Sarah Chen',
    role: 'CTO, NexusHealth Ltd.',
    initials: 'SC',
    color: '#34d399',
  },
  {
    quote: "The Orbital trading engine they built processes 2 million transactions per second with sub-millisecond latency. That's an engineering achievement most firms couldn't replicate.",
    name: 'Marcus Webb',
    role: 'VP Engineering, Orbital Capital',
    initials: 'MW',
    color: '#818cf8',
  },
  {
    quote: "Our fleet intelligence platform cut fuel costs by 23% in year one. Seed didn't just deliver the code — they solved the actual business problem. Exceptional people.",
    name: 'Ingrid Larsen',
    role: 'COO, Aurora Logistics',
    initials: 'IL',
    color: '#60a5fa',
  },
];

/* ─── Component ─────────────────────────────────────────────── */
export default function Home() {
  const [services, setServices]   = useState([]);
  const [projects, setProjects]   = useState([]);
  const [testimIdx, setTestimIdx] = useState(0);

  useEffect(() => {
    api.services.getFeatured().then(setServices);
    api.portfolio.getFeatured().then(setProjects);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTestimIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[testimIdx];

  return (
    <div>
      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section className="hero-section">
        {/* Fullscreen Background Image (User uploaded a .jpg instead of .mp4) */}
        <img 
          className="hero-video-bg" 
          src="/bg-video.mp4.jpg"
          alt="Hero Background"
        />
        <div className="hero-video-overlay" />

        <div className="hero-content-wrapper">
          <span className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Elite Software Engineering Studio
          </span>

          <h1 className="hero-title">
            <span className="hero-title-line">World-class</span>
            <span className="hero-title-line hero-title-grad">
              <Typewriter />
            </span>
          </h1>

          <p className="hero-subtitle">
            Seed is an elite engineering studio of 200+ specialists building the software systems 
            that power ambitious companies — from seed-stage startups to global enterprises.
          </p>

          <div className="hero-cta-group">
            <Link to="/contact" className="btn btn-primary btn-xl">
              Start a Project
            </Link>
            <Link to="/portfolio" className="btn btn-secondary btn-xl">
              View Our Work
            </Link>
          </div>

          <div className="hero-stats">
            {[
              { num: 200, suf: '+', label: 'Engineers' },
              { num: 500, suf: '+', label: 'Projects Shipped' },
              { num: 35,  suf: '+', label: 'Industries' },
              { num: 99.7, suf: '%', label: 'Uptime SLA' },
            ].map(s => (
              <div key={s.label}>
                <div className="hero-stat-num">
                  <AnimatedCounter target={s.num} suffix={s.suf} />
                </div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', animation: 'fadeIn 1s 1.5s both' }}>
          <div style={{ width: 20, height: 32, borderRadius: 10, border: '1.5px solid rgba(99,102,241,0.3)', display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
            <div style={{ width: 3, height: 6, borderRadius: 2, background: 'var(--indigo-light)', animation: 'scrollAnim 1.8s ease-in-out infinite' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Scroll</span>
        </div>
        <style>{`@keyframes scrollAnim{0%{transform:translateY(0);opacity:1}100%{transform:translateY(14px);opacity:0}}`}</style>
      </section>

      {/* ══ CLIENT MARQUEE ════════════════════════════════════════════ */}
      <div style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '1.2rem 0', overflow: 'hidden' }}>
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          Trusted by leading organisations worldwide
        </p>
        <div className="marquee-wrapper">
          <div className="marquee-inner">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="marquee-item">
                {c} <span className="marquee-sep">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ SERVICES ══════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-base)' }}>
        <div className="section">
          <SectionReveal>
            <span className="section-eyebrow">Services</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Full-spectrum<br /><span>engineering capability</span>
              </h2>
              <Link to="/services" className="btn btn-outline btn-md">
                All 8 Services →
              </Link>
            </div>
          </SectionReveal>

          <div className="grid-3">
            {services.map((svc, i) => (
              <SectionReveal key={svc.slug} delay={i * 0.1}>
                <Link to={`/services/${svc.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div className="service-card" style={{ height: '100%' }}>
                    <div className="service-icon" style={{ background: `${svc.color}15`, borderColor: `${svc.color}25`, color: svc.color }}>
                      <svc.icon size={26} strokeWidth={1.5} />
                    </div>
                    <div className="service-title">{svc.title}</div>
                    <div className="service-desc">{svc.description}</div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {svc.tech.slice(0, 3).map(t => (
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
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ ABOUT / VALUES ════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-base)' }}>
        <div className="section">
          <SectionReveal>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
              <div>
                <span className="section-eyebrow">About Seed</span>
                <h2 className="section-title">Engineering-first,<br /><span>always.</span></h2>
                <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
                  Founded by engineers, for engineers. We measure ourselves by the systems we build — not the hours we bill.
                  Every engagement is backed by senior technical ownership from day one.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {[
                    { icon: Star, title: 'Senior-Only Teams', desc: 'Every project is led and built by senior engineers. No juniors, no outsourcing.' },
                    { icon: Eye, title: 'Transparent Process', desc: 'Weekly engineering reports, open repositories, and direct Slack access to your team.' },
                    { icon: Shield, title: 'Long-term Partnership', desc: 'We architect for the next five years, not just the next sprint.' },
                  ].map(v => (
                    <div key={v.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(79,70,229,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--indigo-light)' }}>
                        <v.icon size={20} strokeWidth={1.5} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)' }}>{v.title}</div>
                        <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{v.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '2rem' }}>
                  <Link to="/about" className="btn btn-outline btn-md">Meet the Team →</Link>
                </div>
              </div>

              {/* Stats panel */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {[
                  { num: 200, suf: '+', label: 'Senior Engineers', color: '#818cf8' },
                  { num: 500, suf: '+', label: 'Projects Shipped', color: '#60a5fa' },
                  { num: 8,   suf: '',  label: 'Years Operating', color: '#34d399' },
                  { num: 35,  suf: '+', label: 'Industries Served', color: '#fbbf24' },
                  { num: 40,  suf: '',  label: 'Countries', color: '#c084fc' },
                  { num: 99.7,suf: '%', label: 'SLA Uptime', color: '#f87171' },
                ].map(s => (
                  <div key={s.label} style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--r-lg)', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: s.color, opacity: 0.6 }} />
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.04em', color: s.color, marginBottom: '0.25rem' }}>
                      <AnimatedCounter target={s.num} suffix={s.suf} />
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ PORTFOLIO ═════════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-base)' }}>
        <div className="section">
          <SectionReveal>
            <span className="section-eyebrow">Case Studies</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Work that<br /><span>speaks for itself.</span>
              </h2>
              <Link to="/portfolio" className="btn btn-outline btn-md">All Projects →</Link>
            </div>
          </SectionReveal>

          <div className="grid-3">
            {projects.map((p, i) => (
              <SectionReveal key={p.slug} delay={i * 0.1}>
                <Link to={`/portfolio/${p.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div className="project-card" style={{ height: '100%' }}>
                    <div className="project-thumb" style={{ background: `linear-gradient(135deg, ${p.color}22, ${p.color}08)` }}>
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color }}>
                        <p.icon size={48} strokeWidth={1.5} />
                      </div>
                      <div className="project-thumb-overlay" />
                      <span className={`badge badge-indigo project-industry-tag`} style={{ background: `${p.color}18`, borderColor: `${p.color}30`, color: p.color }}>
                        {p.industry}
                      </span>
                    </div>
                    <div className="project-body">
                      <div className="project-client">{p.client}</div>
                      <div className="project-title">{p.title}</div>
                      <div className="project-desc">{p.summary}</div>
                      <div className="project-metrics">
                        {p.results.map((r, ri) => (
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
        </div>
      </section>

      <div className="section-divider" />

      {/* ══ TESTIMONIAL ═══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bg-surface)' }}>
        <div className="section" style={{ textAlign: 'center' }}>
          <SectionReveal>
            <span className="section-eyebrow">Client Stories</span>
            <h2 className="section-title">The people behind the results</h2>

            <div style={{ maxWidth: 720, margin: '3rem auto', position: 'relative' }}>
              <div className="testimonial">
                <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: 1.75, marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${t.color}40, ${t.color}15)`, border: `1.5px solid ${t.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: t.color, fontFamily: 'var(--font-heading)' }}>
                    {t.initials}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{t.name}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{t.role}</div>
                  </div>
                </div>
              </div>

              {/* Dots */}
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimIdx(i)}
                    style={{
                      width: i === testimIdx ? 24 : 8, height: 8,
                      borderRadius: 4, border: 'none', cursor: 'none',
                      background: i === testimIdx ? 'var(--indigo-light)' : 'var(--border)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ══ BOTTOM CTA ════════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-void) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-blob glow-blob-indigo" style={{ width: 800, height: 500, top: '-20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.2 }} />
        <div className="section" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <SectionReveal>
            <span className="section-eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>Ready to build?</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem,5vw,3.8rem)' }}>
              Your next great<br /><span>product starts here.</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '1.5rem auto 2.5rem' }}>
              Schedule a 30-minute discovery call with a senior engineer. No sales pitch — just an honest conversation about your challenge and how we can help.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary btn-xl">Book a Discovery Call</Link>
              <Link to="/quote" className="btn btn-secondary btn-xl">Request a Quote</Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
