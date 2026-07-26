import { useState, useEffect } from 'react';
import adminApi from '../AdminApi';

export default function Team() {
  const [members, setMembers] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [editing, setEditing] = useState(null);
  const [tab, setTab] = useState('members');
  const [form, setForm] = useState({ name:'',role:'',bio:'',avatar:'',linkedin:'',github:'',specialties:[],order:0 });
  const [specInput, setSpecInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const [tlForm, setTlForm] = useState({ year:'',title:'',desc:'',icon:'',order:0 });
  const [tlEditing, setTlEditing] = useState(null);

  const load = () => { adminApi.getTeam().then(d=>setMembers(d.members||[])).catch(()=>{}); adminApi.getTimeline().then(d=>setTimeline(d.timeline||[])).catch(()=>{}); };
  useEffect(load, []);

  const openNew = () => { setEditing('new'); setForm({ name:'',role:'',bio:'',avatar:'',linkedin:'',github:'',specialties:[],order:0 }); };
  const openEdit = (m) => { setEditing(m.id); setForm({ ...m, specialties:m.specialties||[] }); };

  const save = async () => {
    setBusy(true); setMsg(null);
    try {
      if (editing==='new'){ await adminApi.createTeamMember(form); setMsg({type:'success',text:'Member created'}); }
      else { await adminApi.updateTeamMember(editing, form); setMsg({type:'success',text:'Member updated'}); }
      setEditing(null); load();
    } catch(e) { setMsg({type:'error',text:e.message}); }
    setBusy(false);
  };

  const remove = async (id) => {
    if (!confirm('Delete this member?')) return;
    try{ await adminApi.deleteTeamMember(id); setMsg({type:'success',text:'Member deleted'}); load(); }
    catch(e){ setMsg({type:'error',text:e.message}); }
  };

  const saveTimeline = async () => {
    setBusy(true); setMsg(null);
    try {
      if (tlEditing==='new'){ await adminApi.createTimeline(tlForm); setMsg({type:'success',text:'Timeline item created'}); }
      else { await adminApi.updateTimeline(tlEditing, tlForm); setMsg({type:'success',text:'Timeline item updated'}); }
      setTlEditing(null); setTlForm({ year:'',title:'',desc:'',icon:'',order:0 }); load();
    } catch(e){ setMsg({type:'error',text:e.message}); }
    setBusy(false);
  };

  const removeTimeline = async (id) => {
    if (!confirm('Delete this timeline item?')) return;
    try{ await adminApi.deleteTimeline(id); setMsg({type:'success',text:'Item deleted'}); load(); }
    catch(e){ setMsg({type:'error',text:e.message}); }
  };

  if (editing) return (
    <div>
      <div className="admin-card-header"><h2>{editing==='new'?'New Member':'Edit Member'}</h2><button className="admin-btn admin-btn-secondary" onClick={()=>setEditing(null)}>Back</button></div>
      {msg&&<div className={`admin-${msg.type}`}>{msg.text}</div>}
      <div className="admin-form">
        <div className="admin-form-row"><label>Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
        <div className="admin-form-row"><label>Role</label><input value={form.role} onChange={e=>setForm({...form,role:e.target.value})} /></div>
        <div className="admin-form-row"><label>Bio</label><textarea value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} /></div>
        <div className="admin-form-row"><label>Avatar (emoji or URL)</label><input value={form.avatar} onChange={e=>setForm({...form,avatar:e.target.value})} /></div>
        <div className="admin-form-row"><label>LinkedIn URL</label><input value={form.linkedin||''} onChange={e=>setForm({...form,linkedin:e.target.value})} /></div>
        <div className="admin-form-row"><label>GitHub URL</label><input value={form.github||''} onChange={e=>setForm({...form,github:e.target.value})} /></div>
        <div className="admin-form-row">
          <label>Specialties</label>
          <div className="admin-form-inline">
            <input value={specInput} onChange={e=>setSpecInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),specInput.trim()&&!form.specialties.includes(specInput.trim())&&setForm({...form,specialties:[...form.specialties,specInput.trim()]}),setSpecInput(''))} style={{flex:1}} />
            <button className="admin-btn admin-btn-secondary" onClick={()=>{specInput.trim()&&!form.specialties.includes(specInput.trim())&&(setForm({...form,specialties:[...form.specialties,specInput.trim()]}),setSpecInput(''));}}>Add</button>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.375rem',marginTop:'0.5rem'}}>{form.specialties.map(s=><span key={s} style={{background:'var(--bg-raised)',border:'1px solid var(--border)',borderRadius:'var(--r-sm)',padding:'0.25rem 0.5rem',fontSize:'0.8125rem'}}>{s}<button onClick={()=>setForm({...form,specialties:form.specialties.filter(x=>x!==s)})} style={{background:'none',border:'none',color:'#f87171',cursor:'pointer',marginLeft:'0.25rem'}}>×</button></span>)}</div>
        </div>
        <div className="admin-form-row"><label>Order</label><input type="number" value={form.order} onChange={e=>setForm({...form,order:parseInt(e.target.value)||0})} /></div>
        <button className="admin-btn admin-btn-primary" onClick={save} disabled={busy}>{busy?'Saving...':'Save'}</button>
      </div>
    </div>
  );

  return (
    <div>
      {msg&&<div className={`admin-${msg.type}`}>{msg.text}</div>}
      <div style={{display:'flex',gap:'0.5rem',marginBottom:'1.5rem'}}>
        <button className={`admin-btn ${tab==='members'?'admin-btn-primary':'admin-btn-secondary'}`} onClick={()=>setTab('members')}>Team Members ({members.length})</button>
        <button className={`admin-btn ${tab==='timeline'?'admin-btn-primary':'admin-btn-secondary'}`} onClick={()=>setTab('timeline')}>Timeline ({timeline.length})</button>
      </div>

      {tab==='members'&&(
        <div>
          <div className="admin-card-header"><h2>Team Members</h2><button className="admin-btn admin-btn-primary" onClick={openNew}>+ Add Member</button></div>
          <div className="admin-card">
            {members.length===0?<div className="admin-empty"><p>No members yet</p></div>:
            <table className="admin-table">
              <thead><tr><th>Name</th><th>Role</th><th>Specialties</th><th>Actions</th></tr></thead>
              <tbody>{members.map(m=>(
                <tr key={m.id}><td style={{fontWeight:500}}>{m.name}</td><td style={{color:'var(--text-muted)'}}>{m.role}</td><td>{m.specialties?.slice(0,2).join(', ')}{m.specialties?.length>2?'...':''}</td>
                <td><div className="admin-actions"><button className="admin-btn admin-btn-secondary" style={{fontSize:'0.75rem'}} onClick={()=>openEdit(m)}>Edit</button><button className="admin-btn admin-btn-danger" style={{fontSize:'0.75rem'}} onClick={()=>remove(m.id)}>Delete</button></div></td></tr>
              ))}</tbody>
            </table>}
          </div>
        </div>
      )}

      {tab==='timeline'&&(
        <div>
          {tlEditing&&(
            <div className="admin-card" style={{marginBottom:'1rem'}}>
              <div className="admin-card-header"><h2>{tlEditing==='new'?'New Timeline Item':'Edit Timeline Item'}</h2><button className="admin-btn admin-btn-secondary" onClick={()=>{setTlEditing(null);setTlForm({year:'',title:'',desc:'',icon:'',order:0});}}>Cancel</button></div>
              <div className="admin-form">
                <div className="admin-form-row"><label>Year</label><input value={tlForm.year} onChange={e=>setTlForm({...tlForm,year:e.target.value})} /></div>
                <div className="admin-form-row"><label>Title</label><input value={tlForm.title} onChange={e=>setTlForm({...tlForm,title:e.target.value})} /></div>
                <div className="admin-form-row"><label>Description</label><textarea value={tlForm.desc} onChange={e=>setTlForm({...tlForm,desc:e.target.value})} /></div>
                <div className="admin-form-row"><label>Icon (emoji)</label><input value={tlForm.icon} onChange={e=>setTlForm({...tlForm,icon:e.target.value})} /></div>
                <button className="admin-btn admin-btn-primary" onClick={saveTimeline} disabled={busy}>{busy?'Saving...':'Save'}</button>
              </div>
            </div>
          )}
          <div className="admin-card-header"><h2>Company Timeline</h2><button className="admin-btn admin-btn-primary" onClick={()=>{setTlEditing('new');setTlForm({year:'',title:'',desc:'',icon:'',order:timeline.length+1});}}>+ Add Item</button></div>
          <div className="admin-card">
            {timeline.length===0?<div className="admin-empty"><p>No timeline items</p></div>:
            <table className="admin-table">
              <thead><tr><th>Year</th><th>Title</th><th>Description</th><th>Actions</th></tr></thead>
              <tbody>{timeline.map(t=>(
                <tr key={t.id}><td style={{fontWeight:600,fontFamily:'var(--font-mono)'}}>{t.year}</td><td>{t.title}</td><td style={{color:'var(--text-muted)',fontSize:'0.8125rem'}}>{t.desc?.substring(0,60)}...</td>
                <td><div className="admin-actions"><button className="admin-btn admin-btn-secondary" style={{fontSize:'0.75rem'}} onClick={()=>{setTlEditing(t.id);setTlForm(t);}}>Edit</button><button className="admin-btn admin-btn-danger" style={{fontSize:'0.75rem'}} onClick={()=>removeTimeline(t.id)}>Delete</button></div></td></tr>
              ))}</tbody>
            </table>}
          </div>
        </div>
      )}
    </div>
  );
}