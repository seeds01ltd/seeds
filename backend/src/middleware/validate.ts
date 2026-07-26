import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from './errorHandler.js';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const formattedErrors = errors.array().map(err => ({
    field: 'path' in err ? (err as any).path : 'unknown',
    message: err.msg,
  }));

  return next(new AppError(400, 'Validation failed', true, formattedErrors));
};