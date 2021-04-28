const { Sequelize } = require('sequelize');

//EventRegistration schema

const EventRegistration = (sequelize, DataTypes) =>
  sequelize.define('eventRegistration', {
    registrationId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    eventId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },

    eventName: {
      type: DataTypes.STRING(50),
      required: true,
      allowNull: false,
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

    isMember: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      required: true,
    },

    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      // primaryKey: true,
      notEmpty: true,
    },

    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      required: true,
      validate: {
        isEmail: true,
      },
    },

    phone: {
      type: DataTypes.STRING(12),
      required: true,
      allowNull: false,
    },

    numberOfAdults: {
      type: DataTypes.REAL,
      required: true,
    },

    numberOfMinors: {
      type: DataTypes.REAL,
      required: true,
    },

    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
  });

// Member.sync({ force: true });

module.exports = EventRegistration;
