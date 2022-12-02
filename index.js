const { myLogger } = require('./utils/winstonLogger');

const port = process.env.PORT || 5000;

const app = require('./app');

app.listen(port, () => myLogger.info(`listening on port: ${port}.`));
