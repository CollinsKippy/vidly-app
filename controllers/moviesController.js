const { Movie, movieSchemaValidator } = require('../models/Movie');

/**
 * Get List of Movies
 * @route /api/movies
 * @method GET
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns list of movies
 */
const getMovies = async (req, res) => {
  try {
    const Movies = await Movie.find();
    return res.status(200).json(Movies);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error occurred retrieving Movies:' + error });
  }
};

/**
 * Get Single Movie
 * @route /api/movies/:id
 * @method GET
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns single movie
 */
const getSingle = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error('Invalid Id.');
  }

  try {
    const Movie = await Movie.find(id);
    if (!Movie) {
      res.status(404);
      throw new Error('Movie not found.');
    }
    return res.status(200).json(Movie);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error occurred retrieving single Movie:' + error });
  }
};

/**
 * Create Single Movie
 * @route /api/movies
 * @method POST
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns single movie
 */
const createMovie = async (req, res) => {
  try {
    const value = await movieSchemaValidator.validateAsync(req.body);
    const newMovie = await Movie.create(value);
    return res.status(201).json(newMovie);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error occurred creating Movie:' + error });
  }
};

/**
 * Update Single Movie
 * @route /api/movies/:id
 * @method PUT
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns updated single movie
 */
const updateMovie = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error('Invalid id provided.');
  }

  try {
    const value = await movieSchemaValidator.validateAsync(req.body);

    const updatedMovie = await Movie.findByIdAndUpdate(id, value, {
      new: true,
    });
    if (!updatedMovie) {
      res.status(404);
      throw new Error('Movie not found');
    }
    return res.status(200).json(updatedMovie);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error occurred updating Movies:' + error });
  }
};

/**
 * Delete Single Movie
 * @route /api/movies/:id
 * @method DELETE
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns deleted movie
 */
const deleteMovie = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error('Incorrect id provided.');
  }

  try {
    const removedMovie = await Movie.findByIdAndRemove(id);
    if (!removedMovie) {
      res.status(404);
      throw new Error('Movie not found');
    }
    return res.status(200).json(removedMovie);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error occurred deleting Movies:' + error });
  }
};

module.exports = {
  getMovies: getMovies,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie,
};
