import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api';
import { BookOpen, Users, ClipboardCheck, DollarSign, TrendingUp } from 'lucide-react';

export default function InstructorHome() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      api.instructor.getAssignments(user.id),
      api.instructor.getStudents(user.id),
      api.instructor.getPayouts(user.id),
      api.instructor.getLiveClasses(user.id),
    ]).then(([assignments, students, payouts, live]) => {
      const pendingGrade = assignments.filter(a => a.status === 'grading').reduce((s, a) => s + (a.submitted || 0), 0);
      const totalEarnings = payouts.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
      setData({ assignments, students, payouts, live, pendingGrade, totalEarnings });
    });
  }, [user.id]);

  if (!data) return <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>;

  const stats = [
    { icon: BookOpen, value: data.assignments.length, label: 'Active Assignments', color: '#818cf8', link: '/instructor/assignments' },
    { icon: Users, value: data.students.length, label: 'Students', color: '#34d399', link: '/instructor/students' },
    { icon: ClipboardCheck, value: data.pendingGrade, label: 'Awaiting Grade', color: '#fbbf24', link: '/instructor/assignments' },
    { icon: DollarSign, value: `₦${data.totalEarnings.toLocaleString()}`, label: 'Total Earned', color: '#f87171', link: '/instructor/revenue' },
  ];

  const upcomingLive = data.live.filter(l => l.status === 'upcoming');

  return (
    <>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
        Instructor Dashboard
      </h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--sp-8)' }}>
        Welcome back, {user.name}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--sp-4)', marginBottom: 'var(--sp-8)' }}>
        {stats.map(({ icon: Icon, value, label, color, link }) => (
          <Link key={label} to={link} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--r-sm)', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{value}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-6)' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-6)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--sp-4)' }}>Recent Assignments</h2>
          {data.assignments.slice(0, 3).map(a => (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{a.title}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.courseTitle} · Due {a.due}</p>
              </div>
              <span className={`badge ${a.status === 'grading' ? 'badge-indigo' : a.status === 'open' ? 'badge-em' : ''}`} style={{ fontSize: '0.7rem' }}>
                {a.submitted}/{a.totalStudents}
              </span>
            </div>
          ))}
          <Link to="/instructor/assignments" style={{ fontSize: '0.8125rem', color: 'var(--text-accent)', marginTop: '0.5rem', display: 'inline-block' }}>View all →</Link>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', padding: 'var(--sp-6)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, marginBottom: 'var(--sp-4)' }}>Upcoming Live Classes</h2>
          {upcomingLive.length === 0 ? (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No upcoming live classes scheduled.</p>
          ) : upcomingLive.map(l => (
            <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{l.title}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{l.date} · {l.time} · {l.duration}</p>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{l.enrolled} enrolled</span>
            </div>
          ))}
          <Link to="/instructor/live" style={{ fontSize: '0.8125rem', color: 'var(--text-accent)', marginTop: '0.5rem', display: 'inline-block' }}>Manage classes →</Link>
        </div>
      </div>
    </>
  );
}
