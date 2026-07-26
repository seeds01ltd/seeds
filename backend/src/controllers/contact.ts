import { Response } from 'express';
import prisma from '../lib/prisma.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export const submitContact = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, email, company, subject, message, budget, timeline } = req.body;

  const contact = await prisma.contact.create({
    data: {
      userId: req.user?.id,
      name,
      email,
      company,
      subject,
      message,
      budget,
      timeline,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user?.id,
      action: 'SUBMIT_CONTACT',
      entity: 'Contact',
      entityId: contact.id,
      newData: { name, email, company, subject },
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  // TODO: Send notification email to team
  console.log(`New contact from ${email}: ${subject}`);

  res.status(201).json({
    message: 'Message sent successfully. We\'ll respond within 24 hours.',
    contactId: contact.id,
  });
});

export const getContacts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status, page = '1', limit = '20' } = req.query;

  const where: any = {};
  if (status) where.status = status;

  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const take = parseInt(limit as string);

  const [contacts, total] = await Promise.all([
    prisma.contact.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    }),
    prisma.contact.count({ where }),
  ]);

  res.json({ contacts, total, page: parseInt(page as string), limit: take });
});

export const getContactById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const contact = await prisma.contact.findUnique({ where: { id } });
  if (!contact) throw new AppError(404, 'Contact not found');

  res.json({ contact });
});

export const updateContactStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const existing = await prisma.contact.findUnique({ where: { id } });
  if (!existing) throw new AppError(404, 'Contact not found');

  const contact = await prisma.contact.update({
    where: { id },
    data: { status },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'UPDATE_CONTACT_STATUS',
      entity: 'Contact',
      entityId: contact.id,
      oldData: { status: existing.status },
      newData: { status: contact.status },
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ contact });
});