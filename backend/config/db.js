const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// const proConfig = {
//   connectionString: process.env.DATABASE_URL, // heroku address
// };
// Connect db
const sequelize = new Sequelize(
  // process.env.NODE_ENV === 'production'
  //   ? proConfig
  //: // 'aabea', 'postgres', '1007Jobayer', {
  // host: 'localhost',
  // dialect: 'postgres',
  // operatorsAliases: false,

  // (
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    // operatorsAliases: false,
    // operatorsAliases: Sequelize.Op,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
  // )
);
// Test DB
sequelize
  .authenticate()
  .then(() =>
    console.log(
      `Connected to Database : ${process.env.PG_DATABASE} `.cyan.underline
    )
  )
  .catch((err) => console.error(err.message.red.underline.bold));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.User = require('../models/User')(sequelize, Sequelize);
db.Member = require('../models/Member')(sequelize, Sequelize);
db.Payment = require('../models/Payment')(sequelize, Sequelize);

//Model relationships
db.User.belongsTo(db.Member, { foreignKey: 'userId' });
db.Member.hasMany(db.User, { foreignKey: 'userId' });

db.Payment.belongsTo(db.Member, { foreignKey: 'memberId' });
db.Member.hasMany(db.Payment, { foreignKey: 'memberId' });

module.exports = db;
