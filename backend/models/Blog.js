const { Sequelize } = require('sequelize');

//event schema

const Blog = (sequelize, DataTypes) =>
  sequelize.define('blog', {
    blogId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
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
      type: DataTypes.TEXT,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      notEmpty: true,
    },

    userName: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    profilePicture: {
      type: DataTypes.STRING,
    },

    categoryId: {
      type: DataTypes.UUID,
    },

    photoId: {
      type: DataTypes.STRING,
    },

    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
  });

// Member.sync({ force: true });

module.exports = Blog;
