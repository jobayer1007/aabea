const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models/index');

const morgan = require('morgan');
// const db = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const chapterRoutes = require('./routes/chapterRoutes');
const userRoutes = require('./routes/userRoutes');
const committeeRoutes = require('./routes/committeeRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const linkRoutes = require('./routes/linkRoutes');
const helpRoutes = require('./routes/helpRoutes');
const eventRoutes = require('./routes/eventRoutes');
const emailRoutes = require('./routes/emailRoutes');
const imageRoutes = require('./routes/imageRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const replyRoutes = require('./routes/replyRoutes');
const documentRoutes = require('./routes/documentRoutes');
const { join } = require('path');

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
app.use('/api/committee', committeeRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/reply', replyRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/helps', helpRoutes);
app.use('/api/doc', documentRoutes);

app.get('/api/config/captchaClient', (req, res) =>
  res.send(process.env.CAPTCHA_SITE_KEY)
);

// const syncStatus = false;

// sequelize
//   .sync({
//     force: syncStatus,
//     alter: true,
//   })
//   .then(() => {
//     //   //if  (syncStatus) {
//     //   //defaultValueManager.Generate(syncStatus);
//     //   // }

//     console.log('initial synced'.yellow.inverse);
//   })
//   .catch((err) => console.log(err));

// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(path.resolve(), '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(path.resolve(), 'frontend', 'build', 'index.html')
    )
  );
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
