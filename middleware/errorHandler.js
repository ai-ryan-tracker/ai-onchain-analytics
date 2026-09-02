const { formatErrorResponse } = require('../utils/errors');
const { sendError } = require('../utils/response');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');

/**
 * Global error handling middleware
 * Should be used as the last middleware in the Express app
 */
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
  });

  // Handle known error types
  if (err.isOperational) {
    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    return sendError(res, err.message, statusCode, err.errors);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, ERROR_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Token expired', HTTP_STATUS.UNAUTHORIZED);
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return sendError(res, err.message, HTTP_STATUS.BAD_REQUEST, err.errors);
  }

  // Default to 500 server error
  const message = process.env.NODE_ENV === 'production' 
    ? ERROR_MESSAGES.INTERNAL_ERROR 
    : err.message;

  return sendError(res, message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
};

module.exports = errorHandler;
