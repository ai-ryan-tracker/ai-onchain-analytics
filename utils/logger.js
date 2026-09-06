/**
 * Logger utility for consistent logging across the application
 */

const isDevelopment = process.env.NODE_ENV === 'development';

const logger = {
  /**
   * Log info messages
   */
  info: (...args) => {
    if (isDevelopment) {
      console.log('[INFO]', ...args);
    }
  },

  /**
   * Log warning messages
   */
  warn: (...args) => {
    console.warn('[WARN]', ...args);
  },

  /**
   * Log error messages
   */
  error: (...args) => {
    console.error('[ERROR]', ...args);
  },

  /**
   * Log debug messages (only in development)
   */
  debug: (...args) => {
    if (isDevelopment) {
      console.log('[DEBUG]', ...args);
    }
  },

  /**
   * Log socket events
   */
  socket: (event, data) => {
    if (isDevelopment) {
      console.log(`[SOCKET] ${event}`, data || '');
    }
  },
};

module.exports = logger;
