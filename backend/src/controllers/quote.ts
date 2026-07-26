import { Response } from 'express';
import prisma from '../lib/prisma.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export const submitQuote = asyncHandler(async (req: AuthRequest, res: Response) => {
  const {
    name,
    email,
    company,
    phone,
    projectTitle,
    projectDescription,
    serviceCategory,
    budget,
    timeline,
    preferredTech,
    ndaRequired,
    attachments,
  } = req.body;

  const quote = await prisma.quote.create({
    data: {
      userId: req.user?.id,
      name,
      email,
      company,
      phone,
      service: serviceCategory,
      budget,
      timeline,
      description: projectDescription,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user?.id,
      action: 'SUBMIT_QUOTE',
      entity: 'Quote',
      entityId: quote.id,
      newData: { name, email, company, projectTitle, serviceCategory },
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  // TODO: Send notification email to sales team
  console.log(`New quote request from ${email}: ${projectTitle}`);

  res.status(201).json({
    message: 'Quote request received. Our team will review and respond within 48 hours.',
    quoteId: quote.quoteId,
  });
});

export const getQuotes = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status, page = '1', limit = '20' } = req.query;

  const where: any = {};
  if (status) where.status = status;

  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const take = parseInt(limit as string);

  const [quotes, total] = await Promise.all([
    prisma.quote.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prisma.quote.count({ where }),
  ]);

  res.json({ quotes, total, page: parseInt(page as string), limit: take });
});

export const getQuoteById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const quote = await prisma.quote.findUnique({ where: { id } });
  if (!quote) throw new AppError(404, 'Quote not found');

  res.json({ quote });
});

export const updateQuoteStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const existing = await prisma.quote.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Quote not found');

  const quote = await prisma.quote.update({
    where: { id },
    data: { status },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'UPDATE_QUOTE_STATUS',
      entity: 'Quote',
      entityId: quote.id,
      oldData: { status: existing.status },
      newData: { status: quote.status },
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ quote });
});