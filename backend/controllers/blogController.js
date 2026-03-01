const Blog = require('../models/Blog');

// @desc    Get all blog posts
// @route   GET /api/v1/blog
// @access  Public
exports.getBlogs = async (req, res, next) => {
    try {
        let query;

        // Public users only see published posts
        let queryStr = { ...req.query };
        if (!req.user || req.user.role !== 'admin') {
            queryStr.status = 'published';
        }

        // Search logic
        if (req.query.search) {
            queryStr.title = { $regex: req.query.search, $options: 'i' };
            delete queryStr.search;
        }

        query = Blog.find(queryStr).sort({ createdAt: -1 });

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const total = await Blog.countDocuments(queryStr);

        query = query.skip(startIndex).limit(limit);

        const blogs = await query;

        res.status(200).json({
            status: 'success',
            count: blogs.length,
            pagination: { page, limit, total },
            data: blogs
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// @desc    Get single blog post
// @route   GET /api/v1/blog/:slug
// @access  Public
exports.getBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug });

        if (!blog) {
            return res.status(404).json({ status: 'error', message: 'Blog not found' });
        }

        res.status(200).json({
            status: 'success',
            data: blog
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// @desc    Create new blog post
// @route   POST /api/v1/blog
// @access  Private/Admin
exports.createBlog = async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json({
            status: 'success',
            data: blog
        });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// @desc    Update blog post
// @route   PUT /api/v1/blog/:id
// @access  Private/Admin
exports.updateBlog = async (req, res, next) => {
    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ status: 'error', message: 'Blog not found' });
        }

        blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: blog
        });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

// @desc    Delete blog post
// @route   DELETE /api/v1/blog/:id
// @access  Private/Admin
exports.deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ status: 'error', message: 'Blog not found' });
        }

        await blog.deleteOne();

        res.status(200).json({
            status: 'success',
            data: {}
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
