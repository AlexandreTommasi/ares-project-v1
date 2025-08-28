import winston from 'winston';
import config from '@/config';

const { combine, timestamp, printf, colorize, align } = winston.format;

const logger = winston.createLogger({
  level: config.log.level,
  format: combine(
    colorize({ all: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
