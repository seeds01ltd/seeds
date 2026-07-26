import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../AdminContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const { login, user } = useAdmin();
  const navigate = useNavigate();

  if (user) { navigate('/admin', { replace: true }); return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <h1>Welcome back</h1>
        <p>Sign in to the SEED admin dashboard</p>
        {error && <div className="admin-error">{error}</div>}
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-row">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@seed.agency" required />
          </div>
          <div className="admin-form-row">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={busy} style={{ marginTop: '0.5rem' }}>
            {busy ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}