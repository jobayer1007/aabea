const { Sequelize } = require('sequelize');

//event contact schema

const HelpContact = (sequelize, DataTypes) =>
  sequelize.define('helpContact', {
    helpContactId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
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

    helpFor: {
      type: DataTypes.STRING(250),
      required: true,
      primaryKey: true,
      allowNull: false,
      notEmpty: true,
    },

    contactName: {
      type: DataTypes.STRING(250),
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    contactEmail: {
      type: DataTypes.STRING(30),
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

    profilePicture: {
      type: DataTypes.STRING,
    },

    isTrue: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

module.exports = HelpContact;
