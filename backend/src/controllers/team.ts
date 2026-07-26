import { Response } from 'express';
import prisma from '../lib/prisma.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export const getTeamMembers = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { active = 'true' } = req.query;

  const members = await prisma.teamMember.findMany({
    where: { isActive: active === 'true' },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });

  res.json({ members });
});

export const getTeamMemberById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) throw new AppError(404, 'Team member not found');

  res.json({ member });
});

export const createTeamMember = asyncHandler(async (req: AuthRequest, res: Response) => {
  const member = await prisma.teamMember.create({ data: req.body });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'CREATE_TEAM_MEMBER',
      entity: 'TeamMember',
      entityId: member.id,
      newData: member,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.status(201).json({ member });
});

export const updateTeamMember = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const existing = await prisma.teamMember.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Team member not found');

  const member = await prisma.teamMember.update({
    where: { id },
    data: req.body,
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'UPDATE_TEAM_MEMBER',
      entity: 'TeamMember',
      entityId: member.id,
      oldData: existing,
      newData: member,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ member });
});

export const deleteTeamMember = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const existing = await prisma.teamMember.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Team member not found');

  await prisma.teamMember.delete({ where: { id } });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'DELETE_TEAM_MEMBER',
      entity: 'TeamMember',
      entityId: existing.id,
      oldData: existing,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ message: 'Team member deleted' });
});

export const getTimeline = asyncHandler(async (req: AuthRequest, res: Response) => {
  const timeline = await prisma.teamTimeline.findMany({
    orderBy: [{ order: 'asc' }, { year: 'asc' }],
  });

  res.json({ timeline });
});

export const createTimeline = asyncHandler(async (req: AuthRequest, res: Response) => {
  const item = await prisma.teamTimeline.create({ data: req.body });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'CREATE_TIMELINE',
      entity: 'TeamTimeline',
      entityId: item.id,
      newData: item,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.status(201).json({ item });
});

export const updateTimeline = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const existing = await prisma.teamTimeline.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Timeline item not found');

  const item = await prisma.teamTimeline.update({
    where: { id },
    data: req.body,
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'UPDATE_TIMELINE',
      entity: 'TeamTimeline',
      entityId: item.id,
      oldData: existing,
      newData: item,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ item });
});

export const deleteTimeline = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const existing = await prisma.teamTimeline.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Timeline item not found');

  await prisma.teamTimeline.delete({ where: { id } });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'DELETE_TIMELINE',
      entity: 'TeamTimeline',
      entityId: existing.id,
      oldData: existing,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ message: 'Timeline item deleted' });
});