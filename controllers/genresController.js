const { Genre } = require('../models/Genre');

// 1. GET All Genres
const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    return res.status(200).json(genres);
  } catch (error) {
    return res.status(500).json('Error occurred retrieving genres.');
  }
};

// 2. GET Single Genres
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
    return res.status(500).json('Error occurred retrieving single genre.');
  }
};

// 1. Create Genre
const createGenre = async (req, res) => {
  const genre = req.body;
  // TODO: Validate data using Joi

  try {
    const newGenre = await Genre.create(genre);
    return res.status(201).json(newGenre);
  } catch (error) {
    return res.status(500).json('Error occurred creating genre.');
  }
};
// 1. GET All Genres
const updateGenre = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error('Invalid id provided.');
  }

  const genre = req.body;
  // TODO: Validate data

  try {
    const updatedGenre = await Genre.findByIdAndUpdate(id, genre, {
      new: true,
    });
    if (!updatedGenre) {
      res.status(404);
      throw new Error('Genre not found');
    }
    return res.status(200).json(updatedGenre);
  } catch (error) {
    return res.status(500).json('Error occurred updating genres.');
  }
};
// 1. GET All Genres
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
    return res.status(500).json('Error occurred deleting genres.');
  }
};

module.exports = {
  getGenres,
  getSingle,
  createGenre,
  updateGenre,
  deleteGenre,
};
