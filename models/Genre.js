const mongoose = require('mongoose');
const Joi = require('joi');

/**
 * Genre Schema and Model
 */
const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: [true, 'Name of Genre is required.'],
    },
  },
  {
    timestamps: true,
  }
);

const Genre = mongoose.model('Genre', genreSchema);

/**
 * Genre Schema Validator
 */
const genreJoiValidator = Joi.object({
  name: Joi.string().min(3).max(20).required(),
});

module.exports = {
  Genre,
  genreJoiValidator,
};
