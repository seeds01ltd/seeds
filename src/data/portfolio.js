import { HeartPulse, TrendingUp, Truck, Factory, GraduationCap, Lock } from 'lucide-react';

export const projects = [
  {
    slug: 'nexus-health',
    title: 'Nexus Health Platform',
    client: 'NexusHealth Ltd.',
    industry: 'Healthcare',
    color: '#34d399',
    icon: HeartPulse,
    image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=1200',
    summary: 'End-to-end EHR platform serving 1.2M patients across 40 hospitals. Real-time clinical decision support powered by a custom ML model with 94% diagnostic accuracy.',
    content: `
      <h2>The Challenge</h2>
      <p>NexusHealth needed to replace a fragmented legacy EHR system that was causing clinical delays and data silos across 40 hospitals.</p>
      <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" alt="Clinical Dashboard" style="width:100%; border-radius:12px; margin: 2rem 0; border: 1px solid var(--border-subtle);" />
      <h2>The Solution</h2>
      <p>We built a microservices-based platform using React, Python, and PostgreSQL, integrated with a custom TensorFlow model for real-time diagnostic support.</p>
    `,
    tech: ['React', 'Python', 'PostgreSQL', 'AWS', 'TensorFlow'],
    results: [
      { metric: '1.2M', label: 'Active Patients' },
      { metric: '94%', label: 'AI Accuracy' },
      { metric: '68%', label: 'Admin Reduction' },
    ],
    featured: true,
  },
  {
    slug: 'orbital-fintech',
    title: 'Orbital Trading Engine',
    client: 'Orbital Capital Group',
    industry: 'FinTech',
    color: '#818cf8',
    icon: TrendingUp,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200',
    summary: 'Ultra-low-latency algorithmic trading infrastructure processing 2M transactions per second. Co-located at major exchanges with 99.999% uptime and sub-millisecond execution.',
    content: `<h2>High Frequency Scale</h2><p>Rewriting the trading engine in Rust allowed Orbital Capital to handle 2 million transactions per second with zero garbage collection pauses.</p>`,
    tech: ['Rust', 'C++', 'Redis', 'Kafka', 'FIX Protocol'],
    results: [
      { metric: '2M/s', label: 'Transactions' },
      { metric: '<1ms', label: 'Execution' },
      { metric: '99.999%', label: 'Uptime' },
    ],
    featured: true,
  },
  {
    slug: 'aurora-logistics',
    title: 'Aurora Fleet Intelligence',
    client: 'Aurora Logistics GmbH',
    industry: 'Logistics',
    color: '#60a5fa',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c83a0a?auto=format&fit=crop&q=80&w=1200',
    summary: 'AI-powered route optimisation and real-time fleet management for 4,200 vehicles across 18 countries. Reduced fuel costs by 23% and carbon emissions by 31%.',
    content: `<h2>Global Route Optimisation</h2><p>Using real-time traffic data and a custom Graph Neural Network, we optimised routes dynamically across 18 countries.</p>`,
    tech: ['Python', 'React Native', 'PostgreSQL', 'Kubernetes', 'GraphQL'],
    results: [
      { metric: '23%', label: 'Fuel Savings' },
      { metric: '31%', label: 'CO₂ Reduced' },
      { metric: '4,200', label: 'Vehicles' },
    ],
    featured: true,
  },
  {
    slug: 'zenith-manufacturing',
    title: 'Zenith Smart Factory OS',
    client: 'Zenith Manufacturing PLC',
    industry: 'Manufacturing',
    color: '#fbbf24',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1565439390232-a5e2d1ebbf18?auto=format&fit=crop&q=80&w=1200',
    summary: 'Industrial IoT platform connecting 3,400 sensors across 12 production lines. Predictive maintenance reduced unplanned downtime by 78% in the first year.',
    content: `<h2>Industrial IoT</h2><p>Connected sensors stream 1TB of data daily to an InfluxDB cluster, where predictive models anticipate machine failure.</p>`,
    tech: ['Rust', 'MQTT', 'InfluxDB', 'React', 'Kubernetes'],
    results: [
      { metric: '78%', label: 'Less Downtime' },
      { metric: '3,400', label: 'Sensors' },
      { metric: '₦3B', label: 'Annual Savings' },
    ],
    featured: false,
  },
  {
    slug: 'prism-edtech',
    title: 'Prism Learning Platform',
    client: 'Prism EdTech Inc.',
    industry: 'Education',
    color: '#c084fc',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
    summary: 'Adaptive AI tutoring platform used by 280,000 students across 60 universities. Personalised learning paths improved exam pass rates by 34% in controlled trials.',
    content: `<h2>Adaptive Learning Paths</h2><p>We built a PyTorch model that dynamically adjusts the curriculum based on a student's real-time comprehension metrics.</p>`,
    tech: ['Next.js', 'Python', 'PyTorch', 'AWS', 'PostgreSQL'],
    results: [
      { metric: '280K', label: 'Students' },
      { metric: '+34%', label: 'Pass Rates' },
      { metric: '60', label: 'Universities' },
    ],
    featured: false,
  },
  {
    slug: 'vaultchain',
    title: 'VaultChain DeFi Protocol',
    client: 'VaultChain Labs',
    industry: 'Web3',
    color: '#f87171',
    icon: Lock,
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=1200',
    summary: 'Multi-chain DeFi protocol managing $340M TVL with smart contract infrastructure audited by three independent security firms. Zero security incidents since launch.',
    content: `<h2>Bulletproof Infrastructure</h2><p>Managing $340M TVL requires zero compromise. Our Solidity contracts were formally verified and audited by multiple tier-1 firms.</p>`,
    tech: ['Solidity', 'Rust', 'The Graph', 'Hardhat', 'IPFS'],
    results: [
      { metric: '$340M', label: 'TVL' },
      { metric: '0', label: 'Security Incidents' },
      { metric: '180K', label: 'Wallet Users' },
    ],
    featured: false,
  },
];

export const getFeatured = () => projects.filter(p => p.featured);
export const getAll      = () => projects;
export const getBySlug   = (slug) => projects.find(p => p.slug === slug);
