const express = require('express');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const { xss } = require('express-xss-sanitizer');
const expressRateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const logger = require('./logger');
const config = require('../config');

/**
 * Configure all Express middleware
 * @param {Express} app - Express application instance
 */
const configureMiddleware = (app) => {
  // Security: Helmet sets various HTTP headers for security
  app.use(helmet({
    contentSecurityPolicy: false, // Disable for Socket.IO compatibility
  }));

  // CORS configuration - allow localhost and network access in development
  app.use(cors({
    origin: config.NODE_ENV === 'production'
      ? process.env.CLIENT_URL
      : true, // Allow any origin in development (localhost, 192.168.x.x, etc.)
    credentials: true,
  }));

  // Body parser middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Cookie parser
  app.use(cookieParser());

  // Data sanitization
  app.use(mongoSanitize()); // Prevent NoSQL injection
  app.use(xss()); // Prevent XSS attacks
  app.use(hpp()); // Prevent HTTP parameter pollution

  // Rate limiting
  const limiter = expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/api/', limiter);

  // Custom logging middleware
  app.use(logger);
};

module.exports = configureMiddleware;
