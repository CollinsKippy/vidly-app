/**
 * An async handler function that wraps API endpoints in a generic try catch block.
 * @param {function} asyncFn references the req,res function defined under the controller methods
 * @returns an async factory function that handles errors. This wrapped function will be executed by express at runtime.
 */
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
