const mongoose = require('mongoose');
const Joi = require('joi');

/**
 * Genre Schema and Model
 */
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'Name of Genre is required.'],
  },
});

const Genre = mongoose.model('Genre', genreSchema);

/**
 * Genre Schema Validator
 */
const genreSchemaValidator = Joi.object({
  name: Joi.string().min(3).required(),
});

module.exports = {
  Genre,
  genreSchemaValidator,
};
