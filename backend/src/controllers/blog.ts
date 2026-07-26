import { Response } from 'express';
import prisma from '../lib/prisma.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export const getPosts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { featured, published = 'true', category, tag, page = '1', limit = '10' } = req.query;

  const where: any = { isPublished: published === 'true' };
  if (featured === 'true') where.featured = true;
  if (category) where.category = category;
  if (tag) where.tags = { has: tag };

  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const take = parseInt(limit as string);

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip,
      take,
    }),
    prisma.blogPost.count({ where }),
  ]);

  res.json({ posts, total, page: parseInt(page as string), limit: take });
});

export const getFeaturedPosts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const posts = await prisma.blogPost.findMany({
    where: { featured: true, isPublished: true },
    orderBy: { publishedAt: 'desc' },
    take: 6,
  });
  res.json({ posts });
});

export const getCategories = asyncHandler(async (req: AuthRequest, res: Response) => {
  const categories = await prisma.blogPost.groupBy({
    by: ['category'],
    where: { isPublished: true },
    _count: { category: true },
    orderBy: { _count: { category: 'desc' } },
  });
  res.json({ categories: categories.map(c => ({ name: c.category, count: c._count.category })) });
});

export const getTags = asyncHandler(async (req: AuthRequest, res: Response) => {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    select: { tags: true },
  });
  const tagCounts: Record<string, number> = {};
  posts.forEach(p => p.tags.forEach(t => tagCounts[t] = (tagCounts[t] || 0) + 1));
  const tags = Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
  res.json({ tags });
});

export const getPostBySlug = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { slug } = req.params;

  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) throw new AppError(404, 'Post not found');

  res.json({ post });
});

export const createPost = asyncHandler(async (req: AuthRequest, res: Response) => {
  const data = req.body;
  const postData = {
    ...data,
    date: data.date ? new Date(data.date) : new Date(),
    publishedAt: data.isPublished ? new Date() : null,
  };

  const post = await prisma.blogPost.create({ data: postData });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'CREATE_POST',
      entity: 'BlogPost',
      entityId: post.id,
      newData: post,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.status(201).json({ post });
});

export const updatePost = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { slug } = req.params;

  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (!existing) throw new AppError(404, 'Post not found');

  const data = req.body;
  const postData = {
    ...data,
    date: data.date ? new Date(data.date) : existing.date,
    publishedAt: data.isPublished && !existing.isPublished ? new Date() : existing.publishedAt,
  };

  const post = await prisma.blogPost.update({ where: { slug }, data: postData });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'UPDATE_POST',
      entity: 'BlogPost',
      entityId: post.id,
      oldData: existing,
      newData: post,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ post });
});

export const deletePost = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { slug } = req.params;

  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (!existing) throw new AppError(404, 'Post not found');

  await prisma.blogPost.delete({ where: { slug } });

  await prisma.auditLog.create({
    data: {
      userId: req.user!.id,
      action: 'DELETE_POST',
      entity: 'BlogPost',
      entityId: existing.id,
      oldData: existing,
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
    },
  });

  res.json({ message: 'Post deleted' });
});