import express from 'express';
const router = express.Router();
import db from '../config/db.js';
import User from '../models/User.js';

// Get all User///////////////////////////////////////////////
router.get(
  '/',
  async (req, res) => {
    try {
      const results = await db.query('SELECT * FROM users');
      console.log(results);
      res.status(200).json({
        status: 'success',
        results: results[0].length,
        data: {
          users: results[0],
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  // User.findAll()
  //   .then((users) => {
  //
  //   })
  //   .catch((err) => console.log(err))
);

// Get a single User/////////////////////////////////////////////////////////
// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const results = await db.query(`SELECT * FROM users WHERE id = ${id}`);
//     res.status(200).json({
//       status: 'success',
//       results: results[0].length,
//       data: {
//         user: results[0],
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  res.send(rows[0]);
});

// Add a User/////////////////////////////////////////////////
router.post('/add', (req, res) => {
  const data = {
    username: 'mahek',
    email: 'mahek@example.com',
    password: '123456',
  };

  let { username, email, password, isAdmin } = data;

  // Insert Into Table
  User.create({
    username,
    email,
    password,
    isAdmin,
  })
    .then((user) => res.redirect('/users'))
    .catch((err) => console.log(err));
});

// Update a User///////////////////////////////////////////////////////
router.put('/:id', async (req, res) => {
  const { username, email } = req.body;
  const { id } = req.params;
  console.log(username);
  console.log(email);
  console.log(id);
  try {
    const results = await db.query(
      'UPDATE users SET username = $1, email = $2 WHERE id = $3 returning *',
      [username, email, id]
    );
    console.log(results);

    res.status(200).json({
      status: 'success',
      results: results[0].length,
      data: {
        user: results[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete an User//////////////////////////////////////////
router.delete('/:id', (req, res) => {
  res.status(204).json({
    status: 'delete success',
  });
});

export default router;
