import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { authMiddleware } from '../middleware/auth.js';
import * as serviceController from '../controllers/services.js';

const router = Router();

router.get('/', serviceController.getServices);

router.get('/featured', serviceController.getFeaturedServices);

router.get('/categories', serviceController.getCategories);

router.get('/:slug', [param('slug').isString()], validate, serviceController.getServiceBySlug);

router.post(
  '/',
  authMiddleware('ADMIN', 'MANAGER'),
  [
    body('slug').isString().matches(/^[a-z0-9-]+$/),
    body('icon').isString(),
    body('title').isString().isLength({ min: 1, max: 100 }),
    body('tagline').isString().isLength({ min: 1, max: 200 }),
    body('color').matches(/^#[0-9A-Fa-f]{6}$/),
    body('image').isURL(),
    body('video').optional().isURL(),
    body('description').isString(),
    body('content').optional().isString(),
    body('tech').isArray(),
    body('featured').optional().isBoolean(),
    body('order').optional().isInt(),
    body('categories').optional().isArray(),
  ],
  validate,
  serviceController.createService
);

router.put(
  '/:slug',
  authMiddleware('ADMIN', 'MANAGER'),
  [param('slug').isString()],
  validate,
  serviceController.updateService
);

router.delete(
  '/:slug',
  authMiddleware('ADMIN', 'MANAGER'),
  [param('slug').isString()],
  validate,
  serviceController.deleteService
);

export default router;