const { myLogger } = require('../utils/winstonLogger');

const errorHandler = (err, req, res, next) => {
  const status = res.status ? res.status : 500;
  const message =
    err?.message?.length > 0 ? err?.message : 'An unknown error occurred.';
  const stackTrace = process.env.NODE_ENV === 'production' ? null : err?.stack;

  myLogger.error(message, err); // log to file

  res.status(status).json({
    message: message,
    stack: stackTrace,
  });
};

module.exports = {
  errorHandler,
};
