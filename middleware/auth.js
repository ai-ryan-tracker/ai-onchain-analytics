const jwt = require('jsonwebtoken');
const config = require('../config');
const { AuthenticationError } = require('../utils/errors');
const { sendError } = require('../utils/response');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');

/**
 * JWT Authentication Middleware
 * Validates JWT token from request headers and attaches user info to request object
 */
const validateToken = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');

    if (!token) {
      return sendError(res, ERROR_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
    }

    const jwtSecret = config.JWT_SECRET || 'demo-secret-key-change-in-production';

    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return sendError(res, ERROR_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
      }

      // Attach user info to request object
      req.user = decoded.user;
      next();
    });
  } catch (err) {
    console.error('Token validation error:', err);
    return sendError(res, ERROR_MESSAGES.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = validateToken;
