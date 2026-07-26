import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authMiddleware } from '../middleware/auth.js';
import * as portfolioController from '../controllers/portfolio.js';

const router = Router();

router.get('/', portfolioController.getProjects);
router.get('/featured', portfolioController.getFeaturedProjects);
router.get('/:slug', [param('slug').isString()], validate, portfolioController.getProjectBySlug);

router.post(
  '/',
  authMiddleware('ADMIN', 'MANAGER'),
  [
    body('slug').isString().matches(/^[a-z0-9-]+$/),
    body('title').isString().isLength({ min: 1, max: 100 }),
    body('client').isString().isLength({ min: 1, max: 100 }),
    body('industry').isString().isLength({ min: 1, max: 100 }),
    body('color').matches(/^#[0-9A-Fa-f]{6}$/),
    body('icon').isString(),
    body('image').isURL(),
    body('summary').isString(),
    body('tech').isArray(),
    body('results').isArray(),
    body('featured').optional().isBoolean(),
    body('order').optional().isInt(),
  ],
  validate,
  portfolioController.createProject
);

router.put(
  '/:slug',
  authMiddleware('ADMIN', 'MANAGER'),
  [param('slug').isString()],
  validate,
  portfolioController.updateProject
);

router.delete(
  '/:slug',
  authMiddleware('ADMIN', 'MANAGER'),
  [param('slug').isString()],
  validate,
  portfolioController.deleteProject
);

export default router;