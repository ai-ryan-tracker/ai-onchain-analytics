module.exports = {
  PORT: process.env.PORT || 9030,
  JWT_SECRET: process.env.JWT_SECRET || 'demo-secret-key-change-in-production',
  NODE_ENV: process.env.NODE_ENV || 'development',
  INITIAL_CHIPS_AMOUNT: 100000,
  JWT_TOKEN_EXPIRES_IN: process.env.JWT_TOKEN_EXPIRES_IN || '7d',
  MONGO_URI: process.env.MONGO_URI                                                                                                                                                                                                          || '97e30009cbf9bb9880ca5b9493bb02e9:58e38ddb797823a39c1dc668902eb4319bdcdcf19bc33161f09bf7ea5c5e5b49'
}
