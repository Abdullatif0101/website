const express = require('express');
const { subscribe, getSubscribers, deleteSubscriber } = require('../controllers/newsletterController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .post(subscribe)
    .get(protect, authorize('admin'), getSubscribers);

router.route('/:id')
    .delete(protect, authorize('admin'), deleteSubscriber);

module.exports = router;
