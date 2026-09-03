const express = require('express');
const { check } = require('express-validator');
const { getNfts, getNftById, createNft } = require('../../controllers/nfts');

const router = express.Router();

router.get('/', getNfts);
router.get('/:id', getNftById);
router.post(
  '/',
  [
    check('title', 'NFT title is required').not().isEmpty(),
    check('title', 'NFT title must be at least 2 characters').isLength({ min: 2 }),
    check('price', 'Price must be a number').isFloat({ min: 0 }),
  ],
  createNft,
);

module.exports = router;
