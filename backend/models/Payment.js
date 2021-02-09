const db = require('../config/db');
const { Sequelize } = require('Sequelize');

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('payment', {
    memberId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: 'compositeIndex',
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex',
      validate: {
        isNumeric: true,
        notEmpty: true,
      },
    },

    month: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeIndex',
    },

    feeAmount: {
      type: DataTypes.FLOAT,
      required: true,
      isFloat: true,
    },

    fineAmount: {
      type: DataTypes.FLOAT,
      required: false,
      isFloat: true,
      defaultValue: 0.0,
    },

    paymentDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },

    payerId: {
      type: DataTypes.STRING,
    },
    paymentId: {
      type: DataTypes.STRING,
    },
  });

  // Payment.sync({ force: true });

  return Payment;
};
