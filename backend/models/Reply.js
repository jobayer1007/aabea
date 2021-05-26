const { Sequelize } = require('sequelize');

//event schema

const Reply = (sequelize, DataTypes) =>
  sequelize.define('reply', {
    replyId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },

    reply: {
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
    commentId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
  });

// Member.sync({ force: true });

module.exports = Reply;
