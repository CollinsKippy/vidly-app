const { Customer } = require('../models/Customer');
const { Movie } = require('../models/Movie');
const { Rental, rentalJoiValidator } = require('../models/Rental');

/**
 * Returns list of rentals
 * @method GET
 * @route /api/rentals
 * @param {any} req request object
 * @param {any} res response object
 * @returns List of Rentals
 */
const getRentals = async (req, res) => {
  try {
    const rentals = await Rental.find();
    return res.status(200).json(rentals);
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving rentals: ' + error?.message,
    });
  }
};

/**
 * Returns single rental
 * @method GET
 * @route /api/rentals/:id
 * @param {any} req request object
 * @param {any} res response object
 * @returns Single Rental
 */
const getSingleRental = async (req, res) => {
  try {
    const id = req.params.id;

    const rental = await Rental.findById(id);

    if (!rental) {
      res.status(404);
      throw new Error(`Rental with id ${id} not found.`);
    }

    return res.status(200).json(rental);
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving rental: ' + error?.message,
    });
  }
};

/**
 * Creates new rental
 * @method POST
 * @route /api/rentals
 * @param {any} req request object
 * @param {any} res response object
 * @returns New of Rental
 */
const createRental = async (req, res) => {
  try {
    const value = await rentalJoiValidator.validateAsync(req.body);

    const customerId = req.body.customerId;
    const movieId = req.body.movieId;
    const numberOfDays = req.body.numberOfDays;

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) {
      res.status(404);
      throw new Error(`Customer with id: ${customerId} not found.`);
    }

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) {
      res.status(404);
      throw new Error(`Movie with id: ${movieId} not found.`);
    }

    const rental = await Rental.create({
      customer: {
        name: customer.firstName + ' ' + customer.lastName,
        phoneNumber: customer.phoneNumber,
      },
      movie: {
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
      },
      dateIssued: Date.now(),
      numberOfDays: numberOfDays,
      rentalFee: movie.dailyRentalRate * numberOfDays,
    });

    return res.status(200).json(rental);
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating rental: ' + error?.message,
    });
  }
};

/**
 * Update rental
 * @method PUT
 * @route /api/rentals/:id
 * @param {any} req request object
 * @param {any} res response object
 * @returns List of Rentals
 */
const updateRental = async (req, res) => {
  try {
    const value = await rentalJoiValidator.validateAsync(req.body);

    const id = req.params.id;
    const customerId = req.body.customerId;
    const movieId = req.body.movieId;
    const numberOfDays = req.body.numberOfDays;

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) {
      res.status(404);
      throw new Error(`Customer with id: ${customerId} not found.`);
    }

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) {
      res.status(404);
      throw new Error(`Movie with id: ${movieId} not found.`);
    }

    const rental = await Rental.findByIdAndUpdate(
      id,
      {
        customer: {
          name: customer.firstName + ' ' + customer.lastName,
          phoneNumber: customer.phoneNumber,
        },
        movie: {
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate,
        },
        dateIssued: Date.now(),
        numberOfDays: numberOfDays,
        rentalFee: movie.dailyRentalRate * numberOfDays,
      },
      { new: true }
    );

    if (!rental) {
      res.status(404);
      throw new Error(`Rental with id: ${rentalId} not found.`);
    }

    return res.status(200).json(rental);
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating rental: ' + error?.message,
    });
  }
};

/**
 * Deletes a rental
 * @method DELETE
 * @route /api/rental/:id
 * @param {any} req request object
 * @param {any} res response object
 * @returns Deleted Rental
 */
const deleteRental = async (req, res) => {
  try {
    const id = req.params.id;

    const rental = await Rental.findByIdAndRemove(id);
    if (!rental) {
      res.status(400);
      throw new Error(`Rental with id ${id} not found.`);
    }

    return res.status(200).json(rental);
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting rental: ' + error?.message,
    });
  }
};

module.exports = {
  getRentals,
  getSingleRental,
  createRental,
  updateRental,
  deleteRental,
};
