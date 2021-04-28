const { Sequelize } = require('sequelize');

//event schema

const Event = (sequelize, DataTypes) =>
  sequelize.define('event', {
    eventId: {
      type: DataTypes.STRING(5),
      // defaultValue: 123456,
      // autoIncrement: true,
      // defaultValue: Sequelize.literal('uuid_generate_v4()'),
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

    eventDescription: {
      type: DataTypes.STRING(250),
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    eventDate: {
      type: DataTypes.RANGE(DataTypes.DATE),
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    eventAddress: {
      type: DataTypes.STRING(250),
      required: true,
    },

    adultFee: {
      type: DataTypes.FLOAT,
      required: true,
    },

    minorFee: {
      type: DataTypes.FLOAT,
      required: true,
    },

    cap: {
      type: DataTypes.REAL,
      required: true,
    },

    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
      notEmpty: true,
    },

    lastUpdatedBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
      notEmpty: true,
    },
    eventStatus: {
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

module.exports = Event;
