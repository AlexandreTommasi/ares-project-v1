import sql from 'mssql';
import config from '@/config';
import logger from '@/core/logging/logger';

const sqlConfig: sql.config = {
  user: config.database.user,
  password: config.database.password,
  server: config.database.server,
  database: config.database.database,
  port: config.database.port,
  options: {
    encrypt: config.database.options.encrypt,
    trustServerCertificate: config.database.options.trustServerCertificate,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool: sql.ConnectionPool;

export const getDatabasePool = async (): Promise<sql.ConnectionPool> => {
  if (pool && pool.connected) {
    return pool;
  }
  try {
    pool = await new sql.ConnectionPool(sqlConfig).connect();
    logger.info('Pool de conexões com o SQL Server estabelecido com sucesso.');
    return pool;
  } catch (err) {
    logger.error('Erro ao conectar ao SQL Server:', err);
    throw err;
  }
};

export const testDatabaseConnection = async () => {
  try {
    const pool = await getDatabasePool();
    if (pool.connected) {
      logger.info('Conexão com o banco de dados SQL Server bem-sucedida.');
    } else {
      logger.error('Falha ao conectar com o banco de dados: pool não está conectado.');
    }
  } catch (error) {
    logger.error('Falha ao testar a conexão com o banco de dados:', error);
  }
};

export const closeDatabaseConnection = async () => {
  if (pool && pool.connected) {
    await pool.close();
    logger.info('Pool de conexões com o SQL Server encerrado.');
  }
};
