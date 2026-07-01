const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt.config');

const generateTokens = (payload) => ({
  accessToken: jwt.sign(payload, jwtConfig.access.secret, {
    expiresIn: jwtConfig.access.expiresIn,
  }),
  refreshToken: jwt.sign(payload, jwtConfig.refresh.secret, {
    expiresIn: jwtConfig.refresh.expiresIn,
  }),
});

module.exports = generateTokens;
