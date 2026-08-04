// Expands course content with detailed lessons, mini-tasks, and richer descriptions

const SUPABASE_URL = 'https://swwcblmsymbwshsxqhag.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SUPABASE_SERVICE_ROLE_KEY';

async function updateCourse(slug, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/courses?slug=eq.${slug}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({
      lessons: JSON.stringify(data.lessons),
      lessons_count: data.lessons.length,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  console.log(`\u2713 Expanded ${slug} (${data.lessons.length} lessons)`);
}

const expandedCourses = {

  'react-masterclass': {
    lessons: [
      {
        id: '1', title: 'React Foundations & JSX Deep Dive', duration: '1 hour 15 min',
        content: `<h2>Understanding JSX at the Compiler Level</h2>
<p>JSX is syntactic sugar for React.createElement calls. Every JSX element compiles down to a createElement(type, props, ...children) invocation. Understanding this transformation is key to mastering React patterns like render props, higher-order components, and the new JSX transform.</p>
<p>The new JSX transform (React 17+) automatically imports jsx() from 'react/jsx-runtime', meaning you no longer need import React at the top of every file. This enables smaller bundle sizes and paves the way for improved compiler optimisations.</p>
<h3>Key Concepts</h3>
<ul>
<li>JSX is not HTML - className replaces class, htmlFor replaces for, camelCase event handlers</li>
<li>Fragments (<code>&lt;&gt;&lt;/&gt;</code>) avoid unnecessary DOM nesting</li>
<li>Expressions in JSX use single braces { }, not double</li>
<li>Children can be strings, elements, arrays, or functions (render props)</li>
</ul>
<h3>Mini-Task: JSX Compilation</h3>
<p>Write the equivalent createElement calls for this JSX: <code>&lt;div className="container"&gt;&lt;h1&gt;Hello&lt;/h1&gt;&lt;/div&gt;</code></p>`
      },
      {
        id: '2', title: 'Hooks: useState, useEffect & Custom Hooks', duration: '1 hour 30 min',
        content: `<h2>The Mental Model of Hooks</h2>
<p>Hooks let you use state and other React features without writing a class. The key insight is that hooks are called in the same order on every render - React uses the call order to associate hook state with components, which is why hooks cannot be called inside conditions or loops.</p>
<p>useState returns a pair: the current state value and a function that lets you update it. The update function accepts either a new value or a function that receives the previous state. useEffect runs side effects after rendering - think of it as componentDidMount, componentDidUpdate, and componentWillUnmount combined.</p>
<h3>Rules of Hooks</h3>
<ul>
<li>Only call hooks at the top level</li>
<li>Only call hooks from React function components or custom hooks</li>
<li>Custom hooks should start with 'use'</li>
</ul>
<h3>Mini-Task: Build useLocalStorage</h3>
<p>Create a custom hook that reads and writes to localStorage with JSON serialisation.</p>`
      },
      {
        id: '3', title: 'State Management Patterns', duration: '1 hour 20 min',
        content: `<h2>Lifting State, Context & Beyond</h2>
<p>State management is about answering one question: where does each piece of state live? The answer determines your component architecture, re-render performance, and code maintainability.</p>
<p>Start with local state (useState). Lift state up to the nearest common ancestor when siblings need to share. Use Context for state that many components across the tree need (theme, auth, locale). For complex global state, consider useReducer or external libraries like Zustand or Jotai.</p>
<h3>When to Use What</h3>
<ul>
<li><strong>Local:</strong> Form inputs, toggle states, UI state</li>
<li><strong>Lifted:</strong> Shared form data, sibling coordination</li>
<li><strong>Context:</strong> Theme, auth, locale, routing</li>
<li><strong>External:</strong> Complex multi-component workflows, undo/redo, real-time sync</li>
</ul>
<h3>Mini-Task: Refactor to Context</h3>
<p>Given a component tree with props drilling through 4 levels, refactor using React Context.</p>`
      },
      {
        id: '4', title: 'Next.js & Server Components', duration: '1 hour 45 min',
        content: `<h2>Full-Stack React with Next.js</h2>
<p>Next.js extends React with server-side rendering, static generation, and API routes. The App Router (Next.js 13+) introduces React Server Components, which run on the server and never send their JavaScript to the client. This dramatically reduces bundle size.</p>
<p>Server Components can directly access databases, file systems, and backend services without exposing sensitive logic to the client. Client Components are marked with 'use client' and can use hooks, event handlers, and browser APIs.</p>
<h3>Rendering Strategies</h3>
<ul>
<li><strong>Static (SSG):</strong> Generated at build time, served from CDN</li>
<li><strong>Dynamic (SSR):</strong> Rendered per request on the server</li>
<li><strong>ISR:</strong> Static with periodic revalidation</li>
<li><strong>Client:</strong> Rendered entirely in the browser</li>
</ul>
<h3>Mini-Task: Convert to Server Component</h3>
<p>Identify which parts of a given page can be Server Components and which must be Client Components.</p>`
      },
      {
        id: '5', title: 'Data Fetching & Authentication', duration: '1 hour 10 min',
        content: `<h2>Fetching Data in Next.js</h2>
<p>Next.js introduces four data fetching patterns: static, dynamic, incremental, and client-side. The App Router uses async Server Components for data fetching - simply make the component async and await your data.</p>
<p>For authentication, Next.js works well with NextAuth.js or Lucia. Implement middleware-based route protection, session management, and API route authentication using JWTs.</p>
<h3>Patterns</h3>
<ul>
<li>Server Components: async/await directly in the component</li>
<li>Route Handlers: API routes with edge runtime support</li>
<li>Client-side: useEffect + fetch or SWR/React Query</li>
<li>Middleware: Edge-based route protection</li>
</ul>
<h3>Mini-Task: Implement Auth Middleware</h3>
<p>Write a Next.js middleware that redirects unauthenticated users to /login.</p>`
      },
      {
        id: '6', title: 'Testing React Components', duration: '1 hour',
        content: `<h2>Testing with React Testing Library</h2>
<p>React Testing Library encourages testing components the way users interact with them. Query elements by role, label, text, or test ID - not by implementation details like state or class names.</p>
<p>Write unit tests for hooks and utility functions, integration tests for component interactions, and end-to-end tests for critical user flows. Aim for the testing trophy, not the pyramid - focus integration tests that give the highest confidence.</p>
<h3>Mini-Task: Write Component Tests</h3>
<p>Write tests for a TodoList component: renders initial items, adds new item, marks item complete, deletes item.</p>`
      },
      {
        id: '7', title: 'Performance Optimisation', duration: '1 hour 15 min',
        content: `<h2>Profiling and Optimising React Apps</h2>
<p>React DevTools Profiler lets you record and analyse component renders. Look for unnecessary re-renders caused by parent re-renders, unstable props, or context changes.</p>
<p>Optimisation techniques: React.memo for pure components, useMemo for expensive computations, useCallback for stable function references, virtualisation for long lists (react-window), code splitting with React.lazy and Suspense.</p>
<h3>Mini-Task: Profile and Fix</h3>
<p>Using the Profiler, identify a re-render cascade and fix it with memo + useCallback.</p>`
      },
      {
        id: '8', title: 'Deployment & CI/CD', duration: '45 min',
        content: `<h2>Shipping to Production</h2>
<p>Deploy Next.js apps to Vercel, Netlify, or your own infrastructure. Configure environment variables, custom domains, and CDN caching. Set up GitHub Actions for CI/CD: lint, type-check, test, build, and deploy on every push to main.</p>
<p>Monitor with Vercel Analytics, Sentry for errors, and custom logging. Implement feature flags for gradual rollouts and A/B testing.</p>
<h3>Mini-Task: Write a Deploy Workflow</h3>
<p>Create a GitHub Actions workflow that lints, tests, builds, and deploys a Next.js app to Vercel.</p>`
      }
    ]
  },

  'python-data-science': {
    lessons: [
      {
        id: '1', title: 'Python Fundamentals for Data', duration: '1 hour',
        content: `<h2>Python for Data Work</h2>
<p>Master list comprehensions, generator expressions, lambda functions, and the collections module. These Python features are the building blocks for efficient data pipelines. List comprehensions are faster and more readable than manual for loops.</p>
<pre><code># List comprehension example
squares = [x**2 for x in range(10) if x % 2 == 0]

# Generator expression (memory efficient)
sum_of_squares = sum(x**2 for x in range(1000000))

# Lambda with sorted
sorted(data, key=lambda x: x['age'])</code></pre>
<h3>Mini-Task: Comprehension Practice</h3>
<p>Write a list comprehension that extracts all even numbers from a list and squares them.</p>`
      },
      {
        id: '2', title: 'NumPy & Vectorisation', duration: '1 hour 10 min',
        content: `<h2>Fast Numerical Computing</h2>
<p>NumPy arrays are homogeneous, typed, and stored in contiguous memory blocks. Vectorised operations run in C, making them 10-100x faster than Python loops. Avoid for loops over arrays - use broadcasting and universal functions instead.</p>
<p>Key operations: reshaping, broadcasting, masking, aggregation, and linear algebra. Understanding array strides and memory layout helps diagnose performance issues.</p>
<h3>Mini-Task: Normalise a Matrix</h3>
<p>Given a 2D NumPy array, normalise each column to have mean 0 and standard deviation 1 using vectorised operations only.</p>`
      },
      {
        id: '3', title: 'Pandas for Data Wrangling', duration: '1 hour 20 min',
        content: `<h2>DataFrames: The Workhorse</h2>
<p>Pandas DataFrames are the Excel spreadsheets of the programming world - but far more powerful. Master indexing (loc, iloc, at, iat), groupby operations, merge/join/concatenate, and the method chaining pattern with .pipe().</p>
<p>Handle missing data with fillna, dropna, and interpolation. Use apply for element-wise operations, but prefer vectorised methods when possible. The difference between .loc and [] indexing is crucial for avoiding the dreaded SettingWithCopyWarning.</p>
<h3>Mini-Task: Clean Sales Data</h3>
<p>Given a CSV of sales data with missing values, duplicate rows, and inconsistent date formats, produce a clean DataFrame ready for analysis.</p>`
      },
      {
        id: '4', title: 'Visualisation with Matplotlib & Seaborn', duration: '1 hour',
        content: `<h2>Tell a Story with Data</h2>
<p>A great chart communicates insights instantly. Matplotlib gives you pixel-level control but requires more code. Seaborn provides high-level statistical visualisations with sensible defaults.</p>
<p>Use the right chart for your data: line plots for trends, bar plots for comparisons, scatter plots for relationships, histograms for distributions, and heatmaps for correlations. Label your axes, use colour meaningfully, and avoid chart junk.</p>
<h3>Mini-Task: Create a Dashboard</h3>
<p>Using a dataset of your choice, create a multi-panel figure with a line plot, histogram, and heatmap that tells a coherent story.</p>`
      },
      {
        id: '5', title: 'Statistical Analysis & Hypothesis Testing', duration: '1 hour 10 min',
        content: `<h2>Making Data-Driven Decisions</h2>
<p>Descriptive statistics summarise data (mean, median, std, quartiles). Inferential statistics let you draw conclusions about populations from samples. Understand p-values, confidence intervals, and effect sizes.</p>
<p>Common tests: t-test (compare two groups), ANOVA (compare multiple groups), chi-squared (categorical variables), correlation (relationship strength). Always check assumptions before running a test.</p>
<h3>Mini-Task: A/B Test Analysis</h3>
<p>Given conversion rates for a control and variant group, perform a t-test and determine if the difference is statistically significant.</p>`
      },
      {
        id: '6', title: 'Intro to Machine Learning with scikit-learn', duration: '1 hour 10 min',
        content: `<h2>Your First Models</h2>
<p>Train your first classification and regression models. The scikit-learn API is consistent across all estimators: .fit(X, y), .predict(X), .score(X, y). Preprocessing, feature selection, and model evaluation are just as important as choosing the right algorithm.</p>
<p>Split data into training and test sets. Use cross-validation for reliable performance estimates. Scale features for distance-based algorithms. Handle class imbalance with stratification or weighted loss functions.</p>
<h3>Mini-Task: Predict House Prices</h3>
<p>Using the Boston Housing dataset (or similar), train a regression model, evaluate its performance, and interpret the feature coefficients.</p>`
      },
      {
        id: '7', title: 'Feature Engineering & Selection', duration: '1 hour',
        content: `<h2>Creating Better Predictors</h2>
<p>Feature engineering is where domain knowledge meets data science. Create interaction terms, polynomial features, date-based features, and text features (TF-IDF, embeddings). Feature selection reduces overfitting and training time.</p>
<p>Techniques: correlation analysis, mutual information, recursive feature elimination, L1 regularisation (Lasso), and tree-based importance.</p>
<h3>Mini-Task: Engineer Features</h3>
<p>Given a dataset with a datetime column, a text column, and numeric columns, create 5 new features and evaluate their impact on model performance.</p>`
      },
      {
        id: '8', title: 'Capstone: End-to-End Data Project', duration: '1 hour 30 min',
        content: `<h2>Bringing It All Together</h2>
<p>Complete an end-to-end data science project: load data, clean and explore it, engineer features, train and evaluate multiple models, tune hyperparameters, and present your findings. The best data scientists communicate insights clearly to stakeholders.</p>
<p>Structure your project: problem definition → data acquisition → exploration → modelling → evaluation → deployment → monitoring. Use Jupyter notebooks for exploration and Python scripts for production code.</p>
<h3>Mini-Task: Complete the Pipeline</h3>
<p>Pick a dataset from Kaggle. Build a complete ML pipeline including data cleaning, EDA, feature engineering, model training, evaluation, and a short report.</p>`
      }
    ]
  },

  'node-js-backend': {
    lessons: [
      {
        id: '1', title: 'Express.js & Middleware Architecture', duration: '1 hour 30 min',
        content: `<h2>Understanding the Middleware Stack</h2>
<p>Express is fundamentally a middleware runner. Every incoming request passes through a stack of functions, each of which can modify the request/response objects, end the response, or pass to the next middleware. This pattern makes Express extremely composable.</p>
<p>Order matters: middleware runs in the order it's registered. Parse body before route handlers, authenticate before authorising, and handle errors last with a four-argument handler (err, req, res, next).</p>
<h3>Mini-Task: Build Custom Middleware</h3>
<p>Write a request logging middleware that logs method, URL, and response time for every request.</p>`
      },
      {
        id: '2', title: 'RESTful API Design Principles', duration: '1 hour 15 min',
        content: `<h2>Designing APIs That Last</h2>
<p>A well-designed API outlives any single implementation. Use nouns for resources (GET /users, POST /users), HTTP verbs for actions (GET, POST, PUT, PATCH, DELETE), and status codes semantically (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Internal Server Error).</p>
<p>Version your API from day one (/v1/users). Use consistent error formats. Paginate list endpoints. Support filtering, sorting, and field selection via query parameters.</p>
<h3>Mini-Task: Design a REST API</h3>
<p>Design the REST API endpoints for a blogging platform (users, posts, comments, tags) following RESTful conventions.</p>`
      },
      {
        id: '3', title: 'Database Design & PostgreSQL', duration: '1 hour 45 min',
        content: `<h2>Data Integrity at Scale</h2>
<p>PostgreSQL is the gold standard for relational databases. Normalise your schema to reduce redundancy, but don't over-normalise - sometimes a denormalised column is the right call for performance. Use indexes strategically: B-tree for general purpose, GiST for full-text search, BRIN for large timestamp-ordered tables.</p>
<p>Leverage PostgreSQL superpowers: JSONB for flexible schemas, array columns for tags, range types for scheduling, and CTEs for recursive queries.</p>
<h3>Mini-Task: Schema Design</h3>
<p>Design a database schema for an e-commerce platform covering products, users, orders, reviews, and inventory.</p>`
      },
      {
        id: '4', title: 'Authentication & Authorisation', duration: '1 hour 30 min',
        content: `<h2>Securing Your API</h2>
<p>Implement JWT-based authentication with access and refresh tokens. Access tokens are short-lived (15 min) and stored in memory. Refresh tokens are long-lived (7 days) and stored in httpOnly cookies to prevent XSS theft.</p>
<p>Implement role-based access control (RBAC) with a middleware that checks user roles against required permissions. Hash passwords with bcrypt (cost factor 12). Rate-limit login endpoints to prevent brute force attacks.</p>
<h3>Mini-Task: JWT Implementation</h3>
<p>Implement complete JWT auth flow: registration (hash password), login (return tokens), token refresh, and logout (invalidate refresh token).</p>`
      },
      {
        id: '5', title: 'Testing & Deployment', duration: '1 hour 15 min',
        content: `<h2>Shipping Reliable Backends</h2>
<p>Integration tests with supertest + vitest hit your actual routes with a test database. Use database fixtures to set up test data and clean up after each test. Test both success and failure paths.</p>
<p>Deploy with Docker and CI/CD. Use environment variables for configuration. Set up health checks, logging (structured JSON logs), and error tracking (Sentry).</p>
<h3>Mini-Task: Integration Tests</h3>
<p>Write integration tests for a user CRUD API covering create, read, update, delete with proper assertions.</p>`
      },
      {
        id: '6', title: 'WebSockets & Real-Time Features', duration: '1 hour',
        content: `<h2>Real-Time Communication</h2>
<p>WebSockets enable bidirectional, full-duplex communication over a single TCP connection. Use the ws library with Express for simple real-time features, or Socket.IO for rooms, namespaces, and automatic reconnection.</p>
<p>Common use cases: chat applications, live notifications, collaborative editing, real-time dashboards, and gaming.</p>
<h3>Mini-Task: Build a Chat Server</h3>
<p>Implement a WebSocket-based chat server with rooms, broadcast messages, and user join/leave notifications.</p>`
      },
      {
        id: '7', title: 'Caching & Performance', duration: '1 hour',
        content: `<h2>Making Your API Fast</h2>
<p>Implement Redis caching for frequently accessed data. Cache query results, session data, and computed values. Use cache invalidation patterns: cache-aside, write-through, and write-behind.</p>
<p>Database query optimisation: use EXPLAIN ANALYZE to find slow queries, add missing indexes, use connection pooling (pgBouncer), and implement pagination with keyset pagination for large datasets.</p>
<h3>Mini-Task: Implement Caching</h3>
<p>Add Redis caching to a slow API endpoint. Measure the performance improvement with and without caching.</p>`
      },
      {
        id: '8', title: 'Microservices & Message Queues', duration: '1 hour 45 min',
        content: `<h2>Distributed Systems Patterns</h2>
<p>Break monolithic applications into independently deployable services. Each service owns its data and communicates via APIs or message queues. Use RabbitMQ or Bull (Redis-based) for async job processing.</p>
<p>Implement service discovery, health checks, circuit breakers, and distributed tracing (OpenTelemetry). Handle eventual consistency with saga patterns (choreography or orchestration).</p>
<h3>Mini-Task: Order Processing Queue</h3>
<p>Design a microservice architecture for order processing with a message queue, separate inventory, payment, and notification services.</p>`
      }
    ]
  },

  'docker-kubernetes': {
    lessons: [
      {
        id: '1', title: 'Docker Deep Dive', duration: '1 hour 30 min',
        content: `<h2>Beyond docker run</h2>
<p>Understand layers, caching, and multi-stage builds. Docker images are composed of read-only layers. Each instruction in a Dockerfile creates a new layer. Layer caching means rebuilding is fast if you order your instructions correctly - put things that change rarely (package installations) before things that change often (source code).</p>
<h3>Mini-Task: Optimise a Dockerfile</h3>
<p>Given a Dockerfile that rebuilds the entire image on every code change, reorder the instructions to maximise layer caching.</p>`
      },
      {
        id: '2', title: 'Kubernetes Architecture', duration: '1 hour 45 min',
        content: `<h2>Control Planes & Nodes</h2>
<p>Kubernetes has a control plane (API server, scheduler, controller manager, etcd) and worker nodes (kubelet, kube-proxy, container runtime). The API server is the only component that talks to etcd. Everything else goes through the API server.</p>
<p>Understanding the control plane's internal communication helps debug cluster issues. The scheduler watches for unscheduled pods and assigns them to nodes based on resource requirements and constraints.</p>
<h3>Mini-Task: Explain the Control Flow</h3>
<p>Trace the path of a kubectl apply command: what components does it touch, in what order, and what does each one do?</p>`
      },
      {
        id: '3', title: 'Pods, Deployments & Services', duration: '2 hours',
        content: `<h2>Running Workloads</h2>
<p>Pods are the smallest deployable unit - one or more containers sharing the same network namespace. Deployments manage replica sets and provide rolling updates and rollbacks. Services provide stable network endpoints for pods, which are ephemeral.</p>
<p>Use Deployments for stateless applications, StatefulSets for stateful apps (databases), and DaemonSets for node-level agents (logging, monitoring).</p>
<h3>Mini-Task: Deploy a Web App</h3>
<p>Write Deployment and Service YAML manifests for a web application with 3 replicas, rolling update strategy, and a LoadBalancer Service.</p>`
      },
      {
        id: '4', title: 'ConfigMaps, Secrets & Storage', duration: '1 hour 30 min',
        content: `<h2>Configuration Management</h2>
<p>ConfigMaps store non-sensitive configuration as key-value pairs or files. Secrets store sensitive data (base64 encoded, but not encrypted at rest unless you enable encryption). Use Volumes for persistent data and PersistentVolumeClaims for dynamic provisioning.</p>
<p>Best practices: never check secrets into git, use sealed secrets or external secret stores (Vault, AWS Secrets Manager), and prefer environment variables or mounted files over baked-in config.</p>
<h3>Mini-Task: Secure Config Pattern</h3>
<p>Design a configuration strategy for a microservice app: which config goes in ConfigMap, which in Secrets, and how do you manage rotation?</p>`
      },
      {
        id: '5', title: 'Monitoring, Logging & Scaling', duration: '2 hours',
        content: `<h2>Production Operations</h2>
<p>HPA (Horizontal Pod Autoscaler) automatically scales replicas based on CPU/memory metrics or custom metrics. Prometheus collects metrics with pull-based scraping. Grafana visualises dashboards. Structured logging (JSON) to stdout/stderr is collected by Fluentd or Loki.</p>
<p>Set up alerting with Alertmanager: CPU > 80%, 5xx error rate > 1%, pod crash loops. Implement pod resource requests and limits to prevent noisy neighbours.</p>
<h3>Mini-Task: Set Up Monitoring Stack</h3>
<p>Write a Helm values file for the Prometheus stack (kube-prometheus-stack) that collects node, pod, and custom application metrics.</p>`
      },
      {
        id: '6', title: 'Service Mesh & Ingress', duration: '1 hour 30 min',
        content: `<h2>Traffic Management</h2>
<p>Ingress controllers (nginx-ingress, Traefik) route external traffic to Services. Service meshes (Istio, Linkerd) provide mTLS, traffic splitting, circuit breaking, and observability at the network layer without application changes.</p>
<p>Use an API gateway (Kong, Ambassador) for cross-cutting concerns: rate limiting, authentication, request transformation, and API versioning at the edge.</p>
<h3>Mini-Task: Configure an Ingress</h3>
<p>Write an Ingress resource that routes api.example.com to an API service and app.example.com to a frontend service, with TLS termination.</p>`
      },
      {
        id: '7', title: 'GitOps with ArgoCD', duration: '1 hour 15 min',
        content: `<h2>Declarative Deployments</h2>
<p>GitOps means your Git repository is the single source of truth for your infrastructure. ArgoCD continuously syncs your cluster state with your Git repo. Changes are made via pull requests, not kubectl commands.</p>
<p>Benefits: audit trail, easy rollbacks, disaster recovery, and developer self-service. Combine with Kustomize or Helm for environment-specific overlays.</p>
<h3>Mini-Task: Set Up ArgoCD Application</h3>
<p>Write an ArgoCD Application manifest that syncs a Helm chart from a Git repo to a namespace.</p>`
      },
      {
        id: '8', title: 'Cluster Security', duration: '1 hour 30 min',
        content: `<h2>Securing the Cluster</h2>
<p>RBAC controls who can do what in the cluster. Pod Security Standards (formerly PSP) define what pods can do. Network policies isolate workloads at the network layer. OPA/Gatekeeper enforces custom policies (e.g., no latest tag, resource limits required).</p>
<p>Regularly scan images for vulnerabilities (Trivy, Snyk). Use admission controllers to validate and mutate resources before they're created.</p>
<h3>Mini-Task: Write RBAC Rules</h3>
<p>Create RBAC manifests that give a CI/CD service account the minimum permissions needed to deploy to a specific namespace.</p>`
      }
    ]
  },

  'rust-fundamentals': {
    lessons: [
      {
        id: '1', title: 'Ownership & Borrowing', duration: '2 hours',
        content: `<h2>The Core of Rust</h2>
<p>Ownership is Rust's most unique feature. Three rules: each value has a single owner, ownership can be transferred (moved), and references allow borrowing without taking ownership. The compiler enforces these rules at compile time with zero runtime overhead.</p>
<p>Move semantics prevent double-free bugs. Borrowing prevents data races at compile time - you can have either one mutable reference or any number of immutable references, but not both simultaneously.</p>
<h3>Mini-Task: Fix Ownership Errors</h3>
<p>Given code with ownership compilation errors, fix each one without using clone() (use references instead).</p>`
      },
      {
        id: '2', title: 'Lifetimes', duration: '1 hour 45 min',
        content: `<h2>Ensuring References are Always Valid</h2>
<p>Lifetimes are Rust's way of ensuring that references never outlive the data they point to. Every reference has a lifetime - the scope for which the reference is valid. The compiler uses the elision rules to infer lifetimes in function signatures.</p>
<p>Common lifetime patterns: 'static for global data, lifetime parameters on functions and structs that hold references, and the covariance rules for complex types.</p>
<h3>Mini-Task: Annotate Lifetimes</h3>
<p>Given a struct that holds references and functions that return references, add the correct lifetime annotations.</p>`
      },
      {
        id: '3', title: 'Traits & Generics', duration: '2 hours',
        content: `<h2>Zero-Cost Abstractions</h2>
<p>Traits are Rust's interface mechanism. They define shared behaviour that types can implement. Generics allow writing code that works with any type satisfying a trait bound. Monomorphisation means generics have zero runtime cost - the compiler generates specialised code for each concrete type.</p>
<p>Use trait objects (dyn Trait) for dynamic dispatch when you need heterogeneous collections. Use impl Trait for simple cases. Use where clauses for complex bounds.</p>
<h3>Mini-Task: Implement a Trait</h3>
<p>Define a Printable trait and implement it for a custom struct. Use both static dispatch (generics) and dynamic dispatch (trait objects).</p>`
      },
      {
        id: '4', title: 'Error Handling', duration: '1 hour 15 min',
        content: `<h2>Result, Option, and Error Propagation</h2>
<p>Rust has no exceptions. Use Result<T, E> for recoverable errors and panic! for unrecoverable ones. The ? operator propagates errors - it unwraps Ok values or returns early with Err. Combine with combinators like .map(), .and_then(), and .or_else().</p>
<p>Create custom error types implementing std::error::Error. Use thiserror for library errors and anyhow for application errors. Implement From traits for automatic error conversion.</p>
<h3>Mini-Task: Error Handling Pipeline</h3>
<p>Write a function that reads a file, parses JSON, and processes the data, using proper error types and the ? operator throughout.</p>`
      },
      {
        id: '5', title: 'Concurrency', duration: '1 hour 45 min',
        content: `<h2>Fearless Concurrency</h2>
<p>Rust's type system prevents data races at compile time. Send (ownership transfer between threads) and Sync (shared access between threads) are auto traits that the compiler checks. Use threads, channels (std::sync::mpsc), and shared state (Arc<Mutex<T>>) for concurrency.</p>
<p>Async Rust with tokio provides cooperative multitasking for I/O-bound workloads. The async/await syntax is zero-cost and composable.</p>
<h3>Mini-Task: Parallel File Processing</h3>
<p>Write a program that processes 100 files in parallel using threads and channels to collect results.</p>`
      },
      {
        id: '6', title: 'Unsafe Rust & FFI', duration: '1 hour 30 min',
        content: `<h2>When You Need More Control</h2>
<p>Unsafe Rust lets you do things the compiler can't verify: dereference raw pointers, call unsafe functions, implement unsafe traits, and access/modify mutable statics. The responsibility for safety shifts from the compiler to you.</p>
<p>Use unsafe sparingly and wrap it in safe abstractions. FFI with C libraries uses extern blocks and the libc crate. Pin data for self-referential structs.</p>
<h3>Mini-Task: Safe FFI Wrapper</h3>
<p>Write a safe Rust wrapper around a C function that takes a string and returns its length, handling null pointers and UTF-8 issues.</p>`
      },
      {
        id: '7', title: 'Testing & Documentation', duration: '1 hour 15 min',
        content: `<h2>Writing Correct Rust</h2>
<p>Rust has first-class support for testing. Unit tests go in the same file with #[cfg(test)]. Integration tests go in tests/. Doc tests ensure your documentation examples compile and produce correct output. Property-based testing with proptest finds edge cases you'd never think of.</p>
<p>Document all public APIs with /// doc comments. Use cargo doc to generate HTML docs. Mark examples that should be tested with \`\`\`rust.</p>
<h3>Mini-Task: Property-Based Test</h3>
<p>Write a proptest that verifies a sort function: the output should be sorted, same length as input, and contain all the same elements.</p>`
      },
      {
        id: '8', title: 'Real-World Rust Project', duration: '2 hours',
        content: `<h2>Building a CLI Tool</h2>
<p>Build a command-line tool that searches files for regex patterns, similar to grep. Use clap for argument parsing, rayon for parallel file scanning, regex for pattern matching, and crossbeam-channel for task distribution.</p>
<p>This project ties together everything you've learned: ownership, traits, error handling, concurrency, testing, and documentation.</p>
<h3>Mini-Task: Design the Architecture</h3>
<p>Sketch the module structure, data flow, and concurrency model for a grep-like CLI tool before writing any code.</p>`
      }
    ]
  },

  'ai-ml-fundamentals': {
    lessons: [
      {
        id: '1', title: 'ML Fundamentals & Supervised Learning', duration: '1 hour 30 min',
        content: `<h2>How Machines Learn</h2>
<p>Supervised learning maps inputs to outputs using labelled training data. The model learns patterns from examples and generalises to unseen data. Key concepts: features, labels, training vs inference, overfitting vs underfitting, bias-variance tradeoff.</p>
<p>Common algorithms: linear/logistic regression, decision trees, random forests, SVM, k-NN. Start with simple models and increase complexity only if needed.</p>
<h3>Mini-Task: Compare Classifiers</h3>
<p>Train logistic regression, decision tree, and random forest on the same dataset. Compare their accuracy, training time, and interpretability.</p>`
      },
      {
        id: '2', title: 'Neural Networks & Deep Learning', duration: '1 hour 45 min',
        content: `<h2>Building Blocks of Modern AI</h2>
<p>From a single perceptron to multi-layer networks. Understand activation functions (ReLU, sigmoid, tanh), loss functions (MSE, cross-entropy), and optimisation (SGD, Adam). Backpropagation computes gradients using the chain rule.</p>
<p>Build networks with PyTorch or TensorFlow/Keras. Start with a simple feed-forward network, then progress to CNNs for images and RNNs/Transformers for sequences.</p>
<h3>Mini-Task: Build a Neural Net from Scratch</h3>
<p>Implement a 2-layer neural network using only NumPy (no framework), train it on synthetic data, and verify it learns the decision boundary.</p>`
      },
      {
        id: '3', title: 'LLMs & Prompt Engineering', duration: '1 hour 15 min',
        content: `<h2>Working with Language Models</h2>
<p>Prompt engineering is the art of communicating with LLMs effectively. Use clear instructions, provide examples (few-shot), structure output formats, and chain prompts for complex tasks. Understand token limits, temperature, top-p, and system vs user messages.</p>
<p>Key techniques: chain-of-thought prompting, retrieval-augmented generation (RAG), function calling, and fine-tuning for domain specialisation.</p>
<h3>Mini-Task: Design a Prompt Chain</h3>
<p>Design a multi-step prompt chain that: classifies a customer email → extracts key info → drafts a response → checks for appropriate tone.</p>`
      },
      {
        id: '4', title: 'Model Evaluation & Deployment', duration: '1 hour 20 min',
        content: `<h2>From Notebook to Production</h2>
<p>Deploying ML models requires more than just a trained model. Serve models via REST APIs (FastAPI, Flask), batch inference pipelines, or real-time streaming. Use model versioning, A/B testing, and monitoring for drift.</p>
<p>Evaluation metrics depend on the task: accuracy, precision, recall, F1 for classification; MAE, RMSE, R² for regression. Always evaluate on a held-out test set and monitor for concept drift in production.</p>
<h3>Mini-Task: Deploy a Model API</h3>
<p>Create a FastAPI app that serves a trained ML model with input validation, error handling, and health check endpoint.</p>`
      },
      {
        id: '5', title: 'MLOps Fundamentals', duration: '1 hour',
        content: `<h2>Operationalising ML</h2>
<p>MLOps applies DevOps principles to machine learning: version control for data and models, automated training pipelines, model registry, monitoring, and governance. Use tools like MLflow, DVC, Kubeflow, and Weights & Biases.</p>
<p>Key practices: reproducible experiments, data versioning, model lineage, automated retraining, and bias/fairness checks. ML is not just about building models - it's about maintaining them.</p>
<h3>Mini-Task: Design an MLOps Pipeline</h3>
<p>Diagram a complete MLOps pipeline from data ingestion through training, evaluation, deployment, monitoring, and retraining.</p>`
      },
      {
        id: '6', title: 'Computer Vision Basics', duration: '1 hour 15 min',
        content: `<h2>Teaching Machines to See</h2>
<p>CNNs (convolutional neural networks) are the foundation of modern computer vision. Convolution layers detect spatial features, pooling layers reduce dimensionality, and fully connected layers make predictions. Use transfer learning with pre-trained models (ResNet, EfficientNet) for better results with less data.</p>
<p>Applications: image classification, object detection (YOLO, Faster R-CNN), segmentation (U-Net), and image generation (GANs, diffusion models).</p>
<h3>Mini-Task: Image Classifier with Transfer Learning</h3>
<p>Use a pre-trained ResNet-18 to classify custom images. Fine-tune the last layer for your specific classes.</p>`
      },
      {
        id: '7', title: 'NLP & Text Processing', duration: '1 hour',
        content: `<h2>Understanding Language</h2>
<p>Natural language processing enables machines to read, understand, and generate human language. Key tasks: text classification, named entity recognition, sentiment analysis, summarisation, translation, and question answering.</p>
<p>Traditional approaches: TF-IDF, bag-of-words, word embeddings (word2vec, GloVe). Modern approaches: transformer models (BERT, GPT, T5) fine-tuned for specific tasks.</p>
<h3>Mini-Task: Sentiment Analysis Pipeline</h3>
<p>Build a pipeline that reads product reviews, preprocesses text (tokenisation, stopword removal), and classifies sentiment as positive/negative/neutral.</p>`
      },
      {
        id: '8', title: 'Capstone: End-to-End ML System', duration: '1 hour 30 min',
        content: `<h2>Full Stack ML</h2>
<p>Build a complete ML system from data collection to production deployment. Choose a problem, gather data, explore it, train and evaluate models, deploy as an API, and monitor performance. Document your decisions and tradeoffs.</p>
<p>This capstone ties together all the course material. Focus on making a system that is not just accurate, but also reliable, maintainable, and explainable.</p>
<h3>Mini-Task: Submit Your Project</h3>
<p>Complete your capstone project with a GitHub repository containing code, data (or data loading scripts), trained model, API service, Dockerfile, and README.</p>`
      }
    ]
  },

  'typescript-deep-dive': {
    lessons: [
      {
        id: '1', title: 'Advanced Generics', duration: '1 hour 30 min',
        content: `<h2>Generic Constraints & Infer</h2>
<p>Learn to constrain generics with extends. Use conditional types with infer to extract types from other types. The TypeScript type system is Turing-complete - you can compute types at compile time.</p>
<p>Key patterns: generic constraints (T extends HasId), conditional types (T extends string ? string : number), infer in conditional types, variadic tuple types, and template literal types.</p>
<h3>Mini-Task: Typed Event Emitter</h3>
<p>Create a type-safe EventEmitter where event names map to their payload types using a generic type parameter.</p>`
      },
      {
        id: '2', title: 'Conditional & Mapped Types', duration: '1 hour 45 min',
        content: `<h2>Types That Compute</h2>
<p>Conditional types are like ternary operators for types. Mapped types transform object types (Partial, Required, Pick, Record are built on mapped types). Combine them for powerful type transformations.</p>
<p>Build utility types: DeepPartial, NonNullable, ReturnType (built-in, but implement it yourself), and custom transformers for API response shapes.</p>
<h3>Mini-Task: Builder Pattern Types</h3>
<p>Create types for a builder pattern where each method call changes the return type to exclude already-called methods.</p>`
      },
      {
        id: '3', title: 'Template Literal Types', duration: '1 hour 15 min',
        content: `<h2>String Manipulation at the Type Level</h2>
<p>Template literal types let you model URL patterns as precise types. Combine with conditional types for path parameter extraction, route validation, and type-safe query builders.</p>
<p>Use intrinsic string manipulation types: Uppercase, Lowercase, Capitalize, Uncapitalize. Build route parameter extractors like 'users/:id' → { id: string }.</p>
<h3>Mini-Task: Type-Safe Router</h3>
<p>Implement a route type that extracts path parameters from a URL pattern and validates that a given URL matches the pattern.</p>`
      },
      {
        id: '4', title: 'Type-Safe API Patterns', duration: '1 hour 30 min',
        content: `<h2>End-to-End Type Safety</h2>
<p>Build type-safe API clients that catch mismatches at compile time. Share types between frontend and backend using a monorepo or package. Use tools like tRPC, GraphQL Code Generator, or Zod for runtime validation.</p>
<p>Patterns: branded types for IDs, discriminated unions for API responses, opaque types for avoiding primitive obsession, and nominal typing simulations.</p>
<h3>Mini-Task: tRPC-like Client</h3>
<p>Create a type-safe API client where calling client.users.getById('123') is fully typed based on a shared router definition.</p>`
      },
      {
        id: '5', title: 'Declaration Files & Module Augmentation', duration: '1 hour 10 min',
        content: `<h2>Extending Types</h2>
<p>Learn to write .d.ts files and augment third-party module types. When a library doesn't have types or has incorrect types, override them with module augmentation. Use global augmentation for polyfills and custom extensions.</p>
<p>Patterns: ambient declarations for global variables, module augmentation (declare module 'express'), and merging interfaces for Express Request extensions (add user property).</p>
<h3>Mini-Task: Augment Express Request</h3>
<p>Add a currentUser property to Express's Request type using declaration merging, typed with a User interface.</p>`
      },
      {
        id: '6', title: 'Advanced Patterns: Branding & Opaque Types', duration: '1 hour',
        content: `<h2>Beyond Primitive Types</h2>
<p>Branded types use intersection types with a phantom property to make primitive types incompatible. Opaque types prevent mixing up IDs of different entities even though they're all strings.</p>
<p>Use nominal typing patterns: brands (type UserId = string & { _brand: 'UserId' }), flavouring, and phantom type parameters.</p>
<h3>Mini-Task: Branded IDs</h3>
<p>Create branded types for UserId, OrderId, and ProductId. Write functions that accept only the correct ID type.</p>`
      },
      {
        id: '7', title: 'Type Performance & Debugging', duration: '1 hour',
        content: `<h2>Keeping Types Fast</h2>
<p>Complex types slow down the compiler. Avoid deeply recursive types, excessive conditional types, and large union types. Use the --diagnostics flag to see compile-time costs.</p>
<p>Debugging techniques: hover tooltips, type predicates, Extract/Exclude for inspection, and creating intermediate type aliases to isolate errors. Use satisfies for constraint checking without widening.</p>
<h3>Mini-Task: Optimise Slow Types</h3>
<p>Given a type that takes 5+ seconds to compile, identify the bottleneck and refactor it to compile instantly.</p>`
      },
      {
        id: '8', title: 'Real-World TypeScript Project', duration: '1 hour 30 min',
        content: `<h2>End-to-End Type Safety in Practice</h2>
<p>Apply everything you've learned to a real project: a fully typed REST API client with automatic error handling, a type-safe state machine, or a generic repository pattern with TypeORM-like types.</p>
<p>The goal is to have TypeScript catch as many bugs as possible at compile time, making runtime errors rare and obvious when they do occur.</p>
<h3>Mini-Task: Build a Type-Safe State Machine</h3>
<p>Create a state machine type that ensures only valid transitions between states are allowed at compile time.</p>`
      }
    ]
  },

  'cloud-architecture': {
    lessons: [
      {
        id: '1', title: 'AWS Core Services Overview', duration: '1 hour 15 min',
        content: `<h2>The Building Blocks</h2>
<p>EC2, S3, RDS, and VPC are the core AWS services. EC2 provides virtual servers, S3 is object storage, RDS manages relational databases, and VPC gives you network isolation. Understanding these four services is the foundation of all AWS architecture.</p>
<p>Choose the right compute service: EC2 for full control, Lambda for event-driven, ECS/EKS for containers, and Elastic Beanstalk for platform-as-a-service.</p>
<h3>Mini-Task: Service Selection</h3>
<p>Given five different application requirements, choose the optimal AWS compute and storage services for each.</p>`
      },
      {
        id: '2', title: 'VPC Design & Networking', duration: '1 hour 45 min',
        content: `<h2>Network Isolation the Right Way</h2>
<p>Design a VPC with public and private subnets across multiple availability zones. Use NAT Gateways for private subnet internet access. Configure route tables, network ACLs, and security groups for defence in depth.</p>
<p>Connect on-premises networks with VPN or Direct Connect. Use VPC Peering or Transit Gateway for multi-VPC connectivity. Use VPC Endpoints for private AWS service access.</p>
<h3>Mini-Task: Design a Multi-Tier VPC</h3>
<p>Design a VPC with web, application, and database tiers across 3 AZs, with appropriate subnet types and routing.</p>`
      },
      {
        id: '3', title: 'IAM & Security Best Practices', duration: '1 hour 30 min',
        content: `<h2>Least Privilege, Maximum Security</h2>
<p>IAM is the most important security control in AWS. Follow the principle of least privilege: grant only the permissions needed, use groups for role-based access, and rotate access keys regularly. Use roles instead of long-term credentials for EC2, Lambda, and other services.</p>
<p>Implement network security with security groups (stateful firewalls) and network ACLs (stateless). Encrypt data at rest with KMS and in transit with TLS.</p>
<h3>Mini-Task: Least Privilege Policy</h3>
<p>Write an IAM policy for a CI/CD service that only allows deploying to specific S3 buckets and ECS services.</p>`
      },
      {
        id: '4', title: 'High Availability & Disaster Recovery', duration: '1 hour 30 min',
        content: `<h2>Designing for Failure</h2>
<p>Multi-AZ deployments distribute workloads across availability zones. Auto-scaling groups replace failed instances. Load balancers distribute traffic and detect unhealthy targets. RDS Multi-AZ provides database failover.</p>
<p>Disaster recovery strategies: backup and restore, pilot light, warm standby, and multi-region active-active. Define RPO (recovery point objective) and RTO (recovery time objective) for your application.</p>
<h3>Mini-Task: HA Architecture Design</h3>
<p>Design a highly available web application architecture across 3 AZs with automatic failover and disaster recovery to a secondary region.</p>`
      },
      {
        id: '5', title: 'Cost Optimisation & Infrastructure as Code', duration: '1 hour 30 min',
        content: `<h2>Cloud Efficiency</h2>
<p>Use Terraform or CloudFormation for IaC. Version control your infrastructure, review changes in pull requests, and automate deployments. Tag resources for cost tracking and automation.</p>
<p>Cost optimisation strategies: right-size instances, use reserved/savings plans for predictable workloads, use spot instances for fault-tolerant work, and implement auto-scaling to match demand. Use AWS Cost Explorer and Trusted Advisor for cost visibility.</p>
<h3>Mini-Task: IaC for VPC</h3>
<p>Write Terraform code that creates a VPC with public and private subnets across 3 AZs, including NAT Gateways and route tables.</p>`
      },
      {
        id: '6', title: 'Containers & ECS/EKS', duration: '1 hour 30 min',
        content: `<h2>Orchestration on AWS</h2>
<p>ECS is AWS's container orchestration service. EKS is managed Kubernetes. Use Fargate for serverless containers (no EC2 management) or EC2 launch type for more control. Design task definitions with CPU/memory limits, IAM roles, and logging.</p>
<p>CI/CD for containers with ECR, CodeBuild, and CodePipeline. Use Service Auto Scaling and ALB target tracking for dynamic scaling.</p>
<h3>Mini-Task: ECS Task Definition</h3>
<p>Write an ECS task definition for a Node.js web app with container port mapping, environment variables, secrets from Parameter Store, and CloudWatch logging.</p>`
      },
      {
        id: '7', title: 'Serverless Architecture', duration: '1 hour 15 min',
        content: `<h2>Lambda, API Gateway & Event-Driven Patterns</h2>
<p>Lambda functions are the building blocks of serverless applications. API Gateway exposes HTTP endpoints. EventBridge connects AWS services. Step Functions orchestrate multi-step workflows. DynamoDB provides serverless NoSQL storage.</p>
<p>Design event-driven systems: S3 events trigger Lambda for image processing, SQS buffers requests, SNS fans out notifications. Handle cold starts with provisioned concurrency and Lambda SnapStart.</p>
<h3>Mini-Task: Serverless Workflow</h3>
<p>Design an event-driven workflow where: image uploaded to S3 → Lambda resizes it → metadata stored in DynamoDB → user notified via SNS.</p>`
      },
      {
        id: '8', title: 'Monitoring, Logging & Observability', duration: '1 hour',
        content: `<h2>Seeing What's Happening</h2>
<p>CloudWatch collects metrics, logs, and events. Set up dashboards for key metrics (CPU, memory, latency, error rates, request count). Create alarms for threshold breaches. Use structured logging with JSON format for easy querying.</p>
<p>Implement distributed tracing with X-Ray for debugging latency issues. Use AWS Config for compliance monitoring and resource inventory. Set up budgets and alerts for cost anomalies.</p>
<h3>Mini-Task: Observability Dashboard</h3>
<p>Design a CloudWatch dashboard for a web application showing: request count, latency (p50/p95/p99), error rate, CPU/memory, and cost tracker.</p>`
      }
    ]
  }
};

async function expandCourses() {
  for (const [slug, data] of Object.entries(expandedCourses)) {
    try {
      await updateCourse(slug, data);
    } catch (err) {
      console.error(`Error updating ${slug}:`, err.message);
    }
  }
  console.log('\nDone! All courses expanded with rich content.');
}

expandCourses().catch(console.error);
