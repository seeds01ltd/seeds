import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { db, addUserBookmark, removeUserBookmark, getUserBookmarks, logActivity } from '../data/db';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, CheckCircle, Circle, ChevronLeft, ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';

export default function LessonViewer() {
  const { slug, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    api.courses.getBySlug(slug).then(c => {
      setCourse(c);
      const l = c?.lessons?.find(x => x.id === lessonId);
      setLesson(l || null);
      setLoading(false);
      setEnrolled(db.isEnrolled(slug));
      if (l) setCompleted(db.isLessonCompleted(slug, l.id));
      if (user && l) {
        const bms = getUserBookmarks(user.id);
        setBookmarked(bms.some(b => b.courseSlug === slug && b.lessonId === l.id));
      }
    });
  }, [slug, lessonId, user]);

  const toggleBookmark = () => {
    if (!user || !lesson) return;
    if (bookmarked) {
      const bms = getUserBookmarks(user.id);
      const bm = bms.find(b => b.courseSlug === slug && b.lessonId === lesson.id);
      if (bm) removeUserBookmark(user.id, bm.id);
      setBookmarked(false);
    } else {
      addUserBookmark(user.id, slug, lesson.id, lesson.title);
      setBookmarked(true);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--text-muted)' }}>Loading lesson...</div>;
  if (!course || !lesson || !course.lessons) return <div style={{ textAlign: 'center', padding: '10rem 0', color: 'var(--text-muted)' }}>Lesson not found.</div>;

  const lessons = course.lessons;
  const currentIdx = lessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? lessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < lessons.length - 1 ? lessons[currentIdx + 1] : null;
  const { progress } = db.getProgress(course.slug);

  const handleComplete = () => {
    if (!enrolled) db.enroll(course.slug);
    db.completeLesson(course.slug, lesson.id, lessons.length);
    if (user) logActivity(user.id, { type: 'lesson', message: `Completed "${lesson.title}" in ${course.title}` });
    setCompleted(true);
    setEnrolled(true);
  };

  return (
    <div className="page-wrapper" style={{ paddingTop: 0 }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(7,11,24,0.95)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        padding: '0.75rem 2rem',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <Link to={`/courses/${slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>
            <ArrowLeft size={16} /> Back to Course
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Lesson {currentIdx + 1} of {lessons.length}
            </div>
            {enrolled && (
              <div style={{ width: 80, height: 4, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'var(--indigo-light)', borderRadius: 2, transition: 'width 0.3s ease' }} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 2rem 6rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span className="badge badge-indigo">{lesson.duration}</span>
            {completed && <span className="badge badge-em"><CheckCircle size={12} /> Completed</span>}
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
            {lesson.title}
          </h1>
        </div>

        <div className="article-content" dangerouslySetInnerHTML={{ __html: lesson.content }} style={{ marginBottom: '3rem' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {user && (
              <button onClick={toggleBookmark} className="btn btn-ghost btn-md" title={bookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}>
                {bookmarked ? <BookmarkCheck size={18} style={{ color: 'var(--indigo-light)' }} /> : <Bookmark size={18} />}
              </button>
            )}
            {prevLesson ? (
              <Link to={`/courses/${slug}/lessons/${prevLesson.id}`} className="btn btn-secondary btn-md">
                <ChevronLeft size={18} /> Previous
              </Link>
            ) : (
              <button className="btn btn-ghost btn-md" disabled style={{ opacity: 0.4 }}>
                <ChevronLeft size={18} /> Previous
              </button>
            )}
            {!completed ? (
              <button onClick={handleComplete} className="btn btn-primary btn-md">
                <CheckCircle size={18} /> Mark Complete
              </button>
            ) : (
              <button className="btn btn-em btn-md" disabled style={{ opacity: 0.7 }}>
                <CheckCircle size={18} /> Completed
              </button>
            )}
          </div>
          {nextLesson ? (
            <Link to={`/courses/${slug}/lessons/${nextLesson.id}`} className="btn btn-secondary btn-md">
              Next <ChevronRight size={18} />
            </Link>
          ) : (
            <Link to={`/courses/${slug}`} className="btn btn-secondary btn-md">
              Finish Course <CheckCircle size={18} />
            </Link>
          )}
        </div>
      </div>

      <div style={{
        position: 'fixed', right: 0, top: '3.5rem', bottom: 0,
        width: 280, background: 'var(--bg-surface)',
        borderLeft: '1px solid var(--border-subtle)',
        overflowY: 'auto', padding: '1.5rem',
      }} className="lesson-sidebar">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
          {course.title}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {lessons.map((l, i) => {
            const done = db.isLessonCompleted(slug, l.id);
            const active = l.id === lessonId;
            return (
              <Link
                key={l.id} to={`/courses/${slug}/lessons/${l.id}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.6rem 0.75rem', borderRadius: 'var(--r-md)',
                  textDecoration: 'none',
                  background: active ? 'var(--bg-card)' : 'transparent',
                  border: active ? '1px solid var(--border)' : '1px solid transparent',
                  color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontSize: '0.82rem', lineHeight: 1.3, transition: 'all var(--t-fast)',
                }}
              >
                {done ? (
                  <CheckCircle size={14} style={{ color: 'var(--emerald-light)', flexShrink: 0 }} />
                ) : active ? (
                  <Circle size={14} style={{ color: 'var(--indigo-light)', flexShrink: 0 }} />
                ) : (
                  <Circle size={14} style={{ color: 'var(--border)', flexShrink: 0 }} />
                )}
                <span>{i + 1}. {l.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
