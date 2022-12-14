const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
const { asyncHandler } = require('./asyncHandler');

/**
 * Middle that checks whether user has a valid token
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next reference to succeeding function
 * @returns void or 401 Unauthorized
 */
const myAuthHandler = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]; // get token component only; not Bearer part
    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    res.status(200);
    req.user = await User.findById(decoded._id).select({
      name: 1,
      email: 1,
      isAdmin: 1,
      password: -1,
    });
    next();
  } catch (error) {
    return res.status(400).json({ message: error?.message });
  }
};

/**
 * Middleware that checks whether user has Admin role
 * @param {any} req request object
 * @param {any} res response object
 * @param {any} next reference to succeeding function
 * @returns void or 403 Forbidden
 */
const adminHandler = (req, res, next) => {
  if (!req?.user?.isAdmin) {
    return res.status(403).json({ message: 'Forbidden: Access Denied.' });
  }

  next();
};

module.exports = {
  myAuthHandler,
  adminHandler,
};
