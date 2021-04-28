const { Sequelize } = require('sequelize');

//PaymentType schema

const PaymentType = (sequelize, DataTypes) =>
  sequelize.define('paymentType', {
    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    paymentTypeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    paymentTypeName: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    paymentTypeAmount: {
      type: DataTypes.FLOAT,
      required: true,
    },
    paymentTypeDescription: {
      type: DataTypes.TEXT,
    },
    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
  });

module.exports = PaymentType;
