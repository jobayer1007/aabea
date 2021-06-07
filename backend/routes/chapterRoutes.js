const express = require('express');
const router = express.Router();
const {
  createNewChapter,
  getChapters,
  createNewPaymentType,
  getPaymentTypes,
  deletePaymentType,
  deleteChapter,
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
  createNewChapterSettings,
  getChapterSettings,
  updateChapterSettings,
  createNewDonationType,
  getDonationTypes,
  deleteDonationType,
  getChapterBySubDomain,
  getChapterById,
  updateChapterById,
  getPaypalId,
} = require('../controllers/chapterController');
const { protect, admin, systemAdmin } = require('../middleware/authMiddleware');

// Settings///////////////////////////////////////////////////////
router.route('/settings').post(protect, admin, createNewChapterSettings);
// Paypal
router.route('/paypal/:checkChapter').get(getPaypalId);

router
  .route('/settings/:checkChapter')
  .get(protect, admin, getChapterSettings)
  .put(protect, admin, updateChapterSettings);

// PaymentType/////////////////////////////////////////////////
router
  .route('/paymentType')
  .post(protect, admin, createNewPaymentType)
  .get(protect, getPaymentTypes);
router.route('/paymentType/:id').delete(deletePaymentType);

// Donation Type/////////////////////////////////////////////////
router
  .route('/donationType')
  .post(protect, admin, createNewDonationType)
  .get(getDonationTypes);
router.route('/donationType/:id').delete(deleteDonationType);

// Mission/////////////////////////////////////////////////
router.route('/mission').post(protect, createMission).get(getMission);

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

// Chapter/////////////////////////////////////////////////
router.route('/').get(getChapters);
router.route('/chapter/:checkChapter').get(getChapterBySubDomain);
router.route('/new').post(protect, systemAdmin, createNewChapter);
router
  .route('/:id')
  .get(getChapterById)
  .put(protect, systemAdmin, updateChapterById)
  .delete(protect, systemAdmin, deleteChapter);

module.exports = router;
