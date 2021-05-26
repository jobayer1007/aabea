const { Sequelize } = require('sequelize');

//event schema

const Category = (sequelize, DataTypes) =>
  sequelize.define('category', {
    categoryId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },

    name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
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

// Member.sync({ force: true });

module.exports = Category;
