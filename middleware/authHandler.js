const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

const myAuthHandler = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]; // get token component only; not Bearer part
    if (!token) {
      res.status(401);
      throw new Error('No token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    res.status(200);
    req.user = await User.findById(decoded.sub).select({ name: 1, email: 1, password: -1 });

    next();
  } catch (error) {
    res.status(401);
    res.json({ message: 'Invalid Token: ' + error?.message });
  }
};

module.exports = {
  myAuthHandler,
};
