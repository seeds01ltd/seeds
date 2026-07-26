import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserBookmarks, removeUserBookmark } from '../data/db';
import { Link } from 'react-router-dom';
import { BookmarkCheck, Trash2, BookOpen } from 'lucide-react';

export default function DashboardBookmarks() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState(() => getUserBookmarks(user.id));

  const handleRemove = (bm) => {
    removeUserBookmark(user.id, bm.id);
    setBookmarks(prev => prev.filter(b => b.id !== bm.id));
  };

  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Bookmarks</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-8)' }}>
        {bookmarks.length} saved lesson{bookmarks.length !== 1 ? 's' : ''}
      </p>

      {bookmarks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--sp-16)', color: 'var(--text-muted)' }}>
          <BookmarkCheck size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>No bookmarks yet</p>
          <p style={{ fontSize: '0.875rem', marginBottom: 'var(--sp-6)' }}>Bookmark lessons while you learn to find them later</p>
          <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
          {bookmarks.map(bm => (
            <div key={bm.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-4) var(--sp-5)', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
              <Link to={`/courses/${bm.courseSlug}/lessons/${bm.lessonId}`} style={{ flex: 1, textDecoration: 'none', minWidth: 0 }} onClick={() => {}}>
                <div style={{ fontWeight: 500, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                  {bm.lessonTitle}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>
                  Course: {bm.courseSlug} · Saved {new Date(bm.createdAt).toLocaleDateString()}
                </p>
              </Link>
              <button onClick={() => handleRemove(bm)} className="btn btn-ghost btn-sm" style={{ color: 'var(--rose)', flexShrink: 0, marginLeft: 'var(--sp-3)' }}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
