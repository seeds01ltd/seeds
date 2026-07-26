import { useState, useEffect } from 'react';
import adminApi from '../AdminApi';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ slug:'',title:'',excerpt:'',category:'',author:'',authorInitials:'',readTime:'',tags:[],image:'',content:'',featured:false,isPublished:false });
  const [tagInput, setTagInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = () => { adminApi.getPosts().then(d => setPosts(d.posts||[])).catch(()=>{}); };
  useEffect(load, []);

  const openNew = () => { setEditing('new'); setForm({ slug:'',title:'',excerpt:'',category:'',author:'',authorInitials:'',readTime:'',tags:[],image:'',content:'',featured:false,isPublished:false }); };
  const openEdit = (p) => { setEditing(p.id); setForm({ ...p, tags:p.tags||[] }); };

  const save = async () => {
    setBusy(true); setMsg(null);
    try {
      if (editing==='new'){ await adminApi.createPost({...form,date:new Date().toISOString()}); setMsg({type:'success',text:'Post created'}); }
      else { await adminApi.updatePost(form.slug, form); setMsg({type:'success',text:'Post updated'}); }
      setEditing(null); load();
    } catch(e) { setMsg({type:'error',text:e.message}); }
    setBusy(false);
  };

  const remove = async (slug) => {
    if (!confirm('Delete this post?')) return;
    try{ await adminApi.deletePost(slug); setMsg({type:'success',text:'Post deleted'}); load(); }
    catch(e){ setMsg({type:'error',text:e.message}); }
  };

  if (editing) return (
    <div>
      <div className="admin-card-header"><h2>{editing==='new'?'New Post':'Edit Post'}</h2><button className="admin-btn admin-btn-secondary" onClick={()=>setEditing(null)}>Back</button></div>
      {msg&&<div className={`admin-${msg.type}`}>{msg.text}</div>}
      <div className="admin-form">
        <div className="admin-form-row"><label>Slug</label><input value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})} /></div>
        <div className="admin-form-row"><label>Title</label><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} /></div>
        <div className="admin-form-row"><label>Excerpt</label><textarea value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})} /></div>
        <div className="admin-form-row"><label>Category</label><input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} /></div>
        <div className="admin-form-row"><label>Author</label><input value={form.author} onChange={e=>setForm({...form,author:e.target.value})} /></div>
        <div className="admin-form-row"><label>Author Initials</label><input value={form.authorInitials} onChange={e=>setForm({...form,authorInitials:e.target.value})} maxLength={4} /></div>
        <div className="admin-form-row"><label>Read Time</label><input value={form.readTime} onChange={e=>setForm({...form,readTime:e.target.value})} placeholder="5 min read" /></div>
        <div className="admin-form-row"><label>Image URL</label><input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} /></div>
        <div className="admin-form-row"><label>Content (HTML)</label><textarea value={form.content} onChange={e=>setForm({...form,content:e.target.value})} style={{minHeight:'300px'}} /></div>
        <div className="admin-form-row">
          <label>Tags</label>
          <div className="admin-form-inline">
            <input value={tagInput} onChange={e=>setTagInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),tagInput.trim()&&!form.tags.includes(tagInput.trim())&&setForm({...form,tags:[...form.tags,tagInput.trim()]}),setTagInput(''))} style={{flex:1}} />
            <button className="admin-btn admin-btn-secondary" onClick={()=>{tagInput.trim()&&!form.tags.includes(tagInput.trim())&&(setForm({...form,tags:[...form.tags,tagInput.trim()]}),setTagInput(''));}}>Add</button>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.375rem',marginTop:'0.5rem'}}>{form.tags.map(t=><span key={t} style={{background:'var(--bg-raised)',border:'1px solid var(--border)',borderRadius:'var(--r-sm)',padding:'0.25rem 0.5rem',fontSize:'0.8125rem'}}>{t}<button onClick={()=>setForm({...form,tags:form.tags.filter(x=>x!==t)})} style={{background:'none',border:'none',color:'#f87171',cursor:'pointer',marginLeft:'0.25rem'}}>×</button></span>)}</div>
        </div>
        <div className="admin-form-row">
          <label className="admin-form-inline"><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})} /> Featured</label>
        </div>
        <div className="admin-form-row">
          <label className="admin-form-inline"><input type="checkbox" checked={form.isPublished} onChange={e=>setForm({...form,isPublished:e.target.checked})} /> Published</label>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={save} disabled={busy}>{busy?'Saving...':'Save'}</button>
      </div>
    </div>
  );

  return (
    <div>
      {msg&&<div className={`admin-${msg.type}`}>{msg.text}</div>}
      <div className="admin-card-header"><h2>Blog Posts ({posts.length})</h2><button className="admin-btn admin-btn-primary" onClick={openNew}>+ New Post</button></div>
      <div className="admin-card">
        {posts.length===0?<div className="admin-empty"><p>No posts yet</p></div>:
        <table className="admin-table">
          <thead><tr><th>Title</th><th>Category</th><th>Author</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{posts.map(p=>(
            <tr key={p.id||p.slug}><td style={{fontWeight:500}}>{p.title}</td><td style={{color:'var(--text-muted)'}}>{p.category}</td><td>{p.author}</td>
            <td>{p.isPublished?<span className="admin-badge admin-badge-green">Published</span>:<span className="admin-badge admin-badge-yellow">Draft</span>}</td>
            <td><div className="admin-actions"><button className="admin-btn admin-btn-secondary" style={{fontSize:'0.75rem'}} onClick={()=>openEdit(p)}>Edit</button><button className="admin-btn admin-btn-danger" style={{fontSize:'0.75rem'}} onClick={()=>remove(p.slug)}>Delete</button></div></td></tr>
          ))}</tbody>
        </table>}
      </div>
    </div>
  );
}