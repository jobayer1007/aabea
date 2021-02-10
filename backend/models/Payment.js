const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize(
  'postgres://postgres:1007Jobayer@localhost:5432/aabeav2'
);

const Payment = (sequelize, DataTypes) =>
  sequelize.define('payment', {
    memberId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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

module.exports = Payment;
