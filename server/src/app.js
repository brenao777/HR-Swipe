const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const tokenRouter = require('./routes/tokenRouter');
const authRouter = require('./routes/authRouter');
const resumeRouter = require('./routes/resumeRouter');

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);
app.use('/api/resume', resumeRouter);

module.exports = app;
