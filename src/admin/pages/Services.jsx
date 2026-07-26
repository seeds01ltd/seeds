import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '../AdminApi';

export default function Services() {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ slug:'',icon:'',title:'',tagline:'',color:'#818cf8',image:'',video:'',description:'',content:'',tech:[],featured:false,order:0 });
  const [techInput, setTechInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = () => {
    adminApi.getServices().then(d => setServices(d.services || [])).catch(() => {});
  };
  useEffect(load, []);

  const openNew = () => {
    setEditing('new');
    setForm({ slug:'',icon:'',title:'',tagline:'',color:'#818cf8',image:'',video:'',description:'',content:'',tech:[],featured:false,order:0 });
  };

  const openEdit = (s) => {
    setEditing(s.id);
    setForm({ ...s, tech: s.tech || [] });
  };

  const save = async () => {
    setBusy(true); setMsg(null);
    try {
      if (editing === 'new') {
        await adminApi.createService(form);
        setMsg({ type:'success', text:'Service created' });
      } else {
        await adminApi.updateService(form.slug, form);
        setMsg({ type:'success', text:'Service updated' });
      }
      setEditing(null); load();
    } catch (e) { setMsg({ type:'error', text:e.message }); }
    setBusy(false);
  };

  const remove = async (slug) => {
    if (!confirm('Delete this service?')) return;
    setBusy(true);
    try { await adminApi.deleteService(slug); setMsg({ type:'success', text:'Service deleted' }); load(); }
    catch (e) { setMsg({ type:'error', text:e.message }); }
    setBusy(false);
  };

  const addTech = () => {
    if (techInput.trim() && !form.tech.includes(techInput.trim())) {
      setForm({ ...form, tech: [...form.tech, techInput.trim()] });
      setTechInput('');
    }
  };

  if (editing) return (
    <div>
      <div className="admin-card-header">
        <h2>{editing === 'new' ? 'New Service' : 'Edit Service'}</h2>
        <button className="admin-btn admin-btn-secondary" onClick={() => setEditing(null)}>Back</button>
      </div>
      {msg && <div className={`admin-${msg.type}`}>{msg.text}</div>}
      <div className="admin-form">
        <div className="admin-form-row"><label>Slug</label><input value={form.slug} onChange={e => setForm({...form,slug:e.target.value})} placeholder="web-mobile" /></div>
        <div className="admin-form-row"><label>Icon Name</label><input value={form.icon} onChange={e => setForm({...form,icon:e.target.value})} placeholder="Globe" /></div>
        <div className="admin-form-row"><label>Title</label><input value={form.title} onChange={e => setForm({...form,title:e.target.value})} /></div>
        <div className="admin-form-row"><label>Tagline</label><input value={form.tagline} onChange={e => setForm({...form,tagline:e.target.value})} /></div>
        <div className="admin-form-row"><label>Color</label><input type="color" value={form.color} onChange={e => setForm({...form,color:e.target.value})} /></div>
        <div className="admin-form-row"><label>Image URL</label><input value={form.image} onChange={e => setForm({...form,image:e.target.value})} /></div>
        <div className="admin-form-row"><label>Video URL (optional)</label><input value={form.video||''} onChange={e => setForm({...form,video:e.target.value})} /></div>
        <div className="admin-form-row"><label>Description</label><textarea value={form.description} onChange={e => setForm({...form,description:e.target.value})} /></div>
        <div className="admin-form-row"><label>Content (HTML)</label><textarea value={form.content} onChange={e => setForm({...form,content:e.target.value})} style={{ minHeight:'200px' }} /></div>
        <div className="admin-form-row">
          <label>Technologies</label>
          <div className="admin-form-inline">
            <input value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={e => e.key==='Enter'&&(e.preventDefault(),addTech())} placeholder="Add tech..." style={{ flex:1 }} />
            <button type="button" className="admin-btn admin-btn-secondary" onClick={addTech}>Add</button>
          </div>
          <div style={{ display:'flex',flexWrap:'wrap',gap:'0.375rem',marginTop:'0.5rem' }}>
            {form.tech.map(t => (
              <span key={t} style={{ background:'var(--bg-raised)',border:'1px solid var(--border)',borderRadius:'var(--r-sm)',padding:'0.25rem 0.5rem',fontSize:'0.8125rem' }}>
                {t} <button onClick={() => setForm({...form,tech:form.tech.filter(x=>x!==t)})} style={{ background:'none',border:'none',color:'#f87171',cursor:'pointer',marginLeft:'0.25rem' }}>×</button>
              </span>
            ))}
          </div>
        </div>
        <div className="admin-form-row">
          <label className="admin-form-inline">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({...form,featured:e.target.checked})} />
            Featured
          </label>
        </div>
        <div className="admin-form-row"><label>Order</label><input type="number" value={form.order} onChange={e => setForm({...form,order:parseInt(e.target.value)||0})} /></div>
        <button className="admin-btn admin-btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving...' : 'Save'}</button>
      </div>
    </div>
  );

  return (
    <div>
      {msg && <div className={`admin-${msg.type}`}>{msg.text}</div>}
      <div className="admin-card-header">
        <h2>Services ({services.length})</h2>
        <button className="admin-btn admin-btn-primary" onClick={openNew}>+ New Service</button>
      </div>
      <div className="admin-card">
        {services.length === 0 ? (
          <div className="admin-empty"><p>No services yet</p></div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Title</th><th>Slug</th><th>Tech</th><th>Featured</th><th>Order</th><th>Actions</th></tr></thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id || s.slug}>
                  <td style={{ fontWeight:500 }}>{s.title}</td>
                  <td style={{ color:'var(--text-muted)',fontFamily:'var(--font-mono)',fontSize:'0.8125rem' }}>{s.slug}</td>
                  <td>{s.tech?.slice(0,3).join(', ')}{s.tech?.length > 3 ? '...' : ''}</td>
                  <td>{s.featured ? <span className="admin-badge admin-badge-green">Featured</span> : <span className="admin-badge admin-badge-gray">No</span>}</td>
                  <td>{s.order}</td>
                  <td><div className="admin-actions"><button className="admin-btn admin-btn-secondary" style={{ fontSize:'0.75rem' }} onClick={() => openEdit(s)}>Edit</button><button className="admin-btn admin-btn-danger" style={{ fontSize:'0.75rem' }} onClick={() => remove(s.slug)}>Delete</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}