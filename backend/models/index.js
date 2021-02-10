const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const basename = path.basename(module.filename);

const User = require('../models/Member');
const Member = require('../models/Member');
const Payment = require('../models/Payment');

dotenv.config();

const db = {};

// const proConfig = {
//   connectionString: process.env.DATABASE_URL, // heroku address
// };
// Connect db
const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
  // )
);
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
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

// Test DB
sequelize
  .authenticate()
  .then(() =>
    console.log(
      `Connected to Database : ${process.env.PG_DATABASE} `.cyan.underline
    )
  )
  .catch((err) => console.error(err.message.red.underline.bold));

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// //Models/tables
db.User = require('../models/User')(sequelize, Sequelize);
db.Member = require('../models/Member')(sequelize, Sequelize);
db.Payment = require('../models/Payment')(sequelize, Sequelize);

// //Model relationships
db.User.belongsTo(db.Member, { foreignKey: 'memberId' });
db.Member.hasMany(db.User, { foreignKey: 'memberId' });

db.Payment.belongsTo(db.Member, { foreignKey: 'memberId' });
db.Member.hasMany(db.Payment, { foreignKey: 'memberId' });

// //Model relationships
// User.belongsTo(Member, { foreignKey: 'userId' });
// Member.hasMany(User, { foreignKey: 'userId' });

// Payment.belongsTo(Member, { foreignKey: 'memberId' });
// Member.hasMany(Payment, { foreignKey: 'memberId' });

// const syncStatus = true;

// db.sync({ force: syncStatus }).then(() => {
//   //   //if  (syncStatus) {
//   //   //defaultValueManager.Generate(syncStatus);
//   //   // }

//   console.log('initial synced'.yellow.underline);
// });

module.exports = db;
