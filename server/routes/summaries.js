const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createSummary,
  getSummaries
} = require('../controllers/summaryController');

router.route('/')
  .post(protect, createSummary)
  .get(protect, getSummaries);

module.exports = router;