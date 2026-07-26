import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SectionReveal from '../components/UI/SectionReveal';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();

  if (user) { navigate('/', { replace: true }); return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (password !== confirm) { setError('Passwords do not match'); return; }
    setBusy(true);
    try {
      await register({ name, email, password });
      navigate('/profile');
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
          <h1 className="page-hero-title">Create Account</h1>
          <p className="section-desc" style={{ margin: '0 auto' }}>Join the SEED learning platform</p>
        </SectionReveal>
      </div>
      <div className="content-sections">
        <section style={{ padding: 'var(--sp-16) 0' }}>
          <div style={{ maxWidth: 440, margin: '0 auto' }}>
            {error && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', color: '#f87171', padding: '0.75rem', borderRadius: 'var(--r-sm)', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" required style={{ padding: '0.75rem 1rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-primary)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={{ padding: '0.75rem 1rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-primary)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" required style={{ padding: '0.75rem 1rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-primary)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Confirm Password</label>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat your password" required style={{ padding: '0.75rem 1rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', color: 'var(--text-primary)', fontSize: '0.9375rem', fontFamily: 'var(--font-body)' }} />
              </div>
              <button type="submit" className="btn btn-primary" disabled={busy} style={{ justifyContent: 'center' }}>
                {busy ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: 'var(--sp-6)', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--text-accent)' }}>Sign in</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
