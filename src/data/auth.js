const USERS = [
  { id: 'u1', name: 'Admin User', email: 'admin@seed.agency', password: 'admin123', role: 'admin', avatar: '👨‍💻', bio: 'Platform administrator', joined: '2026-01-15', verified: true },
  { id: 'u2', name: 'Dr. Amara Osei', email: 'amara@seed.agency', password: 'instructor123', role: 'instructor', avatar: '👩🏾‍💻', bio: 'AI & Machine Learning lead instructor', joined: '2026-02-01', verified: true },
  { id: 'u3', name: 'Marcus Chen', email: 'marcus@seed.agency', password: 'instructor123', role: 'instructor', avatar: '👨🏻‍💻', bio: 'Embedded systems engineering instructor', joined: '2026-02-15', verified: true },
  { id: 'u4', name: 'Sarah Johnson', email: 'sarah@example.com', password: 'student123', role: 'student', avatar: '👩‍🎓', bio: 'Full-stack developer in training', joined: '2026-03-01', verified: true },
  { id: 'u5', name: 'Alex Rivera', email: 'alex@example.com', password: 'student123', role: 'student', avatar: '👨‍🎓', bio: 'AI/ML enthusiast', joined: '2026-03-15', verified: false },
];

let nextId = 6;

function delay(ms = 200) {
  return new Promise(r => setTimeout(r, ms));
}

function findUser(email) {
  return USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
}

function sanitize(user) {
  const { password, ...rest } = user;
  return rest;
}

export async function login(email, password) {
  await delay(400);
  const user = findUser(email);
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }
  return { user: sanitize(user), accessToken: `mock-token-${user.id}-${Date.now()}` };
}

export async function register({ name, email, password }) {
  await delay(500);
  if (findUser(email)) {
    throw new Error('An account with this email already exists');
  }
  const newUser = {
    id: `u${nextId++}`,
    name,
    email,
    password,
    role: 'student',
    avatar: '👤',
    bio: '',
    joined: new Date().toISOString().split('T')[0],
    verified: false,
  };
  USERS.push(newUser);
  return { user: sanitize(newUser), accessToken: `mock-token-${newUser.id}-${Date.now()}` };
}

export async function getMe(token) {
  await delay(100);
  const userId = token?.split('-')[2];
  const user = USERS.find(u => u.id === userId);
  if (!user) throw new Error('Invalid token');
  return sanitize(user);
}

export async function forgotPassword(email) {
  await delay(500);
  const user = findUser(email);
  if (!user) throw new Error('No account found with this email');
  return { ok: true, message: 'Password reset link sent to your email' };
}

export async function resetPassword(token, password) {
  await delay(500);
  const userId = token?.split('-')[2];
  const user = USERS.find(u => u.id === userId);
  if (!user) throw new Error('Invalid or expired reset token');
  user.password = password;
  return { ok: true, message: 'Password reset successfully' };
}

export async function verifyEmail(userId) {
  await delay(300);
  const user = USERS.find(u => u.id === userId);
  if (!user) throw new Error('User not found');
  user.verified = true;
  return { ok: true };
}

export async function updateProfile(userId, updates) {
  await delay(300);
  const user = USERS.find(u => u.id === userId);
  if (!user) throw new Error('User not found');
  Object.assign(user, updates);
  return sanitize(user);
}

export function getUsers() {
  return USERS.map(sanitize);
}

export function getUserById(id) {
  const user = USERS.find(u => u.id === id);
  return user ? sanitize(user) : null;
}
