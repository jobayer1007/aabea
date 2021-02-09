const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const colors = require('colors');
const db = require('./config/db');
// import db from './config/db.js';
const userRoutes = require('./routes/userRoutes');
// import userRoutes from './routes/userRoutes.js';
const uploadRoutes = require('./routes/uploadRoutes');
// import uploadRoutes from './routes/uploadRoutes.js';
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const User = require('./models/User');
const users = require('./data/users');
const { Sequelize } = require('./config/db');
// import {
//   errorHandler,
//   // notFound
// } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json());

// User Routes
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

app.use(notFound);
app.use(errorHandler);

// const syncStatus = false;

// db.sequelize.sync({ force: syncStatus }).then(() => {
//   //if  (syncStatus) {
//   //defaultValueManager.Generate(syncStatus);
//   // }

//   console.log('initial synced'.yellow);
// });

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
