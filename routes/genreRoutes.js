const express = require('express');
const router = express.Router();
const {
  getGenres,
  getSingle,
  createGenre,
  updateGenre,
  deleteGenre,
} = require('../controllers/genresController');

router.get('/', getGenres);
router.get('/:id', getSingle);
router.post('/', createGenre);
router.put('/:id', updateGenre);
router.delete('/:id', deleteGenre);

module.exports = router;
