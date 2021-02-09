const bcrypt = require('bcryptjs');

const users = [
  {
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    userRole: 'admin',
  },
  {
    email: 'ahmad@example.com',
    password: bcrypt.hashSync('123456', 10),
    userRole: 'systemAdmin',
  },
  {
    email: 'mahek@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    email: 'joba@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

module.exports = users;
