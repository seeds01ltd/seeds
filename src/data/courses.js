export const courses = [
  {
    slug: 'react-masterclass',
    title: 'React & Next.js Masterclass',
    tagline: 'From components to production deployment in 6 weeks.',
    description: 'A comprehensive deep-dive into modern React development. Covering hooks, state management, server-side rendering, and full-stack architecture with Next.js.',
    level: 'Intermediate',
    duration: '8 hours 45 min total',
    format: 'Self-paced + Weekly Q&A',
    instructor: 'Priya Sharma',
    instructorRole: 'VP Cloud Engineering',
    topics: ['Components & Hooks', 'State Management', 'SSR & SSG', 'Routing & Navigation', 'API Integration', 'Testing', 'Deployment', 'Performance'],
    lessonsCount: 6,
    students: 1200,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>What You'll Learn</h2>
      <p>This masterclass takes you from intermediate React knowledge to production-ready mastery. You'll build three real-world applications over six weeks, each reinforcing a different aspect of the React ecosystem.</p>
      <h3>Week 1-2: React Foundations</h3>
      <p>Deep dive into hooks, custom hooks, context, and refs. Understanding the render lifecycle and when to optimise.</p>
      <h3>Week 3-4: Next.js & Full-Stack</h3>
      <p>Server components, data fetching patterns, middleware, API routes, and authentication strategies.</p>
      <h3>Week 5-6: Production Readiness</h3>
      <p>Testing strategies, performance profiling, CI/CD integration, and monitoring in production environments.</p>
    `,
    featured: true,
    lessons: [
      {
        id: '1',
        title: 'React Foundations & JSX Deep Dive',
        duration: '1 hour 15 min',
        content: `
          <h2>Understanding JSX at the Compiler Level</h2>
          <p>JSX is not HTML — it's syntactic sugar for <code>React.createElement</code> calls. Every JSX element you write is transformed by the compiler (Babel or TypeScript) into a plain JavaScript object called a React element.</p>
          <pre style="background:var(--bg-raised);padding:1rem;border-radius:8px;border:1px solid var(--border-subtle);overflow-x:auto;font-size:0.85rem;line-height:1.6;"><code>// This JSX:
const element = &lt;h1 className="greeting"&gt;Hello&lt;/h1&gt;

// Compiles to this:
const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello'
);</code></pre>
          <p>This is why you must import React (or have the JSX transform enabled) in every file that uses JSX. The new JSX transform (<code>react/jsx-runtime</code>) in React 18+ auto-imports the necessary functions, so you don't need <code>import React from 'react'</code> in every file.</p>
          <h3>React Elements vs DOM Elements</h3>
          <p>A React element is a lightweight description of what you want to see on screen. It's an object with <code>type</code>, <code>props</code>, and <code>children</code>. React DOM takes care of reconciling this description with the actual DOM.</p>
          <p>Key insight: React elements are immutable. Once you create an element, you cannot change its children or attributes. This is what makes React's reconciliation fast and predictable.</p>
          <h3>Practice Exercise</h3>
          <p>Open your browser console and run <code>console.log(React.createElement('div', null, 'hello'))</code>. Examine the object that's returned. Notice the <code>$$typeof</code> symbol — this is a security feature that helps prevent XSS attacks.</p>
        `,
      },
      {
        id: '2',
        title: 'Hooks: useState, useEffect & Custom Hooks',
        duration: '1 hour 30 min',
        content: `
          <h2>The Mental Model of Hooks</h2>
          <p>Hooks let you use state and other React features without writing a class. They are functions that let you "hook into" React internals. The most important mental model to understand is that hooks execute in the same order on every render.</p>
          <h3>useState — Local Component State</h3>
          <pre style="background:var(--bg-raised);padding:1rem;border-radius:8px;border:1px solid var(--border-subtle);overflow-x:auto;font-size:0.85rem;"><code>function Counter() {
  const [count, setCount] = useState(0);
  // count is the current state
  // setCount is the updater function
  return (
    &lt;button onClick={() => setCount(c => c + 1)}&gt;
      Count: {count}
    &lt;/button&gt;
  );
}</code></pre>
          <p>Always use the functional updater form (<code>setCount(c => c + 1)</code>) when the new state depends on the previous state. This guarantees correctness even with batching.</p>
          <h3>useEffect — Side Effects in Components</h3>
          <p>useEffect runs after React has committed changes to the DOM. The dependency array tells React when to re-run the effect. Empty array <code>[]</code> means "run once on mount."</p>
          <pre style="background:var(--bg-raised);padding:1rem;border-radius:8px;border:1px solid var(--border-subtle);overflow-x:auto;font-size:0.85rem;"><code>useEffect(() => {
  fetch('/api/data').then(res => res.json()).then(setData);
  return () => console.log('Cleanup on unmount');
}, []); // Only runs once</code></pre>
          <p>Always clean up subscriptions, timers, and event listeners in the return function to prevent memory leaks.</p>
          <h3>Custom Hooks — Extract Logic</h3>
          <p>Custom hooks are the primary mechanism for reusing stateful logic. If you find yourself writing the same useEffect + useState pattern across components, extract it into a custom hook.</p>
        `,
      },
      {
        id: '3',
        title: 'State Management Patterns',
        duration: '1 hour 20 min',
        content: `
          <h2>Lifting State, Context & Beyond</h2>
          <p>State management is about answering one question: where does each piece of state live? The answer depends on how many components need that state and how they relate to each other.</p>
          <h3>Lifting State Up</h3>
          <p>The simplest pattern: move shared state to the closest common ancestor and pass it down via props. This works well for 2-3 levels of nesting.</p>
          <h3>Context API</h3>
          <p>React Context lets you broadcast state to any component in the tree without prop drilling. Use it for "global" concerns like themes, auth, or locale.</p>
          <pre style="background:var(--bg-raised);padding:1rem;border-radius:8px;border:1px solid var(--border-subtle);overflow-x:auto;font-size:0.85rem;"><code>const ThemeContext = createContext('dark');

function App() {
  return (
    &lt;ThemeContext.Provider value="dark"&gt;
      &lt;Toolbar /&gt;
    &lt;/ThemeContext.Provider&gt;
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return &lt;div className={theme} /&gt;;
}</code></pre>
          <p>Pro tip: split contexts that change independently to avoid unnecessary re-renders.</p>
        `,
      },
      {
        id: '4',
        title: 'Next.js & Server Components',
        duration: '1 hour 45 min',
        content: `
          <h2>Full-Stack React with Next.js</h2>
          <p>Next.js extends React with server-side rendering, static generation, and API routes. The App Router (introduced in Next.js 13+) changes everything with React Server Components.</p>
          <h3>Server Components vs Client Components</h3>
          <p>By default, all components in the App Router are Server Components. They run on the server and send only HTML to the client. Add <code>"use client"</code> at the top of a file to make it a Client Component with interactivity.</p>
          <pre style="background:var(--bg-raised);padding:1rem;border-radius:8px;border:1px solid var(--border-subtle);overflow-x:auto;font-size:0.85rem;"><code>// This is a Server Component (no "use client")
async function BlogPosts() {
  const posts = await db.posts.findMany(); // Direct DB access!
  return posts.map(p => &lt;PostCard key={p.id} {...p} /&gt;);
}

// This is a Client Component
"use client";
function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);
  return &lt;button onClick={() => setLiked(!liked)}&gt;Like&lt;/button&gt;;
}</code></pre>
          <p>The key insight: Server Components can be async and access databases directly. Client Components cannot. Use Server Components for data fetching and rendering, Client Components only for interactivity.</p>
        `,
      },
      {
        id: '5',
        title: 'Data Fetching & Authentication',
        duration: '1 hour 10 min',
        content: `
          <h2>Fetching Data in Next.js</h2>
          <p>Next.js 13+ introduces four data fetching patterns: static, dynamic, incremental, and client-side. Choosing the right one depends on how fresh your data needs to be.</p>
          <h3>Static Generation (SSG)</h3>
          <p>Data is fetched at build time. Best for content that rarely changes: blog posts, marketing pages, documentation.</p>
          <h3>Dynamic (SSR)</h3>
          <p>Data is fetched on every request. Best for personalised content: dashboards, user profiles.</p>
          <h3>Incremental Static Regeneration (ISR)</h3>
          <p>Data is fetched at build time but revalidated periodically. Best compromise for most use cases.</p>
          <h3>Authentication Patterns</h3>
          <p>Use middleware for route protection. Check for session cookies or JWT tokens before rendering protected pages. Store session data in HTTP-only cookies for security.</p>
        `,
      },
      {
        id: '6',
        title: 'Testing & Deployment',
        duration: '1 hour 25 min',
        content: `
          <h2>Shipping with Confidence</h2>
          <p>A solid testing strategy prevents regressions and gives you the confidence to ship frequently. We cover the three layers of the testing trophy: unit, integration, and e2e.</p>
          <h3>Unit Testing with Vitest</h3>
          <p>Test individual functions and hooks in isolation. Mock external dependencies. Aim for fast, focused tests that validate logic.</p>
          <h3>Integration Testing with React Testing Library</h3>
          <p>Test components as users interact with them. Query by accessible roles, labels, and text — not implementation details like CSS classes or component internals.</p>
          <h3>E2E with Playwright</h3>
          <p>Test critical user flows end-to-end: signup, login, checkout, etc. Run these in CI before every deployment.</p>
          <h3>Deployment to Vercel</h3>
          <p>Vercel is the platform built by the creators of Next.js. Connect your Git repository, configure environment variables, and every push triggers a preview deployment automatically.</p>
        `,
      },
    ],
  },
  {
    slug: 'python-data-science',
    title: 'Python for Data Science',
    tagline: 'Turn raw data into actionable insights.',
    description: 'A beginner-friendly introduction to data science using Python. Learn pandas, numpy, matplotlib, and scikit-learn through hands-on projects.',
    level: 'Beginner',
    duration: '5 hours total',
    format: 'Self-paced + Mentor Support',
    instructor: 'Dr. Aisha Nkosi',
    instructorRole: 'CEO & Co-Founder',
    topics: ['Python Basics', 'NumPy & Pandas', 'Data Visualization', 'Statistical Analysis', 'Machine Learning Basics'],
    lessonsCount: 5,
    students: 2300,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>From Zero to Data-Driven</h2>
      <p>Data is everywhere, but extracting value from it requires the right tools and mindset. This course gives you both, using Python's rich data ecosystem.</p>
      <h3>What You'll Build</h3>
      <p>By the end of this course, you'll have built a complete data analysis pipeline: from raw CSV files to interactive dashboards and predictive models.</p>
    `,
    featured: true,
    lessons: [
      { id: '1', title: 'Python Fundamentals for Data', duration: '1 hour', content: '<h2>Python for Data Work</h2><p>Before diving into libraries, you need a solid grasp of Python fundamentals with a data twist. We cover lists comprehensions, generator expressions, and the standard library modules most relevant to data processing.</p><pre style="background:var(--bg-raised);padding:1rem;border-radius:8px;border:1px solid var(--border-subtle);overflow-x:auto;font-size:0.85rem;"><code># List comprehension for data cleaning<br/>cleaned = [x.strip().lower() for x in raw_data if x]</code></pre>' },
      { id: '2', title: 'NumPy & Vectorisation', duration: '1 hour 10 min', content: '<h2>Fast Numerical Computing</h2><p>NumPy is the foundation of the Python data stack. Its key advantage is vectorisation — operations that run in compiled C under the hood instead of slow Python loops.</p><p>Understanding broadcasting rules and when to use vectorised operations will save you hours of computation time.</p>' },
      { id: '3', title: 'Pandas for Data Wrangling', duration: '1 hour 20 min', content: '<h2>DataFrames: The Workhorse</h2><p>Pandas DataFrames are the Excel spreadsheets of the programming world — but infinitely more powerful. Learn filtering, grouping, merging, and pivoting real-world datasets.</p><p>We cover the split-apply-combine pattern that underlies most data analysis workflows.</p>' },
      { id: '4', title: 'Visualisation with Matplotlib & Seaborn', duration: '1 hour', content: '<h2>Tell a Story with Data</h2><p>A great chart communicates insights instantly. We cover line plots, scatter matrices, heatmaps, and customising every element of your visualisations for publication-quality output.</p>' },
      { id: '5', title: 'Intro to Machine Learning with scikit-learn', duration: '1 hour 10 min', content: '<h2>Your First Models</h2><p>Train your first classification and regression models using scikit-learn. We cover train/test splits, cross-validation, and the most common pitfalls beginners face when evaluating model performance.</p>' },
    ],
  },
  {
    slug: 'node-js-backend',
    title: 'Node.js Backend Development',
    tagline: 'Build scalable APIs and backend services.',
    description: 'Learn to design, build, and deploy robust backend systems using Node.js, Express, and PostgreSQL. Covers REST APIs, GraphQL, authentication, and testing.',
    level: 'Intermediate',
    duration: '7 hours 15 min total',
    format: 'Self-paced + Weekly Q&A',
    instructor: 'Thomas Ekwe',
    instructorRole: 'VP Engineering',
    topics: ['Express.js', 'REST API Design', 'Database Design', 'Authentication & Auth', 'Testing', 'Deployment'],
    lessonsCount: 5,
    students: 1800,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>Backend Engineering, Properly</h2>
      <p>This course covers everything you need to build production-grade backend systems. We focus on patterns that scale — both in terms of traffic and team size.</p>
      <h3>What You'll Build</h3>
      <p>You'll build a complete RESTful API with authentication, database integration, testing, and a CI/CD deployment pipeline. By the end of the course, you'll have a production-ready backend template you can reuse across projects.</p>
      <h3>Prerequisites</h3>
      <p>Basic JavaScript knowledge and familiarity with the command line. No prior backend experience required.</p>
    `,
    featured: false,
    lessons: [
      { id: '1', title: 'Express.js & Middleware Architecture', duration: '1 hour 30 min', content: '<h2>Understanding the Middleware Stack</h2><p>Express is fundamentally a middleware runner. Every request passes through a stack of functions in order. This architectural pattern is elegant and powerful — but only if you understand the request-response cycle deeply.</p><p>We cover error-handling middleware, third-party middleware integration, and building your own reusable middleware.</p>' },
      { id: '2', title: 'RESTful API Design Principles', duration: '1 hour 15 min', content: '<h2>Designing APIs That Last</h2><p>A well-designed API outlives any single implementation. We cover resource naming, status codes, pagination patterns, versioning strategies, and HATEOAS — and when to ignore each of them.</p>' },
      { id: '3', title: 'Database Design & PostgreSQL', duration: '1 hour 45 min', content: '<h2>Data Integrity at Scale</h2><p>PostgreSQL is the gold standard for relational databases. We cover schema design, indexing strategies, query optimisation, and connection pooling for high-traffic applications.</p>' },
      { id: '4', title: 'Authentication & Authorisation', duration: '1 hour 30 min', content: '<h2>Securing Your API</h2><p>Implement JWT-based authentication with refresh token rotation. Covers bcrypt hashing, session management, role-based access control, and common attack vectors like CSRF and XSS.</p>' },
      { id: '5', title: 'Testing & Deployment', duration: '1 hour 15 min', content: '<h2>Shipping Reliable Backends</h2><p>Integration tests with Supertest, database test fixtures, CI/CD pipelines, and deploying to production with Docker and process managers like PM2.</p>' },
    ],
  },
  {
    slug: 'docker-kubernetes',
    title: 'Docker & Kubernetes in Production',
    tagline: 'Container orchestration for real-world systems.',
    description: 'Master containerisation and orchestration. From Dockerfiles to multi-cluster Kubernetes deployments with monitoring, scaling, and security.',
    level: 'Intermediate',
    duration: '8 hours 45 min total',
    format: 'Self-paced + Labs',
    instructor: 'Priya Sharma',
    instructorRole: 'VP Cloud Engineering',
    topics: ['Docker', 'Kubernetes Basics', 'Pods & Deployments', 'Services & Networking', 'Storage & Config', 'Monitoring & Logging'],
    lessonsCount: 5,
    students: 950,
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>Containers at Scale</h2>
      <p>Docker changed how we package software. Kubernetes changed how we run it. This course bridges the gap between local development and production-scale orchestration.</p>
      <h3>Course Structure</h3>
      <p>Each module combines a video lecture with a hands-on lab. You'll deploy a real microservice application to a Kubernetes cluster by the final week, complete with monitoring and auto-scaling.</p>
      <h3>What You'll Need</h3>
      <p>A computer with Docker Desktop installed and at least 8GB of RAM. We provide a cloud Kubernetes cluster for the final deployment lab.</p>
    `,
    featured: true,
    lessons: [
      { id: '1', title: 'Docker Deep Dive', duration: '1 hour 30 min', content: '<h2>Beyond docker run</h2><p>Understand layers, caching, multi-stage builds, and optimisation techniques that reduce image size by 10x. We cover the Dockerfile instruction by instruction with real production examples.</p>' },
      { id: '2', title: 'Kubernetes Architecture', duration: '1 hour 45 min', content: '<h2>Control Planes & Nodes</h2><p>Understand the components that make Kubernetes tick: etcd, API server, scheduler, controller manager, and kubelet. We demystify the control plane and explain how to design for high availability.</p>' },
      { id: '3', title: 'Pods, Deployments & Services', duration: '2 hours', content: '<h2>Running Workloads</h2><p>Pods are the smallest deployable unit. Deployments provide declarative updates. Services enable networking. Learn how these three primitives work together to run and expose your applications.</p>' },
      { id: '4', title: 'ConfigMaps, Secrets & Storage', duration: '1 hour 30 min', content: '<h2>Configuration Management</h2><p>Managing configuration and secrets properly is one of the hardest parts of Kubernetes. We cover ConfigMaps, Secrets (with encryption), PersistentVolumes, and StorageClasses.</p>' },
      { id: '5', title: 'Monitoring, Logging & Scaling', duration: '2 hours', content: '<h2>Production Operations</h2><p>Horizontal Pod Autoscaling, Prometheus metrics, structured logging with Fluentd, and alerting. We cover how to know what your cluster is doing at all times.</p>' },
    ],
  },
  {
    slug: 'rust-fundamentals',
    title: 'Rust Systems Programming',
    tagline: 'Safe, fast, and fearless systems-level development.',
    description: 'An intensive deep-dive into Rust programming. Ownership, borrowing, lifetimes, concurrency, and unsafe Rust for systems programmers ready to level up.',
    level: 'Advanced',
    duration: '9 hours total',
    format: 'Self-paced + Code Reviews',
    instructor: 'Marcus Chen',
    instructorRole: 'Head of Robotics',
    topics: ['Ownership & Borrowing', 'Lifetimes', 'Traits & Generics', 'Concurrency', 'Unsafe Rust', 'FFI & Embedded'],
    lessonsCount: 5,
    students: 680,
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>Fearless Concurrency, Zero Cost Abstractions</h2>
      <p>Rust is transforming systems programming. This advanced course is designed for experienced developers who want to master Rust\'s unique approach to memory safety and concurrency.</p>
      <h3>What Makes Rust Different</h3>
      <p>Rust guarantees memory safety without a garbage collector. Its ownership model, borrow checker, and affine type system prevent entire categories of bugs at compile time. You'll come away understanding not just how to write Rust, but why its design choices make it the most important systems language in a generation.</p>
      <h3>Projects</h3>
      <p>Build a concurrent HTTP server, a custom memory allocator, and a Rust binding for a C library. Each project is reviewed by senior Rust engineers on the Seed team.</p>
    `,
    featured: false,
    lessons: [
      { id: '1', title: 'Ownership & Borrowing', duration: '2 hours', content: '<h2>The Core of Rust</h2><p>Ownership is Rust\'s most unique feature. Every value has exactly one owner. References allow borrowing without transferring ownership. The compiler enforces these rules at compile time — zero runtime overhead.</p><pre style="background:var(--bg-raised);padding:1rem;border-radius:8px;border:1px solid var(--border-subtle);overflow-x:auto;font-size:0.85rem;"><code>fn main() { let s = String::from("hello"); let r = &s; // Immutable borrow println!("{}", s); // Still valid! }</code></pre>' },
      { id: '2', title: 'Lifetimes', duration: '1 hour 45 min', content: '<h2>Ensuring References are Always Valid</h2><p>Lifetimes are Rust\'s way of ensuring that every reference is valid for as long as it is used. The borrow checker analyses how long data lives and rejects code that might create dangling pointers.</p>' },
      { id: '3', title: 'Traits & Generics', duration: '2 hours', content: '<h2>Zero-Cost Abstractions</h2><p>Traits are Rust\'s interface mechanism. Combined with generics and monomorphisation, they enable powerful, type-safe abstractions with no runtime cost. We cover associated types, trait bounds, and blanket implementations.</p>' },
      { id: '4', title: 'Concurrency', duration: '1 hour 45 min', content: '<h2>Fearless Concurrency</h2><p>Rust\'s type system prevents data races at compile time. Send and Sync traits determine what can be transferred across threads. Channels, mutexes, and atomics — all checked by the compiler.</p>' },
      { id: '5', title: 'Unsafe Rust & FFI', duration: '1 hour 30 min', content: '<h2>When You Need More Control</h2><p>Unsafe Rust lets you do things the compiler can\'t verify: dereference raw pointers, call extern functions, and implement Send/Sync manually. Used sparingly and wrapped in safe abstractions.</p>' },
    ],
  },
  {
    slug: 'ai-ml-fundamentals',
    title: 'AI & ML Fundamentals for Engineers',
    tagline: 'Practical machine learning for software engineers.',
    description: 'Build and deploy machine learning models. Covers supervised learning, neural networks, LLMs, and MLOps fundamentals with hands-on Python projects.',
    level: 'Beginner',
    duration: '6 hours 50 min total',
    format: 'Self-paced + Mentor Support',
    instructor: 'Dr. Amara Osei',
    instructorRole: 'Head of AI Research',
    topics: ['ML Fundamentals', 'Neural Networks', 'LLMs & Prompt Engineering', 'Model Deployment', 'MLOps Basics'],
    lessonsCount: 5,
    students: 3100,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>AI for Working Engineers</h2>
      <p>This isn\'t an academic course — it\'s a practical, hands-on introduction to machine learning for software engineers who want to ship products with AI capabilities.</p>
      <h3>Course Approach</h3>
      <p>We believe the best way to learn ML is to build and deploy real models. Every module includes a working code example you can run and modify. By the end of the course, you\'ll have deployed a live ML API serving predictions to the internet.</p>
      <h3>Prerequisites</h3>
      <p>Intermediate Python knowledge. No prior ML or statistics background required.</p>
    `,
    featured: true,
    lessons: [
      { id: '1', title: 'ML Fundamentals & Supervised Learning', duration: '1 hour 30 min', content: '<h2>How Machines Learn</h2><p>Supervised learning maps inputs to outputs using labelled training data. We cover linear and logistic regression, decision trees, and the bias-variance tradeoff — the fundamental tension in all machine learning.</p>' },
      { id: '2', title: 'Neural Networks & Deep Learning', duration: '1 hour 45 min', content: '<h2>Building Blocks of Modern AI</h2><p>From a single perceptron to multi-layer networks. We build a neural network from scratch in Python to understand backpropagation, activation functions, and why depth matters.</p>' },
      { id: '3', title: 'LLMs & Prompt Engineering', duration: '1 hour 15 min', content: '<h2>Working with Language Models</h2><p>Prompt engineering is the art of communicating with large language models effectively. We cover chain-of-thought prompting, few-shot learning, retrieval-augmented generation (RAG), and cost optimisation strategies.</p>' },
      { id: '4', title: 'Model Evaluation & Deployment', duration: '1 hour 20 min', content: '<h2>From Notebook to Production</h2><p>Deploying ML models requires more than just a trained model. We cover model serialisation, API serving with FastAPI, containerisation, and monitoring for data drift.</p>' },
      { id: '5', title: 'MLOps Fundamentals', duration: '1 hour', content: '<h2>Operationalising ML</h2><p>MLOps applies DevOps principles to machine learning. Feature stores, experiment tracking, model registries, and automated retraining pipelines that keep your models accurate in production.</p>' },
    ],
  },
  {
    slug: 'typescript-deep-dive',
    title: 'TypeScript Type System Deep Dive',
    tagline: 'Master TypeScript from generics to conditional types.',
    description: 'Go beyond basic types. Learn advanced generics, template literal types, conditional types, mapped types, and type-safe API patterns used in production codebases.',
    level: 'Advanced',
    duration: '7 hours 10 min total',
    format: 'Self-paced + Code Reviews',
    instructor: 'Thomas Ekwe',
    instructorRole: 'VP Engineering',
    topics: ['Advanced Generics', 'Conditional Types', 'Mapped Types', 'Template Literals', 'Type Safety Patterns', 'Declaration Files'],
    lessonsCount: 5,
    students: 450,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>Types That Work for You</h2>
      <p>TypeScript\'s type system is extraordinarily powerful. This course teaches you to leverage it fully — writing code that is not just type-safe, but type-driven.</p>
      <h3>Why This Course Exists</h3>
      <p>Most TypeScript courses stop at basic generics and utility types. This course dives into the deep end: conditional types, mapped types, template literal types, and type-level programming patterns. You\'ll learn to write types that compute at compile time — reducing runtime bugs and eliminating entire categories of tests.</p>
      <h3>Practical Focus</h3>
      <p>Every concept is demonstrated with real-world patterns: type-safe API clients, strongly-typed form builders, and compile-time validation of complex data structures.</p>
    `,
    featured: false,
    lessons: [
      { id: '1', title: 'Advanced Generics', duration: '1 hour 30 min', content: '<h2>Generic Constraints & Infer</h2><p>Learn how to constrain generics with <code>extends</code>, use conditional types to extract type information, and leverage TypeScript\'s powerful inference for type-safe builder patterns.</p>' },
      { id: '2', title: 'Conditional & Mapped Types', duration: '1 hour 45 min', content: '<h2>Types That Compute</h2><p>Conditional types are like ternary operators for types. Mapped types transform object types. Together they let you derive complex types from simple ones — like making all properties optional or readonly.</p>' },
      { id: '3', title: 'Template Literal Types', duration: '1 hour 15 min', content: '<h2>String Manipulation at the Type Level</h2><p>Template literal types let you model URL patterns, API endpoints, and event names as precise types. TypeScript can validate that your strings match expected patterns at compile time.</p>' },
      { id: '4', title: 'Type-Safe API Patterns', duration: '1 hour 30 min', content: '<h2>End-to-End Type Safety</h2><p>Build type-safe API clients where the compiler catches mismatches between your frontend and backend schemas. We cover tRPC, Zod validation, and generating types from OpenAPI specs.</p>' },
      { id: '5', title: 'Declaration Files & Module Augmentation', duration: '1 hour 10 min', content: '<h2>Extending Types</h2><p>Learn to write .d.ts files, augment third-party module types, and create type-safe wrappers around JavaScript libraries that lack their own type definitions.</p>' },
    ],
  },
  {
    slug: 'cloud-architecture',
    title: 'Cloud Architecture on AWS',
    tagline: 'Design resilient, cost-effective cloud infrastructure.',
    description: 'Learn AWS architecture from the ground up. Compute, storage, networking, security, and cost optimisation patterns taught by engineers who run production workloads at scale.',
    level: 'Intermediate',
    duration: '7 hours 30 min total',
    format: 'Self-paced + Weekly Q&A',
    instructor: 'Priya Sharma',
    instructorRole: 'VP Cloud Engineering',
    topics: ['AWS Core Services', 'VPC & Networking', 'Security & IAM', 'High Availability', 'Cost Optimisation', 'Infrastructure as Code'],
    lessonsCount: 5,
    students: 1600,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>Cloud Engineering, Not Just Clicking</h2>
      <p>This course teaches cloud architecture the right way — infrastructure as code, security-first design, and patterns that keep your bill predictable and your system reliable.</p>
      <h3>Hands-On Projects</h3>
      <p>You'll design and deploy a three-tier web application on AWS using Terraform, with VPC isolation, auto-scaling, RDS with Multi-AZ, and a full CI/CD pipeline. Every architecture decision is backed by the AWS Well-Architected Framework.</p>
      <h3>Who This Is For</h3>
      <p>Software engineers and DevOps practitioners who want to move beyond clicking around the AWS console and start building infrastructure as code.</p>
    `,
    featured: false,
    lessons: [
      { id: '1', title: 'AWS Core Services Overview', duration: '1 hour 15 min', content: '<h2>The Building Blocks</h2><p>EC2 for compute, S3 for storage, RDS for databases, and VPC for networking. We cover the core AWS services every architect needs to know, with a focus on when to use each one.</p>' },
      { id: '2', title: 'VPC Design & Networking', duration: '1 hour 45 min', content: '<h2>Network Isolation the Right Way</h2><p>Designing a VPC with public and private subnets, NAT gateways, VPN connections, and VPC peering. A well-architected network is the foundation of every secure AWS deployment.</p>' },
      { id: '3', title: 'IAM & Security Best Practices', duration: '1 hour 30 min', content: '<h2>Least Privilege, Maximum Security</h2><p>Identity and Access Management is the most important security control in AWS. Learn to design IAM policies, use roles instead of keys, and implement the principle of least privilege across your organisation.</p>' },
      { id: '4', title: 'High Availability & Disaster Recovery', duration: '1 hour 30 min', content: '<h2>Designing for Failure</h2><p>Multi-AZ deployments, auto-scaling groups, load balancers, and RDS replicas. Design systems that survive AZ outages and region failures without losing data or downtime.</p>' },
      { id: '5', title: 'Cost Optimisation & Infrastructure as Code', duration: '1 hour 30 min', content: '<h2>Cloud Efficiency</h2><p>Use Terraform and CloudFormation to define infrastructure as code. Learn cost optimisation strategies: reserved instances, spot instances, auto-scaling, and right-sizing your resources.</p>' },
    ],
  },
];

export const getFeatured = () => courses.filter(c => c.featured);
export const getBySlug = (slug) => courses.find(c => c.slug === slug);
export const getCategories = () => ['All', 'Beginner', 'Intermediate', 'Advanced'];
export const getByLevel = (level) => level === 'All' ? courses : courses.filter(c => c.level === level);
export const getLesson = (slug, lessonId) => {
  const course = courses.find(c => c.slug === slug);
  if (!course) return null;
  return course.lessons.find(l => l.id === lessonId) || null;
};
