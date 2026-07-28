const API_BASE = 'http://localhost:3001/api';

const MOCK = {
  user: { id: 'demo-1', email: 'admin@seed.agency', name: 'Admin User', role: 'admin' },
  /* LOGGED_IN_USER is separate from users list — matches login response */
  services: [
    { id:'s1', slug:'web-mobile', icon:'Globe', title:'Web & Mobile Development', tagline:'Full-stack products built to scale.', color:'#818cf8', image:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200', description:'We design and engineer web applications.', content:'<h2>Beyond the Framework</h2><p>Building for the modern web.</p>', tech:['React','Next.js','TypeScript','Node.js'], featured:true, order:1 },
    { id:'s2', slug:'ai-ml', icon:'Cpu', title:'AI & Machine Learning', tagline:'Intelligence woven into your product.', color:'#a78bfa', image:'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200', description:'LLM integrations, computer vision, NLP.', content:'<h2>Production AI</h2>', tech:['Python','TensorFlow','PyTorch','OpenAI'], featured:true, order:2 },
    { id:'s3', slug:'cloud-devops', icon:'Cloud', title:'Cloud & DevOps', tagline:'Resilient infrastructure.', color:'#60a5fa',     image:'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1200', description:'Cloud architecture, CI/CD, Kubernetes.', content:'<h2>Infrastructure as Code</h2>', tech:['AWS','GCP','Kubernetes','Terraform'], featured:true, order:3 },
    { id:'s4', slug:'embedded', icon:'Microchip', title:'Embedded Systems', tagline:'Software where others cant reach.', color:'#34d399', image:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200', description:'Firmware, RTOS, IoT platforms.', content:'<h2>Safety Critical</h2>', tech:['C/C++','Rust','RTOS','ARM'], featured:false, order:4 },
    { id:'s5', slug:'cybersecurity', icon:'ShieldCheck', title:'Cybersecurity', tagline:'Zero-trust architecture.', color:'#f87171', image:'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200', description:'Pen testing, secure architecture.', content:'<h2>Secure by Design</h2>', tech:['OWASP','ISO 27001','Zero Trust'], featured:false, order:5 },
    { id:'s6', slug:'data-engineering', icon:'Database', title:'Data Engineering', tagline:'Reliable data pipelines.', color:'#fbbf24', image:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200', description:'Data lakes, streaming, ETL.', content:'<h2>Data that Flows</h2>', tech:['Spark','Kafka','dbt','Snowflake'], featured:false, order:6 },
  ],
  projects: [
    { id:'p1', slug:'nexus-health', title:'Nexus Health Platform', client:'NexusHealth Ltd.', industry:'Healthcare', color:'#34d399', icon:'HeartPulse', image:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200', summary:'EHR platform serving 1.2M patients.', content:'<h2>The Challenge</h2>', tech:['React','Python','PostgreSQL','AWS'], results:[{metric:'1.2M',label:'Patients'},{metric:'94%',label:'AI Accuracy'}], featured:true, order:1 },
    { id:'p2', slug:'orbital-fintech', title:'Orbital Trading Engine', client:'Orbital Capital Group', industry:'FinTech', color:'#818cf8', icon:'TrendingUp', image:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200', summary:'Ultra-low-latency trading infrastructure.', content:'<h2>High Frequency Scale</h2>', tech:['Rust','C++','Redis','Kafka'], results:[{metric:'2M/s',label:'Transactions'},{metric:'<1ms',label:'Execution'}], featured:true, order:2 },
  ],
  posts: [
    { id:'b1', slug:'llm-production-systems', title:'Engineering LLMs for Production', excerpt:'Context windows, hallucination mitigation.', category:'AI Engineering', author:'Dr. Amara Osei', authorInitials:'AO', date:'2025-06-28', readTime:'12 min read', tags:['LLM','Production','MLOps'], image:'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200', content:'<h2>The Operational Reality</h2><p>Deploying LLMs into production.</p>', featured:true, isPublished:true },
    { id:'b2', slug:'rust-embedded-systems', title:'Why We Switched from C++ to Rust', excerpt:'Memory safety guarantees.', category:'Embedded Systems', author:'Marcus Chen', authorInitials:'MC', date:'2025-06-14', readTime:'9 min read', tags:['Rust','Embedded','Safety'], image:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200', content:'<h2>The Cost of Memory Un-Safety</h2>', featured:true, isPublished:true },
  ],
  team: [
    { id:'t1', name:'Dr. Aisha Nkosi', role:'CEO & Co-Founder', bio:'PhD Computer Science (MIT).', avatar:'👩🏾‍💻', specialties:['AI/ML','Leadership'], order:1 },
    { id:'t2', name:'James Okafor', role:'CTO & Co-Founder', bio:'M.Eng Electrical Engineering.', avatar:'👨🏿‍💻', specialties:['Embedded Systems','Architecture'], order:2 },
    { id:'t3', name:'Priya Sharma', role:'VP Cloud Engineering', bio:'AWS Solutions Architect.', avatar:'👩🏽‍💻', specialties:['AWS','Kubernetes'], order:3 },
    { id:'t4', name:'Thomas Ekwe', role:'VP Engineering', bio:'BSc Computer Science (UCL).', avatar:'👨🏾‍💻', specialties:['Engineering Management'], order:4 },
    { id:'t5', name:'Amara Hassan', role:'Head of Blockchain', bio:'MSc Cryptography (ETH Zurich).', avatar:'👩🏾‍💻', specialties:['Solidity','DeFi'], order:5 },
    { id:'t6', name:'Sofia Mendes', role:'Head of Product Design', bio:'BA Interaction Design (RCA).', avatar:'👩🏻‍💻', specialties:['UI/UX','Design Systems'], order:6 },
  ],
  timeline: [
    { id:'tl1', year:'2015', title:'Seed Founded', desc:'Founded in Lagos with a team of 4.', icon:'🌱', order:1 },
    { id:'tl2', year:'2017', title:'First Major Contract', desc:'₦2B firmware development contract.', icon:'📈', order:2 },
    { id:'tl3', year:'2019', title:'Web & Mobile Practice', desc:'Expanded into full-stack development.', icon:'🌐', order:3 },
    { id:'tl4', year:'2022', title:'Series A', desc:'Raised ₦15B Series A.', icon:'💰', order:4 },
    { id:'tl5', year:'2025', title:'Today', desc:'200+ engineers. 35+ industries.', icon:'💎', order:5 },
  ],
  contacts: [
    { id:'c1', name:'John Smith', email:'john@example.com', company:'Acme Corp', subject:'Project Inquiry', message:'We need a new web platform built.', status:'NEW', createdAt:'2025-07-01T10:00:00Z' },
    { id:'c2', name:'Sarah Lee', email:'sarah@example.com', subject:'Partnership', message:'Interested in partnering.', status:'READ', createdAt:'2025-06-28T14:30:00Z' },
    { id:'c3', name:'Mike Johnson', email:'mike@example.com', company:'TechStart', subject:'Consulting', message:'Need AI consulting for our product.', status:'REPLIED', createdAt:'2025-06-25T09:15:00Z' },
  ],
  quotes: [
    { id:'q1', quoteId:'QR-001', name:'Alice Brown', email:'alice@example.com', company:'DataFlow Inc.', phone:'+234 800 000 0000', service:'AI & Machine Learning', budget:'₦50M-₦100M', timeline:'3 months', description:'We want to build an AI-powered recommendation engine.', status:'PENDING', createdAt:'2025-07-05T11:00:00Z' },
    { id:'q2', quoteId:'QR-002', name:'Bob Wilson', email:'bob@example.com', service:'Web Development', budget:'₦20M-₦50M', timeline:'2 months', description:'Need a new SaaS platform built from scratch.', status:'REVIEWING', createdAt:'2025-07-03T16:45:00Z' },
    { id:'q3', quoteId:'QR-003', name:'Carol Davis', email:'carol@example.com', company:'MedTech Ltd.', service:'Embedded Systems', budget:'₦100M+', timeline:'6 months', description:'Firmware development for medical devices.', status:'QUOTED', createdAt:'2025-06-20T08:30:00Z' },
  ],
  settings: {
    siteName: { name: 'SEED', tagline: 'Innovation Lab' },
    seo: { title: 'SEED — Software Engineering & Design Agency', description: 'World-class software engineering.' },
    social: { linkedin: '#', twitter: '#', github: '#', email: 'hello@seed.agency' },
  },
  courses: [
    { id:'cr1', slug:'react-masterclass', title:'React & Next.js Masterclass', level:'Intermediate', duration:'6 weeks', students:1200, lessonsCount:6, instructor:'Priya Sharma', status:'published', image:'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200' },
    { id:'cr2', slug:'python-data-science', title:'Python for Data Science', level:'Beginner', duration:'5 weeks', students:980, lessonsCount:5, instructor:'Dr. Amara Osei', status:'published', image:'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=1200' },
    { id:'cr3', slug:'rust-systems-programming', title:'Rust Systems Programming', level:'Advanced', duration:'7 weeks', students:540, lessonsCount:6, instructor:'Marcus Chen', status:'published', image:'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=1200' },
    { id:'cr4', slug:'aws-devops', title:'AWS Cloud & DevOps', level:'Intermediate', duration:'5 weeks', students:1400, lessonsCount:5, instructor:'Priya Sharma', status:'published', image:'https://images.unsplash.com/photo-1667372283536-a831e58cddef?auto=format&fit=crop&q=80&w=1200' },
    { id:'cr5', slug:'ai-ml-fundamentals', title:'AI & Machine Learning Fundamentals', level:'Beginner', duration:'6 weeks', students:2100, lessonsCount:6, instructor:'Dr. Amara Osei', status:'published', image:'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200' },
    { id:'cr6', slug:'cybersecurity-essentials', title:'Cybersecurity Essentials', level:'Intermediate', duration:'4 weeks', students:670, lessonsCount:5, instructor:'Thomas Ekwe', status:'published', image:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200' },
    { id:'cr7', slug:'embedded-systems', title:'Embedded Systems with Rust', level:'Advanced', duration:'8 weeks', students:320, lessonsCount:6, instructor:'Marcus Chen', status:'published', image:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200' },
    { id:'cr8', slug:'blockchain-dev', title:'Blockchain Development', level:'Advanced', duration:'6 weeks', students:410, lessonsCount:5, instructor:'Amara Hassan', status:'published', image:'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200' },
  ],
  users: [
    { id:'u1', name:'Admin User', email:'admin@seed.agency', role:'admin', avatar:'👨‍💻', joined:'2026-01-15', status:'active', courses:0 },
    { id:'u2', name:'Dr. Amara Osei', email:'amara@seed.agency', role:'instructor', avatar:'👩🏾‍💻', joined:'2026-02-01', status:'active', courses:2 },
    { id:'u3', name:'Marcus Chen', email:'marcus@seed.agency', role:'instructor', avatar:'👨🏻‍💻', joined:'2026-02-15', status:'active', courses:2 },
    { id:'u4', name:'Sarah Johnson', email:'sarah@example.com', role:'student', avatar:'👩‍🎓', joined:'2026-03-01', status:'active', courses:3 },
    { id:'u5', name:'Alex Rivera', email:'alex@example.com', role:'student', avatar:'👨‍🎓', joined:'2026-03-15', status:'active', courses:1 },
    { id:'u6', name:'Priya Sharma', email:'priya@seed.agency', role:'instructor', avatar:'👩🏽‍💻', joined:'2026-01-20', status:'active', courses:2 },
    { id:'u7', name:'Thomas Ekwe', email:'thomas@seed.agency', role:'instructor', avatar:'👨🏾‍💻', joined:'2026-02-10', status:'active', courses:1 },
    { id:'u8', name:'Emily Watson', email:'emily@example.com', role:'student', avatar:'👩🏻‍💻', joined:'2026-04-01', status:'active', courses:0 },
    { id:'u9', name:'James Lee', email:'james@example.com', role:'student', avatar:'👨🏻‍💻', joined:'2026-04-15', status:'inactive', courses:0 },
    { id:'u10', name:'Amara Hassan', email:'amara.h@seed.agency', role:'instructor', avatar:'👩🏾‍💻', joined:'2026-03-01', status:'active', courses:1 },
  ],
  media: [
    { id:'m1', name:'hero-bg.jpg', type:'image', size:'2.4 MB', dimensions:'1920x1080', uploaded:'2026-01-15', url:'/placeholder.svg', usedIn:'Homepage' },
    { id:'m2', name:'logo.svg', type:'vector', size:'48 KB', dimensions:'512x512', uploaded:'2026-01-10', url:'/logo.jpg', usedIn:'Global' },
    { id:'m3', name:'team-photo.jpg', type:'image', size:'1.8 MB', dimensions:'2400x1600', uploaded:'2026-02-01', url:'/placeholder.svg', usedIn:'About' },
    { id:'m4', name:'course-thumb-1.jpg', type:'image', size:'890 KB', dimensions:'1200x800', uploaded:'2026-03-05', url:'/placeholder.svg', usedIn:'Courses' },
    { id:'m5', name:'presentation-deck.pdf', type:'document', size:'4.2 MB', dimensions:'-', uploaded:'2026-02-20', url:'/placeholder.svg', usedIn:'Sales' },
    { id:'m6', name:'promo-video.mp4', type:'video', size:'24 MB', dimensions:'1920x1080', uploaded:'2026-03-10', url:'/placeholder.svg', usedIn:'Marketing' },
  ],
};

class AdminApi {
  constructor() {
    this.token = localStorage.getItem('admin_token');
    this.demo = !this.token;
    this._mockData = JSON.parse(JSON.stringify(MOCK));
  }

  setToken(token) {
    this.token = token;
    this.demo = !token;
    if (token) localStorage.setItem('admin_token', token);
    else localStorage.removeItem('admin_token');
  }

  async _fetch(method, path, body) {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (this.token) opts.headers['Authorization'] = `Bearer ${this.token}`;
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`${API_BASE}${path}`, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  }

  async _req(method, path, body) {
    if (!this.demo) {
      try { return await this._fetch(method, path, body); }
      catch { this.demo = true; /* fall through to mock */ }
    }
    return this._mock(method, path, body);
  }

  _mock(method, path, body) {
    const delay = (ms) => new Promise(r => setTimeout(r, ms));
    const p = path.split('?')[0]; // strip query params

    // Auth
    if (p === '/auth/login' && method === 'POST') {
      return delay(300).then(() => ({
        user: { ...this._mockData.user },
        accessToken: 'demo-token',
      }));
    }
    if (p === '/auth/me' && method === 'GET') {
      return delay(100).then(() => ({ user: { ...this._mockData.user } }));
    }

    // Services
    if (p.startsWith('/services')) {
      if (method === 'GET' && (p === '/services')) {
        return delay(150).then(() => ({ services: [...this._mockData.services], total: this._mockData.services.length }));
      }
      if (method === 'GET' && p === '/services/featured') {
        return delay(100).then(() => ({ services: this._mockData.services.filter(s => s.featured) }));
      }
      if (method === 'GET' && p.match(/^\/services\/(.+)$/)) {
        const slug = p.match(/^\/services\/(.+)$/)[1];
        const svc = this._mockData.services.find(s => s.slug === slug);
        if (!svc) return delay(100).then(() => { throw new Error('Service not found'); });
        return delay(100).then(() => ({ service: svc }));
      }
      if (method === 'POST' && p === '/services') {
        const newSvc = { id: `s${Date.now()}`, ...body, tech: body.tech || [] };
        this._mockData.services.push(newSvc);
        return delay(200).then(() => ({ service: newSvc }));
      }
      if (method === 'PUT' && p.match(/^\/services\/(.+)$/)) {
        const slug = p.match(/^\/services\/(.+)$/)[1];
        const idx = this._mockData.services.findIndex(s => s.slug === slug);
        if (idx === -1) return delay(100).then(() => { throw new Error('Service not found'); });
        this._mockData.services[idx] = { ...this._mockData.services[idx], ...body };
        return delay(200).then(() => ({ service: this._mockData.services[idx] }));
      }
      if (method === 'DELETE' && p.match(/^\/services\/(.+)$/)) {
        const slug = p.match(/^\/services\/(.+)$/)[1];
        this._mockData.services = this._mockData.services.filter(s => s.slug !== slug);
        return delay(150).then(() => ({ message: 'Deleted' }));
      }
    }

    // Portfolio
    if (p.startsWith('/portfolio')) {
      if (method === 'GET' && (p === '/portfolio')) {
        return delay(150).then(() => ({ projects: [...this._mockData.projects], total: this._mockData.projects.length }));
      }
      if (method === 'GET' && p === '/portfolio/featured') {
        return delay(100).then(() => ({ projects: this._mockData.projects.filter(p => p.featured) }));
      }
      if (method === 'GET' && p.match(/^\/portfolio\/(.+)$/)) {
        const slug = p.match(/^\/portfolio\/(.+)$/)[1];
        const proj = this._mockData.projects.find(p => p.slug === slug);
        if (!proj) return delay(100).then(() => { throw new Error('Project not found'); });
        return delay(100).then(() => ({ project: proj }));
      }
      if (method === 'POST' && p === '/portfolio') {
        const newProj = { id: `p${Date.now()}`, ...body };
        this._mockData.projects.push(newProj);
        return delay(200).then(() => ({ project: newProj }));
      }
      if (method === 'PUT' && p.match(/^\/portfolio\/(.+)$/)) {
        const slug = p.match(/^\/portfolio\/(.+)$/)[1];
        const idx = this._mockData.projects.findIndex(p => p.slug === slug);
        if (idx === -1) return delay(100).then(() => { throw new Error('Project not found'); });
        this._mockData.projects[idx] = { ...this._mockData.projects[idx], ...body };
        return delay(200).then(() => ({ project: this._mockData.projects[idx] }));
      }
      if (method === 'DELETE' && p.match(/^\/portfolio\/(.+)$/)) {
        const slug = p.match(/^\/portfolio\/(.+)$/)[1];
        this._mockData.projects = this._mockData.projects.filter(p => p.slug !== slug);
        return delay(150).then(() => ({ message: 'Deleted' }));
      }
    }

    // Blog
    if (p.startsWith('/blog')) {
      if (method === 'GET' && (p === '/blog' || p === '/blog/')) {
        return delay(150).then(() => ({ posts: [...this._mockData.posts], total: this._mockData.posts.length }));
      }
      if (method === 'GET' && p === '/blog/featured') {
        return delay(100).then(() => ({ posts: this._mockData.posts.filter(p => p.featured) }));
      }
      if (method === 'GET' && p.match(/^\/blog\/(.+)$/)) {
        const slug = p.match(/^\/blog\/(.+)$/)[1];
        if (slug === 'featured' || slug === 'categories' || slug === 'tags') return delay(100).then(() => { throw new Error('Not found'); });
        const post = this._mockData.posts.find(p => p.slug === slug);
        if (!post) return delay(100).then(() => { throw new Error('Post not found'); });
        return delay(100).then(() => ({ post }));
      }
      if (method === 'POST' && p === '/blog') {
        const newPost = { id: `b${Date.now()}`, ...body, tags: body.tags || [] };
        this._mockData.posts.push(newPost);
        return delay(200).then(() => ({ post: newPost }));
      }
      if (method === 'PUT' && p.match(/^\/blog\/(.+)$/)) {
        const slug = p.match(/^\/blog\/(.+)$/)[1];
        const idx = this._mockData.posts.findIndex(p => p.slug === slug);
        if (idx === -1) return delay(100).then(() => { throw new Error('Post not found'); });
        this._mockData.posts[idx] = { ...this._mockData.posts[idx], ...body };
        return delay(200).then(() => ({ post: this._mockData.posts[idx] }));
      }
      if (method === 'DELETE' && p.match(/^\/blog\/(.+)$/)) {
        const slug = p.match(/^\/blog\/(.+)$/)[1];
        this._mockData.posts = this._mockData.posts.filter(p => p.slug !== slug);
        return delay(150).then(() => ({ message: 'Deleted' }));
      }
    }

    // Team
    if (p.startsWith('/team')) {
      if (method === 'GET' && p === '/team') {
        return delay(150).then(() => ({ members: [...this._mockData.team] }));
      }
      if (method === 'GET' && p === '/team/timeline') {
        return delay(150).then(() => ({ timeline: [...this._mockData.timeline] }));
      }
      if (method === 'POST' && p === '/team') {
        const newMember = { id: `t${Date.now()}`, ...body, specialties: body.specialties || [] };
        this._mockData.team.push(newMember);
        return delay(200).then(() => ({ member: newMember }));
      }
      if (method === 'PUT' && p.match(/^\/team\/(.+)$/)) {
        const id = p.match(/^\/team\/(.+)$/)[1];
        const idx = this._mockData.team.findIndex(m => m.id === id);
        if (idx === -1) return delay(100).then(() => { throw new Error('Member not found'); });
        this._mockData.team[idx] = { ...this._mockData.team[idx], ...body };
        return delay(200).then(() => ({ member: this._mockData.team[idx] }));
      }
      if (method === 'DELETE' && p.match(/^\/team\/(.+)$/)) {
        const id = p.match(/^\/team\/(.+)$/)[1];
        this._mockData.team = this._mockData.team.filter(m => m.id !== id);
        return delay(150).then(() => ({ message: 'Deleted' }));
      }
      if (method === 'POST' && p === '/team/timeline') {
        const newItem = { id: `tl${Date.now()}`, ...body };
        this._mockData.timeline.push(newItem);
        return delay(200).then(() => ({ item: newItem }));
      }
      if (method === 'PUT' && p.match(/^\/team\/timeline\/(.+)$/)) {
        const id = p.match(/^\/team\/timeline\/(.+)$/)[1];
        const idx = this._mockData.timeline.findIndex(t => t.id === id);
        if (idx === -1) return delay(100).then(() => { throw new Error('Timeline item not found'); });
        this._mockData.timeline[idx] = { ...this._mockData.timeline[idx], ...body };
        return delay(200).then(() => ({ item: this._mockData.timeline[idx] }));
      }
      if (method === 'DELETE' && p.match(/^\/team\/timeline\/(.+)$/)) {
        const id = p.match(/^\/team\/timeline\/(.+)$/)[1];
        this._mockData.timeline = this._mockData.timeline.filter(t => t.id !== id);
        return delay(150).then(() => ({ message: 'Deleted' }));
      }
    }

    // Contacts
    if (p.startsWith('/contact')) {
      if (method === 'GET' && p === '/contact') {
        return delay(150).then(() => ({ contacts: [...this._mockData.contacts], total: this._mockData.contacts.length }));
      }
      if (method === 'GET' && p.match(/^\/contact\/([^/]+)$/)) {
        const id = p.match(/^\/contact\/([^/]+)$/)[1];
        const c = this._mockData.contacts.find(x => x.id === id);
        if (!c) return delay(100).then(() => { throw new Error('Contact not found'); });
        return delay(100).then(() => ({ contact: c }));
      }
      if (method === 'PUT' && p.match(/^\/contact\/([^/]+)\/status$/)) {
        const id = p.match(/^\/contact\/([^/]+)\/status$/)[1];
        const idx = this._mockData.contacts.findIndex(x => x.id === id);
        if (idx === -1) return delay(100).then(() => { throw new Error('Contact not found'); });
        this._mockData.contacts[idx].status = body.status;
        return delay(200).then(() => ({ contact: this._mockData.contacts[idx] }));
      }
    }

    // Quotes
    if (p.startsWith('/quote')) {
      if (method === 'GET' && p === '/quote') {
        return delay(150).then(() => ({ quotes: [...this._mockData.quotes], total: this._mockData.quotes.length }));
      }
      if (method === 'GET' && p.match(/^\/quote\/([^/]+)$/)) {
        const id = p.match(/^\/quote\/([^/]+)$/)[1];
        const q = this._mockData.quotes.find(x => x.id === id);
        if (!q) return delay(100).then(() => { throw new Error('Quote not found'); });
        return delay(100).then(() => ({ quote: q }));
      }
      if (method === 'PUT' && p.match(/^\/quote\/([^/]+)\/status$/)) {
        const id = p.match(/^\/quote\/([^/]+)\/status$/)[1];
        const idx = this._mockData.quotes.findIndex(x => x.id === id);
        if (idx === -1) return delay(100).then(() => { throw new Error('Quote not found'); });
        this._mockData.quotes[idx].status = body.status;
        return delay(200).then(() => ({ quote: this._mockData.quotes[idx] }));
      }
    }

    // Courses
    if (p.startsWith('/admin/courses')) {
      if (method === 'GET') {
        return delay(150).then(() => ({ courses: [...this._mockData.courses], total: this._mockData.courses.length }));
      }
      if (method === 'POST' && p === '/admin/courses') {
        const newCourse = { id: `cr${Date.now()}`, slug: body.title?.toLowerCase().replace(/[^a-z0-9]+/g,'-'), ...body, students:0, lessonsCount:0, status:'draft' };
        this._mockData.courses.push(newCourse);
        return delay(200).then(() => ({ course: newCourse }));
      }
      if (method === 'PUT') {
        const slug = p.replace('/admin/courses/', '');
        const idx = this._mockData.courses.findIndex(c => c.slug === slug);
        if (idx === -1) return delay(100).then(() => { throw new Error('Course not found'); });
        this._mockData.courses[idx] = { ...this._mockData.courses[idx], ...body };
        return delay(200).then(() => ({ course: this._mockData.courses[idx] }));
      }
      if (method === 'DELETE') {
        const slug = p.replace('/admin/courses/', '');
        this._mockData.courses = this._mockData.courses.filter(c => c.slug !== slug);
        return delay(150).then(() => ({ message: 'Deleted' }));
      }
    }

    // Users
    if (p.startsWith('/admin/users')) {
      if (method === 'GET') {
        return delay(150).then(() => ({ users: [...this._mockData.users], total: this._mockData.users.length }));
      }
      if (method === 'PUT') {
        const id = p.replace('/admin/users/', '');
        const idx = this._mockData.users.findIndex(u => u.id === id);
        if (idx === -1) return delay(100).then(() => { throw new Error('User not found'); });
        this._mockData.users[idx] = { ...this._mockData.users[idx], ...body };
        return delay(200).then(() => ({ user: this._mockData.users[idx] }));
      }
      if (method === 'DELETE') {
        const id = p.replace('/admin/users/', '');
        this._mockData.users = this._mockData.users.filter(u => u.id !== id);
        return delay(150).then(() => ({ message: 'Deleted' }));
      }
    }

    // Media
    if (p.startsWith('/admin/media')) {
      if (method === 'GET') {
        return delay(150).then(() => ({ media: [...this._mockData.media], total: this._mockData.media.length }));
      }
      if (method === 'DELETE') {
        const id = p.replace('/admin/media/', '');
        this._mockData.media = this._mockData.media.filter(m => m.id !== id);
        return delay(150).then(() => ({ message: 'Deleted' }));
      }
    }

    // Settings
    if (p === '/admin/settings' && method === 'GET') {
      return delay(100).then(() => ({ settings: { ...this._mockData.settings } }));
    }
    if (p === '/admin/settings' && method === 'PUT') {
      this._mockData.settings = { ...this._mockData.settings, ...body };
      return delay(200).then(() => ({ settings: { ...this._mockData.settings } }));
    }

    // Analytics
    if (p === '/admin/analytics' && method === 'GET') {
      return delay(200).then(() => ({
        analytics: {
          totalUsers: this._mockData.users.length,
          totalCourses: this._mockData.courses.length,
          totalEnrollments: this._mockData.courses.reduce((s,c) => s + c.students, 0),
          totalMedia: this._mockData.media.length,
          activeStudents: this._mockData.users.filter(u => u.role === 'student' && u.status === 'active').length,
          instructors: this._mockData.users.filter(u => u.role === 'instructor').length,
          revenue: 284000,
          growth: 12.5,
        },
      }));
    }

    return delay(100).then(() => { throw new Error('Not found'); });
  }

  async request(method, path, body) {
    return this._req(method, path, body);
  }

  get = (path) => this.request('GET', path);
  post = (path, body) => this.request('POST', path, body);
  put = (path, body) => this.request('PUT', path, body);
  del = (path) => this.request('DELETE', path);

  login(email, password) {
    return this.post('/auth/login', { email, password });
  }

  getMe() { return this.get('/auth/me'); }
  getServices(p) { const q=p?'?'+new URLSearchParams(p).toString():''; return this.get(`/services${q}`); }
  getService(slug) { return this.get(`/services/${slug}`); }
  createService(d) { return this.post('/services', d); }
  updateService(slug,d) { return this.put(`/services/${slug}`, d); }
  deleteService(slug) { return this.del(`/services/${slug}`); }
  getProjects(p) { const q=p?'?'+new URLSearchParams(p).toString():''; return this.get(`/portfolio${q}`); }
  getProject(slug) { return this.get(`/portfolio/${slug}`); }
  createProject(d) { return this.post('/portfolio', d); }
  updateProject(slug,d) { return this.put(`/portfolio/${slug}`, d); }
  deleteProject(slug) { return this.del(`/portfolio/${slug}`); }
  getPosts(p) { const q=p?'?'+new URLSearchParams(p).toString():''; return this.get(`/blog${q}`); }
  getPost(slug) { return this.get(`/blog/${slug}`); }
  createPost(d) { return this.post('/blog', d); }
  updatePost(slug,d) { return this.put(`/blog/${slug}`, d); }
  deletePost(slug) { return this.del(`/blog/${slug}`); }
  getTeam() { return this.get('/team'); }
  createTeamMember(d) { return this.post('/team', d); }
  updateTeamMember(id,d) { return this.put(`/team/${id}`, d); }
  deleteTeamMember(id) { return this.del(`/team/${id}`); }
  getTimeline() { return this.get('/team/timeline'); }
  createTimeline(d) { return this.post('/team/timeline', d); }
  updateTimeline(id,d) { return this.put(`/team/timeline/${id}`, d); }
  deleteTimeline(id) { return this.del(`/team/timeline/${id}`); }
  getContacts(p) { const q=p?'?'+new URLSearchParams(p).toString():''; return this.get(`/contact${q}`); }
  getContact(id) { return this.get(`/contact/${id}`); }
  updateContactStatus(id,s) { return this.put(`/contact/${id}/status`, {status:s}); }
  getQuotes(p) { const q=p?'?'+new URLSearchParams(p).toString():''; return this.get(`/quote${q}`); }
  getQuote(id) { return this.get(`/quote/${id}`); }
  updateQuoteStatus(id,s) { return this.put(`/quote/${id}/status`, {status:s}); }
  getCourses() { return this.get('/admin/courses'); }
  createCourse(d) { return this.post('/admin/courses', d); }
  updateCourse(slug,d) { return this.put(`/admin/courses/${slug}`, d); }
  deleteCourse(slug) { return this.del(`/admin/courses/${slug}`); }
  getUsers() { return this.get('/admin/users'); }
  updateUser(id,d) { return this.put(`/admin/users/${id}`, d); }
  deleteUser(id) { return this.del(`/admin/users/${id}`); }
  getMedia() { return this.get('/admin/media'); }
  deleteMedia(id) { return this.del(`/admin/media/${id}`); }
  getSettings() { return this.get('/admin/settings'); }
  updateSettings(d) { return this.put('/admin/settings', d); }
  getAnalytics() { return this.get('/admin/analytics'); }
}

export const adminApi = new AdminApi();
export default adminApi;