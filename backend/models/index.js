'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const dotenv = require('dotenv');

dotenv.config();

const db = {};

//if (config.use_env_variable) {
//this is for when we use "use_env_variable" : "DATABASE_URL" within development or prod environment for database setup
//sequelize = new Sequelize(process.env[config.use_env_variable]);
//} else {

let sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    console.log('DBName :', model.name);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  console.log('Model name :', modelName);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
