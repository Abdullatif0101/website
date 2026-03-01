const express = require('express');
const { createLead, getLeads, updateLead, deleteLead } = require('../controllers/leadController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .post(createLead)
    .get(protect, authorize('admin'), getLeads);

router.route('/:id')
    .put(protect, authorize('admin'), updateLead)
    .delete(protect, authorize('admin'), deleteLead);

module.exports = router;
