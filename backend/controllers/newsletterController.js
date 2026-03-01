const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/v1/newsletter
// @access  Public
exports.subscribe = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Check if already subscribed
        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ status: 'error', message: 'Email already subscribed' });
        }

        const subscriber = await Newsletter.create({ email });

        res.status(201).json({
            status: 'success',
            data: subscriber
        });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// @desc    Get all subscribers
// @route   GET /api/v1/newsletter
// @access  Private/Admin
exports.getSubscribers = async (req, res, next) => {
    try {
        const subscribers = await Newsletter.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: 'success',
            count: subscribers.length,
            data: subscribers
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// @desc    Delete a subscriber (Admin)
// @route   DELETE /api/v1/newsletter/:id
// @access  Private/Admin
exports.deleteSubscriber = async (req, res, next) => {
    try {
        const subscriber = await Newsletter.findById(req.params.id);

        if (!subscriber) {
            return res.status(404).json({ status: 'error', message: 'Subscriber not found' });
        }

        await subscriber.deleteOne();

        res.status(200).json({
            status: 'success',
            data: {}
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
