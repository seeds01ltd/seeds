import { useState, useEffect } from 'react';
import adminApi from '../AdminApi';

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    adminApi.getSettings().then(d => setSettings(d.settings));
  }, []);

  const handleSave = () => {
    setSaving(true);
    adminApi.updateSettings(settings).then(() => {
      setSaving(false);
      showToast('Settings saved');
    });
  };

  if (!settings) return <div className="admin-empty"><p>Loading settings...</p></div>;

  return (
    <div style={{ maxWidth: 720 }}>
      <div className="admin-card-header">
        <h2>System Settings</h2>
        <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Site Information</h3>
        <div className="admin-form">
          <div className="admin-form-row">
            <label>Site Name</label>
            <input value={settings.siteName.name} onChange={e => setSettings({ ...settings, siteName: { ...settings.siteName, name: e.target.value } })} />
          </div>
          <div className="admin-form-row">
            <label>Tagline</label>
            <input value={settings.siteName.tagline} onChange={e => setSettings({ ...settings, siteName: { ...settings.siteName, tagline: e.target.value } })} />
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>SEO</h3>
        <div className="admin-form">
          <div className="admin-form-row">
            <label>Meta Title</label>
            <input value={settings.seo.title} onChange={e => setSettings({ ...settings, seo: { ...settings.seo, title: e.target.value } })} />
          </div>
          <div className="admin-form-row">
            <label>Meta Description</label>
            <textarea value={settings.seo.description} onChange={e => setSettings({ ...settings, seo: { ...settings.seo, description: e.target.value } })} rows={3} />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Social Links</h3>
        <div className="admin-form">
          <div className="admin-form-row"><label>LinkedIn</label><input value={settings.social.linkedin} onChange={e => setSettings({ ...settings, social: { ...settings.social, linkedin: e.target.value } })} /></div>
          <div className="admin-form-row"><label>Twitter</label><input value={settings.social.twitter} onChange={e => setSettings({ ...settings, social: { ...settings.social, twitter: e.target.value } })} /></div>
          <div className="admin-form-row"><label>GitHub</label><input value={settings.social.github} onChange={e => setSettings({ ...settings, social: { ...settings.social, github: e.target.value } })} /></div>
          <div className="admin-form-row"><label>Email</label><input value={settings.social.email} onChange={e => setSettings({ ...settings, social: { ...settings.social, email: e.target.value } })} /></div>
        </div>
      </div>

      {toast && <div className={`admin-toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  );
}
