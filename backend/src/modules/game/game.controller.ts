import { Request, Response } from 'express';
import * as gameService from './game.service';

export const startGame = async (req: Request, res: Response) => {
  const { sessionId } = await gameService.startGameService();
  res.status(201).json({ message: 'Novo jogo iniciado com sucesso!', sessionId });
};

export const getGameConfig = async (req: Request, res: Response) => {
  const config = await gameService.getGameConfigService();
  res.status(200).json(config);
};

export const updateGameConfig = async (req: Request, res: Response) => {
  const updatedConfig = await gameService.updateGameConfigService(req.body);
  res.status(200).json({ message: 'Configuração atualizada com sucesso!', config: updatedConfig });
};
