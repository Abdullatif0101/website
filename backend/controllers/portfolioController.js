const Portfolio = require('../models/Portfolio');

// @desc    Get all portfolio items
// @route   GET /api/v1/portfolio
// @access  Public
exports.getPortfolios = async (req, res, next) => {
    try {
        let queryStr = { ...req.query };

        let query = Portfolio.find(queryStr).sort({ createdAt: -1 });

        const portfolios = await query;

        res.status(200).json({
            status: 'success',
            count: portfolios.length,
            data: portfolios
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// @desc    Get single portfolio item
// @route   GET /api/v1/portfolio/:slug
// @access  Public
exports.getPortfolio = async (req, res, next) => {
    try {
        const portfolio = await Portfolio.findOne({ slug: req.params.slug });

        if (!portfolio) {
            return res.status(404).json({ status: 'error', message: 'Portfolio item not found' });
        }

        res.status(200).json({
            status: 'success',
            data: portfolio
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// @desc    Create new portfolio item
// @route   POST /api/v1/portfolio
// @access  Private/Admin
exports.createPortfolio = async (req, res, next) => {
    try {
        const portfolio = await Portfolio.create(req.body);
        res.status(201).json({
            status: 'success',
            data: portfolio
        });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// @desc    Update portfolio item
// @route   PUT /api/v1/portfolio/:id
// @access  Private/Admin
exports.updatePortfolio = async (req, res, next) => {
    try {
        let portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ status: 'error', message: 'Portfolio not found' });
        }

        portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: portfolio
        });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// @desc    Delete portfolio item
// @route   DELETE /api/v1/portfolio/:id
// @access  Private/Admin
exports.deletePortfolio = async (req, res, next) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ status: 'error', message: 'Portfolio not found' });
        }

        await portfolio.deleteOne();

        res.status(200).json({
            status: 'success',
            data: {}
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
