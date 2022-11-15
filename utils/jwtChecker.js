const { myLogger } = require('./winstonLogger');

module.exports = function () {
  if (!process.env.JWT_PRIVATE_KEY) {
    myLogger.error('ERROR: JWT_PRIVATE_KEY is not defined.');
    process.exit(1);
  }
};
