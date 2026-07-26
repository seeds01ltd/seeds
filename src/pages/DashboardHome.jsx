import { useAuth } from '../contexts/AuthContext';
import { db, getActivity, getCertificates, getUserAchievements, getUserBookmarks, getUserSettings } from '../data/db';
import { courses } from '../data/courses';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Trophy, BookmarkCheck, TrendingUp, Clock } from 'lucide-react';

export default function DashboardHome() {
  const { user } = useAuth();

  const enrolledSlugs = db.getEnrolledCourses();
  const progressData = enrolledSlugs.map(s => ({ slug: s, ...db.getProgress(s) }));
  const completedCourses = progressData.filter(p => p.progress === 100).length;
  const totalLessons = progressData.reduce((s, p) => s + (p.completed?.length || 0), 0);
  const certs = getCertificates(user.id);
  const achievements = getUserAchievements(user.id);
  const bookmarks = getUserBookmarks(user.id);
  const activity = getActivity(user.id, 5);
  const settings = getUserSettings(user.id);

  const enrolledCount = enrolledSlugs.length;

  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
        Welcome back, {(user.name || 'User').split(' ')[0]}
      </h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-8)' }}>
        Here&apos;s your learning overview
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--sp-4)', marginBottom: 'var(--sp-8)' }}>
        {[
          { icon: BookOpen, value: enrolledCount, label: 'Enrolled', color: '#818cf8' },
          { icon: TrendingUp, value: totalLessons, label: 'Lessons Done', color: '#34d399' },
          { icon: Award, value: completedCourses, label: 'Completed', color: '#fbbf24' },
          { icon: Trophy, value: achievements.length, label: 'Achievements', color: '#f87171' },
        ].map(({ icon: Icon, value, label, color }) => (
          <div key={label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--r-sm)', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} style={{ color }} />
              </div>
              <div>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{value}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-6)' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-6)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--sp-4)' }}>Recent Activity</h2>
          {activity.length === 0 ? (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No activity yet. <Link to="/courses" style={{ color: 'var(--text-accent)' }}>Start learning</Link></p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {activity.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.8125rem' }}>
                  <Clock size={14} style={{ color: 'var(--text-muted)', marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <span style={{ color: 'var(--text-secondary)' }}>{a.message}</span>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>{new Date(a.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-6)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--sp-4)' }}>Quick Links</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/dashboard/courses" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-raised)', borderRadius: 'var(--r-sm)', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.875rem' }}>
              <BookOpen size={16} style={{ color: 'var(--text-accent)' }} />
              Continue Learning
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{enrolledCount} courses</span>
            </Link>
            <Link to="/dashboard/bookmarks" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-raised)', borderRadius: 'var(--r-sm)', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.875rem' }}>
              <BookmarkCheck size={16} style={{ color: 'var(--indigo-light)' }} />
              Saved Lessons
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{bookmarks.length} bookmarks</span>
            </Link>
            <Link to="/dashboard/certificates" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--bg-raised)', borderRadius: 'var(--r-sm)', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.875rem' }}>
              <Award size={16} style={{ color: '#fbbf24' }} />
              Certificates
              <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{certs.length} earned</span>
            </Link>
            <Link to="/courses" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.5rem', background: 'var(--bg-raised)', borderRadius: 'var(--r-sm)', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.875rem' }}>
              <TrendingUp size={16} style={{ color: '#34d399' }} />
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
