const express = require('express');
const router = express.Router();
const {
  createNewChapter,
  getChapters,
  createNewPaymentType,
  getPaymentTypes,
  deletePaymentType,
  deleteChapter,
  createNewAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  updateAnnouncementById,
  deleteAnnouncement,
  createMission,
  getMission,
  updateMissionById,
  deleteMission,
  createVission,
  getVission,
  updateVissionById,
  deleteVission,
  createHistory,
  getHistory,
  updateHistoryById,
  deleteHistory,
  getMissionById,
  getVissionById,
  getHistoryById,
} = require('../controllers/chapterController');
const { protect, admin } = require('../middleware/authMiddleware');

// Chapter/////////////////////////////////////////////////
router.route('/new').post(createNewChapter);
router.route('/').get(getChapters);
router.route('/:id').delete(deleteChapter);

// PaymentType/////////////////////////////////////////////////
router
  .route('/paymentType')
  .post(protect, admin, createNewPaymentType)
  .get(protect, getPaymentTypes);
router.route('/paymentType/:id').delete(deletePaymentType);

// Announcement/////////////////////////////////////////////////
router.route('/announcement').post(createNewAnnouncement);
router.route('/announcements').get(getAnnouncements);
router
  .route('/announcements/:id')
  .get(getAnnouncementById)
  .put(updateAnnouncementById)
  .delete(deleteAnnouncement);

// Mission/////////////////////////////////////////////////
router.route('/mission').post(createMission);
router.route('/mission').get(getMission);
router
  .route('/mission/:id')
  .get(getMissionById)
  .put(updateMissionById)
  .delete(deleteMission);

// Vission/////////////////////////////////////////////////
router.route('/vission').post(createVission);
router.route('/vission').get(getVission);
router
  .route('/vission/:id')
  .get(getVissionById)
  .put(updateVissionById)
  .delete(deleteVission);

// History/////////////////////////////////////////////////
router.route('/history').post(createHistory);
router.route('/history').get(getHistory);
router
  .route('/history/:id')
  .get(getHistoryById)
  .put(updateHistoryById)
  .delete(deleteHistory);

module.exports = router;
