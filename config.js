module.exports = {
  PORT: process.env.PORT || 9030,
  JWT_SECRET: process.env.JWT_SECRET || 'demo-secret-key-change-in-production',
  MONGO_URI: process.env.MONGO_URI, // Not required for demo (using mock data)
  NODE_ENV: process.env.NODE_ENV || 'development',
  INITIAL_CHIPS_AMOUNT: 100000,
  JWT_TOKEN_EXPIRES_IN: process.env.JWT_TOKEN_EXPIRES_IN || '7d',
}
