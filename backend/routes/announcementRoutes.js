const express = require('express');
const router = express.Router();
const {
  createNewAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncementById,
  deleteAnnouncement,
} = require('../controllers/announcementController');
const { protect, admin } = require('../middleware/authMiddleware');

// Announcement/////////////////////////////////////////////////
router.route('/chapter/:checkChapter').get(getAnnouncements);
router
  .route('/announcement/:id')
  .get(getAnnouncementById)
  .put(protect, admin, updateAnnouncementById)
  .delete(protect, admin, deleteAnnouncement);
router.route('/').post(protect, admin, createNewAnnouncement);

module.exports = router;
