const express = require('express');
const { myAuthHandler } = require('../middleware/authHandler');
const {
  getRentals,
  getSingleRental,
  createRental,
  updateRental,
  deleteRental,
} = require('../controllers/rentalsController');
const router = express.Router();

router.get('/', getRentals);
router.get('/:id', getSingleRental);
router.post('/', myAuthHandler, createRental);
router.put('/:id', myAuthHandler, updateRental);
router.delete('/:id', myAuthHandler, deleteRental);

module.exports = router;
