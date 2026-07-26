function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
const BOARDS = [
  { id:'b1', name:'Nexus Health — Sprint 29' },
  { id:'b2', name:'Orbital Trading — Sprint 15' },
];
const COLUMNS = { 'b1': ['Backlog','In Progress','Review','Done'], 'b2': ['Backlog','In Progress','Review','Done'] };
const CARDS = {
  'b1': [
    { id:'k1', title:'Design patient data model', column:'Done', assignee:'Thomas', priority:'high' },
    { id:'k2', title:'Implement consent API', column:'Review', assignee:'Emily', priority:'high' },
    { id:'k3', title:'Build dashboard widget', column:'In Progress', assignee:'Sarah', priority:'medium' },
    { id:'k4', title:'Write migration scripts', column:'Backlog', assignee:'Alex', priority:'low' },
    { id:'k5', title:'API rate limiting', column:'Backlog', assignee:'Thomas', priority:'medium' },
    { id:'k6', title:'E2E test suite', column:'In Progress', assignee:'Sarah', priority:'high' },
  ],
  'b2': [
    { id:'k7', title:'Optimise order matching', column:'Review', assignee:'Marcus', priority:'high' },
    { id:'k8', title:'Memory pool allocation', column:'Done', assignee:'Alex', priority:'high' },
    { id:'k9', title:'Benchmark reporting', column:'In Progress', assignee:'Alex', priority:'medium' },
    { id:'k10', title:'Risk module refactor', column:'Backlog', assignee:'Marcus', priority:'low' },
  ],
};
const PM_MILESTONES = [
  { id:'pm1', title:'Architecture sign-off', project:'Nexus Health', due:'2026-08-15', status:'pending' },
  { id:'pm2', title:'Beta release', project:'Nexus Health', due:'2026-09-01', status:'pending' },
  { id:'pm3', title:'Performance benchmark', project:'Orbital Trading', due:'2026-08-10', status:'in-progress' },
];
const PM_TIME = [
  { id:'pt1', user:'Sarah', project:'Nexus Health', hours:7, date:'2026-07-25', desc:'API development' },
  { id:'pt2', user:'Alex', project:'Orbital Trading', hours:6, date:'2026-07-25', desc:'Memory optimisation' },
  { id:'pt3', user:'Thomas', project:'Nexus Health', hours:8, date:'2026-07-24', desc:'Backend architecture' },
];
export async function getBoards() { await delay(200); return BOARDS; }
export async function getBoard(id) { await delay(150); return { board: BOARDS.find(b=>b.id===id), columns: COLUMNS[id]||[], cards: CARDS[id]||[] }; }
export async function getPmMilestones() { await delay(150); return PM_MILESTONES; }
export async function getPmTimeEntries() { await delay(150); return PM_TIME; }
