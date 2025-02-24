const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const tokenRouter = require('./routes/tokenRouter');
const authRouter = require('./routes/authRouter');
const conditionsRouter = require('./routes/conditionsRouter');
const resumeRouter = require('./routes/resumeRouter');
const vacancyRouter = require('./routes/vacancyRouter');
const companyRouter = require('./routes/companyRouter');
const vacancyStatusRouter = require('./routes/vacancyStatusRouter');

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/tokens', tokenRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/vacancies', vacancyRouter);
app.use('/api/company', companyRouter)
app.use('/api/conditions', conditionsRouter);
app.use('/api/response', vacancyStatusRouter)

module.exports = app;
