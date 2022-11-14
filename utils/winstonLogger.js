const winston = require('winston');
require('winston-mongodb');
require('winston-daily-rotate-file');

const myLogger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.DailyRotateFile({
      level: 'error',
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new winston.transports.MongoDB({
      db: process.env.MONGO_URI_LOG,
      level: 'error',
    }),
  ],
});

module.exports = {
  myLogger,
};
