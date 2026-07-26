import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { courses } from '../data/courses';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Eye } from 'lucide-react';

export default function InstructorCourses() {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(null);

  const myCourses = courses.filter(c => c.instructor === user.name);

  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>My Courses</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-8)' }}>
        {myCourses.length} courses
      </p>

      {myCourses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--sp-16)', color: 'var(--text-muted)' }}>
          <BookOpen size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <p>No courses assigned to you yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          {myCourses.map(course => (
            <div key={course.slug} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-5)', cursor: 'pointer' }}
                onClick={() => setExpanded(expanded === course.slug ? null : course.slug)}
              >
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{course.title}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>
                    {course.level} · {course.duration} · {course.lessons?.length || 0} lessons · {course.students} students
                  </p>
                </div>
                <ChevronRight size={18} style={{ color: 'var(--text-muted)', transform: expanded === course.slug ? 'rotate(90deg)' : '', transition: 'transform 0.2s' }} />
              </div>

              {expanded === course.slug && (
                <div style={{ borderTop: '1px solid var(--border)', padding: 'var(--sp-5)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {course.lessons?.map((l, i) => (
                      <div key={l.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'var(--bg-raised)', borderRadius: 'var(--r-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', minWidth: 24 }}>{i + 1}.</span>
                          <span style={{ fontSize: '0.875rem' }}>{l.title}</span>
                          <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>{l.duration}</span>
                        </div>
                        <Link to={`/courses/${course.slug}/lessons/${l.id}`} className="btn btn-ghost btn-sm">
                          <Eye size={14} /> Preview
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
