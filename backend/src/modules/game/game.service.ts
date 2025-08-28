import crypto from 'crypto';
import { GameConfig, GameSession } from './game.types';
import logger from '@/core/logging/logger';
import { BadRequestError } from '@/core/errors/BadRequestError';

// Armazenamento em memória para a configuração do jogo.
// Em uma aplicação real, isso seria guardado em um banco de dados ou arquivo de configuração.
let gameConfig: GameConfig = {
  minRange: 1,
  maxRange: 100,
};

// Armazenamento em memória para as sessões de jogo ativas.
// Em uma aplicação real, seria um cache distribuído como Redis.
const activeSessions = new Map<string, GameSession>();

/**
 * Recupera a configuração atual do jogo.
 * @returns A configuração atual do jogo.
 */
export const getGameConfigService = async (): Promise<GameConfig> => {
  // Simula a busca de um cache ou banco de dados.
  return Promise.resolve(gameConfig);
};

/**
 * Atualiza a configuração do jogo.
 * @param newConfig - Os novos valores de configuração.
 * @returns A configuração do jogo atualizada.
 */
export const updateGameConfigService = async (newConfig: GameConfig): Promise<GameConfig> => {
  // A validação (min < max) já é tratada pelo Zod, mas podemos verificar novamente.
  if (newConfig.minRange >= newConfig.maxRange) {
    throw new BadRequestError('O valor mínimo deve ser menor que o valor máximo.');
  }
  gameConfig = { ...newConfig };
  logger.info(`Configuração do jogo atualizada: ${JSON.stringify(gameConfig)}`);
  // Em uma aplicação real, aqui você invalidaria o cache.
  return Promise.resolve(gameConfig);
};

/**
 * Inicia uma nova sessão de jogo.
 * Gera um número secreto e armazena a sessão.
 * @returns O ID da sessão recém-criada.
 */
export const startGameService = async (): Promise<{ sessionId: string }> => {
  const { minRange, maxRange } = await getGameConfigService();

  // Gera um número aleatório criptograficamente seguro.
  const secretNumber = crypto.randomInt(minRange, maxRange + 1);
  
  const sessionId = crypto.randomUUID();

  const newSession: GameSession = {
    sessionId,
    secretNumber,
    attempts: 0,
    startTime: new Date(),
    isFinished: false,
  };

  activeSessions.set(sessionId, newSession);

  // Log para fins de auditoria, garantindo acesso restrito a esses logs.
  logger.info(`Novo jogo iniciado. SessionID: ${sessionId}, SecretNumber: ${secretNumber}`);

  return { sessionId };
};
