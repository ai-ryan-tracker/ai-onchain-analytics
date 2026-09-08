const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config');
const mockDataStore = require('../utils/mockData');
const { asyncHandler, NotFoundError, AuthenticationError } = require('../utils/errors');
const { sendSuccess, sendError, sendValidationError } = require('../utils/response');
const { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } = require('../utils/constants');
const crypto = require("crypto");

// 32-byte AES-256 key
const KEY = Buffer.from(
    "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    "hex"
);

/**
 * @route   GET api/auth
 * @desc    Get current authenticated user
 * @access  Private
 */
exports.getCurrentUser = asyncHandler(async (req, res) => {

  
  const user = mockDataStore.users.findById(req.user.id);
  
  if (!user) {
    throw new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const userWithoutPassword = mockDataStore.users.getUserWithoutPassword(user);
  // Return user data directly for compatibility with frontend
  return res.status(HTTP_STATUS.OK).json(userWithoutPassword);
});

/**
 * @route   POST api/auth
 * @desc    Authenticate user and return JWT token
 * @access  Public
 */
exports.login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendValidationError(res, errors.array());
  }

  const { email, password } = req.body;

  // Find user by email
  const user = mockDataStore.users.findOne({ email });

  if (!user) {
    throw new AuthenticationError(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  // Demo: accept any password
  // In production: const isMatch = await bcrypt.compare(password, user.password);
  // if (!isMatch) throw new AuthenticationError(ERROR_MESSAGES.INVALID_CREDENTIALS);

  const payload = {
    user: {
      id: user.id,
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
        res.status(HTTP_STATUS.OK).json({ token });
        resolve();
      },
    );
  });
});

exports.decrypt = (encryptedData) => {
  const [ivHex, encryptedHex] = encryptedData.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      KEY,
      iv
  );

  const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final()
  ]);

  return decrypted.toString("utf8");
}