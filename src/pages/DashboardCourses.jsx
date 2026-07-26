import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db, generateCertificate, getUserAchievements, unlockAchievement, getUserBookmarks, getActivity, getCertificates } from '../data/db';
import { courses } from '../data/courses';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import { achievements as achievementDefs } from '../data/achievements';

const getContinuePath = (slug) => {
  const course = courses.find(c => c.slug === slug);
  if (!course) return `/courses/${slug}`;
  const p = db.getProgress(slug);
  const nextIdx = p.completed?.length || 0;
  const nextLesson = course.lessons?.[nextIdx];
  if (nextLesson) return `/courses/${slug}/lessons/${nextLesson.id}`;
  return `/courses/${slug}`;
};

export default function DashboardCourses() {
  const { user } = useAuth();

  const enrolledSlugs = db.getEnrolledCourses();
  const enrollments = enrolledSlugs.map(slug => {
    const course = courses.find(c => c.slug === slug);
    const p = db.getProgress(slug);
    return {
      slug, title: course?.title || slug,
      image: course?.image,
      instructor: course?.instructor,
      lessonsCount: course?.lessons?.length || 0,
      progress: p.progress || 0,
      completed: p.completed || [],
    };
  });

  const totalEnrolled = enrolledSlugs.length;
  const completedCourses = enrollments.filter(e => e.progress === 100);

  useEffect(() => {
    completedCourses.forEach(c => {
      const certs = getCertificates(user.id);
      const hasCert = certs.some(x => x.courseSlug === c.slug);
      if (!hasCert) generateCertificate(user.id, c.slug, c.title);
    });

    completedCourses.forEach(c => {
      const earned = getUserAchievements(user.id);
      if (!earned.includes('course-complete')) unlockAchievement(user.id, 'course-complete');
    });

    const bookmarks = getUserBookmarks(user.id).length;
    const activity = getActivity(user.id, 20);
    const today = new Date().toDateString();
    const lessonsInDay = activity.filter(a => a.type === 'lesson' && new Date(a.timestamp).toDateString() === today).length;

    const tally = {
      enrolled: totalEnrolled,
      lessonsCompleted: enrollments.reduce((s, e) => s + e.completed.length, 0),
      coursesCompleted: completedCourses.length,
      certificates: getCertificates(user.id).length,
      bookmarks,
      hasBio: !!user.bio,
      lessonsInDay,
    };
    achievementDefs.forEach(def => {
      if (def.criteria(tally)) unlockAchievement(user.id, def.id);
    });
  }, [user.id, totalEnrolled, enrollments, completedCourses]);

  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>My Courses</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-8)' }}>
        {enrollments.length} enrolled · {completedCourses.length} completed
      </p>

      {enrollments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--sp-16)', color: 'var(--text-muted)' }}>
          <BookOpen size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>No courses yet</p>
          <p style={{ fontSize: '0.875rem', marginBottom: 'var(--sp-6)' }}>Enroll in a course to get started</p>
          <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          {enrollments.map(enr => (
            <div key={enr.slug} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-5)', overflow: 'hidden' }}>
              {enr.image && (
                <div style={{ width: 100, height: 70, borderRadius: 'var(--r-sm)', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={enr.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <Link to={`/courses/${enr.slug}`} style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)', textDecoration: 'none' }}>{enr.title}</Link>
                  {enr.progress === 100 && <span className="badge badge-em"><CheckCircle size={12} /> Complete</span>}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Instructor: {enr.instructor} · {enr.lessonsCount} lessons</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ flex: 1, maxWidth: 300, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${enr.progress}%`, height: '100%', background: enr.progress === 100 ? 'var(--emerald-light)' : 'var(--indigo-light)', borderRadius: 3, transition: 'width 0.3s ease' }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', minWidth: 32 }}>{enr.progress}%</span>
                  <Link to={getContinuePath(enr.slug)} className="btn btn-ghost btn-sm">
                    {enr.progress === 100 ? 'Review' : 'Continue'} <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}