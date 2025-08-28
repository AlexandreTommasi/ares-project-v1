import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../errors/ApiError';
import logger from '../logging/logger';
import config from '@/config';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Erro de validação',
      errors: err.errors.map(e => ({ path: e.path.join('.'), message: e.message })),
    });
  }

  const statusCode = 500;
  const message = config.nodeEnv === 'production' ? 'Ocorreu um erro interno no servidor.' : err.message;

  return res.status(statusCode).json({ message });
};
