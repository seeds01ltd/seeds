import { useState, useEffect } from 'react';
import api from '../api';
import { MessageSquare, MessageCircle } from 'lucide-react';

const TABS = [
  { key: 'inbox', label: 'Messages', icon: MessageSquare },
  { key: 'forums', label: 'Forums', icon: MessageCircle },
];

export default function Messages() {
  const [tab, setTab] = useState('inbox');
  const [messages, setMessages] = useState([]);
  const [threads, setThreads] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => { api.communication.getMessages().then(setMessages); }, []);
  useEffect(() => { api.communication.getForumThreads().then(setThreads); }, []);

  return (
    <div className="page-wrapper" style={{paddingTop:'6rem'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 2rem'}}>
        <h1 style={{fontFamily:'var(--font-heading)',fontSize:'1.75rem',fontWeight:700,marginBottom:'0.25rem'}}>Communication</h1>
        <p style={{color:'var(--text-muted)',fontSize:'0.875rem',marginBottom:'var(--sp-8)'}}>Messages and community forums</p>
        <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginBottom:'var(--sp-8)',borderBottom:'1px solid var(--border)',paddingBottom:'0.5rem'}}>
          {TABS.map(t => (
            <button key={t.key} onClick={()=>setTab(t.key)} style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.5rem 1rem',background:tab===t.key?'var(--bg-card)':'transparent',border:tab===t.key?'1px solid var(--border)':'1px solid transparent',borderRadius:'var(--r-sm) var(--r-sm) 0 0',color:tab===t.key?'var(--text-primary)':'var(--text-muted)',cursor:'pointer',fontSize:'0.8125rem',fontFamily:'var(--font-body)',borderBottom:tab===t.key?'1px solid var(--bg-base)':'1px solid transparent',marginBottom:'-0.5rem'}}>
              <t.icon size={16}/> {t.label}
            </button>
          ))}
        </div>

        {tab === 'inbox' && (
          <div style={{display:'grid',gridTemplateColumns:'400px 1fr',gap:'var(--sp-4)'}}>
            <div style={{display:'flex',flexDirection:'column',gap:'0.25rem'}}>
              {messages.map(m => (
                <div key={m.id} onClick={()=>setSelected(m)} style={{display:'flex',alignItems:'center',gap:'0.75rem',padding:'0.75rem 1rem',background:selected?.id===m.id?'var(--bg-card)':'transparent',border:'1px solid transparent',borderRadius:'var(--r-md)',cursor:'pointer',borderColor:selected?.id===m.id?'var(--border)':'transparent'}}>
                  <span style={{fontSize:'1.25rem'}}>{m.avatar}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <p style={{fontSize:'0.8125rem',fontWeight:m.unread?600:400}}>{m.from}</p>
                      <span style={{fontSize:'0.7rem',color:'var(--text-muted)'}}>{m.time}</span>
                    </div>
                    <p style={{fontSize:'0.75rem',fontWeight:m.unread?500:400,color:m.unread?'var(--text-primary)':'var(--text-muted)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{m.subject}</p>
                  </div>
                  {m.unread && <div style={{width:8,height:8,borderRadius:'50%',background:'var(--indigo-light)',flexShrink:0}}/>}
                </div>
              ))}
            </div>
            <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',padding:'var(--sp-6)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              {selected ? (
                <div style={{width:'100%'}}>
                  <p style={{fontWeight:600,fontSize:'1rem',marginBottom:'0.25rem'}}>{selected.subject}</p>
                  <p style={{fontSize:'0.8125rem',color:'var(--text-muted)',marginBottom:'1.5rem'}}>From: {selected.from} · {selected.time}</p>
                  <p style={{fontSize:'0.875rem',color:'var(--text-secondary)',lineHeight:1.7}}>{selected.preview}</p>
                </div>
              ) : (
                <p style={{color:'var(--text-muted)'}}>Select a message to read</p>
              )}
            </div>
          </div>
        )}

        {tab === 'forums' && (
          <div style={{display:'flex',flexDirection:'column',gap:'0.25rem'}}>
            {threads.map(t => (
              <div key={t.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'var(--sp-4) var(--sp-5)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)'}}>
                <div>
                  <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                    {t.pinned && <span style={{fontSize:'0.7rem',color:'var(--text-muted)'}}>📌</span>}
                    <p style={{fontWeight:500,fontSize:'0.9375rem'}}>{t.title}</p>
                  </div>
                  <p style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>by {t.author} · Last post {t.lastPost}</p>
                </div>
                <div style={{textAlign:'right',fontSize:'0.75rem',color:'var(--text-muted)'}}>
                  <p>{t.replies} replies</p>
                  <p>{t.views} views</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
