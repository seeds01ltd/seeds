# SEEDS Platform — Build Phases

## Phase 1 — Public Site Expansion
Build out remaining public-facing pages using the existing pattern:
`src/data/*.js` → `src/api/index.js` → `src/pages/*.jsx` → `src/App.jsx`

- [ ] Academy overview (`/academy`)
- [ ] Instructors directory + profiles (`/instructors`, `/instructors/:slug`)
- [ ] Careers listing (`/careers`)
- [ ] Resources / enhanced blog (categories, search)
- [ ] Events (`/events`)
- [ ] FAQ page (`/faq`)
- [ ] Legal pages (Privacy, Terms, Cookies)
- [ ] Finish any remaining placeholder pages

## Phase 2 — Authentication
- [ ] Login (`/login`)
- [ ] Register (`/register`)
- [ ] Forgot / Reset password
- [ ] Email verification
- [ ] Profile page (`/profile`)
- [ ] Extend AdminContext for multi-role auth

## Phase 3 — Student Dashboard
Courses and learning already exist — wrap them in a dashboard.

- [ ] Dashboard home (progress, recent activity)
- [ ] My Courses (enrolled list + progress bars)
- [ ] Enhanced course player (expand existing lesson viewer)
- [ ] Assignments & Quizzes (mock data)
- [ ] Projects
- [ ] Certificates
- [ ] Bookmarks
- [ ] Achievements
- [ ] Settings
- [ ] Messages / Notifications

## Phase 4 — Admin Dashboard
Expand existing `src/admin/` mock CRUD.

- [ ] Courses / lessons management in admin CRUD
- [ ] User management
- [ ] Analytics overview
- [ ] System settings UI
- [ ] Media library

## Phase 5 — Instructor Dashboard
- [ ] Course management (create/edit lessons)
- [ ] Student management
- [ ] Assignments & grading
- [ ] Revenue / payouts (mock)
- [ ] Live classes (placeholder)

## Phase 6 — Client / Developer / Employer Dashboards
- [ ] Client: Projects, milestones, tasks, files, contracts, invoices
- [ ] Developer: Tasks, sprints, repos, code reviews, time tracking
- [ ] Employer: Post jobs, manage applications, hire graduates

## Phase 7 — Additional Modules
- [ ] CRM (leads, pipeline, deals)
- [ ] Project Management (kanban, milestones, time tracking)
- [ ] Finance (payments, invoices, transactions, payouts)
- [ ] Communication (messages, forums, live chat)
- [ ] Knowledge Base (docs, API docs, tutorials)
- [ ] Community (forums, study groups, hackathons, events)
- [ ] Certificate System (verification portal, digital credentials)

## Phase 8 — Backend Integration
- [ ] Replace all mock APIs with real Supabase / Express backend
- [ ] Connect auth, database, storage, payments
- [ ] Remove AdminApi mock fallback
- [ ] Production deployment

---

### Architecture Pattern (used across all phases)

```
src/
  data/*.js          → Mock data + helper functions
  api/index.js       → API abstraction layer (mock → real swap)
  pages/*.jsx        → Page components
  components/*.jsx   → Reusable UI / layout components
  admin/*.jsx        → Admin panel (built separately)
  data/db.js         → localStorage "local db" (progress, enrollment)
```

All mock data in `src/data/` follows the same export pattern:
- `getAll()`, `getBySlug(slug)`, `getFeatured()` — consistent signatures
- Easy to swap `import * as data from '../data/x'` with API calls when backend is ready

Current tech stack: Vite + React 18 + react-router-dom v6 + lucide-react + Three.js
Styling: Global CSS design system (`src/index.css`) with CSS custom properties
