const { Sequelize } = require('sequelize');

//Chapter schema

const Chapter = (sequelize, DataTypes) =>
  sequelize.define('chapter', {
    chapterId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
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

    chapterEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      // unique: true,
      validate: {
        isEmail: true,
      },
    },
    chapterPhone: {
      type: DataTypes.STRING,
      // required: true,
      // allowNull: false,
    },

    subDomain: {
      type: DataTypes.JSONB,
      // defaultValue: 'bd.aabea.org',
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
      // allowNull: false,
      // notEmpty: true,
    },
  });

module.exports = Chapter;
