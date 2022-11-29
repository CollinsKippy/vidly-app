const mongoose = require('mongoose');
const { myLogger } = require('../utils/winstonLogger');

const connectDB = async () => {
  let connectionString;
  if (process.env.NODE_ENV === 'production') {
    connectionString = process.env.MONGO_URI; // create uri for 'prod'
  } else if (process.env.NODE_ENV === 'test') {
    connectionString = process.env.MONGO_URI_TEST;
  } else {
    connectionString = process.env.MONGO_URI;
  }

  try {
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to DB: 😁`.cyan, conn.connection.name);
    myLogger.info(`Connected to DB: ${conn?.connection?.name}`);
  } catch (err) {
    myLogger.error('Error connecting to DB.');
  }
};

module.exports = connectDB;
