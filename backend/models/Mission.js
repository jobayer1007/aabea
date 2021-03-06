const { Sequelize } = require('sequelize');

//Chapter schema

const Mission = (sequelize, DataTypes) =>
  sequelize.define('mission', {
    chapterId: {
      type: DataTypes.UUID,
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

module.exports = Mission;
