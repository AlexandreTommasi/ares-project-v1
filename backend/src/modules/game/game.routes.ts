import { Router } from 'express';
import { asyncHandler } from '@/core/utils/asyncHandler';
import { validateRequest } from '@/core/middleware/validateRequest';
import { authenticate, authorize } from '@/modules/auth/auth.middleware';
import { UserRole } from '@/modules/auth/auth.types';
import * as gameController from './game.controller';
import { updateConfigSchema } from './game.validation';

const router = Router();

// Aplica o middleware de autenticação a todas as rotas do jogo
router.use(authenticate);

// Endpoint para iniciar um novo jogo (acessível a qualquer jogador)
router.post(
  '/start',
  asyncHandler(gameController.startGame)
);

// Endpoint para obter a configuração do jogo (apenas administradores)
router.get(
  '/config',
  authorize([UserRole.Admin]),
  asyncHandler(gameController.getGameConfig)
);

// Endpoint para atualizar a configuração do jogo (apenas administradores)
router.put(
  '/config',
  authorize([UserRole.Admin]),
  validateRequest(updateConfigSchema),
  asyncHandler(gameController.updateGameConfig)
);

export default router;
