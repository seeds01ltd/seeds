import crypto from 'node:crypto';
import { Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { generateTokens, verifyRefreshToken, AuthRequest } from '../middleware/auth.js';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateProfileSchema,
} from '../validators/auth.js';

const SALT_ROUNDS = 12;

const setTokenCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const clearTokenCookies = (res: Response) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
};

export const register = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = registerSchema.parse(req.body);

  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) {
    throw new AppError(409, 'Email already registered');
  }

  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      name: data.name,
      company: data.company,
      phone: data.phone,
      role: 'CLIENT',
    },
    select: { id: true, email: true, name: true, role: true },
  });

  const { accessToken, refreshToken } = generateTokens(user);

  await prisma.authToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      type: 'REFRESH',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  setTokenCookies(res, accessToken, refreshToken);

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'REGISTER',
      entity: 'User',
      entityId: user.id,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.status(201).json({
    user,
    accessToken,
  });
});

export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = loginSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    throw new AppError(401, 'Invalid credentials');
  }

  const validPassword = await bcrypt.compare(data.password, user.passwordHash);
  if (!validPassword) {
    throw new AppError(401, 'Invalid credentials');
  }

  if (!user.isActive) {
    throw new AppError(403, 'Account is deactivated');
  }

  const { accessToken, refreshToken } = generateTokens({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  await prisma.authToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      type: 'REFRESH',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  setTokenCookies(res, accessToken, refreshToken);

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'LOGIN',
      entity: 'User',
      entityId: user.id,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    accessToken,
  });
});

export const logout = asyncHandler(async (req: AuthRequest, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    await prisma.authToken.deleteMany({ where: { token: refreshToken } });
  }

  if (req.user) {
    await prisma.auditLog.create({
      data: {
        userId: req.user.id,
        action: 'LOGOUT',
        entity: 'User',
        entityId: req.user.id,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      },
    });
  }

  clearTokenCookies(res);
  res.json({ message: 'Logged out successfully' });
});

export const refresh = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { refreshToken } = refreshTokenSchema.parse(req.body);

  let decoded: { id: string; type: string };
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw new AppError(401, 'Invalid refresh token');
  }

  const storedToken = await prisma.authToken.findUnique({
    where: { token: refreshToken },
  });

  if (!storedToken || storedToken.type !== 'REFRESH' || storedToken.expiresAt < new Date()) {
    throw new AppError(401, 'Refresh token expired or revoked');
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { id: true, email: true, name: true, role: true, isActive: true },
  });

  if (!user || !user.isActive) {
    throw new AppError(401, 'User not found or inactive');
  }

  await prisma.authToken.delete({ where: { token: refreshToken } });

  const tokens = generateTokens(user);

  await prisma.authToken.create({
    data: {
      token: tokens.refreshToken,
      userId: user.id,
      type: 'REFRESH',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  setTokenCookies(res, tokens.accessToken, tokens.refreshToken);

  res.json({ accessToken: tokens.accessToken });
});

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw new AppError(401, 'Not authenticated');
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      avatar: true,
      phone: true,
      company: true,
      isActive: true,
      emailVerified: true,
      lastLoginAt: true,
      createdAt: true,
    },
  });

  res.json({ user });
});

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = updateProfileSchema.parse(req.body);

  const user = await prisma.user.update({
    where: { id: req.user!.id },
    data,
    select: { id: true, email: true, name: true, role: true, avatar: true, phone: true, company: true },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'UPDATE_PROFILE',
      entity: 'User',
      entityId: req.user!.id,
      newData: data,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ user });
});

export const changePassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = changePasswordSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  if (!user) throw new AppError(404, 'User not found');

  const validPassword = await bcrypt.compare(data.currentPassword, user.passwordHash);
  if (!validPassword) throw new AppError(401, 'Current password is incorrect');

  const passwordHash = await bcrypt.hash(data.newPassword, SALT_ROUNDS);

  await prisma.user.update({
    where: { id: req.user!.id },
    data: { passwordHash },
  });

  await prisma.authToken.deleteMany({
    where: { userId: req.user!.id, type: 'REFRESH' },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'CHANGE_PASSWORD',
      entity: 'User',
      entityId: req.user!.id,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  clearTokenCookies(res);
  res.json({ message: 'Password changed. Please log in again.' });
});

export const forgotPassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = forgotPasswordSchema.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    return res.json({ message: 'If the email exists, a reset link has been sent' });
  }

  const resetToken = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.authToken.create({
    data: {
      token: resetToken,
      userId: user.id,
      type: 'RESET_PASSWORD',
      expiresAt,
    },
  });

  // TODO: Send email with reset link
  console.log(`Password reset token for ${user.email}: ${resetToken}`);

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'REQUEST_PASSWORD_RESET',
      entity: 'User',
      entityId: user.id,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ message: 'If the email exists, a reset link has been sent' });
});

export const resetPassword = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = resetPasswordSchema.parse(req.body);

  const tokenRecord = await prisma.authToken.findUnique({
    where: { token: data.token },
  });

  if (!tokenRecord || tokenRecord.type !== 'RESET_PASSWORD' || tokenRecord.expiresAt < new Date()) {
    throw new AppError(400, 'Invalid or expired reset token');
  }

  const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);

  await prisma.user.update({
    where: { id: tokenRecord.userId },
    data: { passwordHash },
  });

  await prisma.authToken.deleteMany({
    where: { userId: tokenRecord.userId, type: { in: ['REFRESH', 'RESET_PASSWORD'] } },
  });

  await prisma.auditLog.create({
    data: {
      userId: tokenRecord.userId,
      action: 'RESET_PASSWORD',
      entity: 'User',
      entityId: tokenRecord.userId,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  clearTokenCookies(res);
  res.json({ message: 'Password reset successful. Please log in.' });
});