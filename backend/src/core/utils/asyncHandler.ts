import { Request, Response, NextFunction, RequestHandler } from 'express';

// Este wrapper garante que qualquer erro em uma rota assíncrona
// seja capturado e passado para o próximo middleware (o nosso errorHandler).
export const asyncHandler = (fn: RequestHandler) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
