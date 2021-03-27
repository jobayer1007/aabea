const { Sequelize } = require('sequelize');

//member schema

const Member = (sequelize, DataTypes) =>
  sequelize.define('member', {
    memberId: {
      type: DataTypes.BIGINT,
      // defaultValue: 123456,
      // autoIncrement: true,
      // defaultValue: Sequelize.literal('uuid_generate_v4()'),
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    mInit: {
      type: DataTypes.STRING(5),
    },
    firstName: {
      type: DataTypes.STRING(20),
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    lastName: {
      type: DataTypes.STRING(20),
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    address1: {
      type: DataTypes.STRING(50),
      required: true,
    },
    address2: {
      type: DataTypes.STRING(50),
    },
    city: {
      type: DataTypes.STRING(30),
      required: true,
    },
    state: {
      type: DataTypes.STRING(20),
      required: true,
    },
    zipcode: {
      type: DataTypes.STRING(15),
      required: true,
    },
    primaryEmail: {
      type: DataTypes.STRING(30),
      allowNull: false,
      required: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    alternateEmail: {
      type: DataTypes.STRING(30),
      validate: {
        isEmail: true,
      },
    },
    primaryPhone: {
      type: DataTypes.STRING(12),
      required: true,
      allowNull: false,
    },
    alternatePhone: {
      type: DataTypes.STRING(12),
    },
    degree: {
      type: DataTypes.STRING(50),
      required: true,
    },
    degreeYear: {
      type: DataTypes.DATE(4),
      required: true,
    },
    major: {
      type: DataTypes.STRING(30),
      required: true,
    },
    collegeName: {
      type: DataTypes.STRING(50),
      required: true,
    },

    status: {
      type: DataTypes.ENUM(15),
      defaultValue: 'inactive',
      values: ['active', 'pending', 'inactive'],
    },

    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    startDate: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },

    nextPaymentDueIn: {
      type: DataTypes.REAL,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: true,
      },
    },
    certificates: {
      type: DataTypes.STRING,
      // required: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
  });

// Member.sync({ force: true });

module.exports = Member;
