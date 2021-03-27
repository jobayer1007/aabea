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
router.route('/').post(protect, admin, createNewAnnouncement);
router.route('/').get(getAnnouncements);
router
  .route('/:id')
  .get(getAnnouncementById)
  .put(protect, admin, updateAnnouncementById)
  .delete(protect, admin, deleteAnnouncement);

module.exports = router;
