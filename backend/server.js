const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const path = require('path');
const bodyParser = require('body-parser');
const colors = require('colors');
// const db = require('./config/db');
const db = require('./models/index');
const chapterRoutes = require('./routes/chapterRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const User = require('./models/User');
const users = require('./data/users');
const { sequelize } = require('./models/index');

const app = express();
app.use(express.json());

//body parser middleware
app.use(bodyParser.json());

// Chapter Routes
app.use('/api/chapters', chapterRoutes);

// User Routes
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

// const syncStatus = true;

// sequelize
//   .sync({
//     force: syncStatus,
//     // alter: true,
//   })
//   .then(() => {
//     //   //if  (syncStatus) {
//     //   //defaultValueManager.Generate(syncStatus);
//     //   // }

//     console.log('initial synced'.yellow.inverse);
//   })
//   .catch((err) => {
//     return res.json({
//       success: false,
//       msg: 'Encountered a problem while Sync Database, error:' + err,
//     });
//   });

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
