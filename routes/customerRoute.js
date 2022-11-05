const express = require('express');
const {
  getCustomers,
  getSingleCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customersController');
const router = express.Router();

router.get('/', getCustomers);
router.get('/:id', getSingleCustomer);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
