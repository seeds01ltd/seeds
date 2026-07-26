const DB_KEY = 'seed_learning_db';

function load() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { enrolled: {}, progress: {}, completed: {}, bookmarks: [] };
}

function save(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

function userKey(userId) {
  return `seed_user_${userId}`;
}

function loadUser(userId) {
  try {
    const raw = localStorage.getItem(userKey(userId));
    if (raw) return JSON.parse(raw);
  } catch {}
  return { activity: [], certificates: [], achievements: [], bookmarks: [], settings: {} };
}

function saveUser(userId, data) {
  localStorage.setItem(userKey(userId), JSON.stringify(data));
}

export const db = {
  isEnrolled(courseSlug) {
    const data = load();
    return !!data.enrolled[courseSlug];
  },

  enroll(courseSlug) {
    const data = load();
    if (!data.enrolled[courseSlug]) {
      data.enrolled[courseSlug] = { enrolledAt: Date.now() };
      data.progress[courseSlug] = 0;
      data.completed[courseSlug] = [];
    }
    save(data);
  },

  getProgress(courseSlug) {
    const data = load();
    return {
      progress: data.progress[courseSlug] || 0,
      completed: data.completed[courseSlug] || [],
    };
  },

  completeLesson(courseSlug, lessonId, totalLessons) {
    const data = load();
    if (!data.completed[courseSlug]) data.completed[courseSlug] = [];
    if (!data.completed[courseSlug].includes(lessonId)) {
      data.completed[courseSlug].push(lessonId);
    }
    data.progress[courseSlug] = Math.round((data.completed[courseSlug].length / totalLessons) * 100);
    save(data);
  },

  isLessonCompleted(courseSlug, lessonId) {
    const data = load();
    return data.completed[courseSlug]?.includes(lessonId) || false;
  },

  getEnrolledCourses() {
    const data = load();
    return Object.keys(data.enrolled);
  },

  addBookmark(courseSlug, lessonId, note = '') {
    const data = load();
    data.bookmarks.push({ courseSlug, lessonId, note, createdAt: Date.now() });
    save(data);
  },

  getBookmarks() {
    return load().bookmarks;
  },
};

/* ─── User-scoped methods (dashboard) ─── */

export function getUserData(userId) {
  return loadUser(userId);
}

export function logActivity(userId, event) {
  const data = loadUser(userId);
  data.activity.unshift({ ...event, timestamp: Date.now() });
  if (data.activity.length > 50) data.activity.length = 50;
  saveUser(userId, data);
}

export function getActivity(userId, limit = 10) {
  const data = loadUser(userId);
  return data.activity.slice(0, limit);
}

export function generateCertificate(userId, courseSlug, courseTitle) {
  const data = loadUser(userId);
  const existing = data.certificates.find(c => c.courseSlug === courseSlug);
  if (existing) return existing;
  const cert = {
    id: `cert-${Date.now()}`,
    courseSlug,
    courseTitle,
    issuedAt: Date.now(),
    certId: `SEED-${String(data.certificates.length + 1).padStart(4, '0')}`,
  };
  data.certificates.push(cert);
  saveUser(userId, data);
  logActivity(userId, { type: 'certificate', message: `Earned certificate for "${courseTitle}"` });
  return cert;
}

export function getCertificates(userId) {
  return loadUser(userId).certificates;
}

export function getUserBookmarks(userId) {
  return loadUser(userId).bookmarks;
}

export function addUserBookmark(userId, courseSlug, lessonId, lessonTitle) {
  const data = loadUser(userId);
  const dup = data.bookmarks.find(b => b.courseSlug === courseSlug && b.lessonId === lessonId);
  if (dup) return;
  data.bookmarks.push({ id: `bm-${Date.now()}`, courseSlug, lessonId, lessonTitle, createdAt: Date.now() });
  saveUser(userId, data);
}

export function removeUserBookmark(userId, bookmarkId) {
  const data = loadUser(userId);
  data.bookmarks = data.bookmarks.filter(b => b.id !== bookmarkId);
  saveUser(userId, data);
}

export function getUserAchievements(userId) {
  return loadUser(userId).achievements;
}

export function unlockAchievement(userId, achievementId) {
  const data = loadUser(userId);
  if (data.achievements.includes(achievementId)) return false;
  data.achievements.push(achievementId);
  saveUser(userId, data);
  return true;
}

export function getUserSettings(userId) {
  return loadUser(userId).settings;
}

export function updateUserSettings(userId, updates) {
  const data = loadUser(userId);
  data.settings = { ...data.settings, ...updates };
  saveUser(userId, data);
  return data.settings;
}
