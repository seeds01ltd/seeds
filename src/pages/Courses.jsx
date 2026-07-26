import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from '../components/UI/SectionReveal';
import api from '../api';
import { Clock, Users, BookOpen } from 'lucide-react';

const LEVEL_COLORS = {
  Beginner: '#34d399',
  Intermediate: '#818cf8',
  Advanced: '#f87171',
};

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLevel, setActiveLevel] = useState('All');

  useEffect(() => {
    api.courses.getAll().then(d => { setCourses(d); setLoading(false); });
  }, []);

  const filtered = activeLevel === 'All' ? courses : courses.filter(c => c.level === activeLevel);
  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <div className="glow-blob glow-blob-cobalt" style={{ width: 500, height: 400, top: '-10%', left: '0', opacity: 0.15 }} />
        <div className="page-hero-eyebrow">Learning Portal</div>
        <h1 className="page-hero-title">
          Learn from the engineers<br /><span style={{ background: 'linear-gradient(135deg,#34d399,#818cf8)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>who build it</span>
        </h1>
        <p className="page-hero-desc">
          Production-grade courses taught by SEED's senior engineers. Real skills from real engineers shipping real systems.
        </p>
      </div>

      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section" style={{ paddingTop: '2rem' }}>
          {/* Level filters */}
          <SectionReveal>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
              {categories.map(level => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`btn btn-sm ${activeLevel === level ? 'btn-primary' : 'btn-ghost'}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </SectionReveal>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Loading courses...</div>
          ) : (
            <div className="grid-auto">
              {filtered.map((course, i) => (
                <SectionReveal key={course.slug} delay={i * 0.07}>
                  <Link to={`/courses/${course.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                    <div className="service-card" style={{ height: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.5rem' }}>
                        <div className="service-title">{course.title}</div>
                        <span className="badge" style={{
                          background: `${LEVEL_COLORS[course.level]}15`,
                          border: `1px solid ${LEVEL_COLORS[course.level]}25`,
                          color: LEVEL_COLORS[course.level],
                          whiteSpace: 'nowrap',
                        }}>
                          {course.level}
                        </span>
                      </div>
                      <div className="service-desc" style={{ marginBottom: '1rem' }}>{course.tagline}</div>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                        {course.topics.slice(0, 4).map(t => (
                          <span key={t} style={{ padding: '0.18rem 0.5rem', borderRadius: 4, background: 'var(--bg-raised)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                            {t}
                          </span>
                        ))}
                        {course.topics.length > 4 && (
                          <span style={{ padding: '0.18rem 0.5rem', borderRadius: 4, background: 'var(--bg-raised)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                            +{course.topics.length - 4}
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '1.25rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          <BookOpen size={14} /> {course.lessonsCount} lessons
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          <Clock size={14} /> {course.duration}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          <Users size={14} /> {course.students.toLocaleString()}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                        Taught by {course.instructor}
                      </div>
                      <span className="service-link" style={{ marginTop: '0.75rem' }}>View Course →</span>
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
