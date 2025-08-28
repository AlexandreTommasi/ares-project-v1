import 'dotenv/config';

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  api: {
    prefix: process.env.API_PREFIX || '/api/v1',
  },
  database: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT) || 1433,
    options: {
      encrypt: process.env.NODE_ENV === 'production',
      trustServerCertificate: process.env.DB_OPTIONS_TRUST_SERVER_CERTIFICATE === 'true',
    },
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'default-secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

export default config;
