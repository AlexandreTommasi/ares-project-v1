import 'dotenv/config';
import app from './app';
import config from './config';
import logger from './core/logging/logger';
import { closeDatabaseConnection, testDatabaseConnection } from './database/connection';

const server = app.listen(config.port, async () => {
  logger.info(`Servidor executando na porta ${config.port} em modo ${config.nodeEnv}`);
  await testDatabaseConnection();
});

const gracefulShutdown = (signal: string) => {
  process.on(signal, async () => {
    logger.info(`${signal} recebido. Encerrando a aplicação...`);
    server.close(async () => {
      logger.info('Servidor HTTP encerrado.');
      await closeDatabaseConnection();
      process.exit(0);
    });
  });
};

gracefulShutdown('SIGTERM');
gracefulShutdown('SIGINT');
