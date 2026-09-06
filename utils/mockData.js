const config = require('../config');

/**
 * In-memory mock data store for demo purposes
 * This replaces database operations for the demo project
 */

let users = [];
let collections = [];
let nfts = [];
let nextUserId = 1;
let nextCollectionId = 1;
let nextNftId = 1;

/**
 * Initialize mock data with demo users, collections, and NFTs
 */
const initializeMockData = () => {
  users = [
    {
      id: '1',
      name: 'Demo Player 1',
      email: 'player1@demo.com',
      password: 'hashed_password_demo',
      chipsAmount: config.INITIAL_CHIPS_AMOUNT,
      type: 0,
      created: new Date(),
    },
    {
      id: '2',
      name: 'Demo Player 2',
      email: 'player2@demo.com',
      password: 'hashed_password_demo',
      chipsAmount: config.INITIAL_CHIPS_AMOUNT,
      type: 0,
      created: new Date(),
    },
  ];

  collections = [
    {
      id: '1',
      collectionName: 'DSGN Animals',
      description: 'A premium art collection featuring futuristic animal avatars.',
      ownerId: '1',
      imageUrl: '/images/collections/collection-1.png',
      created: new Date(),
    },
    {
      id: '2',
      collectionName: 'Magic Mushrooms',
      description: 'Surreal NFT collection inspired by mystical landscapes.',
      ownerId: '2',
      imageUrl: '/images/collections/collection-2.png',
      created: new Date(),
    },
  ];

  nfts = [
    {
      id: '1',
      title: 'Lunar Fox',
      description: 'A mystical fox NFT from the DSGN Animals collection.',
      price: 2.5,
      ownerId: '1',
      collectionId: '1',
      imageUrl: '/images/nfts/nft-1.png',
      created: new Date(),
    },
    {
      id: '2',
      title: 'Shroom Glow',
      description: 'A glowing mushroom artwork from the Magic Mushrooms collection.',
      price: 3.0,
      ownerId: '2',
      collectionId: '2',
      imageUrl: '/images/nfts/nft-2.png',
      created: new Date(),
    },
  ];

  nextUserId = 3;
  nextCollectionId = 3;
  nextNftId = 3;
};

// Initialize on module load
initializeMockData();

/**
 * Mock Data Store
 * Provides database-like operations for demo purposes
 */
const mockDataStore = {
  users: {
    findById: (id) => {
      if (!id) return null;
      return users.find((user) => user.id === String(id)) || null;
    },

    findOne: (query) => {
      if (!query) return null;

      if (query.email) {
        return users.find((user) => user.email.toLowerCase() === query.email.toLowerCase().trim()) || null;
      }
      if (query.name) {
        return users.find((user) => user.name.toLowerCase() === query.name.toLowerCase().trim()) || null;
      }
      return null;
    },

    create: (userData) => {
      if (!userData || !userData.email || !userData.name) {
        throw new Error('Invalid user data');
      }

      const newUser = {
        id: String(nextUserId++),
        name: userData.name.trim(),
        email: userData.email.toLowerCase().trim(),
        password: userData.password,
        chipsAmount: userData.chipsAmount || config.INITIAL_CHIPS_AMOUNT,
        type: userData.type || 0,
        created: new Date(),
      };

      users.push(newUser);
      return newUser;
    },

    update: (id, updateData) => {
      if (!id || !updateData) return null;

      const userIndex = users.findIndex((user) => user.id === String(id));
      if (userIndex === -1) return null;

      users[userIndex] = {
        ...users[userIndex],
        ...updateData,
        id: users[userIndex].id,
        created: users[userIndex].created,
      };

      return users[userIndex];
    },

    getUserWithoutPassword: (user) => {
      if (!user) return null;
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    },

    findAll: () => {
      return users.map((user) => mockDataStore.users.getUserWithoutPassword(user));
    },

    reset: () => {
      initializeMockData();
    },
  },

  collections: {
    findById: (id) => {
      if (!id) return null;
      return collections.find((collection) => collection.id === String(id)) || null;
    },

    findOne: (query) => {
      if (!query) return null;

      if (query.collectionName) {
        return collections.find((collection) => collection.collectionName.toLowerCase() === query.collectionName.toLowerCase().trim()) || null;
      }
      return null;
    },

    findAll: () => {
      return collections.slice();
    },

    create: (collectionData) => {
      if (!collectionData || !collectionData.collectionName) {
        throw new Error('Invalid collection data');
      }

      const newCollection = {
        id: String(nextCollectionId++),
        collectionName: collectionData.collectionName.trim(),
        description: collectionData.description || '',
        ownerId: collectionData.ownerId || null,
        imageUrl: collectionData.imageUrl || '',
        created: new Date(),
      };

      collections.push(newCollection);
      return newCollection;
    },

    update: (id, updateData) => {
      if (!id || !updateData) return null;
      const collectionIndex = collections.findIndex((collection) => collection.id === String(id));
      if (collectionIndex === -1) return null;

      collections[collectionIndex] = {
        ...collections[collectionIndex],
        ...updateData,
        id: collections[collectionIndex].id,
        created: collections[collectionIndex].created,
      };

      return collections[collectionIndex];
    },

    remove: (id) => {
      const collectionIndex = collections.findIndex((collection) => collection.id === String(id));
      if (collectionIndex === -1) return null;
      return collections.splice(collectionIndex, 1)[0];
    },
  },

  nfts: {
    findById: (id) => {
      if (!id) return null;
      return nfts.find((nft) => nft.id === String(id)) || null;
    },

    findByCollectionId: (collectionId) => {
      if (!collectionId) return [];
      return nfts.filter((nft) => nft.collectionId === String(collectionId));
    },

    findAll: () => {
      return nfts.slice();
    },

    create: (nftData) => {
      if (!nftData || !nftData.title) {
        throw new Error('Invalid NFT data');
      }

      const newNft = {
        id: String(nextNftId++),
        title: nftData.title.trim(),
        description: nftData.description || '',
        price: Number(nftData.price) || 0,
        ownerId: nftData.ownerId || null,
        collectionId: nftData.collectionId || null,
        imageUrl: nftData.imageUrl || '',
        created: new Date(),
      };

      nfts.push(newNft);
      return newNft;
    },

    update: (id, updateData) => {
      if (!id || !updateData) return null;
      const nftIndex = nfts.findIndex((nft) => nft.id === String(id));
      if (nftIndex === -1) return null;

      nfts[nftIndex] = {
        ...nfts[nftIndex],
        ...updateData,
        id: nfts[nftIndex].id,
        created: nfts[nftIndex].created,
      };

      return nfts[nftIndex];
    },

    remove: (id) => {
      const nftIndex = nfts.findIndex((nft) => nft.id === String(id));
      if (nftIndex === -1) return null;
      return nfts.splice(nftIndex, 1)[0];
    },
  },
};

module.exports = mockDataStore;
