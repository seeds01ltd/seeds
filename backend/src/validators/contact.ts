import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(5000),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export const quoteSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  projectTitle: z.string().min(5).max(200),
  projectDescription: z.string().min(20).max(5000),
  serviceCategory: z.string().min(1),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  preferredTech: z.array(z.string()).optional(),
  ndaRequired: z.boolean().default(false),
  attachments: z.array(z.string().url()).max(5).optional(),
});