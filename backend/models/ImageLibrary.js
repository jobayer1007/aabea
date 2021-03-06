const { Sequelize } = require('sequelize');

//Chapter schema

const ImageLibrary = (sequelize, DataTypes) =>
  sequelize.define('imageLibrary', {
    imageId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    imageName: {
      type: DataTypes.STRING,
      primaryKey: true,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    imageDescription: {
      type: DataTypes.TEXT,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    eventId: {
      type: DataTypes.STRING(5),
    },
    image: {
      type: DataTypes.STRING,
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

    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
  });

module.exports = ImageLibrary;
