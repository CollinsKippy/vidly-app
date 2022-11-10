const bcrypt = require('bcrypt');
const { asyncHandler } = require('../middleware/asyncHandler');
const {
  User,
  userLoginValidator,
  userRegisterValidator,
} = require('../models/User');

/**
 * Register New User
 * @method POST
 * @url /api/users/register
 * @description uses bcrypt to hash password
 * @param {any} req the request object with user details
 * @param {any} res res object with status and json body
 * @returns Newly Created User or Error Message
 */
const registerUser = asyncHandler(async (req, res) => {
  const value = await userRegisterValidator.validateAsync(req.body);

  const { name, email, password } = req.body;

  // Ensure email does not already exist
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(400);
    throw new Error(`User with email ${email} already exists.`);
  }

  // Hash password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  // Return only user name and email - Destructuring :)

  return res.status(201).json({ _id: newUser._id, name, email });
});

/**
 * Login User
 * @method POST
 * @url /api/users/login
 * @description uses bcrypt to verify/compare password. Token generation is an extension method from userSchema
 * @param {any} req the request object with user credentials
 * @param {any} res res object with status and json body
 * @returns Jwt and Roles
 */
const loginUser = asyncHandler(async (req, res) => {
  const value = await userLoginValidator.validateAsync(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(400);
    throw new Error('Invalid email or password.');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    res.status(400);
    throw new Error('Invalid email or password.');
  }

  const token = user.generateAuthToken();

  return res
    .status(201)
    .json({ name: user?.name, email: user?.email, token, expiresIn: '1h' });
});

module.exports = {
  registerUser,
  loginUser,
};
