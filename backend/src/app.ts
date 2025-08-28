import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { requestLogger } from './core/middleware/requestLogger';
import { errorHandler } from './core/middleware/errorHandler';
import { notFoundHandler } from './core/middleware/notFoundHandler';
import apiRouter from './routes';
import config from './config';

const app: Application = express();

// Middlewares de segurança e utilitários
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de log de requisições
app.use(requestLogger);

// Rota de Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Rotas da API
app.use(config.api.prefix, apiRouter);

// Middlewares de tratamento de erros (devem ser os últimos)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
