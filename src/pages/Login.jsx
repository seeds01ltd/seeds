import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SectionReveal from '../components/UI/SectionReveal';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  if (user) { navigate(from, { replace: true }); return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email, password);
      navigate(from);
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
          <h1 className="page-hero-title">Sign In</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>Welcome back to the SEED platform</p>
        </SectionReveal>
      </div>
      <div className="content-sections">
        <section style={{ padding: 'var(--sp-16) 0' }}>
          <div style={{ maxWidth: 440, margin: '0 auto' }}>
            {/* DEMO: remove this block for production */}
            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 'var(--r-md)', padding: 'var(--sp-4)', marginBottom: 'var(--sp-6)' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-accent)', fontWeight: 600, marginBottom: '0.5rem' }}>Demo Credentials</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setEmail('admin@seed.agency'); setPassword('admin123'); }}>
                  Admin
                </button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setEmail('sarah@example.com'); setPassword('student123'); }}>
                  Student (Verified)
                </button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setEmail('alex@example.com'); setPassword('student123'); }}>
                  Student (Unverified)
                </button>
              </div>
            </div>
            {error && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171', padding: '0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={{ padding: '0.75rem 1rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-primary)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{ padding: '0.75rem 1rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-primary)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to="/forgot-password" style={{ fontSize: '0.8125rem', color: 'var(--text-accent)' }}>Forgot password?</Link>
              </div>
              <button type="submit" className="btn btn-primary" disabled={busy} style={{ justifyContent: 'center' }}>
                {busy ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: 'var(--sp-6)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Don&apos;t have an account? <Link to="/register" style={{ color: 'var(--text-accent)' }}>Create one</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
