import { useAuth } from '../contexts/AuthContext';
import { getUserAchievements } from '../data/db';
import { achievements as defs } from '../data/achievements';
import { Trophy, Lock } from 'lucide-react';

export default function DashboardAchievements() {
  const { user } = useAuth();
  const earned = getUserAchievements(user.id);

  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Achievements</h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-8)' }}>
        {earned.length} of {defs.length} unlocked
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--sp-4)' }}>
        {defs.map(def => {
          const isEarned = earned.includes(def.id);
          return (
            <div key={def.id} style={{
              background: 'var(--bg-card)', border: `1px solid ${isEarned ? 'rgba(16,185,129,0.3)' : 'var(--border)'}`,
              borderRadius: 'var(--r-md)', padding: 'var(--sp-5)', textAlign: 'center',
              opacity: isEarned ? 1 : 0.5, transition: 'all var(--t-fast)',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', filter: isEarned ? 'none' : 'grayscale(1)' }}>
                {isEarned ? def.icon : <Lock size={28} style={{ color: 'var(--text-muted)' }} />}
              </div>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>{def.title}</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{def.description}</p>
              {isEarned && <span className="badge badge-em" style={{ marginTop: '0.5rem' }}>Unlocked</span>}
            </div>
          );
        })}
      </div>
    </>
  );
}
