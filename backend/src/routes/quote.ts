import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { validate } from '../middleware/validate.js';
import * as quoteController from '../controllers/quote.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post(
  '/',
  [
    body('name').trim().isLength({ min: 2, max: 100 }),
    body('email').isEmail().normalizeEmail(),
    body('projectTitle').trim().isLength({ min: 5, max: 200 }),
    body('projectDescription').trim().isLength({ min: 20, max: 5000 }),
    body('serviceCategory').trim().isLength({ min: 1 }),
    body('company').optional().trim().isLength({ max: 100 }),
    body('phone').optional().trim().isLength({ max: 20 }),
    body('budget').optional().trim(),
    body('timeline').optional().trim(),
    body('preferredTech').optional().isArray(),
    body('ndaRequired').optional().isBoolean(),
    body('attachments').optional().isArray(),
  ],
  validate,
  quoteController.submitQuote
);

router.get(
  '/',
  authMiddleware('ADMIN', 'MANAGER'),
  [
    query('status').optional().isIn(['PENDING', 'REVIEWING', 'QUOTED', 'ACCEPTED', 'REJECTED', 'EXPIRED']),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
  ],
  validate,
  quoteController.getQuotes
);

router.get(
  '/:id',
  authMiddleware('ADMIN', 'MANAGER'),
  [param('id').isString()],
  validate,
  quoteController.getQuoteById
);

router.put(
  '/:id/status',
  authMiddleware('ADMIN', 'MANAGER'),
  [param('id').isString(), body('status').isIn(['PENDING', 'REVIEWING', 'QUOTED', 'ACCEPTED', 'REJECTED', 'EXPIRED'])],
  validate,
  quoteController.updateQuoteStatus
);

export default router;