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
      <div className="page-hero" style={{ textAlign: 'center' }}>
        <SectionReveal>
          <span className="page-hero-eyebrow" style={{ justifyContent: 'center' }}>Onboarding</span>
          <h1 className="page-hero-title">Create Account</h1>
          <p className="page-hero-desc" style={{ margin: '0 auto' }}>Join the SEED learning platform</p>
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
                  <label className="form-label">Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" required className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" required className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat your password" required className="form-input" />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" disabled={busy} style={{ width: '100%', justifyContent: 'center' }}>
                  {busy ? 'Creating account...' : 'Create Account'}
                </button>
              </form>
              <p className="auth-footer-text">
                Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
