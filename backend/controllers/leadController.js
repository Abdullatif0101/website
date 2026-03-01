const Lead = require('../models/Lead');
const sendEmail = require('../utils/sendEmail');

// @desc    Create a new lead (from contact form)
// @route   POST /api/v1/leads
// @access  Public
exports.createLead = async (req, res, next) => {
    try {
        const lead = await Lead.create(req.body);

        // Send Auto-response to User
        try {
            await sendEmail({
                email: lead.email,
                subject: 'Thank you for contacting Nexora Digital',
                message: `Hi ${lead.name},\n\nThank you for reaching out to us regarding ${lead.service}. We have received your message and will get back to you shortly.\n\nBest,\nNexora Digital Team`
            });
        } catch (err) {
            console.error('Could not send user auto-reply email', err);
        }

        // Send Notification to Admin
        try {
            await sendEmail({
                email: process.env.ADMIN_EMAIL || 'admin@nexoradigital.com',
                subject: 'New Lead Submission - Nexora Digital',
                message: `New Lead Details:\n\nName: ${lead.name}\nEmail: ${lead.email}\nCompany: ${lead.company}\nService: ${lead.service}\n\nMessage:\n${lead.message}`
            });
        } catch (err) {
            console.error('Could not send admin notification email', err);
        }

        res.status(201).json({
            status: 'success',
            data: lead
        });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// @desc    Get all leads
// @route   GET /api/v1/leads
// @access  Private/Admin
exports.getLeads = async (req, res, next) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: 'success',
            count: leads.length,
            data: leads
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// @desc    Update lead status
// @route   PUT /api/v1/leads/:id
// @access  Private/Admin
exports.updateLead = async (req, res, next) => {
    try {
        let lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ status: 'error', message: 'Lead not found' });
        }

        lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: lead
        });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// @desc    Delete a lead
// @route   DELETE /api/v1/leads/:id
// @access  Private/Admin
exports.deleteLead = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ status: 'error', message: 'Lead not found' });
        }

        await lead.deleteOne();

        res.status(200).json({
            status: 'success',
            data: {}
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
