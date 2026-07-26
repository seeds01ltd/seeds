import { Link } from 'react-router-dom';
import SectionReveal from '../components/UI/SectionReveal';
import { BookOpen, Award, Users, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react';

const PATHS = [
  { title: 'Frontend Engineering', courses: 3, desc: 'React, Next.js, TypeScript — master modern frontend development from components to deployment.' },
  { title: 'Backend & Infrastructure', courses: 4, desc: 'Node.js, Docker, Kubernetes, Cloud Architecture — build systems that scale.' },
  { title: 'AI & Data Science', courses: 2, desc: 'Python, ML fundamentals, LLMs — practical AI for working engineers.' },
  { title: 'Systems & Security', courses: 2, desc: 'Rust, embedded systems, cybersecurity — low-level engineering at its finest.' },
];

const HIGHLIGHTS = [
  { icon: BookOpen, label: '8 Courses', desc: 'Across Beginner to Advanced levels' },
  { icon: Users, label: 'Expert Instructors', desc: 'Taught by SEED senior engineers' },
  { icon: GraduationCap, label: 'Self-Paced', desc: 'Learn at your own schedule' },
  { icon: Award, label: 'Certificates', desc: 'Shareable on LinkedIn & verified' },
];

export default function Academy() {
  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <div className="glow-blob glow-blob-em" style={{ width: 500, height: 400, top: '-10%', right: '0', opacity: 0.15 }} />
        <div className="page-hero-eyebrow">SEED Academy</div>
        <h1 className="page-hero-title">
          Learn from <span style={{ background: 'linear-gradient(135deg,#34d399,#6ee7b7)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>the best.</span>
        </h1>
        <p className="page-hero-desc">
          Production-grade courses taught by SEED's senior engineers. 
          Real skills from the people shipping real systems for Fortune 500 companies.
        </p>
      </div>

      {/* Highlights */}
      <section style={{ background: 'var(--bg-surface)' }}>
        <div className="section section-xs">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {HIGHLIGHTS.map((h, i) => (
              <SectionReveal key={h.label} delay={i * 0.08}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', color: 'var(--indigo-light)' }}>
                    <h.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.05rem' }}>{h.label}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{h.desc}</div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section style={{ background: 'var(--bg-base)' }}>
        <div className="section">
          <SectionReveal>
            <span className="section-eyebrow">Learning Paths</span>
            <h2 className="section-title" style={{ marginBottom: '3rem' }}>
              Structured paths to<br /><span>mastery.</span>
            </h2>
          </SectionReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {PATHS.map((p, i) => (
              <SectionReveal key={p.title} delay={i * 0.08}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--text-primary)' }}>{p.title}</h3>
                    <span className="badge badge-indigo">{p.courses} courses</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1rem' }}>{p.desc}</p>
                  <Link to="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--indigo-light)', textDecoration: 'none' }}>
                    View Courses <ArrowRight size={14} />
                  </Link>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors preview */}
      <section style={{ background: 'var(--bg-surface)' }}>
        <div className="section">
          <SectionReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <span className="section-eyebrow">Instructors</span>
                <h2 className="section-title" style={{ marginBottom: 0 }}>
                  Taught by <span>engineers.</span>
                </h2>
              </div>
              <Link to="/courses" className="btn btn-outline btn-md">Browse All Courses →</Link>
            </div>
            <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
              Every course is built and taught by a SEED senior engineer — the same people architecting systems for global enterprises. 
              No academics. No theory without practice. Just real engineering experience.
            </p>
          </SectionReveal>

          {/* CTA */}
          <SectionReveal>
            <div style={{ background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '3rem', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                Start learning today — <span style={{ color: 'var(--indigo-light)' }}>for free.</span>
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: 500, margin: '0 auto 1.5rem' }}>
                All courses are currently free. Enrol now and get lifetime access to all materials.
              </p>
              <Link to="/courses" className="btn btn-primary btn-xl">
                <GraduationCap size={22} /> Browse Courses
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
