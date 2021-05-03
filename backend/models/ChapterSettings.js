const { Sequelize } = require('sequelize');

//Chapter schema

const ChapterSettings = (sequelize, DataTypes) =>
  sequelize.define('chapterSettings', {
    chapterId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },

    chapterEmail: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      required: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    chapterName: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    chapterAddress: {
      type: DataTypes.STRING,
    },

    chapterPhone: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },

    chapterPayment: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },

    lastUpdatedBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
      notEmpty: true,
    },
  });

module.exports = ChapterSettings;
