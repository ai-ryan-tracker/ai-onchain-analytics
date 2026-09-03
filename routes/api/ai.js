const express = require('express');
const { check } = require('express-validator');
const { generateImage } = require('../../controllers/ai');

const router = express.Router();

router.post(
  '/generate',
  [
    check('prompt', 'Prompt is required').not().isEmpty(),
    check('prompt', 'Prompt must be at least 3 characters').isLength({ min: 3 }),
  ],
  generateImage,
);

module.exports = router;
