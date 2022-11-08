const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
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

    const { name, email, password } = req.body;

    // Ensure email does not already exist
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400);
      throw new Error(`User with email ${email} already exists.`);
    }

    // Hash and encrypt password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // Return only user name and email - Destructuring :)

    return res.status(201).json({ _id: newUser._id, name, email });
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
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400);
      throw new Error('Invalid email or password.');
    }

    // Validate password from returned user object -password vs hashedPassword?
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(400);
      throw new Error('Invalid email or password.');
    }

    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'), {
      expiresIn: '1h',
    });

    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json({ message: 'Login Error: ' + error?.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
