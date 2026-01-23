const express = require('express');
const router = express.Router();
const { getData, getFilters, createData, updateData, deleteData } = require('../controllers/dataController');

// Public data endpoints (no auth needed for dashboard read)
router.get('/data', getData);
router.get('/filters', getFilters);

// CRUD endpoints for data records
router.post('/data', createData);
router.put('/data/:id', updateData);
router.delete('/data/:id', deleteData);

module.exports = router;
