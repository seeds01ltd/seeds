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
  const from = location.state?.from || '/dashboard';

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
      <div className="page-hero" style={{ textAlign: 'center' }}>
        <SectionReveal>
          <span className="page-hero-eyebrow" style={{ justifyContent: 'center' }}>Portal</span>
          <h1 className="page-hero-title">Sign In</h1>
          <p className="page-hero-desc" style={{ margin: '0 auto' }}>Welcome back to the SEED platform</p>
        </SectionReveal>
      </div>
      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section section-sm" style={{ maxWidth: 480 }}>
          <div className="auth-card">
            <div className="auth-card-inner">
              {error && (
                <div className="auth-error">{error}</div>
              )}
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="form-input" />
                </div>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="form-label">Password</label>
                    <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--indigo-light)' }}>Forgot?</Link>
                  </div>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required className="form-input" />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" disabled={busy} style={{ width: '100%', justifyContent: 'center' }}>
                  {busy ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
              <p className="auth-footer-text">
                Don't have an account? <Link to="/register" className="auth-link">Create one</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
