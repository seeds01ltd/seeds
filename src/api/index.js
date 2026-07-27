// ============================================================
// API Abstraction Layer
// ============================================================
// To swap from mock data to real Supabase/Express backend:
//
//   1. Delete the `import * as X from '../data/X'` lines below
//   2. Replace each method body with a real fetch/axios call
//      — Signatures stay identical, consumers need no changes
//   3. Example swap:
//        Before: getAll: async () => { ... return servicesData.getAll(); }
//        After:  getAll: async () => { const r=await fetch('/api/services'); return r.json(); }
//   4. Remove `backend/prisma/seed.ts` when Supabase replaces it
// ============================================================

import * as servicesData  from '../data/services';
import * as portfolioData from '../data/portfolio';
import * as blogData      from '../data/blog';
import * as coursesData   from '../data/courses';
import * as authData      from '../data/auth';
import * as instructorData from '../data/instructor';
import * as clientData from '../data/client';
import * as developerData from '../data/developer';
import * as employerData from '../data/employer';
import * as crmData from '../data/crm';
import * as pmData from '../data/pm';
import * as financeData from '../data/finance';
import * as commsData from '../data/communication';
import * as kbData from '../data/knowledgebase';
import * as communityData from '../data/community';
import * as certData from '../data/certificates';

const delay = (ms = 180) => new Promise(r => setTimeout(r, ms));

const api = {
  services: {
    getAll:        async () => { await delay(); return servicesData.services; },
    getFeatured:   async () => { await delay(); return servicesData.getFeatured(); },
    getBySlug:     async (s) => { await delay(); return servicesData.getBySlug(s); },
    getCategories: async () => { await delay(); return servicesData.getCategories(); },
  },
  portfolio: {
    getAll:      async () => { await delay(); return portfolioData.getAll(); },
    getFeatured: async () => { await delay(); return portfolioData.getFeatured(); },
    getBySlug:   async (s) => { await delay(); return portfolioData.getBySlug(s); },
  },
  blog: {
    getAll:      async () => { await delay(); return blogData.getAll(); },
    getFeatured: async () => { await delay(); return blogData.getFeatured(); },
    getBySlug:   async (s) => { await delay(); return blogData.getBySlug(s); },
  },
  courses: {
    getAll:      async () => { await delay(); return coursesData.courses; },
    getFeatured: async () => { await delay(); return coursesData.getFeatured(); },
    getBySlug:   async (s) => { await delay(); return coursesData.getBySlug(s); },
    getCategories: async () => { await delay(); return coursesData.getCategories(); },
  },
  contact: {
    submit: async (data) => {
      await delay(600);
      console.info('[API] Contact form submission:', data);
      return { ok: true, message: 'Message received. We will respond within 24 hours.' };
    },
  },
  quote: {
    submit: async (data) => {
      await delay(700);
      console.info('[API] Quote request:', data);
      return { ok: true, id: `QR-${Date.now()}` };
    },
  },
  client: {
    getProjects:     async () => clientData.getClientProjects(),
    getMilestones:   async (p) => clientData.getClientMilestones(p),
    getTasks:        async (p) => clientData.getClientTasks(p),
    getFiles:        async (p) => clientData.getClientFiles(p),
    getContracts:    async () => clientData.getClientContracts(),
    getInvoices:     async () => clientData.getClientInvoices(),
  },
  developer: {
    getTasks:       async () => developerData.getDevTasks(),
    getSprints:     async () => developerData.getDevSprints(),
    getRepos:       async () => developerData.getDevRepos(),
    getCodeReviews: async () => developerData.getDevCodeReviews(),
    getTimeEntries: async () => developerData.getDevTimeEntries(),
  },
  employer: {
    getJobs:          async () => employerData.getJobPosts(),
    getApplications:  async (j) => employerData.getApplications(j),
    getGraduates:     async () => employerData.getGraduates(),
    updateStage:      async (i, s) => employerData.updateApplicationStage(i, s),
    createJob:        async (d) => employerData.createJobPost(d),
  },
  crm: {
    getLeads:     async () => crmData.getLeads(),
    getPipeline:  async () => crmData.getPipeline(),
    getDeals:     async () => crmData.getDeals(),
  },
  pm: {
    getBoards:      async () => pmData.getBoards(),
    getBoard:       async (id) => pmData.getBoard(id),
    getMilestones:  async () => pmData.getPmMilestones(),
    getTimeEntries: async () => pmData.getPmTimeEntries(),
  },
  finance: {
    getPayments:   async () => financeData.getPayments(),
    getInvoices:   async () => financeData.getFinanceInvoices(),
    getTransactions: async () => financeData.getTransactions(),
    getPayouts:    async () => financeData.getFinancePayouts(),
  },
  communication: {
    getMessages:     async () => commsData.getMessages(),
    getForumThreads: async () => commsData.getForumThreads(),
  },
  knowledgebase: {
    getCategories: async () => kbData.getCategories(),
    getArticles:   async (c) => kbData.getArticles(c),
    getTutorials:  async () => kbData.getTutorials(),
  },
  community: {
    getEvents:      async () => communityData.getEvents(),
    getStudyGroups: async () => communityData.getStudyGroups(),
  },
  certificates: {
    verify: async (id) => certData.verifyCertificate(id),
  },
  instructor: {
    getAssignments:   async (i) => instructorData.getAssignments(i),
    getSubmissions:   async (a) => instructorData.getSubmissions(a),
    gradeSubmission:  async (s, g, f) => instructorData.gradeSubmission(s, g, f),
    getStudents:      async (i) => instructorData.getStudents(i),
    getPayouts:       async (i) => instructorData.getPayouts(i),
    getLiveClasses:   async (i) => instructorData.getLiveClasses(i),
  },
  auth: {
    login:         async (c) => authData.login(c.email, c.password),
    register:      async (c) => authData.register(c),
    getMe:         async (t) => authData.getMe(t),
    forgotPassword: async (e) => authData.forgotPassword(e),
    resetPassword: async (t, p) => authData.resetPassword(t, p),
    verifyEmail:   async (i) => authData.verifyEmail(i),
    updateProfile: async (i, u) => authData.updateProfile(i, u),
    logout:        async () => { await delay(200); return { ok: true }; },
  },
};

export default api;
