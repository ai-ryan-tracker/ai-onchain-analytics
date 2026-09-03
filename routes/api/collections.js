const express = require('express');
const { check } = require('express-validator');
const { getCollections, getCollectionById, createCollection } = require('../../controllers/collections');

const router = express.Router();

router.get('/', getCollections);
router.get('/:id', getCollectionById);
router.post(
  '/',
  [
    check('collectionName', 'Collection name is required').not().isEmpty(),
    check('collectionName', 'Collection name must be at least 2 characters').isLength({ min: 2 }),
  ],
  createCollection,
);

module.exports = router;
