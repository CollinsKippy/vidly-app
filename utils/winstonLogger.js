const winston = require('winston');
require('winston-mongodb');

const myLogger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log', level: 'info' }),
    new winston.transports.MongoDB({
      db: process.env.MONGO_URI_LOG,
    }),
  ],
});

module.exports = {
  myLogger,
};
