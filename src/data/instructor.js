function delay(ms = 200) {
  return new Promise(r => setTimeout(r, ms));
}

const ASSIGNMENTS = [
  { id: 'a1', courseSlug: 'react-masterclass', courseTitle: 'React & Next.js Masterclass', title: 'Build a Custom Hook Library', due: '2026-08-15', submitted: 18, totalStudents: 24, status: 'grading' },
  { id: 'a2', courseSlug: 'react-masterclass', courseTitle: 'React & Next.js Masterclass', title: 'Server Component Migration', due: '2026-08-01', submitted: 22, totalStudents: 24, status: 'closed' },
  { id: 'a3', courseSlug: 'python-data-science', courseTitle: 'Python for Data Science', title: 'Exploratory Data Analysis', due: '2026-08-20', submitted: 8, totalStudents: 15, status: 'open' },
  { id: 'a4', courseSlug: 'python-data-science', courseTitle: 'Python for Data Science', title: 'Pandas Data Wrangling', due: '2026-08-05', submitted: 12, totalStudents: 15, status: 'grading' },
  { id: 'a5', courseSlug: 'aws-devops', courseTitle: 'AWS Cloud & DevOps', title: 'Terraform Infrastructure as Code', due: '2026-08-25', submitted: 5, totalStudents: 20, status: 'open' },
];

const SUBMISSIONS = [
  { id: 's1', assignmentId: 'a1', studentName: 'Sarah Johnson', studentAvatar: '👩‍🎓', submittedAt: '2026-08-12', grade: null, feedback: '' },
  { id: 's2', assignmentId: 'a1', studentName: 'Alex Rivera', studentAvatar: '👨‍🎓', submittedAt: '2026-08-14', grade: null, feedback: '' },
  { id: 's3', assignmentId: 'a1', studentName: 'Emily Watson', studentAvatar: '👩🏻‍💻', submittedAt: '2026-08-10', grade: 88, feedback: 'Good work! Could improve state management patterns.' },
  { id: 's4', assignmentId: 'a4', studentName: 'Sarah Johnson', studentAvatar: '👩‍🎓', submittedAt: '2026-08-03', grade: null, feedback: '' },
  { id: 's5', assignmentId: 'a4', studentName: 'James Lee', studentAvatar: '👨🏻‍💻', submittedAt: '2026-08-04', grade: 72, feedback: 'Decent analysis, missing some edge cases.' },
];

const STUDENTS = [
  { id: 'st1', name: 'Sarah Johnson', avatar: '👩‍🎓', email: 'sarah@example.com', enrolled: '2026-03-01', courses: ['react-masterclass', 'python-data-science', 'ai-ml-fundamentals'], overallProgress: 45, lastActive: '2026-07-24' },
  { id: 'st2', name: 'Alex Rivera', avatar: '👨‍🎓', email: 'alex@example.com', enrolled: '2026-03-15', courses: ['react-masterclass'], overallProgress: 30, lastActive: '2026-07-22' },
  { id: 'st3', name: 'Emily Watson', avatar: '👩🏻‍💻', email: 'emily@example.com', enrolled: '2026-04-01', courses: ['react-masterclass', 'aws-devops'], overallProgress: 60, lastActive: '2026-07-25' },
  { id: 'st4', name: 'James Lee', avatar: '👨🏻‍💻', email: 'james@example.com', enrolled: '2026-04-15', courses: ['python-data-science'], overallProgress: 15, lastActive: '2026-07-18' },
  { id: 'st5', name: 'Maya Patel', avatar: '👩🏽‍💻', email: 'maya@example.com', enrolled: '2026-05-01', courses: ['aws-devops'], overallProgress: 25, lastActive: '2026-07-20' },
];

const PAYOUTS = [
  { id: 'p1', period: 'July 2026', amount: 500000, status: 'paid', paidAt: '2026-07-15', courses: ['React & Next.js Masterclass', 'Python for Data Science'] },
  { id: 'p2', period: 'June 2026', amount: 450000, status: 'paid', paidAt: '2026-06-15', courses: ['React & Next.js Masterclass'] },
  { id: 'p3', period: 'May 2026', amount: 400000, status: 'paid', paidAt: '2026-05-15', courses: ['React & Next.js Masterclass'] },
  { id: 'p4', period: 'August 2026', amount: 550000, status: 'pending', paidAt: null, courses: ['React & Next.js Masterclass', 'Python for Data Science'] },
];

const LIVE_CLASSES = [
  { id: 'l1', title: 'React Hooks Deep Dive', course: 'React & Next.js Masterclass', date: '2026-07-28', time: '18:00 WAT', duration: '90 min', enrolled: 18, status: 'upcoming' },
  { id: 'l2', title: 'State Management Patterns', course: 'React & Next.js Masterclass', date: '2026-08-04', time: '18:00 WAT', duration: '90 min', enrolled: 15, status: 'upcoming' },
  { id: 'l3', title: 'Python Pandas Workshop', course: 'Python for Data Science', date: '2026-07-25', time: '17:00 WAT', duration: '60 min', enrolled: 12, status: 'completed' },
];

export async function getAssignments(instructorId) {
  await delay(200);
  return ASSIGNMENTS;
}

export async function getSubmissions(assignmentId) {
  await delay(150);
  return SUBMISSIONS.filter(s => s.assignmentId === assignmentId);
}

export async function gradeSubmission(submissionId, grade, feedback) {
  await delay(200);
  const sub = SUBMISSIONS.find(s => s.id === submissionId);
  if (sub) { sub.grade = grade; sub.feedback = feedback; }
  return { ok: true };
}

export async function getStudents(instructorId) {
  await delay(200);
  return STUDENTS;
}

export async function getPayouts(instructorId) {
  await delay(200);
  return PAYOUTS;
}

export async function getLiveClasses(instructorId) {
  await delay(150);
  return LIVE_CLASSES;
}
