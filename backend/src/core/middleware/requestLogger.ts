import { Request, Response, NextFunction } from 'express';
import logger from '../logging/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, ip } = req;
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    logger.info(`${method} ${url} ${statusCode} - ${duration}ms - IP: ${ip}`);
  });

  next();
};
