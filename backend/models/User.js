const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const userTypes = ['admin', 'member', 'systemAdmin'];

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    userId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      notEmpty: true,
      primaryKey: true,
      required: true,
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
      type: DataTypes.STRING,
      required: true,
      defaultValue: 'member',
      allowNull: false,
      validate: {
        isIn: { userTypes },
      },
    },
  });

  // User.sync({ force: true });

  return User;
};
