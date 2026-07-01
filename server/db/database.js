const path = require('path');

// Zero-config SQLite database — no external DB server required.
// The whole schema is created automatically on boot (see db/seed.js),
// so `npm run dev` just works out of the box.
const config = {
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || path.resolve(__dirname, 'hr-swipe.sqlite'),
  logging: false,
};

module.exports = {
  development: config,
  test: { ...config, storage: ':memory:' },
  production: config,
};
