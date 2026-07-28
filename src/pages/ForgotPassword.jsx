import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import SectionReveal from '../components/UI/SectionReveal';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await api.auth.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-hero">
        <SectionReveal>
          <h1 className="page-hero-title">Reset Password</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>We&apos;ll send you a reset link</p>
        </SectionReveal>
      </div>
      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section section-sm" style={{ maxWidth: 480 }}>
          <div className="auth-card">
            <div className="auth-card-inner">
            {sent ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: 'var(--text-accent)', padding: 'var(--sp-8)', borderRadius: 'var(--r-md)', fontSize: '0.9375rem' }}>
                  <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Check your email</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>If an account exists for {email}, we&apos;ve sent a password reset link.</p>
                </div>
                <Link to="/login" className="btn btn-primary" style={{ display: 'inline-flex', marginTop: 'var(--sp-6)' }}>Back to Sign In</Link>
              </div>
            ) : (
              <>
                {error && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171', padding: '0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={{ padding: '0.75rem 1rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-primary)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)' }} />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={busy} style={{ justifyContent: 'center' }}>
                    {busy ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: 'var(--sp-6)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Remember your password? <Link to="/login" style={{ color: 'var(--text-accent)' }}>Sign in</Link>
                </p>
              </>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
