const express = require('express');
const colors = require('colors');
require('dotenv').config();
const { myLogger } = require('./utils/winstonLogger');

const app = express();
const port = process.env.PORT || 5000;

require('./utils/jwtChecker')();
require('./startup/logging')();
require('./startup/database')();
require('./startup/routes')(app);

app.listen(port, () => myLogger.info(`listening on port: ${port}.`));
