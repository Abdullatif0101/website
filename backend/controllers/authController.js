const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

// @desc    Register initial admin (Disable/remove this route in production after creation)
// @route   POST /api/v1/auth/register-admin
// @access  Public (temporarily)
exports.registerAdmin = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if admin already exists
        const adminExists = await User.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ status: 'error', message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            status: 'success',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// @desc    Login user / Get token
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate API payload
        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Please provide an email and password' });
        }

        // Check for user (must select password since it is `select: false` in schema)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }

        // Return token
        res.status(200).json({
            status: 'success',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
