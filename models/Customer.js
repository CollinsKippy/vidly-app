const mongoose = require('mongoose');
const Joi = require('joi');

/**
 * Customer Schema
 */
const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required.'],
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required.'],
      minlength: 3,
      maxlength: 20,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 7,
      maxlength: 15,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model('Customer', customerSchema);

/**
 * Customer Validator
 */
const customerJoiValidator = Joi.object({
  firstName: Joi.string().min(3).max(20).required(),
  lastName: Joi.string().min(3).max(20).required(),
  isGold: Joi.boolean(),
  phoneNumber: Joi.string().min(7).max(15),
});

module.exports = {
  Customer,
  customerJoiValidator,
};
