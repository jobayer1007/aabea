const { Sequelize } = require('sequelize');

//event contact schema

const EventContact = (sequelize, DataTypes) =>
  sequelize.define('eventContact', {
    eventContactId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
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

    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },

    positionName: {
      type: DataTypes.STRING(50),
      required: true,
      primaryKey: true,
      allowNull: false,
      notEmpty: true,
    },

    contactName: {
      type: DataTypes.STRING(50),
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    contactEmail: {
      type: DataTypes.STRING(50),
      allowNull: false,
      required: true,
      validate: {
        isEmail: true,
      },
    },

    contactPhone: {
      type: DataTypes.STRING(20),
      required: true,
      allowNull: false,
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

    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
  });

// Member.sync({ force: true });

module.exports = EventContact;
