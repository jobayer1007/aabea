const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  'postgres://postgres:1007Jobayer@localhost:5432/aabeav2'
);
const db = require('../config/db');
const Member = require('./Member');

// const userTypes = ['admin', 'member', 'systemAdmin'];

const User = (sequelize, DataTypes) =>
  sequelize.define('user', {
    chapterId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
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
      // unique: 'compositeIndex',
      primaryKey: true,

      validate: {
        isEmail: true,
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
      // unique: 'compositeIndex',
      primaryKey: true,
      values: ['admin', 'member', 'systemAdmin'],
    },
    last_login: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

// User.sync({ force: true });

module.exports = User;
