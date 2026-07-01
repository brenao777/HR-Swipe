const authRouter = require('express').Router();

const bcrypt = require('bcryptjs');
const { User } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookie.config');

authRouter.post('/register', async (req, res) => {
  const { email, firstName, secondName, password, company } = req.body;

  if (!email || !firstName || !password || !secondName) {
    return res.status(400).json({ error: 'Нужно заполнить все поля!' });
  }

  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { firstName, secondName, company, password: await bcrypt.hash(password, 10) },
    });

    if (!created) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const plainUser = user.get();
    delete plainUser.password;

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });

    return res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Не верный логин или пароль' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: 'Не верный логин или пароль' });
    }

    const plainUser = user.get();
    delete plainUser.password;

    const { accessToken, refreshToken } = generateTokens({ user: plainUser });
    return res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

authRouter.get('/logout', (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

module.exports = authRouter;
