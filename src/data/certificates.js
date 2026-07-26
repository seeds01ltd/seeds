function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
const VERIFIABLE = [
  { certId:'SEED-0001', courseTitle:'React & Next.js Masterclass', recipient:'Sarah Johnson', issued:'2026-07-15', valid:true },
  { certId:'SEED-0002', courseTitle:'Python for Data Science', recipient:'Alex Rivera', issued:'2026-07-10', valid:true },
  { certId:'SEED-0003', courseTitle:'AWS Cloud & DevOps', recipient:'Emily Watson', issued:'2026-07-20', valid:true },
  { certId:'SEED-0004', courseTitle:'Rust Systems Programming', recipient:'James Lee', issued:'2026-07-05', valid:false },
];
export async function verifyCertificate(certId) { await delay(300); const c = VERIFIABLE.find(x => x.certId === certId); return c || null; }
