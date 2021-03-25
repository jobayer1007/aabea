const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models/index');

const bodyParser = require('body-parser');
const colors = require('colors');
const morgan = require('morgan');
// const db = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const chapterRoutes = require('./routes/chapterRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

//body parser middleware
// app.use(bodyParser.json());

app.use('/api/chapters', chapterRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

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
// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
