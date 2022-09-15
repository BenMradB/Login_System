const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');

const app = express();

// MiddleWare
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Handling Different Requests
app.use('/api/v1/users', userRouter);

module.exports = app;