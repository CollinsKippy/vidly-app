const { Schema } = require('mongoose');
const { Genre, genreJoiValidator: genreSchemaValidator } = require('../models/Genre');

/**
 * Get List of Genres
 * @route /api/genres
 * @method GET
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns list of genres
 */
const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    return res.status(200).json(genres);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error occurred updating Genres:' + error });
  }
};

/**
 * Get Single Genre
 * @route /api/genres/:id
 * @method GET
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns single genre
 */
const getSingle = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error('Invalid Id.');
  }

  try {
    const genre = await Genre.find(id);
    if (!genre) {
      res.status(404);
      throw new Error('Genre not found.');
    }
    return res.status(200).json(genre);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error occurred updating Genres:' + error });
  }
};

/**
 * Create Single Genre
 * @route /api/genres
 * @method POST
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns single genre
 */
const createGenre = async (req, res, next) => {
  try {
    const value = await genreSchemaValidator.validateAsync(req.body);
    const newGenre = await Genre.create(value);
    return res.status(201).json(newGenre);
  } catch (error) {
    return res.status(500).json({ message: 'Error Creating Genre: ' + error });
  }
};

/**
 * Update Single Genre
 * @route /api/genres/:id
 * @method PUT
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns updated single genre
 */
const updateGenre = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`${id}`);
    if (typeof id === 'null' || typeof id === 'undefined') {
      res.status(400);
      throw new Error('Invalid Id Provided.');
    }

    const value = await genreSchemaValidator.validateAsync(req.body);

    const updatedGenre = await Genre.findByIdAndUpdate(id, value, {
      new: true,
    });

    if (!updatedGenre) {
      res.status(404);
      throw new Error('Genre not found');
    }
    return res.status(200).json(updatedGenre);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error occurred updating Genres:' + error });
  }
};

/**
 * Delete Single Genre
 * @route /api/genres/:id
 * @method DELETE
 * @param {any} req the request object
 * @param {any} res the response object
 * @returns deleted genre
 */
const deleteGenre = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error('Incorrect id provided.');
  }

  try {
    const removedGenre = await Genre.findByIdAndRemove(id);
    if (!removedGenre) {
      res.status(404);
      throw new Error('Genre not found');
    }
    return res.status(200).json(removedGenre);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error occurred updating Genres:' + error });
  }
};

// const validateSchema = async (genre) => {
//   return await genreSchemaValidator.validateAsync(genre);
// };

module.exports = {
  getGenres,
  getSingle,
  createGenre,
  updateGenre,
  deleteGenre,
};
