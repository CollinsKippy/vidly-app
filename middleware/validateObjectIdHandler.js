const mongoose = require('mongoose');

const validateObjectIdHandler = function (req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid Id.');
  }

  next();
};

module.exports = validateObjectIdHandler;
