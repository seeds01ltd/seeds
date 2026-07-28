import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from '../components/UI/SectionReveal';
import { jobs, getDepartments, getByDepartment } from '../data/careers';
import { MapPin, Briefcase, Clock, ArrowRight, GraduationCap, Sparkles } from 'lucide-react';

const PERKS = [
  { icon: Sparkles, title: 'Remote-First', desc: 'Work from anywhere. We have 200+ engineers across 40 countries.' },
  { icon: GraduationCap, title: 'Learning Budget', desc: '₦500,000 annual budget for courses, conferences, and certifications.' },
  { icon: Briefcase, title: 'Flexible Hours', desc: 'Async communication. Work when you do your best work.' },
];

export default function Careers() {
  const [activeDept, setActiveDept] = useState('All');
  const departments = ['All', ...getDepartments()];
  const filtered = getByDepartment(activeDept);

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <div className="glow-blob glow-blob-cobalt" style={{ width: 500, height: 400, top: '-10%', left: '0', opacity: 0.15 }} />
        <div className="page-hero-eyebrow">Careers</div>
        <h1 className="page-hero-title">
          Join the team<br /><span style={{ background: 'linear-gradient(135deg,#34d399,#818cf8)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>building the future.</span>
        </h1>
        <p className="page-hero-desc">
          200+ engineers across 40 countries. Senior-only teams. Real problems. Come build with us.
        </p>
      </div>

      {/* Perks */}
      <section style={{ background: 'var(--bg-surface)' }}>
        <div className="section section-xs">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {PERKS.map((p, i) => (
              <SectionReveal key={p.title} delay={i * 0.08}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(52,211,153,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--indigo-light)', flexShrink: 0 }}>
                    <p.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{p.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section style={{ background: 'var(--bg-base)' }}>
        <div className="section">
          <SectionReveal>
            <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
              Open <span>roles</span>
            </h2>
          </SectionReveal>

          {/* Filters */}
          <SectionReveal>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {departments.map(d => (
                <button
                  key={d}
                  onClick={() => setActiveDept(d)}
                  className={`btn btn-sm ${activeDept === d ? 'btn-primary' : 'btn-ghost'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </SectionReveal>

          {/* Job listings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtered.map((job, i) => (
              <SectionReveal key={job.slug} delay={i * 0.03}>
                <Link to={`/careers/${job.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{job.title}</h3>
                        {job.featured && <span className="badge badge-em">Featured</span>}
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          <Briefcase size={14} /> {job.department}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          <Clock size={14} /> {job.posted}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--indigo-light)', fontSize: '1rem' }}>{job.salary}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{job.type}</div>
                      </div>
                      <ArrowRight size={20} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Graduate / Internship CTA */}
      <section style={{ background: 'var(--bg-surface)' }}>
        <div className="section" style={{ textAlign: 'center' }}>
          <SectionReveal>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)' }}>
              Early career? <span>We've got you.</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '1rem auto 2rem' }}>
              Our graduate programme and summer internship give you real engineering experience with mentorship from senior engineers.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/careers/graduate-programme" className="btn btn-primary btn-lg">View Graduate Programme</Link>
              <Link to="/careers/internship-summer" className="btn btn-secondary btn-lg">View Internships</Link>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
