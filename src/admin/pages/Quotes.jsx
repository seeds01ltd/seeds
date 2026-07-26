import { useState, useEffect } from 'react';
import adminApi from '../AdminApi';
import { badgeClass } from '../constants';

const statusOpts = ['PENDING', 'REVIEWING', 'QUOTED', 'ACCEPTED', 'REJECTED', 'EXPIRED'];

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [detail, setDetail] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const load = () => { adminApi.getQuotes().then(d => setQuotes(d.quotes||[])).catch(()=>{}); };
  useEffect(load, []);

  const updateStatus = async (id, status) => {
    setBusy(true);
    try { await adminApi.updateQuoteStatus(id, status); setMsg({type:'success',text:'Status updated'}); load(); }
    catch(e){ setMsg({type:'error',text:e.message}); }
    setBusy(false);
  };

  return (
    <div>
      {msg&&<div className={`admin-${msg.type}`}>{msg.text}</div>}

      {detail && (
        <div className="admin-modal-overlay" onClick={()=>setDetail(null)}>
          <div className="admin-modal" onClick={e=>e.stopPropagation()}>
            <div className="admin-card-header"><h2>Quote Detail</h2><button className="admin-btn admin-btn-secondary" onClick={()=>setDetail(null)}>Close</button></div>
            <div className="admin-detail-grid">
              <div className="admin-detail-field"><label>Name</label><p>{detail.name}</p></div>
              <div className="admin-detail-field"><label>Email</label><p>{detail.email}</p></div>
              <div className="admin-detail-field"><label>Company</label><p>{detail.company||'-'}</p></div>
              <div className="admin-detail-field"><label>Phone</label><p>{detail.phone||'-'}</p></div>
              <div className="admin-detail-field"><label>Service</label><p>{detail.service}</p></div>
              <div className="admin-detail-field"><label>Budget</label><p>{detail.budget||'-'}</p></div>
              <div className="admin-detail-field"><label>Timeline</label><p>{detail.timeline||'-'}</p></div>
               <div className="admin-detail-field"><label>Status</label><p><span className={badgeClass(detail.status)}>{detail.status}</span></p></div>
              <div className="admin-detail-field"><label>Quote ID</label><p style={{fontFamily:'var(--font-mono)',fontSize:'0.8125rem',color:'var(--text-muted)'}}>{detail.quoteId}</p></div>
              <div className="admin-detail-field"><label>Date</label><p>{new Date(detail.createdAt).toLocaleDateString()}</p></div>
            </div>
            <div style={{marginTop:'1rem'}}>
              <div className="admin-detail-field"><label>Project Description</label><p style={{marginTop:'0.5rem',padding:'0.75rem',background:'var(--bg-raised)',borderRadius:'var(--r-sm)',lineHeight:1.6,fontSize:'0.875rem'}}>{detail.description}</p></div>
            </div>
            <div style={{display:'flex',gap:'0.5rem',marginTop:'1.5rem',flexWrap:'wrap'}}>
              {statusOpts.map(s=>(
                <button key={s} className={`admin-btn ${detail.status===s?'admin-btn-primary':'admin-btn-secondary'}`} style={{fontSize:'0.75rem'}} onClick={()=>updateStatus(detail.id,s)} disabled={busy||detail.status===s}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="admin-card-header"><h2>Quotes ({quotes.length})</h2></div>
      <div className="admin-card">
        {quotes.length===0?<div className="admin-empty"><p>No quotes yet</p></div>:
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Service</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>{quotes.map(q=>(
            <tr key={q.id} style={{cursor:'pointer'}} onClick={()=>setDetail(q)}>
              <td style={{fontWeight:500}}>{q.name}</td>
              <td style={{color:'var(--text-muted)'}}>{q.email}</td>
              <td style={{color:'var(--text-muted)'}}>{q.service}</td>
               <td><span className={badgeClass(q.status)}>{q.status}</span></td>
              <td style={{color:'var(--text-muted)',fontSize:'0.8125rem'}}>{new Date(q.createdAt).toLocaleDateString()}</td>
              <td><button className="admin-btn admin-btn-secondary" style={{fontSize:'0.75rem'}} onClick={(e)=>{e.stopPropagation();setDetail(q);}}>View</button></td>
            </tr>
          ))}</tbody>
        </table>}
      </div>
    </div>
  );
}