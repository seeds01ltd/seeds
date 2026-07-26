import { Router } from 'express';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validate.js';
import * as teamController from '../controllers/team.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', teamController.getTeamMembers);
router.get('/timeline', teamController.getTimeline);

router.get('/:id', [param('id').isString()], validate, teamController.getTeamMemberById);

router.post(
  '/',
  authMiddleware('ADMIN', 'MANAGER'),
  [
    body('name').trim().isLength({ min: 1 }),
    body('role').trim().isLength({ min: 1 }),
    body('bio').trim().isLength({ min: 1 }),
    body('avatar').isString(),
    body('specialties').isArray(),
    body('linkedin').optional().isURL(),
    body('github').optional().isURL(),
    body('order').optional().isInt(),
  ],
  validate,
  teamController.createTeamMember
);

router.put(
  '/:id',
  authMiddleware('ADMIN', 'MANAGER'),
  [param('id').isString()],
  validate,
  teamController.updateTeamMember
);

router.delete(
  '/:id',
  authMiddleware('ADMIN'),
  [param('id').isString()],
  validate,
  teamController.deleteTeamMember
);

router.post(
  '/timeline',
  authMiddleware('ADMIN', 'MANAGER'),
  [
    body('year').trim().isLength({ min: 1 }),
    body('title').trim().isLength({ min: 1 }),
    body('desc').trim().isLength({ min: 1 }),
    body('icon').isString(),
    body('order').optional().isInt(),
  ],
  validate,
  teamController.createTimeline
);

router.put(
  '/timeline/:id',
  authMiddleware('ADMIN', 'MANAGER'),
  [param('id').isString()],
  validate,
  teamController.updateTimeline
);

router.delete(
  '/timeline/:id',
  authMiddleware('ADMIN'),
  [param('id').isString()],
  validate,
  teamController.deleteTimeline
);

export default router;