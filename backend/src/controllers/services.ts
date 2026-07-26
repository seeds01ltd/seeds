import { Response } from 'express';
import prisma from '../lib/prisma.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

const includeCategories = { include: { categories: true } };

export const getServices = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { featured, active = 'true', page = '1', limit = '50' } = req.query;

  const where: any = { isActive: active === 'true' };
  if (featured === 'true') where.featured = true;

  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const take = parseInt(limit as string);

  const [services, total] = await Promise.all([
    prisma.service.findMany({
      where,
      include: { categories: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      skip,
      take,
    }),
    prisma.service.count({ where }),
  ]);

  res.json({ services, total, page: parseInt(page as string), limit: take });
});

export const getFeaturedServices = asyncHandler(async (req: AuthRequest, res: Response) => {
  const services = await prisma.service.findMany({
    where: { featured: true, isActive: true },
    include: { categories: true },
    orderBy: { order: 'asc' },
  });
  res.json({ services });
});

export const getCategories = asyncHandler(async (req: AuthRequest, res: Response) => {
  const categories = await prisma.serviceCategory.findMany({
    include: { service: { select: { id: true, title: true, slug: true } } },
    orderBy: { createdAt: 'asc' },
  });
  res.json({ categories });
});

export const getServiceBySlug = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { slug } = req.params;

  const service = await prisma.service.findUnique({
    where: { slug },
    include: { categories: true },
  });

  if (!service) throw new AppError(404, 'Service not found');

  res.json({ service });
});

export const createService = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { categories, ...data } = req.body;

  const service = await prisma.service.create({
    data: {
      ...data,
      tech: data.tech || [],
      categories: categories?.length
        ? { create: categories.map((c: any) => ({ title: c.title })) }
        : undefined,
    },
    include: { categories: true },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'CREATE_SERVICE',
      entity: 'Service',
      entityId: service.id,
      newData: service,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.status(201).json({ service });
});

export const updateService = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { slug } = req.params;
  const { categories, ...data } = req.body;

  const existing = await prisma.service.findUnique({ where: { slug } });
  if (!existing) throw new AppError(404, 'Service not found');

  const service = await prisma.service.update({
    where: { slug },
    data: {
      ...data,
      tech: data.tech || existing.tech,
      categories: categories?.length
        ? { deleteMany: {}, create: categories.map((c: any) => ({ title: c.title })) }
        : undefined,
    },
    include: { categories: true },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'UPDATE_SERVICE',
      entity: 'Service',
      entityId: service.id,
      oldData: existing,
      newData: service,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ service });
});

export const deleteService = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { slug } = req.params;

  const existing = await prisma.service.findUnique({ where: { slug } });
  if (!existing) throw new AppError(404, 'Service not found');

  await prisma.service.delete({ where: { slug } });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'DELETE_SERVICE',
      entity: 'Service',
      entityId: existing.id,
      oldData: existing,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ message: 'Service deleted' });
});