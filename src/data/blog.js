export const posts = [
  {
    slug: 'llm-production-systems',
    title: 'Engineering LLMs for Production: Lessons from 18 Months in the Field',
    excerpt: 'Context windows, hallucination mitigation, cost optimisation, and the operational reality of running large language models at scale in regulated industries.',
    category: 'AI Engineering',
    author: 'Dr. Amara Osei', authorInitials: 'AO',
    date: 'June 28, 2025', readTime: '12 min read',
    tags: ['LLM', 'Production', 'MLOps'],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>The Operational Reality</h2>
      <p>Deploying Large Language Models (LLMs) into production requires a massive shift in engineering paradigms. Over the last 18 months, our team has learned that the real challenge isn't building the prompt—it's building the guardrails.</p>
      <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" alt="Server Rack" style="width:100%; border-radius:12px; margin: 2rem 0; border: 1px solid var(--border-subtle);" />
      <h3>Mitigating Hallucinations at Scale</h3>
      <p>We implemented a multi-tiered validation architecture that automatically flags outputs outside of our strict deterministic bounds.</p>
      <ul>
        <li>Semantic similarity scoring against ground-truth bases</li>
        <li>Secondary discriminator models acting as judges</li>
        <li>Human-in-the-loop fallback mechanisms</li>
      </ul>
      <p>This approach reduced critical hallucination events by 99.4%.</p>
    `,
    featured: true,
  },
  {
    slug: 'rust-embedded-systems',
    title: 'Why We Switched from C++ to Rust for Safety-Critical Embedded Firmware',
    excerpt: 'Memory safety guarantees, zero-cost abstractions, and the cultural shift required to adopt Rust across a 40-person embedded engineering team.',
    category: 'Embedded Systems',
    author: 'Marcus Chen', authorInitials: 'MC',
    date: 'June 14, 2025', readTime: '9 min read',
    tags: ['Rust', 'Embedded', 'Safety'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>The Cost of Memory Un-Safety</h2>
      <p>In safety-critical systems like medical devices, a segmentation fault isn't just an inconvenience—it's a critical failure. For years, we relied on C++ and exhaustive MISRA guidelines to keep our firmware safe.</p>
      <h3>Enter Rust</h3>
      <p>Rust's borrow checker fundamentally changed how we write firmware. It moved memory management from a runtime anxiety to a compile-time guarantee.</p>
      <div style="background:var(--bg-raised); padding:1.5rem; border-radius:8px; border:1px solid var(--border-subtle); margin: 2rem 0; font-family:var(--font-mono); font-size:0.9rem; color:var(--text-secondary);">
        <span style="color:#f87171">// Old C++ Pattern</span><br/>
        void process(Data* ptr) {<br/>
        &nbsp;&nbsp;if (!ptr) return;<br/>
        &nbsp;&nbsp;// Hope nobody else frees this<br/>
        }
      </div>
      <p>The cultural shift was the hardest part, but today, our 40-person embedded team ships features 3x faster with near-zero memory bugs.</p>
    `,
    featured: true,
  },
  {
    slug: 'kubernetes-cost-optimisation',
    title: 'Cutting Our Kubernetes Cloud Bill by 58% Without Sacrificing Reliability',
    excerpt: 'A practical deep-dive into pod autoscaling, spot instances, cluster bin-packing, and the monitoring infrastructure that made it all observable.',
    category: 'Cloud & DevOps',
    author: 'Sophia Andersen', authorInitials: 'SA',
    date: 'May 30, 2025', readTime: '15 min read',
    tags: ['Kubernetes', 'AWS', 'Cost'],
    image: 'https://images.unsplash.com/photo-1667372283536-a831e58cddef?auto=format&fit=crop&q=80&w=1200',
    content: `<h2>Infrastructure as Cost</h2><p>Cloud spend is engineering spend. By aggressively bin-packing our workloads and leaning heavily into Spot instances, we transformed our AWS bill.</p>`,
    featured: false,
  },
  {
    slug: 'zero-trust-architecture',
    title: 'Implementing Zero Trust: From Theory to Production in 90 Days',
    excerpt: 'Step-by-step guide to deploying a zero-trust network architecture across a hybrid cloud environment, with a focus on developer experience.',
    category: 'Cybersecurity',
    author: 'James Okafor', authorInitials: 'JO',
    date: 'May 12, 2025', readTime: '11 min read',
    tags: ['Security', 'Zero Trust', 'Architecture'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
    content: `<h2>Verify Everything</h2><p>Zero trust isn't a product you buy; it's an architecture you implement. Here's how we rolled it out globally without crippling developer productivity.</p>`,
    featured: false,
  },
  {
    slug: 'design-system-scale',
    title: 'Building a Design System That Actually Gets Adopted',
    excerpt: 'Token architecture, component governance, documentation strategies, and the human factors that determine whether a design system thrives or dies.',
    category: 'Design Engineering',
    author: 'Priya Mehta', authorInitials: 'PM',
    date: 'April 28, 2025', readTime: '8 min read',
    tags: ['Design Systems', 'UX', 'Frontend'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200',
    content: `<h2>Tokens are Just the Beginning</h2><p>A design system without adoption is just an expensive UI kit. We focused on governance and automated tooling to ensure engineers actually wanted to use it.</p>`,
    featured: false,
  },
  {
    slug: 'data-mesh-healthcare',
    title: 'Data Mesh Architecture in Healthcare: A Case Study',
    excerpt: 'How we implemented a federated data platform for a major hospital group, enabling 12 independent data domains while maintaining NDPR compliance and audit trails.',
    category: 'Data Engineering',
    author: 'Dr. Amara Osei', authorInitials: 'AO',
    date: 'April 10, 2025', readTime: '14 min read',
    tags: ['Data Mesh', 'Healthcare', 'NDPR'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
    content: `<h2>Federated Responsibility</h2><p>Centralised data lakes become bottlenecks. By adopting a data mesh, we gave clinical domains ownership over their own data pipelines.</p>`,
    featured: false,
  },
];

export const getAll      = () => posts;
export const getFeatured = () => posts.filter(p => p.featured);
export const getBySlug   = (slug) => posts.find(p => p.slug === slug);
