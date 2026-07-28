import { 
  Globe, 
  Cpu, 
  Cloud, 
  Microchip, 
  ShieldCheck, 
  Database, 
  Link, 
  Layout 
} from 'lucide-react';

/* Mock-production data — replace with API calls when backend is ready */

export const services = [
  {
    slug: 'web-mobile',
    icon: Globe,
    title: 'Web & Mobile Development',
    tagline: 'Full-stack products built to scale from day one.',
    color: '#818cf8',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    video: null,
    description: 'We design and engineer web applications and native mobile experiences that are fast, accessible, and beautifully crafted. From SaaS platforms to consumer apps.',
    content: `
      <h2>Beyond the Framework</h2>
      <p>Building for the modern web requires more than just knowing React. It demands a deep understanding of browser engines, network protocols, and rendering strategies.</p>
      <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200" alt="Code on Screen" style="width:100%; border-radius:12px; margin: 2rem 0; border: 1px solid var(--border-subtle);" />
      <h3>Our Approach</h3>
      <p>We leverage SSR (Server-Side Rendering) and Edge computing to deliver single-page application speeds with static-site SEO profiles.</p>
    `,
    tech: ['React', 'Next.js', 'React Native', 'TypeScript', 'Node.js'],
    featured: true,
  },
  {
    slug: 'ai-ml',
    icon: Cpu,
    title: 'AI & Machine Learning',
    tagline: 'Intelligence woven into the fabric of your product.',
    color: '#a78bfa',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
    description: 'LLM integrations, computer vision, NLP, predictive analytics, and custom model development. We make AI practical, reliable, and production-ready.',
    content: `<h2>Production AI</h2><p>We take ML models out of the Jupyter notebook and deploy them into hardened production pipelines.</p>`,
    tech: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'LangChain'],
    featured: true,
  },
  {
    slug: 'cloud-devops',
    icon: Cloud,
    title: 'Cloud & DevOps',
    tagline: 'Resilient infrastructure that scales without friction.',
    color: '#60a5fa',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1200',
    description: 'Cloud architecture, CI/CD pipelines, Kubernetes orchestration, and platform engineering. We build infrastructure that teams love to operate.',
    content: `<h2>Infrastructure as Code</h2><p>Everything we build is defined in Terraform and automated via GitHub Actions.</p>`,
    tech: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    featured: true,
  },
  {
    slug: 'embedded',
    icon: Microchip,
    title: 'Embedded Systems',
    tagline: 'Software that runs where others can\'t reach.',
    color: '#34d399',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    description: 'Firmware, RTOS, IoT platforms, and hardware-software co-design for industrial, medical, and consumer device applications.',
    content: `<h2>Safety Critical</h2><p>Our firmware engineers specialise in Rust and C++ for mission-critical embedded systems.</p>`,
    tech: ['C/C++', 'Rust', 'RTOS', 'ARM', 'RISC-V'],
    featured: false,
  },
  {
    slug: 'cybersecurity',
    icon: ShieldCheck,
    title: 'Cybersecurity',
    tagline: 'Zero-trust architecture, pen-testing, and compliance.',
    color: '#f87171',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
    description: 'From penetration testing to secure-by-design architecture, we help organisations protect their data, infrastructure, and reputation.',
    content: `<h2>Secure by Design</h2><p>We bake security into the CI/CD pipeline from day one.</p>`,
    tech: ['OWASP', 'ISO 27001', 'NDPR', 'Zero Trust', 'SIEM'],
    featured: false,
  },
  {
    slug: 'data-engineering',
    icon: Database,
    title: 'Data Engineering',
    tagline: 'Reliable data pipelines from raw bytes to business insight.',
    color: '#fbbf24',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
    description: 'Data lake architecture, real-time streaming, ETL pipelines, and business intelligence dashboards. We turn data chaos into strategic clarity.',
    content: `<h2>Data that Flows</h2><p>We build robust ETL pipelines that process terabytes of data daily.</p>`,
    tech: ['Spark', 'Kafka', 'dbt', 'Snowflake', 'Airflow'],
    featured: false,
  },
  {
    slug: 'blockchain',
    icon: Link,
    title: 'Blockchain & Web3',
    tagline: 'Smart contracts, DeFi protocols, and NFT infrastructure.',
    color: '#c084fc',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200',
    description: 'Ethereum, Solana, and multi-chain development. We build DApps, tokenisation platforms, and DAO tooling with security at the core.',
    content: `<h2>Audited Smart Contracts</h2><p>Our Web3 infrastructure powers hundreds of millions in TVL.</p>`,
    tech: ['Solidity', 'Rust', 'Hardhat', 'The Graph', 'IPFS'],
    featured: false,
  },
  {
    slug: 'design-systems',
    icon: Layout,
    title: 'Design Systems & UX',
    tagline: 'Cohesive, accessible interfaces at any scale.',
    color: '#fb923c',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200',
    description: 'Component libraries, design tokens, accessibility audits, and user experience research. Beautiful products that users love to use.',
    content: `<h2>Tokens and Components</h2><p>We build design systems that engineers actually want to adopt.</p>`,
    tech: ['Figma', 'Storybook', 'WCAG', 'React', 'CSS-in-JS'],
    featured: false,
  },
];

export const getFeatured = () => services.filter(s => s.featured);
export const getBySlug   = (slug) => services.find(s => s.slug === slug);
export const getCategories = () => [{ id: 'all', title: 'All Services', items: services }];
