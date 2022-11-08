const jwt = require('jsonwebtoken');
const config = require('config');

const authHandler = (err, req, res, next) => {
  const authorizationHeader = req.headers['Authorization']; // by 'Authorization' key
  const token = authorizationHeader.split(' ')[1]; // get token component only; not Bearer part
  if (!token) {
    res.status(401);
    throw new Error('No token provided.');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    console.log('decodedToken :>> ', decodedToken);
    res.status(200);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403);
    res.json({ message: 'Invalid Token: ' + error?.message });
  }
};

module.exports = {
  authHandler,
};
