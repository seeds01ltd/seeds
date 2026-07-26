import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.authToken.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.quote.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.service.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.teamTimeline.deleteMany();
  await prisma.setting.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123456', 12);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@seed.agency',
      passwordHash: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      emailVerified: true,
    },
  });
  console.log(`  ✓ Admin user created: admin@seed.agency / Admin@123456`);

  // Services
  const servicesData = [
    {
      slug: 'web-mobile', icon: 'Globe', title: 'Web & Mobile Development',
      tagline: 'Full-stack products built to scale from day one.',
      color: '#818cf8', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
      description: 'We design and engineer web applications and native mobile experiences that are fast, accessible, and beautifully crafted.',
      content: '<h2>Beyond the Framework</h2><p>Building for the modern web requires more than just knowing React. It demands a deep understanding of browser engines, network protocols, and rendering strategies.</p>',
      tech: ['React', 'Next.js', 'React Native', 'TypeScript', 'Node.js'],
      featured: true, order: 1,
    },
    {
      slug: 'ai-ml', icon: 'Cpu', title: 'AI & Machine Learning',
      tagline: 'Intelligence woven into the fabric of your product.',
      color: '#a78bfa', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
      description: 'LLM integrations, computer vision, NLP, predictive analytics, and custom model development.',
      content: '<h2>Production AI</h2><p>We take ML models out of the Jupyter notebook and deploy them into hardened production pipelines.</p>',
      tech: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'LangChain'],
      featured: true, order: 2,
    },
    {
      slug: 'cloud-devops', icon: 'Cloud', title: 'Cloud & DevOps',
      tagline: 'Resilient infrastructure that scales without friction.',
      color: '#60a5fa', image: 'https://images.unsplash.com/photo-1667372283536-a831e58cddef?auto=format&fit=crop&q=80&w=1200',
      description: 'Cloud architecture, CI/CD pipelines, Kubernetes orchestration, and platform engineering.',
      content: '<h2>Infrastructure as Code</h2><p>Everything we build is defined in Terraform and automated via GitHub Actions.</p>',
      tech: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'GitHub Actions'],
      featured: true, order: 3,
    },
    {
      slug: 'embedded', icon: 'Microchip', title: 'Embedded Systems',
      tagline: 'Software that runs where others can\'t reach.',
      color: '#34d399', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
      description: 'Firmware, RTOS, IoT platforms, and hardware-software co-design for industrial, medical, and consumer device applications.',
      content: '<h2>Safety Critical</h2><p>Our firmware engineers specialise in Rust and C++ for mission-critical embedded systems.</p>',
      tech: ['C/C++', 'Rust', 'RTOS', 'ARM', 'RISC-V'],
      featured: false, order: 4,
    },
    {
      slug: 'cybersecurity', icon: 'ShieldCheck', title: 'Cybersecurity',
      tagline: 'Zero-trust architecture, pen-testing, and compliance.',
      color: '#f87171', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
      description: 'From penetration testing to secure-by-design architecture, we help organisations protect their data, infrastructure, and reputation.',
      content: '<h2>Secure by Design</h2><p>We bake security into the CI/CD pipeline from day one.</p>',
      tech: ['OWASP', 'ISO 27001', 'SOC 2', 'Zero Trust', 'SIEM'],
      featured: false, order: 5,
    },
    {
      slug: 'data-engineering', icon: 'Database', title: 'Data Engineering',
      tagline: 'Reliable data pipelines from raw bytes to business insight.',
      color: '#fbbf24', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
      description: 'Data lake architecture, real-time streaming, ETL pipelines, and business intelligence dashboards.',
      content: '<h2>Data that Flows</h2><p>We build robust ETL pipelines that process terabytes of data daily.</p>',
      tech: ['Spark', 'Kafka', 'dbt', 'Snowflake', 'Airflow'],
      featured: false, order: 6,
    },
    {
      slug: 'blockchain', icon: 'Link', title: 'Blockchain & Web3',
      tagline: 'Smart contracts, DeFi protocols, and NFT infrastructure.',
      color: '#c084fc', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200',
      description: 'Ethereum, Solana, and multi-chain development. We build DApps, tokenisation platforms, and DAO tooling with security at the core.',
      content: '<h2>Audited Smart Contracts</h2><p>Our Web3 infrastructure powers hundreds of millions in TVL.</p>',
      tech: ['Solidity', 'Rust', 'Hardhat', 'The Graph', 'IPFS'],
      featured: false, order: 7,
    },
    {
      slug: 'design-systems', icon: 'Layout', title: 'Design Systems & UX',
      tagline: 'Cohesive, accessible interfaces at any scale.',
      color: '#fb923c', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200',
      description: 'Component libraries, design tokens, accessibility audits, and user experience research.',
      content: '<h2>Tokens and Components</h2><p>We build design systems that engineers actually want to adopt.</p>',
      tech: ['Figma', 'Storybook', 'WCAG', 'React', 'CSS-in-JS'],
      featured: false, order: 8,
    },
  ];

  for (const svc of servicesData) {
    await prisma.service.create({ data: svc });
  }
  console.log(`  ✓ ${servicesData.length} services created`);

  // Portfolio projects
  const projectsData = [
    {
      slug: 'nexus-health', title: 'Nexus Health Platform',
      client: 'NexusHealth Ltd.', industry: 'Healthcare',
      color: '#34d399', icon: 'HeartPulse',
      image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1200',
      summary: 'End-to-end EHR platform serving 1.2M patients across 40 NHS trusts. Real-time clinical decision support powered by a custom ML model with 94% diagnostic accuracy.',
      content: '<h2>The Challenge</h2><p>NexusHealth needed to replace a fragmented legacy EHR system that was causing clinical delays and data silos across 40 NHS trusts.</p>',
      tech: ['React', 'Python', 'PostgreSQL', 'AWS', 'TensorFlow'],
      results: JSON.stringify([{ metric: '1.2M', label: 'Active Patients' }, { metric: '94%', label: 'AI Accuracy' }, { metric: '68%', label: 'Admin Reduction' }]),
      featured: true, order: 1,
    },
    {
      slug: 'orbital-fintech', title: 'Orbital Trading Engine',
      client: 'Orbital Capital Group', industry: 'FinTech',
      color: '#818cf8', icon: 'TrendingUp',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200',
      summary: 'Ultra-low-latency algorithmic trading infrastructure processing 2M transactions per second.',
      content: '<h2>High Frequency Scale</h2><p>Rewriting the trading engine in Rust allowed Orbital Capital to handle 2 million transactions per second with zero garbage collection pauses.</p>',
      tech: ['Rust', 'C++', 'Redis', 'Kafka', 'FIX Protocol'],
      results: JSON.stringify([{ metric: '2M/s', label: 'Transactions' }, { metric: '<1ms', label: 'Execution' }, { metric: '99.999%', label: 'Uptime' }]),
      featured: true, order: 2,
    },
    {
      slug: 'aurora-logistics', title: 'Aurora Fleet Intelligence',
      client: 'Aurora Logistics GmbH', industry: 'Logistics',
      color: '#60a5fa', icon: 'Truck',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c83a0a?auto=format&fit=crop&q=80&w=1200',
      summary: 'AI-powered route optimisation and real-time fleet management for 4,200 vehicles across 18 countries.',
      content: '<h2>Global Route Optimisation</h2><p>Using real-time traffic data and a custom Graph Neural Network, we optimised routes dynamically across 18 countries.</p>',
      tech: ['Python', 'React Native', 'PostgreSQL', 'Kubernetes', 'GraphQL'],
      results: JSON.stringify([{ metric: '23%', label: 'Fuel Savings' }, { metric: '31%', label: 'CO2 Reduced' }, { metric: '4,200', label: 'Vehicles' }]),
      featured: true, order: 3,
    },
    {
      slug: 'zenith-manufacturing', title: 'Zenith Smart Factory OS',
      client: 'Zenith Manufacturing PLC', industry: 'Manufacturing',
      color: '#fbbf24', icon: 'Factory',
      image: 'https://images.unsplash.com/photo-1565439390232-a5e2d1ebbf18?auto=format&fit=crop&q=80&w=1200',
      summary: 'Industrial IoT platform connecting 3,400 sensors across 12 production lines.',
      content: '<h2>Industrial IoT</h2><p>Connected sensors stream 1TB of data daily to an InfluxDB cluster, where predictive models anticipate machine failure.</p>',
      tech: ['Rust', 'MQTT', 'InfluxDB', 'React', 'Kubernetes'],
      results: JSON.stringify([{ metric: '78%', label: 'Less Downtime' }, { metric: '3,400', label: 'Sensors' }, { metric: '£4.2M', label: 'Annual Savings' }]),
      featured: false, order: 4,
    },
    {
      slug: 'prism-edtech', title: 'Prism Learning Platform',
      client: 'Prism EdTech Inc.', industry: 'Education',
      color: '#c084fc', icon: 'GraduationCap',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
      summary: 'Adaptive AI tutoring platform used by 280,000 students across 60 universities.',
      content: '<h2>Adaptive Learning Paths</h2><p>We built a PyTorch model that dynamically adjusts the curriculum based on a student\'s real-time comprehension metrics.</p>',
      tech: ['Next.js', 'Python', 'PyTorch', 'AWS', 'PostgreSQL'],
      results: JSON.stringify([{ metric: '280K', label: 'Students' }, { metric: '+34%', label: 'Pass Rates' }, { metric: '60', label: 'Universities' }]),
      featured: false, order: 5,
    },
    {
      slug: 'vaultchain', title: 'VaultChain DeFi Protocol',
      client: 'VaultChain Labs', industry: 'Web3',
      color: '#f87171', icon: 'Lock',
      image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=1200',
      summary: 'Multi-chain DeFi protocol managing $340M TVL with smart contract infrastructure audited by three independent security firms.',
      content: '<h2>Bulletproof Infrastructure</h2><p>Managing $340M TVL requires zero compromise. Our Solidity contracts were formally verified and audited by multiple tier-1 firms.</p>',
      tech: ['Solidity', 'Rust', 'The Graph', 'Hardhat', 'IPFS'],
      results: JSON.stringify([{ metric: '$340M', label: 'TVL' }, { metric: '0', label: 'Security Incidents' }, { metric: '180K', label: 'Wallet Users' }]),
      featured: false, order: 6,
    },
  ];

  for (const proj of projectsData) {
    await prisma.portfolio.create({ data: proj });
  }
  console.log(`  ✓ ${projectsData.length} portfolio projects created`);

  // Blog posts
  const postsData = [
    {
      slug: 'llm-production-systems',
      title: 'Engineering LLMs for Production: Lessons from 18 Months in the Field',
      excerpt: 'Context windows, hallucination mitigation, cost optimisation, and the operational reality of running large language models at scale in regulated industries.',
      category: 'AI Engineering', author: 'Dr. Amara Osei', authorInitials: 'AO',
      date: new Date('2025-06-28'), readTime: '12 min read',
      tags: ['LLM', 'Production', 'MLOps'],
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
      content: '<h2>The Operational Reality</h2><p>Deploying Large Language Models (LLMs) into production requires a massive shift in engineering paradigms.</p>',
      featured: true, isPublished: true, publishedAt: new Date('2025-06-28'),
    },
    {
      slug: 'rust-embedded-systems',
      title: 'Why We Switched from C++ to Rust for Safety-Critical Embedded Firmware',
      excerpt: 'Memory safety guarantees, zero-cost abstractions, and the cultural shift required to adopt Rust across a 40-person embedded engineering team.',
      category: 'Embedded Systems', author: 'Marcus Chen', authorInitials: 'MC',
      date: new Date('2025-06-14'), readTime: '9 min read',
      tags: ['Rust', 'Embedded', 'Safety'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
      content: '<h2>The Cost of Memory Un-Safety</h2><p>In safety-critical systems like medical devices, a segmentation fault isnt just an inconvenience—its a critical failure.</p>',
      featured: true, isPublished: true, publishedAt: new Date('2025-06-14'),
    },
    {
      slug: 'kubernetes-cost-optimisation',
      title: 'Cutting Our Kubernetes Cloud Bill by 58% Without Sacrificing Reliability',
      excerpt: 'A practical deep-dive into pod autoscaling, spot instances, cluster bin-packing, and the monitoring infrastructure that made it all observable.',
      category: 'Cloud & DevOps', author: 'Sophia Andersen', authorInitials: 'SA',
      date: new Date('2025-05-30'), readTime: '15 min read',
      tags: ['Kubernetes', 'AWS', 'Cost'],
      image: 'https://images.unsplash.com/photo-1667372283536-a831e58cddef?auto=format&fit=crop&q=80&w=1200',
      content: '<h2>Infrastructure as Cost</h2><p>Cloud spend is engineering spend. By aggressively bin-packing our workloads and leaning heavily into Spot instances, we transformed our AWS bill.</p>',
      featured: false, isPublished: true, publishedAt: new Date('2025-05-30'),
    },
    {
      slug: 'zero-trust-architecture',
      title: 'Implementing Zero Trust: From Theory to Production in 90 Days',
      excerpt: 'Step-by-step guide to deploying a zero-trust network architecture across a hybrid cloud environment, with a focus on developer experience.',
      category: 'Cybersecurity', author: 'James Okafor', authorInitials: 'JO',
      date: new Date('2025-05-12'), readTime: '11 min read',
      tags: ['Security', 'Zero Trust', 'Architecture'],
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
      content: '<h2>Verify Everything</h2><p>Zero trust isnt a product you buy; its an architecture you implement.</p>',
      featured: false, isPublished: true, publishedAt: new Date('2025-05-12'),
    },
    {
      slug: 'design-system-scale',
      title: 'Building a Design System That Actually Gets Adopted',
      excerpt: 'Token architecture, component governance, documentation strategies, and the human factors that determine whether a design system thrives or dies.',
      category: 'Design Engineering', author: 'Priya Mehta', authorInitials: 'PM',
      date: new Date('2025-04-28'), readTime: '8 min read',
      tags: ['Design Systems', 'UX', 'Frontend'],
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200',
      content: '<h2>Tokens are Just the Beginning</h2><p>A design system without adoption is just an expensive UI kit.</p>',
      featured: false, isPublished: true, publishedAt: new Date('2025-04-28'),
    },
    {
      slug: 'data-mesh-healthcare',
      title: 'Data Mesh Architecture in Healthcare: A Case Study',
      excerpt: 'How we implemented a federated data platform for an NHS trust, enabling 12 independent data domains while maintaining GDPR compliance and audit trails.',
      category: 'Data Engineering', author: 'Dr. Amara Osei', authorInitials: 'AO',
      date: new Date('2025-04-10'), readTime: '14 min read',
      tags: ['Data Mesh', 'Healthcare', 'GDPR'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
      content: '<h2>Federated Responsibility</h2><p>Centralised data lakes become bottlenecks. By adopting a data mesh, we gave clinical domains ownership over their own data pipelines.</p>',
      featured: false, isPublished: true, publishedAt: new Date('2025-04-10'),
    },
  ];

  for (const post of postsData) {
    await prisma.blogPost.create({ data: post });
  }
  console.log(`  ✓ ${postsData.length} blog posts created`);

  // Team members
  const teamData = [
    { name: 'Dr. Aisha Nkosi', role: 'CEO & Co-Founder', bio: 'PhD Computer Science (MIT). 15 years building AI systems at scale. Former Principal Scientist at Google DeepMind.', avatar: '👩🏾‍💻', linkedin: '#', github: '#', specialties: ['AI/ML', 'Strategic Leadership', 'Research'], order: 1 },
    { name: 'James Okafor', role: 'CTO & Co-Founder', bio: 'M.Eng Electrical Engineering (Imperial College). 18 years in embedded systems and distributed computing. Former VP Engineering at ARM.', avatar: '👨🏿‍💻', linkedin: '#', github: '#', specialties: ['Embedded Systems', 'Architecture', 'Cloud'], order: 2 },
    { name: 'Priya Sharma', role: 'VP Cloud Engineering', bio: 'AWS Solutions Architect Professional & Kubernetes CKA. Built cloud infrastructure serving 500M+ users at Spotify.', avatar: '👩🏽‍💻', linkedin: '#', github: '#', specialties: ['AWS', 'Kubernetes', 'DevOps'], order: 3 },
    { name: 'Thomas Ekwe', role: 'VP Engineering', bio: 'BSc Computer Science (UCL). Engineering leadership for 200+ person engineering teams. Former Director at Revolut.', avatar: '👨🏾‍💻', linkedin: '#', github: '#', specialties: ['Engineering Management', 'Scaling', 'Process'], order: 4 },
    { name: 'Amara Hassan', role: 'Head of Blockchain', bio: 'MSc Cryptography (ETH Zurich). 8 years in DeFi protocol development. Smart contract auditor with $2B+ TVL secured.', avatar: '👩🏾‍💻', linkedin: '#', github: '#', specialties: ['Solidity', 'DeFi', 'Security'], order: 5 },
    { name: 'Sofia Mendes', role: 'Head of Product Design', bio: 'BA Interaction Design (RCA London). Design lead for 50+ products shipped across FinTech, HealthTech, and SaaS.', avatar: '👩🏻‍💻', linkedin: '#', github: '#', specialties: ['UI/UX', 'Design Systems', 'Research'], order: 6 },
    { name: 'Marcus Webb', role: 'Head of Robotics', bio: 'PhD Robotics (Imperial College). Former research engineer at Boston Dynamics. ROS2 core contributor.', avatar: '👨🏻‍💻', linkedin: '#', github: '#', specialties: ['ROS2', 'Motion Planning', 'Computer Vision'], order: 7 },
    { name: 'Yuki Tanaka', role: 'Head of Cybersecurity', bio: 'OSCP, CEH, CISSP certified. Former red team lead at GCHQ. 500+ penetration tests delivered.', avatar: '🧑🏻‍💻', linkedin: '#', github: '#', specialties: ['Pen Testing', 'SecDevOps', 'Compliance'], order: 8 },
  ];

  for (const member of teamData) {
    await prisma.teamMember.create({ data: member });
  }
  console.log(`  ✓ ${teamData.length} team members created`);

  // Timeline
  const timelineData = [
    { year: '2015', title: 'Seed Founded', desc: 'Founded by Aisha and James in London with a team of 4, focused on embedded systems consulting.', icon: '🌱', order: 1 },
    { year: '2017', title: 'First Major Contract', desc: 'Secured a £2M firmware development contract with a FTSE 100 manufacturer. Team grew to 25.', icon: '📈', order: 2 },
    { year: '2019', title: 'Web & Mobile Practice', desc: 'Expanded into full-stack web and mobile development. Launched AI & ML practice with first data science hire.', icon: '🌐', order: 3 },
    { year: '2020', title: 'Remote-First Transition', desc: 'Moved to distributed model, hiring globally. Team reached 80 engineers across 12 countries.', icon: '🌍', order: 4 },
    { year: '2022', title: 'Series A', desc: 'Raised £15M Series A from Balderton Capital. Opened offices in Berlin, Nairobi, and Singapore.', icon: '💰', order: 5 },
    { year: '2023', title: '200 Engineers', desc: 'Hit the 200-engineer milestone. Launched dedicated AI, Robotics, and Cybersecurity practices.', icon: '🚀', order: 6 },
    { year: '2024', title: 'Enterprise Expansion', desc: 'Onboarded Fortune 500 clients. Launched enterprise SLA support program. 500+ projects delivered.', icon: '🏢', order: 7 },
    { year: '2025', title: 'Today', desc: '200+ engineers. 35+ industries. 99.7% SLA uptime. Still planting seeds.', icon: '💎', order: 8 },
  ];

  for (const item of timelineData) {
    await prisma.teamTimeline.create({ data: item });
  }
  console.log(`  ✓ ${timelineData.length} timeline items created`);

  // Default settings
  const settingsData = {
    siteName: { value: { name: 'SEED', tagline: 'Innovation Lab' }, type: 'json' },
    seo: { value: { title: 'SEED — Software Engineering & Design Agency', description: 'We are a world-class software engineering and design agency building products that matter.' }, type: 'json' },
    social: { value: { linkedin: '#', twitter: '#', github: '#', email: 'hello@seed.agency' }, type: 'json' },
    contact: { value: { email: 'hello@seed.agency', phone: '+44 20 7123 4567', address: '123 Innovation Street, London, EC1A 1BB' }, type: 'json' },
    business_hours: { value: { weekday: '9:00 AM — 6:00 PM GMT', weekend: 'Closed' }, type: 'json' },
  };

  for (const [key, data] of Object.entries(settingsData)) {
    await prisma.setting.create({ data: { key, ...data } });
  }
  console.log(`  ✓ ${Object.keys(settingsData).length} settings created`);

  console.log('\n✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });