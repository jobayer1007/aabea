const { Sequelize } = require('sequelize');

//event schema

const Comment = (sequelize, DataTypes) =>
  sequelize.define('comment', {
    commentId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },

    comment: {
      type: DataTypes.TEXT,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    userId: {
      type: DataTypes.BIGINT,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },

    blogId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      notEmpty: true,
    },
  });

// Member.sync({ force: true });

module.exports = Comment;
