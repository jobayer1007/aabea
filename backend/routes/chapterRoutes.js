const express = require('express');
const router = express.Router();
const {
  createNewChapter,
  getChapters,
} = require('../controllers/chapterController');

// Add a New Chapter/////////////////////////////////////////////////
router.route('/new').post(createNewChapter);

// Get All Chapter ///////////////////////////////////////////
router.route('/systemAdmin').get(getChapters);

// Update a User///////////////////////////////////////////////////////

// Delete an User//////////////////////////////////////////

module.exports = router;
