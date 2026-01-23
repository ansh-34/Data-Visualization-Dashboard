const express = require('express');
const router = express.Router();
const { getData, getFilters } = require('../controllers/dataController');

// Public data endpoints (no auth needed for dashboard read)
router.get('/data', getData);
router.get('/filters', getFilters);

module.exports = router;
