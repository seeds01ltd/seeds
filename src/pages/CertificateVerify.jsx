import { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { Award, Search, CheckCircle, XCircle } from 'lucide-react';

export default function CertificateVerify() {
  const { id } = useParams();
  const [inputId, setInputId] = useState(id || '');
  const [result, setResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleVerify = async () => {
    if (!inputId.trim()) return;
    setSearching(true);
    setResult(null);
    setNotFound(false);
    try {
      const data = await api.certificates.verify(inputId.trim());
      if (data) {
        setResult(data);
        setNotFound(false);
      } else {
        setResult(null);
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="page-wrapper" style={{paddingTop:'6rem'}}>
      <div style={{maxWidth:600,margin:'0 auto',padding:'0 2rem',textAlign:'center'}}>
        <Award size={48} style={{color:'#fbbf24',marginBottom:'1rem'}} />
        <h1 style={{fontFamily:'var(--font-heading)',fontSize:'1.75rem',fontWeight:700,marginBottom:'0.25rem'}}>Certificate Verification</h1>
        <p style={{color:'var(--text-muted)',fontSize:'0.875rem',marginBottom:'var(--sp-8)'}}>Verify a SEED certificate by entering its ID</p>

        <div style={{display:'flex',gap:'0.5rem',marginBottom:'var(--sp-8)'}}>
          <input value={inputId} onChange={e=>setInputId(e.target.value)} placeholder="e.g. SEED-0001" style={{flex:1,padding:'0.75rem 1rem',background:'var(--bg-raised)',border:'1px solid var(--border)',borderRadius:'var(--r-sm)',color:'var(--text-primary)',fontSize:'0.9375rem',fontFamily:'var(--font-body)'}} />
          <button className="btn btn-primary" onClick={handleVerify} disabled={searching}>
            <Search size={16}/> {searching ? 'Verifying...' : 'Verify'}
          </button>
        </div>

        {notFound && (
          <div style={{background:'rgba(248,113,113,0.1)',border:'1px solid rgba(248,113,113,0.2)',borderRadius:'var(--r-md)',padding:'var(--sp-8)'}}>
            <XCircle size={32} style={{color:'#f87171',marginBottom:'0.5rem'}} />
            <p style={{fontWeight:600,color:'#f87171'}}>Certificate not found</p>
            <p style={{fontSize:'0.875rem',color:'var(--text-muted)',marginTop:'0.25rem'}}>No certificate matches the ID you entered. Please check and try again.</p>
          </div>
        )}

        {result && (
          <div style={{background:result.valid?'rgba(16,185,129,0.1)':'rgba(248,113,113,0.1)',border:`1px solid ${result.valid?'rgba(16,185,129,0.2)':'rgba(248,113,113,0.2)'}`,borderRadius:'var(--r-md)',padding:'var(--sp-8)'}}>
            {result.valid ? <CheckCircle size={32} style={{color:'var(--text-accent)',marginBottom:'0.5rem'}} /> : <XCircle size={32} style={{color:'#f87171',marginBottom:'0.5rem'}} />}
            <p style={{fontWeight:600,fontSize:'1.125rem',color:result.valid?'var(--text-accent)':'#f87171',marginBottom:'0.25rem'}}>
              {result.valid ? 'Valid Certificate' : 'Invalid Certificate'}
            </p>
            <p style={{fontSize:'0.875rem',color:'var(--text-muted)',marginBottom:'1.5rem'}}>
              Certificate ID: <strong style={{fontFamily:'var(--font-mono)',color:'var(--text-primary)'}}>{result.certId}</strong>
            </p>
            <div style={{textAlign:'left',maxWidth:300,margin:'0 auto',fontSize:'0.875rem',color:'var(--text-secondary)',lineHeight:2}}>
              <p><strong>Recipient:</strong> {result.recipient}</p>
              <p><strong>Course:</strong> {result.courseTitle}</p>
              <p><strong>Issued:</strong> {result.issued}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
