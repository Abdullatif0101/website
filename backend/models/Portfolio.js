const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    category: {
        type: String,
        required: [true, 'Please specify a category']
    },
    featuredImage: {
        type: String,
        default: 'no-photo.jpg'
    },
    liveLink: {
        type: String
    },
    technologies: {
        type: [String],
        required: true
    }
}, { timestamps: true });

portfolioSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    }
    next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
