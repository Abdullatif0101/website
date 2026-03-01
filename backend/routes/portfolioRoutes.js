const express = require('express');
const { getPortfolios, getPortfolio, createPortfolio, updatePortfolio, deletePortfolio } = require('../controllers/portfolioController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getPortfolios)
    .post(protect, authorize('admin'), createPortfolio);

router.route('/:id')
    .put(protect, authorize('admin'), updatePortfolio)
    .delete(protect, authorize('admin'), deletePortfolio);

router.get('/slug/:slug', getPortfolio);

module.exports = router;
