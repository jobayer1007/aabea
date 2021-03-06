const { Sequelize, DataTypes, NOW } = require('sequelize');
const User = require('./User');
// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize(
  'postgres://postgres:1007Jobayer@localhost:5432/aabeav2'
);

//member schema
const validStatus = ['Active', 'Pending', 'Inactive'];

const Member = (sequelize, DataTypes) =>
  sequelize.define('member', {
    memberId: {
      //email will be used as member id
      type: DataTypes.BIGINT,
      // defaultValue: 123456,
      autoIncrement: true,
      // defaultValue: Sequelize.literal('uuid_generate_v4()'),
      allowNull: false,
      primaryKey: true,
      notEmpty: true,

      // references: {
      //   model: User,
      //   key: User.userId,
      // },
    },
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
    address1: {
      type: DataTypes.STRING,
      required: true,
    },
    address2: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      required: true,
    },
    state: {
      type: DataTypes.STRING,
      required: true,
    },
    zipcode: {
      type: DataTypes.STRING,
      required: true,
    },
    primaryEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    alternateEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    primaryPhone: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
    },
    alternatePhone: {
      type: DataTypes.STRING,
    },
    degree: {
      type: DataTypes.STRING,
      required: true,
    },
    degreeYear: {
      type: DataTypes.DATE,
      required: true,
    },
    major: {
      type: DataTypes.STRING,
      required: true,
    },
    collegeName: {
      type: DataTypes.STRING,
      required: true,
    },

    status: {
      type: DataTypes.ENUM,
      defaultValue: 'inactive',
      values: ['active', 'pending', 'inactive'],
    },

    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },

    startDate: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },

    NextPaymentDueIn: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    // userName: {
    //   type: DataTypes.VIRTUAL,
    //   get() {
    //     return `${this.firstName} ${this.lastName}`;
    //   },
    //   set(value) {
    //     throw new Error('Do not try to set the `userName` value!');
    //   },
    // },
  });

// Member.sync({ force: true });

module.exports = Member;
