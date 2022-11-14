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
      maxSize: '2m',
      maxFiles: '1d',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '2m',
      maxFiles: '1d',
    }),
    new winston.transports.MongoDB({
      db: process.env.MONGO_URI_LOG,
      level: 'error',
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' }),
  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  myLogger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = {
  myLogger,
};
