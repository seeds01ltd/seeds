import { useState, useEffect } from 'react';
import api from '../api';
import { Users, TrendingUp, Target } from 'lucide-react';

const TABS = [
  { key: 'leads', label: 'Leads', icon: Users },
  { key: 'pipeline', label: 'Pipeline', icon: TrendingUp },
  { key: 'deals', label: 'Deals', icon: Target },
];

export default function CRM() {
  const [tab, setTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [pipeline, setPipeline] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => { api.crm.getLeads().then(setLeads); }, []);
  useEffect(() => { api.crm.getPipeline().then(setPipeline); }, []);
  useEffect(() => { api.crm.getDeals().then(setDeals); }, []);

  const badge = (s) => {
    const m = { new:'badge-blue', qualified:'badge-indigo', proposal:'badge-yellow', negotiation:'badge-red', 'closed-won':'badge-em', 'closed-lost':'badge-gray' };
    return <span className={`badge ${m[s]||'badge-gray'}`} style={{fontSize:'0.7rem'}}>{s}</span>;
  };

  return (
    <div className="page-wrapper" style={{paddingTop:'6rem'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 2rem'}}>
        <h1 style={{fontFamily:'var(--font-heading)',fontSize:'1.75rem',fontWeight:700,marginBottom:'0.25rem'}}>CRM</h1>
        <p style={{color:'var(--text-muted)',fontSize:'0.875rem',marginBottom:'var(--sp-8)'}}>Leads, pipeline, and deal management</p>
        <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginBottom:'var(--sp-8)',borderBottom:'1px solid var(--border)',paddingBottom:'0.5rem'}}>
          {TABS.map(t => (
            <button key={t.key} onClick={()=>setTab(t.key)} style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.5rem 1rem',background:tab===t.key?'var(--bg-card)':'transparent',border:tab===t.key?'1px solid var(--border)':'1px solid transparent',borderRadius:'var(--r-sm) var(--r-sm) 0 0',color:tab===t.key?'var(--text-primary)':'var(--text-muted)',cursor:'pointer',fontSize:'0.8125rem',fontFamily:'var(--font-body)',borderBottom:tab===t.key?'1px solid var(--bg-base)':'1px solid transparent',marginBottom:'-0.5rem'}}>
              <t.icon size={16}/> {t.label}
            </button>
          ))}
        </div>

        {tab === 'leads' && (
          <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
            {leads.map(l => (
              <div key={l.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'var(--sp-4) var(--sp-5)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)'}}>
                <div>
                  <p style={{fontWeight:500,fontSize:'0.9375rem'}}>{l.name}</p>
                  <p style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{l.contact} · {l.email} · Source: {l.source} · Created {l.created}</p>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                  <span style={{fontFamily:'var(--font-mono)',fontWeight:600,color:'var(--text-accent)'}}>₦{l.value.toLocaleString()}</span>
                  <span style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{l.probability}%</span>
                  {badge(l.status)}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'pipeline' && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:'var(--sp-4)'}}>
            {pipeline.map(p => (
              <div key={p.stage} style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',padding:'var(--sp-5)',textAlign:'center'}}>
                <p style={{fontSize:'0.75rem',textTransform:'uppercase',letterSpacing:'0.05em',color:'var(--text-muted)',marginBottom:'0.5rem'}}>{p.stage}</p>
                <p style={{fontSize:'2rem',fontWeight:700,color:'var(--text-accent)'}}>{p.total}</p>
                <p style={{fontSize:'0.8125rem',color:'var(--text-muted)'}}>₦{p.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'deals' && (
          <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
            {deals.map(d => (
              <div key={d.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'var(--sp-4) var(--sp-5)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)'}}>
                <div>
                  <p style={{fontWeight:500,fontSize:'0.9375rem'}}>{d.name}</p>
                  <p style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{d.contact} · ₦{d.value.toLocaleString()} · {d.probability}% probability</p>
                </div>
                {badge(d.status)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
