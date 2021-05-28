const { Sequelize } = require('sequelize');

//EventImageGallery schema

const EventImageGallery = (sequelize, DataTypes) =>
  sequelize.define('eventImageGallery', {
    imageId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    eventId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    imageDescription: {
      type: DataTypes.TEXT,
      // required: true,
      // allowNull: false,
      // notEmpty: true,
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

module.exports = EventImageGallery;
