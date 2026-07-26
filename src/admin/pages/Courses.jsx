import { useState, useEffect } from 'react';
import adminApi from '../AdminApi';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', level: 'Beginner', duration: '', instructor: '', status: 'draft' });
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const load = () => {
    setLoading(true);
    adminApi.getCourses().then(d => { setCourses(d.courses || []); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const handleSave = () => {
    if (editing) {
      adminApi.updateCourse(editing.slug, form).then(() => { load(); setEditing(null); setShowForm(false); showToast('Course updated'); });
    } else {
      adminApi.createCourse(form).then(() => { load(); setShowForm(false); setForm({ title: '', level: 'Beginner', duration: '', instructor: '', status: 'draft' }); showToast('Course created'); });
    }
  };

  const handleDelete = (course) => {
    if (!window.confirm(`Delete "${course.title}"?`)) return;
    adminApi.deleteCourse(course.slug).then(() => { load(); showToast('Course deleted'); });
  };

  if (loading) return <div className="admin-empty"><p>Loading...</p></div>;

  return (
    <div>
      <div className="admin-card-header">
        <h2>Courses ({courses.length})</h2>
        <button className="admin-btn admin-btn-primary" onClick={() => { setForm({ title: '', level: 'Beginner', duration: '', instructor: '', status: 'draft' }); setEditing(null); setShowForm(true); }}>+ New Course</button>
      </div>

      {showForm && (
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>{editing ? 'Edit Course' : 'New Course'}</h3>
          <div className="admin-form">
            <div className="admin-form-row"><label>Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
            <div className="admin-form-inline">
              <div className="admin-form-row" style={{ flex: 1 }}><label>Level</label><select value={form.level} onChange={e => setForm({...form, level: e.target.value})}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>
              <div className="admin-form-row" style={{ flex: 1 }}><label>Duration</label><input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="e.g. 6 weeks" /></div>
            </div>
            <div className="admin-form-inline">
              <div className="admin-form-row" style={{ flex: 1 }}><label>Instructor</label><input value={form.instructor} onChange={e => setForm({...form, instructor: e.target.value})} /></div>
              <div className="admin-form-row" style={{ flex: 1 }}><label>Status</label><select value={form.status} onChange={e => setForm({...form, status: e.target.value})}><option>draft</option><option>published</option><option>archived</option></select></div>
            </div>
            <div className="admin-actions">
              <button className="admin-btn admin-btn-primary" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
              <button className="admin-btn admin-btn-secondary" onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-card">
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Level</th><th>Duration</th><th>Instructor</th><th>Students</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {courses.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: 500 }}>{c.title}</td>
                <td><span className={`admin-badge ${c.level === 'Advanced' ? 'admin-badge-red' : c.level === 'Intermediate' ? 'admin-badge-yellow' : 'admin-badge-green'}`}>{c.level}</span></td>
                <td style={{ color: 'var(--text-muted)' }}>{c.duration}</td>
                <td>{c.instructor}</td>
                <td>{c.students}</td>
                <td><span className={`admin-badge ${c.status === 'published' ? 'admin-badge-green' : c.status === 'draft' ? 'admin-badge-gray' : 'admin-badge-red'}`}>{c.status}</span></td>
                <td>
                  <div className="admin-actions">
                    <button className="admin-btn admin-btn-secondary btn-sm" onClick={() => { setForm(c); setEditing(c); setShowForm(true); }}>Edit</button>
                    <button className="admin-btn admin-btn-danger btn-sm" onClick={() => handleDelete(c)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast && <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}
