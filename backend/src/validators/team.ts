import { z } from 'zod';

export const createTeamMemberSchema = z.object({
  name: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  bio: z.string().min(1).max(2000),
  avatar: z.string().min(1),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  specialties: z.array(z.string()),
  order: z.number().int().default(0),
});

export const updateTeamMemberSchema = createTeamMemberSchema.partial();

export const createTimelineSchema = z.object({
  year: z.string().min(1).max(10),
  title: z.string().min(1).max(100),
  desc: z.string().min(1).max(500),
  icon: z.string().min(1),
  order: z.number().int().default(0),
});

export const updateTimelineSchema = createTimelineSchema.partial();