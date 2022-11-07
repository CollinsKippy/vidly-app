const mongoose = require('mongoose');
const Joi = require('Joi');

/**
 * User Schema
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 6,
    maxLength: 20,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 32,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

/**
 * User Register API Validation
 */

const userRegisterValidator = Joi.object({
  name: Joi.alphanum().min(6).max(20).required(),
  email: Joi.alphanum().required(),
  password: Joi.string().min(6).max(32).required(),
});

const userLoginValidator = Joi.object({
  email: Joi.alphanum().required(),
  password: Joi.string().min(6).max(32).required(),
});

module.exports = {
  User,
  userRegisterValidator,
  userLoginValidator,
};
