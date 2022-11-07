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
    minLength: 6,
    maxLength: 96,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 1024,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

/**
 * User Register API Form Validation
 */

const userRegisterValidator = Joi.object({
  name: Joi.string().alphanum().min(6).max(30).required(),
  email: Joi.string().email().min(6).max(96).required(),
  password: Joi.string()
    .min(6)
    .max(96)
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{5,96}$')),
  confirmPassword: Joi.ref('password'),
});

const userLoginValidator = Joi.object({
  email: Joi.string().email().min(6).max(96).required(),
  password: Joi.string().required(),
});

module.exports = {
  User,
  userRegisterValidator,
  userLoginValidator,
};
