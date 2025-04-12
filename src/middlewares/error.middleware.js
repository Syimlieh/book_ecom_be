const logger = require('../log/logger');
const { formatResponse } = require('../utils/formatting/formatting.utils');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  logger.error(
    `${req.method} ${req.originalUrl} | ${statusCode} | ${err.message}`
  );

  // Respond with a structured error message
  formatResponse(res, {
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  }, statusCode);
};

module.exports = { errorHandler };