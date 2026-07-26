function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
const EVENTS = [
  { id:'e1', title:'System Design Workshop', type:'workshop', date:'2026-08-10', time:'18:00 WAT', host:'James Okafor', attendees:45, status:'upcoming', desc:'Practical system design interview preparation.' },
  { id:'e2', title:'AI Hackathon — Build with LLMs', type:'hackathon', date:'2026-08-20', time:'09:00 WAT', host:'Dr. Amara Osei', attendees:120, status:'upcoming', desc:'48-hour hackathon building AI-powered applications.' },
  { id:'e3', title:'Rust Study Group — Week 4', type:'study-group', date:'2026-07-28', time:'17:00 WAT', host:'Marcus Chen', attendees:18, status:'upcoming', desc:'Weekly study group for Rust learners.' },
  { id:'e4', title:'Community Meetup — Q3 2026', type:'meetup', date:'2026-07-15', time:'18:30 WAT', host:'Admin', attendees:89, status:'completed', desc:'Quarterly community gathering.' },
  { id:'e5', title:'React Deep Dive — State Management', type:'workshop', date:'2026-07-12', time:'17:00 WAT', host:'Priya Sharma', attendees:67, status:'completed', desc:'Advanced React state management patterns.' },
];
const STUDY_GROUPS = [
  { id:'sg1', name:'Rust Enthusiasts', members:24, nextSession:'2026-07-28', lead:'Marcus Chen' },
  { id:'sg2', name:'System Design Prep', members:32, nextSession:'2026-08-10', lead:'James Okafor' },
  { id:'sg3', name:'Python for Data Science', members:18, nextSession:'2026-08-02', lead:'Dr. Amara Osei' },
  { id:'sg4', name:'AWS Certification', members:15, nextSession:'2026-08-05', lead:'Priya Sharma' },
];
export async function getEvents() { await delay(200); return EVENTS; }
export async function getStudyGroups() { await delay(200); return STUDY_GROUPS; }
