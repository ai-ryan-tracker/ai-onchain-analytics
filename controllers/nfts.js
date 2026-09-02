const { validationResult } = require('express-validator');
const mockDataStore = require('../utils/mockData');
const { asyncHandler, NotFoundError } = require('../utils/errors');
const { sendValidationError } = require('../utils/response');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../utils/constants');

/**
 * @route   GET api/nfts
 * @desc    Get all NFTs or filter by collection
 * @access  Public
 */
exports.getNfts = asyncHandler(async (req, res) => {
  const { collectionId } = req.query;
  const nfts = collectionId
    ? mockDataStore.nfts.findByCollectionId(collectionId)
    : mockDataStore.nfts.findAll();

  return res.status(HTTP_STATUS.OK).json({ nfts });
});

/**
 * @route   GET api/nfts/:id
 * @desc    Get NFT by ID
 * @access  Public
 */
exports.getNftById = asyncHandler(async (req, res) => {
  const nft = mockDataStore.nfts.findById(req.params.id);
  if (!nft) {
    throw new NotFoundError(ERROR_MESSAGES.NFT_NOT_FOUND);
  }
  return res.status(HTTP_STATUS.OK).json({ nft });
});

/**
 * @route   POST api/nfts
 * @desc    Create a new NFT
 * @access  Public
 */
exports.createNft = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendValidationError(res, errors.array());
  }

  const { title, description, price, ownerId, collectionId, imageUrl } = req.body;

  if (collectionId && !mockDataStore.collections.findById(collectionId)) {
    throw new NotFoundError(ERROR_MESSAGES.COLLECTION_NOT_FOUND);
  }

  const newNft = mockDataStore.nfts.create({
    title: title.trim(),
    description: description ? description.trim() : '',
    price: Number(price) || 0,
    ownerId: ownerId ? String(ownerId) : null,
    collectionId: collectionId ? String(collectionId) : null,
    imageUrl: imageUrl || '',
  });

  return res.status(HTTP_STATUS.CREATED).json({ nft: newNft });
});
