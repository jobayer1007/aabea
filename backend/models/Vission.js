const { Sequelize } = require('sequelize');

//Chapter schema

const Vission = (sequelize, DataTypes) =>
  sequelize.define('vission', {
    chapterId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    title: {
      type: DataTypes.TEXT,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    body: {
      type: DataTypes.TEXT,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    createdby: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
  });

module.exports = Vission;
