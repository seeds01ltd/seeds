import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';
import { DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function InstructorRevenue() {
  const { user } = useAuth();
  const [payouts, setPayouts] = useState([]);

  useEffect(() => {
    api.instructor.getPayouts(user.id).then(setPayouts);
  }, [user.id]);

  const totalPaid = payouts.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const pendingAmount = payouts.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const totalSessions = payouts.reduce((s, p) => s + (p.courses || []).length, 0);

  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Revenue</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-8)' }}>
        Your earnings and payout history
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--sp-4)', marginBottom: 'var(--sp-8)' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-5)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Total Earned</p>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-accent)' }}>₦{totalPaid.toLocaleString()}</p>
        </div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-5)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Pending</p>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fbbf24' }}>₦{pendingAmount.toLocaleString()}</p>
        </div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-5)' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Total Payouts</p>
          <p style={{ fontSize: '1.75rem', fontWeight: 700, color: '#818cf8' }}>{payouts.length}</p>
        </div>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-6)' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--sp-4)' }}>Payout History</h2>
        <table className="admin-table">
          <thead><tr><th>Period</th><th>Amount</th><th>Status</th><th>Paid Date</th><th>Courses</th></tr></thead>
          <tbody>
            {payouts.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 500 }}>{p.period}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>₦{p.amount.toLocaleString()}</td>
                <td><span className={`badge ${p.status === 'paid' ? 'badge-em' : 'badge-yellow'}`} style={{ fontSize: '0.7rem' }}>{p.status}</span></td>
                <td style={{ color: 'var(--text-muted)' }}>{p.paidAt || '-'}</td>
                <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.courses.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
