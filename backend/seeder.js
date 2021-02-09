const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const colors = require('colors');
const db = require('./config/db');
const users = require('./data/users');
const members = require('./data/members');
const User = require('./models/User');
const Member = require('./models/Member');
const Payment = require('./models/Payment');
const { sequelize } = require('./config/db');

dotenv.config();

//Connect to database
const syncStatus = true;
db.sequelize.sync({ force: syncStatus }).then(() => {
  //if  (syncStatus) {
  //defaultValueManager.Generate(syncStatus);
  // }
  console.log('initial synced'.yellow);
});

const importData = async () => {
  try {
    // User.Sequelize.sync({ force: true });
    // Member.Sequelize.sync({ force: true });
    // Payment.Sequelize.sync({ force: true });
    // Sequelize.User.bulkCreate({ users });
    // bulkInsert('User', users);
    // User.insertMany(users);

    // Sequelize.Member.bulkCreate(members);
    // Member.bulkCreate(members, { returning: true });
    // await User.bulkCreate(users)
    //   .then(() => {
    //     // Notice: There are no arguments here, as of right now you'll have to...
    //     return User.findAll();
    //   })
    //   .then((users) => {
    //     console.log(users); // ... in order to get the array of user objects
    //   });

    // Sequelize.bulkCreate('User', users)
    //   .catch(function (err) {
    //     console.log('Error ' + err);
    //   })
    //   .finally(function (_err) {
    //     console.log('FINISHED ');
    //   });

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.sync({ force: true });
    await Member.sync({ force: true });
    await Payment.sync({ force: true });

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
