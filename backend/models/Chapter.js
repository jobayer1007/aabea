const { Sequelize } = require('sequelize');

//Chapter schema

const Chapter = (sequelize, DataTypes) =>
  sequelize.define('chapter', {
    chapterId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      // allowNull: false,
      // required: true,
      // unique: true,
      // validate: {
      //   isEmail: true,
      // },
    },
    chapterPhone: {
      type: DataTypes.STRING,
      // required: true,
      // allowNull: false,
    },

    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
  });

module.exports = Chapter;
