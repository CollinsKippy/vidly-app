const express = require('express');
const { errorHandler } = require('../middleware/errorHandler');

const routeManager = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => res.send(`Vidly App Server is running`));

  app.use('/api/genres', require('../routes/genreRoutes'));
  app.use('/api/movies', require('../routes/movieRoutes'));
  app.use('/api/rentals', require('../routes/rentalRoute'));
  app.use('/api/customers', require('../routes/customerRoute'));
  app.use('/api/users', require('../routes/userRoute'));
  app.use(errorHandler);
};

module.exports = routeManager;
