import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// const proConfig = {
//   connectionString: process.env.DATABASE_URL, // heroku address
// };
// Connect db
const db = new Sequelize(
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
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
  // )
);

export default db;
