const express = require('express');
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
router.post('/', createRental);
router.put('/:id', updateRental);
router.delete('/:id', deleteRental);

module.exports = router;
