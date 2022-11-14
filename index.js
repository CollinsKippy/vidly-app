const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorHandler');
const { myLogger } = require('./utils/winstonLogger');

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Environment Variable Check
if (!process.env.JWT_PRIVATE_KEY) {
  console.log(`FATAL ERROR: JWT_PRIVATE_KEY is not defined.`.red);
  myLogger.error('FATAL ERROR: JWT_PRIVATE_KEY is not defined.');
  process.exit(1);
}

// Uncaught Exception
process.on('uncaughtException', (ex) => {
  console.log(`${ex?.message}`.red);
  myLogger.error(ex?.message, ex);
  process.exit(1);
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (ex) => {
  console.log(`${ex?.message}`.red);
  myLogger.error(ex?.message, ex);
  process.exit(1);
});

// connect mongoose
async function connectMongoDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to DB: 😁`.cyan, conn.connection.name);
    // myLogger.info(`Connected to DB: ${conn?.connection?.name}`);
  } catch (err) {
    console.log('Error connecting to DB'.bgRed, err);
  }
}

connectMongoDB();

app.get('/', (req, res) => res.send(`Vidly App Server is running`));

app.use('/api/genres', require('./routes/genreRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/rentals', require('./routes/rentalRoute'));
app.use('/api/customers', require('./routes/customerRoute'));
app.use('/api/users', require('./routes/userRoute'));

app.use(errorHandler);

app.listen(port, () => console.log(`listening on port: ${port}.`));
