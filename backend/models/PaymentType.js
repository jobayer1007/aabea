//PaymentType schema

const PaymentType = (sequelize, DataTypes) =>
  sequelize.define('paymentType', {
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
  });

module.exports = PaymentType;
