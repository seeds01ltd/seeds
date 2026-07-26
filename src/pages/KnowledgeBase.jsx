import { useState, useEffect } from 'react';
import api from '../api';
import { BookOpen, BookMarked, GraduationCap } from 'lucide-react';

const TABS = [
  { key: 'docs', label: 'Documentation', icon: BookOpen },
  { key: 'api', label: 'API Reference', icon: BookMarked },
  { key: 'tutorials', label: 'Tutorials', icon: GraduationCap },
];

export default function KnowledgeBase() {
  const [tab, setTab] = useState('docs');
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [activeCat, setActiveCat] = useState('getting-started');
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => { api.knowledgebase.getCategories().then(setCategories); }, []);
  useEffect(() => { api.knowledgebase.getTutorials().then(setTutorials); }, []);

  useEffect(() => {
    if (tab === 'api') api.knowledgebase.getArticles('api-reference').then(setArticles);
    else if (tab === 'docs') api.knowledgebase.getArticles(activeCat).then(setArticles);
  }, [tab, activeCat]);

  return (
    <div className="page-wrapper" style={{paddingTop:'6rem'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 2rem'}}>
        <h1 style={{fontFamily:'var(--font-heading)',fontSize:'1.75rem',fontWeight:700,marginBottom:'0.25rem'}}>Knowledge Base</h1>
        <p style={{color:'var(--text-muted)',fontSize:'0.875rem',marginBottom:'var(--sp-8)'}}>Documentation, API references, and tutorials</p>
        <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginBottom:'var(--sp-8)',borderBottom:'1px solid var(--border)',paddingBottom:'0.5rem'}}>
          {TABS.map(t => (
            <button key={t.key} onClick={()=>setTab(t.key)} style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.5rem 1rem',background:tab===t.key?'var(--bg-card)':'transparent',border:tab===t.key?'1px solid var(--border)':'1px solid transparent',borderRadius:'var(--r-sm) var(--r-sm) 0 0',color:tab===t.key?'var(--text-primary)':'var(--text-muted)',cursor:'pointer',fontSize:'0.8125rem',fontFamily:'var(--font-body)',borderBottom:tab===t.key?'1px solid var(--bg-base)':'1px solid transparent',marginBottom:'-0.5rem'}}>
              <t.icon size={16}/> {t.label}
            </button>
          ))}
        </div>

        {tab === 'docs' && (
          <div style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:'var(--sp-6)'}}>
            <div style={{display:'flex',flexDirection:'column',gap:'0.25rem'}}>
              {categories.map(c => (
                <button key={c.id} onClick={()=>setActiveCat(c.slug)} style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.5rem 0.75rem',background:activeCat===c.slug?'var(--bg-card)':'transparent',border:'none',borderRadius:'var(--r-sm)',color:activeCat===c.slug?'var(--text-primary)':'var(--text-muted)',cursor:'pointer',fontSize:'0.8125rem',textAlign:'left',fontFamily:'var(--font-body)',width:'100%'}}>
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                  <span style={{marginLeft:'auto',fontSize:'0.7rem',color:'var(--text-muted)'}}>{c.count}</span>
                </button>
              ))}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
              {articles.map(a => (
                <div key={a.id} style={{padding:'var(--sp-4) var(--sp-5)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',cursor:'pointer'}}>
                  <p style={{fontWeight:500,fontSize:'0.9375rem',marginBottom:'0.25rem'}}>{a.title}</p>
                  <p style={{fontSize:'0.8125rem',color:'var(--text-muted)',marginBottom:'0.5rem'}}>{a.excerpt}</p>
                  <p style={{fontSize:'0.7rem',color:'var(--text-muted)'}}>{a.readTime} · Updated {a.updated}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'api' && (
          <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
            {articles.map(a => (
              <div key={a.id} style={{padding:'var(--sp-4) var(--sp-5)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)'}}>
                <p style={{fontWeight:500,fontSize:'0.9375rem',marginBottom:'0.25rem'}}>{a.title}</p>
                <p style={{fontSize:'0.8125rem',color:'var(--text-muted)',marginBottom:'0.5rem'}}>{a.excerpt}</p>
                <p style={{fontSize:'0.7rem',color:'var(--text-muted)'}}>{a.readTime} · Updated {a.updated}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'tutorials' && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'var(--sp-4)'}}>
            {tutorials.map(t => (
              <div key={t.id} style={{padding:'var(--sp-5)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)'}}>
                <p style={{fontWeight:600,fontSize:'0.9375rem',marginBottom:'0.25rem'}}>{t.title}</p>
                <p style={{fontSize:'0.75rem',color:'var(--text-muted)',marginBottom:'0.75rem'}}>{t.category} · {t.duration}</p>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.75rem',color:'var(--text-muted)'}}>
                  <span>{t.students} students</span>
                  <span>⭐ {t.rating}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
