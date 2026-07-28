import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { db } from '../data/db';
import { useAuth } from '../contexts/AuthContext';
import SectionReveal from '../components/UI/SectionReveal';
import { ArrowLeft, Clock, Users, BookOpen, GraduationCap, CheckCircle, Circle, Play, ChevronDown, Code2 } from 'lucide-react';

const LEVEL_COLORS = {
  Beginner: '#34d399',
  Intermediate: '#818cf8',
  Advanced: '#f87171',
};

export default function CourseDetail() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    api.courses.getBySlug(slug).then(d => {
      setCourse(d);
      setLoading(false);
      setEnrolled(db.isEnrolled(slug));
      const p = db.getProgress(slug);
      setProgress(p.progress);
      setCompletedLessons(p.completed);
    });
  }, [slug]);

  if (loading) return <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--text-muted)' }}>Loading course...</div>;
  if (!course) return <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--text-muted)' }}>Course not found.</div>;

  const lessons = course.lessons || [];
  const firstLesson = lessons[0];

  const handleEnrol = () => {
    if (!user) {
      navigate('/login', { state: { from: `/courses/${slug}` } });
      return;
    }
    db.enroll(course.slug);
    setEnrolled(true);
    setProgress(0);
  };

  const sidebarContent = (
    <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--r-lg)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>Instructor</h3>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>{course.instructor}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{course.instructorRole}</div>
      </div>

      <div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>Topics</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {(course.topics || []).map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: LEVEL_COLORS[course.level] }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>Details</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <BookOpen size={16} style={{ color: 'var(--indigo-light)' }} /> {lessons.length} lessons
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Clock size={16} style={{ color: 'var(--indigo-light)' }} /> {course.duration}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Users size={16} style={{ color: 'var(--indigo-light)' }} /> {(course.students || 0).toLocaleString()} students
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <GraduationCap size={16} style={{ color: 'var(--indigo-light)' }} /> {course.level}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <Link to="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem', position: 'relative', zIndex: 1 }}>
          <ArrowLeft size={16} /> Back to Courses
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span className="badge" style={{
            background: `${LEVEL_COLORS[course.level]}15`,
            border: `1px solid ${LEVEL_COLORS[course.level]}25`,
            color: LEVEL_COLORS[course.level],
          }}>
            {course.level}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{course.duration}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{course.format}</span>
          {enrolled && (
            <span className="badge badge-em">
              <CheckCircle size={12} /> {progress}% Complete
            </span>
          )}
        </div>
        <h1 className="page-hero-title">{course.title}</h1>
        <p className="page-hero-desc" style={{ color: 'var(--indigo-light)' }}>
          {course.tagline}
        </p>
      </div>

      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section" style={{ maxWidth: 1000, margin: '0 auto', paddingTop: '2rem' }}>
          <SectionReveal>
            <img src={course.image} alt={course.title} style={{ width: '100%', height: 'auto', maxHeight: 400, objectFit: 'cover', borderRadius: 'var(--r-xl)', marginBottom: '3rem', border: '1px solid var(--border)' }} />
          </SectionReveal>

          {/* Start / Continue */}
          {firstLesson && (
            <SectionReveal>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                {enrolled ? (
                  <Link to={`/courses/${slug}/lessons/${firstLesson.id}`} className="btn btn-primary btn-lg">
                    <Play size={20} /> Continue Learning
                  </Link>
                ) : (
                  <button onClick={handleEnrol} className="btn btn-primary btn-lg">
                    <BookOpen size={20} /> Start Course — Free
                  </button>
                )}
                <Link to={`/courses/${slug}/sandbox`} className="btn btn-outline btn-lg" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Code2 size={20} /> Sandbox
                </Link>
              </div>
            </SectionReveal>
          )}

          <SectionReveal delay={0.1}>
            <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem' }}>
              {/* Main content */}
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>About This Course</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                  {course.description}
                </p>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: course.content }} style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8 }} />

                {/* Curriculum */}
                <div style={{ marginTop: '4rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                    Course Curriculum
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {lessons.map((l, i) => {
                      const done = completedLessons.includes(l.id);
                      return (
                        <Link
                          key={l.id}
                          to={`/courses/${slug}/lessons/${l.id}`}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '1rem',
                            padding: '1rem 1.25rem',
                            background: done ? 'rgba(16,185,129,0.05)' : 'var(--bg-card)',
                            border: `1px solid ${done ? 'rgba(52,211,153,0.15)' : 'var(--border-subtle)'}`,
                            borderRadius: 'var(--r-md)',
                            textDecoration: 'none',
                            transition: 'all var(--t-fast)',
                          }}
                        >
                          <div style={{ flexShrink: 0 }}>
                            {done ? (
                              <CheckCircle size={20} style={{ color: 'var(--emerald-light)' }} />
                            ) : (
                              <div style={{
                                width: 20, height: 20, borderRadius: '50%',
                                background: 'var(--bg-raised)', border: '1.5px solid var(--border)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)',
                              }}>
                                {i + 1}
                              </div>
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{l.title}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{l.duration}</div>
                          </div>
                          <Play size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar toggle for mobile */}
              <div className="course-sidebar">
                <button
                  className="btn btn-outline btn-sm course-sidebar-toggle"
                  onClick={() => setSidebarOpen(o => !o)}
                  style={{ width: '100%', justifyContent: 'space-between', marginBottom: '1rem', display: 'none' }}
                >
                  Course Details
                  <ChevronDown size={16} style={{ transform: sidebarOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                <div className={`course-sidebar-content ${sidebarOpen ? 'open' : ''}`}>
                  {sidebarContent}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
