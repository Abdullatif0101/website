const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    company: {
        type: String
    },
    service: {
        type: String,
        enum: ['Web Design', 'Development', 'SEO', 'Marketing', 'Other'],
        default: 'Other'
    },
    message: {
        type: String,
        required: [true, 'Please add a message']
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Qualified', 'Lost'],
        default: 'New'
    }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
