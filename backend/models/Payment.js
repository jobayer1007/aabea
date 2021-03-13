const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize(
  'postgres://postgres:1007Jobayer@localhost:5432/aabeav2'
);

const Payment = (sequelize, DataTypes) =>
  sequelize.define('payment', {
    // Id: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: false,
    //   notEmpty: true,
    //   primaryKey: true,
    //   required: true,
    // },
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      notEmpty: true,
    },
    year: {
      type: DataTypes.REAL,
      // allowNull: false,
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
      // unique: 'compositeIndex',
      primaryKey: true,
      values: ['dues', 'nominationFee', 'event'],
    },

    amount: {
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
