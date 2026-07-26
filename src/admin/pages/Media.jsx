import { useState, useEffect } from 'react';
import adminApi from '../AdminApi';

export default function AdminMedia() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    adminApi.getMedia().then(d => { setMedia(d.media || []); setLoading(false); });
  }, []);

  const handleDelete = (item) => {
    if (!window.confirm(`Delete "${item.name}"?`)) return;
    adminApi.deleteMedia(item.id).then(() => {
      setMedia(prev => prev.filter(m => m.id !== item.id));
      showToast('File deleted');
    });
  };

  const typeIcon = (type) => {
    const icons = { image: '🖼️', vector: '🎨', document: '📄', video: '🎬' };
    return icons[type] || '📁';
  };

  if (loading) return <div className="admin-empty"><p>Loading...</p></div>;

  return (
    <div>
      <div className="admin-card-header">
        <h2>Media Library ({media.length})</h2>
        <button className="admin-btn admin-btn-primary" disabled>Upload</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        {media.map(item => (
          <div key={item.id} className="admin-card" style={{ padding: '1rem' }}>
            <div style={{ height: 120, background: 'var(--bg-raised)', borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', marginBottom: '0.75rem' }}>
              {typeIcon(item.type)}
            </div>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem', wordBreak: 'break-all' }}>{item.name}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              {item.size} · {item.dimensions}
            </p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Used in: {item.usedIn} · Uploaded {item.uploaded}
            </p>
            <button className="admin-btn admin-btn-danger btn-sm" onClick={() => handleDelete(item)} style={{ width: '100%' }}>Delete</button>
          </div>
        ))}
      </div>

      {toast && <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}
