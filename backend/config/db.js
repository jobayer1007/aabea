import Sequelize from 'sequelize';

// Connect db
const db = new Sequelize('aabea', 'postgres', '1007Jobayer', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default db;
