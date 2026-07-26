import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api';
import SectionReveal from '../components/UI/SectionReveal';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const token = searchParams.get('token') || 'demo-reset-token-u4';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (password !== confirm) { setError('Passwords do not match'); return; }
    setBusy(true);
    try {
      await api.auth.resetPassword(token, password);
      setDone(true);
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
          <h1 className="page-hero-title">Set New Password</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>Choose a strong new password</p>
        </SectionReveal>
      </div>
      <div className="content-sections">
        <section style={{ padding: 'var(--sp-16) 0' }}>
          <div style={{ maxWidth: 440, margin: '0 auto' }}>
            {done ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: 'var(--text-accent)', padding: 'var(--sp-8)', borderRadius: 'var(--r-md)', fontSize: '0.9375rem' }}>
                  <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Password reset successful</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>You can now sign in with your new password.</p>
                </div>
                <Link to="/login" className="btn btn-primary" style={{ display: 'inline-flex', marginTop: 'var(--sp-6)' }}>Sign In</Link>
              </div>
            ) : (
              <>
                {error && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171', padding: '0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>New Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" required style={{ padding: '0.75rem 1rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-primary)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Confirm New Password</label>
                    <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat your password" required style={{ padding: '0.75rem 1rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-primary)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)' }} />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={busy} style={{ justifyContent: 'center' }}>
                    {busy ? 'Resetting...' : 'Reset Password'}
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
