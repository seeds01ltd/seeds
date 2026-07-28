// ============================================================
// API Abstraction Layer — Supabase-backed
// ============================================================

import { supabase } from '../lib/supabase';
import { Globe } from 'lucide-react';
import { services as mockServices } from '../data/services';
import { projects as mockProjects } from '../data/portfolio';

function tryParseJson(val) {
  if (typeof val !== 'string') return val;
  if ((val.startsWith('[') && val.endsWith(']')) || (val.startsWith('{') && val.endsWith('}'))) {
    try { return JSON.parse(val); } catch { return val; }
  }
  return val;
}

function toCamel(row) {
  if (!row || typeof row !== 'object') return row;
  if (Array.isArray(row)) return row.map(toCamel);
  return Object.keys(row).reduce((acc, key) => {
    const camel = key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    acc[camel] = tryParseJson(row[key]);
    return acc;
  }, {});
}
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

const svcIconMap = {};
mockServices.forEach(m => { svcIconMap[m.slug] = m.icon; });
const portIconMap = {};
mockProjects.forEach(m => { portIconMap[m.slug] = m.icon; });

const attachIcons = (items, map) => {
  if (!items) return items;
  const arr = Array.isArray(items) ? items : [items];
  arr.forEach(item => { item.icon = map[item.slug] || Globe; });
  return items;
};

const delay = (ms = 180) => new Promise(r => setTimeout(r, ms));

const api = {
  services: {
    getAll: async () => {
      const { data } = await supabase.from('services').select('*').order('slug');
      return attachIcons(toCamel(data) || [], svcIconMap);
    },
    getFeatured: async () => {
      const { data } = await supabase.from('services').select('*').eq('featured', true).order('slug');
      return attachIcons(toCamel(data) || [], svcIconMap);
    },
    getBySlug: async (s) => {
      const { data } = await supabase.from('services').select('*').eq('slug', s).single();
      return attachIcons(toCamel(data) || null, svcIconMap);
    },
    getCategories: async () => {
      const { data } = await supabase.from('services').select('*').order('slug');
      return [{ id: 'all', title: 'All Services', items: attachIcons(toCamel(data) || [], svcIconMap) }];
    },
  },
  portfolio: {
    getAll: async () => {
      const { data } = await supabase.from('portfolio').select('*').order('slug');
      return attachIcons(toCamel(data) || [], portIconMap);
    },
    getFeatured: async () => {
      const { data } = await supabase.from('portfolio').select('*').eq('featured', true).order('slug');
      return attachIcons(toCamel(data) || [], portIconMap);
    },
    getBySlug: async (s) => {
      const { data } = await supabase.from('portfolio').select('*').eq('slug', s).single();
      return attachIcons(toCamel(data) || null, portIconMap);
    },
  },
  blog: {
    getAll: async () => {
      const { data } = await supabase.from('blog_posts').select('*').order('date', { ascending: false });
      return toCamel(data) || [];
    },
    getFeatured: async () => {
      const { data } = await supabase.from('blog_posts').select('*').eq('featured', true).order('date', { ascending: false });
      return toCamel(data) || [];
    },
    getBySlug: async (s) => {
      const { data } = await supabase.from('blog_posts').select('*').eq('slug', s).single();
      return toCamel(data) || null;
    },
  },
  courses: {
    getAll: async () => {
      const { data } = await supabase.from('courses').select('*').order('slug');
      return toCamel(data) || [];
    },
    getFeatured: async () => {
      const { data } = await supabase.from('courses').select('*').eq('featured', true).order('slug');
      return toCamel(data) || [];
    },
    getBySlug: async (s) => {
      const { data } = await supabase.from('courses').select('*').eq('slug', s).single();
      return toCamel(data) || null;
    },
    getCategories: async () => {
      return ['All', 'Beginner', 'Intermediate', 'Advanced'];
    },
  },
  contact: {
    submit: async (data) => {
      const { error } = await supabase.from('contact_messages').insert({
        name: data.name, email: data.email, subject: data.subject, message: data.message,
      });
      if (error) throw new Error(error.message);
      return { ok: true, message: 'Message received. We will respond within 24 hours.' };
    },
  },
  quote: {
    submit: async (data) => {
      const { error, data: result } = await supabase.from('quote_requests').insert({
        name: data.name, email: data.email, company: data.company, phone: data.phone,
        service: data.service, budget: data.budget, timeline: data.timeline, description: data.description,
      }).select('id').single();
      if (error) throw new Error(error.message);
      return { ok: true, id: result?.id || `QR-${Date.now()}` };
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
    login: async ({ email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      const profile = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
      const accessToken = data.session.access_token;
      const user = { ...data.user, ...toCamel(profile.data || {}), accessToken };
      return { user, accessToken, session: data.session };
    },
    register: async ({ name, email, password }) => {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        const msg = error.message || error.msg || error.error_description || '';
        throw new Error(msg || 'Registration failed. Please try again.');
      }
      if (!data.user) throw new Error('Sign-up requires email confirmation. Please check your inbox.');
      const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=10b981`;
      try {
        await supabase.from('profiles').upsert({
          id: data.user.id, name, email, avatar, role: 'student',
        }, { onConflict: 'id' });
      } catch (_) {
        // profile insert may fail due to RLS; auth hook will handle it
      }
      const accessToken = data.session?.access_token || null;
      const user = { id: data.user.id, name, email, avatar, role: 'student', accessToken };
      return { user, accessToken, session: data.session };
    },
    getMe: async (token) => {
      if (!token) return null;
      const { data, error } = await supabase.auth.getUser(token).catch(() => ({ data: null, error: new Error('offline') }));
      if (error || !data.user) return null;
      let profileData = {};
      try {
        const profile = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
        if (profile.data) profileData = toCamel(profile.data);
      } catch (_) { /* profile may not exist yet */ }
      return { ...data.user, ...profileData };
    },
    forgotPassword: async (email) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: 'https://seeds-lac.vercel.app/reset-password' });
      if (error) throw new Error(error.message);
      return { ok: true, message: 'Password reset link sent to your email' };
    },
    resetPassword: async (token, password) => {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw new Error(error.message);
      return { ok: true, message: 'Password reset successfully' };
    },
    verifyEmail: async () => {
      return { ok: true };
    },
    updateProfile: async (id, updates) => {
      const allowed = ['name', 'avatar', 'role', 'bio'];
      const filtered = Object.keys(updates).reduce((acc, k) => {
        if (allowed.includes(k)) acc[k] = updates[k];
        return acc;
      }, {});
      const { data, error } = await supabase.from('profiles').update(filtered).eq('id', id).select().single();
      if (error) throw new Error(error.message);
      return toCamel(data);
    },
    logout: async () => {
      await supabase.auth.signOut().catch(() => {});
      return { ok: true };
    },
  },
  admin: {
    getProfiles: async () => {
      const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      return toCamel(data) || [];
    },
    getProfile: async (id) => {
      const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
      return toCamel(data) || null;
    },
    updateProfile: async (id, updates) => {
      const allowed = ['name', 'avatar', 'role', 'verified', 'can_verify', 'can_manage_instructors', 'can_manage_admins'];
      const filtered = Object.keys(updates).reduce((acc, k) => {
        if (allowed.includes(k)) acc[k] = updates[k];
        return acc;
      }, {});
      const { error } = await supabase.from('profiles').update(filtered).eq('id', id);
      if (error) throw new Error(error.message);
      return { ok: true };
    },
    verifyStudent: async (id, verified) => {
      const { error } = await supabase.from('profiles').update({ verified }).eq('id', id);
      if (error) throw new Error(error.message);
      return { ok: true, message: verified ? 'Student verified' : 'Student unverified' };
    },
    makeInstructor: async (id) => {
      const { error } = await supabase.from('profiles').update({ role: 'instructor', verified: true }).eq('id', id);
      if (error) throw new Error(error.message);
      return { ok: true, message: 'User promoted to instructor' };
    },
    updatePrivileges: async (id, privileges) => {
      const allowed = ['can_verify', 'can_manage_instructors', 'can_manage_admins'];
      const filtered = Object.keys(privileges).reduce((acc, k) => {
        if (allowed.includes(k)) acc[k] = privileges[k];
        return acc;
      }, {});
      const { error } = await supabase.from('profiles').update(filtered).eq('id', id);
      if (error) throw new Error(error.message);
      return { ok: true, message: 'Privileges updated' };
    },
  },
};

export default api;
