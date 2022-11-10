const { asyncHandler } = require('../middleware/asyncHandler');
const { Movie, movieJoiValidator } = require('../models/Movie');

/**
 * Get List of Movies
 * @route /api/movies
 * @method GET
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns list of movies
 */
const getMovies = asyncHandler(async (req, res) => {
  const Movies = await Movie.find();
  return res.status(200).json(Movies);
});

/**
 * Get Single Movie
 * @route /api/movies/:id
 * @method GET
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns single movie
 */
const getSingle = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error('Invalid Id.');
  }

  const Movie = await Movie.findById(id);
  if (!Movie) {
    res.status(404);
    throw new Error('Movie not found.');
  }
  return res.status(200).json(Movie);
});

/**
 * Create Single Movie
 * @route /api/movies
 * @method POST
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns single movie
 */
const createMovie = asyncHandler(async (req, res) => {
  const value = await movieJoiValidator.validateAsync(req.body);
  const newMovie = await Movie.create(value);
  return res.status(201).json(newMovie);
});

/**
 * Update Single Movie
 * @route /api/movies/:id
 * @method PUT
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns updated single movie
 */
const updateMovie = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error('Invalid id provided.');
  }

  const value = await movieJoiValidator.validateAsync(req.body);

  const updatedMovie = await Movie.findByIdAndUpdate(id, value, {
    new: true,
  });
  if (!updatedMovie) {
    res.status(404);
    throw new Error('Movie not found');
  }
  return res.status(200).json(updatedMovie);
});

/**
 * Delete Single Movie
 * @route /api/movies/:id
 * @method DELETE
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns deleted movie
 */
const deleteMovie = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error('Incorrect id provided.');
  }

  const removedMovie = await Movie.findByIdAndRemove(id);
  if (!removedMovie) {
    res.status(404);
    throw new Error(`Movie with id ${id} not found.`);
  }
  return res.status(200).json(removedMovie);
});

module.exports = {
  getMovies: getMovies,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie,
};
