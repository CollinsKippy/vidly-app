const {
  User,
  userLoginValidator,
  userRegisterValidator,
} = require('../models/User');

/**
 * Register New User
 * @param {any} req the request object with user details
 * @param {any} res res object with status and json body
 * @returns Newly Created User or Error Message
 */
const registerUser = async (req, res) => {
  try {
    const value = await userRegisterValidator.validateAsync(req.body);
    const newUser = await User.create(value);

    return res.status(201).json(newUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Registration Error: ' + error?.message });
  }
};

/**
 * Login User
 * @param {any} req the request object with user credentials
 * @param {any} res res object with status and json body
 * @returns Jwt and Roles
 */
const loginUser = async (req, res) => {
  try {
    const value = await userLoginValidator.validateAsync(req.body);
    const newUser = await User.find({ email: value?.email });
    // Validate password from returned user object -bycrypt?

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Login Error: ' + error?.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
