import { useState, useEffect } from 'react';
import api from '../api';
import { CreditCard, FileText, ArrowLeftRight, Wallet } from 'lucide-react';

const TABS = [
  { key: 'payments', label: 'Payments', icon: CreditCard },
  { key: 'invoices', label: 'Invoices', icon: FileText },
  { key: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { key: 'payouts', label: 'Payouts', icon: Wallet },
];

export default function Finance() {
  const [tab, setTab] = useState('payments');
  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [payouts, setPayouts] = useState([]);

  useEffect(() => { api.finance.getPayments().then(setPayments); }, []);
  useEffect(() => { api.finance.getInvoices().then(setInvoices); }, []);
  useEffect(() => { api.finance.getTransactions().then(setTransactions); }, []);
  useEffect(() => { api.finance.getPayouts().then(setPayouts); }, []);

  const badge = (s) => {
    const m = { completed:'badge-em', pending:'badge-yellow', paid:'badge-em' };
    return <span className={`badge ${m[s]||'badge-gray'}`} style={{fontSize:'0.7rem'}}>{s}</span>;
  };

  const totalIn = transactions.filter(t=>t.direction==='in').reduce((s,t)=>s+t.amount,0);
  const totalOut = transactions.filter(t=>t.direction==='out').reduce((s,t)=>s+t.amount,0);

  return (
    <div className="page-wrapper" style={{paddingTop:'6rem'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 2rem'}}>
        <h1 style={{fontFamily:'var(--font-heading)',fontSize:'1.75rem',fontWeight:700,marginBottom:'0.25rem'}}>Finance</h1>
        <p style={{color:'var(--text-muted)',fontSize:'0.875rem',marginBottom:'var(--sp-8)'}}>Payments, invoices, transactions, and payouts</p>
        <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',marginBottom:'var(--sp-8)',borderBottom:'1px solid var(--border)',paddingBottom:'0.5rem'}}>
          {TABS.map(t => (
            <button key={t.key} onClick={()=>setTab(t.key)} style={{display:'flex',alignItems:'center',gap:'0.5rem',padding:'0.5rem 1rem',background:tab===t.key?'var(--bg-card)':'transparent',border:tab===t.key?'1px solid var(--border)':'1px solid transparent',borderRadius:'var(--r-sm) var(--r-sm) 0 0',color:tab===t.key?'var(--text-primary)':'var(--text-muted)',cursor:'pointer',fontSize:'0.8125rem',fontFamily:'var(--font-body)',borderBottom:tab===t.key?'1px solid var(--bg-base)':'1px solid transparent',marginBottom:'-0.5rem'}}>
              <t.icon size={16}/> {t.label}
            </button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'var(--sp-4)',marginBottom:'var(--sp-6)'}}>
          <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',padding:'var(--sp-5)'}}>
            <p style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>Revenue</p>
            <p style={{fontSize:'1.5rem',fontWeight:700,color:'var(--text-accent)'}}>₦{totalIn.toLocaleString()}</p>
          </div>
          <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',padding:'var(--sp-5)'}}>
            <p style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>Expenses</p>
            <p style={{fontSize:'1.5rem',fontWeight:700,color:'#f87171'}}>₦{totalOut.toLocaleString()}</p>
          </div>
          <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',padding:'var(--sp-5)'}}>
            <p style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>Net</p>
            <p style={{fontSize:'1.5rem',fontWeight:700,color:'#818cf8'}}>₦{(totalIn-totalOut).toLocaleString()}</p>
          </div>
        </div>

        {tab === 'payments' && (
          <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
            {payments.map(p => (
              <div key={p.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'var(--sp-4) var(--sp-5)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)'}}>
                <div>
                  <p style={{fontWeight:500,fontSize:'0.9375rem'}}>{p.from}</p>
                  <p style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{p.ref} · {p.method} · {p.date}</p>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                  <span style={{fontFamily:'var(--font-mono)',fontWeight:600}}>₦{p.amount.toLocaleString()}</span>
                  {badge(p.status)}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'invoices' && (
          <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
            {invoices.map(i => (
              <div key={i.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'var(--sp-4) var(--sp-5)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)'}}>
                <div>
                  <p style={{fontWeight:500,fontSize:'0.9375rem'}}>{i.number}</p>
                  <p style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{i.client} · Issued {i.issued} · Due {i.due}</p>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                  <span style={{fontFamily:'var(--font-mono)',fontWeight:600}}>₦{i.amount.toLocaleString()}</span>
                  {badge(i.status)}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'transactions' && (
          <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
            {transactions.map(t => (
              <div key={t.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'var(--sp-4) var(--sp-5)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)'}}>
                <div>
                  <p style={{fontWeight:500,fontSize:'0.9375rem'}}>{t.description}</p>
                  <p style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{t.type} · {t.date}</p>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                  <span style={{fontFamily:'var(--font-mono)',fontWeight:600,color:t.direction==='in'?'var(--text-accent)':'#f87171'}}>
                    {t.direction==='in'?'+':'-'}₦{t.amount.toLocaleString()}
                  </span>
                  {badge(t.status)}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'payouts' && (
          <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
            {payouts.map(p => (
              <div key={p.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'var(--sp-4) var(--sp-5)',background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)'}}>
                <div>
                  <p style={{fontWeight:500,fontSize:'0.9375rem'}}>{p.recipient}</p>
                  <p style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>{p.period}{p.paidAt?` · Paid ${p.paidAt}`:''}</p>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                  <span style={{fontFamily:'var(--font-mono)',fontWeight:600}}>₦{p.amount.toLocaleString()}</span>
                  {badge(p.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
