import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api';
import SectionReveal from '../components/UI/SectionReveal';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying');
  const userId = searchParams.get('userId') || 'u5';

  useEffect(() => {
    api.auth.verifyEmail(userId)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [userId]);

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <SectionReveal>
          <h1 className="page-hero-title">Email Verification</h1>
        </SectionReveal>
      </div>
      <div className="content-sections">
        <section style={{ padding: 'var(--sp-16) 0' }}>
          <div style={{ maxWidth: 440, margin: '0 auto', textAlign: 'center' }}>
            {status === 'verifying' && (
              <p style={{ color: 'var(--text-muted)' }}>Verifying your email...</p>
            )}
            {status === 'success' && (
              <>
                <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: 'var(--text-accent)', padding: 'var(--sp-8)', borderRadius: 'var(--r-md)', fontSize: '0.9375rem' }}>
                  <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Email verified</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Your email has been successfully verified.</p>
                </div>
                <Link to="/login" className="btn btn-primary" style={{ display: 'inline-flex', marginTop: 'var(--sp-6)' }}>Sign In</Link>
              </>
            )}
            {status === 'error' && (
              <>
                <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171', padding: 'var(--sp-8)', borderRadius: 'var(--r-md)' }}>
                  <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Verification failed</p>
                  <p style={{ fontSize: '0.875rem' }}>The verification link is invalid or expired.</p>
                </div>
                <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', marginTop: 'var(--sp-6)' }}>Go Home</Link>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
