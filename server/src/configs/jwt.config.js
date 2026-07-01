// JWT secrets fall back to dev defaults so the app runs without a .env file.
// Set ACCESS_TOKEN_SECRET / REFRESH_TOKEN_SECRET in production.
const jwtConfig = {
  access: {
    secret: process.env.ACCESS_TOKEN_SECRET || 'dev-access-secret-change-me',
    expiresIn: '30m',
  },
  refresh: {
    secret: process.env.REFRESH_TOKEN_SECRET || 'dev-refresh-secret-change-me',
    expiresIn: '30d',
  },
};

module.exports = jwtConfig;
