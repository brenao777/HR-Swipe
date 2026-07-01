const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const tokenRouter = require('./routes/tokenRouter');
const authRouter = require('./routes/authRouter');
const resumeRouter = require('./routes/resumeRouter');
const vacancyRouter = require('./routes/vacancyRouter');
const companyRouter = require('./routes/companyRouter');
const vacancyStatusRouter = require('./routes/vacancyStatusRouter');
const resumeStatusRouter = require('./routes/resumeStatusRouter');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Uploaded logos/photos are served from /uploads/<filename>.
app.use('/uploads', express.static(path.join(__dirname, '../public')));

app.use('/api/auth', authRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/tokens', tokenRouter);
app.use('/api/company', companyRouter);
app.use('/api/response', vacancyStatusRouter);
app.use('/api/status', resumeStatusRouter);
app.use('/api/vacancies', vacancyRouter);

module.exports = app;
