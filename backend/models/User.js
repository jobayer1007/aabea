const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  'postgres://postgres:1007Jobayer@localhost:5432/aabeav2'
);
const db = require('../config/db');

// const userTypes = ['admin', 'member', 'systemAdmin'];

const User = (sequelize, DataTypes) =>
  sequelize.define('user', {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      notEmpty: true,
      primaryKey: true,
      required: true,
    },
    userName: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      required: true,
    },
    userRole: {
      type: DataTypes.ENUM,
      required: true,
      defaultValue: 'member',
      allowNull: false,
      values: ['admin', 'member', 'systemAdmin'],
    },
    last_login: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

// User.sync({ force: true });

module.exports = User;
