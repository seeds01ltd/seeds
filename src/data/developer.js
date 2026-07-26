function delay(ms = 200) { return new Promise(r => setTimeout(r, ms)); }

const TASKS = [
  { id: 'dt1', title: 'Implement user auth middleware', project: 'Nexus Health', status: 'in-progress', priority: 'high', due: '2026-08-05', assignee: 'Sarah Johnson', sprint: 'Sprint 29' },
  { id: 'dt2', title: 'Refactor API rate limiter', project: 'Nexus Health', status: 'todo', priority: 'medium', due: '2026-08-10', assignee: 'Sarah Johnson', sprint: 'Sprint 30' },
  { id: 'dt3', title: 'Write E2E tests for payment flow', project: 'Nexus Health', status: 'done', priority: 'high', due: '2026-07-28', assignee: 'Sarah Johnson', sprint: 'Sprint 28' },
  { id: 'dt4', title: 'Optimise database query performance', project: 'Orbital Trading', status: 'in-progress', priority: 'high', due: '2026-08-03', assignee: 'Alex Rivera', sprint: 'Sprint 15' },
  { id: 'dt5', title: 'Update API documentation', project: 'Orbital Trading', status: 'todo', priority: 'low', due: '2026-08-12', assignee: 'Alex Rivera', sprint: 'Sprint 16' },
  { id: 'dt6', title: 'Fix memory leak in stream processor', project: 'Orbital Trading', status: 'done', priority: 'high', due: '2026-07-25', assignee: 'Alex Rivera', sprint: 'Sprint 15' },
];

const SPRINTS = [
  { id: 'ds1', name: 'Sprint 29', project: 'Nexus Health', startDate: '2026-07-22', endDate: '2026-08-04', totalTasks: 8, completedTasks: 5, velocity: 62 },
  { id: 'ds2', name: 'Sprint 30', project: 'Nexus Health', startDate: '2026-08-05', endDate: '2026-08-18', totalTasks: 6, completedTasks: 0, velocity: 0 },
  { id: 'ds3', name: 'Sprint 15', project: 'Orbital Trading', startDate: '2026-07-22', endDate: '2026-08-04', totalTasks: 10, completedTasks: 7, velocity: 70 },
  { id: 'ds4', name: 'Sprint 16', project: 'Orbital Trading', startDate: '2026-08-05', endDate: '2026-08-18', totalTasks: 5, completedTasks: 0, velocity: 0 },
];

const REPOS = [
  { id: 'dr1', name: 'nexus-health-api', language: 'Python', stars: 24, forks: 8, prsOpen: 3, lastCommit: '2026-07-24' },
  { id: 'dr2', name: 'nexus-health-frontend', language: 'TypeScript', stars: 18, forks: 6, prsOpen: 2, lastCommit: '2026-07-23' },
  { id: 'dr3', name: 'orbital-trading-engine', language: 'Rust', stars: 42, forks: 12, prsOpen: 5, lastCommit: '2026-07-25' },
  { id: 'dr4', name: 'orbital-data-pipeline', language: 'Python', stars: 15, forks: 4, prsOpen: 1, lastCommit: '2026-07-22' },
];

const CODE_REVIEWS = [
  { id: 'dc1', title: 'feat: add patient consent API', repo: 'nexus-health-api', author: 'Emily Watson', status: 'changes-requested', created: '2026-07-23' },
  { id: 'dc2', title: 'fix: correct date parsing in reports', repo: 'nexus-health-frontend', author: 'Sarah Johnson', status: 'approved', created: '2026-07-22' },
  { id: 'dc3', title: 'perf: optimise order matching', repo: 'orbital-trading-engine', author: 'Marcus Chen', status: 'pending', created: '2026-07-24' },
  { id: 'dc4', title: 'test: add unit tests for risk module', repo: 'orbital-trading-engine', author: 'Alex Rivera', status: 'pending', created: '2026-07-24' },
  { id: 'dc5', title: 'chore: update dependencies', repo: 'nexus-health-api', author: 'Thomas Ekwe', status: 'approved', created: '2026-07-21' },
];

const TIME_ENTRIES = [
  { id: 'dte1', date: '2026-07-24', project: 'Nexus Health', hours: 6.5, description: 'Auth middleware implementation' },
  { id: 'dte2', date: '2026-07-24', project: 'Nexus Health', hours: 1.5, description: 'Code review' },
  { id: 'dte3', date: '2026-07-23', project: 'Nexus Health', hours: 7, description: 'API rate limiter refactoring' },
  { id: 'dte4', date: '2026-07-22', project: 'Nexus Health', hours: 8, description: 'E2E test development' },
  { id: 'dte5', date: '2026-07-24', project: 'Orbital Trading', hours: 5, description: 'Database query optimisation' },
  { id: 'dte6', date: '2026-07-23', project: 'Orbital Trading', hours: 6, description: 'Memory leak investigation' },
];

export async function getDevTasks() { await delay(200); return TASKS; }
export async function getDevSprints() { await delay(200); return SPRINTS; }
export async function getDevRepos() { await delay(200); return REPOS; }
export async function getDevCodeReviews() { await delay(200); return CODE_REVIEWS; }
export async function getDevTimeEntries() { await delay(200); return TIME_ENTRIES; }
