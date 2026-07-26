import { useState } from 'react';
import SectionReveal from '../components/UI/SectionReveal';
import api from '../api';

export default function Contact() {
  const [status, setStatus] = useState('idle');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    api.contact.submit(data).then(() => {
      setStatus('success');
      e.target.reset();
      setTimeout(() => setStatus('idle'), 5000);
    }).catch(() => setStatus('error'));
  };

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <h1 className="page-hero-title">Start a Conversation</h1>
        <p className="section-desc" style={{ margin: '0 auto' }}>
          Whether you need a dedicated engineering team, a technical audit, or a custom AI platform, we're ready to tackle your hardest problems.
        </p>
      </div>

      <div className="content-sections">
        <section className="section">
          <SectionReveal>
            <div className="grid-2" style={{ gap: '4rem', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--glow-green)' }}>Get in Touch</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  Our technical directors review all inquiries. We typically respond within 24 hours to schedule an initial discovery call.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>Global HQ (Lagos)</h3>
                    <p style={{ color: 'var(--text-muted)' }}>15a Bishop Oluwole Street<br/>Victoria Island, Lagos<br/>Nigeria</p>
                  </div>
                  
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>Direct Contact</h3>
                    <p style={{ color: 'var(--text-muted)' }}>📧 hello@seed.ng</p>
                    <p style={{ color: 'var(--text-muted)' }}>📞 +234 1 700 0000</p>
                  </div>
                </div>
              </div>
              
              <div className="card" style={{ padding: '2.5rem', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {status === 'success' && (
                    <div style={{ padding: '1rem', background: '#00ff8815', border: '1px solid #00ff8830', borderRadius: '4px', color: 'var(--glow-green)' }}>
                      Message sent successfully. We will be in touch soon.
                    </div>
                  )}
                  {status === 'error' && (
                    <div style={{ padding: '1rem', background: '#ff333315', border: '1px solid #ff333330', borderRadius: '4px', color: '#ff3333' }}>
                      There was an error sending your message. Please try again.
                    </div>
                  )}
                  
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="name" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Full Name</label>
                    <input type="text" id="name" name="name" required style={{ padding: '0.8rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '4px', color: '#fff', fontSize: '1rem' }} />
                  </div>
                  
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="email" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Work Email</label>
                    <input type="email" id="email" name="email" required style={{ padding: '0.8rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '4px', color: '#fff', fontSize: '1rem' }} />
                  </div>
                  
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="company" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Company / Organization</label>
                    <input type="text" id="company" name="company" style={{ padding: '0.8rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '4px', color: '#fff', fontSize: '1rem' }} />
                  </div>
                  
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="message" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Project Details or Inquiry</label>
                    <textarea id="message" name="message" rows="5" required style={{ padding: '0.8rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '4px', color: '#fff', fontSize: '1rem', resize: 'vertical' }}></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary" disabled={status === 'loading'} style={{ marginTop: '1rem', width: '100%' }}>
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </SectionReveal>
        </section>
      </div>
    </div>
  );
}
