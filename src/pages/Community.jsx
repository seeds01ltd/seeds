import { useState, useEffect } from 'react';
import api from '../api';
import { Calendar, Users } from 'lucide-react';

const TABS = [
  { key: 'events', label: 'Events', icon: Calendar },
  { key: 'groups', label: 'Study Groups', icon: Users },
];

export default function Community() {
  const [tab, setTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => { api.community.getEvents().then(setEvents); }, []);
  useEffect(() => { api.community.getStudyGroups().then(setGroups); }, []);

  return (
    <div className="page-wrapper" style={{paddingTop:'6rem'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 2rem'}}>
        <h1 style={{fontFamily:'var(--font-heading)',fontSize:'1.75rem',fontWeight:700,marginBottom:'0.25rem'}}>Community</h1>
        <p style={{color:'var(--text-muted)',fontSize:'0.875rem',marginBottom:'var(--sp-8)'}}>Events, hackathons, and study groups</p>
        <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginBottom:'var(--sp-8)',borderBottom:'1px solid var(--border)',paddingBottom:'0.5rem'}}>
          {TABS.map(t => (
            <button key={t.key} onClick={()=>setTab(t.key)} style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.5rem 1rem',background:tab===t.key?'var(--bg-card)':'transparent',border:tab===t.key?'1px solid var(--border)':'1px solid transparent',borderRadius:'var(--r-sm) var(--r-sm) 0 0',color:tab===t.key?'var(--text-primary)':'var(--text-muted)',cursor:'pointer',fontSize:'0.8125rem',fontFamily:'var(--font-body)',borderBottom:tab===t.key?'1px solid var(--bg-base)':'1px solid transparent',marginBottom:'-0.5rem'}}>
              <t.icon size={16}/> {t.label}
            </button>
          ))}
        </div>

        {tab === 'events' && (
          <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
            {events.map(e => (
              <div key={e.id} style={{padding:'var(--sp-5)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'0.5rem'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
                    <span style={{fontSize:'1.5rem'}}>{e.type === 'hackathon' ? '🏆' : e.type === 'workshop' ? '🔧' : e.type === 'study-group' ? '📚' : '🤝'}</span>
                    <p style={{fontWeight:600,fontSize:'0.9375rem'}}>{e.title}</p>
                  </div>
                  <span className={`badge ${e.status==='upcoming'?'badge-em':'badge-gray'}`} style={{fontSize:'0.7rem'}}>{e.status}</span>
                </div>
                <p style={{fontSize:'0.8125rem',color:'var(--text-secondary)',marginBottom:'0.5rem'}}>{e.desc}</p>
                <div style={{display:'flex',gap:'1rem',fontSize:'0.75rem',color:'var(--text-muted)'}}>
                  <span>{e.date} · {e.time}</span>
                  <span>Host: {e.host}</span>
                  <span>{e.attendees} attending</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'groups' && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'var(--sp-4)'}}>
            {groups.map(g => (
              <div key={g.id} style={{padding:'var(--sp-5)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)'}}>
                <p style={{fontWeight:600,fontSize:'0.9375rem',marginBottom:'0.25rem'}}>{g.name}</p>
                <p style={{fontSize:'0.75rem',color:'var(--text-muted)',marginBottom:'0.75rem'}}>
                  Lead: {g.lead} · {g.members} members
                </p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>Next: {g.nextSession}</span>
                  <button className="btn btn-ghost btn-sm">Join</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
