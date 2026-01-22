const express = require('express');
const router = express.Router();
const { getData, getFilters } = require('../controllers/dataController');
const { protect } = require('../middleware/authMiddleware');

// Protected routes - require authentication
router.get('/data', protect, getData);
router.get('/filters', protect, getFilters);

module.exports = router;
