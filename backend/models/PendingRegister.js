const { Sequelize } = require('sequelize');

const PendingRegister = (sequelize, DataTypes) =>
  sequelize.define('pendingRegister', {
    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    pendingId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    firstName: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    mInit: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
      required: true,
    },
    address1: {
      type: DataTypes.STRING,
      required: true,
    },

    city: {
      type: DataTypes.STRING,
      required: true,
    },
    state: {
      type: DataTypes.STRING,
      required: true,
    },
    zipcode: {
      type: DataTypes.STRING,
      required: true,
    },
    primaryPhone: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },

    degree: {
      type: DataTypes.STRING,
      required: true,
    },
    degreeYear: {
      type: DataTypes.DATE,
      required: true,
    },
    major: {
      type: DataTypes.STRING,
      required: true,
    },
    collegeName: {
      type: DataTypes.STRING,
      required: true,
    },

    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending',
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
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
      values: ['admin', 'member', 'systemAdmin'],
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

// Member.sync({ force: true });

module.exports = PendingRegister;
