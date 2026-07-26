import { useState, useEffect } from 'react';
import adminApi from '../AdminApi';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ slug:'',title:'',client:'',industry:'',color:'#818cf8',icon:'',image:'',summary:'',content:'',tech:[],results:[],featured:false,order:0 });
  const [techInput, setTechInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = () => { adminApi.getProjects().then(d => setProjects(d.projects||[])).catch(()=>{}); };
  useEffect(load, []);

  const openNew = () => { setEditing('new'); setForm({ slug:'',title:'',client:'',industry:'',color:'#818cf8',icon:'',image:'',summary:'',content:'',tech:[],results:[],featured:false,order:0 }); };
  const openEdit = (p) => { setEditing(p.id); setForm({ ...p, tech:p.tech||[], results:p.results||[] }); };

  const save = async () => {
    setBusy(true); setMsg(null);
    try {
      if (editing === 'new') { await adminApi.createProject(form); setMsg({ type:'success',text:'Project created' }); }
      else { await adminApi.updateProject(form.slug, form); setMsg({ type:'success',text:'Project updated' }); }
      setEditing(null); load();
    } catch(e) { setMsg({ type:'error',text:e.message }); }
    setBusy(false);
  };

  const remove = async (slug) => {
    if (!confirm('Delete this project?')) return;
    setBusy(true);
    try { await adminApi.deleteProject(slug); setMsg({ type:'success',text:'Project deleted' }); load(); }
    catch(e) { setMsg({ type:'error',text:e.message }); }
    setBusy(false);
  };

  if (editing) return (
    <div>
      <div className="admin-card-header"><h2>{editing==='new'?'New Project':'Edit Project'}</h2><button className="admin-btn admin-btn-secondary" onClick={()=>setEditing(null)}>Back</button></div>
      {msg && <div className={`admin-${msg.type}`}>{msg.text}</div>}
      <div className="admin-form">
        <div className="admin-form-row"><label>Slug</label><input value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} /></div>
        <div className="admin-form-row"><label>Title</label><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} /></div>
        <div className="admin-form-row"><label>Client</label><input value={form.client} onChange={e=>setForm({...form,client:e.target.value})} /></div>
        <div className="admin-form-row"><label>Industry</label><input value={form.industry} onChange={e=>setForm({...form,industry:e.target.value})} /></div>
        <div className="admin-form-row"><label>Color</label><input type="color" value={form.color} onChange={e=>setForm({...form,color:e.target.value})} /></div>
        <div className="admin-form-row"><label>Image URL</label><input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} /></div>
        <div className="admin-form-row"><label>Summary</label><textarea value={form.summary} onChange={e=>setForm({...form,summary:e.target.value})} /></div>
        <div className="admin-form-row"><label>Content (HTML)</label><textarea value={form.content} onChange={e=>setForm({...form,content:e.target.value})} style={{minHeight:'200px'}} /></div>
        <div className="admin-form-row">
          <label>Technologies</label>
          <div className="admin-form-inline">
            <input value={techInput} onChange={e=>setTechInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),form.tech.includes(techInput.trim())||setForm({...form,tech:[...form.tech,techInput.trim()]}),setTechInput(''))} placeholder="Add tech..." style={{flex:1}} />
            <button className="admin-btn admin-btn-secondary" onClick={()=>{techInput.trim()&&!form.tech.includes(techInput.trim())&&(setForm({...form,tech:[...form.tech,techInput.trim()]}),setTechInput(''));}}>Add</button>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.375rem',marginTop:'0.5rem'}}>{form.tech.map(t=><span key={t} style={{background:'var(--bg-raised)',border:'1px solid var(--border)',borderRadius:'var(--r-sm)',padding:'0.25rem 0.5rem',fontSize:'0.8125rem'}}>{t}<button onClick={()=>setForm({...form,tech:form.tech.filter(x=>x!==t)})} style={{background:'none',border:'none',color:'#f87171',cursor:'pointer',marginLeft:'0.25rem'}}>×</button></span>)}</div>
        </div>
        <div className="admin-form-row"><label className="admin-form-inline"><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})} /> Featured</label></div>
        <div className="admin-form-row"><label>Order</label><input type="number" value={form.order} onChange={e=>setForm({...form,order:parseInt(e.target.value)||0})} /></div>
        <button className="admin-btn admin-btn-primary" onClick={save} disabled={busy}>{busy?'Saving...':'Save'}</button>
      </div>
    </div>
  );

  return (
    <div>
      {msg&&<div className={`admin-${msg.type}`}>{msg.text}</div>}
      <div className="admin-card-header"><h2>Portfolio ({projects.length})</h2><button className="admin-btn admin-btn-primary" onClick={openNew}>+ New Project</button></div>
      <div className="admin-card">
        {projects.length===0?<div className="admin-empty"><p>No projects yet</p></div>:
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Client</th><th>Industry</th><th>Featured</th><th>Actions</th></tr></thead>
          <tbody>{projects.map(p=>(
            <tr key={p.id||p.slug}><td style={{fontWeight:500}}>{p.title}</td><td style={{color:'var(--text-muted)'}}>{p.client}</td><td>{p.industry}</td><td>{p.featured?<span className="admin-badge admin-badge-green">Featured</span>:<span className="admin-badge admin-badge-gray">No</span>}</td>
            <td><div className="admin-actions"><button className="admin-btn admin-btn-secondary" style={{fontSize:'0.75rem'}} onClick={()=>openEdit(p)}>Edit</button><button className="admin-btn admin-btn-danger" style={{fontSize:'0.75rem'}} onClick={()=>remove(p.slug)}>Delete</button></div></td></tr>
          ))}</tbody>
        </table>}
      </div>
    </div>
  );
}