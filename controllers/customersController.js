const { asyncHandler } = require('../middleware/asyncHandler');
const { Customer, customerJoiValidator } = require('../models/Customer');

/**
 * Returns list of customers
 * @method GET
 * @route /api/customers
 * @param {any} req request object
 * @param {any} res response object
 * @returns List of Customers
 */
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find();
  return res.status(200).json(customers);
});

/**
 * Returns single customer
 * @method GET
 * @route /api/customers/:id
 * @param {any} req request object
 * @param {any} res response object
 * @returns Single Customer
 */
const getSingleCustomer = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const customer = await Customer.findById(id);

  if (!customer) {
    res.status(404);
    throw new Error(`Customer with id ${id} not found.`);
  }

  return res.status(200).json(customer);
});

/**
 * Creates new customer
 * @method POST
 * @route /api/customers
 * @param {any} req request object
 * @param {any} res response object
 * @returns New of Customer
 */
const createCustomer = asyncHandler(async (req, res) => {
  const value = await customerJoiValidator.validateAsync(req.body);
  const customer = await Customer.create(value);

  return res.status(200).json(customer);
});

/**
 * Update customer
 * @method PUT
 * @route /api/customers/:id
 * @param {any} req request object
 * @param {any} res response object
 * @returns List of Customers
 */
const updateCustomer = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const value = await customerJoiValidator.validateAsync(req.body);
  const customer = await Customer.findByIdAndUpdate(id, value, {
    new: true,
  });

  if (!customer) {
    res.status(400);
    throw new Error('Invalid customer updated.');
  }

  return res.status(200).json(customer);
});

/**
 * Deletes a customer
 * @method DELETE
 * @route /api/customer/:id
 * @param {any} req request object
 * @param {any} res response object
 * @returns Deleted Customer
 */
const deleteCustomer = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const customer = await Customer.findByIdAndRemove(id);
  if (!customer) {
    res.status(400);
    throw new Error(`Customer with id ${id} not found.`);
  }

  return res.status(200).json(customer);
});

module.exports = {
  getCustomers,
  getSingleCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
