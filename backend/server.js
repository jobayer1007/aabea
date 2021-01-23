import express from 'express';
import dotenv from 'dotenv';
import * as pge from 'pg';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';
import db from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

// Test DB
db.authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.error(err.message));

const app = express();
app.use(express.json());

// User Routes
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend.build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
