const express = require('express');
const router = express.Router();
const { myAuthHandler } = require('../middleware/authHandler');
const {
  getGenres,
  getSingle,
  createGenre,
  updateGenre,
  deleteGenre,
} = require('../controllers/genresController');

router.get('/', getGenres);
router.get('/:id', getSingle);
router.post('/', myAuthHandler, createGenre);
router.put('/:id', myAuthHandler, updateGenre);
router.delete('/:id', myAuthHandler, deleteGenre);

module.exports = router;
