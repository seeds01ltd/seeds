import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.js';
import * as contactController from '../controllers/contact.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post(
  '/',
  [
    body('name').trim().isLength({ min: 2, max: 100 }),
    body('email').isEmail().normalizeEmail(),
    body('subject').trim().isLength({ min: 5, max: 200 }),
    body('message').trim().isLength({ min: 10, max: 5000 }),
    body('company').optional().trim().isLength({ max: 100 }),
    body('budget').optional().trim(),
    body('timeline').optional().trim(),
  ],
  validate,
  contactController.submitContact
);

router.get(
  '/',
  authMiddleware('ADMIN', 'MANAGER'),
  contactController.getContacts
);

router.get(
  '/:id',
  authMiddleware('ADMIN', 'MANAGER'),
  contactController.getContactById
);

router.put(
  '/:id/status',
  authMiddleware('ADMIN', 'MANAGER'),
  [body('status').isIn(['NEW', 'READ', 'REPLIED', 'CLOSED'])],
  validate,
  contactController.updateContactStatus
);

export default router;