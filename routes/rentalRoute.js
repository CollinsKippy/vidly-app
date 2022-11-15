const express = require('express');
const { myAuthHandler, adminHandler } = require('../middleware/authHandler');
const {
  getRentals,
  getSingleRental,
  createRental,
  updateRental,
  deleteRental,
} = require('../controllers/rentalsController');
const router = express.Router();

router.get('/', myAuthHandler, getRentals);
router.get('/:id', myAuthHandler, getSingleRental);
router.post('/', myAuthHandler, createRental);
router.put('/:id', myAuthHandler, updateRental);
router.delete('/:id', [myAuthHandler, adminHandler], deleteRental);

module.exports = router;
