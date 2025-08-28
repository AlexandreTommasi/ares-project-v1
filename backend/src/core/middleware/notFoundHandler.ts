import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/NotFoundError';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new NotFoundError(`A rota '${req.method} ${req.originalUrl}' não foi encontrada.`);
  next(error);
};
