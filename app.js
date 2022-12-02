const express = require('express');
const colors = require('colors');
require('dotenv').config();

const app = express();

require('./utils/jwtChecker')();
require('./startup/logging')();
require('./startup/database')();
require('./startup/routes')(app);

module.exports = app;
