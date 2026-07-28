import { useState, useEffect } from 'react';
import api from '../api';
import { Columns, Milestone, Clock } from 'lucide-react';

const TABS = [
  { key: 'kanban', label: 'Kanban', icon: Columns },
  { key: 'milestones', label: 'Milestones', icon: Milestone },
  { key: 'time', label: 'Time Tracking', icon: Clock },
];

export default function ProjectManagement() {
  const [tab, setTab] = useState('kanban');
  const [boards, setBoards] = useState([]);
  const [activeBoard, setActiveBoard] = useState(null);
  const [boardData, setBoardData] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);

  useEffect(() => {
    api.pm.getBoards().then(list => {
      setBoards(list);
      if (list.length > 0 && !activeBoard) setActiveBoard(list[0].id);
    });
  }, []);
  useEffect(() => { if (activeBoard) api.pm.getBoard(activeBoard).then(setBoardData); }, [activeBoard]);
  useEffect(() => { api.pm.getMilestones().then(setMilestones); }, []);
  useEffect(() => { api.pm.getTimeEntries().then(setTimeEntries); }, []);

  const pBadge = (p) => {
    const m = { high:'badge-red', medium:'badge-yellow', low:'badge-gray' };
    return <span className={`badge ${m[p]||''}`} style={{fontSize:'0.65rem'}}>{p}</span>;
  };

  return (
    <div className="page-wrapper" style={{paddingTop:'6rem'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 2rem'}}>
        <h1 style={{fontFamily:'var(--font-heading)',fontSize:'1.75rem',fontWeight:700,marginBottom:'0.25rem'}}>Project Management</h1>
        <p style={{color:'var(--text-muted)',fontSize:'0.875rem',marginBottom:'var(--sp-8)'}}>Kanban boards, milestones, and time tracking</p>
        <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginBottom:'var(--sp-8)',borderBottom:'1px solid var(--border)',paddingBottom:'0.5rem'}}>
          {TABS.map(t => (
            <button key={t.key} onClick={()=>setTab(t.key)} style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.5rem 1rem',background:tab===t.key?'var(--bg-card)':'transparent',border:tab===t.key?'1px solid var(--border)':'1px solid transparent',borderRadius:'var(--r-sm) var(--r-sm) 0 0',color:tab===t.key?'var(--text-primary)':'var(--text-muted)',cursor:'pointer',fontSize:'0.8125rem',fontFamily:'var(--font-body)',borderBottom:tab===t.key?'1px solid var(--bg-base)':'1px solid transparent',marginBottom:'-0.5rem'}}>
              <t.icon size={16}/> {t.label}
            </button>
          ))}
        </div>

        {tab === 'kanban' && (
          <div>
            <div style={{display:'flex',gap:'0.5rem',marginBottom:'var(--sp-4)'}}>
              {boards.map(b => (
                <button key={b.id} className={`btn btn-sm ${activeBoard===b.id?'btn-primary':'btn-ghost'}`} onClick={()=>setActiveBoard(b.id)}>{b.name}</button>
              ))}
            </div>
            {boardData && (
              <div style={{display:'grid',gridTemplateColumns:`repeat(${boardData.columns.length},1fr)`,gap:'var(--sp-4)'}}>
                {boardData.columns.map(col => (
                  <div key={col} style={{background:'var(--bg-raised)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',padding:'var(--sp-4)'}}>
                    <p style={{fontSize:'0.75rem',textTransform:'uppercase',letterSpacing:'0.05em',color:'var(--text-muted)',fontWeight:600,marginBottom:'0.75rem'}}>{col}</p>
                    <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                      {boardData.cards.filter(c=>c.column===col).map(card => (
                        <div key={card.id} style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-sm)',padding:'0.75rem'}}>
                          <p style={{fontSize:'0.8125rem',fontWeight:500,marginBottom:'0.25rem'}}>{card.title}</p>
                          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                            <span style={{fontSize:'0.7rem',color:'var(--text-muted)'}}>{card.assignee}</span>
                            {pBadge(card.priority)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'milestones' && (
          <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
            {milestones.map(m => (
              <div key={m.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'var(--sp-4) var(--sp-5)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)'}}>
                <div>
                  <p style={{fontWeight:500,fontSize:'0.9375rem'}}>{m.title}</p>
                  <p style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{m.project} · Due {m.due}</p>
                </div>
                <span className={`badge ${m.status==='completed'?'badge-em':m.status==='in-progress'?'badge-blue':'badge-yellow'}`} style={{fontSize:'0.7rem'}}>{m.status}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'time' && (
          <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
            {timeEntries.map(t => (
              <div key={t.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'var(--sp-4) var(--sp-5)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)'}}>
                <div>
                  <p style={{fontWeight:500,fontSize:'0.9375rem'}}>{t.desc}</p>
                  <p style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{t.user} · {t.project} · {t.date}</p>
                </div>
                <span style={{fontFamily:'var(--font-mono)',fontWeight:600,color:'var(--text-accent)'}}>{t.hours}h</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
