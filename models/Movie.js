const mongoose = require('mongoose');

const { Genre } = require('./Genre');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, 'Movie title is required.'],
    minlength: 3,
    maxlength: 56,
  },
  genre: Genre.schema,
  numberAvailable: {
    type: Number,
    required: [true, 'Number of copies available is required'],
    min: 0,
  },
  dailyRentalRate: {
    type: Number,
    required: [true, 'Daily rental rate is required.'],
    min: 0,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = {
  Movie,
};
