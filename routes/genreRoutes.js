const express = require('express');
const router = express.Router();
const { authHandler } = require('../middleware/authHandler');

const {
  getGenres,
  getSingle,
  createGenre,
  updateGenre,
  deleteGenre,
} = require('../controllers/genresController');

router.get('/', getGenres);
router.get('/:id', getSingle);
router.post('/', authHandler, createGenre);
router.put('/:id', authHandler, updateGenre);
router.delete('/:id', authHandler, deleteGenre);

module.exports = router;
