const Sequelize = require('sequelize');
const generateUniqueId = require('generate-unique-id');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const basename = path.basename(module.filename);
const colors = require('colors');

const User = require('../models/Member');
const Member = require('../models/Member');
const Payment = require('../models/Payment');

dotenv.config();

const db = {};

// const proConfig = {
//   connectionString: process.env.DATABASE_URL, // heroku address
// };
// Connect db
const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
  // )
);
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  console.log('Model name :'.cyan.underline, modelName.green.underline);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// MEmber ID Generator
// var mId = 10200;
// const id = generateUniqueId({
//   length: 5,
//   useLetters: false,
// });
// console.log(id);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Test DB
sequelize
  .authenticate()
  .then(() =>
    console.log(
      `Connected to Database : ${process.env.PG_DATABASE} `.cyan.underline
    )
  )
  .catch((err) => console.error(err.message.red.underline.bold));

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// //Models/tables
db.Chapter = require('../models/Chapter')(sequelize, Sequelize);
db.PaymentType = require('../models/PaymentType')(sequelize, Sequelize);
db.Role = require('../models/Role')(sequelize, Sequelize);
db.User = require('../models/User')(sequelize, Sequelize);
db.Member = require('../models/Member')(sequelize, Sequelize);
db.PendingRegister = require('../models/PendingRegister')(sequelize, Sequelize);
db.Payment = require('../models/Payment')(sequelize, Sequelize);
db.Donation = require('../models/Donation')(sequelize, Sequelize);
db.Announcement = require('../models/Announcement')(sequelize, Sequelize);
db.Mission = require('../models/Mission')(sequelize, Sequelize);
db.Vission = require('../models/Vission')(sequelize, Sequelize);
db.History = require('../models/History')(sequelize, Sequelize);
db.Committee = require('../models/Committee')(sequelize, Sequelize);
db.ImageLibrary = require('../models/ImageLibrary')(sequelize, Sequelize);
db.Event = require('../models/Event')(sequelize, Sequelize);
db.EventContact = require('../models/EventContact')(sequelize, Sequelize);
db.EventRegistration = require('../models/EventRegistration')(
  sequelize,
  Sequelize
);
db.EventPayment = require('../models/EventPayment')(sequelize, Sequelize);
db.EventImageGallery = require('../models/EventImageGallery')(
  sequelize,
  Sequelize
);
db.Document = require('../models/Document')(sequelize, Sequelize);

//Model relationships

// CHAPTER RELATION
// CHAPTER TO MEMBER
db.Chapter.hasMany(db.Member, { foreignKey: 'chapterId' });
db.Member.belongsTo(db.Chapter, { foreignKey: 'chapterId' });

// CHAPTER TO USER
db.Chapter.hasMany(db.User, { foreignKey: 'chapterId' });
db.User.belongsTo(db.Chapter, { foreignKey: 'chapterId' });

// CHAPTER TO PAYMENT
db.Chapter.hasMany(db.Payment, { foreignKey: 'chapterId' });
db.Payment.belongsTo(db.Chapter, { foreignKey: 'chapterId' });

// CHAPTER TO PAYMENT TYPE
db.Chapter.hasMany(db.PaymentType, { foreignKey: 'chapterId' });
db.PaymentType.belongsTo(db.Chapter, { foreignKey: 'chapterId' });

// CHAPTER TO DONATION
db.Chapter.hasMany(db.Donation, { foreignKey: 'chapterId' });
db.Donation.belongsTo(db.Chapter, { foreignKey: 'chapterId' });

// CHAPTER TO ANNOUNCEMENT
db.Chapter.hasMany(db.Announcement, { foreignKey: 'chapterId' });
db.Announcement.belongsTo(db.Chapter, { foreignKey: 'chapterId' });

// CHAPTER TO Mission
db.Chapter.hasMany(db.Mission, { foreignKey: 'chapterId' });
db.Mission.belongsTo(db.Chapter, { foreignKey: 'chapterId' });

// CHAPTER TO Vission
db.Chapter.hasMany(db.Vission, { foreignKey: 'chapterId' });
db.Vission.belongsTo(db.Chapter, { foreignKey: 'chapterId' });

// CHAPTER TO ANNOUNCEMENT
db.Chapter.hasMany(db.History, { foreignKey: 'chapterId' });
db.History.belongsTo(db.Chapter, { foreignKey: 'chapterId' });

// PAYMENT TYPE RELATION
// db.Chapter.hasMany(db.PaymentType, { foreignKey: 'chapterId' });
// db.PaymentType.belongsTo(db.Chapter, { foreignKey: 'chapterId' });
// ROLE RELATION
db.Chapter.hasMany(db.Role, { foreignKey: 'chapterId' });
db.Role.belongsTo(db.Chapter, { foreignKey: 'chapterId' });

// // db.User.belongsTo(db.Member);
db.Member.hasMany(db.User, { foreignKey: 'memberId' });
db.User.belongsTo(db.Member, { foreignKey: 'memberId' });
// // db.Member.hasMany(db.User);

db.Payment.belongsTo(db.Member, { foreignKey: 'memberId' });
db.Member.hasMany(db.Payment, { foreignKey: 'memberId' });

db.Donation.belongsTo(db.Member, { foreignKey: 'memberId' });
db.Member.hasMany(db.Donation, { foreignKey: 'memberId' });

// COMMITTEE
db.Chapter.hasMany(db.Committee, { foreignKey: 'chapterId' });
db.Committee.belongsTo(db.Chapter, { foreignKey: 'chapterId' });

db.Member.hasMany(db.Committee, { foreignKey: 'memberId' });
db.Committee.belongsTo(db.Member, { foreignKey: 'memberId' });

// Image Library
db.Chapter.hasMany(db.ImageLibrary, { foreignKey: 'chapterId' });
db.ImageLibrary.belongsTo(db.Chapter, { foreignKey: 'chapterId' });

db.Member.hasMany(db.ImageLibrary, { foreignKey: 'memberId' });
db.ImageLibrary.belongsTo(db.Member, { foreignKey: 'memberId' });

// Event
db.Chapter.hasMany(db.Event, { foreignKey: 'chapterId' });
db.Event.belongsTo(db.Chapter, { foreignKey: 'chapterId' });

db.Event.hasMany(db.EventContact, { foreignKey: 'eventId' });
db.EventContact.belongsTo(db.Event, { foreignKey: 'eventId' });

db.Event.hasMany(db.EventRegistration, { foreignKey: 'eventId' });
db.EventRegistration.belongsTo(db.Event, { foreignKey: 'eventId' });

db.Event.hasMany(db.EventPayment, { foreignKey: 'eventId' });
db.EventPayment.belongsTo(db.Event, { foreignKey: 'eventId' });

db.Event.hasMany(db.EventImageGallery, { foreignKey: 'eventId' });
db.EventImageGallery.belongsTo(db.Event, { foreignKey: 'eventId' });

db.Member.hasMany(db.EventContact, { foreignKey: 'memberId' });
db.EventContact.belongsTo(db.Member, { foreignKey: 'memberId' });

// Document
db.Chapter.hasMany(db.Document, { foreignKey: 'chapterId' });
db.Document.belongsTo(db.Chapter, { foreignKey: 'chapterId' });

module.exports = db;
