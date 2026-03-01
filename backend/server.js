require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression'); // For Gzip/Brotli
const connectDB = require('./config/db');

// Initialize express app
const app = express();

// Connect to MongoDB
// Uncomment below when DB is ready
// connectDB();

// Security Middleware
app.use(helmet());

// Enable compression
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later."
});
app.use('/api/', limiter);

// CORS Config
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://nexoradigital.com' : 'http://127.0.0.1:5500', // Update for frontend origin
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files (if deployed together)
// const path = require('path');
// app.use(express.static(path.join(__dirname, '../frontend')));

// Routes mapping
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Nexora API is running' });
});

// Import Routers
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');
const blogRoutes = require('./routes/blogRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const seoRoutes = require('./routes/seoRoutes');

// Use Routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/leads', leadRoutes);
app.use('/api/v1/blog', blogRoutes);
app.use('/api/v1/portfolio', portfolioRoutes);
app.use('/api/v1/newsletter', newsletterRoutes);
app.use('/', seoRoutes); // Sitemap and Robots

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
    });
});

// For local testing (if ran directly)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
}

// Export for Vercel
module.exports = app;
