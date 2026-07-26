function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
const PAYMENTS = [
  { id:'f1', from:'Acme Corp', amount:7500000, method:'Bank Transfer', status:'completed', date:'2026-07-15', ref:'PAY-2026-042' },
  { id:'f2', from:'Orbital Capital', amount:12000000, method:'Wire', status:'completed', date:'2026-07-10', ref:'PAY-2026-041' },
  { id:'f3', from:'TechStart Inc', amount:2500000, method:'Card', status:'pending', date:'2026-07-22', ref:'PAY-2026-043' },
  { id:'f4', from:'DataFlow Ltd', amount:5000000, method:'Bank Transfer', status:'pending', date:'2026-07-25', ref:'PAY-2026-044' },
];
const FINANCE_INVOICES = [
  { id:'fi1', number:'INV-2026-042', client:'Acme Corp', amount:7500000, issued:'2026-07-01', due:'2026-07-30', status:'paid' },
  { id:'fi2', number:'INV-2026-043', client:'Orbital Capital', amount:12000000, issued:'2026-07-01', due:'2026-07-30', status:'paid' },
  { id:'fi3', number:'INV-2026-044', client:'TechStart Inc', amount:2500000, issued:'2026-07-15', due:'2026-08-14', status:'pending' },
  { id:'fi4', number:'INV-2026-045', client:'DataFlow Ltd', amount:5000000, issued:'2026-07-20', due:'2026-08-19', status:'pending' },
];
const TRANSACTIONS = [
  { id:'ft1', type:'invoice', description:'Invoice INV-2026-042', amount:7500000, direction:'in', date:'2026-07-15', status:'completed' },
  { id:'ft2', type:'invoice', description:'Invoice INV-2026-043', amount:12000000, direction:'in', date:'2026-07-10', status:'completed' },
  { id:'ft3', type:'payout', description:'Instructor payout — July', amount:500000, direction:'out', date:'2026-07-15', status:'completed' },
  { id:'ft4', type:'payout', description:'Instructor payout — June', amount:450000, direction:'out', date:'2026-06-15', status:'completed' },
  { id:'ft5', type:'expense', description:'AWS Infrastructure', amount:1500000, direction:'out', date:'2026-07-05', status:'completed' },
  { id:'ft6', type:'expense', description:'Office rent — Lagos', amount:1000000, direction:'out', date:'2026-07-01', status:'completed' },
];
const PAYOUTS = [
  { id:'fp1', recipient:'Dr. Amara Osei', amount:500000, period:'July 2026', status:'paid', paidAt:'2026-07-15' },
  { id:'fp2', recipient:'Marcus Chen', amount:450000, period:'July 2026', status:'paid', paidAt:'2026-07-15' },
  { id:'fp3', recipient:'Priya Sharma', amount:400000, period:'July 2026', status:'pending', paidAt:null },
];
export async function getPayments() { await delay(200); return PAYMENTS; }
export async function getFinanceInvoices() { await delay(200); return FINANCE_INVOICES; }
export async function getTransactions() { await delay(200); return TRANSACTIONS; }
export async function getFinancePayouts() { await delay(200); return PAYOUTS; }
