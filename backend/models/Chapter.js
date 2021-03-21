const { Sequelize } = require('sequelize');

//Chapter schema

const Chapter = (sequelize, DataTypes) =>
  sequelize.define('chapter', {
    chapterId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUID4,
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

    subDomain: {
      // dc.aabea.org
      type: DataTypes.STRING,
      // defaultValue: 0.0,
      required: true,
    },
  });

module.exports = Chapter;
