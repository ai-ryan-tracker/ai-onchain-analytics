const { validationResult } = require('express-validator');
const mockDataStore = require('../utils/mockData');
const { asyncHandler, NotFoundError, ConflictError } = require('../utils/errors');
const { sendValidationError } = require('../utils/response');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');

/**
 * @route   GET api/collections
 * @desc    Get all NFT collections
 * @access  Public
 */
exports.getCollections = asyncHandler(async (req, res) => {
  const collections = mockDataStore.collections.findAll();
  return res.status(HTTP_STATUS.OK).json({ collections });
});

/**
 * @route   GET api/collections/:id
 * @desc    Get collection by ID
 * @access  Public
 */
exports.getCollectionById = asyncHandler(async (req, res) => {
  const collection = mockDataStore.collections.findById(req.params.id);
  if (!collection) {
    throw new NotFoundError(ERROR_MESSAGES.COLLECTION_NOT_FOUND);
  }
  return res.status(HTTP_STATUS.OK).json({ collection });
});

/**
 * @route   POST api/collections
 * @desc    Create a new NFT collection
 * @access  Public
 */
exports.createCollection = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendValidationError(res, errors.array());
  }

  const { collectionName, description, ownerId, imageUrl } = req.body;

  const existingCollection = mockDataStore.collections.findOne({ collectionName });
  if (existingCollection) {
    throw new ConflictError(ERROR_MESSAGES.COLLECTION_ALREADY_EXISTS);
  }

  const newCollection = mockDataStore.collections.create({
    collectionName: collectionName.trim(),
    description: description ? description.trim() : '',
    ownerId: ownerId ? String(ownerId) : null,
    imageUrl: imageUrl || '',
  });

  return res.status(HTTP_STATUS.CREATED).json({ collection: newCollection });
});
