const mongoose = require('mongoose');
const Joi = require('Joi');
const jwt = require('jsonwebtoken');

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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  roles: {
    type: [String], // e.g Moderator, Editor, etc.
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { sub: this._id, isAdmin: this.isAdmin },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: '1h',
    }
  );
};

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
