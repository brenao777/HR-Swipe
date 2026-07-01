const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt.config');

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = (req.headers.authorization || '').split(' ')[1]; // Bearer <token>
    const { user } = jwt.verify(accessToken, jwtConfig.access.secret);
    res.locals.user = user;

    return next();
  } catch {
    return res.sendStatus(403);
  }
};

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, jwtConfig.refresh.secret);
    res.locals.user = user;

    return next();
  } catch {
    return res.clearCookie('refreshToken').sendStatus(401);
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };
