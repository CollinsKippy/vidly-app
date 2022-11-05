const mongoose = require('mongoose');
const Joi = require('joi');

const { Genre } = require('./Genre');

/**
 * Movie Schema and Model
 */
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, 'Movie title is required.'],
      minlength: 3,
      maxlength: 56,
    },
    genre: {
      type: Genre.schema,
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);

const movieJoiValidator = Joi.object({
  title: Joi.string().min(3).max(56).required(),
  numberAvailable: Joi.number().integer().min(0).required(),
  dailyRentalRate: Joi.number().min(0).required(),
  genre: Joi.required(),
});

module.exports = {
  Movie,
  movieJoiValidator,
};
