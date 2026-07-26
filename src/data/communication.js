function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
const MESSAGES = [
  { id:'m1', from:'James Okafor', to:'you', subject:'Architecture review tomorrow', preview:'Just confirming the architecture review...', time:'10:42 AM', unread:true, avatar:'👨🏿‍💻' },
  { id:'m2', from:'Priya Sharma', to:'you', subject:'AWS deployment schedule', preview:'The deployment window for next week...', time:'Yesterday', unread:true, avatar:'👩🏽‍💻' },
  { id:'m3', from:'Sarah Johnson', to:'you', subject:'Question about React hooks assignment', preview:'I\'m working through the custom hooks...', time:'Yesterday', unread:false, avatar:'👩‍🎓' },
  { id:'m4', from:'Alex Rivera', to:'you', subject:'Memory leak update', preview:'Found the root cause of the memory...', time:'2 days ago', unread:false, avatar:'👨‍🎓' },
  { id:'m5', from:'Dr. Amara Osei', to:'you', subject:'AI module curriculum update', preview:'I\'ve updated the course materials...', time:'3 days ago', unread:false, avatar:'👩🏾‍💻' },
];
const FORUM_THREADS = [
  { id:'ft1', title:'Best practices for React Server Components', author:'Sarah J.', replies:12, views:234, lastPost:'2h ago', pinned:true },
  { id:'ft2', title:'Rust ownership question — lifetime annotations', author:'Alex R.', replies:8, views:156, lastPost:'5h ago', pinned:false },
  { id:'ft3', title:'AWS Lambda cold start optimisation', author:'Emily W.', replies:5, views:89, lastPost:'1d ago', pinned:false },
  { id:'ft4', title:'Python vs Rust for data pipelines', author:'Maya P.', replies:23, views:412, lastPost:'3h ago', pinned:false },
  { id:'ft5', title:'Study group: System Design interviews', author:'Admin', replies:34, views:567, lastPost:'30m ago', pinned:true },
];
export async function getMessages() { await delay(200); return MESSAGES; }
export async function getForumThreads() { await delay(200); return FORUM_THREADS; }
