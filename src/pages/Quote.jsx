import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionReveal from '../components/UI/SectionReveal';
import api from '../api';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export default function Quote() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '',
    service: '', budget: '', timeline: '', description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.services.getAll().then(setServices);
  }, []);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.service || !form.description) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const res = await api.quote.submit(form);
      setResult(res);
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  if (result) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center', maxWidth: 500, padding: '2rem' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle size={32} style={{ color: 'var(--emerald-light)' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Quote Request Received</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '0.5rem' }}>
            Your reference: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--indigo-light)', fontWeight: 600 }}>{result.id}</span>
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            A senior engineer will review your project and respond within 24 hours.
          </p>
          <Link to="/" className="btn btn-primary btn-lg">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" />
        <div className="glow-blob glow-blob-em" style={{ width: 400, height: 300, top: '0', right: '10%', opacity: 0.15 }} />
        <div className="page-hero-eyebrow">Get a Quote</div>
        <h1 className="page-hero-title">
          Tell us about<br /><span style={{ background: 'linear-gradient(135deg,#34d399,#60a5fa)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>your project</span>
        </h1>
        <p className="page-hero-desc">
          Fill in the details below and a senior engineer will get back to you with a tailored quote within 24 hours.
        </p>
      </div>

      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section" style={{ maxWidth: 680, margin: '0 auto', paddingTop: '2rem' }}>
          <SectionReveal>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {error && (
                <div style={{ padding: '1rem', background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 'var(--r-md)', color: '#fda4af', fontSize: '0.9rem' }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Name *</label>
                  <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input className="form-input" name="company" value={form.company} onChange={handleChange} placeholder="Company name (optional)" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000 (optional)" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Service *</label>
                <select className="form-select" name="service" value={form.service} onChange={handleChange}>
                  <option value="">Select a service...</option>
                  {services.map(s => (
                    <option key={s.slug} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Budget Range</label>
                  <select className="form-select" name="budget" value={form.budget} onChange={handleChange}>
                    <option value="">Select range...</option>
                    {['Under ₦5M', '₦5M – ₦15M', '₦15M – ₦30M', '₦30M – ₦60M', '₦60M+'].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Timeline</label>
                  <select className="form-select" name="timeline" value={form.timeline} onChange={handleChange}>
                    <option value="">Select timeline...</option>
                    {['ASAP', '1–2 months', '3–6 months', '6+ months'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Description *</label>
                <textarea
                  className="form-textarea"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your project, goals, and any key requirements..."
                  rows={6}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Quote Request'}
              </button>
            </form>
          </SectionReveal>

          <SectionReveal>
            <div style={{ marginTop: '4rem', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: '2rem 3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '0.25rem' }}>Prefer to talk?</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Call us directly or send an email.</p>
              </div>
              <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <div>+234 1 700 0000</div>
                <div style={{ color: 'var(--indigo-light)' }}>hello@seed.ng</div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
