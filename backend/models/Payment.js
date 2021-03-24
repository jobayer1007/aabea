const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const Payment = (sequelize, DataTypes) =>
  sequelize.define('payment', {
    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    year: {
      type: DataTypes.REAL,
      allowNull: false,
      // unique: 'compositeIndex',
      primaryKey: true,
      validate: {
        isNumeric: true,
        notEmpty: true,
      },
    },

    // month: {
    //   type: DataTypes.STRING,
    //   // allowNull: false,
    //   unique: 'compositeIndex',
    // },

    paymentType: {
      type: DataTypes.ENUM,
      defaultValue: 'dues',
      primaryKey: true,
      values: ['dues', 'nominationFee', 'event'],
    },

    amount: {
      type: DataTypes.FLOAT,
      required: true,
      isFloat: true,
      defaultValue: 0.0,
    },

    paymentDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      required: true,
    },

    payerId: {
      type: DataTypes.STRING, // email_address from Paypal
    },
    paymentId: {
      type: DataTypes.STRING, // id from Paypal
    },
    paymentStatus: {
      type: DataTypes.STRING, // status from Paypal
    },
    paymentTime: {
      type: DataTypes.STRING, //update_time from Paypal
    },
  });

// Payment.sync({ force: true });

module.exports = Payment;
