const express = require('express');
const router = express.Router();
const { myAuthHandler, adminHandler } = require('../middleware/authHandler');
const {
  getGenres,
  getSingle,
  createGenre,
  updateGenre,
  deleteGenre,
} = require('../controllers/genresController');
const validateObjectIdHandler = require('../middleware/validateObjectIdHandler');

router.get('/', getGenres);
router.get('/:id', validateObjectIdHandler, getSingle);
router.post('/', myAuthHandler, createGenre);
router.put('/:id', [validateObjectIdHandler, myAuthHandler], updateGenre);
router.delete(
  '/:id',
  [validateObjectIdHandler, myAuthHandler, adminHandler],
  deleteGenre
);

module.exports = router;
