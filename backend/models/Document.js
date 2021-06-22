const { Sequelize } = require('sequelize');

//Documents schema

const Document = (sequelize, DataTypes) =>
  sequelize.define('document', {
    documentId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },

    documentType: {
      type: DataTypes.ENUM(15),
      defaultValue: 'private',
      values: ['public', 'private'],
    },

    documentName: {
      type: DataTypes.STRING(50),
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    documentDescription: {
      type: DataTypes.STRING(250),
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    document: {
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

// Member.sync({ force: true });

module.exports = Document;
