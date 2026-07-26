import { useState, useEffect } from 'react';
import adminApi from '../AdminApi';
import { badgeClass, STATUS_BADGE } from '../constants';

const statusOpts = ['NEW', 'READ', 'REPLIED', 'CLOSED'];

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [detail, setDetail] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = () => { adminApi.getContacts().then(d => setContacts(d.contacts||[])).catch(()=>{}); };
  useEffect(load, []);

  const updateStatus = async (id, status) => {
    setBusy(true);
    try { await adminApi.updateContactStatus(id, status); setMsg({type:'success',text:'Status updated'}); load(); }
    catch(e){ setMsg({type:'error',text:e.message}); }
    setBusy(false);
  };

  return (
    <div>
      {msg&&<div className={`admin-${msg.type}`}>{msg.text}</div>}

      {detail && (
        <div className="admin-modal-overlay" onClick={()=>setDetail(null)}>
          <div className="admin-modal" onClick={e=>e.stopPropagation()}>
            <div className="admin-card-header"><h2>Contact Detail</h2><button className="admin-btn admin-btn-secondary" onClick={()=>setDetail(null)}>Close</button></div>
            <div className="admin-detail-grid">
              <div className="admin-detail-field"><label>Name</label><p>{detail.name}</p></div>
              <div className="admin-detail-field"><label>Email</label><p>{detail.email}</p></div>
              <div className="admin-detail-field"><label>Company</label><p>{detail.company||'-'}</p></div>
              <div className="admin-detail-field"><label>Subject</label><p>{detail.subject}</p></div>
               <div className="admin-detail-field"><label>Status</label><p><span className={badgeClass(detail.status)}>{detail.status}</span></p></div>
              <div className="admin-detail-field"><label>Date</label><p>{new Date(detail.createdAt).toLocaleDateString()}</p></div>
            </div>
            <div style={{marginTop:'1rem'}}>
              <div className="admin-detail-field"><label>Message</label><p style={{marginTop:'0.5rem',padding:'0.75rem',background:'var(--bg-raised)',borderRadius:'var(--r-sm)',lineHeight:1.6,fontSize:'0.875rem'}}>{detail.message}</p></div>
            </div>
            <div style={{display:'flex',gap:'0.5rem',marginTop:'1.5rem'}}>
              {statusOpts.map(s=>(
                <button key={s} className={`admin-btn ${detail.status===s?'admin-btn-primary':'admin-btn-secondary'}`} style={{fontSize:'0.75rem'}} onClick={()=>updateStatus(detail.id,s)} disabled={busy||detail.status===s}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="admin-card-header"><h2>Contacts ({contacts.length})</h2></div>
      <div className="admin-card">
        {contacts.length===0?<div className="admin-empty"><p>No contacts yet</p></div>:
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>{contacts.map(c=>(
            <tr key={c.id} style={{cursor:'pointer'}} onClick={()=>setDetail(c)}>
              <td style={{fontWeight:500}}>{c.name}</td>
              <td style={{color:'var(--text-muted)'}}>{c.email}</td>
              <td style={{color:'var(--text-muted)'}}>{c.subject?.substring(0,40)}{c.subject?.length>40?'...':''}</td>
               <td><span className={badgeClass(c.status)}>{c.status}</span></td>
              <td style={{color:'var(--text-muted)',fontSize:'0.8125rem'}}>{new Date(c.createdAt).toLocaleDateString()}</td>
              <td><button className="admin-btn admin-btn-secondary" style={{fontSize:'0.75rem'}} onClick={(e)=>{e.stopPropagation();setDetail(c);}}>View</button></td>
            </tr>
          ))}</tbody>
        </table>}
      </div>
    </div>
  );
}