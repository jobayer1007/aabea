const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const EventPayment = (sequelize, DataTypes) =>
  sequelize.define('eventPayment', {
    eventId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },

    registrationId: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
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
    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
  });

// Payment.sync({ force: true });

module.exports = EventPayment;
