// Only the refresh token is stored in a cookie; the access token lives in memory.
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const cookieConfig = {
  refresh: {
    maxAge: THIRTY_DAYS_MS,
    httpOnly: true,
    sameSite: 'lax',
  },
};

module.exports = cookieConfig;
