const mongoose = require('mongoose');
const { myLogger } = require('../utils/winstonLogger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
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
