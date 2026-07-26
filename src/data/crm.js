function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
const LEADS = [
  { id:'l1', name:'Acme Corp', contact:'John Smith', email:'john@acme.com', source:'Website', status:'new', value:15000000, probability:20, created:'2026-07-20' },
  { id:'l2', name:'TechStart Inc', contact:'Sarah Lee', email:'sarah@techstart.io', source:'Referral', status:'qualified', value:10000000, probability:40, created:'2026-07-18' },
  { id:'l3', name:'DataFlow Ltd', contact:'Mike Brown', email:'mike@dataflow.co', source:'LinkedIn', status:'proposal', value:25000000, probability:60, created:'2026-07-15' },
  { id:'l4', name:'MedTech Solutions', contact:'Dr. Emily White', email:'emily@medtech.com', source:'Conference', status:'negotiation', value:45000000, probability:80, created:'2026-07-10' },
  { id:'l5', name:'FinEdge Capital', contact:'David Kim', email:'david@finedge.com', source:'Outreach', status:'closed-won', value:60000000, probability:100, created:'2026-06-28' },
  { id:'l6', name:'GreenEnergy Co', contact:'Lisa Park', email:'lisa@greenenergy.io', source:'Website', status:'closed-lost', value:8000000, probability:0, created:'2026-06-20' },
];
const PIPELINE_STAGES = ['new','qualified','proposal','negotiation','closed-won','closed-lost'];
const DEALS = LEADS.filter(l => l.status !== 'closed-lost');
export async function getLeads() { await delay(200); return LEADS; }
export async function getPipeline() { await delay(150); return PIPELINE_STAGES.map(s => ({ stage:s, total:LEADS.filter(l=>l.status===s).length, value:LEADS.filter(l=>l.status===s).reduce((t,l)=>t+l.value,0) })); }
export async function getDeals() { await delay(150); return DEALS; }
