const { Sequelize } = require('sequelize');

//PaymentType schema

const DonationType = (sequelize, DataTypes) =>
  sequelize.define('donationType', {
    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    donationTypeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    donationTypeName: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    donationTypeAmount: {
      type: DataTypes.FLOAT,
      required: true,
    },
    donationTypeDescription: {
      type: DataTypes.TEXT,
    },
  });

module.exports = DonationType;
