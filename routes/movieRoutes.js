const express = require('express');
const router = express.Router();
const {
  getMovies,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/MoviesController');

router.get('/', getMovies);
router.get('/:id', getSingle);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
