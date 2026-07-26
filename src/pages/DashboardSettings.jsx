import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserSettings, updateUserSettings } from '../data/db';
import { Bell, Eye, EyeOff, Mail } from 'lucide-react';

export default function DashboardSettings() {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState(() => getUserSettings(user.id));
  const [saved, setSaved] = useState(false);

  const toggle = (key) => {
    setSettings(prev => {
      const next = { ...prev, [key]: !prev[key] };
      updateUserSettings(user.id, next);
      return next;
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Settings</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-8)' }}>Manage your preferences</p>

      <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-6)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--sp-4)' }}><Bell size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Notifications</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            {[
              { key: 'emailProgress', label: 'Progress updates', desc: 'Weekly email summary of your learning' },
              { key: 'emailCertificates', label: 'Certificate alerts', desc: 'Get notified when you earn a certificate' },
              { key: 'emailPromotions', label: 'Promotions & updates', desc: 'New courses, features, and offers' },
              { key: 'emailMessages', label: 'Messages', desc: 'Receive notifications about messages' },
            ].map(({ key, label, desc }) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--sp-3) 0', cursor: 'pointer', borderBottom: '1px solid var(--border-subtle)' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{label}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{desc}</p>
                </div>
                <div
                  onClick={() => toggle(key)}
                  style={{
                    width: 44, height: 24, borderRadius: 12, padding: 2, cursor: 'pointer',
                    background: settings[key] ? 'var(--indigo)' : 'var(--border)',
                    transition: 'background 0.2s ease', position: 'relative', flexShrink: 0,
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', background: '#fff',
                    position: 'absolute', top: 2, left: settings[key] ? 22 : 2,
                    transition: 'left 0.2s ease',
                  }} />
                </div>
              </label>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-6)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--sp-4)' }}><Mail size={16} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Account</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-3)' }}>Signed in as <strong style={{ color: 'var(--text-primary)' }}>{user.email}</strong></p>
          <button className="btn btn-ghost btn-sm" onClick={logout} style={{ color: 'var(--rose)' }}>Sign Out</button>
        </div>

        {saved && <p style={{ fontSize: '0.8125rem', color: 'var(--text-accent)' }}>Settings saved</p>}
      </div>
    </>
  );
}
