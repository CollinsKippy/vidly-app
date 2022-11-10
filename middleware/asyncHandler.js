const asyncHandler = (asyncFn) => {
  return async (req, res, next) => {
    try {
      await asyncFn(req, res);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  asyncHandler,
};
