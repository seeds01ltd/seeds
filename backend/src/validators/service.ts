import { z } from 'zod';

export const createServiceSchema = z.object({
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  icon: z.string().min(1),
  title: z.string().min(1).max(100),
  tagline: z.string().min(1).max(200),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  image: z.string().url(),
  video: z.string().url().optional(),
  description: z.string().min(1),
  content: z.string().optional(),
  tech: z.array(z.string()),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const updateServiceSchema = createServiceSchema.partial();

export const createCategorySchema = z.object({
  title: z.string().min(1).max(100),
});