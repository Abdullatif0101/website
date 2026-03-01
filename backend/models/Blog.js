const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    slug: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    excerpt: {
        type: String,
        maxlength: [500, 'Excerpt can not be more than 500 characters']
    },
    category: {
        type: String,
        required: [true, 'Please specify a category']
    },
    featuredImage: {
        type: String,
        default: 'no-photo.jpg'
    },
    seoTitle: {
        type: String
    },
    seoDescription: {
        type: String
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    }
}, { timestamps: true });

// Basic slug generation before save (simplified version)
blogSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    }
    next();
});

module.exports = mongoose.model('Blog', blogSchema);
