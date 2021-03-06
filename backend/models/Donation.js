const { Sequelize } = require('sequelize');

const Donation = (sequelize, DataTypes) =>
  sequelize.define('donation', {
    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    email: {
      //// In case if Member , it will be member email
      type: DataTypes.STRING(50),
      allowNull: false,
      required: true,
      primaryKey: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address',
        },
      },
    },
    donationDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      primaryKey: true,
    },

    isMember: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      required: true,
    },

    firstName: {
      type: DataTypes.STRING(20),
      required: true,
      allowNull: false,
      notEmpty: true,
    },
    mInit: {
      type: DataTypes.STRING(5),
    },
    lastName: {
      type: DataTypes.STRING(20),
      required: true,
    },

    donationType: {
      type: DataTypes.STRING,
      required: true,
      defaultValue: 'general',
    },

    amount: {
      type: DataTypes.FLOAT,
      required: false,
      isFloat: true,
      defaultValue: 0.0,
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
    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
  });

// Payment.sync({ force: true });

module.exports = Donation;
