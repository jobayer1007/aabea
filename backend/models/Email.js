const { Sequelize } = require('sequelize');

//Chapter schema

const Email = (sequelize, DataTypes) =>
  sequelize.define('email', {
    emailId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    title: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    body: {
      type: DataTypes.STRING,
    },

    sendBy: {
      type: DataTypes.STRING,
      required: true,
      notEmpty: true,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      // required: true,
      // allowNull: false,
    },
    sentTo: {
      type: DataTypes.STRING,
      // required: true,
      // allowNull: false,
    },

    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
  });

module.exports = Email;
