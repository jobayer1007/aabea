const { Sequelize } = require('sequelize');

//Chapter schema

const Links = (sequelize, DataTypes) =>
  sequelize.define('link', {
    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    linkId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },

    linkTitle: {
      type: DataTypes.TEXT,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    link: {
      type: DataTypes.TEXT,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    createdby: {
      type: DataTypes.BIGINT,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    lastUpdatedBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
      notEmpty: true,
    },
  });

module.exports = Links;
