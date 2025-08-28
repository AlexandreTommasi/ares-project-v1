import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '@/core/errors/UnauthorizedError';
import { ForbiddenError } from '@/core/errors/ForbiddenError';
import { UserRole } from './auth.types';

/**
 * Middleware de autenticação mock.
 * Em uma aplicação real, validaria um JWT ou token de sessão.
 * Para fins de demonstração, verifica um header 'x-user-role'.
 * Se o header não for fornecido, assume o papel de 'Player' convidado.
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const roleHeader = req.headers['x-user-role'] as UserRole;
  const userIdHeader = req.headers['x-user-id'] as string || `guest-${Date.now()}`;

  if (roleHeader && Object.values(UserRole).includes(roleHeader)) {
    req.user = {
      id: userIdHeader,
      role: roleHeader,
    };
  } else {
    // Por padrão, trata como um jogador convidado se nenhum papel for fornecido
    req.user = {
      id: userIdHeader,
      role: UserRole.Player,
    };
  }
  next();
};

/**
 * Middleware de autorização.
 * Verifica se o usuário autenticado possui um dos papéis permitidos.
 * @param allowedRoles - Um array de papéis que têm permissão para acessar a rota.
 */
export const authorize = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError('Autenticação necessária para acessar este recurso.'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError('Você não tem permissão para executar esta ação.'));
    }

    next();
  };
};
