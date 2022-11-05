const { Customer, customerJoiValidator } = require('../models/Customer');

/**
 * Returns list of customers
 * @method GET
 * @route /api/customers
 * @param {any} req request object
 * @param {any} res response object
 * @returns List of Customers
 */
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(200).json(customers);
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving customers: ' + error?.message,
    });
  }
};

/**
 * Returns single customer
 * @method GET
 * @route /api/customers/:id
 * @param {any} req request object
 * @param {any} res response object
 * @returns Single Customer
 */
const getSingleCustomer = async (req, res) => {
  try {
    const id = req.params.id;

    const customer = await Customer.find(id);

    if (!customer) {
      res.status(404);
      throw new Error(`Customer with id ${id} not found.`);
    }

    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({
      message: 'Error retrieving customer: ' + error?.message,
    });
  }
};

/**
 * Creates new customer
 * @method POST
 * @route /api/customers
 * @param {any} req request object
 * @param {any} res response object
 * @returns New of Customer
 */
const createCustomer = async (req, res) => {
  try {
    const value = await customerJoiValidator.validateAsync(req.body);
    const customer = await Customer.create(value);

    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating customer: ' + error?.message,
    });
  }
};

/**
 * Update customer
 * @method PUT
 * @route /api/customers/:id
 * @param {any} req request object
 * @param {any} res response object
 * @returns List of Customers
 */
const updateCustomer = async (req, res) => {
  try {
    const value = await customerJoiValidator.validateAsync(req.body);
    const customer = await Customer.findByIdAndUpdate(id, value, {
      new: true,
    });

    if (!customer) {
      res.status(400);
      throw new Error('Invalid customer updated.');
    }

    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating customer: ' + error?.message,
    });
  }
};

/**
 * Deletes a customer
 * @method DELETE
 * @route /api/customer/:id
 * @param {any} req request object
 * @param {any} res response object
 * @returns Deleted Customer
 */
const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;

    const customer = await Customer.findByIdAndRemove(id);
    if (!customer) {
      res.status(400);
      throw new Error('Invalid customer delete attempt.');
    }

    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting customer: ' + error?.message,
    });
  }
};

module.exports = {
  getCustomers,
  getSingleCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
