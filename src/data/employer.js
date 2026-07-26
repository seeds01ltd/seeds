function delay(ms = 200) { return new Promise(r => setTimeout(r, ms)); }

const JOB_POSTS = [
  { id: 'ej1', title: 'Senior React Engineer', department: 'Engineering', type: 'Full-time', location: 'Lagos / Remote', salary: '₦10M–₦15M', posted: '2026-07-15', status: 'active', applicants: 24 },
  { id: 'ej2', title: 'Rust Systems Developer', department: 'Engineering', type: 'Full-time', location: 'Lagos', salary: '₦12M–₦20M', posted: '2026-07-10', status: 'active', applicants: 18 },
  { id: 'ej3', title: 'AI/ML Engineer', department: 'AI', type: 'Full-time', location: 'Lagos / Remote', salary: '₦10M–₦16M', posted: '2026-07-20', status: 'active', applicants: 31 },
  { id: 'ej4', title: 'DevOps Engineer', department: 'Infrastructure', type: 'Full-time', location: 'Remote', salary: '₦8M–₦12M', posted: '2026-07-05', status: 'active', applicants: 12 },
  { id: 'ej5', title: 'Junior Software Developer', department: 'Engineering', type: 'Graduate', location: 'Lagos', salary: '₦4M–₦6M', posted: '2026-06-01', status: 'closed', applicants: 56 },
  { id: 'ej6', title: 'Frontend Intern', department: 'Engineering', type: 'Internship', location: 'Lagos', salary: '₦3M', posted: '2026-06-15', status: 'closed', applicants: 42 },
];

const APPLICATIONS = [
  { id: 'ea1', jobId: 'ej1', name: 'Priya Kapoor', email: 'priya.k@example.com', experience: '6 years', stage: 'interview', applied: '2026-07-16', avatar: '👩🏽‍💻', matchScore: 92 },
  { id: 'ea2', jobId: 'ej1', name: 'Daniel Park', email: 'daniel.p@example.com', experience: '4 years', stage: 'review', applied: '2026-07-18', avatar: '👨🏻‍💻', matchScore: 78 },
  { id: 'ea3', jobId: 'ej1', name: 'Fatima Al-Rashid', email: 'fatima.a@example.com', experience: '8 years', stage: 'shortlist', applied: '2026-07-17', avatar: '👩🏾‍💻', matchScore: 95 },
  { id: 'ea4', jobId: 'ej1', name: 'Liam O\'Brien', email: 'liam.o@example.com', experience: '3 years', stage: 'rejected', applied: '2026-07-16', avatar: '👨🏻‍💻', matchScore: 45 },
  { id: 'ea5', jobId: 'ej2', name: 'Chen Wei', email: 'chen.w@example.com', experience: '7 years', stage: 'interview', applied: '2026-07-12', avatar: '👨🏻‍💻', matchScore: 88 },
  { id: 'ea6', jobId: 'ej2', name: 'Aisha Mohammed', email: 'aisha.m@example.com', experience: '5 years', stage: 'shortlist', applied: '2026-07-14', avatar: '👩🏾‍💻', matchScore: 85 },
  { id: 'ea7', jobId: 'ej3', name: 'Dr. Nina Patel', email: 'nina.p@example.com', experience: '10 years', stage: 'offer', applied: '2026-07-21', avatar: '👩🏽‍💻', matchScore: 97 },
];

const GRADUATES = [
  { id: 'eg1', name: 'Maya Singh', program: 'Full-Stack Engineering', graduated: '2026-06-15', grade: 'Distinction', skills: ['React', 'Node.js', 'Python'], avatar: '👩🏾‍💻', seeking: true },
  { id: 'eg2', name: 'Tom Harrison', program: 'Data Science', graduated: '2026-06-15', grade: 'Merit', skills: ['Python', 'SQL', 'ML'], avatar: '👨🏻‍💻', seeking: true },
  { id: 'eg3', name: 'Zara Khan', program: 'Cybersecurity', graduated: '2026-06-15', grade: 'Distinction', skills: ['Network Security', 'Python', 'Linux'], avatar: '👩🏻‍💻', seeking: true },
  { id: 'eg4', name: 'Oluwaseun Adebayo', program: 'Full-Stack Engineering', graduated: '2026-06-15', grade: 'Merit', skills: ['React', 'Rust', 'AWS'], avatar: '👨🏾‍💻', seeking: false },
];

export async function getJobPosts() { await delay(200); return JOB_POSTS; }
export async function getApplications(jobId) { await delay(200); return jobId ? APPLICATIONS.filter(a => a.jobId === jobId) : APPLICATIONS; }
export async function getGraduates() { await delay(200); return GRADUATES; }
export async function updateApplicationStage(id, stage) { await delay(150); const app = APPLICATIONS.find(a => a.id === id); if (app) app.stage = stage; return { ok: true }; }
export async function createJobPost(data) { await delay(200); const post = { id: `ej${Date.now()}`, ...data, posted: new Date().toISOString().split('T')[0], status: 'active', applicants: 0 }; JOB_POSTS.unshift(post); return post; }
