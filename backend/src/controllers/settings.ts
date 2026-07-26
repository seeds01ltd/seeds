import { Response } from 'express';
import prisma from '../lib/prisma.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export const getSettings = asyncHandler(async (req: AuthRequest, res: Response) => {
  const settings = await prisma.setting.findMany({ orderBy: { key: 'asc' } });
  const settingsMap = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
  res.json({ settings: settingsMap });
});

export const getSetting = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { key } = req.params;

  const setting = await prisma.setting.findUnique({ where: { key } });
  if (!setting) throw new AppError(404, 'Setting not found');

  res.json({ setting });
});

export const updateSetting = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { key } = req.params;
  const { value, type = 'json' } = req.body;

  const existing = await prisma.setting.findUnique({ where: { key } });

  const setting = await prisma.setting.upsert({
    where: { key },
    update: { value, type },
    create: { key, value, type },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: existing ? 'UPDATE_SETTING' : 'CREATE_SETTING',
      entity: 'Setting',
      entityId: setting.id,
      oldData: existing?.value,
      newData: setting.value,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ setting });
});

export const deleteSetting = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { key } = req.params;

  const existing = await prisma.setting.findUnique({ where: { key } });
  if (!existing) throw new AppError(404, 'Setting not found');

  await prisma.setting.delete({ where: { key } });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'DELETE_SETTING',
      entity: 'Setting',
      entityId: existing.id,
      oldData: existing.value,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ message: 'Setting deleted' });
});