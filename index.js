const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect mongoose
async function connectMongoDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to DB:`.cyan, conn.connection.name);
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

app.use(errorHandler);
console.log('😊');

app.listen(port, () => console.log('listening on port', port));
