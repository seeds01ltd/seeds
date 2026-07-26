import { z } from 'zod';

export const createProjectSchema = z.object({
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(100),
  client: z.string().min(1).max(100),
  industry: z.string().min(1).max(100),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  icon: z.string().min(1),
  image: z.string().url(),
  summary: z.string().min(1),
  content: z.string().optional(),
  tech: z.array(z.string()),
  results: z.array(z.object({
    metric: z.string(),
    label: z.string(),
  })),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const updateProjectSchema = createProjectSchema.partial();