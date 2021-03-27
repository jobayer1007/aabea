const express = require('express');
const router = express.Router();

const { protect, admin, systemAdmin } = require('../middleware/authMiddleware');

const {
  createNewCommitteeMember,
  getCommitteeMembers,
  getCommitteeMemberById,
  updateCommitteeMember,
  deleteCommitteeMember,
} = require('../controllers/committeeController');

router.route('/').get(getCommitteeMembers);
router.route('/new').post(protect, admin, createNewCommitteeMember);
router
  .route('/:id')
  .get(protect, getCommitteeMemberById)
  .put(protect, updateCommitteeMember)
  .delete(protect, admin, deleteCommitteeMember);

module.exports = router;
