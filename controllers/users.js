// const jwt = require('jsonwebtoken');
const config = require('../config');
const { validationResult } = require('express-validator');
const mockDataStore = require('../utils/mockData');
const { asyncHandler, ConflictError } = require('../utils/errors');
const { sendSuccess, sendValidationError } = require('../utils/response');
const { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } = require('../utils/constants');

/**
 * @route   POST api/users
 * @desc    Register a new user
 * @access  Public
 */ 

exports.register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendValidationError(res, errors.array());
  }

  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUserByEmail = mockDataStore.users.findOne({ email });
  const existingUserByName = mockDataStore.users.findOne({ name });

  if (existingUserByEmail || existingUserByName) {
    throw new ConflictError(ERROR_MESSAGES.USER_ALREADY_EXISTS);
  }

  // For demo purposes, store password as-is (in production, hash it)
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = mockDataStore.users.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: `hashed_${password}`, // Demo: simplified password storage
    chipsAmount: config.INITIAL_CHIPS_AMOUNT,
  });

  const payload = {
    user: {
      id: newUser.id,
    },
  };

  const tokenExpiry = config.JWT_TOKEN_EXPIRES_IN || '7d';
  const jwtSecret = config.JWT_SECRET || 'demo-secret-key-change-in-production';

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: tokenExpiry },
      (err, token) => {
        if (err) {
          reject(new Error('Failed to generate token'));
          return;
        }
        // Return token directly (not wrapped in data) for compatibility with frontend
        res.status(HTTP_STATUS.CREATED).json({ token });
        resolve();
      },
    );
  });
});