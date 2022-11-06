const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
  customer: new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Customer Name is required.'],
      minlength: 3,
      maxlength: 40,
    },
    phoneNumber: {
      type: String,
      minlength: 7,
      maxlength: 15,
      required: [true, 'Phone Number is required.'],
    },
  }),
  movie: new mongoose.Schema({
    title: {
      type: String,
      require: [true, 'Movie title is required.'],
      minlength: 3,
      maxlength: 56,
    },
    dailyRentalRate: {
      type: Number,
      required: [true, 'Daily rental rate is required.'],
      min: 0,
    },
  }),
  dateIssued: {
    // set at ctrl level
    type: Date,
    required: true,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    required: true,
    min: 0,
    max: 1000,
  },
  numberOfDays: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Rental = mongoose.model('Rental', rentalSchema);

const rentalJoiValidator = Joi.object({
  customerId: Joi.required(),
  movieId: Joi.required(),
  numberOfDays: Joi.required().integer(),
});

module.exports = {
  Rental,
  rentalJoiValidator,
};
