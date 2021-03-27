const { Sequelize, DataTypes, NOW } = require('sequelize');

//Committee schema

const Committee = (sequelize, DataTypes) =>
  sequelize.define('committee', {
    cId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    memberId: {
      type: DataTypes.BIGINT,
      // defaultValue: 123456,
      // autoIncrement: true,
      // defaultValue: Sequelize.literal('uuid_generate_v4()'),
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },

    position: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    tenure: {
      type: DataTypes.RANGE(DataTypes.DATEONLY),
      primaryKey: true,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    bio: {
      type: DataTypes.TEXT,
      required: true,
      allowNull: false,
      notEmpty: true,
    },

    // startDate: {
    //   type: DataTypes.DATEONLY,
    //   defaultValue: Sequelize.NOW,
    // },

    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
  });

// Committee.sync({ force: true });

module.exports = Committee;
