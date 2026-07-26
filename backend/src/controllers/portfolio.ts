import { Response } from 'express';
import prisma from '../lib/prisma.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export const getProjects = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { featured, active = 'true', page = '1', limit = '50', industry } = req.query;

  const where: any = { isActive: active === 'true' };
  if (featured === 'true') where.featured = true;
  if (industry) where.industry = industry;

  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const take = parseInt(limit as string);

  const [projects, total] = await Promise.all([
    prisma.portfolio.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      skip,
      take,
    }),
    prisma.portfolio.count({ where }),
  ]);

  res.json({ projects, total, page: parseInt(page as string), limit: take });
});

export const getFeaturedProjects = asyncHandler(async (req: AuthRequest, res: Response) => {
  const projects = await prisma.portfolio.findMany({
    where: { featured: true, isActive: true },
    orderBy: { order: 'asc' },
  });
  res.json({ projects });
});

export const getProjectBySlug = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { slug } = req.params;

  const project = await prisma.portfolio.findUnique({ where: { slug } });
  if (!project) throw new AppError(404, 'Project not found');

  res.json({ project });
});

export const createProject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const project = await prisma.portfolio.create({ data: req.body });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'CREATE_PROJECT',
      entity: 'Portfolio',
      entityId: project.id,
      newData: project,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.status(201).json({ project });
});

export const updateProject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { slug } = req.params;

  const existing = await prisma.portfolio.findUnique({ where: { slug } });
  if (!existing) throw new AppError(404, 'Project not found');

  const project = await prisma.portfolio.update({
    where: { slug },
    data: req.body,
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'UPDATE_PROJECT',
      entity: 'Portfolio',
      entityId: project.id,
      oldData: existing,
      newData: project,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ project });
});

export const deleteProject = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { slug } = req.params;

  const existing = await prisma.portfolio.findUnique({ where: { slug } });
  if (!existing) throw new AppError(404, 'Project not found');

  await prisma.portfolio.delete({ where: { slug } });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'DELETE_PROJECT',
      entity: 'Portfolio',
      entityId: existing.id,
      oldData: existing,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ message: 'Project deleted' });
});