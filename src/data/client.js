function delay(ms = 200) { return new Promise(r => setTimeout(r, ms)); }

const PROJECTS = [
  { id: 'cp1', title: 'Nexus Health Platform', status: 'active', description: 'EHR platform serving 1.2M patients. Phase 2 — AI diagnostics integration.', progress: 65, startDate: '2026-03-01', deadline: '2026-09-30', budget: 45000000, spent: 29250000, manager: 'James Okafor' },
  { id: 'cp2', title: 'Orbital Trading Engine', status: 'active', description: 'Ultra-low-latency trading infrastructure. Currently in performance optimisation.', progress: 80, startDate: '2026-01-15', deadline: '2026-08-15', budget: 62000000, spent: 49600000, manager: 'Priya Sharma' },
  { id: 'cp3', title: 'MedTech Firmware Suite', status: 'completed', description: 'Firmware development for Class II medical devices. Validation phase complete.', progress: 100, startDate: '2025-09-01', deadline: '2026-06-30', budget: 38000000, spent: 36100000, manager: 'Marcus Chen' },
];

const MILESTONES = [
  { id: 'cm1', projectId: 'cp1', title: 'Architecture Review', due: '2026-04-15', status: 'completed' },
  { id: 'cm2', projectId: 'cp1', title: 'Core Module Development', due: '2026-06-30', status: 'completed' },
  { id: 'cm3', projectId: 'cp1', title: 'AI Integration', due: '2026-08-15', status: 'in-progress' },
  { id: 'cm4', projectId: 'cp1', title: 'Security Audit', due: '2026-09-15', status: 'pending' },
  { id: 'cm5', projectId: 'cp1', title: 'Go-Live', due: '2026-09-30', status: 'pending' },
  { id: 'cm6', projectId: 'cp2', title: 'Engine Optimisation', due: '2026-07-15', status: 'completed' },
  { id: 'cm7', projectId: 'cp2', title: 'Load Testing', due: '2026-08-01', status: 'in-progress' },
  { id: 'cm8', projectId: 'cp2', title: 'Production Deployment', due: '2026-08-15', status: 'pending' },
];

const TASKS = [
  { id: 'ct1', projectId: 'cp1', title: 'Design AI model API contract', assignee: 'Dr. Amara Osei', status: 'done', due: '2026-07-20', priority: 'high' },
  { id: 'ct2', projectId: 'cp1', title: 'Implement patient data pipeline', assignee: 'Thomas Ekwe', status: 'in-progress', due: '2026-08-05', priority: 'high' },
  { id: 'ct3', projectId: 'cp1', title: 'Write integration tests', assignee: 'Sarah Johnson', status: 'todo', due: '2026-08-15', priority: 'medium' },
  { id: 'ct4', projectId: 'cp1', title: 'Deploy staging environment', assignee: 'Priya Sharma', status: 'todo', due: '2026-08-20', priority: 'low' },
  { id: 'ct5', projectId: 'cp2', title: 'Optimise memory allocation', assignee: 'Marcus Chen', status: 'done', due: '2026-07-25', priority: 'high' },
  { id: 'ct6', projectId: 'cp2', title: 'Run benchmark suite', assignee: 'Alex Rivera', status: 'in-progress', due: '2026-08-01', priority: 'high' },
];

const FILES = [
  { id: 'cf1', projectId: 'cp1', name: 'Architecture_Diagram_v3.pdf', type: 'document', size: '2.1 MB', uploaded: '2026-07-10', uploadedBy: 'James Okafor' },
  { id: 'cf2', projectId: 'cp1', name: 'API_Specification.yaml', type: 'document', size: '48 KB', uploaded: '2026-07-12', uploadedBy: 'Dr. Amara Osei' },
  { id: 'cf3', projectId: 'cp1', name: 'Sprint_Report_W29.pdf', type: 'document', size: '890 KB', uploaded: '2026-07-18', uploadedBy: 'Thomas Ekwe' },
  { id: 'cf4', projectId: 'cp2', name: 'Performance_Baseline.pdf', type: 'document', size: '3.4 MB', uploaded: '2026-07-15', uploadedBy: 'Marcus Chen' },
  { id: 'cf5', projectId: 'cp2', name: 'Trade_Simulator_Results.csv', type: 'spreadsheet', size: '12 MB', uploaded: '2026-07-20', uploadedBy: 'Alex Rivera' },
];

const CONTRACTS = [
  { id: 'cc1', projectId: 'cp1', title: 'Nexus Health — Master Services Agreement', signed: '2026-02-15', value: 45000000, status: 'active', type: 'Fixed Price' },
  { id: 'cc2', projectId: 'cp2', title: 'Orbital Capital — Software Development Contract', signed: '2026-01-10', value: 62000000, status: 'active', type: 'Time & Materials' },
  { id: 'cc3', projectId: 'cp3', title: 'MedTech — Firmware Development Agreement', signed: '2025-08-20', value: 38000000, status: 'completed', type: 'Fixed Price' },
];

const INVOICES = [
  { id: 'ci1', projectId: 'cp1', number: 'INV-2026-0042', amount: 7500000, issued: '2026-07-01', due: '2026-07-30', status: 'paid' },
  { id: 'ci2', projectId: 'cp1', number: 'INV-2026-0043', amount: 7500000, issued: '2026-08-01', due: '2026-08-30', status: 'pending' },
  { id: 'ci3', projectId: 'cp2', number: 'INV-2026-0038', amount: 12000000, issued: '2026-07-01', due: '2026-07-30', status: 'paid' },
  { id: 'ci4', projectId: 'cp2', number: 'INV-2026-0039', amount: 12000000, issued: '2026-08-01', due: '2026-08-30', status: 'pending' },
  { id: 'ci5', projectId: 'cp3', number: 'INV-2026-0025', amount: 9500000, issued: '2026-06-15', due: '2026-07-15', status: 'paid' },
  { id: 'ci6', projectId: 'cp3', number: 'INV-2026-0026', amount: 9500000, issued: '2026-05-15', due: '2026-06-15', status: 'paid' },
];

export async function getClientProjects() { await delay(200); return PROJECTS; }
export async function getClientMilestones(projectId) { await delay(150); return projectId ? MILESTONES.filter(m => m.projectId === projectId) : MILESTONES; }
export async function getClientTasks(projectId) { await delay(150); return projectId ? TASKS.filter(t => t.projectId === projectId) : TASKS; }
export async function getClientFiles(projectId) { await delay(150); return projectId ? FILES.filter(f => f.projectId === projectId) : FILES; }
export async function getClientContracts() { await delay(200); return CONTRACTS; }
export async function getClientInvoices() { await delay(200); return INVOICES; }
