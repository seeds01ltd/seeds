import { z } from 'zod';

export const createPostSchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(500),
  category: z.string().min(1).max(50),
  author: z.string().min(1).max(100),
  authorInitials: z.string().min(1).max(10),
  date: z.string().datetime().optional(),
  readTime: z.string().min(1).max(20),
  tags: z.array(z.string()),
  image: z.string().url(),
  content: z.string().min(1),
  featured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});

export const updatePostSchema = createPostSchema.partial();