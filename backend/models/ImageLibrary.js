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
    imageLink: {
      type: DataTypes.JSONB,
    },
    image: {
      type: DataTypes.STRING,
      required: true,
    },
    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
  });

module.exports = ImageLibrary;
