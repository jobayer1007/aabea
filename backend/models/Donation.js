const { Sequelize } = require('sequelize');

const Donation = (sequelize, DataTypes) =>
  sequelize.define('donation', {
    firstName: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    mInit: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
      required: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      // unique: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address',
        },
      },
    },

    donationType: {
      type: DataTypes.ENUM,
      defaultValue: 'general',
      values: ['general', 'flood', 'corona'],
    },

    amount: {
      type: DataTypes.FLOAT,
      required: false,
      isFloat: true,
      defaultValue: 0.0,
    },

    donationDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
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

module.exports = Donation;
