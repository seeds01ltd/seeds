function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
const CATEGORIES = [
  { id:'kb1', name:'Getting Started', slug:'getting-started', icon:'🚀', count:4 },
  { id:'kb2', name:'API Reference', slug:'api-reference', icon:'🔌', count:6 },
  { id:'kb3', name:'Tutorials', slug:'tutorials', icon:'📖', count:5 },
  { id:'kb4', name:'Platform Guides', slug:'guides', icon:'📘', count:3 },
  { id:'kb5', name:'FAQ', slug:'faq', icon:'❓', count:8 },
];
const ARTICLES = {
  'getting-started': [
    { id:'a1', title:'Welcome to the SEED Platform', excerpt:'An overview of the platform and its features.', updated:'2026-07-20', readTime:'5 min' },
    { id:'a2', title:'Setting Up Your Account', excerpt:'How to configure your profile and preferences.', updated:'2026-07-18', readTime:'3 min' },
    { id:'a3', title:'Navigating the Dashboard', excerpt:'A tour of the main dashboard interface.', updated:'2026-07-15', readTime:'4 min' },
    { id:'a4', title:'Understanding Roles & Permissions', excerpt:'What each role can do on the platform.', updated:'2026-07-10', readTime:'6 min' },
  ],
  'api-reference': [
    { id:'a5', title:'Authentication API', excerpt:'Login, register, token refresh endpoints.', updated:'2026-07-22', readTime:'8 min' },
    { id:'a6', title:'Courses API', excerpt:'CRUD operations for courses and lessons.', updated:'2026-07-20', readTime:'10 min' },
    { id:'a7', title:'Users API', excerpt:'User management and profile endpoints.', updated:'2026-07-19', readTime:'7 min' },
    { id:'a8', title:'Analytics API', excerpt:'Platform metrics and reporting endpoints.', updated:'2026-07-17', readTime:'6 min' },
  ],
  'tutorials': [
    { id:'a9', title:'Building Your First Course', excerpt:'Step-by-step guide to creating a course.', updated:'2026-07-21', readTime:'12 min' },
    { id:'a10', title:'Grading Assignments', excerpt:'How to review and grade student submissions.', updated:'2026-07-19', readTime:'8 min' },
    { id:'a11', title:'Setting Up Live Classes', excerpt:'Schedule and manage live sessions.', updated:'2026-07-16', readTime:'6 min' },
  ],
  'guides': [
    { id:'a12', title:'Best Practices for Course Content', excerpt:'Tips for creating engaging learning materials.', updated:'2026-07-14', readTime:'7 min' },
    { id:'a13', title:'Platform Security Guide', excerpt:'Security features and best practices.', updated:'2026-07-12', readTime:'5 min' },
  ],
};
const TUTORIALS = [
  { id:'t1', title:'React for Beginners', category:'Development', duration:'2 hours', students:340, rating:4.7 },
  { id:'t2', title:'Python Data Analysis', category:'Data Science', duration:'1.5 hours', students:280, rating:4.5 },
  { id:'t3', title:'AWS Lambda Crash Course', category:'Cloud', duration:'45 min', students:190, rating:4.8 },
];
export async function getCategories() { await delay(150); return CATEGORIES; }
export async function getArticles(categorySlug) { await delay(150); return ARTICLES[categorySlug] || []; }
export async function getTutorials() { await delay(150); return TUTORIALS; }
