const { Schema } = require('mongoose');
const { asyncHandler } = require('../middleware/asyncHandler');
const { Genre, genreJoiValidator } = require('../models/Genre');

/**
 * Get List of Genres
 * @route /api/genres
 * @method GET
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns list of genres
 */
const getGenres = asyncHandler(async (req, res) => {
  const genres = await Genre.find();
  return res.status(200).json(genres);
});

/**
 * Get Single Genre
 * @route /api/genres/:id
 * @method GET
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns single genre
 */
const getSingle = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   res.status(400);
  //   throw new Error('Invalid Id.');
  // }

  const genre = await Genre.findOne({ _id: id });
  if (!genre) {
    res.status(404);
    throw new Error('Genre not found.');
  }
  return res.status(200).json(genre);
});

/**
 * Create Single Genre
 * @route /api/genres
 * @method POST
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns single genre
 */
const createGenre = asyncHandler(async (req, res) => {
  const value = await genreJoiValidator.validateAsync(req.body);
  const newGenre = await Genre.create(value);
  return res.status(201).json(newGenre);
});

/**
 * Update Single Genre
 * @route /api/genres/:id
 * @method PUT
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns updated single genre
 */
const updateGenre = asyncHandler(async (req, res) => {
  const value = await genreJoiValidator.validateAsync(req.body);

  const updatedGenre = await Genre.findByIdAndUpdate(id, value, {
    new: true,
  });

  if (!updatedGenre) {
    res.status(404);
    throw new Error('Genre not found');
  }
  return res.status(200).json(updatedGenre);
});

/**
 * Delete Single Genre
 * @route /api/genres/:id
 * @method DELETE
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns deleted genre
 */
const deleteGenre = asyncHandler(async (req, res) => {
  try {
    const removedGenre = await Genre.findByIdAndRemove(id);
    if (!removedGenre) {
      res.status(404);
      throw new Error(`Genre with id ${id} not found.`);
    }
    return res.status(200).json(removedGenre);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error occurred updating Genres:' + error });
  }
});

// const validateSchema = async (genre) => {
//   return await genreJoiValidator.validateAsync(genre);
// };

module.exports = {
  getGenres,
  getSingle,
  createGenre,
  updateGenre,
  deleteGenre,
};
