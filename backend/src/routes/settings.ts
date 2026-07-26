import { Router } from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validate.js';
import * as settingsController from '../controllers/settings.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', settingsController.getSettings);
router.get('/:key', [param('key').isString()], validate, settingsController.getSetting);
router.put(
  '/:key',
  authMiddleware('ADMIN', 'MANAGER'),
  [param('key').isString(), body('value').notEmpty()],
  validate,
  settingsController.updateSetting
);
router.delete(
  '/:key',
  authMiddleware('ADMIN'),
  [param('key').isString()],
  validate,
  settingsController.deleteSetting
);

export default router;