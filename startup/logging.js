const { myLogger } = require('../utils/winstonLogger');

module.exports = function () {
  process.on('uncaughtException', (ex) => {
    myLogger.error(ex?.message, ex);
    process.exit(1);
  });

  process.on('unhandledRejection', (ex) => {
    throw ex; // to be caught by 'uncaughtException' process above.
  });
};
