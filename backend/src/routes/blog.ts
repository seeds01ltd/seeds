import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import * as blogController from '../controllers/blog.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.get('/', blogController.getPosts);
router.get('/tags', blogController.getTags);
router.get('/featured', blogController.getFeaturedPosts);
router.get('/categories', blogController.getCategories);
router.get('/:slug', [param('slug').isString()], validate, blogController.getPostBySlug);

router.post(
  '/',
  authMiddleware('ADMIN', 'MANAGER'),
  [
    body('slug').isString().matches(/^[a-z0-9-]+$/),
    body('title').trim().isLength({ min: 1, max: 200 }),
    body('excerpt').trim().isLength({ min: 1, max: 500 }),
    body('category').trim().isLength({ min: 1 }),
    body('author').trim().isLength({ min: 1 }),
    body('authorInitials').trim().isLength({ min: 1, max: 10 }),
    body('readTime').trim().isLength({ min: 1 }),
    body('tags').isArray(),
    body('image').isURL(),
    body('content').isString(),
  ],
  validate,
  blogController.createPost
);

router.put(
  '/:slug',
  authMiddleware('ADMIN', 'MANAGER'),
  [param('slug').isString()],
  validate,
  blogController.updatePost
);

router.delete(
  '/:slug',
  authMiddleware('ADMIN'),
  [param('slug').isString()],
  validate,
  blogController.deletePost
);

export default router;