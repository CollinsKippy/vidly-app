const express = require('express');
const router = express.Router();
const { myAuthHandler, adminHandler } = require('../middleware/authHandler');
const {
  getMovies,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/MoviesController');

router.get('/', getMovies);
router.get('/:id', getSingle);
router.post('/', myAuthHandler, createMovie);
router.put('/:id', myAuthHandler, updateMovie);
router.delete('/:id', [myAuthHandler, adminHandler], deleteMovie);

module.exports = router;
