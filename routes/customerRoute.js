const express = require('express');
const { myAuthHandler, adminHandler } = require('../middleware/authHandler');
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
router.post('/', myAuthHandler, createCustomer);
router.put('/:id', myAuthHandler, updateCustomer);
router.delete('/:id', [myAuthHandler, adminHandler], deleteCustomer);

module.exports = router;
