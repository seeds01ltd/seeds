import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sandboxTasks } from '../data/sandbox';
import { courses } from '../data/courses';
import { ArrowLeft, Play, CheckCircle, Lightbulb, Code2, XCircle, RotateCcw } from 'lucide-react';

export default function Sandbox() {
  const { slug } = useParams();
  const course = courses.find(c => c.slug === slug);
  const tasks = sandboxTasks[slug] || [];

  const [activeTask, setActiveTask] = useState(tasks[0]?.id || null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(`sandbox_${slug}`) || '[]'); }
    catch { return []; }
  });

  const task = useMemo(() => tasks.find(t => t.id === activeTask), [tasks, activeTask]);

  const selectTask = (id) => {
    const t = tasks.find(x => x.id === id);
    setActiveTask(id);
    setCode(t?.starterCode || '');
    setOutput(null);
    setShowHint(false);
    setShowSolution(false);
  };

  const runCode = () => {
    const lines = code.trim().split('\n').length;
    const hasCode = code.trim().length > 20;
    setOutput({
      type: hasCode ? 'success' : 'error',
      message: hasCode
        ? `✓ Code executed (${lines} lines). Check the solution below to compare your approach.`
        : '✗ Please write some code before running.',
    });
  };

  const markComplete = () => {
    if (!completed.includes(activeTask)) {
      const next = [...completed, activeTask];
      setCompleted(next);
      sessionStorage.setItem(`sandbox_${slug}`, JSON.stringify(next));
    }
    setOutput({ type: 'success', message: '✓ Task marked as complete!' });
  };

  const resetTask = () => {
    setCode(task?.starterCode || '');
    setOutput(null);
    setShowHint(false);
    setShowSolution(false);
  };

  if (!course) {
    return (
      <div className="page-wrapper">
        <div className="page-hero">
          <h1 className="page-hero-title">Course not found</h1>
          <Link to="/courses" className="btn btn-outline btn-md" style={{ marginTop: '1rem' }}>Back to Courses</Link>
        </div>
      </div>
    );
  }

  const progressPct = tasks.length ? Math.round((completed.length / tasks.length) * 100) : 0;

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '2rem' }}>
        <div className="grid-bg" />
        <Link to={`/courses/${slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.9rem', position: 'relative', zIndex: 1 }}>
          <ArrowLeft size={16} /> Back to {course.title}
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', position: 'relative', zIndex: 1 }}>
          <Code2 size={28} style={{ color: 'var(--indigo-light)' }} />
          <h1 className="page-hero-title" style={{ fontSize: '1.8rem', margin: 0 }}>Code Sandbox</h1>
        </div>
        <p className="page-hero-desc" style={{ marginBottom: '1rem' }}>
          Practice coding exercises for <strong>{course.title}</strong>
        </p>
        <div style={{ maxWidth: 400, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${progressPct}%`, height: '100%', background: 'var(--emerald-light)', borderRadius: 3, transition: 'width 0.5s ease' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{completed.length}/{tasks.length}</span>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-base)' }}>
        <div className="section" style={{ paddingTop: '1rem' }}>
          {tasks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              <Code2 size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>No sandbox exercises available for this course yet.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {tasks.map(t => {
                  const done = completed.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => selectTask(t.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
                        background: activeTask === t.id ? 'var(--bg-card)' : 'transparent',
                        border: `1px solid ${activeTask === t.id ? 'var(--border)' : 'transparent'}`,
                        borderRadius: 'var(--r-md)', cursor: 'pointer',
                        color: 'var(--text-primary)', fontSize: '0.85rem', textAlign: 'left',
                        fontFamily: 'var(--font-body)', transition: 'all 0.2s',
                      }}
                    >
                      {done ? (
                        <CheckCircle size={16} style={{ color: 'var(--emerald-light)', flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid var(--border)', flexShrink: 0 }} />
                      )}
                      <span>{t.title}</span>
                    </button>
                  );
                })}
              </div>

              <div style={{ minWidth: 0 }}>
                {task && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '1.5rem' }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>{task.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>{task.description}</p>

                      <div style={{ background: '#0d1117', borderRadius: 'var(--r-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem', background: '#161b22', borderBottom: '1px solid #30363d' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>main.js</span>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={resetTask} className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }} title="Reset code">
                              <RotateCcw size={14} />
                            </button>
                          </div>
                        </div>
                        <textarea
                          value={code}
                          onChange={e => setCode(e.target.value)}
                          style={{
                            width: '100%', minHeight: 240, padding: '1rem',
                            background: 'transparent', border: 'none',
                            color: '#e6edf3',                             fontFamily: "'JetBrains Mono','Fira Code',monospace",
                            fontSize: '0.85rem', lineHeight: 1.6, resize: 'vertical',
                            tabSize: 2,
                          }}
                          spellCheck={false}
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                        <button onClick={runCode} className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Play size={14} /> Run
                        </button>
                        <button onClick={() => setShowHint(h => !h)} className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Lightbulb size={14} /> {showHint ? 'Hide Hint' : 'Hint'}
                        </button>
                        <button onClick={() => setShowSolution(s => !s)} className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Code2 size={14} /> {showSolution ? 'Hide Solution' : 'Solution'}
                        </button>
                        <button onClick={markComplete} className="btn btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginLeft: 'auto' }}>
                          <CheckCircle size={14} /> Mark Complete
                        </button>
                      </div>

                      {showHint && (
                        <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', borderRadius: 'var(--r-md)', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                          <strong style={{ color: '#fbbf24' }}>Hint:</strong> {task.hint}
                        </div>
                      )}

                      {showSolution && (
                        <div style={{ marginTop: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Solution</span>
                          </div>
                          <pre style={{
                            background: '#0d1117', padding: '1rem', borderRadius: 'var(--r-md)',
                            fontFamily: "'JetBrains Mono','Fira Code',monospace",
                            fontSize: '0.82rem', lineHeight: 1.6, color: '#e6edf3', overflow: 'auto',
                            border: '1px solid var(--border)',
                          }}>{task.solution}</pre>
                        </div>
                      )}

                      {output && (
                        <div style={{
                          marginTop: '1rem', padding: '0.75rem 1rem',
                          background: output.type === 'success' ? 'rgba(52,211,153,0.08)' : 'rgba(248,113,113,0.08)',
                          border: `1px solid ${output.type === 'success' ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}`,
                          borderRadius: 'var(--r-md)',
                          fontSize: '0.88rem', color: output.type === 'success' ? 'var(--emerald-light)' : 'var(--rose)',
                          display: 'flex', alignItems: 'center', gap: '0.5rem',
                        }}>
                          {output.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                          {output.message}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
