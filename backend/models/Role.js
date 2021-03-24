const { Sequelize } = require('sequelize');

//Chapter schema

const Role = (sequelize, DataTypes) =>
  sequelize.define('role', {
    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    roleId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    roleName: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    roleDescription: {
      type: DataTypes.STRING,
      required: true,
    },
  });

module.exports = Role;
